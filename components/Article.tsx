import { Post } from "lib/types";
import { Markdown } from "components/Markdown";
import Link from "next/link";
import Image from "next/image";

// TODO: fix leading on heading

export default function Article({ post }: { post: Post }) {
  return (
    <article className="card">
      {!!post.data.image && (
        <Link href={`post/${post.slug}`} className="">
          <div className="imagecontainer">
            <Image
              src={`/images/${post.data.image}`}
              fill={true}
              alt={post.data.alt}
              className="whitefilter"
            />
            <div className="absolute w-60 bottom-2 left-1 right-1">
              <h3 className="inline px-1 py-[2px] text-lg sm:text-[1rem] leading-8 sm:leading-7 bg-purple-300 border border-black border-opacity-40 rounded shadow-xl font-title box-decoration-clone">
                {post.data.title}
              </h3>
            </div>
          </div>
        </Link>
      )}

      <div className="previewtext">
        <Markdown markdown={post.content.slice(0, 600) + "..."} />
      </div>
    </article>
  );
}
