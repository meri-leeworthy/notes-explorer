import fs from "fs"
import path from "path"
import { Post } from "lib/types"
import matter from "gray-matter"
import { readFileSync } from "fs"

const BACKLINKS_PATH = path.join(process.cwd(), "public", "backlinks.json")

const backlinksMap = JSON.parse(fs.readFileSync(BACKLINKS_PATH, "utf8"))

export const POSTS_PATH = path.join(process.cwd(), "posts")

export const postSlugs = fs
  .readdirSync(POSTS_PATH)
  .filter(path => /\.md/.test(path))
  .map(path => path.slice(0, -3))

export const getPost = async (slug: string): Promise<Post> => {
  // console.log(slug, decodeURIComponent(slug))
  const source = readFileSync(
    path.join(POSTS_PATH, decodeURIComponent(slug) + ".md")
  )
  const { content, data } = matter(source)
  const backlinks = backlinksMap[slug] || []
  return { data, slug, content, backlinks }
}

export const posts = Promise.all(
  postSlugs.map(async slug => await getPost(slug))
)
