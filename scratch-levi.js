Papa.parse("adiaug2015.csv", {
  download: true,
  header: true,
  complete: function (results, file){
    console.log(results.data, _);
  }
});