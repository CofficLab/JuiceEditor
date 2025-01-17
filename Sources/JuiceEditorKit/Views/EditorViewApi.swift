import Foundation
import MagicKit
import SwiftUI

public extension EditorView {
    // MARK: Create

    @discardableResult
    func createArticle(title: String) async throws -> Any {
        try await run("window.editor.createArticle(\(title))")
    }

    // MARK: Disable

    @discardableResult
    func disableBubbleMenu() async throws -> Any {
        try await run("window.editor.disableBubbleMenu()")
    }

    @discardableResult
    func disableContextMenu() async throws -> Any {
        try await run("window.editor.disableContextMenu()")
    }

    func disableDraw() async throws -> Any {
        try await run("window.editor.disableDraw()")
    }

    @discardableResult
    func disableFloatingMenu() async throws -> Any {
        try await run("window.editor.disableFloatingMenu()")
    }

    @discardableResult
    func disableDebugBar() async throws -> Any {
        try await run("window.editor.disableDebugBar()")
    }

    func disableFloatingMenuAndBubbleMenu() async throws -> Any {
        try await run("window.editor.disableFloatingMenuAndBubbleMenu()")
    }

    func disableEdit() async throws -> Any {
        try await run("window.editor.disableEdit()")
    }

    func disableTable() async throws -> Any {
        try await run("window.editor.disableTable()")
    }

    // MARK: Enable

    func enableEdit() async throws -> Any {
        try await run("window.editor.enableEdit()")
    }

    func enableTable() async throws -> Any {
        try await run("window.editor.enableTable()")
    }

    func enableDraw() async throws -> Any {
        try await run("window.editor.enableDraw()")
    }

    @discardableResult
    func enableFloatingMenu() async throws -> Any {
        try await run("window.editor.enableFloatingMenu()")
    }

    func enableBubbleMenu() async throws -> Any {
        try await run("window.editor.enableBubbleMenu()")
    }

    // MARK: Get

    func getMarkdown() -> String {
        return ""
//        dispatchPrecondition(condition: .onQueue(.main))
//
//        var result: String?
//
//        evaluateJavaScript("api.app.getMarkdown()") { response, error in
//            if error != nil {
//                result = ""
//                return
//            }
//
//            result = response as? String ?? ""
//        }
//
//        while result == nil {
//            RunLoop.main.run(until: Date(timeIntervalSinceNow: 0.01))
//        }
//
//        return result ?? ""
    }

    // MARK: Insert

    func insertTable() async throws -> Any {
        try await run("window.editor.insertTable()")
    }

    func insertTodo() async throws -> Any {
        try await run("window.editor.insertTodo()")
    }

    func insertDraw() async throws -> Any {
        try await run("window.editor.insertDraw()")
    }

    func insertImage() async throws -> Any {
        try await run("window.editor.insertImage()")
    }

    func insertCodeBlock() async throws -> Any {
        try await run("window.editor.insertCodeBlock()")
    }

    // MARK: Hide

    func hideEditor() async throws -> Any {
        try await run("window.editor.hideEditor()")
    }

    func hideToolbar() async throws -> Any {
        try await run("window.editor.hideToolbar()")
    }

    // MARK: Show

    func showEditorAndEnableEdit() async throws -> Any {
        try await run("window.editor.showEditorAndEnableEdit()")
    }

    func showEditor() async throws -> Any {
        try await run("window.editor.showEditor()")
    }

    func showToolbar() async throws -> Any {
        try await run("window.editor.showToolbar()")
    }

    // MARK: Set

    func setContent(_ uuid: String) async throws {
        try await self.setContentFromWeb(
            self.server.baseURL.absoluteString + "/api/node/" + uuid + "/html",
            uuid: uuid,
            verbose: self.verbose
        )
    }

    func setToolbarVisible(_ v: Bool) async throws -> Any {
        await v ? try showToolbar() : try hideToolbar()
    }

    @discardableResult
    func setEditable(_ v: Bool) async throws -> Any {
        await v ? try enableEdit() : try disableEdit()
    }

    func setEditorVisible(_ v: Bool) async throws -> Any {
        await v ? try showEditor() : try hideEditor()
    }

    @discardableResult
    func setChatApi(_ s: String, verbose: Bool = false) async throws -> Any {
        if verbose {
            info("setChatApi 🛜🛜🛜 -> \(s)")
        }

        return try await run("window.editor.setChatApi(`\(s)`)")
    }

    @discardableResult
    func setDrawLink(_ link: String) async throws {
        try await run("window.editor.setDrawLink('\(link)')")
    }

    func setNodeBase64(_ nodeBase64: String) async throws -> Any {
        let verbose = false

        if verbose {
            info("setNodeBase64 -> \(nodeBase64.mini())")
        }

        return try await run("api.node.setNodeBase64(`\(nodeBase64)`)")
    }

    @discardableResult
    func setContentFromWeb(_ url: String, uuid: String, verbose: Bool) async throws -> Any {
        if verbose {
            info("setContentFromWeb 🛜🛜🛜 -> \(url) -> \(uuid)")
        }

        return try await run("window.editor.setContentFromUrl(`\(url)`, `\(uuid)`)")
    }

    func setParagraph() async throws -> Any {
        try await run("window.editor.setParagraph()")
    }

    func setHeading1() async throws -> Any {
        try await run("window.editor.setHeading1()")
    }

    func setHeading2() async throws -> Any {
        try await run("window.editor.setHeading2()")
    }

    func setHeading3() async throws -> Any {
        try await run("window.editor.setHeading3()")
    }

    func setHeading4() async throws -> Any {
        try await run("window.editor.setHeading4()")
    }

    func setHeading5() async throws -> Any {
        try await run("window.editor.setHeading5()")
    }

    func setHeading6() async throws -> Any {
        try await run("window.editor.setHeading6()")
    }

    // MARK: Toggle

    @discardableResult
    func toggleToc() async throws -> Any {
        try await run("window.editor.toggleToc()")
    }

    @discardableResult
    func toggleItalic() async throws -> Any {
        try await run("window.editor.toggleItalic()")
    }

    @discardableResult
    func toggleBanner() async throws -> Any {
        try await run("window.editor.toggleBanner()")
    }

    @discardableResult
    func toggleBold() async throws -> Any {
        try await run("window.editor.toggleBold()")
    }

    @discardableResult
    func toggleTaskList() async throws -> Any {
        try await run("window.editor.toggleTaskList()")
    }

    @discardableResult
    func toggleDebugBar() async throws -> Any {
        try await run("window.editor.toggleDebugBar()")
    }

    // MARK: Other

    func runnerCallback(_ output: String) async throws -> Any {
        // 对字符串进行 URL 编码
        if let encodedOutput = output.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {
            // 调用 JavaScript 函数，并传递编码后的字符串
            try await run("runnerCallback(`\(encodedOutput)`)")
        } else {
            try await run("runnerCallback(`swift 编码失败`)")
        }
    }

    func run(_ script: String) async throws -> Any {
        self.webView?.evaluateJavaScript(script)
    }

    func closeDraw() async throws -> Any {
        try await run("api.app.closeDraw()")
    }
}

#Preview {
    EditorView(verbose: true)
        .frame(height: 1200)
        .frame(width: 800)
}
