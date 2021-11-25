import queryString from "query-string";

class UrlService {
    build(url: string, queryParams: { [key: string]: any } = {}): string {
        const urlQueryParams = new URLSearchParams(queryParams).toString();

        if (urlQueryParams) {
            return `${url}?${urlQueryParams}`;
        }

        return url;
    }

    parse(query: string) {
        return queryString.parse(query);
    }
}

export default new UrlService();
