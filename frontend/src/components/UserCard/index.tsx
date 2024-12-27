import Image from 'next/image';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105'>
      <Image
        src={user.avatar}
        alt={user.first_name}
        className='rounded-full'
        width={96}
        height={96}
      />
      <h2 className='mt-4 text-xl font-semibold text-gray-800'>
        {`${user.first_name} ${user.last_name}`}
      </h2>
      <p className='mt-2 text-sm text-gray-600'>{user.email}</p>
    </div>
  );
};

export default UserCard;
