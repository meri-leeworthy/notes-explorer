import styles from "./page.module.css"
import { PostListClient } from "./post-list-client"
// import { posts } from "lib/markdown"

export default function ListPage() {
  return (
    <main className={`${styles.post}`}>
      <div className="mb-4 ">
        <h1 className="inline px-1 py-2 text-lg leading-8 bg-purple-300 rounded-lg shadow-xl lg:text-2xl font-title box-decoration-clone">
          Cases
        </h1>
      </div>
      <PostListClient type="judgement" />
    </main>
  )
}
