class EventEmitter {
    static emitTips(message: string): void {
        const eventObj = new CustomEvent("tips", { detail: message });
        window.dispatchEvent(eventObj);
    }
}

export default EventEmitter;