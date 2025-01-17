import CloudKit
import Foundation
import OSLog
import SwiftData
import SwiftUI
import MagicKit

class JobRunCode: SuperLog {
    static var emoji: String = "🪝"
    
    var runnerDir = Config().getRunnerDir()
    var tempDir = Config().getTempDir()
    var sandboxPrivateKeyURL = Config().sandboxPrivateKeyURL
    
    private var envPath = "PATH=/opt/homebrew/bin/:/usr/local/bin:$PATH"
    private var setEnv: String { "export \(envPath)" }
    private var knownHostsURL: URL { Config().getKnownHostsURL() }
    private var sshOption: String {
        "-o 'StrictHostKeyChecking no' -o UserKnownHostsFile=\(knownHostsURL.path())"
    }
        
    func aboutPHP(_ completion: @escaping (String) -> Void) {
        run(lan: .Shell, code: "php -v", completion: completion)
    }
    
    func aboutGo(_ completion: @escaping (String) -> Void) {
        run(lan: .Shell, code: "go version", completion: completion)
    }
    
    func aboutNode(_ completion: @escaping (String) -> Void) {
        run(lan: .Shell, code: "node -v", completion: completion)
    }
    
    func whoami() -> String {
        ssh("whoami")
    }
    
    func setPrivateKey(key: URL) {
        let fm = FileManager.default
                
        if fm.fileExists(atPath: sandboxPrivateKeyURL.path) {
            do {
                try fm.removeItem(at: sandboxPrivateKeyURL)
            } catch let error {
                os_log(.error, "\(error.localizedDescription)")
            }
        }
        
        do {
            try fm.copyItem(at: key, to: sandboxPrivateKeyURL)
        } catch let error {
            os_log(.error,"\(error.localizedDescription)")
        }
    }

    func run(lan: CodeLanguage, code: String, completion: @escaping (String) -> Void) {
        os_log("\(self.t) 🧮 Runner -> 运行代码 \(String(describing: lan))")
        
        // 先把文件复制过去
        guard let fileURL = try? saveCodeToFile(code, lan: lan) else {
            return
        }
        let fileName = fileURL.lastPathComponent
        let path = ".kuaiyizhi/" + fileName
        scp(fileURL)
        
        switch lan {
        case .JavaScript:
            completion(ssh("\(setEnv) && node \(path)"))
        case .PHP:
            completion(ssh("\(setEnv) && php \(path)"))
        case .Golang:
            completion(ssh("\(setEnv) && go run \(path)"))
        case .Shell:
            completion(ssh("\(setEnv) && sh \(path)"))
        case .Python:
            completion(ssh("\(setEnv) && python3 \(path)"))
        default:
            completion("暂不支持运行 \(String(describing: lan))")
        }
    }
    
    // MARK: 保存文件
    
    private func saveCodeToFile(_ code: String, lan: CodeLanguage) throws -> URL {
        // 确定文件内容
        var content = code
        if lan == .PHP {
            content = "<?php \r\n" + content
        }
        
        // 确定后缀
        var ext = "txt"
        switch lan {
        case .Golang:
            ext = "go"
        case .PHP:
            ext = "php"
        case .JavaScript:
            ext = "js"
        case .Shell:
            ext = "sh"
        case .Python:
            ext = "py"
        default:
            ext = "txt"
        }

        // 写入临时文件
        let url = runnerDir.appending(component: "temp").appendingPathExtension(ext)
        try content.saveToFile(url)
        
        return url
    }
    
    private func isInSandbox() -> Bool {
        let fileManager = FileManager.default
        let appURLs = fileManager.urls(for: .documentDirectory, in: .userDomainMask)
        return appURLs.first?.path.contains("/Containers/") ?? false
    }
    
    // MARK: SSH
    
    private func ssh(_ code: String) -> String {
        os_log("\(self.t) 🧮 Runner -> \(code)")
        
        let task = Process()
        let key = sandboxPrivateKeyURL.path()
        let ssh = "ssh \(sshOption) angel@127.0.0.1 -i \(key) '\(code)'"
        
        os_log("\(self.t) 🧮 Runner -> \(ssh)")

        task.arguments = ["-c", "\(ssh)"]
        task.launchPath = "/bin/bash"

        let pipe = Pipe()
        let pipeError = Pipe()
        task.standardOutput = pipe
        task.standardError = pipeError
        task.launch()

        let result = pipe.fileHandleForReading.readDataToEndOfFile()
        let error = pipeError.fileHandleForReading.readDataToEndOfFile()
        var output = ""
        
        if let o = String(data: result, encoding: .utf8) {
            output = o
        }
        
        if let o = String(data: error, encoding: .utf8) {
            output += o
        }
        
        if output.isEmpty {
            output = "[空]"
        }
        
        return output
    }
    
    // MARK: SCP
    
    private func scp(_ file: URL) {
        let o = ssh("mkdir -p .kuaiyizhi")
        os_log("\(self.t) 🧮 Runner Scp 前先创建文件夹的返回 -> \(o)")
        
        let task = Process()
        let key = sandboxPrivateKeyURL.path()
        let shell = "scp \(sshOption) -i \(key) \(file.path()) angel@127.0.0.1:~/.kuaiyizhi/"
        
        os_log("\(self.t) 🧮 Runner -> \(shell)")

        task.arguments = ["-c", "\(shell)"]
        task.launchPath = "/bin/bash"

        let pipe = Pipe()
        task.standardOutput = pipe
        task.launch()

        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        if let output = String(data: data, encoding: .utf8) {
            print(output)
        }
    }
}
