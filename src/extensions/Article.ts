import { Node } from '@tiptap/core'
import UUIDHelper from '../helper/UUIDHelper'
import SmartHeading from './SmartHeading'
import TocHeading from './SmartToc/TocHeading'
import { priorityOfArticle } from '../model/TiptapGroup'

export interface ArticleOptions {
    HTMLAttributes: Record<string, any>
}

export interface ArticleStorage {
    verbose: boolean,
    title: string,
    mountPointId: string,
    headings: TocHeading[],
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        article: {
            enableArticleVerbose: () => ReturnType
            disableArticleVerbose: () => ReturnType
            createArticle: (title: string) => ReturnType
            setToc: (display: boolean) => ReturnType
            toggleToc: () => ReturnType
        }
    }
}

const Article = Node.create<ArticleOptions, ArticleStorage>({
    name: 'article',

    group: 'block',

    priority: priorityOfArticle,

    content: `${SmartHeading.name} block*`,

    addStorage() {
        return {
            verbose: false,
            title: "🏠 Article",
            mountPointId: "smart-toc-mount-point",
            headings: [],
        }
    },

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    addAttributes() {
        return {
            toc: {
                default: false,
                parseHTML: element => element.getAttribute('data-toc') == 'true',
                renderHTML: attributes => ({
                    'data-toc': attributes.toc,
                }),
            },
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: [SmartHeading.name],
                attributes: {
                    id: {
                        default: "0",
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            enableArticleVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableArticleVerbose: () => () => {
                this.storage.verbose = false
                return true
            },

            createArticle: (title: string) => ({ commands }) => {
                let html = `<article><h1>${title}</h1></article>`
                commands.setContent(html, true)

                return true
            },

            setToc: (display: boolean) => ({ commands }) => {
                commands.updateAttributes(this.name, { toc: display })
                return true
            },

            toggleToc: () => ({ commands }) => {
                let attributes = this.editor.getAttributes(this.name)
                commands.updateAttributes(this.name, { toc: !attributes.toc })
                return true
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'article',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['article', { ...HTMLAttributes }, 0]
    },
})

export default Article
