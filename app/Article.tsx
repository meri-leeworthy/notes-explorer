import styles from "./page.module.css";
import { Post } from "lib/types";
import { Markdown } from "app/Markdown";
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
    <article
      className={`w-full flex ${axis === "vertical" && "flex-col"} border ${
        axis === "horizontal" ? "h-40 max-w-3xl" : ""
      } border-white shadow-2xl overflow-clip border-opacity-70 card ${
        styles.card
      }`}>
      {!!post.data.image && (
        <Link
          href={`post/${post.slug}`}
          className={axis === "vertical" ? "w-full" : ""}>
          <div
            className={`relative box-border bg-teal-800 bg-opacity-60 aspect-video ${
              axis === "horizontal" ? "h-40" : ""
            }`}>
            <Image
              src={`/images/${post.data.image}`}
              fill={true}
              alt={post.data.alt}
              className={styles.whitefilter}
            />
            <div className="absolute w-60 bottom-1 left-1 right-1">
              <h3
                className={`inline px-1 py-[2px] ${
                  axis === "vertical" ? "text-lg" : ""
                } leading-8 bg-purple-300 border border-black border-opacity-40 rounded shadow-xl font-title box-decoration-clone`}>
                {post.data.title}
              </h3>
            </div>
          </div>
        </Link>
      )}

      <div
        className={`markdown p-2 text-sm text-teal-900 bg-[#fff8] ${
          styles.previewtext
        } ${
          axis === "horizontal" ? "w-full aspect-video overflow-y-clip" : "h-32"
        }`}>
        <Markdown markdown={post.content.slice(0, 600) + "..."} />
      </div>
    </article>
  );
}
