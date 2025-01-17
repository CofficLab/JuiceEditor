import Foundation
import Vapor
import SwiftUI

extension HTTPServer {
    public func getNode(app: Application, verbose: Bool) {
        app.get("api", "node", ":id", "html") { req async throws -> String in
            
            guard let id = req.parameters.get("id") else {
                throw Abort(.badRequest)
            }
            
            let content = try await self.delegate.getHtml(id) ?? ""
            
            if verbose {
                debug("getNode(\(id)): \(content.max(120))")
            }

            return content
        }
    }
}

#Preview {
    EditorView(verbose: true)
        .frame(height: 1000)
        .frame(width: 700)
}

