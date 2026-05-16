# 📋 Ringkasan Algoritma — Semua Versi

> Cheat sheet tanpa penjelasan — salin & jalankan langsung.

---

## V1 — Nested Loop Array (1-Indexed)

```javascript
const pascalTriangle = (num) => {
  let pattern = '';
  let prevRow = [];

  for (let row = 1; row <= num; row++) {
    for (let space = 1; space <= num - row; space++) {
      pattern += ' ';
    }

    let currRow = [];
    if (row === 1) {
      currRow.push(1);
    } else {
      currRow.push(1);
      for (let col = 0; col < prevRow.length - 1; col++) {
        currRow.push(prevRow[col] + prevRow[col + 1]);
      }
      currRow.push(1);
    }

    pattern += currRow.join(' ') + '\n';
    prevRow = currRow;
  }

  return pattern;
};
```

---

## V2 — Declarative Array + `.repeat()` (1-Indexed) ⭐ RECOMMENDED

```javascript
const pascalTriangle = (num) => {
  let pattern = '';
  let prevRow = [];

  for (let row = 1; row <= num; row++) {
    pattern += ' '.repeat(num - row);

    let currRow = [];
    if (row === 1) {
      currRow.push(1);
    } else {
      currRow.push(1);
      for (let col = 0; col < prevRow.length - 1; col++) {
        currRow.push(prevRow[col] + prevRow[col + 1]);
      }
      currRow.push(1);
    }

    pattern += currRow.join(' ') + '\n';
    prevRow = currRow;
  }

  return pattern;
};
```

---

## V3 — Math Combinatorial (0-Indexed)

```javascript
const pascalTriangle = (num) => {
  let pattern = '';

  for (let i = 0; i < num; i++) {
    pattern += ' '.repeat(num - i - 1);

    let val = 1;
    for (let j = 0; j <= i; j++) {
      pattern += val + ' ';
      val = (val * (i - j)) / (j + 1);
    }

    pattern += '\n';
  }

  return pattern;
};
```

---

## Quick Test

```javascript
console.log(pascalTriangle(5));
// Output:
//     1
//    1 1
//   1 2 1
//  1 3 3 1
// 1 4 6 4 1
```
