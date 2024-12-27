import { useLogin } from '@/hooks/useLogin';

const Login = () => {
  const { email, setEmail, password, setPassword, error, handleSubmit } =
    useLogin();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='p-4 m-4 rounded-md bg-orange-600 text-white'>
        <h2 className='text-3xl'>This is a demo login page.</h2>
        <p className='italic '>email : eve.holt@reqres.in</p>
        <p className='italic '> password : cityslicka</p>
      </div>

      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          Login
        </h1>
        {error && (
          <p className='text-red-500 bg-red-100 p-3 rounded mb-4'>{error}</p>
        )}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-600 focus:border-orange-600'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-600 focus:border-orange-600'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-orange-600 hover:bg-orange-800 text-white font-semibold py-2 rounded-lg transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
