import UpdateData from "../model/UpdateData"

interface Plugin {
    onPageLoaded(): void
    onMessage(message: string): void
    onSelectionTypeChange(type: string): void
    onUpdated(data: UpdateData): void
}

export default Plugin