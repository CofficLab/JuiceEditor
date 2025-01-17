import Vapor
import SwiftUI

extension HTTPServer {
     public func dev(app: Application) {
         // 明确定义根路径路由
         info("Initializing HTTP Server with directory: \(directoryPath)")
         app.get { req -> ClientResponse in
             return try await self.handleDevModeRequest(req, path: "/index.html")
         }

         // 定义通配符路由
         app.get("**") { req -> ClientResponse in
             let verbose = true

             if verbose {
                 info("Processing wildcard request in dev mode: \(req.url.string)")
             }
             return try await self.handleDevModeRequest(req, path: req.url.path)
         }
     }

     // 添加一个辅助方法来处理开发模式的请求
     public func handleDevModeRequest(_ req: Request, path: String) async throws -> ClientResponse {
         let client = req.client
         let verbose = false
        
         var url = self.vueDevServerURL + path
         if let query = req.url.query {
             url += "?" + query
         }
         if let fragment = req.url.fragment {
             url += "#" + fragment
         }
        
         if verbose {
             info("➡️ Forwarding to: \(url)")
         }
        
         return try await client.get(URI(string: url))
     }
}

#Preview {
    EditorView(verbose: true)
        .frame(height: 1000)
        .frame(width: 700)
}
