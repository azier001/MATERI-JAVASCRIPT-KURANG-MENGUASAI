// Find the stray number
// https://www.codewars.com/kata/57f609022f4d534f05000024

const stray = (numbers) => {
  const firstNumber = numbers[0];
  const firstNumberCount = numbers.filter(num => num === firstNumber).length;
  
  if (firstNumberCount === 1) {
    return firstNumber;
  } else {
    return numbers.find(num => num !== firstNumber);
  }
};

// Test cases untuk console.log
console.log('=== Test Cases ===');
console.log('Test 1:', stray([1, 1, 2]), '→ Expected: 2');
console.log('Test 2:', stray([17, 17, 3, 17, 17, 17, 17]), '→ Expected: 3');
console.log('Test 3:', stray([8, 1, 1, 1, 1, 1, 1]), '→ Expected: 8');
console.log('Test 4:', stray([1, 1, 1, 1, 1, 1, 0]), '→ Expected: 0');
console.log('Test 5:', stray([0, 0, 0, 7, 0, 0, 0]), '→ Expected: 7');
console.log('Test 6:', stray([-21, -21, -21, -21, -6, -21, -21]), '→ Expected: -6');

// Edge cases
console.log('\n=== Edge Cases ===');
console.log('Test 7 (stray at beginning):', stray([5, 3, 3]), '→ Expected: 5');
console.log('Test 8 (stray at middle):', stray([3, 5, 3]), '→ Expected: 5');
console.log('Test 9 (stray at end):', stray([3, 3, 5]), '→ Expected: 5');

module.exports = stray;
