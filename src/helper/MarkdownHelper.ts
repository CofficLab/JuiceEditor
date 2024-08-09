import TurndownService from 'turndown'

export default class MarkdownHelper {

    static html2markdown(html: string) {
        var turndownService = new TurndownService({
            headingStyle: 'atx',
        })
        var markdown = turndownService.turndown(html)

        return markdown
    }
}