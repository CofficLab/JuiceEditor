import { TiptapExtension } from '../../model/TiptapGroup';
import { createApp, h } from 'vue';
import DebugView from './DebugView.vue';

export interface DebugBarStorage {
    verbose: boolean
    enabled: boolean
    mounted: boolean
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        DebugBar: {
            showDebugBar: (message: string, debugInfo: object) => ReturnType
            closeDebugBar: () => ReturnType
            enableDebugBar: () => ReturnType
            disableDebugBar: () => ReturnType
            toggleDebugBar: () => ReturnType
            bootDebugBar: () => ReturnType
            enableDebugBarVerbose: () => ReturnType
            disableDebugBarVerbose: () => ReturnType
        }
    }
}

const DebugBar = TiptapExtension.create({
    name: 'DebugBar',

    addStorage() {
        return {
            verbose: false,
            enabled: false,
            mounted: false,
            title: "🛞 Debug Bar",
        }
    },

    addOptions() {
        return {
            mountPointId: 'debug-bar-mount-point',
        }
    },

    onUpdate() {
        this.editor.commands.bootDebugBar()
    },

    addCommands() {
        return {
            enableDebugBar: () => ({ }) => {
                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.title, '✅ enableDebugBar')
                }

                this.storage.enabled = true
                return true
            },

            disableDebugBar: () => ({ }) => {
                this.storage.enabled = false

                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.title, '🚀 disableDebugBar')
                    console.log('disableDebugBar')
                }

                this.editor.commands.closeDebugBar()
                return true
            },

            enableDebugBarVerbose: () => ({ }) => {
                this.storage.verbose = true
                return true
            },

            disableDebugBarVerbose: () => ({ }) => {
                this.storage.verbose = false
                return true
            },

            toggleDebugBar: () => ({ }) => {
                this.storage.enabled = !this.storage.enabled

                if (this.storage.enabled) {
                    this.editor.commands.showDebugBar('Hello', { a: 1, b: 2 })
                } else {
                    this.editor.commands.closeDebugBar()
                }
                return true
            },

            showDebugBar: () => ({ editor }) => {
                // if already mounted, do nothing
                if (this.storage.mounted) {
                    return true
                }

                if (this.storage.verbose) {
                    console.log('showDebugBar')
                }

                const mountPoint = document.createElement('div');
                mountPoint.id = this.options.mountPointId;
                mountPoint.style.position = 'fixed';
                mountPoint.style.bottom = '0';
                mountPoint.style.left = '0';
                mountPoint.style.width = '100%';
                mountPoint.style.height = 'auto';
                mountPoint.style.display = 'flex';
                mountPoint.style.justifyContent = 'center';
                mountPoint.style.zIndex = '9999';
                mountPoint.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                mountPoint.style.opacity = '1';
                mountPoint.style.transformOrigin = 'bottom';
                mountPoint.style.transform = 'scale(0.95)';
                mountPoint.style.backgroundColor = 'rgba(0, 0, 0, 0)';

                let editorElement = this.editor.options.element
                editorElement.appendChild(mountPoint);

                const app = createApp({
                    render() {
                        return h(DebugView, {
                            editor: editor,
                        });
                    }
                });

                app.mount(mountPoint);
                this.storage.mounted = true
                return true;
            },

            closeDebugBar: () => ({ }) => {
                const mountPoint = this.editor.options.element?.querySelector(`#${this.options.mountPointId}`);
                if (mountPoint) {
                    mountPoint.remove();
                }
                this.storage.mounted = false
                return true;
            },

            bootDebugBar: () => ({ }) => {
                if (this.storage.verbose) {
                    this.editor.commands.appendLog(this.storage.title, '🚀 bootDebugBar ' + this.storage.enabled)
                }

                if (this.storage.enabled) {
                    this.editor.commands.showDebugBar('Hello', { a: 1, b: 2 })
                }

                return true
            },
        };
    },
});

export default DebugBar