import Link from "next/link"

export default function Header() {
  return (
    <header className="flex justify-between w-full max-w-2xl px-4 mx-auto my-8 sm:pt-16">
      <Link href="/" className="no-underline">
        <h1 className="title">Notes Explorer</h1>
      </Link>
      {/* <nav>
        <ul className="mt-8 text-right font-title">
          <li>
            <Link href="/work" className="no-underline">
              Work
            </Link>
          </li>
        </ul> 
      </nav> */}
    </header>
  )
}
