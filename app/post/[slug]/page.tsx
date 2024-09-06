import styles from "./page.module.css"
import { getPost } from "lib/markdown"
import { Markdown } from "components/Markdown"
import Image from "next/image"
import Header from "components/Header"

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return (
    <article
      className={`flex flex-col items-center mx-auto max-w-3xl w-full ${styles.post}`}>
      <div
        className={`relative w-full lg:w-[48rem] mb-12 ${
          post.data.image ? "aspect-video" : "h-10"
        }`}>
        {post.data.image && (
          <div className="absolute top-0 right-3 w-[calc(100%-30px)] lg:w-[calc(48rem-40px)] bg-teal-800 bg-opacity-60 aspect-video">
            <Image
              src={`/images/${post.data.image}`}
              fill={true}
              alt={post.data.alt || post.data.title}
            />
          </div>
        )}
        <div className="absolute bottom-0 w-4/5 left-1">
          <h1 className="text-lg lg:text-2xl font-title inline px-1 py-[2px] leading-8 bg-purple-300 border border-black border-opacity-40 rounded-lg shadow-xl box-decoration-clone">
            {post.data.title}
          </h1>
        </div>
      </div>
      <main className="max-w-lg">
        <Markdown markdown={post.content} />
      </main>
    </article>
  )
}
