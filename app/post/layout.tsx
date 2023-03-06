import BackButton from "app/Back";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="w-full max-w-xl mx-auto mt-12">
        <BackButton />
      </div>
    </>
  );
}
