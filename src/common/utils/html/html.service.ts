import parse, { HTMLReactParserOptions } from "html-react-parser";

class HtmlService {
    parse(
        htmlString: string,
        options?: HTMLReactParserOptions
    ): string | JSX.Element | JSX.Element[] {
        return parse(htmlString, options);
    }

    extractText(htmlString?: string): string {
        const span = document.createElement("span");
        span.innerHTML = htmlString ?? "";
        return span.textContent || span.innerText;
    }
}

export default new HtmlService();
