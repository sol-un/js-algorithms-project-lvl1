const match = (string) => string.toLowerCase().match(/('\w+)|(\w+'\w+)|(\w+')|(\w+)/g);

export { match as default };
