// import styles from "./page.module.css";
import { Suspense } from "react";
import { postSlugs, getPost } from "lib/markdown";
import { Post } from "lib/types";
import { Markdown } from "app/Markdown";
import Link from "next/link";
import Image from "next/image";

const getDate = (date: string | null) => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const getPosts = () => postSlugs.map(slug => getPost(slug));

function Article({ post }: { post: Post }) {
  console.log(post.data);
  return (
    <article className="w-full p-2 my-2 border border-white">
      {!!post.data.image && (
        <div className="relative w-full aspect-video">
          <Image
            src={`/images/${post.data.image}`}
            fill={true}
            alt=""
            style={{
              filter: "invert(100%) url(#white-alpha) invert(100%)",
            }}
          />{" "}
          <h3 className="absolute bg-slate-800 bottom-2 left-2 right-2 font-title opacity-70">
            <Link href={`post/${post.slug}`}>{post.data.title}</Link>
          </h3>
        </div>
      )}

      <p className="opacity-60">
        <Markdown markdown={post.content.slice(0, 200) + "..."} />
      </p>
    </article>
  );
}

export default async function Home() {
  const posts: Post[] = await Promise.all(getPosts());

  return (
    <>
      <h1 className="text-4xl w-52 font-title">Meri Leeworthy</h1>
      <ul className="mt-4">
        <li>Frontend developer</li>
        <li>+ design thinking</li>
        <li>+ social justice</li>
      </ul>
      <section className="">
        <h2 className="mt-32 text-2xl opacity-80 font-title">Work</h2>
        {posts
          .filter(post => post.data.isPublished)
          .map((post, i) => (
            <Article post={post} key={i} />
          ))}
      </section>
    </>
  );
}
