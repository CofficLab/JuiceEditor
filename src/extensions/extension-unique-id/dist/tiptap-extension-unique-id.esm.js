import {
  Extension as t,
  findChildren as e,
  combineTransactionSteps as n,
  getChangedRanges as r,
  findChildrenInRange as o
} from '@tiptap/core'
import { Slice as i, Fragment as a } from '@tiptap/pm/model'
import { Plugin as s, PluginKey as d } from '@tiptap/pm/state'
import { v4 as p } from 'uuid'
function u(t) {
  return (function (t, e = JSON.stringify) {
    const n = {}
    return t.filter((t) => {
      const r = e(t)
      return !Object.prototype.hasOwnProperty.call(n, r) && (n[r] = !0)
    })
  })(t.filter((e, n) => t.indexOf(e) !== n))
}
const l = t.create({
  name: 'uniqueID',
  priority: 1e4,
  addOptions: () => ({
    attributeName: 'id',
    types: [],
    generateID: () => p(),
    filterTransaction: null
  }),
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (t) => t.getAttribute(`data-${this.options.attributeName}`),
            renderHTML: (t) =>
              t[this.options.attributeName]
                ? { [`data-${this.options.attributeName}`]: t[this.options.attributeName] }
                : {}
          }
        }
      }
    ]
  },
  onCreate() {
    if (this.editor.extensionManager.extensions.find((t) => 'collaboration' === t.name)) return
    const { view: t, state: n } = this.editor,
      { tr: r, doc: o } = n,
      { types: i, attributeName: a, generateID: s } = this.options
    e(o, (t) => i.includes(t.type.name) && null === t.attrs[a]).forEach(({ node: t, pos: e }) => {
      r.setNodeMarkup(e, void 0, { ...t.attrs, [a]: s() })
    }),
      r.setMeta('addToHistory', !1),
      t.dispatch(r)
  },
  addProseMirrorPlugins() {
    let t = null,
      e = !1
    return [
      new s({
        key: new d('uniqueID'),
        appendTransaction: (t, e, i) => {
          const a = t.some((t) => t.docChanged) && !e.doc.eq(i.doc),
            s =
              this.options.filterTransaction &&
              t.some((t) => {
                var e, n
                return !(null === (n = (e = this.options).filterTransaction) || void 0 === n
                  ? void 0
                  : n.call(e, t))
              }),
            d = t.find((t) => t.getMeta('y-sync$'))
          if (d) return
          if (!a || s) return
          const { tr: p } = i,
            { types: l, attributeName: c, generateID: m } = this.options,
            f = n(e.doc, t),
            { mapping: v } = f
          return (
            r(f).forEach(({ newRange: t }) => {
              const e = o(i.doc, t, (t) => l.includes(t.type.name)),
                n = e.map(({ node: t }) => t.attrs[c]).filter((t) => null !== t)
              e.forEach(({ node: t, pos: r }, o) => {
                var i
                const a = null === (i = p.doc.nodeAt(r)) || void 0 === i ? void 0 : i.attrs[c]
                if (null === a) return void p.setNodeMarkup(r, void 0, { ...t.attrs, [c]: m() })
                const s = e[o + 1]
                if (s && 0 === t.content.size) {
                  if (
                    (p.setNodeMarkup(s.pos, void 0, { ...s.node.attrs, [c]: a }),
                    (n[o + 1] = a),
                    s.node.attrs[c])
                  )
                    return
                  const e = m()
                  return p.setNodeMarkup(r, void 0, { ...t.attrs, [c]: e }), (n[o] = e), p
                }
                const d = u(n),
                  { deleted: l } = v.invert().mapResult(r)
                l && d.includes(a) && p.setNodeMarkup(r, void 0, { ...t.attrs, [c]: m() })
              })
            }),
            p.steps.length ? p : void 0
          )
        },
        view(e) {
          const n = (n) => {
            var r
            t = (null === (r = e.dom.parentElement) || void 0 === r ? void 0 : r.contains(n.target))
              ? e.dom.parentElement
              : null
          }
          return (
            window.addEventListener('dragstart', n),
            {
              destroy() {
                window.removeEventListener('dragstart', n)
              }
            }
          )
        },
        props: {
          handleDOMEvents: {
            drop: (n, r) => {
              var o
              return (
                (t === n.dom.parentElement &&
                  'copy' !==
                    (null === (o = r.dataTransfer) || void 0 === o ? void 0 : o.effectAllowed)) ||
                  ((t = null), (e = !0)),
                !1
              )
            },
            paste: () => ((e = !0), !1)
          },
          transformPasted: (t) => {
            if (!e) return t
            const { types: n, attributeName: r } = this.options,
              o = (t) => {
                const e = []
                return (
                  t.forEach((t) => {
                    if (t.isText) return void e.push(t)
                    if (!n.includes(t.type.name)) return void e.push(t.copy(o(t.content)))
                    const i = t.type.create({ ...t.attrs, [r]: null }, o(t.content), t.marks)
                    e.push(i)
                  }),
                  a.from(e)
                )
              }
            return (e = !1), new i(o(t.content), t.openStart, t.openEnd)
          }
        }
      })
    ]
  }
})
export { l as UniqueID, l as default }
