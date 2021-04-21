const match = (string) => string.match(/\w+\w/g);

const index = (docs) => docs.map((doc) => {
  const { id, text } = doc;
  const terms = match(text);
  return { id, terms };
});

const evaluate = (doc, termsToSearch) => {
  const { terms } = doc;
  const metric = terms.reduce((acc, term) => (termsToSearch.includes(term)
    ? acc + 1
    : acc), 0);
  return { ...doc, metric };
};

export { match, index, evaluate };
