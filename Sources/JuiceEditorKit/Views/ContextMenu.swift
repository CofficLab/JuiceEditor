//import AppKit
//import Foundation
//import MagicKit
//
//var selectionNodeType: NodeType = .paragraph
//
//public extension WebContent {
//    func setSelectionNodeType(_ type: NodeType) {
//        selectionNodeType = type
//    }
//
//    // MARK: 右键菜单项目
//
//    private func makeBanner(_ enabled: Bool = true) -> NSMenuItem {
//        let banner = NSMenuItem(
//            title: "设置/取消提示框",
//            action: #selector(toggleBanner),
//            keyEquivalent: "")
//        banner.isEnabled = enabled
//
//        return banner
//    }
//
//    private func makeItalic(_ enabled: Bool = true) -> NSMenuItem {
//        let banner = NSMenuItem(
//            title: "设置/取消斜体",
//            action: #selector(toggleItalic),
//            keyEquivalent: "")
//        banner.isEnabled = enabled
//
//        return banner
//    }
//
//    private func makeToc(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "显示/隐藏标题导航",
//            action: #selector(toggleToc),
//            keyEquivalent: "")
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeTable(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "增加表格",
//            action: #selector(insertTable),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeBold(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "设置/取消粗体",
//            action: #selector(toggleBold),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeParagraph(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "正文",
//            action: #selector(setParagraph),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeHeading1(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "一级标题",
//            action: #selector(setHeading1),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeHeading2(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "二级标题",
//            action: #selector(setHeading2),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeHeading3(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "三级标题",
//            action: #selector(setHeading3),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeHeading4(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "四级标题",
//            action: #selector(setHeading4),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeHeading5(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "五级标题",
//            action: #selector(setHeading5),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeHeading6(_ enabled: Bool = true) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "六级标题",
//            action: #selector(setHeading6),
//            keyEquivalent: "")
//
//        menu.isEnabled = enabled
//
//        return menu
//    }
//
//    private func makeTitle(_ title: String) -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: title,
//            action: nil,
//            keyEquivalent: "")
//
//        menu.isEnabled = false
//
//        return menu
//    }
//
//    private func makeToggleTaskList() -> NSMenuItem {
//        let menu = NSMenuItem(
//            title: "设置/取消待办事项",
//            action: #selector(toggleTaskList),
//            keyEquivalent: "")
//
//        menu.isEnabled = true
//
//        return menu
//    }
//
//    // MARK: 自定义右键菜单
//
//    override public func willOpenMenu(_ menu: NSMenu, with event: NSEvent) {
//        removeMenu(menu)
//
//        let toc = makeToc()
//        let heading1 = makeHeading1()
//        let heading2 = makeHeading2()
//        let heading3 = makeHeading3()
//        let heading4 = makeHeading4()
//        let heading5 = makeHeading5()
//        let heading6 = makeHeading6()
//        let paragraph = makeParagraph()
//        let bold = makeBold()
//        let banner = makeBanner()
//        let italic = makeItalic()
//        let debug = makeTitle("仅 DEBUG 模式显示")
//        let title = makeTitle("当前格式：\(selectionNodeType.name)")
//        let taskList = makeToggleTaskList()
//        let table = makeTable()
//
//        switch selectionNodeType {
//        case .paragraph:
//            paragraph.isEnabled = false
//        case .heading1:
//            heading1.isEnabled = false
//        case .heading2:
//            heading2.isEnabled = false
//        case .heading3:
//            heading3.isEnabled = false
//        case .heading4:
//            heading4.isEnabled = false
//        case .heading5:
//            heading5.isEnabled = false
//        case .heading6:
//            heading6.isEnabled = false
//        case let .unknown(s):
//            print("unknown selectNodeType \(s)")
//        }
//
//        #if DEBUG
//            menu.addItem(.separator())
//            menu.addItem(debug)
//            menu.addItem(title)
//        #endif
//
//        // TOC
//        menu.addItem(.separator())
//        menu.addItem(toc)
//
//        // Heading & Paragraph
//        menu.addItem(.separator())
//        menu.addItem(heading1)
//        menu.addItem(heading2)
//        menu.addItem(heading3)
//        menu.addItem(heading4)
//        menu.addItem(heading5)
//        menu.addItem(heading6)
//        menu.addItem(paragraph)
//
//        // 字体修饰
//        menu.addItem(.separator())
//        menu.addItem(bold)
//        menu.addItem(italic)
//        menu.addItem(banner)
//        menu.addItem(taskList)
//
//        // Table
//        menu.addItem(.separator())
//        menu.addItem(table)
//    }
//
//    // MARK: 移除不需要的菜单项目
//
//    private func removeMenu(_ menu: NSMenu) {
//        if let a = menu.item(withTitle: "查询“”") {
//            menu.removeItem(a)
//        }
//
//        if let a = menu.item(withTitle: "翻译“”") {
//            menu.removeItem(a)
//        }
//
////        if let a = menu.item(withTitle: "重新载入") {
////            menu.removeItem(a)
////        }
//    }
//}
