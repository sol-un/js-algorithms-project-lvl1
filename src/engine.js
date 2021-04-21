// @ts-check
import _ from 'lodash';
import { match, index, evaluate } from './utils.js';

const hardSearch = (docs, word) => {
  const termsToSearch = match(word);
  const relevantDocs = docs.filter(({ terms }) => _.intersection(terms, termsToSearch).length > 0);
  const evaluatedDocs = relevantDocs.map((doc) => evaluate(doc, termsToSearch));
  return evaluatedDocs
    .sort(({ metric: metric1 }, { metric: metric2 }) => metric2 - metric1)
    .map(({ id }) => id);
};

export default (docs) => {
  const indexedDocs = index(docs);
  return { search: (word) => hardSearch(indexedDocs, word) };
};
