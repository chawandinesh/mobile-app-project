import { flattenCategories, getType } from '../utils';
import { categoryData } from './categoryData';

describe('flattenCategories', () => {
  const flattend = flattenCategories(categoryData.result.items);
  it('should return an object', () => {
    expect(getType(flattend)).toBe('Object');
  });

  it('should have the same amount of keys as there are items', () => {
    expect(Reflect.ownKeys(flattend).length).toBe(47);
  });

  it('should add subcategories where they exist', () => {
    expect(flattend.protection.subCategories).not.toBeFalsy();
    expect(flattend.protection.subCategories).toEqual({
      '3ph-ac-protection-box': 407,
      'ac-protection-box': 353,
      'battery-protection': 389,
      'dc-protection-box': 319,
      'dc-surge-protection': 225,
      'lightning-protections': 182,
      'network-protection': 291,
      'single-phase-surge-protection': 207,
      'three-phase-surge-protections': 181
    });
  });
});
