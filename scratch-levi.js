dataPromise.then(function(results){
  console.log(results);
  const fullDisclosiveScore = new Bukas.Score(results
    .entries
    .map(Bukas.scoreDisclosive)
    .reduce(function(acc, score) {
      return acc.add(score);
    }).value / results.entries.length,
    "Availability score. A score of 1.0 means all the datasets are available to the public."
  );

  console.log(results.entries.filter(function(entry) {
    return entry.dateReleased > new Date();
  }).length);
  console.log(fullDisclosiveScore);
})