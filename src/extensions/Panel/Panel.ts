import { Extension } from '@tiptap/core'
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
        console.log(emoji, 'onBeforeCreate')
    },

    onCreate() {
        console.log(emoji, 'create')

        let verbose = true
        let verbose2 = true

        if (verbose) {
            console.log(emoji, 'onUpdate')
        }

        let tr = this.editor.state.tr
        this.editor.state.doc.descendants((node: Node, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
                if (!node.attrs.panel) {
                    console.log(emoji, 'onUpdate', node.type.name, node.attrs)
                    tr.setNodeMarkup(pos, void 0, { ...node.attrs, panel: true })
                }
            }
        })

        if (tr.docChanged) {
            this.editor.view.dispatch(tr)
        }

        // 创建菜单元素
        const menu = document.createElement('div')
        menu.style.position = 'fixed'
        menu.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        menu.style.color = 'white'
        menu.style.padding = '5px'
        menu.style.borderRadius = '3px'
        // menu.style.display = 'none' // 初始隐藏
        document.body.appendChild(menu)

        let panels = this.editor.view.dom.querySelectorAll('[panel]')
        panels.forEach((panel) => {
            panel.addEventListener('mouseenter', (event: Event) => {
                let e = event as MouseEvent
                const pos = this.editor.view.posAtCoords({ left: e.clientX, top: e.clientY })
                if (pos) {
                    const node = this.editor.view.state.doc.nodeAt(pos.inside)
                    if (node) {
                        let target = event.target as HTMLElement
                        const nodeDOM = target
                        if (nodeDOM) {
                            const { left, top } = nodeDOM.getBoundingClientRect()

                            // 更新菜单位置，显示在节点的左侧
                            menu.style.left = `${left - menu.offsetWidth - 10}px` // 左侧偏移
                            menu.style.top = `${top}px` // 垂直对齐
                            menu.innerText = `节点类型: ${node.type.name}` // 显示节点类型
                            menu.style.display = 'block' // 显示菜单
                        }
                    }
                }
            })

            // panel.addEventListener('mouseleave', (event) => {
            //     console.log(emoji, 'leave', event.target)

            //     menu.style.display = 'none' // 鼠标离开时隐藏菜单
            // })
        })
    },

    onUpdate() {
        let verbose = true
        let verbose2 = true

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