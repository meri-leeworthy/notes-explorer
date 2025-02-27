// @ts-nocheck
import { unified } from "unified"
import rehypeSanitize from "rehype-sanitize"
import * as prod from "react/jsx-runtime"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeReact from "rehype-react"
import React, { Suspense } from "react"

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

export function Markdown({ markdown }: { markdown: string }) {
  // console.log(markdown)
  const standardisedMarkdown = StandardiseObsidianLinks(markdown)

  // @ts-ignore -- Type issues with unified plugins
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeReact, { ...production, createElement: React.createElement })

  const result = processor.processSync(standardisedMarkdown)
  const content = result.result as React.ReactElement

  return <Suspense>{processReactTree(processCitations(content))}</Suspense>
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
): React.ReactElement<any> => {
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
    const children = React.Children.toArray((node.props as any).children).map(
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
  rootElement: React.ReactElement<any>
): React.ReactElement<any> => {
  return processNode(rootElement) as React.ReactElement<any>
}

interface Citation {
  id: string
  text: string
}

const processCitations = (
  rootElement: React.ReactElement<any>
): React.ReactElement<any> => {
  const citations: Citation[] = []
  let endnoteRegex = /\[\^(\d+)\]:\s*((?:.|\n)*?)(?=\n\[\^\d+\]:|$)/g

  const extractCitations = (text: string) => {
    let match
    while ((match = endnoteRegex.exec(text)) !== null) {
      citations.push({ id: match[1], text: match[2].trim() })
    }
    return text.replace(endnoteRegex, "")
  }

  const processNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return extractCitations(node)
    }

    if (React.isValidElement(node)) {
      let newChildren: React.ReactNode[] = []
      let asides: React.ReactNode[] = []

      React.Children.forEach((node.props as any).children, child => {
        if (typeof child === "string") {
          const processedText = child.replace(/\[\^(\d+)\]/g, (match, p1) => {
            const citation = citations.find(c => c.id === p1)
            if (citation) {
              asides.push(
                <aside key={`citation-${p1}`}>
                  [{p1}]: {citation.text}
                </aside>
              )
            }
            return match
          })
          newChildren.push(processedText)
        } else {
          newChildren.push(processNode(child))
        }
      })

      return React.cloneElement(node, {}, ...asides, ...newChildren)
    }

    if (Array.isArray(node)) {
      return node.map(processNode)
    }

    return node
  }

  const processedContent = processNode(rootElement)
  return processedContent as React.ReactElement<any>
}

interface Options {
  [key: string]: unknown
}
