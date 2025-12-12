const path = require("path");

const fakePath = "/users///albert/../docs//myfolder///file.txt";
const normalPath = path.normalize(fakePath);
console.log("normalized => ", normalPath);
const parse = path.parse(normalPath);
console.log("Parse => ", parse);
const built = path.format({
    dir: parse.dir,
    name: parse.name,
    exr: parse.ext
});

console.log("new => ", built);
