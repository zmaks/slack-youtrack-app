export {};

declare global {
    interface YTAppHost {
        fetchYouTrack: (path: string, options?: { query?: Record<string, string | number> }) => Promise<any>;
        fetchApp: (path: string, options?: { scope?: boolean, method?: string }) => Promise<any>;
    }

    const YTApp: {
        register: () => Promise<YTAppHost>;
        entity: {
            id: string;
            created: string;
        };
    };
}
