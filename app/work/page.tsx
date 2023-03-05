import { postSlugs, getPost } from "lib/markdown";

export default function Work() {
  const getPosts = () => postSlugs.map(slug => getPost(slug));
  return (
    <main>
      <h1>Work</h1>
    </main>
  );
}
