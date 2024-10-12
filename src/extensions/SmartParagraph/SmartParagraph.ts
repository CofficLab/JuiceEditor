import Paragraph from "@tiptap/extension-paragraph";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartParagraph: {
            setParagraph: () => ReturnType
            setBackgroundColor: (color: string) => ReturnType
        }
    }
}

interface ParagraphOptions {
    colorClass: Record<string, string>
}

const SmartParagraph = Paragraph.extend<ParagraphOptions>({
    parseHTML: () => [
        { tag: "banner" },
        { tag: "p" },
    ],

    addOptions() {
        return {
            ...this.parent?.(),
            colorClass: {
                cyan: 'bg-gradient-to-r from-cyan-800/50 to-cyan-800/30',
                blue: 'bg-gradient-to-r from-blue-800/50 to-blue-800/30',
                yellow: 'bg-gradient-to-r from-yellow-800/50 to-yellow-800/30',
                red: 'bg-gradient-to-r from-red-800/50 to-red-800/30',
                green: 'bg-gradient-to-r from-green-800/50 to-green-800/30',
                purple: 'bg-gradient-to-r from-purple-800/50 to-purple-800/30',
                orange: 'bg-gradient-to-r from-orange-800/50 to-orange-800/30',
                pink: 'bg-gradient-to-r from-pink-800/50 to-pink-800/30',
                gray: 'bg-gradient-to-r from-gray-800/50 to-gray-800/30',
                black: 'bg-gradient-to-r from-black/50 to-black/30',
                indigo: 'bg-gradient-to-r from-indigo-800/50 to-indigo-800/30',
                teal: 'bg-gradient-to-r from-teal-800/50 to-teal-800/30',
                lime: 'bg-gradient-to-r from-lime-800/50 to-lime-800/30',
                emerald: 'bg-gradient-to-r from-emerald-800/50 to-emerald-800/30',
                sky: 'bg-gradient-to-r from-sky-800/50 to-sky-800/30',
                violet: 'bg-gradient-to-r from-violet-800/50 to-violet-800/30',
                fuchsia: 'bg-gradient-to-r from-fuchsia-800/50 to-fuchsia-800/30',
                rose: 'bg-gradient-to-r from-rose-800/50 to-rose-800/30',
                slate: 'bg-gradient-to-r from-slate-800/50 to-slate-800/30',
                zinc: 'bg-gradient-to-r from-zinc-800/50 to-zinc-800/30',
                stone: 'bg-gradient-to-r from-stone-800/50 to-stone-800/30',
                amber: 'bg-gradient-to-r from-amber-800/50 to-amber-800/30',
                brown: 'bg-gradient-to-r from-[#A52A2A]/50 to-[#A52A2A]/30',
                maroon: 'bg-gradient-to-r from-[#800000]/50 to-[#800000]/30',
                olive: 'bg-gradient-to-r from-[#808000]/50 to-[#808000]/30',
                navy: 'bg-gradient-to-r from-[#000080]/50 to-[#000080]/30',
                turquoise: 'bg-gradient-to-r from-[#40E0D0]/50 to-[#40E0D0]/30',
                lavender: 'bg-gradient-to-r from-[#E6E6FA]/50 to-[#E6E6FA]/30',
                coral: 'bg-gradient-to-r from-[#FF7F50]/50 to-[#FF7F50]/30',
                crimson: 'bg-gradient-to-r from-[#DC143C]/50 to-[#DC143C]/30',
                gold: 'bg-gradient-to-r from-[#FFD700]/50 to-[#FFD700]/30',
                none: 'bg-gradient-to-r from-white/50 to-white/30',
            }
        }
    },

    addAttributes() {
        return {
            class: {
                default: "p-class"
            }
        }
    },

    // addNodeView: () => VueNodeViewRenderer(SmartParagraphVue),

    addCommands() {
        return {
            setParagraph: () => ({ commands }) => {
                return commands.setNode(this.name)
            },
            setBackgroundColor: (color: string) => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: this.options.colorClass[color] + ' no-padding'
                })
            },
        };
    },
});

export default SmartParagraph;
