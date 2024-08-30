import { Editor, Extension, NodePos } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { Node } from 'prosemirror-model'
import PanelVue from './Panel.vue'

let emoji = '🥘 Panel'

const Panel = Extension.create({
    name: 'panel',

    addOptions() {
        return {
            types: ['paragraph', 'heading', 'a', 'pre', 'taskList', 'image', 'table']
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    panel: {
                        default: null,
                        parseHTML: element => element.getAttribute('panel'),
                        renderHTML: attributes => {
                            if (!attributes.panel) {
                                return {}
                            }
                            return { 'panel': true }
                        },
                    },
                },
            },
        ]
    },

    /**
     * The editor is not ready yet.
     */
    onBeforeCreate() {
        let verbose = false

        if (verbose) {
            console.log(emoji, 'onBeforeCreate')
        }
    },

    onCreate() {
        let verbose = false
        let verbose2 = false

        if (verbose) {
            console.log(emoji, 'onCreate')
        }

        let tr = this.editor.state.tr
        this.editor.state.doc.descendants((node: Node, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
                if (!node.attrs.panel) {
                    tr.setNodeMarkup(pos, void 0, { ...node.attrs, panel: true })
                }
            }
        })

        if (tr.docChanged) {
            this.editor.view.dispatch(tr)
        }

        // showMenu(this.editor)
    },

    onUpdate() {
        let verbose = false
        let verbose2 = false

        if (verbose) {
            console.log(emoji, 'onUpdate')
        }

        let tr = this.editor.state.tr
        this.editor.state.doc.descendants((node: Node, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
                if (!node.attrs.panel) {
                    tr.setNodeMarkup(pos, void 0, { ...node.attrs, panel: true })
                }
            }
        })

        // 如果有变动，则提交
        if (tr.docChanged) {
            this.editor.view.dispatch(tr)
        }
    }
})

export default Panel

function showMenu(editor: Editor) {
    let panels = editor.view.dom.querySelectorAll('[panel]')
    panels.forEach((panel) => {
        panel.addEventListener('mouseenter', (event: Event) => {
            let e = event as MouseEvent
            const pos = editor.view.posAtCoords({ left: e.clientX, top: e.clientY })
            if (pos) {
                const node = editor.$pos(pos.pos).node
                if (node) {
                    let target = event.target as HTMLElement
                    const nodeDOM = target
                    if (nodeDOM) {
                        const { left, top } = nodeDOM.getBoundingClientRect()

                        let menu = makeMenu(editor, node)
                        // 更新菜单位置，显示在节点的左侧
                        menu.style.left = `${left - menu.offsetWidth - 10}px` // 左侧偏移
                        menu.style.top = `${top}px` // 垂直对齐
                        menu.innerText = `节点类型: ${node.type.name} Pos: ${pos.pos}` // 显示节点类型
                        menu.style.display = 'block' // 显示菜单

                        document.body.appendChild(menu)
                    }
                }
            }
        })
    })
}

function makeMenu(editor: Editor, node: Node) {
    // 删除所有菜单
    const menus = document.querySelectorAll('#block-menu')
    menus.forEach((menu) => {
        menu.remove()
    })

    // 创建菜单元素
    const menu = document.createElement('div')
    menu.id = 'block-menu'
    menu.style.position = 'fixed'
    menu.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
    menu.style.color = 'white'
    menu.style.padding = '5px'
    menu.style.borderRadius = '3px'
    menu.onclick = () => {
        console.log(editor)
        console.log(node)
    }

    return menu
}