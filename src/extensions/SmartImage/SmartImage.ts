import ImageTipTap from '@tiptap/extension-image'
import { createApp, h } from 'vue'
import Opening from './Opening.vue'
import Draw from './Draw.vue'
import { TiptapEditor } from '../../model/TiptapGroup'
import ImageHelper from '../../helper/ImageHelper'

const baseDrawImage = `data:image/png;base64,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`

export interface ImageOptions {
    inline: boolean,
    allowBase64: boolean,
    openDialog: 'click' | 'dblclick',
    drawIoLink: string,
    monacoLink: string,
    baseImage: string,
    HTMLAttributes: Record<string, any>,
    shapeClass: Record<string, string>,
    mountPointId: string,
    drawPageId: string,
}

export interface SmartImageStorage {
    verbose: boolean,
    title: string,
    drawIoLink: string,
    opened: boolean,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartImage: {
            insertImage: () => ReturnType,
            insertDraw: () => ReturnType,
            setShape: (shape: string) => ReturnType,
            setDrawLink: (link: string) => ReturnType,
            openLoading: () => ReturnType,
            openDraw: () => ReturnType,
            closeLoading: (reason: string) => ReturnType,
            closeDraw: () => ReturnType,
            downloadImage: () => ReturnType,
            enableImageVerbose: () => ReturnType,
            disableImageVerbose: () => ReturnType,
        }
    }
}

let title = "🐰 SmartImage"

