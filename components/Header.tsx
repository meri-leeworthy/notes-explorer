import Link from "next/link";

export default function Header({ main }: { main?: boolean }) {
  return (
    <header
      className={`mx-auto w-full max-w-lg ${main && "sm:pt-16 lg:pt-32"}`}>
      <Link href="/" className="no-underline">
        <h1 className="title">Meri Leeworthy</h1>
      </Link>
      {main && (
        <ul className="mt-4 ml-4 leading-loose text-teal-900 font-title isolate">
          <li>frontend developer</li>
          <li>+ design thinking</li>
        </ul>
      )}
    </header>
  );
}
