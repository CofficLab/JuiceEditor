import CloudKit
import OSLog
import SwiftData
import SwiftUI
import WebKit
import Foundation

public struct Config {
    public static var rootEmoji = "🖼️"
    
    public static var publicDir = Bundle.main.url(forResource: "dist", withExtension: nil)
    
    private var fileManager = FileManager.default
    
    public var sandboxPrivateKeyURL: URL {
        getRunnerDir().appending(component: "private_key")
    }
    
    public init() {}
    
    public func getDocumentsURL() -> URL {
        fileManager
            .urls(for: .documentDirectory, in: .userDomainMask)
            .first!
    }
    
    public func getKnownHostsURL() -> URL {
        getRunnerDir().appending(component: "known_hosts")
    }
    
    public func getAppDir() -> URL {
        var isDir: ObjCBool = true
        let url = getDocumentsURL().appendingPathComponent(
            "Kuaiyizhi",
            isDirectory: true
        )
        
        if !fileManager.fileExists(atPath: url.path, isDirectory: &isDir) {
            do {
                try fileManager.createDirectory(
                    at: url,
                    withIntermediateDirectories: true
                )
            } catch (let error) {
                fatalError("创建 APP 目录失败：\(error.localizedDescription)")
            }
        }
        
        return url
    }
    
    public func getTempDir() -> URL {
        var isDir: ObjCBool = true
        let url = getAppDir()
            .appendingPathComponent("temp", isDirectory: true)
        
        if !fileManager.fileExists(atPath: url.path, isDirectory: &isDir) {
            do {
                try fileManager.createDirectory(
                    at: url,
                    withIntermediateDirectories: true
                )
            } catch (let error) {
                fatalError("创建 TEMP 目录失败：\(error.localizedDescription)")
            }
        }

        return url
    }
    
    public func getRunnerDir() -> URL {
        var isDir: ObjCBool = true
        let url = getAppDir()
            .appendingPathComponent("runner", isDirectory: true)
        
        if !fileManager.fileExists(atPath: url.path, isDirectory: &isDir) {
            do {
                try fileManager.createDirectory(
                    at: url,
                    withIntermediateDirectories: true
                )
            } catch (let error) {
                fatalError("创建 Runner 目录失败：\(error.localizedDescription)")
            }
        }

        return url
    }

    public static var currentDirectoryPath = FileManager.default.currentDirectoryPath
    
    public static var webAppPath: String = {
        let settingsURL = Bundle.module.url(forResource: "WebApp", withExtension: nil)

        if let settingsURL = settingsURL {
            return settingsURL.path(percentEncoded: false)
        }
        
        fatalError("WebApp directory not found")
    }()
}
