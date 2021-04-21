import { test, expect } from '@jest/globals';
import buildSearchEngine from '../index.js';

const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const doc4 = { id: 'doc4', text: 'Gimme a pint! Please, gimme a pint...' };
const docs = [doc1, doc2, doc3, doc4];

const searchEngine = buildSearchEngine(docs);

test('Finds a word', () => {
  expect(searchEngine.search('shoot')).toEqual(['doc2', 'doc1']);
});

test('Ignores punctuation', () => {
  expect(searchEngine.search('pint')).toEqual(['doc4', 'doc1']);
  expect(searchEngine.search('pint!')).toEqual(['doc4', 'doc1']);
});

test('Fuzzy', () => {
  expect(searchEngine.search('shoot at me')).toEqual(['doc2', 'doc1']);
  expect(searchEngine.search('gimme a pint')).toEqual(['doc4', 'doc1']);
});
