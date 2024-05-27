// sum.test.js
import { expect, test } from 'vitest'
import { paddingZeroLeft, getIconAssetUrl } from './helpers.js'

// test('adds 1 + 2 to equal 3', () => {
// expect(sum(1, 2)).toBe(3)
// })

test('paddingZeroLeft must padding zero correctly', () => {
  expect(paddingZeroLeft('9', 4)).toBe('0009')
  expect(paddingZeroLeft('99', 4)).toBe('0099')
  expect(paddingZeroLeft('999', 4)).toBe('0999')
  expect(paddingZeroLeft('9999', 4)).toBe('9999')
  expect(paddingZeroLeft('99999', 4)).toBe('99999')

  expect(paddingZeroLeft('', 4)).toBe('0000')
});

test('getIconAssetUrl must generate correctly', () => {
  expect(getIconAssetUrl('grass')).to.contains('assets/icon-grass.png');
});