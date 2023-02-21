import { getPost } from "lib/markdown";
import { Markdown } from "app/Markdown";
export default async function Post({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const post = await getPost(params.slug);
  return (
    <article>
      <h1>{post.data.title}</h1>
      <Markdown markdown={post.content} />
    </article>
  );
}
