import _ from 'lodash';
import match from './utils.js';

const calcTf = (termToRank, terms) => {
  const termCount = terms.reduce((acc, term) => (term === termToRank ? acc + 1 : acc), 0);
  return termCount / terms.length;
};

export default (docs) => {
  const withTF = docs.reduce((acc, doc) => {
    const { id, text } = doc;
    const terms = match(text);
    terms.forEach((term) => {
      const TF = calcTf(term, terms);
      if (!_.has(acc, term)) {
        acc[term] = { [id]: TF };
      }
      if (!_.has(acc[term], id)) {
        acc[term] = { ...acc[term], [id]: TF };
      }
    });
    return acc;
  }, {});

  const withTFIDF = _.mapValues(withTF, (data) => {
    const relevantDocsCount = Object.keys(data).length;
    const IDF = Math.log10(docs.length / relevantDocsCount);
    return _.mapValues(data, (TF) => TF * IDF);
  });

  return withTFIDF;
};
