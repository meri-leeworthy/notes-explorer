import styles from "./page.module.css";
import { getPost } from "lib/markdown";
import { Markdown } from "app/Markdown";
import Image from "next/image";
export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return (
    <article
      className={`flex flex-col items-center mx-auto max-w-3xl w-full ${styles.post}`}>
      <div className="relative w-[48rem] mb-12 aspect-video">
        <div className="absolute top-0 right-3 w-[calc(48rem-40px)] bg-teal-800 bg-opacity-60 aspect-video">
          <Image
            src={`/images/${post.data.image}`}
            fill={true}
            alt={post.data.alt}
          />
        </div>
        <div className="absolute bottom-0">
          <h1 className="text-2xl font-title inline px-1 py-[2px] leading-8 bg-purple-300 border border-black border-opacity-40 rounded-lg shadow-xl box-decoration-clone">
            {post.data.title}
          </h1>
        </div>
      </div>
      <main className="max-w-prose">
        <Markdown markdown={post.content} />
      </main>
    </article>
  );
}
