import SwiftUI

public extension EditorView {
    func verbose(_ isVerbose: Bool) -> some View {
        var view = self
        view.verbose = isVerbose
        return view
    }
}

#Preview {
    EditorView()
        .verbose(true)
        .frame(height: 1000)
        .frame(width: 700)
}
