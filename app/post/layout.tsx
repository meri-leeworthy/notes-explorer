import Link from "next/link";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="mt-12">
        <Link
          href="/"
          className="px-4 no-underline py-2 text-xl font-title hover:border-black border-transparent border-2 rounded-[50%] sligoil-micro-ss04">
          ← Back
        </Link>
      </div>
    </>
  );
}
