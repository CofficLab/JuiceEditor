import ImageTipTap from '@tiptap/extension-image'
import { createApp, h } from 'vue'
import Opening from './Opening.vue'
import Draw from './Draw.vue'
import TiptapEditor from '../../model/TiptapEditor'
import ImageHelper from '../../helper/ImageHelper'
const baseImage = 'data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAYAAADHLIObAAAAAXNSR0IArs4c6QAABaJ0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJlbWJlZC5kaWFncmFtcy5uZXQlMjIlMjBhZ2VudCUzRCUyMk1vemlsbGElMkY1LjAlMjAoTWFjaW50b3NoJTNCJTIwSW50ZWwlMjBNYWMlMjBPUyUyMFglMjAxMF8xNV83KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEyNi4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMiUyMHZlcnNpb24lM0QlMjIyNC43LjYlMjIlM0UlMEElMjAlMjAlM0NkaWFncmFtJTIwaWQlM0QlMjI1b3VScmk3aDZYTjA2ZE84WkZMLSUyMiUyMG5hbWUlM0QlMjJQYWdlLTElMjIlM0UlMEElMjAlMjAlMjAlMjAlM0NteEdyYXBoTW9kZWwlMjBkeCUzRCUyMjE4ODYlMjIlMjBkeSUzRCUyMjQ4NyUyMiUyMGdyaWQlM0QlMjIxJTIyJTIwZ3JpZFNpemUlM0QlMjIxMCUyMiUyMGd1aWRlcyUzRCUyMjElMjIlMjB0b29sdGlwcyUzRCUyMjElMjIlMjBjb25uZWN0JTNEJTIyMSUyMiUyMGFycm93cyUzRCUyMjElMjIlMjBmb2xkJTNEJTIyMSUyMiUyMHBhZ2UlM0QlMjIxJTIyJTIwcGFnZVNjYWxlJTNEJTIyMSUyMiUyMHBhZ2VXaWR0aCUzRCUyMjg1MCUyMiUyMHBhZ2VIZWlnaHQlM0QlMjIxMTAwJTIyJTIwbWF0aCUzRCUyMjAlMjIlMjBzaGFkb3clM0QlMjIwJTIyJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTNDcm9vdCUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214Q2VsbCUyMGlkJTNEJTIyMCUyMiUyMCUyRiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214Q2VsbCUyMGlkJTNEJTIyMSUyMiUyMHBhcmVudCUzRCUyMjAlMjIlMjAlMkYlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteEdlb21ldHJ5JTIweCUzRCUyMjMyMCUyMiUyMHklM0QlMjIyMDAlMjIlMjB3aWR0aCUzRCUyMjgwJTIyJTIwaGVpZ2h0JTNEJTIyODAlMjIlMjBhcyUzRCUyMmdlb21ldHJ5JTIyJTIwJTJGJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDJTJGbXhDZWxsJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTNDJTJGcm9vdCUzRSUwQSUyMCUyMCUyMCUyMCUzQyUyRm14R3JhcGhNb2RlbCUzRSUwQSUyMCUyMCUzQyUyRmRpYWdyYW0lM0UlMEElM0MlMkZteGZpbGUlM0UlMEEuxkovAAAJTElEQVR4Xu2de1jO2RbHvyG5E+Oa63FL1MS4NIxINUKS6+MSZSSXKfUkEoMimnHpuOcSmYgiRcoMOkXEVIdcpnRDkyLJ7QzSEOdZa877nnI5p3p3MzJ7/9Xz / vZvvXt / 9nfvtX5r / Z5eNXvv6NeQTTUCajBSI5CjjfVUM / QXvfu1GhASeQUoDlKraf2 / KI7yTzs777EEWX58 / 71TghRBEYAEKUEKIiDIjFSkBCmIgCAzUpESpCACgsxIRUqQgggIMiMVKUEKIiDIjFSkBCmIgCAzUpESpCACgsxIRUqQgggIMiMVKUEKIiDIjFSkBCmIgCAzUpEfMshXr14hMeE8Mm + mo3mLVujRuy9q1KgpaMhlM / P48UPk5mSjs45u2W4sY2 / hinz08D7srCxw6UIcatepy8N5 + uRXWI61wvI1W6GhUaOMQ1St + 5HgAMyzt0Za7kvVDP2fu4WDdF9gDxp8UPhZdOysAzU1NcRE / QjbieZw + WYl7OznV + iE3jReaUGOtzDEg / v5 + CHmKqpWraqc12ZvTzRtroUxE6byZwF + W3A8IhTpKUnoa2iMsZOmwaDfQL62ae1yFBYWQkNDA2Eh + 9GqdVs4uCzFxfhYBO71RbWq1WBnPw + W4yYjNfkqVi135fuD9uxAStIVDPrSHK5LV6Fe / Qa8qMUV + ezpE3h7LUZM9HG2P9RiLC9u1WrVVFpg4Ypc47kQ2zetgulQSwwfNQE9 + 3yBTxo3LTHIY0cOwGnGRFh99TX0P + uDI8F7kZ6SjMi4VFSvroG5syfjaMh + PtcGDxuFAD8f3M / PQ6NPmmCizUwk / HQGP52NxrmrObiRkQqrkYPY / tyFnlCrUgU0BhMzC2zZHVIC5OvXrzHJ0gjXki7Dxs6RQRJUsun + 7aYPC2RBwTN4LnLCwX27lANr274TrG3tMc7KFurq1Vk52VmZmLtoBfdJupqIkaa9cCAilsESyKgT4Yi9fAu1atfB9zs2YMViZ2zwDYKZ + WikXfsZ5kb68D8UiSpVqjDIJSvX88Kw2nf7wGOBA6ITMvDPuFilIs / F / AM24wbD5 / tQGA8ezn39tq2D11IXXEi7j7r1yv / ymHBFKug9f16AK4kJiIs9hYMBu5B7JxtTZzjBzWMNd1GoKivzOs6eOsmKCzx6Bj16fc4g7 + Xlwj / 4JPcNDw2E8ywrJKTeQ / 36mnytn15LbPU / jDp16zHIo1GJSs + clpIE84GfMui7d3KUIHduWYvvlrliiq2DMoq49csN / HA0GOHRl9CpS7dyq1IoyCe//gv+vhthOnQkOxpFKyoqwhgzA2TezEBixkOlwmjbf9a7Hxo1boKVS+aWAEkLsXlXcAmQSbeesaLfBTImMRPNmrfk/slXL8HStCd890Xg4YN8JUjaxlvXe/FWVoNaCWjTZjujZet2HwbIFy9+Q9dWtfjwJg9dvC1b6IjQA/64mP4AJgadoaOrj42+B7jLhbhYTBgxQCWQpD6Fs9qzcxOWL3J6a2vTcbPI2Q4Rp68oF5rUezz8EGxnz0XNWrU/DJA0CvKQ5Ck9vtsMQ2MzPsPobHJzssXYiV9hhfd2Pg8bNGwEb5+9uJOTjUXO0/mc9N0XDsNBZry1y6pIXf2eWLtlD+io8HCbg1q1a/N2L+6183Jv4wv91uzVnd08kX/vLrzcXTgKCD2ZUG6IdKPQrU0G6UnC3dUeEYeDlAMjb2syZAQWLluLmjVrIfLHMAZOgTq1+Uu+RUigPzLSklmxS12/fifI5FsFqKauzgD66mph254jHPTTGdmn7wDEnTvN9shhea3zRfuOXd4Kf8iJ0UIpvpscoc/uQ9xXlSYcpGIw5DzIMzfQbIg27Tq8NcaXL15w6NKuQyc+94pevmRAFGuWpcWfj2GQZy9lcSz4vOAZtFq1/Z8mSO030lNRXaM6/tZBm3eNqq3CQKo6sNLeXxxkk2YtSnub8H6VHiQ908+yHomwqIto3KSZcEClNVjpQZZ2ohXdT4IURFiCrCwgyUP+ciMDWq3a8OPcx9oqXJGU1rIw7sExn5HpsI+Vo/iA/E1SEqQg7bwJsixJWxrC9fRr8PfdhOgTEWjWQgt9+hnBwWUx5y2pURxJNvPz7sLYzAKamg05MLeePoev0yPjak83XL4Qj7btO3LCglJxotsfvrXLkrTV1GyEIQP0+FnYeroDKLvt5T4Pnmu2cm5TkZfsN8AEvQz6I9B/B6frqD60auNuPLh/D8Z9OqFho8aYYmuPjLRrnAtdt20fho4YJ5TlnwKytEnbLt0+hZvjNDjO91DmGmfbjEJh4XPs3H8MCxyncV7zWMwVLqpR4a13l6ZKkBtWe7Baz/98m7Pr1GZOscSjRw8QGBZT+UGWNmlLWRpKgkSEBuF6egpuZKQg9nQk+ht9ySCHD+oOPf1enFFStNFmBmjfUZsVSQW3C/GxmGQzS3k9/vxppKcmc15UZPtTFFnaFFnvzw3Rv3sbnu+Q4WPQUbsrok9GQF1dnUEadm+LIRZjlFl36kelYEqUEEiCejs7660zkeo6VJoQ2T5okPl5ufjGZSbCT11GJ+2uPO8pY0yVIOlvyoBT3pEaZZQIPCmWQFKqjlJ2VI9RZHhORR5Dzq1MTJo6WyTHPz78KUvSlmriMyaP4Bi0e08DHD64l0sS9OZGQEgUDgTs5NzlnHlLMdB0GPb5+SB4v5/yjCRopNAZDq4Yb22HhPNn4OHmgInWMzFvsVflAkl1ZzrLtu8Nw0CToe/Nfr8raWtoNBh2ky1wJvoET5qy4KZDRnAJleA4uXpg9YqF2OXjzdcpuUuOqLOOHpav9uHPyNmQ01E0GsP67ftVKiu8awUqfGuLWPbbOVkcAinyjeSdKY7Mu3sHvxUWsnMpelXEn1EZY/QEG2Vplr6fHFbWzetcZGuh1VrEkN6yUSlAvm/mVEZ1nD4e63cEQltHF8fDQ1itISfi0U2vR4UAe5/RSg2S3nqjFwfozQ0qbVD9xWm+u/BguzQrUqlBFp9gwbOnws+90gBU9PloQJZl0hXRV4IURFWClCAFERBkRipSghREQJAZqUgJUhABQWakIiVIQQQEmZGKlCAFERBkRipSghREQJAZqUgJUhABQWakIiVIQQQEmZGKlCAFERBkRiqyokCOMpG/HlJetiV+PaS8RuR9/yHAP8Py9+jf/6mEbCoR+Dfb7iHQJBBD7wAAAABJRU5ErkJggg=='

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
        }
    }
}

