import Foundation
import OSLog
import MagicKit

public struct EditorNode: Codable, SuperLog {
    public static var emoji = Config.rootEmoji + " 🌰"
    public var emoji = EditorNode.emoji
    public var type: String = EditorNodeType.doc.rawValue
    public var html: String? = nil
    public var text: String? = nil
    public var attrs: [String: AttributeValue]?

    public var uuid: String {
        if let attrs = self.attrs {
            return attrs["uuid"]?.stringValue ?? ""
        }

        return ""
    }

    public var parentId: String? {
        if let attrs = self.attrs {
            if let parent = attrs["parent"]?.stringValue {
                return parent
            }
            
            return attrs["parentId"]?.stringValue ?? nil
        }

        return nil
    }

    public var title: String {
        if let attrs = self.attrs {
            return attrs["title"]?.stringValue ?? ""
        }

        return ""
    }

    public func isDoc() -> Bool {
        return self.type == "doc"
    }

    public enum CodingKeys: String, CodingKey {
        case type, html, text, attrs
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(type, forKey: .type)
        try container.encodeIfPresent(html, forKey: .html)
        try container.encodeIfPresent(text, forKey: .text)
        try container.encodeIfPresent(attrs, forKey: .attrs)
    }

    public init(type: EditorNodeType) {
        self.type = type.rawValue
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        type = try container.decode(String.self, forKey: .type)
        html = try container.decodeIfPresent(String.self, forKey: .html)
        text = try container.decodeIfPresent(String.self, forKey: .text)
        attrs = try container.decodeIfPresent([String: AttributeValue].self, forKey: .attrs)
    }

    public func toJSON() -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        do {
            let jsonData = try encoder.encode(self)
            return String(data: jsonData, encoding: .utf8) ?? "{}"
        } catch {
            print("转换为 JSON 时出错: \(error)")
            return "{}"
        }
    }

    static func getEditorNodeFromData(_ data: [String: Any], reason: String, verbose: Bool) async throws -> EditorNode {
        guard let jsNode = data as? [String: Any] else {
            os_log(.error, "%{public}@ GetEditorNodeFromData::InvalidType, not [String: Any]", Self.emoji)
            os_log(.error, "  ➡️ Reason: %{public}@", reason)
            os_log(.error, "  ➡️ Data: %{public}@", String(describing: data))
            
            throw EditorNodeError.InvalidType
        }
        
        if verbose {
            os_log("\(Self.emoji)EditorNode::getEditorNodeFromData")
            os_log("%{public}@", String(describing: data))
        }

        var node = EditorNode(type: .doc)

        if let type = jsNode["type"] as? String {
            node.setType(type)
        }

        if let attrs = jsNode["attrs"] as? [String: Any] {
            // 将 Any 转换为 AttributeValue
            let convertedAttrs = attrs.mapValues { value -> AttributeValue in
                if let stringValue = value as? String {
                    return AttributeValue.string(stringValue)
                }

                if let numberValue = value as? Int {
                    return AttributeValue.int(numberValue)
                }

                // 根据需要添加其他类型的转换
                return AttributeValue.string(String(describing: value))
            }

            node.setAttrs(convertedAttrs)
        }
        
        if let uuid = jsNode["uuid"] as? String {
            node.setUUID(uuid)
        }
        
        if let title = jsNode["title"] as? String {
            node.setTitle(title)
        }

        if let text = jsNode["text"] as? String {
            node.setText(text)
        }

        if let html = jsNode["html"] as? String {
            node.setHtml(html)
        }

        return node
    }

    static func getEditorNodesFromData(_ data: [String: Any], reason: String, verbose: Bool) async throws -> [EditorNode] {
        guard let dataNodes = data["nodes"] else {
            os_log(.error, "\(Self.emoji)EditorNode::GetWildNodesFromData -> no nodes key")
            os_log(.error, "\(Self.emoji) \(reason)")
            
            throw EditorNodeError.DataNoNodesKey
        }
        
        guard let jsNodes = data["nodes"] as? [[String: Any]] else {
            os_log(.error, "\(Self.emoji)EditorNode::GetWildNodesFromData -> nodes not array")
            
            throw EditorNodeError.DataNodesNotArray
        }

        var nodes = [EditorNode]()

        for block in jsNodes {
            let node = try await EditorNode.getEditorNodeFromData(block, reason: reason, verbose: verbose)
            await nodes.append(node)
        }

        return nodes
    }
}

// MARK: Set

extension EditorNode {
    public mutating func setType(_ type: String) {
        self.type = type
    }

    public mutating func setAttrs(_ attrs: [String: AttributeValue]) {
        self.attrs = attrs
    }

    public mutating func setText(_ text: String) {
        self.text = text
    }

    public mutating func setHtml(_ html: String?) {
        self.html = html
    }

    public mutating func setUUID(_ uuid: String?) {
        if let uuid = uuid {
            if self.attrs == nil {
                self.attrs = [:]
            }

            self.attrs?["uuid"] = AttributeValue.string(uuid)
        } else {
            self.attrs?.removeValue(forKey: "uuid")
        }
    }

    public mutating func setParentId(_ parentId: String?) -> Self {
        if let parentId = parentId {
            if self.attrs == nil {
                self.attrs = [:]
            }

            self.attrs?["parent"] = AttributeValue.string(parentId)
        } else {
            self.attrs?.removeValue(forKey: "parent")
        }

        return self
    }

    public mutating func setTitle(_ title: String) {
        if self.attrs == nil {
            self.attrs = [:]
        }

        self.attrs?["title"] = AttributeValue.string(title)
    }
}

// MARK: Error

enum EditorNodeError: Error, LocalizedError {
    case DataNoNodesKey
    case DataNodesNotArray
    case InvalidType
}
