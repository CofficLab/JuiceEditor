import {
    findParentNode,
    findChildren,
    Node,
    mergeAttributes,
    defaultBlockAt,
    isActive
} from "@tiptap/core";
import { Selection, Plugin, PluginKey, TextSelection } from "@tiptap/pm/state";
import { GapCursor } from "@tiptap/pm/gapcursor";

// Helper function to check if a node is visible
const isNodeVisible = (pos, editor) => editor.view.domAtPos(pos).node.offsetParent !== null;

// Handle arrow key navigation
const handleArrowNavigation = (editor, direction) => {
    const { state, view, extensionManager } = editor;
    const { schema, selection } = state;
    const { empty, $anchor } = selection;
    const hasGapCursor = !!extensionManager.extensions.find(ext => ext.name === "gapCursor");

    if (!empty || $anchor.parent.type !== schema.nodes.detailsSummary || !hasGapCursor) return false;

    if ("right" === direction && $anchor.parentOffset !== $anchor.parent.nodeSize - 2) return false;

    const detailsNode = findParentNode($anchor.pos, schema.nodes.details)(selection);
    if (!detailsNode) return false;

    const detailsContentNodes = findChildren(detailsNode.node, schema.nodes.detailsContent);
    if (!detailsContentNodes.length) return false;

    if (isNodeVisible(detailsNode.start + detailsContentNodes[0].pos + 1, editor)) return false;

    const pos = state.doc.resolve(detailsNode.pos + detailsNode.node.nodeSize);
    const gapCursor = GapCursor.findFrom(pos, 1, false);
    if (!gapCursor) return false;

    const { tr } = state;
    const newGapCursor = new GapCursor(gapCursor);
    tr.setSelection(newGapCursor);
    tr.scrollIntoView();
    view.dispatch(tr);
    return true;
};

