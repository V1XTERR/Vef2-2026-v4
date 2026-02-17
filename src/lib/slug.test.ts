import { describe, test } from 'node:test';
import assert from 'node:assert';
import { generateSlug } from './slug.js';

describe('generateSlug', () => {
  test('converts title to lowercase slug', () => {
    const result = generateSlug('Hello World');
    assert.strictEqual(result, 'hello-world');
  });

  test('removes special characters', () => {
    const result = generateSlug('Hello! @World#');
    assert.strictEqual(result, 'hello-world');
  });

  test('replaces multiple spaces with single dash', () => {
    const result = generateSlug('Hello   World');
    assert.strictEqual(result, 'hello-world');
  });

  test('handles Icelandic characters', () => {
    const result = generateSlug('Þetta eru íslenskir stafir');
    assert.strictEqual(result, 'thetta-eru-islenskir-stafir');
  });

  test('removes consecutive dashes', () => {
    const result = generateSlug('Hello---World');
    assert.strictEqual(result, 'hello-world');
  });
});
