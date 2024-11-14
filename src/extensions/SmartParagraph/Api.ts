interface sendOptions {
    url: string,
    params: Record<string, string>,
    callback: (message: string) => void,
    onError: (error: Error) => void,
    onEnd: () => void,
}

const title = "🌍 Api"
const verbose = false;

function sse(options: sendOptions) {
    var headers = new Headers();
    headers.append("Accept", "*/*");
    headers.append("Connection", "keep-alive");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
        urlencoded.append(key, value);
    });

    console.log(title, "Api", options.url)
    console.log(title, "向服务器发送数据", options.params)

    fetch(options.url, {
        method: 'POST',
        body: urlencoded,
        headers: headers,
    }).then((response) => {
        console.log(title, 'HTTP Status Code:', response.status);

        if (!response.ok) {
            console.log(title, 'HTTP Error', response);
            throw new Error('http status code ' + response.status + ' ' + response.statusText);
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
                    if (verbose) {
                        console.log(title, '🎉 SSE 流结束。');
                    }

                    options.onEnd();
                } else {
                    const stringValue = textDecoder.decode(value);
                    const result = stringValue.replace(/\n+$/, "");

                    if (verbose) {
                        console.log(title, '📥 SSE 数据', result);
                    }

                    options.callback(result);

                    readData(); // 继续读取下一条数据
                }
            });
        };

        // 开始读取 SSE 数据
        readData();
    }).catch((error) => {
        console.warn(title, 'Fetch error:', error);

        options.onError(error);
    });
}

export function translate(options: {
    url: string,
    text: string,
    language: string,
    callback: (message: string) => void,
    onError: (error: Error) => void,
    onEnd: () => void,
}) {
    sse({
        url: options.url,
        params: {
            text: "翻译到" + options.language + "：" + options.text,
        },
        callback: options.callback,
        onError: options.onError,
        onEnd: options.onEnd,
    })
}