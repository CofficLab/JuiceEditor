import UpdateData from "../model/UpdateData";
import Plugin from "../contract/Plugin";

class LocalApp implements Plugin {
    onMessage(message: string): void {

    }

    onPageLoaded(): void {

    }

    onSelectionTypeChange(type: string): void {

    }

    onUpdated(data: UpdateData): void {
        console.log(data)
    }
}

export default LocalApp