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
  language: '',
  configVersion: null,
  customFonts: [],
  libraries: 'general;uml;er;bpmn;flowchart;basic;arrows2',
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
  search: true,
  showStartScreen: true,
  gridColor: '#d0d0d0',
  darkGridColor: '#424242',
  autosave: true,
  resizeImages: null,
  openCounter: 62,
  version: 18,
  unit: 1,
  isRulerOn: false,
  ui: '',
  defaultVertexStyle: {
    fontSize: '14',
    strokeWidth: '1.5'
  },
  defaultEdgeStyle: {
    comment: '边的样式',
    rounded: '1',
    fontSize: '36',
    strokeWidth: '1.5'
  }
}

urlParams['sync'] = 'manual'
urlParams['lang'] = 'zh'
// 创建新文件的时候是否可以从远程获取模板
urlParams['offline'] = 1
urlParams['browser'] = '0'
urlParams['dark'] = 'auto'
// Disables the Dropbox integration
urlParams['db'] = '0'
urlParams['embed'] = '1'
// Disables the format panel on the right
// urlParams['format'] = '0'
// Disables the GitHub integration
urlParams['gh'] = '0'
// Disables the Google integration
urlParams['gapi'] = '0'
// Disables the GitLab integration
urlParams['gl'] = '0'
urlParams['hide-pages'] = '1'
urlParams['lightbox'] = '0'
urlParams['modified'] = 'unsavedChanges'
// Enables folding in chromeless mode
urlParams['nav'] = '1'
urlParams['noSaveBtn'] = '0'
urlParams['noExitBtn'] = '1'
// Disables the OneDrive integration
urlParams['od'] = '0'
urlParams['proto'] = 'json'
// Disables the toolbar in chromeless mode
URLSearchParams['toolbar'] = '0'
// Disables the Trello integration
urlParams['tr'] = '0'
urlParams['ui'] = 'min'
urlParams['saveAndExit'] = '0'
