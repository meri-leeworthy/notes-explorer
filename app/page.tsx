import styles from "./page.module.css"
import { PostListClient } from "./post-list-client"

export default async function Home() {
  return (
    <main className={`${styles.post}`}>
      <PostListClient type="judgement" />
    </main>
  )
}
