const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    const verifyToken = await newUser.createAccountVerifyToken();
    await newUser.save({ validateBeforeSave: false });
    const verifyURL = `${req.protocol}://${req.get(
        'host'
    )}/api/users/verifyEmail/${verifyToken}`;

    try {
        new sendEmail(
            { email: newUser.email, name: newUser.name },
            verifyURL
        ).verifyEmail();
        res.status(200).json({
            status: 'success',
            message: 'verify token sent to email',
        });
    } catch (err) {
        newUser.accountverifyToken = undefined;
        await newUser.save({ validateBeforeSave: false });
        return next(
            new AppError(
                'there was an error sending the email. try again later!'
            ),
            500
        );
    }
});
exports.verifyEmail = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await User.findOne({ accountVerifyToken: hashedToken });

    if (!user) {
        return next(new AppError('your email is already verified!', 400));
    }

    user.verified = true;
    user.accountverifyToken = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'your account is verified',
    });
});
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new AppError('User Not Found', 400));
    }
    const correct = await user.correctPassword(password, user.password);
    if (!user || !correct) {
        return next(new AppError('Incorrect email or password', 401));
    }

    if (!user.verified) {
        return next(new AppError('your email is not verified', 401));
    }
    createSendToken(user, 200, res);
});
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError(
                'You are not logged in! Please log in to get access.',
                401
            )
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token no longer exists.',
                401
            )
        );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please log in again.',
                401
            )
        );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'You do not have permission to perform this action',
                    403
                )
            );
        }
        next();
    };
};
exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
        return next(new AppError('There is no user with that id.', 404));
    }

    const correctPass = await user.correctPassword(
        req.body.passwordCurrent,
        user.password
    );
    if (!correctPass) {
        return next(new AppError('Current password is not correct', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('there is no user with that email', 404));
    }

    const resetToken = await user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/users/resetPassword/${resetToken}`;
    try {
        new sendEmail(
            { email: user.email, name: user.name },
            resetURL
        ).sendResetPassword();
        res.status(200).json({
            status: 'success',
            message: 'token sent to email',
        });
    } catch (err) {
        user.PasswordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(
            new AppError(
                'there was an error sending the email. try again later!'
            ),
            500
        );
    }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        return next(new AppError('token is expired or invalid', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
});
