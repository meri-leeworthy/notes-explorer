import { unified } from "unified"
import rehypeSanitize from "rehype-sanitize"
import * as prod from "react/jsx-runtime"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeReact from "rehype-react"
// import { useRemarkSync } from "react-remark"
import { citePlugin } from "@benrbray/remark-cite"
import remarkObsidian from "remark-obsidian"
import React, { Suspense } from "react"

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

export function Markdown({ markdown }: { markdown: string }) {
  // console.log(markdown)
  const standardisedMarkdown = StandardiseObsidianLinks(markdown)

  const result = unified()
    .use(remarkParse)
    // .use(remarkObsidian)
    // .use(citePlugin, {})
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeReact, production)
    .processSync(standardisedMarkdown)

  return <Suspense>{processReactTree(result.result as JSX.Element)}</Suspense>
  // console.log(standardisedMarkdown)
  // const renderedMarkdown = useRemarkSync(standardisedMarkdown, {
  //   remarkPlugins: [remarkCite],
  // })
  // // console.log(renderedMarkdown)
  // return renderedMarkdown
}

function StandardiseObsidianLinks(markdown: string) {
  return markdown
    .replace(/\.\.\/public\//g, () => "/")
    .replace(/\n/g, () => "\n\n")
    .replace(/\[\[([^\|\]]+)\]\]/g, (_, link) => {
      return `[${link}](/${encodeURIComponent(link)})`
    })
    .replace(/\[\[(.*?)\|(.*?)\]\]/g, (_, link, display) => {
      return `[${display}](/${encodeURIComponent(link)})`
    })
}

const convertMarkdownToReactFragment = (
  markdown: string
): React.ReactElement => {
  const parts = markdown.split(/(==.*?==)/g)

  const elements = parts.map((part, index) => {
    if (part.startsWith("==") && part.endsWith("==")) {
      const content = part.slice(2, -2)
      return <mark key={index}>{content}</mark>
    }
    return part
  })

  return <>{elements}</>
}

const processNode = (node: React.ReactNode): React.ReactNode => {
  if (typeof node === "string") {
    return convertMarkdownToReactFragment(node)
  }

  if (React.isValidElement(node)) {
    const children = React.Children.toArray(node.props.children).map(
      processNode
    )
    return React.cloneElement(node, {}, ...children)
  }

  if (Array.isArray(node)) {
    return node.map(processNode)
  }

  return node
}

const processReactTree = (
  rootElement: React.ReactElement
): React.ReactElement => {
  return processNode(rootElement) as React.ReactElement
}
