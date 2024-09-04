import PageMode from "../model/PageMode"

interface Listener {
    start(pageMode: PageMode): void
}

export default Listener