import Foundation
import MagicKit
import NIOCore
import SwiftUI
import Vapor

public class HTTPServer: ObservableObject, SuperThread {
    public var app: Application?
    public let directoryPath: String
    public let isDevMode = true
    public var port: Int = 49493
    public let vueDevServerURL = "http://localhost:5173"
    public var delegate: EditorDelegate
    public var chatApi: String = ""
    public var drawIoLink: String = ""
    public var verbose: Bool
    public var baseURL: URL { URL(string: "http://localhost:\(port)")! }

    public init(directoryPath: String, delegate: EditorDelegate, verbose: Bool) {
        if verbose {
            info("Initializing HTTP Server with directory: \(directoryPath)")
        }
        self.directoryPath = URL(fileURLWithPath: directoryPath).path
        self.delegate = delegate
        self.verbose = verbose
    }

    private func configureRoutes(app: Application) throws {
        if isDevMode {
            self.dev(app: app)
        } else {
            self.prod(app: app)
        }

        self.getNode(app: app, verbose: self.verbose)
        self.chat(app: app)
    }

    private func start(verbose: Bool = true) throws {
        if verbose {
            info("Start HTTP Server")
        }
        
        var currentPort = port
        var serverStarted = false

        while !serverStarted && currentPort < port + 100 { // Try 100 ports
            do {
                self.app = Application(.production)

                guard let app = self.app else {
                    throw HTTPServerError.appNotInitialized
                }

                app.logger.logLevel = .critical
                app.environment.arguments = ["vapor"]

                try configureRoutes(app: app)

                app.http.server.configuration.port = currentPort

                try app.start()
                serverStarted = true

               self.main.async {
                   self.port = currentPort
                   self.chatApi = self.baseURL.absoluteString + "/api/chat"
                   self.drawIoLink = self.baseURL.absoluteString + "/draw/index.html?"
                   self.emitStarted()
               }

                if verbose {
                    info("Server ready on port \(currentPort)")
                }
            } catch let error as NIOCore.IOError where error.errnoCode == EADDRINUSE {
                warning("Port \(currentPort) is in use, trying next port")
                currentPort += 1
                self.app?.shutdown()
                self.app = nil
            } catch {
                errorLog("Unexpected error: \(error.localizedDescription)")
                errorLog("Error type: \(type(of: error))")
                errorLog("Error details: \(String(describing: error))")
                throw error
            }
        }

        if !serverStarted {
            throw HTTPServerError.noAvailablePort
        }
    }
    
    public func startServer(verbose: Bool) {
        bg.async {
            do {
                try self.start(verbose: verbose)
            } catch {
                errorLog("Failed to start server: \(error)")
            }
        }
    }

    deinit {
        app?.shutdown()
    }
}

enum HTTPServerError: Error {
    case noAvailablePort
    case appNotInitialized
}

// MARK: Event Name

extension Notification.Name {
    static let httpServerStarted = Notification.Name("httpServerStarted")
}

// MARK: Emitter

extension HTTPServer {
    public func emitStarted() {
        NotificationCenter.default.post(name: .httpServerStarted, object: nil)
    }
}

#Preview {
    EditorView(verbose: true)
        .frame(height: 1000)
        .frame(width: 700)
}
