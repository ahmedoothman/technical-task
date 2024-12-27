import { GetStaticProps } from 'next';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/utils/getPosts';
import { Post } from '@/types/post';

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div className='min-h-screen p-8 bg-gray-50'>
      <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
        Recent Posts
      </h1>
      <div className='space-y-6 max-w-3xl mx-auto'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: { posts },
  };
};
