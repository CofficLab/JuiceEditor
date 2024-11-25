import { Node } from '@tiptap/core'
import UUIDHelper from '../helper/UUIDHelper'
import EditorNode from '../model/EditorNode'
import { createApp, h } from 'vue'
import TocView from './SmartToc/TocView.vue'
import SmartHeading from './SmartHeading'
import TocHeading from './SmartToc/TocHeading'
export interface BranchOptions {
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        article: {
            enableArticleVerbose: () => ReturnType
            disableArticleVerbose: () => ReturnType
            toggleToc: () => ReturnType
            addToc: () => ReturnType
            removeToc: () => ReturnType
            bootToc: () => ReturnType
            updateHeadings: () => ReturnType
        }
    }
}

const Article = Node.create<BranchOptions>({
    name: 'article',

    group: 'block',

    content: `${SmartHeading.name} block*`,

    addStorage() {
        return {
            verbose: false,
            title: "🏠 Article",
            article: EditorNode.empty(),
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
            uuid: {
                default: UUIDHelper.generate(),
                parseHTML: element => element.getAttribute('data-uuid') || '',
                renderHTML: attributes => ({
                    'data-uuid': attributes.uuid,
                }),
            },
            toc: {
                default: false,
                parseHTML: element => element.getAttribute('data-toc') === 'true',
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

            toggleToc: () => ({ commands }) => {
                let attributes = this.editor.getAttributes(this.name)
                console.log(this.storage.title, "toggleToc", attributes)

                if (!attributes.toc) {
                    commands.addToc()
                } else {
                    commands.removeToc()
                }

                console.log('current attrs', this.editor.getAttributes(this.name))
                return true
            },

            bootToc: () => ({ editor }) => {
                let attributes = this.editor.getAttributes(this.name)
                console.log(this.storage.title, "bootToc", attributes)

                if (attributes.toc) {

                    const mountPoint = document.createElement('div');
                    mountPoint.id = this.storage.mountPointId;
                    mountPoint.style.position = 'fixed';
                    mountPoint.style.top = '0';
                    mountPoint.style.right = '0';
                    mountPoint.style.height = '100%';
                    mountPoint.style.display = 'flex';
                    mountPoint.style.justifyContent = 'flex-end';
                    mountPoint.style.alignItems = 'flex-start';
                    mountPoint.style.zIndex = '9999';
                    mountPoint.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    mountPoint.style.opacity = '0';
                    mountPoint.style.transform = 'translateX(100%)';
                    mountPoint.style.backgroundColor = 'white';
                    mountPoint.style.boxShadow = '-2px 0 8px rgba(0, 0, 0, 0.1)';

                    let editorElement = this.editor.options.element
                    editorElement.appendChild(mountPoint);

                    requestAnimationFrame(() => {
                        mountPoint.style.opacity = '1';
                        mountPoint.style.transform = 'translateX(0)';
                    });

                    const app = createApp({
                        render() {
                            return h(TocView, {
                                editor: editor,
                                onClose: () => {
                                    mountPoint.style.opacity = '0';
                                    mountPoint.style.transform = 'translateX(100%)';
                                    mountPoint.style.backgroundColor = 'white';

                                    setTimeout(() => {
                                        app.unmount();
                                        editorElement.removeChild(mountPoint);
                                    }, 400);
                                }
                            });
                        }
                    });

                    app.mount(mountPoint);
                }

                return true
            },

            addToc: () => ({ editor, commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, "addToc")
                }

                commands.updateAttributes(this.name, { toc: true })
                console.log('current attrs', editor.getAttributes(this.name))
                return true;
            },

            removeToc: () => ({ commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, "removeToc")
                }

                const mountPoint = this.editor.options.element?.querySelector(`#${this.storage.mountPointId}`);
                if (mountPoint) {
                    mountPoint.remove();
                }

                commands.updateAttributes(this.name, { toc: false })

                return true;
            },

            enableTocVerbose: () => {
                this.storage.verbose = true

                return true
            },

            disableTocVerbose: () => {
                this.storage.verbose = false

                return true
            },

            updateHeadings: () => ({ tr, state, dispatch }) => {
                let verbose = true
                if (verbose) {
                    console.log(this.storage.title, '查找 Headings')
                }
                var headings: TocHeading[] = []

                state.doc.descendants((node: any, pos: any) => {
                    if (['heading'].includes(node.type.name)) {
                        const id = `heading-${headings.length + 1}`

                        if (node.attrs.id !== id) {
                            tr.setNodeMarkup(pos, undefined, { ...node.attrs, id })
                        }

                        headings.push(new TocHeading()
                            .setId(id)
                            .setText(node.textContent)
                            .setLevel(node.attrs.level)
                        )
                    }
                })

                tr.setMeta('addToHistory', false)
                tr.setMeta('preventUpdate', true)

                if (dispatch) {
                    dispatch(tr)
                }

                this.storage.headings = headings

                return true
            }
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

    onCreate() {
        let doc = EditorNode.fromEditor(this.editor)
        this.storage.article = doc.children?.find(node => node.type == Article.name) ?? EditorNode.empty()


        console.log(this.storage.title, "onCreate, article created")


        this.editor.commands.updateHeadings()

        if (this.storage.article.attrs.toc) {
            this.editor.commands.bootToc()
        }
    },

    onUpdate() {
        if (this.storage.verbose) {
            console.log(this.storage.title, "onUpdate")
        }

        let doc = EditorNode.fromEditor(this.editor)
        this.storage.article = doc.children?.find(node => node.type == Article.name) ?? EditorNode.empty()

        if (this.storage.verbose) {
            console.log(this.storage.title, "onUpdate, article updated")
        }

        this.editor.commands.updateHeadings()

        if (this.storage.article.attrs.toc) {
            this.editor.commands.bootToc()
        }
    },
})

export default Article
