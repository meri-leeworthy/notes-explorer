import { useRemarkSync } from "react-remark";
export function Markdown({ markdown }: { markdown: string }) {
  const renderedMarkdown = useRemarkSync(markdown);

  return renderedMarkdown;
}
