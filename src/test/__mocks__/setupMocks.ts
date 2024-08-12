export const mockIntersectionObserver = () => {
    global.IntersectionObserver = class IntersectionObserver {
        root: Element | null = null;
        rootMargin: string = '';
        thresholds: ReadonlyArray<number> = [];

        constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) { }

        observe(_target: Element) { }

        unobserve(_target: Element) { }

        disconnect() { }

        takeRecords(): IntersectionObserverEntry[] {
            return [];
        }
    };
};