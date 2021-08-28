import Decimal from 'decimal.js'

export function numberToString(number) {
    try {
        number = Decimal(number).toString();
    } catch (e) {
        try {
            number = Decimal(number.toString().replaceAll(',', '.'));
        } catch (e) {
                return '';
        }
    }
    return Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8}).format(number);
}

export function getLocaleDecimalSeparator() {
    const decimalNumber = 0.1;
    return decimalNumber.toLocaleString().substring(1, 2);
}

export function numberToLocaleDecimal(number) {
    return number.replace('.', getLocaleDecimalSeparator());
}
  
export function localeDecimalToPeriod(number) {
    return number.replace(getLocaleDecimalSeparator(), '.').replace(',', '.');
}

export function stringToNumber(string) {
    if (!string.match(/^-?(([1-9]\d{0,2}(\.\d{3})*)|([1-9]\d*|0))(,\d+)?$/))
        return '';

    string = string.replaceAll(' ', '').replaceAll('.', '').replaceAll(',','.');

    if (string.length === 0) {
        return '';
    }
    try {
        return Decimal(string).toString();
    } catch (e) {
        return '';
    }
}

export function formatNumber(string) {
    string = string.toString();
    if (string.match(/^-?(([1-9]\d{0,2}(\.\d{3})*)|([1-9]\d*|0))(,\d+)?$/))
        string = stringToNumber(string);
    return numberToString(string);
}
