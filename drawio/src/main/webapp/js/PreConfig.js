/**
 * Copyright (c) 2006-2024, JGraph Ltd
 * Copyright (c) 2006-2024, draw.io AG
 */
// Overrides of global vars need to be pre-loaded
window.DRAWIO_PUBLIC_BUILD = true
window.EXPORT_URL = 'REPLACE_WITH_YOUR_IMAGE_SERVER'
window.PLANT_URL = 'REPLACE_WITH_YOUR_PLANTUML_SERVER'
window.DRAWIO_BASE_URL = null // Replace with path to base of deployment, e.g. https://www.example.com/folder
window.DRAWIO_VIEWER_URL = null // Replace your path to the viewer js, e.g. https://www.example.com/js/viewer.min.js
window.DRAWIO_LIGHTBOX_URL = null // Replace with your lightbox URL, eg. https://www.example.com
window.DRAW_MATH_URL = 'math/es5'

// Replace with your custom draw.io configurations. For more details, https://www.drawio.com/doc/faq/configure-diagram-editor
window.DRAWIO_CONFIG = {
  customFonts: ['Noto Serif SC', 'Bitter', 'Arial', 'Inter'],
  configVersion: null,
  customFonts: [],
  customLibraries: ['L.scratchpad'],
  plugins: [],
  recentColors: [],
  formatWidth: 240,
  createTarget: false,
  pageFormat: {
    x: 0,
    y: 0,
    width: 827,
    height: 1169
  },
  search: false,
  showStartScreen: false,
  gridColor: '#d0d0d0',
  darkGridColor: '#424242',
  autosave: true,
  resizeImages: null,
  unit: 1,
  isRulerOn: true,
  defaultVertexStyle: {
    fontSize: '14',
    strokeWidth: '1.5'
  },
  defaultEdgeStyle: {
    comment: '边的样式',
    rounded: '1',
    fontSize: '36',
    strokeWidth: '1.5'
  },
  comment1:
    'Defines an array of strings of library keys which will be available in the More Shapes dialog. If you define this as null, all libraries will be visible. If you leave the array empty, no libraries will be visible (e.g. ["general", "uml"]) (9.2.5 and later).',
  enabledLibraries: null,
  sidebarWidth: 240,
  defaultGridSize: 20,
  defaultCustomLibraries: [],
  emptyDiagramXml:
    "<mxGraphModel><root><mxCell id='0'/><mxCell id='1' parent='0'/></root></mxGraphModel>",
  emptyLibraryXml: '<mxlibrary>[]</mxlibrary>',
  sidebarTitleSize: 38,
  gridSteps: [4, 4, 4, 4],
  defaultMacroParameters: {
    toolbarStyle: 'inline'
  },
  css: `
    .geMenuItem[title='绘图'],.geTabContainer { 
      display: none !important;
    }

    div[title="帮助"] {
      display: none !important;
    }

    .geSidebarContainer>:nth-child(2)>.geFormatSection:last-child {
      display: none !important;
    }

    .geSidebarFooter {
      display: none !important;
    }

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

    body div.geDiagramBackdrop {
      margin-bottom: -32px !important;
    }
  `
}

// 禁用外部存储服务

// Disables the Dropbox integration
urlParams['db'] = '0'
// Disables the GitHub integration
urlParams['gh'] = '0'
// Disables the Google integration
urlParams['gapi'] = '0'
// Disables the GitLab integration
urlParams['gl'] = '0'
// Disables the OneDrive integration
urlParams['od'] = '0'
// Disables the Trello integration
urlParams['tr'] = '0'

// 按钮配置

urlParams['noSaveBtn'] = '0'
urlParams['noExitBtn'] = '1'
urlParams['saveAndExit'] = '0'

// spin=1: Shows a Loading… spinner while waiting for the diagram data to load in embed mode.
urlParams['spin'] = '1'

// urlParams['sync'] = 'manual'
// Enables folding in chromeless mode
urlParams['nav'] = '1'

urlParams['lang'] = 'zh'

// 左侧显示哪些图库 general;uml;er;bpmn;flowchart;basic;arrows2
urlParams['libs'] = 'general'
urlParams['ui'] = 'min'
// urlParams['modified'] = 'unsavedChanges'

// 开启嵌入模式，能通过postMessage通信
urlParams['embed'] = '1'
// protocol=json means we are using the JSON protocol for message passing
urlParams['proto'] = 'json'

// Disables the format panel on the right
urlParams['format'] = '0'
// Disables the toolbar in chromeless mode
urlParams['toolbar'] = '0'
// 不显示 打开图还是新建图 的弹窗
urlParams['splash'] = '0'
// 创建新文件的时候是否可以从远程获取模板
// 值为1的时候左侧图标库-箭头，显示不正常
// urlParams['offline'] = 1
// urlParams['browser'] = '0'
urlParams['dark'] = 'auto'
// urlParams['hide-pages'] = '1'
// urlParams['lightbox'] = '0'
