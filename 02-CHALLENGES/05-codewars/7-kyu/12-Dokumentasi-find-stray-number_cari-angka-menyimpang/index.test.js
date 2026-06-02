const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;

const stray = require('./index');

describe("Fixed Tests", () => {
  it("Should pass Fixed Tests", () => {
    assert.strictEqual(stray([1, 1, 2]), 2);
    
    assert.strictEqual(stray([17, 17, 3, 17, 17, 17, 17]), 3);
    
    assert.strictEqual(stray([8, 1, 1, 1, 1, 1, 1]), 8);
    
    assert.strictEqual(stray([1, 1, 1, 1, 1, 1, 0]), 0);
    
    assert.strictEqual(stray([0, 0, 0, 7, 0, 0, 0]), 7);
    
    assert.strictEqual(stray([-21, -21, -21, -21, -6, -21, -21]), -6);
  });
});

describe("Random Tests", () => {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function validRandomArray(size, strayNumber) {
    let duplicatedNumber = randomInt(-10000, 10000);
    while (duplicatedNumber === strayNumber) { // to make sure the strayNumber is unique
      duplicatedNumber = randomInt(-10000, 10000);
    }
    let array = Array(size).fill(duplicatedNumber);
    array[randomInt(0, size)] = strayNumber;
    return array;
  }
  
  it("Should pass some Edge Tests", () => {
    
    let strayNumber = randomInt(-10000, 10000);
    
    let duplicatedNumber = randomInt(-10000, 10000);
    while (duplicatedNumber === strayNumber) { // to make sure the strayNumber is unique
      duplicatedNumber = randomInt(-10000, 10000);
    }
    let case1 = [strayNumber, duplicatedNumber, duplicatedNumber],
        case2 = [duplicatedNumber, strayNumber, duplicatedNumber],
        case3 = [duplicatedNumber, duplicatedNumber, strayNumber];
    
    assert.strictEqual(stray(case1), strayNumber, "Stray number is at the beginning");
    
    assert.strictEqual(stray(case2), strayNumber, "Stray number is at the middle");
    
    assert.strictEqual(stray(case3), strayNumber, "Stray number is at the end");
  });
  
  it("Should pass Random Tests", () => {
    
    let strayNumber;
    for(let i=0 ; i<50 ; i++){
      
      strayNumber = randomInt(-10000, 10000);
      let arr = validRandomArray(101, strayNumber);
      assert.strictEqual(stray(arr), strayNumber);
      
      strayNumber = randomInt(-10000, 10000);
      arr = validRandomArray(15273, strayNumber)
      assert.strictEqual(stray(arr), strayNumber);
    }
  });
});
