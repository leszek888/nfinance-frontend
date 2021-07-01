import { expect } from '@jest/globals'
import { formatNumber, stringToNumber } from '@/helpers.js'

describe('Helper functions', () => {
    it('should format Number to locale number', () => {
        const number = '2132.2';
        const formatted = formatNumber(number);

        expect(formatted).toBe('2.132,20');
    });

    it('should convert formatted number string back to number', () => {
        const string = '1.234,50';
        const number = stringToNumber(string);

        expect(number).toEqual("1234.5");
    });
});
