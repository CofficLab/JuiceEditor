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

const SmartAlert = TiptapExtension.create({
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
                mountPoint.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                mountPoint.style.opacity = '0';
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
                            message,
                            debugInfo,
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

export default SmartAlert