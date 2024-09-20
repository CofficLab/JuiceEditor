const title = "🔧 DomHelper"

class DomHelper {
    static getShadowRoot(shadowHostSelector = 'juice-editor'): ShadowRoot | null {
        // 获取 Shadow DOM 的宿主元素
        const shadowHost = document.querySelector(shadowHostSelector)
        if (!shadowHost) {
            console.error('Shadow host not found')
            return null
        }

        // 访问 Shadow DOM
        const shadowRoot = shadowHost.shadowRoot
        if (!shadowRoot) {
            console.error('Shadow root not found')
            return null
        }

        return shadowRoot
    }

    static goto(id: string, shadowHostSelector: string, offset: number = 120) {
        let verbose = false
        if (verbose) {
            console.log(title, 'goto', id)
        }

        // 获取目标 div
        const targetDiv = DomHelper.findElement(id, shadowHostSelector)

        // 如果找到目标 div，则滚动到该 div
        if (targetDiv) {
            const elementPosition = targetDiv.getBoundingClientRect().top + window.scrollY // 目标元素的绝对位置
            const offsetPosition = elementPosition - offset // 减去偏移量

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        } else {
            console.log('Target div not found in Shadow DOM')
        }
    }

    static findElement(id: string, shadowHostSelector: string = 'juice-editor'): HTMLElement | null {
        // 从document中找
        let element = document.getElementById(id)
        if (element) {
            return element
        }

        // 访问 Shadow DOM
        const shadowRoot = DomHelper.getShadowRoot(shadowHostSelector)
        if (!shadowRoot) {
            console.error('Shadow root not found')
            return null
        }

        return shadowRoot.getElementById(id)
    }

    static querySelector(s: string, shadowHostSelector: string = 'juice-editor'): Element | null {
        // 从document中找
        let element = document.querySelector(s)
        if (element) {
            return element
        }

        // 访问 Shadow DOM
        const shadowRoot = DomHelper.getShadowRoot(shadowHostSelector)
        if (!shadowRoot) {
            console.error('Shadow root not found')
            return null
        }

        return shadowRoot.querySelector(s)
    }

    static selectorAll(s: string, shadowHostSelector: string = 'juice-editor'): NodeListOf<Element> {
        // 从document中找
        let elements = document.querySelectorAll(s)
        if (elements) {
            return elements
        }

        // 访问 Shadow DOM
        const shadowRoot = DomHelper.getShadowRoot(shadowHostSelector)
        if (!shadowRoot) {
            console.error('Shadow root not found')
            return [] as unknown as NodeListOf<Element>
        }

        return shadowRoot.querySelectorAll(s)
    }

    static toTop() {
        let verbose = false;
        if (verbose) {
            console.log(title, '滚动到顶部')
        }
        window.scrollTo(0, 0)
    }
}

export default DomHelper