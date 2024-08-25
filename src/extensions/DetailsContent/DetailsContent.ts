import {
    Node as t,
    mergeAttributes as e,
    findParentNode as n,
    defaultBlockAt as r
} from "@tiptap/core";
import { Selection as o } from "@tiptap/pm/state";

const i = t.create({
    name: "detailsContent",
    content: "block+",
    defining: true,
    selectable: false,

    addOptions: () => ({ HTMLAttributes: {} }),

    parseHTML() {
        return [{ tag: `div[data-type="${this.name}"]` }];
    },

    renderHTML({ HTMLAttributes: t }) {
        return ["div", e(this.options.HTMLAttributes, t, { "data-type": this.name }), 0];
    },

    addNodeView() {
        return ({ HTMLAttributes: t }) => {
            const n = document.createElement("div");
            const r = e(this.options.HTMLAttributes, t, { "data-type": this.name, hidden: "hidden" });

            Object.entries(r).forEach(([t, e]) => n.setAttribute(t, e));

            n.addEventListener("toggleDetailsContent", () => {
                n.toggleAttribute("hidden");
            });

            return {
                dom: n,
                contentDOM: n,
                ignoreMutation: t => "selection" !== t.type && (!n.contains(t.target) || n === t.target),
                update: t => t.type === this.type
            };
        };
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor: t }) => {
                const { state: e, view: i } = t;
                const { selection: d } = e;
                const { $from: s, empty: a } = d;
                const c = n((t => t.type === this.type))(d);

                if (!a || !c || !c.node.childCount) return false;

                const p = s.index(c.depth);
                const { childCount: l } = c.node;

                if (!(l === p + 1)) return false;

                const u = c.node.type.contentMatch.defaultType;
                const h = u?.createAndFill();

                if (!h) return false;

                const f = e.doc.resolve(c.pos + 1);
                const m = l - 1;
                const y = c.node.child(m);
                const A = f.posAtIndex(m, c.depth);

                if (!y.eq(h)) return false;

                const b = s.node(-3);
                if (!b) return false;

                const M = s.indexAfter(-3);
                const g = r(b.contentMatchAt(M));

                if (!g || !b.canReplaceWith(M, M, g)) return false;

                const v = g.createAndFill();
                if (!v) return false;

                const { tr: L } = e;
                const T = s.after(-2);
                L.replaceWith(T, T, v);

                const H = L.doc.resolve(T);
                const x = o.near(H, 1);
                L.setSelection(x);

                const C = A;
                const E = A + y.nodeSize;
                L.delete(C, E);

                L.scrollIntoView();
                i.dispatch(L);
                return true;
            }
        };
    }
});

export { i as DetailsContent, i as default };