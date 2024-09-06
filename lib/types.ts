export type Post = {
  data: {
    title: string
    isPublished: boolean
    publishDate: string
    date: number
    alt?: string
    image?: string
    tags: string[]
  }
  slug: string
  content: string
}
