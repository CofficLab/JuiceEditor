// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "JuiceEditorKit",
    platforms: [
        .macOS(.v14)
    ],
    products: [
        .library(
            name: "JuiceEditorKit",
            targets: ["JuiceEditorKit"]),
        .executable(
            name: "JuiceEditorTestApp",
            targets: ["JuiceEditorTestApp"])
    ],
    dependencies: [
        .package(url: "https://github.com/vapor/vapor.git", from: "4.0.0"),
        .package(url: "https://github.com/CofficLab/MagicKit.git", branch: "dev")
    ],
    targets: [
        .target(
            name: "JuiceEditorKit",
            dependencies: [
                .product(name: "Vapor", package: "vapor"),
                .product(name: "MagicKit", package: "MagicKit")
            ],
            resources: [
                .copy("./WebApp")
            ]),
        .executableTarget(
            name: "JuiceEditorTestApp",
            dependencies: ["JuiceEditorKit"],
            path: "Sources/JuiceEditorTestApp"),
        .testTarget(
            name: "JuiceEditorKitTests",
            dependencies: ["JuiceEditorKit"]),
    ]
)
