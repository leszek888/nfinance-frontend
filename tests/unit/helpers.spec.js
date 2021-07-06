import { expect } from '@jest/globals'
import { formatNumber, numberToString, stringToNumber } from '@/helpers.js'

describe('Helper functions', () => {
    it('should format Number to locale number', () => {
        const number = '2132.2';
        const formatted = numberToString(number);

        expect(formatted).toBe('2.132,20');
    });

    it('should convert formatted number string back to number', () => {
        const string = '1.234,50';
        const number = stringToNumber(string);

        expect(number).toEqual("1234.5");
    });

    it('should add thousands separators if they are missing', () => {
        const string = '1232,50';
        const formatted = formatNumber(string);

        expect(formatted).toBe('1.232,50');

        const second = '1.233,5';
        const secondFormatted = formatNumber(second);

        expect(secondFormatted).toBe('1.233,50');
    });

});
