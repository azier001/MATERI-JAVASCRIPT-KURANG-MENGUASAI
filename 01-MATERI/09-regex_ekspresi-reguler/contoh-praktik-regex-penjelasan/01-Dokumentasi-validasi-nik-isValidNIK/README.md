# 🪪 isValidNIK — Validasi NIK Indonesia

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Regex](https://img.shields.io/badge/Konsep-Regex-blue)
![typeof](https://img.shields.io/badge/Konsep-typeof-green)
![Status](https://img.shields.io/badge/Status-Selesai-brightgreen)

> Fungsi untuk memvalidasi apakah sebuah input merupakan NIK (Nomor Induk Kependudukan) yang valid.

---

## 🔗 Daftar Isi

- [Deskripsi Soal](#-deskripsi-soal)
- [Aturan Validasi](#-aturan-validasi)
- [Konsep Kunci](#-konsep-kunci)
- [Final Code](#-final-code)
- [Test Cases](#-test-cases)
- [Pitfalls](#-pitfalls)
- [Keywords](#-keywords)

---

## 📋 Deskripsi Soal

NIK adalah nomor identitas unik warga negara Indonesia yang tercetak di KTP. Setiap NIK terdiri dari **tepat 16 digit angka**.

Tugasnya: buat fungsi `isValidNIK(nik)` yang mengembalikan `true` jika NIK valid, dan `false` jika tidak.

---

## 📌 Aturan Validasi

NIK dianggap **valid** jika memenuhi **semua** syarat berikut:

| # | Syarat | Contoh Gagal |
|---|--------|--------------|
| 1 | Bertipe `string` | `3201234567890001` (number) |
| 2 | Panjang tepat **16 karakter** | `"320123456789000"` (15 digit) |
| 3 | Semua karakter adalah **angka 0–9** | `"320123456789000X"` (ada huruf) |

> 💡 **Kenapa harus string?**
> NIK diperlakukan sebagai string karena tidak pernah dihitung (dijumlah, dikali, dll),
> dan bisa saja diawali angka `0` yang akan hilang kalau disimpan sebagai number.
> Sama seperti nomor HP atau nomor rekening bank.

---

## 💡 Konsep Kunci

### 1. `typeof` — Mengecek Tipe Data

`typeof` adalah operator bawaan JavaScript untuk mengecek tipe data sebuah nilai.

```js
typeof "hello"        // 'string'
typeof 123            // 'number'
typeof null           // 'object'
typeof undefined      // 'undefined'
```

Digunakan di sini untuk **menolak input yang bukan string** sebelum masuk ke pengecekan regex.

---

### 2. Regex `/^\d{16}$/` — Mengecek Isi String

Regex ini memastikan string berisi **tepat 16 digit angka, tidak lebih tidak kurang**.

```
/^\d{16}$/
  │ │    │
  │ │    └── $  → harus BERAKHIR di sini (tidak boleh ada karakter setelahnya)
  │ └─────── \d{16} → tepat 16 digit angka (0–9)
  └───────── ^  → harus DIMULAI dari sini (tidak boleh ada karakter sebelumnya)
```

> ⚠️ Tanpa `^` dan `$`, regex hanya mencari "ada 16 digit di dalamnya" —
> bukan "seluruh string adalah 16 digit". Ini menyebabkan string 17 digit pun bisa lolos!

```js
/\d{16}/.test("32012345678900012")   // true  ❌ (harusnya false, 17 digit)
/^\d{16}$/.test("32012345678900012") // false ✅ (benar ditolak)
```

---

### 3. Dua Lapisan Validasi

```
INPUT: nik
  │
  ▼
┌─────────────────────────────────┐
│  LAYER 1: typeof nik !== string │  ← Cek TIPE DATA
│                                 │
│  number → ❌ return false       │
│  null   → ❌ return false       │
│  string → ✅ lanjut...          │
└─────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────┐
│  LAYER 2: /^\d{16}$/            │  ← Cek ISI STRING
│                                 │
│  "abc123..."   → ❌ return false│
│  "3201 2345.." → ❌ return false│
│  "3201...0001" → ✅ return true │
└─────────────────────────────────┘
```

---

## 🔢 Final Code

```js
const isValidNIK = (nik) => {
  if (typeof nik !== 'string') return false

  const regex = /^\d{16}$/

  return regex.test(nik)
}
```

---

## 🧪 Test Cases

```js
const testCases = [
  // Edge Cases
  { input: '',                     expected: false, desc: 'String kosong' },
  { input: null,                   expected: false, desc: 'Input null' },
  { input: 3201234567890001,       expected: false, desc: 'Input bertipe number' },

  // Panjang Tidak Valid
  { input: '320123456789000',      expected: false, desc: '15 digit — kurang 1' },
  { input: '32012345678900012',    expected: false, desc: '17 digit — kelebihan 1' },

  // Karakter Tidak Valid
  { input: '320123456789000X',     expected: false, desc: 'Ada huruf di akhir' },
  { input: '3201 2345 6789 0001',  expected: false, desc: 'Ada spasi di dalam string' },
  { input: '320123456789000!',     expected: false, desc: 'Ada simbol di akhir' },
  { input: '320123.567890001',     expected: false, desc: 'Ada titik di tengah' },

  // Valid
  { input: '3201234567890001',     expected: true,  desc: '16 digit angka semua — valid' },
  { input: '0000000000000000',     expected: true,  desc: '16 digit angka nol — valid' },
]

function runTests(fn) {
  console.log(`\n=== RUNNING TESTS ===\n`)
  let passCount = 0

  testCases.forEach(({ input, expected, desc }, index) => {
    const result = fn(input)
    const status = JSON.stringify(result) === JSON.stringify(expected) ? '✅ PASS' : '❌ FAIL'

    if (status === '✅ PASS') passCount++

    console.log(`Test #${index + 1}: ${status} - ${desc}`)

    if (status === '❌ FAIL') {
      console.log('  Input   :', input)
      console.log('  Expected:', JSON.stringify(expected))
      console.log('  Result  :', JSON.stringify(result))
    }
  })

  console.log(`\nRESULT: ${passCount}/${testCases.length} Passed\n`)
}

runTests(isValidNIK)
```

### Hasil

```
=== RUNNING TESTS ===

Test #1:  ✅ PASS - String kosong
Test #2:  ✅ PASS - Input null
Test #3:  ✅ PASS - Input bertipe number
Test #4:  ✅ PASS - 15 digit — kurang 1
Test #5:  ✅ PASS - 17 digit — kelebihan 1
Test #6:  ✅ PASS - Ada huruf di akhir
Test #7:  ✅ PASS - Ada spasi di dalam string
Test #8:  ✅ PASS - Ada simbol di akhir
Test #9:  ✅ PASS - Ada titik di tengah
Test #10: ✅ PASS - 16 digit angka semua — valid
Test #11: ✅ PASS - 16 digit angka nol — valid

RESULT: 11/11 Passed
```

---

## ⚠️ Pitfalls

### 1. Regex tanpa `^` dan `$`

```js
// ❌ Salah — hanya cek "ada 16 digit di dalamnya"
const regex = /\d{16}/
regex.test("32012345678900012") // true — padahal 17 digit!

// ✅ Benar — cek seluruh string harus tepat 16 digit
const regex = /^\d{16}$/
regex.test("32012345678900012") // false
```

### 2. Tidak cek typeof terlebih dahulu

```js
// ❌ Salah — regex.test() otomatis konversi number ke string
const isValidNIK = (nik) => /^\d{16}$/.test(nik)
isValidNIK(3201234567890001) // true — padahal harusnya false!

// ✅ Benar — tolak dulu yang bukan string
const isValidNIK = (nik) => {
  if (typeof nik !== 'string') return false
  return /^\d{16}$/.test(nik)
}
isValidNIK(3201234567890001) // false ✅
```

### 3. Kebalik kondisi typeof

```js
// ❌ Salah — menolak yang bukan number, padahal NIK harus string
if (typeof nik !== 'number') return false

// ✅ Benar — menolak yang bukan string
if (typeof nik !== 'string') return false
```

---

## 🔑 Keywords

| Keyword | Penjelasan |
|---------|------------|
| `typeof` | Operator untuk mengecek tipe data sebuah nilai |
| `regex.test()` | Method untuk mengecek apakah string cocok dengan pola regex |
| `^` | Anchor regex — cocokkan dari awal string |
| `$` | Anchor regex — cocokkan sampai akhir string |
| `\d` | Shorthand regex untuk digit angka 0–9 |
| `{16}` | Quantifier regex — harus muncul tepat 16 kali |
| Early return | Teknik keluar dari fungsi lebih awal jika kondisi tidak terpenuhi |