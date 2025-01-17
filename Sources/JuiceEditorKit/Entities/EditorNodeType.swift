import Foundation

public enum EditorNodeType: Codable, Hashable {
    case cloudPrivate
    case cloudPublic
    case web
    case root
    case article
    case doc
    case heading
    case paragraph
    case text
    case toc
    case link
    case listItem
    case bulletList
    case codeEditor
    case draw
    case bold
    case image
    case tableCell
    case tableRow
    case table
    case tableHeader
    case smartTable
    case pre
    case unknown(String) // 记录原始字符串

    // 自定义初始化器
    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let rawValue = try container.decode(String.self)

        if let type = EditorNodeType(rawValue: rawValue) {
            self = type
        } else {
            self = .unknown(rawValue) // 使用原始值初始化
        }
    }
}

extension EditorNodeType: CaseIterable {
    public static var allCases: [EditorNodeType] {
        return [
            .root,
            .article,
            .doc,
            .heading,
            .paragraph,
            .text,
            .toc,
            .link,
            .listItem,
            .bulletList,
            .codeEditor,
            .draw,
            .bold,
            .image,
            .tableCell,
            .tableRow,
            .table,
            .tableHeader,
            .smartTable,
            .pre,
        ]
    }
}

extension EditorNodeType: RawRepresentable {
    public init?(rawValue: String) {
        switch rawValue {
        case "root": self = .root
        case "article": self = .article
        case "doc": self = .doc
        case "heading": self = .heading
        case "paragraph": self = .paragraph
        case "text": self = .text
        case "toc": self = .toc
        case "link": self = .link
        case "listItem": self = .listItem
        case "bulletList": self = .bulletList
        case "codeEditor": self = .codeEditor
        case "draw": self = .draw
        case "bold": self = .bold
        case "image": self = .image
        case "tableCell": self = .tableCell
        case "tableRow": self = .tableRow
        case "table": self = .table
        case "tableHeader": self = .tableHeader
        case "smartTable": self = .smartTable
        case "pre": self = .pre
        default: self = .unknown(rawValue) // 记录未知类型的原始值
        }
    }

    public var rawValue: String {
        switch self {
        case .root: return "root"
        case .doc: return "doc"
        case .article: return "article"
        case .heading: return "heading"
        case .paragraph: return "paragraph"
        case .text: return "text"
        case .toc: return "toc"
        case .link: return "link"
        case .listItem: return "listItem"
        case .bulletList: return "bulletList"
        case .codeEditor: return "codeEditor"
        case .draw: return "draw"
        case .bold: return "bold"
        case .image: return "image"
        case .tableCell: return "tableCell"
        case .tableRow: return "tableRow"
        case .table: return "table"
        case .tableHeader: return "tableHeader"
        case .smartTable: return "smartTable"
        case .pre: return "pre"
        case .cloudPrivate: return "cloudPrivate"
        case .cloudPublic: return "cloudPublic"
        case .web: return "web"
        case let .unknown(value): return value // 返回原始值
        }
    }
}
