import { TiptapExtension } from '../../model/TiptapGroup';
import { createApp, h } from 'vue';
import Component from './Component.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        DebugBar: {
            showDebugBar: (message: string, debugInfo: object) => ReturnType
            closeDebugBar: () => ReturnType
        }
    }
}

const DebugBar = TiptapExtension.create({
    name: 'DebugBar',

    onCreate() {
        if (this.storage.verbose) {
            console.log('DebugBar created');
        }

        this.editor.commands.showDebugBar('Hello', { a: 1, b: 2 })
    },

    addStorage() {
        return {
            verbose: false,
        }
    },

    addOptions() {
        return {
            mountPointId: 'debug-bar-mount-point',
        }
    },

    addCommands() {
        return {
            showDebugBar: () => ({ editor }) => {
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
                mountPoint.style.opacity = '0';
                mountPoint.style.transformOrigin = 'bottom';
                mountPoint.style.transform = 'scale(0.95)';
                mountPoint.style.backgroundColor = 'rgba(0, 0, 0, 0)';

                let editorElement = this.editor.options.element
                editorElement.appendChild(mountPoint);

                requestAnimationFrame(() => {
                    mountPoint.style.opacity = '1';
                    mountPoint.style.transform = 'scale(1)';
                    mountPoint.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                });

                const app = createApp({
                    render() {
                        return h(Component, {
                            editor: editor,
                            onClose: () => {
                                mountPoint.style.opacity = '0';
                                mountPoint.style.transform = 'scale(0.95)';
                                mountPoint.style.backgroundColor = 'rgba(0, 0, 0, 0)';

                                setTimeout(() => {
                                    app.unmount();
                                    editorElement.removeChild(mountPoint);
                                }, 400);
                            }
                        });
                    }
                });

                app.mount(mountPoint);
                return true;
            },

            closeDebugBar: () => ({ }) => {
                const mountPoint = this.editor.options.element?.querySelector(`#${this.options.mountPointId}`);
                if (mountPoint) {
                    mountPoint.remove();
                }
                return true;
            },
        };
    },
});

export default DebugBar