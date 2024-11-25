import { TiptapExtension } from '../model/TiptapGroup'

export interface SmartBackgroundOptions {
    className: string,
    firstClassName: string,
}

export interface SmartBackgroundStorage {
    verbose: boolean,
    backgroundClass: string,
    emoji: string,
}

declare module '@tiptap/vue-3' {
    interface Commands<ReturnType> {
        smartBackground: {
            enableBackgroundVerbose: () => ReturnType
            disableBackgroundVerbose: () => ReturnType
            setEditorBackground: (className: keyof typeof backgroundClass) => ReturnType
        }
    }
}

const backgroundClass = {
    default: 'bg-slate-300/10 dark:bg-zinc-900/30',
    cyan: 'bg-gradient-to-r from-cyan-800/50 to-cyan-800/30 dark:from-cyan-800/30 dark:to-cyan-800/10',
    blue: 'bg-gradient-to-r from-blue-800/50 to-blue-800/30 dark:from-blue-800/30 dark:to-blue-800/10',
    yellow: 'bg-gradient-to-r from-yellow-800/50 to-yellow-800/30 dark:from-yellow-800/30 dark:to-yellow-800/10',
    red: 'bg-gradient-to-r from-red-800/50 to-red-800/30 dark:from-red-800/30 dark:to-red-800/10',
    green: 'bg-gradient-to-r from-green-800/50 to-green-800/30 dark:from-green-800/30 dark:to-green-800/10',
    purple: 'bg-gradient-to-r from-purple-800/50 to-purple-800/30 dark:from-purple-800/30 dark:to-purple-800/10',
    orange: 'bg-gradient-to-r from-orange-800/50 to-orange-800/30 dark:from-orange-800/30 dark:to-orange-800/10',
    pink: 'bg-gradient-to-r from-pink-800/50 to-pink-800/30 dark:from-pink-800/30 dark:to-pink-800/10',
    gray: 'bg-gradient-to-r from-gray-500/20 to-gray-400/10 dark:from-gray-800/30 dark:to-gray-800/10',
    black: 'bg-gradient-to-r from-black/50 to-black/30 dark:from-black/30 dark:to-black/10',
    indigo: 'bg-gradient-to-r from-indigo-800/50 to-indigo-800/30 dark:from-indigo-800/30 dark:to-indigo-800/10',
    teal: 'bg-gradient-to-r from-teal-800/50 to-teal-800/30 dark:from-teal-800/30 dark:to-teal-800/10',
    lime: 'bg-gradient-to-r from-lime-800/50 to-lime-800/30 dark:from-lime-800/30 dark:to-lime-800/10',
    emerald: 'bg-gradient-to-r from-emerald-800/50 to-emerald-800/30 dark:from-emerald-800/30 dark:to-emerald-800/10',
    sky: 'bg-gradient-to-r from-sky-800/50 to-sky-800/30 dark:from-sky-800/30 dark:to-sky-800/10',
    violet: 'bg-gradient-to-r from-violet-800/50 to-violet-800/30 dark:from-violet-800/30 dark:to-violet-800/10',
    fuchsia: 'bg-gradient-to-r from-fuchsia-800/50 to-fuchsia-800/30 dark:from-fuchsia-800/30 dark:to-fuchsia-800/10',
    rose: 'bg-gradient-to-r from-rose-800/50 to-rose-800/30 dark:from-rose-800/30 dark:to-rose-800/10',
    slate: 'bg-gradient-to-r from-slate-800/50 to-slate-800/30 dark:from-slate-800/30 dark:to-slate-800/10',
    zinc: 'bg-gradient-to-r from-zinc-800/50 to-zinc-800/30 dark:from-zinc-800/30 dark:to-zinc-800/10',
    stone: 'bg-gradient-to-r from-stone-800/50 to-stone-800/30 dark:from-stone-800/30 dark:to-stone-800/10',
    amber: 'bg-gradient-to-r from-amber-800/50 to-amber-800/30 dark:from-amber-800/30 dark:to-amber-800/10',
    brown: 'bg-gradient-to-r from-[#A52A2A]/50 to-[#A52A2A]/30 dark:from-[#A52A2A]/30 dark:to-[#A52A2A]/10',
    maroon: 'bg-gradient-to-r from-[#800000]/50 to-[#800000]/30 dark:from-[#800000]/30 dark:to-[#800000]/10',
    olive: 'bg-gradient-to-r from-[#808000]/50 to-[#808000]/30 dark:from-[#808000]/30 dark:to-[#808000]/10',
    navy: 'bg-gradient-to-r from-[#000080]/50 to-[#000080]/30 dark:from-[#000080]/30 dark:to-[#000080]/10',
    turquoise: 'bg-gradient-to-r from-[#40E0D0]/50 to-[#40E0D0]/30 dark:from-[#40E0D0]/30 dark:to-[#40E0D0]/10',
    coral: 'bg-gradient-to-r from-[#FF7F50]/50 to-[#FF7F50]/30 dark:from-[#FF7F50]/30 dark:to-[#FF7F50]/10',
    crimson: 'bg-gradient-to-r from-[#DC143C]/50 to-[#DC143C]/30 dark:from-[#DC143C]/30 dark:to-[#DC143C]/10',
    gold: 'bg-gradient-to-r from-[#FFD700]/50 to-[#FFD700]/30 dark:from-[#FFD700]/30 dark:to-[#FFD700]/10',
    none: 'ring-1 scale-90',
}

const SmartBackground = TiptapExtension.create<SmartBackgroundOptions, SmartBackgroundStorage>({
    name: 'smartBackground',

    priority: 1000,

    addStorage() {
        return {
            verbose: false,
            backgroundClass: backgroundClass.default,
            emoji: "🌽 Background",
        }
    },

    addCommands() {
        return {
            enableBackgroundVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableBackgroundVerbose: () => () => {
                this.storage.verbose = false
                return true
            },

            setEditorBackground: (className: keyof typeof backgroundClass) => ({ }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.emoji, '🌳 setBackground', className)
                }

                this.storage.backgroundClass = backgroundClass[className]

                return true
            },
        }
    },

    onCreate() {
        if (this.editor.isEditable == false) {
            this.storage.backgroundClass = backgroundClass.gray
        }
    }
})

export default SmartBackground
