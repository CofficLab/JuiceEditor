// 菜单栏-绘图
let css1 = `
.geMenuItem[title='绘图'] { 
    display: none !important;
}
`

// 格式面板-绘图-数学排版，右侧的问号图标
const css2 = `
div[title="帮助"] {
    display: none !important;
}
`

// 菜单栏-插入-子菜单
const cssInsertMenus = `
table.mxPopupMenu>tbody>tr:nth-child(9) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(10) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(11) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(12) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(13) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(14) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(15) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(16) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(17) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(18) {
    display: none !important;
}

table.mxPopupMenu>tbody>tr:nth-child(19) {
    display: none !important;
}

`

const css =
    css1 +
    // css2 +
    cssInsertMenus

export default css
