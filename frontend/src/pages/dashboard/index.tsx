import { GetServerSideProps } from 'next';
import { getUsers } from '@/utils/getUsers';
import UserCard from '@/components/UserCard';
import { User } from '@/types/user';

interface DashboardProps {
  users: User[];
}

const Dashboard: React.FC<DashboardProps> = ({ users }) => {
  return (
    <div className='min-h-screen p-8 bg-gray-50'>
      <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
        Users
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers();

  return {
    props: { users },
  };
};

export default Dashboard;
