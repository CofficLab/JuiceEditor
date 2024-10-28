import { Extension } from '@tiptap/core';
import { createApp, h } from 'vue';
import SmartAlertComponent from './SmartAlertComponent.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartAlert: {
            showAlert: (message: string, debugInfo: object) => ReturnType
            closeAlert: () => ReturnType
        }
    }
}

export const SmartAlert = Extension.create({
    name: 'SmartAlert',

    addOptions() {
        return {
            mountPointId: 'smart-alert-mount-point',
        }
    },

    addCommands() {
        return {
            showAlert: (message: string, debugInfo: object = {}) => ({ editor }) => {
                console.log('showAlert', message)
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

                let shadowRoot = this.editor.options.element?.shadowRoot
                if (!shadowRoot) {
                    console.error('No shadow root found');
                    return false;
                }
                shadowRoot.appendChild(mountPoint);

                console.log('debugInfo', debugInfo)

                const app = createApp({
                    render() {
                        return h(SmartAlertComponent, {
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

            closeAlert: () => ({ view }) => {
                console.log('closeAlert')
                const mountPoint = this.editor.options.element?.shadowRoot?.querySelector(`#${this.options.mountPointId}`);
                if (mountPoint) {
                    mountPoint.remove();
                }
                return true;
            },
        };
    },
});
