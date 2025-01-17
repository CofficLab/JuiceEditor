import Foundation
import SwiftUI

extension EditorView {
    func onJSReady() {
        Task {
            if verbose {
                info("Editor Page Ready")
            }

            do {
                try await self.setChatApi(server.chatApi)
                try await self.setDrawLink(server.drawIoLink)
                try await self.disableDebugBar()

                self.delegate.onReady()
            } catch {
                errorLog("\(error)")
            }
        }
    }

    func onServerStarted(_ n: Notification) {
        isServerStarted = true
        self.webView = self.server.baseURL
            .makeWebView(onCustomMessage: onCustomMessage)
    }

    func onJSCallUpdateArticle(_ n: Notification) {
        let data = n.userInfo as? [String: Any]

        guard let data = data else {
            warning("No Data")
            return
        }

        guard let nodeData = data["node"] as? [String: Any] else {
            return
        }

        Task {
            do {
                let node = try await EditorNode.getEditorNodeFromData(nodeData, reason: "EditorView.onJSCallUpdateArticle", verbose: verbose)
                delegate.onUpdateNodes([node])
            } catch {
                errorLog("\(error)")
            }
        }
    }

    func onJSCallUpdateNodes(_ n: Notification) {
        let data = n.userInfo as? [String: Any]

        guard let data = data else {
            warning("No Data")
            return
        }

        Task {
            do {
                let nodes = try await EditorNode.getEditorNodesFromData(data, reason: "EditorView.onJSCallUpdateNodes", verbose: verbose)
                delegate.onUpdateNodes(nodes)
            } catch {
                errorLog("\(error)")
            }
        }
    }

    func onConfigChanged(_ n: Notification) {
        delegate.onConfigChanged()
    }

    func onLoading(_ n: Notification) {
        let data = n.userInfo as? [String: Any]

        guard let data = data else {
            return
        }

        delegate.onLoading(data["reason"] as! String)
    }

    func onCustomMessage(_ message: Any) {
        if let message = message as? [String: Any] {
            if let channel = message["channel"] as? String {
                debug("收到消息, channel: \(channel)")

                self.onJSReady()
            } else {
                debug("收到消息, 没有 channel: \(String(describing: message))")
            }
        } else {
            debug("收到消息, 不是字典: \(String(describing: message))")
        }
    }
}

// MARK: Action

extension EditorView {
    private func downloadFile(base64: String, name: String) {
        if name.isEmpty {
            let alert = NSAlert()
            alert.messageText = "Download Failed"
            alert.informativeText = "File name cannot be empty.\nThis should never happen. \n\nPlease report this bug."
            alert.alertStyle = .warning
            alert.addButton(withTitle: "OK")
            alert.runModal()
            return
        }

        let panel = NSOpenPanel()
        panel.allowsMultipleSelection = false
        panel.canChooseDirectories = true
        panel.canChooseFiles = false

        if panel.runModal() == .OK, let url = panel.url {
            guard let base64Data = Data(base64Encoded: base64) else {
                print("Base64 decode failed")
                return
            }

            let targetURL = url.appendingPathComponent(name)

            do {
                try base64Data.write(to: targetURL)
                if verbose {
                    info("File downloaded successfully 🎉")
                }
            } catch {
                errorLog("Error downloading file -> \(error.localizedDescription)")
            }
        } else {
        }
    }
}

#Preview {
    EditorView(verbose: true)
        .frame(height: 1000)
        .frame(width: 700)
}
