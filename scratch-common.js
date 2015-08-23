Papa.parsePromise = function(file, config) {
  config = config || {};
  return new Promise(function(resolve, reject) {
    config.complete = resolve;
    Papa.parse(file, config);
  });
};

var Bukas = {};

Bukas.Score = function(value, explanation){
  this.value = value;
  this.explanation = explanation;
}

Bukas.scoreDisclosure = function(disclosure) {
  // null || [date1, date2] || For agency releases only || Not yet available;
  // numbers subject to change of course

  if (disclosure === "For agency releases only") {
    // available only to agency releases
    return new Bukas.Score(2, "Available only to agencies, but not to the rest of the public.");
  } else if (disclosure === "Not yet available") {
    // not available
    return new Bukas.Score(1, "Not exactly useless as the dataset exists.");
  } else {
    // available to the public.
    return new Bukas.Score(3, "Available to everyone.");
  }
}