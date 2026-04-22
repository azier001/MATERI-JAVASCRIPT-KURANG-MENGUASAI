# 🧪 Test Cases — Kasus Pengujian

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Testing%20|%20Validation-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📚 Daftar Isi

- 💻 [Kode Lengkap Siap Jalankan](#kode)
- 📋 [Daftar Test Cases](#daftar)
- ▶️ [Cara Menjalankan](#cara)
- 📤 [Expected Output](#output)

---

<a name="kode"></a>
## 💻 Kode Lengkap Siap Jalankan

### V1 — Stack Implementation

```js
function isBalancedStack(str) {
  if (str.length % 2 !== 0) return false;

  const stack = [];

  for (const paren of str) {
    if (paren === '(') {
      stack.push(paren);
    } else if (paren === ')') {
      if (stack.pop() === undefined) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

### V2 — Counter Implementation

```js
function isBalancedCounter(str) {
  if (str.length % 2 !== 0) return false;

  let count = 0;

  for (const paren of str) {
    if (paren === '(') count++;
    else if (paren === ')') count--;

    if (count < 0) return false;
  }

  return count === 0;
}
```

---

<a name="daftar"></a>
## 📋 Daftar Test Cases

### ✅ Kategori 1 — Basic (Seharusnya `true`)

| # | Input | Expected | Alasan |
|---|-------|----------|--------|
| 1 | `"()"` | `true` | Satu pasang sederhana |
| 2 | `"()()"` | `true` | Dua pasang berurutan |
| 3 | `"(())"` | `true` | Satu pasang bersarang |

---

### ✅ Kategori 2 — Nested / Kompleks (Seharusnya `true`)

| # | Input | Expected | Alasan |
|---|-------|----------|--------|
| 4 | `"(()())"` | `true` | Bersarang dengan dua pasang di dalam |
| 5 | `"((()))"` | `true` | Tiga lapis bersarang |
| 6 | `"()(())"` | `true` | Campuran berurutan dan bersarang |
| 7 | `"(())(())"` | `true` | Dua kelompok bersarang |

---

### ❌ Kategori 3 — Gagal di Tengah (Seharusnya `false`)

| # | Input | Expected | Alasan |
|---|-------|----------|--------|
| 8 | `")("` | `false` | Kurung tutup muncul sebelum buka |
| 9 | `"))(("` | `false` | Dua kurung tutup di awal |
| 10 | `"())("` | `false` | Tutup berlebih di tengah |

---

### ❌ Kategori 4 — Gagal di Akhir (Seharusnya `false`)

| # | Input | Expected | Alasan |
|---|-------|----------|--------|
| 11 | `"(("` | `false` | Dua kurung buka tanpa tutup |
| 12 | `"((()"` | `false` | Guard clause: panjang ganjil (4? tidak, 4 genap — tapi stack masih ada isi) |
| 13 | `"()(("` | `false` | Pasangan pertama ok, sisanya tidak |

---

### 🫙 Kategori 5 — Edge Cases (Kasus Pojok)

| # | Input | Expected | Alasan |
|---|-------|----------|--------|
| 14 | `""` | `true` | String kosong = tidak ada pelanggaran |
| 15 | `"("` | `false` | Guard clause: panjang ganjil |
| 16 | `")"` | `false` | Guard clause: panjang ganjil |
| 17 | `"(()"` | `false` | Guard clause: panjang ganjil |
| 18 | `"())"` | `false` | Guard clause: panjang ganjil |

---

### 🧪 Kode Test Runner

Salin kode di bawah ini ke file `isBalanced.js` untuk menjalankan semua test sekaligus:

```js
// ===== V1 — Stack =====
function isBalancedStack(str) {
  if (str.length % 2 !== 0) return false;
  const stack = [];
  for (const paren of str) {
    if (paren === '(') stack.push(paren);
    else if (paren === ')') {
      if (stack.pop() === undefined) return false;
    }
  }
  return stack.length === 0;
}

// ===== V2 — Counter =====
function isBalancedCounter(str) {
  if (str.length % 2 !== 0) return false;
  let count = 0;
  for (const paren of str) {
    if (paren === '(') count++;
    else if (paren === ')') count--;
    if (count < 0) return false;
  }
  return count === 0;
}

// ===== Test Cases =====
const tests = [
  // Kategori 1 — Basic (true)
  { input: '()',       expected: true,  label: 'Satu pasang sederhana' },
  { input: '()()',     expected: true,  label: 'Dua pasang berurutan' },
  { input: '(())',     expected: true,  label: 'Satu pasang bersarang' },

  // Kategori 2 — Nested (true)
  { input: '(()())',   expected: true,  label: 'Bersarang dengan dua pasang' },
  { input: '((()))',   expected: true,  label: 'Tiga lapis bersarang' },
  { input: '()(())',   expected: true,  label: 'Campuran berurutan & bersarang' },
  { input: '(())(())', expected: true,  label: 'Dua kelompok bersarang' },

  // Kategori 3 — Gagal di tengah (false)
  { input: ')(',       expected: false, label: 'Tutup sebelum buka' },
  { input: '))((',     expected: false, label: 'Dua tutup di awal' },
  { input: '())(',     expected: false, label: 'Tutup berlebih di tengah' },

  // Kategori 4 — Gagal di akhir (false)
  { input: '((',       expected: false, label: 'Dua buka tanpa tutup' },
  { input: '((()',     expected: false, label: 'Tiga buka satu tutup' },
  { input: '()((',     expected: false, label: 'Pasangan pertama ok, sisa tidak' },

  // Kategori 5 — Edge cases
  { input: '',         expected: true,  label: 'String kosong' },
  { input: '(',        expected: false, label: 'Satu kurung buka' },
  { input: ')',        expected: false, label: 'Satu kurung tutup' },
  { input: '(()',      expected: false, label: 'Panjang ganjil (3)' },
  { input: '())',      expected: false, label: 'Panjang ganjil (3)' },
];

// ===== Runner =====
console.log('========================================');
console.log('  🧪 TEST RESULTS — Balanced Parenthesis');
console.log('========================================\n');

let passCount = 0;
let failCount = 0;

tests.forEach((test, i) => {
  const resultStack   = isBalancedStack(test.input);
  const resultCounter = isBalancedCounter(test.input);
  const stackOk   = resultStack === test.expected;
  const counterOk = resultCounter === test.expected;
  const allOk = stackOk && counterOk;

  const icon = allOk ? '✅' : '❌';
  const num  = String(i + 1).padStart(2, '0');
  const inputDisplay = test.input === '' ? '""' : `"${test.input}"`;

  console.log(`${icon} Test ${num}: ${inputDisplay.padEnd(14)} → Stack: ${String(resultStack).padEnd(5)} | Counter: ${String(resultCounter).padEnd(5)} | Expected: ${test.expected} — ${test.label}`);

  if (allOk) passCount++;
  else failCount++;
});

console.log('\n========================================');
console.log(`  📊 Total: ${passCount} passed, ${failCount} failed out of ${tests.length}`);
console.log('========================================');
```

---

<a name="cara"></a>
## ▶️ Cara Menjalankan

### Prasyarat

Pastikan **Node.js** sudah terinstal di komputer kamu:

```bash
node --version
# Contoh output: v18.17.0
```

### Jalankan Test

```bash
node isBalanced.js
```

---

<a name="output"></a>
## 📤 Expected Output

```
========================================
  🧪 TEST RESULTS — Balanced Parenthesis
========================================

✅ Test 01: "()"            → Stack: true  | Counter: true  | Expected: true — Satu pasang sederhana
✅ Test 02: "()()"          → Stack: true  | Counter: true  | Expected: true — Dua pasang berurutan
✅ Test 03: "(())"          → Stack: true  | Counter: true  | Expected: true — Satu pasang bersarang
✅ Test 04: "(()())"        → Stack: true  | Counter: true  | Expected: true — Bersarang dengan dua pasang
✅ Test 05: "((()))"        → Stack: true  | Counter: true  | Expected: true — Tiga lapis bersarang
✅ Test 06: "()(())"        → Stack: true  | Counter: true  | Expected: true — Campuran berurutan & bersarang
✅ Test 07: "(())(())"      → Stack: true  | Counter: true  | Expected: true — Dua kelompok bersarang
✅ Test 08: ")("            → Stack: false | Counter: false | Expected: false — Tutup sebelum buka
✅ Test 09: "))(("          → Stack: false | Counter: false | Expected: false — Dua tutup di awal
✅ Test 10: "())("          → Stack: false | Counter: false | Expected: false — Tutup berlebih di tengah
✅ Test 11: "(("            → Stack: false | Counter: false | Expected: false — Dua buka tanpa tutup
✅ Test 12: "((()"          → Stack: false | Counter: false | Expected: false — Tiga buka satu tutup
✅ Test 13: "()(("          → Stack: false | Counter: false | Expected: false — Pasangan pertama ok, sisa tidak
✅ Test 14: ""              → Stack: true  | Counter: true  | Expected: true — String kosong
✅ Test 15: "("             → Stack: false | Counter: false | Expected: false — Satu kurung buka
✅ Test 16: ")"             → Stack: false | Counter: false | Expected: false — Satu kurung tutup
✅ Test 17: "(()"           → Stack: false | Counter: false | Expected: false — Panjang ganjil (3)
✅ Test 18: "())"           → Stack: false | Counter: false | Expected: false — Panjang ganjil (3)

========================================
  📊 Total: 18 passed, 0 failed out of 18
========================================
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 7 — Complexity Analysis](./07-complexity-analysis_analisis-kompleksitas.md)**

---

<div align="center">

**🎉 Selamat! Kamu sudah menyelesaikan seluruh dokumentasi Balanced Parenthesis!**

**📚 [← Kembali ke README](../README.md)**

Made with ❤️ for learners — **Happy Learning! 🚀**

</div>
