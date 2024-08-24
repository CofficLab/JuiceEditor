import { Extension } from "@tiptap/core";
import { PluginKey, Plugin, AllSelection } from "@tiptap/pm/state";
import { DecorationSet, Decoration } from "@tiptap/pm/view";

// Constants and helper functions
const invisibleCharactersKey = new PluginKey("invisibleCharacters");

// ... (skipping helper functions for brevity)

// Classes for different types of invisible characters
class InvisibleNode {
    // ... (implementation details)
}

class HardBreakNode extends InvisibleNode {
    // ... (implementation details)
}

class ParagraphNode extends InvisibleNode {
    // ... (implementation details)
}

class InvisibleCharacter {
    // ... (implementation details)
}

class SpaceCharacter extends InvisibleCharacter {
    // ... (implementation details)
}

// Main extension
const InvisibleCharacters = Extension.create({
    name: "invisibleCharacters",

    addOptions() {
        return {
            visible: true,
            builders: [new SpaceCharacter(), new ParagraphNode(), new HardBreakNode()],
            injectCSS: true,
            injectNonce: undefined,
        };
    },

    addProseMirrorPlugins() {
        return [createInvisibleCharactersPlugin(this.editor.state, this.options)];
    },

    // ... (other methods)

    addCommands() {
        return {
            showInvisibleCharacters: (show = true) => ({ dispatch, tr }) => {
                // ... (implementation)
            },
            hideInvisibleCharacters: () => ({ dispatch, tr }) => {
                // ... (implementation)
            },
            toggleInvisibleCharacters: () => ({ dispatch, tr, state }) => {
                // ... (implementation)
            },
        };
    },
});

export {
    HardBreakNode,
    InvisibleCharacter,
    InvisibleCharacters,
    InvisibleNode,
    ParagraphNode,
    SpaceCharacter,
    InvisibleCharacters as default,
};