const Details = Node.create({
    name: "details",
    content: "detailsSummary detailsContent",
    group: "block",
    defining: true,
    isolating: true,
    allowGapCursor: false,

    addOptions() {
        return {
            persist: false,
            openClassName: "is-open",
            HTMLAttributes: {}
        };
    },

    addAttributes() {
        return this.options.persist ? [
            {
                open: {
                    default: false,
                    parseHTML: attr => attr.hasAttribute("open"),
                    renderHTML: ({ open }) => open ? { open: "" } : {}
                }
            }
        ] : [];
    },

    parseHTML() {
        return [{ tag: "details" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["details", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    addNodeView() {
        return ({ editor, getPos, node, HTMLAttributes }) => {
            const container = document.createElement("div");
            const attributes = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name });
            Object.entries(attributes).forEach(([key, value]) => container.setAttribute(key, value));

            const toggleButton = document.createElement("button");
            toggleButton.type = "button";
            container.append(toggleButton);

            const contentContainer = document.createElement("div");
            container.append(contentContainer);

            const toggleDetails = isOpen => {
                if (isOpen !== undefined) {
                    if (isOpen) {
                        if (!container.classList.contains(this.options.openClassName)) return;
                        container.classList.add(this.options.openClassName);
                    } else {
                        if (container.classList.contains(this.options.openClassName)) return;
                        container.classList.remove(this.options.openClassName);
                    }
                } else {
                    container.classList.toggle(this.options.openClassName);
                }

                const event = new Event("toggleDetailsContent");
                const detailsContentNode = contentContainer.querySelector(':scope > div[data-type="detailsContent"]');
                if (detailsContentNode) detailsContentNode.dispatchEvent(event);
            };

            if (node.attrs.open) setTimeout(() => toggleDetails(), 0);

            toggleButton.addEventListener("click", () => {
                toggleDetails();
                if (this.options.persist) {
                    if (editor.isEditable && typeof getPos === "function") {
                        const { from, to } = editor.state.selection;
                        editor.chain()
                            .command(({ tr }) => {
                                const pos = getPos();
                                const node = tr.doc.nodeAt(pos);
                                return node && node.type === this.type && tr.setNodeMarkup(pos, undefined, { open: !node.attrs.open }) && true;
                            })
                            .setTextSelection({ from, to })
                            .focus(void 0, { scrollIntoView: false })
                            .run();
                    } else {
                        editor.commands.focus(void 0, { scrollIntoView: false });
                    }
                }
            });

            return {
                dom: container,
                contentDOM: contentContainer,
                ignoreMutation: mutation => mutation.type !== "selection" && (!container.contains(mutation.target) || container === mutation.target),
                update: node => node.type === this.type && (node.attrs.open !== undefined && toggleDetails(node.attrs.open), true)
            };
        };
    },

    addCommands() {
        return {
            setDetails: () => ({ state, chain }) => {
                const { schema, selection } = state;
                const { $from, $to } = selection;
                const range = $from.blockRange($to);
                if (!range) return false;

                const content = state.doc.slice(range.start, range.end);
                if (!schema.nodes.detailsContent.contentMatch.matchFragment(content.content)) return false;

                const detailsContent = (content.toJSON() || []).join("");

                return chain()
                    .insertContentAt({ from: range.start, to: range.end }, {
                        type: this.name,
                        content: [
                            { type: "detailsSummary" },
                            { type: "detailsContent", content: detailsContent }
                        ]
                    })
                    .setTextSelection(range.start + 2)
                    .run();
            },
            unsetDetails: () => ({ state, chain }) => {
                const { selection, schema } = state;
                const detailsNode = findParentNode(pos => pos.type === this.type)(selection);
                if (!detailsNode) return false;

                const summaryNodes = findChildren(detailsNode.node, schema.nodes.detailsSummary);
                const contentNodes = findChildren(detailsNode.node, schema.nodes.detailsContent);
                if (!summaryNodes.length || !contentNodes.length) return false;

                const summaryNode = summaryNodes[0];
                const contentNode = contentNodes[0];
                const pos = detailsNode.pos;
                const resolvedPos = state.doc.resolve(pos);
                const content = contentNode.content.toJSON() || [];
                const defaultType = resolvedPos.parent.type.contentMatch.defaultType;
                const newContent = defaultType ? [defaultType.create(null, summaryNode.content).toJSON(), ...content] : [...content];

                return chain()
                    .insertContentAt({ from: pos, to: pos + detailsNode.node.nodeSize }, newContent)
                    .setTextSelection(pos + 1)
                    .run();
            }
        };
    },

    addKeyboardShortcuts() {
        return {
            Backspace: () => {
                const { state, selection } = this.editor.state;
                const { empty, $anchor } = selection;
                if (!empty || $anchor.parent.type !== state.schema.nodes.detailsSummary) return false;
                return $anchor.parentOffset !== 0
                    ? this.editor.commands.command(({ tr }) => {
                        const pos = $anchor.pos - 1;
                        const end = $anchor.pos;
                        tr.delete(pos, end);
                        return true;
                    })
                    : this.editor.commands.unsetDetails();
            },
            Enter: ({ editor }) => {
                const { state, view } = editor;
                const { schema, selection } = state;
                const { $head } = selection;
                if ($head.parent.type !== schema.nodes.detailsSummary) return false;

                const pos = $head.after();
                const node = pos >= 0 ? state.doc.nodeAt(pos) : $head.node(-2);
                if (!node) return false;

                const index = pos >= 0 ? 0 : $head.indexAfter(-1);
                const match = node.contentMatchAt(index);
                if (!match || !node.canReplaceWith(index, index, match)) return false;

                const newNode = match.createAndFill();
                if (!newNode) return false;

                const posToReplace = pos >= 0 ? $head.after() + 1 : $head.after(-1);
                const tr = state.tr.replaceWith(posToReplace, posToReplace, newNode);
                const posToSelect = state.doc.resolve(posToReplace);
                const selectionToSet = Selection.near(posToSelect, 1);
                tr.setSelection(selectionToSet);
                tr.scrollIntoView();
                view.dispatch(tr);
                return true;
            },
            ArrowRight: ({ editor }) => handleArrowNavigation(editor, "right"),
            ArrowDown: ({ editor }) => handleArrowNavigation(editor, "down")
        };
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("detailsSelection"),
                appendTransaction: (transactions, oldState, newState) => {
                    const { editor, type } = this;
                    const hasTransaction = transactions.some(transaction => transaction.selectionSet);
                    if (!hasTransaction || !newState.selection.empty || !oldState.selection.empty) return;

                    if (!isActive(newState, type.name)) return;

                    const { $from } = newState.selection;
                    if (isNodeVisible($from.pos, editor)) return;

                    const findNode = (pos, predicate, editor) => {
                        for (let depth = pos.depth; depth > 0; depth -= 1) {
                            const node = pos.node(depth);
                            const match = predicate(node);
                            const visible = isNodeVisible(pos.before(depth), editor);
                            if (match && visible) return { pos: depth > 0 ? pos.before(depth) : 0, start: pos.start(depth), depth, node };
                        }
                    };

                    const detailsNode = findNode($from, node => node.type === type, editor);
                    if (!detailsNode) return;

                    const summaryNodes = findChildren(detailsNode.node, newState.schema.nodes.detailsSummary);
                    if (!summaryNodes.length) return;

                    const summaryNode = summaryNodes[0];
                    const posToSelect = "forward" === (newState.selection.from < oldState.selection.from ? "forward" : "backward")
                        ? detailsNode.start + summaryNode.pos
                        : detailsNode.pos + summaryNode.pos + summaryNode.node.nodeSize;
                    const selectionToSet = TextSelection.create(newState.doc, posToSelect);

                    newState.tr.setSelection(selectionToSet);
                }
            })
        ];
    }
});

export { Details, Details as default };