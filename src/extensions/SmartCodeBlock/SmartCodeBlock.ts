import CodeBlock, { CodeBlockOptions } from '@tiptap/extension-code-block'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeBlockView from './CodeBlockView.vue'
import MonacoFactory from './MonacoFactory';
import { Component } from 'vue';

export interface SmartCodeBlockStorage {
	verbose: boolean
	title: string
	booted: boolean
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		SmartPre: {
			insertSmartPre: (attributes?: {
				language: string;
			}) => ReturnType;
			enableCodeBlockVerbose: () => ReturnType;
			disableCodeBlockVerbose: () => ReturnType;
		}
	}
}

// 保存成HTML的时候要考虑HTML转Markdown
export default CodeBlock.extend<CodeBlockOptions, SmartCodeBlockStorage>({
	addStorage() {
		return {
			verbose: false,
			title: '💻 SmartCodeBlock',
			booted: false,
		}
	},
	addAttributes() {
		return {
			language: {
				default: null,
				parseHTML: element => {
					const { languageClassPrefix } = this.options
					const classNames = [...(element.firstElementChild?.classList || [])]
					const languages = classNames
						.filter(className => className.startsWith(languageClassPrefix))
						.map(className => className.replace(languageClassPrefix, ''))
					const language = languages[0]

					if (!language) {
						return null
					}

					return language
				},
				rendered: false,
			},
			height: {
				default: 0,
				rendered: true
			}
		}
	},

	addNodeView() {
		return VueNodeViewRenderer(CodeBlockView as Component)
	},

	addCommands() {
		return {
			insertSmartPre:
				() => ({ commands }) => {
					if (this.storage.verbose) {
						console.log(this.storage.title, 'insertSmartPre')
					}

					return commands.insertContent("<pre><code class='language-javascript'></code></pre>");
				},
			setCodeBlock:
				attributes => ({ commands }) => {
					return commands.setNode(this.name, attributes)
				},
			toggleCodeBlock:
				attributes => ({ commands }) => {
					return commands.toggleNode(this.name, 'paragraph', attributes)
				},

			enableCodeBlockVerbose: () => ({ }) => {
				this.storage.verbose = true

				return true
			},

			disableCodeBlockVerbose: () => ({ }) => {
				this.storage.verbose = false

				return true
			},
		}
	},

	onCreate() {
		if (this.editor?.isEditable && !this.storage.booted) {
			if (this.storage.verbose) {
				console.log(this.storage.title, 'onCreate, boot Monaco')
			}
			MonacoFactory.boot()
			this.storage.booted = true
		}
	},

	onUpdate() {
		if (this.editor?.isEditable && !this.storage.booted) {
			if (this.storage.verbose) {
				console.log(this.storage.title, 'onUpdate, boot Monaco')
			}
			MonacoFactory.boot()
			this.storage.booted = true
		}
	}
})
