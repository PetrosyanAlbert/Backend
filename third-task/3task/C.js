const buf = Buffer.alloc(10); 
console.log(buf);

buf[0] = 65;
buf[1] = 66;
buf[2] = 67;

console.log(buf);
console.log(buf.toString());
