import css from "./Css"

// drawio的配置，按字母排序
const Config = {
    // autosaveDelay: Defines the delay(in ms) between the last change and the autosave of the file(10.4.7 and later).
    // autosaveDelay: 100,
    css: css,
    // defaultGridSize: Defines the default grid size for new diagrams(22.1.5 and later).Default is 10.
    defaultGridSize: 40,
    defaultGridEnabled: false,
    defaultMacroParameters: {
        toolbarStyle: 'inline'
    },
    // Defines whether the page is initially visible(true/ false).
    defaultPageVisible: false,
    // 顶点的样式
    defaultVertexStyle: {
        fontSize: '14',
        strokeWidth: '1.5',
        fillColor: "#dae8fc",
        strokeColor: "#6c8ebf",
    },
    // 边的样式
    defaultEdgeStyle: {
        fontFamily: "Courier New",
        edgeStyle: "orthogonalEdgeStyle",
        jettySize: "auto",
        orthogonalLoop: "1",
        fillColor: "#dae8fc",
        strokeColor: "#6c8ebf",
        rounded: '1',
        fontSize: '36',
        strokeWidth: '2'
    },
    // defaultLibraries: Defines a semicolon- separated list of library keys(unique names) in a string to be initially displayed in the left panel(e.g. "general;uml;company-graphics").Possible keys include custom entry IDs from the libraries field, or keys for the libs URL parameter(6.5.2 and later).The default value is "general;uml;er;bpmn;flowchart;basic;arrows2".
    defaultLibraries: 'general',
    // 图形面板-更多图形，打开后显示哪些图库
    // null, all libraries will be visible. 
    // empty, no libraries will be visible(e.g. ["general", "uml"])
    enabledLibraries: null,
    // enableCustomLibraries: Specifies if the open and new library functions are enabled(true or false, the default is true).
    enableCustomLibraries: false,
    // expandLibraries: Specifies if libraries are expanded by default (true or false, the default is true) (22.1.6 and later).
    expandLibraries: true,
    isRulerOn: true,
    gridSteps: [4, 4, 4, 4],
    // Ignores the current settings on the client-side if this is set to true
    override: true,
    // Specifies a name for storing user settings, usually in embed mode, in the form .{name}-config, in local storage.
    settingsName: 'SmartDraw',
    // 配置 sidebar 的宽度
    sidebarWidth: 250,
    // version: The current version of the configuration(any string, e.g. "1.0").If this is different from the last used version, then the current settings on the client- side(.drawio - config) will be reset.The default is null.Change this to force the stored settings in the client to be reset and apply the current configuration(7.2.8 and later).
    // 每次都替换掉
    version: Date.now().toString(),
}
      
export default Config