import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '@/store/slices/notificationSlice';
import { RootState } from '@/store';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification.message) return null;

  return (
    <div
      className={`fixed top-20 right-5 p-4 rounded-lg shadow-lg ${
        notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white transition-all`}
    >
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
