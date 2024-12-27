export const getPosts = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  );
  const posts = await response.json();
  return posts;
};
