export default function getApiErrorReason(error: Error | unknown): string {
    const statusCode = (error as any)?.response?.statusCode || (error as any)?.response?.status

    if (statusCode) {
        return `${statusCode}`
    }

    if (error instanceof Error) {
        return formatErrorMessages(error.message)
    }

    return 'UNKNOWN REASON'
}

function formatErrorMessages(message: string): string {
    return message.replace(/^(request) to .* (failed)/, '$1 $2')
}