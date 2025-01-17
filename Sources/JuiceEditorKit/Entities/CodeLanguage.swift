import Foundation

enum CodeLanguage {
    case Golang
    case Shell
    case JavaScript
    case PHP
    case Python
    case Java
    case Rust
    case TypeScript

    static func fromString(_ lan: String) -> Self {
        switch lan.lowercased() {
        case "go", "golang":
            return .Golang
        case "shell", "Shell":
            return .Shell
        case "javascript", "js":
            return .JavaScript
        case "java":
            return .Java
        case "php":
            return .PHP
        case "python":
            return .Python
        case "rust":
            return .Rust
        case "typescript":
            return .TypeScript
        default:
            return .Shell
        }
    }
}
