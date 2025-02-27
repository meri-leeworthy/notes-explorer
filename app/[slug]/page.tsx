import styles from "./page.module.css"
import { getPost } from "lib/markdown"
import { Markdown } from "components/Markdown"
import Image from "next/image"
// import { redirect } from "next/navigation"
// import Link from "next/link"

export default async function Post(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  try {
    getPost(params.slug)
  } catch (error) {
    return (
      <div className="text-center">
        {decodeURIComponent(params.slug)} isn&apos;t currently in my published
        notes
      </div>
    )
  }
  const post = await getPost(params.slug)
  return (
    <article
      className={`prose flex flex-col items-center mx-auto max-w-prose w-full ${styles.post}`}>
      <div
        className={`relative w-full lg:w-[48rem] mb-12 ${
          post.data?.image ? "aspect-video" : "h-10"
        }`}>
        {post.data?.image && (
          <div className="absolute top-0 right-3 w-[calc(100%-30px)] lg:w-[calc(48rem-40px)] bg-teal-800 bg-opacity-60 aspect-video">
            <Image
              src={`/images/${post.data?.image}`}
              fill={true}
              alt={post.data?.alt || post.data?.title}
            />
          </div>
        )}
        <div className="absolute bottom-0 w-4/5 left-1">
          <h1>{decodeURIComponent(post.slug)}</h1>
        </div>
      </div>
      <main className="w-full max-w-lg">
        {post.data && (
          <table>
            {"year" in post.data && (
              <tr>
                <th>Year</th>
                <td>{post.data.year}</td>
              </tr>
            )}
            {"citation" in post.data && (
              <tr>
                <th>Citation</th>
                <td>{post.data.citation}</td>
              </tr>
            )}
            {"jurisdiction" in post.data && (
              <tr>
                <th>Jurisdiction</th>
                <td>{post.data.jurisdiction}</td>
              </tr>
            )}
            {"judge" in post.data && (
              <tr>
                <th>Judge</th>
                <td>{post.data.judge}</td>
              </tr>
            )}
            {"damages" in post.data && (
              <tr>
                <th>Damages</th>
                <td>{post.data.damages}</td>
              </tr>
            )}
            {"uri" in post.data && (
              <tr>
                <th>URI</th>
                <td>
                  <a href={post.data.uri}>{post.data.uri}</a>
                </td>
              </tr>
            )}
            {"judicial treatment" in post.data && (
              <tr>
                <th>Judicial Treatment</th>
                <td>{post.data["judicial treatment"]}</td>
              </tr>
            )}
          </table>
        )}
        <Markdown markdown={post.content} />
        {post.backlinks.length > 0 && (
          <section className="mt-10">
            <h2>Backlinks</h2>
            <ul>
              {post.backlinks.map((backlink, i) => (
                <li key={i}>
                  <a href={`/${backlink.slug}`}>{backlink.slug}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </article>
  )
}
