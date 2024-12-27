import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow'>
      <h2 className='text-2xl font-bold text-gray-800'>{post.title}</h2>
      <p className='text-gray-700 mt-4'>{post.body}</p>
      <div className='mt-4 text-sm text-gray-500'>
        Posted by <span className='font-semibold'>User {post.id}</span>
      </div>
    </div>
  );
};

export default PostCard;
