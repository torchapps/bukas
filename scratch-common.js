Papa.parsePromise = function(file, config) {
  config = config || {};
  return new Promise(function(resolve, reject) {
    config.complete = resolve;
    Papa.parse(file, config);
  });
};