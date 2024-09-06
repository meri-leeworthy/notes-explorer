import { useRemarkSync } from "react-remark"
import remarkObsidian from "remark-obsidian"
export function Markdown({ markdown }: { markdown: string }) {
  const renderedMarkdown = useRemarkSync(markdown, {
    remarkPlugins: [remarkObsidian],
  })

  return renderedMarkdown
}