const SmartImage = ImageTipTap.extend<ImageOptions, SmartImageStorage>({
    parseHTML() {
        return [
            {
                tag: 'img'
            },
            {
                tag: 'draw',
            },
        ]
    },

    addStorage() {
        return {
            verbose: false,
            title: '🐰 SmartImage',
            drawIoLink: '',
            opened: false,
        }
    },

    addOptions() {
        return {
            drawPageId: 'draw-page',
            mountPointId: 'draw-opening',
            inline: false,
            allowBase64: true,
            drawIoLink: 'https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&modified=unsavedChanges&proto=json',
            monacoLink: '',
            baseImage: baseDrawImage,
            openDialog: 'click',
            HTMLAttributes: {},
            shapeClass: {
                heart: 'mask mask-heart',
                squircle: 'mask mask-squircle',
                decagon: 'mask mask-decagon',
                pentagon: 'mask mask-pentagon',
                diamond: 'mask mask-diamond',
                circle: 'mask mask-circle',
                parallelogram: 'mask mask-parallelogram',
                star: 'mask mask-star',
                hexagon: 'mask mask-hexagon',
                triangle: 'mask mask-triangle',
                none: '',
            }
        }
    },

    addAttributes() {
        return {
            class: {
                default: "",
            },
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            draw: {
                default: false,
                parseHTML: (element) => {
                    return element.tagName == 'draw' || element.tagName == 'DRAW' || element.attributes.getNamedItem('draw') != null;
                },
                // 保存成html时
                renderHTML: (attributes) => {
                    if (attributes.draw) {
                        return { 'draw': true }
                    }

                    return {}
                }
            },
        }
    },

    addCommands() {
        return {
            insertImage: () => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: {
                        src: baseDrawImage,
                        alt: '',
                        title: ''
                    },
                })
            },

            insertDraw: () => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: {
                        src: this.options.baseImage,
                        alt: '',
                        draw: true,
                        title: ''
                    },
                })
            },

            setShape: (shape: string) => ({ commands }) => {
                var verbose = true;
                var className = this.options.shapeClass[shape] || '';

                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.title, '🔄 setShape ' + shape + ' ' + className)
                }

                return commands.updateAttributes(this.name, {
                    class: className
                })
            },

            setDrawLink: (link: string) => ({ commands }) => {
                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.title, '⚙️ set draw link ' + link)
                }

                this.storage.drawIoLink = link

                return true
            },

            openLoading: () => ({ commands, editor }) => {
                const drawIoLink = this.storage.drawIoLink
                const mountPoint = document.createElement('div');
                mountPoint.id = this.options.mountPointId;
                mountPoint.style.position = 'fixed';
                mountPoint.style.top = '0';
                mountPoint.style.left = '0';
                mountPoint.style.width = '100%';
                mountPoint.style.height = '100%';
                mountPoint.style.display = 'flex';
                mountPoint.style.justifyContent = 'center';
                mountPoint.style.alignItems = 'center';
                mountPoint.style.zIndex = '9999';
                mountPoint.style.backgroundColor = 'rgba(128, 128, 128, 0.5)'; // 半透明灰色背景
                mountPoint.style.backdropFilter = 'blur(10px)'; // 毛玻璃效果
                (mountPoint.style as any)['WebkitBackdropFilter'] = 'blur(10px)'; // 为Safari浏览器添加前缀

                let editorElement = editor.options.element
                editorElement.appendChild(mountPoint);

                const app = createApp({
                    render() {
                        return h(Opening, {
                            editor: editor,
                            drawIoLink: drawIoLink,
                            onClose: () => {
                                app.unmount();
                                document.body.removeChild(mountPoint);
                            }
                        });
                    }
                });

                app.mount(mountPoint);
                return true;
            },

            closeLoading: (reason: string) => ({ commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, 'closeLoading with reason', reason)
                }

                let editorElement = this.editor.options.element

                let openingDom = editorElement.querySelector(`#${this.options.mountPointId}`)
                if (openingDom) {
                    openingDom.remove()
                }

                return true
            },

            openDraw: () => ({ commands, editor }) => {
                if (this.storage.opened) {
                    return true
                }

                if (this.storage.verbose) {
                    console.log(this.storage.title, 'openDraw')
                }

                const extensionName = this.name
                const drawIoLink = this.storage.drawIoLink
                const mountPoint = document.createElement('div');
                mountPoint.id = this.options.drawPageId;
                mountPoint.style.position = 'fixed';
                mountPoint.style.top = '0';
                mountPoint.style.left = '0';
                mountPoint.style.width = '100%';
                mountPoint.style.height = '100%';
                mountPoint.style.display = 'flex';
                mountPoint.style.justifyContent = 'center';
                mountPoint.style.alignItems = 'center';
                mountPoint.style.zIndex = '9999';

                const src = editor.getAttributes(this.name).src;

                let editorElement = editor.options.element
                editorElement.appendChild(mountPoint);

                const app = createApp({
                    render() {
                        return h(Draw, {
                            drawIoLink: drawIoLink,
                            src: src,
                            onUpdate: (data: string) => {
                                editor.chain().focus().updateAttributes(extensionName, { src: data }).run()
                            },
                            onReady: () => {
                                commands.closeLoading('draw ready')
                            },
                            onClose: () => {
                                app.unmount();
                                commands.closeDraw()
                            }
                        });
                    }
                });

                app.mount(mountPoint);

                this.storage.opened = true
                return true;
            },

            closeDraw: () => ({ commands }) => {
                console.log('closeDraw')

                let editorElement = this.editor.options.element

                let drawDom = editorElement.querySelector(`#${this.options.drawPageId}`)
                if (drawDom) {
                    drawDom.remove()
                } else {
                    console.error('No draw dom found')
                }

                this.storage.opened = false
                return true
            },

            downloadImage: () => ({ editor }: { editor: TiptapEditor }) => {
                let attrs = editor.getAttributes(SmartImage.name)
                let src: string = attrs.src

                if (this.storage.verbose) {
                    console.log(this.storage.title, 'downloadImage')
                }

                if (src.startsWith('data:image/') || src.startsWith('data: image/')) {
                    ImageHelper.downloadBase64(src)
                } else {
                    ImageHelper.downloadImageFromUrl(src)
                }

                this.editor.commands.webKitDownloadImage(src, "image" + ImageHelper.getExtension(src))

                return true
            },

            enableImageVerbose: () => ({ commands }) => {
                this.storage.verbose = true;
                return true;
            },

            disableImageVerbose: () => ({ commands }) => {
                this.storage.verbose = false;
                return true;
            },
        }
    },

    onCreate() {
        if (this.options.drawIoLink) {
            this.editor.commands.setDrawLink(this.options.drawIoLink)
        }
    }
})

export default SmartImage;
