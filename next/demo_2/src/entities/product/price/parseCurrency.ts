import once from 'lodash/once'

type RecordIntlNumberFormatParts = Record<Intl.NumberFormatPartTypes, string>
type RecordIntlNanParts = Pick<RecordIntlNumberFormatParts, 'nan' | 'currency'>

const getIntl = once(
    () => new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2,
    })
)

const getNanParts = once(() => getIntl()
    .formatToParts()
    .reduce<RecordIntlNanParts>(
        (acc, part) => {
            const {type, value} = part
            if (type === 'currency' || type === 'nan') {
                acc[type] = value
            }

            return acc
        },
        {
            currency: '',
            nan: '',
        }
    ))

/**
 * Format value as currency.
 * DO NOT USE IN UI COMPONENTS!
 * @param value - Number value to format as currency.
 * @returns Formatted value.
 */
export function formatCurrency(value: number) {
    return getIntl().format(value)
}
export function isFormattedCurrency(value?: string | number) {
    return typeof value === 'string' && value.includes(getNanParts().currency)
}

export function parseCurrency(value: string | number) {
    if (isFormattedCurrency(value)) {
        return value
    }

    const parsed = typeof value === 'number' ? value : parseFloat(value.replace(',', '.'))

    return formatCurrency(parsed)
}