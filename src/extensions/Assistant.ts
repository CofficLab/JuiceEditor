import { Extension } from "@tiptap/core";

export interface AssistantStorage {
    verbose: boolean,
    title: string,
    chatApi: string,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        Assistant: {
            setChatApi: (api: string) => ReturnType
            chat: (options: chatOptions) => ReturnType
            enableAssistantVerbose: () => ReturnType
            disableAssistantVerbose: () => ReturnType
        }
    }
}

interface chatOptions {
    url: string,
    params: Record<string, string>,
    callback: (message: string) => void,
    onError: (error: Error) => void,
    onEnd: () => void,
}

const Assistant = Extension.create<{}, AssistantStorage>({
    name: 'assistant',

    addStorage() {
        return {
            verbose: false,
            chatApi: "",
            title: '🦜 Assistant',
        }
    },

    addCommands() {
        return {
            setChatApi: (api: string) => ({ commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, '⚙️ set chat api', api);
                }

                this.storage.chatApi = api;

                return true;
            },

            chat: (options: chatOptions) => ({ commands }) => {
                if (!this.storage.chatApi) {
                    this.editor.commands.showAlert('请先设置 Chat API', {
                        description: '翻译等功能需要使用 Chat API',
                    });
                    return false;
                }

                var headers = new Headers();
                headers.append("Accept", "*/*");
                headers.append("Connection", "keep-alive");
                headers.append("Content-Type", "application/x-www-form-urlencoded");

                var urlencoded = new URLSearchParams();
                Object.entries(options.params).forEach(([key, value]) => {
                    urlencoded.append(key, value);
                });

                if (this.storage.verbose) {
                    console.log(this.storage.title, "Api", options.url)
                    console.log(this.storage.title, "向服务器发送数据", options.params)
                }

                fetch(options.url, {
                    method: 'POST',
                    body: urlencoded,
                    headers: headers,
                }).then((response) => {
                    if (!response.ok) {
                        console.log(this.storage.title, 'HTTP Error', response);
                        throw new Error(response.status + ' ' + response.statusText);
                    }

                    // 通过 Response 对象的 body 属性来获取 SSE 流数据
                    const sseStream = response.body;

                    if (!sseStream) {
                        throw new Error('SSE stream is not available');
                    }

                    // 从 SSE 流中读取数据
                    const reader = sseStream.getReader();

                    // 创建一个 TextDecoder 来将字节数据转换为字符串
                    const textDecoder = new TextDecoder();

                    // 读取 SSE 数据
                    const readData = () => {
                        reader.read().then(({ value, done }) => {
                            if (done) {
                                if (this.storage.verbose) {
                                    console.log(this.storage.title, '🎉 SSE 流结束。');
                                }

                                options.onEnd();
                            } else {
                                const stringValue = textDecoder.decode(value);
                                const result = stringValue.replace(/\n+$/, "");

                                if (this.storage.verbose) {
                                    console.log(this.storage.title, '📥 SSE 数据', result);
                                }

                                options.callback(result);

                                readData(); // 继续读取下一条数据
                            }
                        });
                    };

                    // 开始读取 SSE 数据
                    readData();
                }).catch((error) => {
                    options.onError(error);
                });

                return true;
            },

            enableAssistantVerbose: () => ({ commands }) => {
                this.storage.verbose = true;
                return true;
            },

            disableAssistantVerbose: () => ({ commands }) => {
                this.storage.verbose = false;
                return true;
            },
        };
    },
});

export default Assistant;

