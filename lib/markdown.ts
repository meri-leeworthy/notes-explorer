import fs from "fs"
import path from "path"
import { Post } from "lib/types"
import matter from "gray-matter"
import { readFileSync } from "fs"

export const getPost = (slug: string) => {
  // console.log(slug, decodeURIComponent(slug))
  const source = readFileSync(
    path.join(POSTS_PATH, decodeURIComponent(slug) + ".md")
  )

  const { content, data } = matter(source)
  // const dataStrings = ["title", "publishDate", "alt", "image"];
  // for (const key of dataStrings) {
  //   if (!(key in data)) {
  //     throw new Error(`${key} string not found in post ${slug}`);
  //   }
  // }

  // if (!("isPublished" in data) || typeof data.isPublished !== "boolean") {
  //   throw new Error(`no boolean isPublished key found in post ${slug}`);
  // }

  // if (!("tags" in data) || !Array.isArray(data.tags)) {
  //   throw new Error(`no tags found in post ${slug}`);
  // }

  return { data, slug, content }
}

export const POSTS_PATH = path.join(process.cwd(), "posts")

export const postSlugs = fs
  .readdirSync(POSTS_PATH)
  .filter(path => /\.md/.test(path))
  .map(path => path.slice(0, -3))

export const posts = postSlugs.map(slug => getPost(slug))
