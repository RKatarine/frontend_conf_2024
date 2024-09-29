
/**
 * Detect, if path is SSP request.
 * @param path - full request path.
 * @returns fact whether path is SSP.
 */
export function checkIsSSPPath(path: string): boolean {
    return path.startsWith('/_next/data/')
}

/**
 * Detect requests for the static resources
 * @param path - full request path.
 * @returns fact - path to static
 */
export function checkIsStaticResourcePath(path: string): boolean {
    return path.startsWith('/_next/static/')
}
