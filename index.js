const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function getFactors(num) {
  const factors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

app.get('/number', (req, res) => {
  res.send('Go to /number/:num to check if :num is prime or composite');
});

app.get('/number/:num', (req, res) => {
  const number = parseInt(req.params.num);

  if (isNaN(number)) {
    res.status(400).send('Invalid number');
  } else if (number < 0) {
    res.send('The number is negative');
  } else if (number === 1) {
    res.send('The number 1 is neither prime nor composite');
  } else if (isPrime(number)) {
    res.send(`The number ${number} is prime`);
  } else {
    const factors = getFactors(number);
    res.send(`The number ${number} is composite\nFactors: ${factors.join(', ')}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
