var a = [];
var b = str.split("");
b.forEach(function(item){
  if (!a.includes(item)){
    a.push(item);
  }
})
a.sort();

// "ab"
// b = ["a", "b"]

// a =["a"]
// b = ["a", "b"]

// ["", "a", "ab" "b"]

// var results = [""];

str.split("").reduce(function(results, currentLetter) {
  return results.map(function(item) {
    return currentLetter + item;
  }.concat(results);
}, [""])


// [""] --> ["a"] --> ["", "a"] /// for 'a'
// ["", "a"] --> ["b", "ab"] --> ["", "a", "b", "ab"]
