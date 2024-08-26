import { Extension, findChildren, combineTransactionSteps, getChangedRanges, findChildrenInRange } from "@tiptap/core";
import { Slice, Fragment } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { v4 as uuidv4 } from "uuid";

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
});

export { UniqueID, UniqueID as default };