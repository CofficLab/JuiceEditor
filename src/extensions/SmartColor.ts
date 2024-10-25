import Color from "@tiptap/extension-color";

export const SmartColor = Color.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            colors: [
                '#1E90FF', // DodgerBlue
                '#32CD32', // LimeGreen
                '#FFD700', // Gold
                '#FF4500', // OrangeRed
                '#8A2BE2', // BlueViolet
                '#00CED1', // DarkTurquoise
                '#FF1493', // DeepPink
                '#7FFF00', // Chartreuse
                '#DC143C', // Crimson
                '#00FF7F', // SpringGreen
                '#4682B4', // SteelBlue
                '#D2691E', // Chocolate
                '#FF6347', // Tomato
                '#40E0D0', // Turquoise
                '#EE82EE', // Violet
                '#8B0000', // DarkRed
                '#ADFF2F', // GreenYellow
                '#FF00FF', // Magenta
                '#0000FF', // Blue
                '#800080', // Purple
                '#008080', // Teal
                '#FFA500', // Orange
                '#A52A2A', // Brown
                '#808000', // Olive
            ],
        }
    },
});