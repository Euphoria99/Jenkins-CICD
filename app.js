const http = require('http');
const _ = require('lodash');


const server = http.createServer((req, res) => {
//   const array = [1, 2, 3, 4, 5, 6];
  const array = _.times(5, () => _.random(1, 100));;

  // Chunk the array into smaller chunks
  const chunks = _.chunk(array, 2);

  // Filter the array to get even numbers
  const evenNumbers = _.filter(array, n => n % 2 === 0);

  // Reduce the array
  const reducedArray = _.reduce(array, (accumulator, value) => accumulator + value, 0);

  // Calculate the sum of the array elements
  const sum = _.sum(array);

  // Send the response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`Original Array: ${array.join(', ')}\n`);
  res.write(`Chunks: ${JSON.stringify(chunks)}\n`);
  res.write(`Even Numbers: ${evenNumbers.join(', ')}\n`);
  res.write(`Reduced Array: ${reducedArray}\n`);
  res.write(`Sum: ${sum}\n`);
  res.end();
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
