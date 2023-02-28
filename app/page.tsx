import styles from "./page.module.css";
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
  return (
    <article
      className={`w-full mt-3 mb-4 border border-white shadow-2xl border-opacity-70 card ${styles.card}`}>
      {!!post.data.image && (
        <Link href={`post/${post.slug}`}>
          <div className="relative w-full bg-teal-800 bg-opacity-60 aspect-video ">
            <Image
              src={`/images/${post.data.image}`}
              fill={true}
              alt=""
              className={styles.whitefilter}
            />
            <div className="absolute px-1 w-60 bottom-1 left-1 right-1">
              <h3 className="inline px-1 py-[2px] text-lg leading-8 bg-pink-300 text-white border border-black border-opacity-40 rounded shadow-xl font-title box-decoration-clone">
                {post.data.title}
              </h3>
            </div>
          </div>
        </Link>
      )}

      <div className="p-2 text-sm text-teal-900 opacity-60 bg-[#fff8]">
        <Markdown markdown={post.content.slice(0, 200) + "..."} />
      </div>
    </article>
  );
}

export default async function Home() {
  const posts: Post[] = await Promise.all(getPosts());

  return (
    <>
      <h1
        className={`isolate relative text-4xl w-52 font-title ${styles.title}`}>
        Meri Leeworthy
      </h1>
      <ul className="mt-4 ml-4 leading-loose text-teal-900 font-title isolate">
        <li>frontend developer</li>
        <li>+ design thinking</li>
        <li>+ social justice</li>
      </ul>
      <section className="max-w-lg">
        <h2 className="mt-32 text-lg opacity-60 font-title">
          some recent work...
        </h2>
        {posts
          .filter(post => post.data.isPublished)
          .filter(post => post.data.tags.includes("recent"))
          .map((post, i) => (
            <Article post={post} key={i} />
          ))}
      </section>
    </>
  );
}
