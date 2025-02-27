import styles from "./page.module.css"
import { PostListClient } from "../post-list-client"
// import { posts } from "lib/markdown"

export default function ListPage() {
  return (
    <main className={`${styles.post}`}>
      <PostListClient type="judgement" />
    </main>
  )
}
