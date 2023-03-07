import { Post } from "lib/types";
import { Markdown } from "components/Markdown";
import Link from "next/link";
import Image from "next/image";

// TODO: Vertical layout: limit height
// TODO: Fade out text

export default function Article({
  post,
  axis = "vertical",
}: {
  post: Post;
  axis?: "vertical" | "horizontal";
}) {
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
              <h3 className="inline px-1 py-[2px] text-lg sm:text-base leading-8 bg-purple-300 border border-black border-opacity-40 rounded shadow-xl font-title box-decoration-clone">
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
