import Decimal from 'decimal.js'

export function formatNumber(number) {
    try {
        number = Decimal(number).toString();
    } catch (e) {
        try {
            number = Decimal(number.toString().replaceAll(',', '.'));
        } catch (e) {
                return '';
        }
    }
    return Intl.NumberFormat('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 8}).format(number);
}

export function stringToNumber(string) {
    string = string.replaceAll(' ', '').replaceAll('.','').replaceAll(',','.');

    if (string.length === 0) {
        return '';
    }
    try {
        return Decimal(string).toString();
    } catch (e) {
        return '';
    }
}
