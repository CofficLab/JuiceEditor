import { Extension, findChildren, combineTransactionSteps, getChangedRanges, findChildrenInRange } from "@tiptap/core";
import { Slice, Fragment } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { v4 as uuidv4 } from "uuid";

// 去重函数
function removeDuplicates(array) {
    return function (array, stringify = JSON.stringify) {
        const seen = {};
        return array.filter((item) => {
            const key = stringify(item);
            return !Object.prototype.hasOwnProperty.call(seen, key) && (seen[key] = true);
        });
    }(array.filter((item, index) => array.indexOf(item) !== index));
}

const UniqueID = Extension.create({
    name: "uniqueID",
    priority: 10000,

    addOptions() {
        return {
            attributeName: "id",
            types: [],
            generateID: () => uuidv4(),
            filterTransaction: null,
        };
    },

    addGlobalAttributes() {
        return [{
            types: this.options.types,
            attributes: {
                [this.options.attributeName]: {
                    default: null,
                    parseHTML: element => element.getAttribute(`data-${this.options.attributeName}`),
                    renderHTML: attributes => attributes[this.options.attributeName]
                        ? { [`data-${this.options.attributeName}`]: attributes[this.options.attributeName] }
                        : {},
                },
            },
        }];
    },

    onCreate() {
        if (this.editor.extensionManager.extensions.find(extension => "collaboration" === extension.name)) return;

        const { view, state } = this.editor;
        const { tr, doc } = state;
        const { types, attributeName, generateID } = this.options;

        findChildren(doc, node => types.includes(node.type.name) && null === node.attrs[attributeName]).forEach(({ node, pos }) => {
            tr.setNodeMarkup(pos, void 0, { ...node.attrs, [attributeName]: generateID() });
        });

        tr.setMeta("addToHistory", false);
        view.dispatch(tr);
    },

    addProseMirrorPlugins() {
        let dragSourceElement = null;
        let isPastedContent = false;

        return [
            new Plugin({
                key: new PluginKey("uniqueID"),
                appendTransaction: (transactions, oldState, newState) => {
                    const hasDocChanged = transactions.some(transaction => transaction.docChanged) && !oldState.doc.eq(newState.doc);
                    const isFiltered = this.options.filterTransaction && transactions.some(transaction => {
                        var filterTransaction;
                        return !(null === (filterTransaction = this.options.filterTransaction) || void 0 === filterTransaction ? void 0 : filterTransaction.call(this, transaction));
                    });
                    const ySyncTransaction = transactions.find(transaction => transaction.getMeta("y-sync$"));

                    if (ySyncTransaction) return;

                    if (!hasDocChanged || isFiltered) return;

                    const { tr } = newState;
                    const { types, attributeName, generateID } = this.options;
                    const { mapping } = getChangedRanges(newState.doc, transactions);
                    const changedRanges = combineTransactionSteps(newState.doc, transactions);

                    changedRanges.forEach(({ newRange }) => {
                        const nodes = findChildrenInRange(newState.doc, newRange, type => types.includes(type.name));
                        const nodeIDs = nodes.map(node => node.attrs[attributeName]).filter(id => null !== id);

                        nodes.forEach((node, index) => {
                            var nodeID;
                            const existingID = null === (nodeID = tr.doc.nodeAt(node.pos)) || void 0 === nodeID ? void 0 : nodeID.attrs[attributeName];

                            if (null === existingID) return void tr.setNodeMarkup(node.pos, void 0, { ...node.attrs, [attributeName]: generateID() });

                            const nextNode = nodes[index + 1];
                            if (nextNode && 0 === node.content.size) {
                                if (tr.setNodeMarkup(nextNode.pos, void 0, { ...nextNode.node.attrs, [attributeName]: existingID }), nodeIDs[index + 1] = existingID, nextNode.node.attrs[attributeName]) return;
                                const newID = generateID();
                                return tr.setNodeMarkup(node.pos, void 0, { ...node.attrs, [attributeName]: newID }), nodeIDs[index] = newID, tr;
                            }

                            const uniqueIDs = removeDuplicates(nodeIDs);
                            const { deleted } = mapping.invert().mapResult(tr);
                            deleted && uniqueIDs.includes(existingID) && tr.setNodeMarkup(node.pos, void 0, { ...node.attrs, [attributeName]: generateID() });
                        });
                    });

                    return tr.steps.length ? tr : void 0;
                },

                view: editorView => {
                    const handleDragStart = event => {
                        dragSourceElement = event.target.closest(editorView.dom.parentElement)
                            ? editorView.dom.parentElement
                            : null;
                    };

                    window.addEventListener("dragstart", handleDragStart);

                    return {
                        destroy() {
                            window.removeEventListener("dragstart", handleDragStart);
                        },
                    };
                },

                props: {
                    handleDOMEvents: {
                        drop: (view, event) => {
                            var dataTransfer;
                            return dragSourceElement === view.dom.parentElement && "copy" !== (null === (dataTransfer = event.dataTransfer) || void 0 === dataTransfer ? void 0 : dataTransfer.effectAllowed) || (dragSourceElement = null, isPastedContent = true), false;
                        },
                        paste: () => {
                            isPastedContent = true;
                            return false;
                        },
                    },
                    transformPasted: slice => {
                        if (!isPastedContent) return slice;

                        const { types, attributeName } = this.options;
                        const transformNode = node => {
                            const transformedNodes = [];
                            node.forEach(node => {
                                if (node.isText) return void transformedNodes.push(node);
                                if (!types.includes(node.type.name)) return void transformedNodes.push(node.copy(transformNode(node.content)));
                                const newNode = node.type.create({ ...node.attrs, [attributeName]: null }, transformNode(node.content), node.marks);
                                transformedNodes.push(newNode);
                            });
                            return Fragment.from(transformedNodes);
                        };

                        isPastedContent = false;
                        return new Slice(transformNode(slice.content), slice.openStart, slice.openEnd);
                    },
                },
            }),
        ];
    },
});

export { UniqueID, UniqueID as default };