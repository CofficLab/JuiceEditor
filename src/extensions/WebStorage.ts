import { generateHTML, generateJSON, JSONContent } from '@tiptap/core';
import { TiptapExtension } from '../model/TiptapGroup'
import axios from 'axios';
import { ArticleHasNoUUIDError, ArticleHasNoHTMLError } from '../error/ArticleError';
import { DocHasNoContentError, DocHasNoArticleError } from '../error/DocError';
import EditorNode from 'src/model/EditorNode';
import Article from './Article';
import { ParamErrorNoUUID } from '../error/ParamError';

export interface WebStorageStorage {
    verbose: boolean,
    emoji: string,
    printHTML: boolean,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        WebStorage: {
            setContentFromWeb: (url: string, uuid: string) => ReturnType
        }
    }
}

const WebStorage = TiptapExtension.create<{}, WebStorageStorage>({
    name: "webStorage",

    addStorage() {
        return {
            verbose: true,
            printHTML: false,
            emoji: "🌍 WebStorage",
        }
    },

    addCommands() {
        return {
            setContentFromWeb: (url: string, uuid: string) => ({ editor, commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, 'loadContentFromWeb', url, uuid)
                    commands.webKitSendDebugMessage(`loadContentFromWeb -> ${url}`)
                }

                try {
                    if (uuid === '' || uuid === undefined) {
                        throw new ParamErrorNoUUID('参数错误：UUID为空', 'setContentFromWeb')
                    }

                    commands.setLoading(true)

                    axios.get(`${url}`)
                        .then(response => {
                            let content = response.data
                            var doc: JSONContent = generateJSON(content, this.editor.extensionManager.extensions)
                            var children: JSONContent[] | undefined = doc.content

                            if (!children) {
                                throw new DocHasNoContentError('内部错误：文档没有内容')
                            }

                            var article: JSONContent | undefined = children.find(child => child.type === Article.name)

                            if (!article) {
                                throw new DocHasNoArticleError('内部错误：文档没有文章')
                            }

                            // update article uuid
                            article.attrs = article.attrs ?? {}
                            article.attrs.uuid = uuid
                            doc.content = children.map((child: JSONContent) =>
                                child.type === Article.name ? article! : child
                            )

                            let html = generateHTML(doc, this.editor.extensionManager.extensions)

                            if (this.storage.printHTML) {
                                console.log(this.storage.emoji, 'loadContentFromWeb')
                                console.log(html)
                            }

                            editor.commands.setContent(html, true)
                        })
                        .catch(error => {
                            console.error(this.storage.emoji, 'loadContentFromWeb error', error)
                            throw error
                        }).finally(() => {
                            commands.setLoading(false)
                        })
                } catch (error: any) {
                    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
                        this.editor.commands.showAlert('通过网络获取内容失败，可能是跨域限制', {
                            url,
                            error: error.message
                        })
                    } else if (error instanceof ParamErrorNoUUID) {
                        this.editor.commands.showAlert(error.message, {
                            url,
                            uuid,
                            error: error.message,
                            reporter: this.storage.emoji,
                            stage: error.stage
                        })
                    } else {
                        this.editor.commands.showAlert('加载内容失败', {
                            url,
                            error: error.message,
                            reporter: this.storage.emoji,
                            stage: 'setContentFromWeb'
                        })
                    }
                }

                return true
            }
        }
    }
})

export default WebStorage