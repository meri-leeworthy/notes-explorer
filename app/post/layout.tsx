import Link from "next/link";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/" className="mb-4 text-xl font-title sligoil-micro-ss04">
        ← Home
      </Link>
      {children}
    </>
  );
}
