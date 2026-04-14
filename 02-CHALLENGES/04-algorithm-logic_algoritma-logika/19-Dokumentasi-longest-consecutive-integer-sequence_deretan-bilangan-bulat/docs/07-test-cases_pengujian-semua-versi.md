# 🧪 Part 07 — Test Cases

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-5%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 🧪 Versi 1 | 🧪 Versi 2 | 🧪 Versi 3 | 🧪 Semua Versi |
|:----------:|:----------:|:----------:|:--------------:|
| [Jump](#-versi-1--sorting-on-log-n) | [Jump](#-versi-2--set-on) | [Jump](#-versi-3--set-on-ringkas) | [Jump](#-semua-versi-sekaligus) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Bisa menjalankan test cases untuk semua versi solusi
- ✅ Memahami kategori test cases yang perlu diuji
- ✅ Bisa menambahkan test cases sendiri

---

## 🧪 Versi 1 — Sorting O(n log n)

```javascript
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0

  const sortedNums = nums.sort((a, b) => a - b)

  let currentLength = 1
  let longestLength = 1

  for (let i = 1; i < sortedNums.length; i++) {
    const diff = sortedNums[i] - sortedNums[i - 1]

    if (diff === 1) {
      currentLength++
    } else if (diff > 1) {
      currentLength = 1
    }

    if (currentLength > longestLength) longestLength = currentLength
  }

  return longestLength
}
```

```javascript
// Basic cases
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));          // → 4
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1])); // → 10
```

```javascript
// Edge cases
console.log(longestConsecutiveSequence([]));  // → 0
console.log(longestConsecutiveSequence([5])); // → 1
```

```javascript
// Duplicate numbers
console.log(longestConsecutiveSequence([1, 2, 2, 3])); // → 3
```

---

## 🧪 Versi 2 — Set O(n)

```javascript
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0

  const numSet = new Set(nums)

  let longestLength = 1

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentLength = 1
      let currentNum = num

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentLength++
      }

      if (currentLength > longestLength) {
        longestLength = currentLength
      }
    }
  }

  return longestLength
}
```

```javascript
// Basic cases
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));          // → 4
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1])); // → 10
```

```javascript
// Edge cases
console.log(longestConsecutiveSequence([]));  // → 0
console.log(longestConsecutiveSequence([5])); // → 1
```

```javascript
// Duplicate numbers
console.log(longestConsecutiveSequence([1, 2, 2, 3])); // → 3
```

---

## 🧪 Versi 3 — Set O(n) Ringkas

```javascript
function longestConsecutiveSequence(nums) {
  const numSet = new Set(nums)
  let longestSequence = 0

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num
      let currentSequence = 1

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentSequence++
      }

      longestSequence = Math.max(longestSequence, currentSequence)
    }
  }

  return longestSequence
}
```

```javascript
// Basic cases
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));          // → 4
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1])); // → 10
```

```javascript
// Edge cases
console.log(longestConsecutiveSequence([]));  // → 0
console.log(longestConsecutiveSequence([5])); // → 1
```

```javascript
// Duplicate numbers
console.log(longestConsecutiveSequence([1, 2, 2, 3])); // → 3
```

---

## 🧪 Semua Versi Sekaligus

Gunakan ini untuk memverifikasi bahwa semua versi menghasilkan output yang sama. Copy semua blok kode di bawah secara berurutan:

**Blok 1 — Definisi v1 (Sorting):**

```javascript
const v1 = (nums) => {
  if (!nums.length) return 0

  const sortedNums = [...nums].sort((a, b) => a - b)

  let currentLength = 1
  let longestLength = 1

  for (let i = 1; i < sortedNums.length; i++) {
    const diff = sortedNums[i] - sortedNums[i - 1]

    if (diff === 1) {
      currentLength++
    } else if (diff > 1) {
      currentLength = 1
    }

    if (currentLength > longestLength) longestLength = currentLength
  }

  return longestLength
}
```

**Blok 2 — Definisi v2 (Set):**

```javascript
const v2 = (nums) => {
  if (!nums.length) return 0

  const numSet = new Set(nums)
  let longestLength = 1

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentLength = 1
      let currentNum = num

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentLength++
      }

      if (currentLength > longestLength) longestLength = currentLength
    }
  }

  return longestLength
}
```

**Blok 3 — Definisi v3 (Set Ringkas):**

```javascript
const v3 = (nums) => {
  const numSet = new Set(nums)
  let longestSequence = 0

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num
      let currentSequence = 1

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentSequence++
      }

      longestSequence = Math.max(longestSequence, currentSequence)
    }
  }

  return longestSequence
}
```

**Blok 4 — Test Cases:**

```javascript
const testCases = [
  { input: [100, 4, 200, 1, 3, 2],         expected: 4  },
  { input: [0, 3, 7, 2, 5, 8, 4, 6, 9, 1], expected: 10 },
  { input: [],                              expected: 0  },
  { input: [5],                             expected: 1  },
  { input: [1, 2, 2, 3],                    expected: 3  },
]

testCases.forEach(({ input, expected }) => {
  const r1 = v1(input)
  const r2 = v2(input)
  const r3 = v3(input)
  const status = r1 === expected && r2 === expected && r3 === expected ? '✅' : '❌'
  console.log(`${status} Input: [${input}] | Expected: ${expected} | v1: ${r1} | v2: ${r2} | v3: ${r3}`)
})
```

**Blok 5 — Expected Output:**

```
✅ Input: [100,4,200,1,3,2]        | Expected: 4  | v1: 4  | v2: 4  | v3: 4
✅ Input: [0,3,7,2,5,8,4,6,9,1]   | Expected: 10 | v1: 10 | v2: 10 | v3: 10
✅ Input: []                       | Expected: 0  | v1: 0  | v2: 0  | v3: 0
✅ Input: [5]                      | Expected: 1  | v1: 1  | v2: 1  | v3: 1
✅ Input: [1,2,2,3]                | Expected: 3  | v1: 3  | v2: 3  | v3: 3
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 06: Pitfalls & Jebakan Umum](06-pitfalls_jebakan-umum.md)**

---

<div align="center">

Made with ❤️ for learners

</div>