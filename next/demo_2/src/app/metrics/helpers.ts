export function pathToPathname(path: string): string {
    const searchPosition = path.indexOf('?');
    return searchPosition ? path.slice(0, searchPosition) : path;
}