import { getType } from '../../utils/utils';
import {
  translator,
  translatorWrap,
  interpolate,
  getPluralRulesValue,
  interpolationWrap
} from '../index';

describe('Translator', () => {
  it('should return a string based on the locale', () => {
    expect(translator('addToBasket', 'en-ZA')).toBe('[en-ZA] Add to basket');
    expect(translator('addToBasket', 'de-DE')).toBe('[de-DE] Add to basket');
  });

  it('should default to "en-GB" if not locale supplied', () => {
    expect(translator('addToBasket')).toBe('Add to basket');
  });

  it('should default to "en-GB" if a not-existent or non-supported locale supplied', () => {
    expect(translator('addToBasket', 'aa')).toBe('Add to basket');
  });
});

describe('translatorWrap', () => {
  it('should return a function', () => {
    const wrappedTranslator = translatorWrap();
    expect(getType(wrappedTranslator)).toBe('Function');
  });

  it('should return a string based on the locale', () => {
    expect(translatorWrap('en-ZA')('addToBasket')).toBe(
      '[en-ZA] Add to basket'
    );
    expect(translatorWrap('de-DE')('addToBasket')).toBe(
      '[de-DE] Add to basket'
    );
  });

  it('should default to "en-GB" if not locale supplied', () => {
    expect(translatorWrap()('addToBasket')).toBe('Add to basket');
  });

  it('should default to "en-GB" if a not-existent or non-supported locale supplied', () => {
    expect(translatorWrap('aa')('addToBasket')).toBe('Add to basket');
  });
});

describe('Interpolate', () => {
  it('should replace the default key "{count}" with the supplied amount', () => {
    const interpolated = interpolate('{count} items in your basket', 6);
    expect(interpolated).toBe('6 items in your basket');
  });

  // it('should replace a supplied key with the correct amount', () => {
  //   const interpolated = interpolate('{budgie} budgies', 5, 'budgie');
  //   expect(interpolated).toBe('5 budgies');
  // });
});

describe('getPluralRulesValue', () => {
  // english has only two
  it('should return the correct values based on value and default locale [en-GB]', () => {
    expect(getPluralRulesValue(0)).toBe('other');
    expect(getPluralRulesValue(1)).toBe('one');
    expect(getPluralRulesValue(2)).toBe('other');
    expect(getPluralRulesValue(3)).toBe('other');
  });

  // ar has various different plurals
  it('should return the correct values bases on value and supplied locale', () => {
    expect(getPluralRulesValue(0, 'ar-ae')).toBe('zero');
    expect(getPluralRulesValue(1, 'ar-ae')).toBe('one');
    expect(getPluralRulesValue(2, 'ar-ae')).toBe('two');
    expect(getPluralRulesValue(3, 'ar-ae')).toBe('few');
    expect(getPluralRulesValue(4, 'ar-ae')).toBe('few');
    expect(getPluralRulesValue(5, 'ar-ae')).toBe('few');
    expect(getPluralRulesValue(11, 'ar-ae')).toBe('many');
  });

  it('should be correct for en-ZA', () => {
    expect(getPluralRulesValue(0, 'en-ZA')).toBe('other');
    expect(getPluralRulesValue(1, 'en-ZA')).toBe('one');
    expect(getPluralRulesValue(2, 'en-ZA')).toBe('other');
    expect(getPluralRulesValue(3, 'en-ZA')).toBe('other');
  });

  it('should be correct for de-DE', () => {
    expect(getPluralRulesValue(0, 'de-DE')).toBe('other');
    expect(getPluralRulesValue(1, 'de-DE')).toBe('one');
    expect(getPluralRulesValue(2, 'de-DE')).toBe('other');
    expect(getPluralRulesValue(3, 'de-DE')).toBe('other');
  });
});

describe('interpolationWrap', () => {
  it('should return the default interpolation when no locale supplied', () => {
    const wrappedInterpolation = interpolationWrap();
    expect(getType(wrappedInterpolation)).toBe('Function');
  });

  it('should return the correct message based on the supplied value (using default locale)', () => {
    const wrappedInterpolation = interpolationWrap();
    let returnedMessage = wrappedInterpolation(6, 'basketItems');
    expect(returnedMessage).toBe('6 items in your basket');

    returnedMessage = wrappedInterpolation(0, 'basketItems');
    expect(returnedMessage).toBe('0 items in your basket');

    returnedMessage = wrappedInterpolation(1, 'basketItems');
    expect(returnedMessage).toBe('1 item in your basket');
  });

  it('should return the correct message based on the supplied value (using supplied locale)', () => {
    const wrappedInterpolation = interpolationWrap('en-ZA');
    let returnedMessage = wrappedInterpolation(6, 'basketItems');
    expect(returnedMessage).toBe('[en-ZA] 6 items in your basket');

    returnedMessage = wrappedInterpolation(0, 'basketItems');
    expect(returnedMessage).toBe('[en-ZA] 0 items in your basket');

    returnedMessage = wrappedInterpolation(1, 'basketItems');
    expect(returnedMessage).toBe('[en-ZA] 1 item in your basket');
  });

  // some times we need to add xx and a date ie in the stock messages
  // need to supply a date string
  describe('Interpolation with dates', () => {
    const wrappedInterpolation = interpolationWrap();
    let returnedMessage = wrappedInterpolation(
      1,
      'fakeStockItem',
      '12 Feb 2022'
    );

    expect(returnedMessage).toBe('1 in stock on 12 Feb 2022');

    returnedMessage = wrappedInterpolation(3, 'fakeStockItem', '12 Feb 2022');
    expect(returnedMessage).toBe('3 in stock on 12 Feb 2022');
  });
});
