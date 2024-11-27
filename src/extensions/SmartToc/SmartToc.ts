import { Node } from '@tiptap/core'
import { createApp, h } from 'vue'
import TocView from './TocView.vue'
import SmartHeading from '../SmartHeading'
import TocHeading from '../HeadingStore/TocHeading'
import { priorityOfToc } from '../../model/TiptapGroup'
import { NodeStoreStorage } from '../NodeStore'

export interface SmartTocStorage {
    verbose: boolean,
    title: string,
    mountPointId: string,
    headings: TocHeading[],
    display: boolean,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartToc: {
            enableTocVerbose: () => ReturnType
            disableTocVerbose: () => ReturnType
            removeToc: () => ReturnType
            bootToc: () => ReturnType
            displayToc: () => ReturnType
        }
    }
}

const SmartToc = Node.create<{}, SmartTocStorage>({
    name: 'smartToc',

    group: 'block',

    priority: priorityOfToc,

    addStorage() {
        return {
            verbose: false,
            title: "🐯 SmartToc",
            mountPointId: "smart-toc-mount-point",
            display: false,
            headings: [],
        }
    },

    addOptions() {
        return {
            HTMLAttributes: {},
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
            bootToc: () => ({ editor, commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, "bootToc")
                }

                const nodeStore = this.editor.storage.nodeStore as NodeStoreStorage

                if (nodeStore.article?.attrs?.toc) {
                    commands.displayToc()
                } else {
                    commands.removeToc()
                }

                return true
            },

            displayToc: () => ({ editor }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, "displayToc")
                }

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

                this.storage.display = true

                return true
            },

            removeToc: () => ({ commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, "removeToc")
                }

                const mountPoint = this.editor.options.element?.querySelector(`#${this.storage.mountPointId}`);
                if (mountPoint) {
                    mountPoint.remove();
                }

                this.storage.display = false

                return true;
            },

            enableTocVerbose: () => ({ commands }) => {
                this.storage.verbose = true
                return true
            },

            disableTocVerbose: () => ({ commands }) => {
                this.storage.verbose = false
                return true
            },
        }
    },

    onCreate() {
        const nodeStore = this.editor.storage.nodeStore as NodeStoreStorage
        const article = nodeStore.article

        if (article?.attrs?.toc) {
            this.editor.commands.bootToc()
        }
    },

    onUpdate() {
        const nodeStore = this.editor.storage.nodeStore as NodeStoreStorage
        const article = nodeStore.article

        if (this.storage.display && article?.attrs?.toc) {
            return
        }

        if (!this.storage.display && !article?.attrs?.toc) {
            return
        }

        this.editor.commands.bootToc()
    },
})

export default SmartToc
