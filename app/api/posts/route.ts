import { posts } from "lib/markdown"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({ posts: await posts })
  } catch (error) {
    console.error("Error in posts API route:", error)
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}
