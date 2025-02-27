"use client"

import { useState, useEffect } from "react"
import type { Post } from "lib/types"

type SortField = "year" | "case" | "jurisdiction" | "tags"
type SortDirection = "asc" | "desc"

export function PostListClient({ type }: { type: string }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<SortField>("year")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [filterJurisdiction, setFilterJurisdiction] = useState<string | null>(
    null
  )

  useEffect(() => {
    console.log("Fetching posts...") // Debug log
    const fetchPosts = async () => {
      try {
        console.log("Making fetch request...") // Debug log
        const response = await fetch("/api/posts")
        console.log("Got response:", response.status) // Debug log
        const data = await response.json()
        console.log("Got data:", data) // Debug log

        if (filterTag) {
          data.posts = data.posts.filter((post: any) =>
            post.data?.tags?.includes(filterTag)
          )
        }

        if (filterJurisdiction) {
          data.posts = data.posts.filter(
            (post: any) => post.data?.jurisdiction === filterJurisdiction
          )
        }

        setPosts(data.posts)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [filterTag, filterJurisdiction])

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedPosts = [...posts]
    .filter(post => post.data?.type === type)
    .sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1
      switch (sortField) {
        case "year":
          return (a.data?.year - b.data?.year) * multiplier
        case "case":
          return a.slug.localeCompare(b.slug) * multiplier
        case "jurisdiction":
          return (
            a.data?.jurisdiction?.localeCompare(b.data?.jurisdiction) *
            multiplier
          )
        case "tags":
          return (
            a.data?.tags
              ?.sort()?.[0]
              ?.localeCompare(b.data?.tags?.sort()?.[0]) * multiplier
          )
        default:
          return 0
      }
    })

  if (loading) {
    return <div>Loading posts...</div>
  }

  return (
    <div>
      <form>
        <fieldset>
          <legend>Filter by tag:</legend>
          <button
            type="button"
            className="data-active:bg-purple-300/50"
            data-active={filterTag === "sexual-harassment"}
            onClick={() =>
              setFilterTag(
                filterTag === "sexual-harassment" ? null : "sexual-harassment"
              )
            }>
            sexual-harassment
          </button>
          <button
            type="button"
            className="data-active:bg-purple-300/50"
            data-active={filterTag === "discrimination"}
            onClick={() =>
              setFilterTag(
                filterTag === "discrimination" ? null : "discrimination"
              )
            }>
            discrimination
          </button>
        </fieldset>
        <fieldset>
          <legend>Filter by jurisdiction:</legend>
          <button
            type="button"
            className="data-active:bg-purple-300/50"
            data-active={filterJurisdiction === "VCAT"}
            onClick={() =>
              setFilterJurisdiction(
                filterJurisdiction === "VCAT" ? null : "VCAT"
              )
            }>
            VCAT
          </button>
          <button
            type="button"
            className="data-active:bg-purple-300/50"
            data-active={filterJurisdiction === "Federal"}
            onClick={() =>
              setFilterJurisdiction(
                filterJurisdiction === "Federal" ? null : "Federal"
              )
            }>
            Federal
          </button>
        </fieldset>
      </form>
      <table className="w-full ml-0">
        <thead>
          <tr>
            <th>
              <button
                onClick={() => handleSort("year")}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded ${
                  sortField === "year" ? "font-bold" : ""
                }`}>
                Year{" "}
                {sortField === "year" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th>
              <button
                onClick={() => handleSort("case")}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded ${
                  sortField === "case" ? "font-bold" : ""
                }`}>
                Case{" "}
                {sortField === "case" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th>
              <button
                onClick={() => handleSort("jurisdiction")}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded ${
                  sortField === "jurisdiction" ? "font-bold" : ""
                }`}>
                Jurisdiction{" "}
                {sortField === "jurisdiction" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th>
              <button
                onClick={() => handleSort("tags")}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded ${
                  sortField === "tags" ? "font-bold" : ""
                }`}>
                Tag{" "}
                {sortField === "tags" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post, i) => (
            <tr key={i}>
              <td className="px-4 py-2">{post.data.year}</td>
              <td className="px-4 py-2">
                <a href={`/${encodeURIComponent(post.slug)}`}>{post.slug}</a>
              </td>
              <td className="px-4 py-2">{post.data.jurisdiction}</td>
              <td className="px-4 py-2">
                {post.data.tags?.map((tag: string) => tag).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
