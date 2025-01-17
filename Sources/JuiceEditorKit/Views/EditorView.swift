import Foundation
import MagicKit
import SwiftUI

public struct EditorView: SwiftUI.View, SuperEvent {
    public static let defaultDelegate = DefaultDelegate()

    private let nc = NotificationCenter.default

    @State var server: HTTPServer
    @State var isServerStarted = false
    @State var webView: MagicWebView?

    public let delegate: EditorDelegate
    public var verbose: Bool

    public init(delegate: EditorDelegate = EditorView.defaultDelegate, verbose: Bool = true) {
        self.delegate = delegate
        self.server = HTTPServer(directoryPath: Config.webAppPath, delegate: delegate, verbose: verbose)
        self.verbose = verbose
    }

    public var body: some View {
        Group {
            if isServerStarted, let webView = webView {
                webView
            } else {
                MagicLoading().magicTitle("Starting server...")
                    .onAppear {
                        server.startServer(verbose: verbose)
                    }
            }
        }
        .frame(minHeight: 600)
        .onNotification(.httpServerStarted, onServerStarted)
    }
}

public protocol EditorDelegate {
    func getHtml(_ uuid: String) async throws -> String?
    func onReady() -> Void
    func onUpdateNodes(_ nodes: [EditorNode]) -> Void
    func onLoading(_ reason: String) -> Void
    func chat(_ text: String, callback: @escaping (String) async throws -> Void) async throws
}

extension EditorDelegate {
    public func getHtml(_ uuid: String) async throws -> String? {
        return "Hi from DefaultDelegate"
    }

    public func onReady() {
        warning("EditorDelegate: Editor Ready")
    }

    public func onUpdateNodes(_ nodes: [EditorNode]) {
        warning("Editor Nodes Updated, Count: \(nodes.count)")
    }

    public func onConfigChanged() {
        warning("Editor Config Changed")
    }

    public func onLoading(_ reason: String) {
        warning("Editor Loading -> \(reason)")
    }

    public func chat(_ text: String, callback: @escaping (String) async throws -> Void) async throws {
        let characters = ["You said: "] + Array(text)
        for char in characters {
            try await callback("\(char)")
            try await Task.sleep(nanoseconds: 500000000)
        }

        try await callback("[DONE]\n")
    }
}

public struct DefaultDelegate: EditorDelegate {}

#Preview {
    EditorView(verbose: true)
        .frame(height: 1500)
        .frame(width: 900)
}
