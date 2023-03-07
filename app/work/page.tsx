import { getPosts } from "lib/markdown";
import { Post } from "lib/types";
import Article from "components/Article";
import Header from "components/Header";
import BackButton from "components/Back";

// TODO: Get width right on large screens. show vertical articles on small screens

export default async function Work() {
  const posts: Post[] = await Promise.all(getPosts());
  return (
    <>
      <div className="flex items-center justify-between w-full max-w-xl mx-auto">
        <Header />
        <h2 className="px-8 text-2xl font-title rounded-[50%] bg-pink-100 py-2">
          Work
        </h2>
      </div>
      <main className="w-full max-w-3xl mx-auto mt-32">
        <section className="mb-24">
          <h3 className="mb-4 text-xl font-title">Freelance</h3>
          <div className="grid grid-cols-1 gap-x-2 gap-y-3">
            {posts
              .filter(post => post.data.isPublished)
              .filter(post => post.data.tags.includes("freelance"))
              .sort((a, b) => b.data.date - a.data.date)
              .map((post, i) => (
                <Article post={post} key={i} />
              ))}
          </div>
        </section>
        <section className="mb-8">
          <h3 className="mb-4 text-xl font-title">Personal Projects</h3>
          <div className="grid grid-cols-1 gap-3">
            {posts
              .filter(post => post.data.isPublished)
              .filter(post => post.data.tags.includes("radical-directory"))
              .sort((a, b) => b.data.date - a.data.date)
              .map((post, i) => (
                <Article post={post} key={i} axis="horizontal" />
              ))}
          </div>
        </section>
        <div className="mt-12">
          <BackButton />
        </div>
      </main>
    </>
  );
}
