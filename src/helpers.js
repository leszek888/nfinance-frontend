import Decimal from 'decimal.js'

export function formatNumber(number) {
    if (number === null || number.toString().length === 0 || isNaN(parseFloat(number)))
        return '';

    return Intl.NumberFormat('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 8}).format(number);
}

export function stringToNumber(string) {
    string = string.replaceAll(' ', '').replaceAll('.','').replaceAll(',','.');

    if (string.length === 0) {
        return NaN;
    }
    try {
        return Decimal(string).toString();
    } catch (e) {
        return '0';
    }
}

