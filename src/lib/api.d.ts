declare module '../lib/api' {
    export function apiFetch(url: string, options?: any): Promise<any>;
}
export {};