import { TiptapExtension } from '../../model/TiptapGroup';
import { createApp, h } from 'vue';
import Component from './Component.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartAlert: {
            showAlert: (message: string, debugInfo: object) => ReturnType
            closeAlert: () => ReturnType
        }
    }
}

export const SmartAlert = TiptapExtension.create({
    name: 'SmartAlert',

    addOptions() {
        return {
            mountPointId: 'smart-alert-mount-point',
        }
    },

    addCommands() {
        return {
            showAlert: (message: string, debugInfo: object = {}) => ({ editor }) => {
                const mountPoint = document.createElement('div');
                mountPoint.id = this.options.mountPointId;
                mountPoint.style.position = 'fixed';
                mountPoint.style.top = '0';
                mountPoint.style.left = '0';
                mountPoint.style.width = '100%';
                mountPoint.style.height = '100%';
                mountPoint.style.display = 'flex';
                mountPoint.style.justifyContent = 'center';
                mountPoint.style.alignItems = 'center';
                mountPoint.style.zIndex = '9999';
                mountPoint.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

                let editorElement = this.editor.options.element
                editorElement.appendChild(mountPoint);

                const app = createApp({
                    render() {
                        return h(Component, {
                            editor: editor,
                            message,
                            debugInfo,
                            onClose: () => {
                                app.unmount();
                                document.body.removeChild(mountPoint);
                            }
                        });
                    }
                });

                app.mount(mountPoint);
                return true;
            },

            closeAlert: () => ({ }) => {
                const mountPoint = this.editor.options.element?.querySelector(`#${this.options.mountPointId}`);
                if (mountPoint) {
                    mountPoint.remove();
                }
                return true;
            },
        };
    },
});
