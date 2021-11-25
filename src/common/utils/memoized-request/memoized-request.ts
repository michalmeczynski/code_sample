const REQUEST_LIFETIME = 60000;

class MemoizedRequest {
    static memoizedRequests: {
        [key: string]: {
            promise: Promise<any>;
            timeoutId: number;
        };
    } = {};

    static getRequest<T>(
        request: () => Promise<T>,
        key: string,
        lifetime: number = REQUEST_LIFETIME
    ): Promise<T> {
        if (!this.memoizedRequests[key]) {
            const timeoutId = window.setTimeout(() => {
                delete this.memoizedRequests[key];
            }, lifetime);

            this.memoizedRequests[key] = {
                promise: request(),
                timeoutId,
            };
        }

        return this.memoizedRequests[key].promise;
    }
}

export default MemoizedRequest;
