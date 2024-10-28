!(function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? e(
              exports,
              require('@tiptap/core'),
              require('@tiptap/pm/model'),
              require('@tiptap/pm/state'),
              require('uuid')
          )
        : 'function' == typeof define && define.amd
        ? define(['exports', '@tiptap/core', '@tiptap/pm/model', '@tiptap/pm/state', 'uuid'], e)
        : e(
              ((t = 'undefined' != typeof globalThis ? globalThis : t || self)[
                  '@tiptap-pro/extension-unique-id'
              ] = {}),
              t.core,
              t.model,
              t.state,
              t.uuid
          )
})(this, function (t, e, n, r, o) {
    'use strict'
    function i(t) {
        return (function (t, e = JSON.stringify) {
            const n = {}
            return t.filter((t) => {
                const r = e(t)
                return !Object.prototype.hasOwnProperty.call(n, r) && (n[r] = !0)
            })
        })(t.filter((e, n) => t.indexOf(e) !== n))
    }
    const a = e.TiptapExtension.create({
        name: 'uniqueID',
        priority: 1e4,
        addOptions: () => ({
            attributeName: 'id',
            types: [],
            generateID: () => o.v4(),
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
                                    ? {
                                          [`data-${this.options.attributeName}`]:
                                              t[this.options.attributeName]
                                      }
                                    : {}
                        }
                    }
                }
            ]
        },
        onCreate() {
            if (this.editor.extensionManager.extensions.find((t) => 'collaboration' === t.name))
                return
            const { view: t, state: n } = this.editor,
                { tr: r, doc: o } = n,
                { types: i, attributeName: a, generateID: s } = this.options
            e
                .findChildren(o, (t) => i.includes(t.type.name) && null === t.attrs[a])
                .forEach(({ node: t, pos: e }) => {
                    r.setNodeMarkup(e, void 0, { ...t.attrs, [a]: s() })
                }),
                r.setMeta('addToHistory', !1),
                t.dispatch(r)
        },
        addProseMirrorPlugins() {
            let t = null,
                o = !1
            return [
                new r.Plugin({
                    key: new r.PluginKey('uniqueID'),
                    appendTransaction: (t, n, r) => {
                        const o = t.some((t) => t.docChanged) && !n.doc.eq(r.doc),
                            a =
                                this.options.filterTransaction &&
                                t.some((t) => {
                                    var e, n
                                    return !(null === (n = (e = this.options).filterTransaction) ||
                                    void 0 === n
                                        ? void 0
                                        : n.call(e, t))
                                }),
                            s = t.find((t) => t.getMeta('y-sync$'))
                        if (s) return
                        if (!o || a) return
                        const { tr: d } = r,
                            { types: u, attributeName: p, generateID: l } = this.options,
                            c = e.combineTransactionSteps(n.doc, t),
                            { mapping: f } = c
                        return (
                            e.getChangedRanges(c).forEach(({ newRange: t }) => {
                                const n = e.findChildrenInRange(r.doc, t, (t) =>
                                        u.includes(t.type.name)
                                    ),
                                    o = n.map(({ node: t }) => t.attrs[p]).filter((t) => null !== t)
                                n.forEach(({ node: t, pos: e }, r) => {
                                    var a
                                    const s =
                                        null === (a = d.doc.nodeAt(e)) || void 0 === a
                                            ? void 0
                                            : a.attrs[p]
                                    if (null === s)
                                        return void d.setNodeMarkup(e, void 0, {
                                            ...t.attrs,
                                            [p]: l()
                                        })
                                    const u = n[r + 1]
                                    if (u && 0 === t.content.size) {
                                        if (
                                            (d.setNodeMarkup(u.pos, void 0, {
                                                ...u.node.attrs,
                                                [p]: s
                                            }),
                                            (o[r + 1] = s),
                                            u.node.attrs[p])
                                        )
                                            return
                                        const n = l()
                                        return (
                                            d.setNodeMarkup(e, void 0, { ...t.attrs, [p]: n }),
                                            (o[r] = n),
                                            d
                                        )
                                    }
                                    const c = i(o),
                                        { deleted: m } = f.invert().mapResult(e)
                                    m &&
                                        c.includes(s) &&
                                        d.setNodeMarkup(e, void 0, { ...t.attrs, [p]: l() })
                                })
                            }),
                            d.steps.length ? d : void 0
                        )
                    },
                    view(e) {
                        const n = (n) => {
                            var r
                            t = (
                                null === (r = e.dom.parentElement) || void 0 === r
                                    ? void 0
                                    : r.contains(n.target)
                            )
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
                            drop: (e, n) => {
                                var r
                                return (
                                    (t === e.dom.parentElement &&
                                        'copy' !==
                                            (null === (r = n.dataTransfer) || void 0 === r
                                                ? void 0
                                                : r.effectAllowed)) ||
                                        ((t = null), (o = !0)),
                                    !1
                                )
                            },
                            paste: () => ((o = !0), !1)
                        },
                        transformPasted: (t) => {
                            if (!o) return t
                            const { types: e, attributeName: r } = this.options,
                                i = (t) => {
                                    const o = []
                                    return (
                                        t.forEach((t) => {
                                            if (t.isText) return void o.push(t)
                                            if (!e.includes(t.type.name))
                                                return void o.push(t.copy(i(t.content)))
                                            const n = t.type.create(
                                                { ...t.attrs, [r]: null },
                                                i(t.content),
                                                t.marks
                                            )
                                            o.push(n)
                                        }),
                                        n.Fragment.from(o)
                                    )
                                }
                            return (o = !1), new n.Slice(i(t.content), t.openStart, t.openEnd)
                        }
                    }
                })
            ]
        }
    })
    ;(t.UniqueID = a), (t.default = a), Object.defineProperty(t, '__esModule', { value: !0 })
})
