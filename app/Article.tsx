import styles from "./page.module.css";
import { Post } from "lib/types";
import { Markdown } from "app/Markdown";
import Link from "next/link";
import Image from "next/image";

export default function Article({ post }: { post: Post }) {
  return (
    <article
      className={`w-full mt-3 mb-4 border border-white shadow-2xl border-opacity-70 card ${styles.card}`}>
      {!!post.data.image && (
        <Link href={`post/${post.slug}`}>
          <div className="relative w-full bg-teal-800 bg-opacity-60 aspect-video ">
            <Image
              src={`/images/${post.data.image}`}
              fill={true}
              alt={post.data.alt}
              className={styles.whitefilter}
            />
            <div className="absolute px-1 w-60 bottom-1 left-1 right-1">
              <h3 className="inline px-1 py-[2px] text-lg leading-8 bg-purple-300 border border-black border-opacity-40 rounded shadow-xl font-title box-decoration-clone">
                {post.data.title}
              </h3>
            </div>
          </div>
        </Link>
      )}

      <div className="markdown p-2 text-sm text-teal-900 opacity-60 bg-[#fff8]">
        <Markdown markdown={post.content.slice(0, 200) + "..."} />
      </div>
    </article>
  );
}
