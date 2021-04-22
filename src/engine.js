// @ts-check
import _ from 'lodash';
import match from './utils.js';
import buildIndex from './index-builder.js';

const search = (index, token) => {
  if (token.length === 0) {
    return null;
  }

  const terms = Object.keys(index);
  const termsToSearch = match(token);
  if (_.intersection(terms, termsToSearch).length === 0) {
    return null;
  }

  const TFIDFRanking = termsToSearch
    .reduce((acc, term) => {
      const TFIDFRankingByDoc = index[term];
      const docIDs = Object.keys(TFIDFRankingByDoc);
      docIDs.forEach((id) => {
        if (!_.has(acc, id)) {
          acc[id] = TFIDFRankingByDoc[id];
        }
        acc[id] += TFIDFRankingByDoc[id];
      });
      return acc;
    }, {});

  return Object
    .keys(TFIDFRanking)
    .sort((docID1, docID2) => TFIDFRanking[docID2] - TFIDFRanking[docID1]);
};

export default (docs) => {
  const index = buildIndex(docs);
  return {
    search: (token) => search(index, token),
  };
};