let title = "🐰 SmartImage"

const SmartImage = ImageTipTap.extend<ImageOptions>({
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
            verbose: true,
            title: '🐰 SmartImage',
            drawIoLink: null,
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
            baseImage: baseImage,
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
                        src: baseImage,
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

                if (verbose) {
                    console.log(title, "setShape", shape, className)
                }

                return commands.updateAttributes(this.name, {
                    class: className
                })
            },

            setDrawLink: (link: string) => ({ commands }) => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(title, 'setDrawLink', link)
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
                mountPoint.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 半透明白色背景
                mountPoint.style.backdropFilter = 'blur(10px)'; // 毛玻璃效果
                (mountPoint.style as any)['WebkitBackdropFilter'] = 'blur(10px)'; // 为Safari浏览器添加前缀

                let shadowRoot = this.editor.options.element?.shadowRoot
                if (!shadowRoot) {
                    console.error('No shadow root found');
                    return false;
                }
                shadowRoot.appendChild(mountPoint);

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
                    console.log(this.storage.title, 'closeLoading', reason)
                }

                let shadowRoot = this.editor.options.element?.shadowRoot
                if (!shadowRoot) {
                    console.error('No shadow root found');
                    return false;
                }

                let openingDom = shadowRoot.getElementById(this.options.mountPointId)
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

                let shadowRoot = this.editor.options.element?.shadowRoot
                if (!shadowRoot) {
                    console.error('No shadow root found');
                    return false;
                }
                shadowRoot.appendChild(mountPoint);

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

                let shadowRoot = this.editor.options.element?.shadowRoot
                if (!shadowRoot) {
                    console.error('No shadow root found');
                    return false;
                }

                let drawDom = shadowRoot.getElementById(this.options.drawPageId)
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

                this.editor.commands.webKitDownloadImage(src, attrs.alt)

                return true
            }
        }
    },

    onCreate() {
        if (this.options.drawIoLink) {
            this.editor.commands.setDrawLink(this.options.drawIoLink)
        }
    }
})

export default SmartImage;
