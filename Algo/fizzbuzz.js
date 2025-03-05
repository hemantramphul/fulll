class FizzBuzz {
  constructor(maxNumber) {
    this.maxNumber = maxNumber;
  }

  checkDivisibility(number, divisor) {
    return number % divisor === 0;
  }

  generate() {
    let results = [];
    for (let number = 1; number <= this.maxNumber; number++) {
      let display = "";
      // divided by 3
      if (this.checkDivisibility(number, 3)) {
        display += "Fizz";
      }
      // divided by 5
      if (this.checkDivisibility(number, 5)) {
        display += "Buzz";
      }
      results.push(display || number);
    }
    return results;
  }
}

const fizzBuzz = new FizzBuzz(15);
console.log(fizzBuzz.generate());
