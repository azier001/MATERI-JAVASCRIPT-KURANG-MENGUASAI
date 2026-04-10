# 📐 permutations — Semua Kemungkinan Susunan Karakter

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Topik](https://img.shields.io/badge/Topik-Rekursi-blueviolet?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Menengah-orange?style=for-the-badge)

> Dokumentasi pribadi — challenge menghasilkan semua kemungkinan susunan karakter dari sebuah string menggunakan rekursi.

---

## 📋 Daftar Isi

- 📌 [Deskripsi Challenge](#deskripsi-challenge)
- 🧠 [Konsep Rekursi untuk Permutasi](#konsep-rekursi)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti)
- 🧪 [Test Cases](#test-cases)
- 💡 [V1 — For Loop + concat](#v1)
- ⚡ [V2 — flatMap](#v2)
- 🌀 [V3 — Spread + Filter](#v3)
- 📊 [Perbandingan Semua Versi](#perbandingan)
- 🛡️ [Edge Cases](#edge-cases)
- ⚠️ [Pitfalls — Kesalahan yang Pernah Terjadi](#pitfalls)
- 📖 [Keywords](#keywords)
- ❓ [FAQ](#faq)
- 💡 [Insight](#insight)

---

<a name="deskripsi-challenge"></a>
## 📌 Deskripsi Challenge

Buatlah fungsi `permutations` yang menerima sebuah string, lalu mengembalikan array berisi semua kemungkinan susunan karakter dari string tersebut.

### 🔖 Function Signature

```typescript
function permutations(str: string): string[];
```

### 🧪 Contoh Input & Output

| Input | Output |
|---|---|
| `permutations('abc')` | `['abc', 'acb', 'bac', 'bca', 'cab', 'cba']` |
| `permutations('dog')` | `['dog', 'dgo', 'odg', 'ogd', 'gdo', 'god']` |

### 📏 Constraints

- Input hanya mengandung huruf kecil
- Input tidak mengandung karakter duplikat

---

<a name="konsep-rekursi"></a>
## 🧠 Konsep Rekursi untuk Permutasi

Sebelum nulis kode, penting untuk paham dua bagian utama rekursi:

| Bagian | Penjelasan | Contoh di challenge ini |
|---|---|---|
| **Base Case** | Kondisi berhenti — kapan fungsi TIDAK memanggil dirinya lagi | Kalau `str.length === 1` → langsung return `[str]` |
| **Recursive Case** | Langkah yang terus berjalan sambil memanggil dirinya sendiri | Pilih 1 karakter, lalu rekursi sisa karakternya |

### Kenapa rekursi cocok untuk permutasi?

Coba bayangkan string `"abc"`. Kalau kita kelompokkan berdasarkan karakter pertama:

```
Diawali "a" → permutasi dari "bc" → ["bc", "cb"] → tempel "a" → ["abc", "acb"]
Diawali "b" → permutasi dari "ac" → ["ac", "ca"] → tempel "b" → ["bac", "bca"]
Diawali "c" → permutasi dari "ab" → ["ab", "ba"] → tempel "c" → ["cab", "cba"]
```

"Permutasi dari `bc`" adalah **masalah yang sama persis**, tapi lebih kecil. Itulah kenapa rekursi cocok — kita terus memecah masalah menjadi versi yang lebih kecil sampai tinggal 1 karakter.

> 💬 Bayangin rekursi seperti membuka kotak yang di dalamnya ada kotak lagi. Terus dibuka sampai ketemu isi yang tidak bisa dibuka lagi. Nah isi itu adalah base case — karakter tunggal yang langsung dikembalikan.

### 📊 Jumlah Permutasi

Jumlah permutasi dari **n karakter** = **n!** (n faktorial):

```
"ab"   → 2! = 2 × 1 = 2   → ["ab", "ba"]
"abc"  → 3! = 3 × 2 × 1 = 6
"abcd" → 4! = 4 × 3 × 2 × 1 = 24
```

---

<a name="3-pertanyaan-inti"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, jawab 3 pertanyaan ini dulu. Kalau ketiganya sudah terjawab, struktur kodenya akan terbentuk sendiri.

> 💡 Framework ini bisa dipakai ulang untuk challenge rekursi lain — karena setiap fungsi rekursif selalu punya tiga hal: apa yang diproses, apa yang dilakukan, dan kapan berhenti.

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Apa yang diproses? | Setiap karakter dalam string |
| ➡️ Apa yang dilakukan? | Pilih 1 karakter → rekursi sisa karakter → tempel karakter di depan tiap hasil |
| 🛑 Berhenti kapan? | Saat string tinggal 1 karakter (`str.length === 1`) |

---

<a name="test-cases"></a>
## 🧪 Test Cases

```javascript
console.log(permutations('abc'));
// Expected: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```

```javascript
console.log(permutations('dog'));
// Expected: ['dog', 'dgo', 'odg', 'ogd', 'gdo', 'god']
```

```javascript
console.log(permutations('ab'));
// Expected: ['ab', 'ba']
```

```javascript
console.log(permutations('a'));
// Expected: ['a']
```

---

<a name="v1"></a>
## 💡 V1 — For Loop + concat

Versi paling eksplisit dan mudah dibaca. Pakai `for` loop biasa dengan index `i`, kumpulkan semua hasil ke dalam array `result`, lalu gabungkan dengan `.concat()`.

```javascript
const permutations = (str) => {
  // Base case: kalau tinggal 1 karakter, tidak ada yang perlu disusun
  if (str.length === 1) return [str]

  let result = []

  for (let i = 0; i < str.length; i++) {
    // Ambil semua karakter kecuali yang di index i
    const remainingChars = str.slice(0, i) + str.slice(i + 1)

    // Rekursi: cari semua permutasi dari sisa karakter
    const recursiveResult = permutations(remainingChars)

    // Tempel str[i] di depan setiap hasil rekursi
    const mappedResult = recursiveResult.map(perm => str[i] + perm)

    // Kumpulkan ke result
    result = result.concat(mappedResult)
  }

  return result
}
```

### 🔍 Cara kerja `remainingChars`

```
str = "abc", i = 0 → str.slice(0,0) + str.slice(1) = "" + "bc" = "bc"
str = "abc", i = 1 → str.slice(0,1) + str.slice(2) = "a" + "c"  = "ac"
str = "abc", i = 2 → str.slice(0,2) + str.slice(3) = "ab" + ""  = "ab"
```

### 🔍 Visualisasi `permutations("abc")`

```
permutations("abc")
│
├── i=0, str[i]="a"
│     remainingChars = "bc"
│     recursiveResult = permutations("bc") → ["bc", "cb"]
│     mappedResult = ["a"+"bc", "a"+"cb"] = ["abc", "acb"]
│     result = ["abc", "acb"]
│
├── i=1, str[i]="b"
│     remainingChars = "ac"
│     recursiveResult = permutations("ac") → ["ac", "ca"]
│     mappedResult = ["b"+"ac", "b"+"ca"] = ["bac", "bca"]
│     result = ["abc", "acb", "bac", "bca"]
│
└── i=2, str[i]="c"
      remainingChars = "ab"
      recursiveResult = permutations("ab") → ["ab", "ba"]
      mappedResult = ["c"+"ab", "c"+"ba"] = ["cab", "cba"]
      result = ["abc", "acb", "bac", "bca", "cab", "cba"]
```

### 🔍 Tapi... `permutations("bc")` hasilnya darimana?

```
permutations("bc")
│
├── i=0, str[i]="b"
│     remainingChars = "c"
│     recursiveResult = permutations("c") → ["c"]  ← BASE CASE!
│     mappedResult = ["b"+"c"] = ["bc"]
│
└── i=1, str[i]="c"
      remainingChars = "b"
      recursiveResult = permutations("b") → ["b"]  ← BASE CASE!
      mappedResult = ["c"+"b"] = ["cb"]

return ["bc", "cb"]
```

### 📉 Fase Descent (Turun) & Ascent (Naik)

```
DESCENT — masuk ke lapisan lebih dalam:
permutations("abc") → menemukan "bc", "ac", "ab"
  permutations("bc") → menemukan "c", "b"
    permutations("c") → BERHENTI (base case)
    permutations("b") → BERHENTI (base case)

ASCENT — kembali sambil membawa hasil:
    return ["c"], return ["b"]
  ["bc", "cb"] → return ["bc", "cb"]
["abc", "acb", "bac", "bca", "cab", "cba"] → return hasil akhir
```

### 🌳 Pohon Rekursi

```
permutations("abc")
├── "a" + permutations("bc")
│     ├── "b" + permutations("c") → ["c"] → "bc"
│     └── "c" + permutations("b") → ["b"] → "cb"
│     → ["bc","cb"] → ["abc","acb"]
│
├── "b" + permutations("ac")
│     ├── "a" + permutations("c") → ["c"] → "ac"
│     └── "c" + permutations("a") → ["a"] → "ca"
│     → ["ac","ca"] → ["bac","bca"]
│
└── "c" + permutations("ab")
      ├── "a" + permutations("b") → ["b"] → "ab"
      └── "b" + permutations("a") → ["a"] → "ba"
      → ["ab","ba"] → ["cab","cba"]

Final: ["abc","acb","bac","bca","cab","cba"] ✅
```

---

<a name="v2"></a>
## ⚡ V2 — flatMap

Versi lebih ringkas. `flatMap` menggantikan kombinasi `for` loop + `result = []` + `.concat()` sekaligus dalam satu method.

```javascript
const permutations = (str) => {
  if (str.length === 1) return [str]

  return str.split('').flatMap((char, i) => {
    const remainingChars = str.slice(0, i) + str.slice(i + 1)
    return permutations(remainingChars).map(perm => char + perm)
  })
}
```

### 🔍 Kenapa `flatMap` bukan `map`?

Kalau pakai `.map()` biasa, hasilnya adalah **array of arrays**:

```javascript
// Kalau pakai .map():
[
  ["abc", "acb"],   // hasil untuk "a"
  ["bac", "bca"],   // hasil untuk "b"
  ["cab", "cba"]    // hasil untuk "c"
]
```

`flatMap` melakukan **map + flat** sekaligus, jadi hasilnya langsung rata:

```javascript
// Kalau pakai .flatMap():
["abc", "acb", "bac", "bca", "cab", "cba"]  ✅
```

### 🔍 Perbandingan V1 vs V2

```
V1 (for loop)                       V2 (flatMap)
──────────────────────────────────  ──────────────────────────────────
let result = []                     (tidak perlu)
for (let i = 0; i < ...; i++) {     str.split('').flatMap((char, i) => {
  const remainingChars = ...          const remainingChars = ...
  const recursiveResult = ...         return permutations(remainingChars)
  const mappedResult = ...                   .map(perm => char + perm)
  result = result.concat(...)       })
}
return result                       (langsung di-return)
```

---

<a name="v3"></a>
## 🌀 V3 — Spread + Filter

Struktur sama persis dengan V2, tapi cara mengambil `remainingChars` berbeda — pakai `filter` alih-alih `slice`.

```javascript
const permutations = (str) => {
  if (str.length === 1) return [str]

  return [...str].flatMap((char, i) => {
    const remainingChars = [...str].filter((_, j) => j !== i).join('')
    return permutations(remainingChars).map(perm => char + perm)
  })
}
```

### 🔍 Perbedaan dari V2

**1. `str.split('')` vs `[...str]`**

```javascript
"abc".split('')  // → ["a", "b", "c"]
[..."abc"]       // → ["a", "b", "c"]
```

Hasilnya identik — hanya beda gaya penulisan. `[...str]` menggunakan spread operator untuk menyebar karakter ke dalam array.

**2. `slice` vs `filter` untuk ambil sisa karakter**

```javascript
// V2 — potong kiri + potong kanan, gabungkan
str.slice(0, i) + str.slice(i + 1)

// V3 — ubah ke array, buang index i, gabungkan kembali
[...str].filter((_, j) => j !== i).join('')
```

Visualisasi untuk `str = "abc"`, `i = 1` (char `"b"`):

```
V2:
str.slice(0, 1) + str.slice(2) = "a" + "c" = "ac"

V3:
[..."abc"] → ["a", "b", "c"]
.filter((_, j) => j !== 1) → ["a", "c"]
.join('') → "ac"
```

### 🔍 Perbandingan Ketiga Versi

| | V1 | V2 | V3 |
|---|---|---|---|
| **Loop** | `for` biasa | `flatMap` | `flatMap` |
| **Split string** | tidak perlu | `split('')` | `[...str]` |
| **Ambil sisa karakter** | `slice + slice` | `slice + slice` | `filter + join` |
| **Kumpulkan result** | `result.concat()` | otomatis `flatMap` | otomatis `flatMap` |
| **Butuh `result = []`** | ✅ ya | ❌ tidak | ❌ tidak |
| **Keterbacaan** | ✅✅ Paling eksplisit | ✅ Ringkas | ✅ Functional |

---

<a name="perbandingan"></a>
## 📊 Perbandingan Semua Versi

```javascript
// V1 — For Loop + concat
const permutations = (str) => {
  if (str.length === 1) return [str]
  let result = []
  for (let i = 0; i < str.length; i++) {
    const remainingChars = str.slice(0, i) + str.slice(i + 1)
    const recursiveResult = permutations(remainingChars)
    const mappedResult = recursiveResult.map(perm => str[i] + perm)
    result = result.concat(mappedResult)
  }
  return result
}

// V2 — flatMap
const permutations = (str) => {
  if (str.length === 1) return [str]
  return str.split('').flatMap((char, i) => {
    const remainingChars = str.slice(0, i) + str.slice(i + 1)
    return permutations(remainingChars).map(perm => char + perm)
  })
}

// V3 — Spread + Filter
const permutations = (str) => {
  if (str.length === 1) return [str]
  return [...str].flatMap((char, i) => {
    const remainingChars = [...str].filter((_, j) => j !== i).join('')
    return permutations(remainingChars).map(perm => char + perm)
  })
}
```

---

<a name="edge-cases"></a>
## 🛡️ Edge Cases

### 1. String 1 karakter

```javascript
permutations('a');
// → ['a'] ✅ — langsung kena base case
```

### 2. String 2 karakter

```javascript
permutations('ab');
// → ['ab', 'ba'] ✅ — rekursi 1 level saja
```

### 3. String 3 karakter

```javascript
permutations('abc');
// → ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'] ✅ — 3! = 6 hasil
```

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls — Kesalahan yang Pernah Terjadi

Ini catatan kesalahan nyata yang terjadi selama mengerjakan challenge ini.

---

### 1. Base case return string, bukan array

❌ **Salah** — return string biasa tidak bisa di-`.map()` atau di-`.concat()` dengan benar:
```javascript
if (str.length === 1) return str
```

✅ **Benar** — harus dibungkus dalam array:
```javascript
if (str.length === 1) return [str]
```

---

### 2. `remainingChars` dihitung dari panjang, bukan karakter

❌ **Salah** — `str.length - 1` adalah angka, bukan string sisa karakter:
```javascript
const remainingChars = str.length - 1
```

✅ **Benar** — potong karakter di index `i` menggunakan `slice`:
```javascript
const remainingChars = str.slice(0, i) + str.slice(i + 1)
```

---

### 3. `slice(1)` saja tidak cukup untuk semua index

❌ **Salah** — `slice(1)` hanya benar untuk `i = 0`, tidak untuk index lain:
```javascript
const remainingChars = str.slice(1)
// i=1, str="abc" → "bc" ← harusnya "ac"!
```

✅ **Benar** — potong kiri dan kanan dari index `i`:
```javascript
const remainingChars = str.slice(0, i) + str.slice(i + 1)
```

---

### 4. `slice(char)` — `slice` butuh angka, bukan karakter

❌ **Salah** — `slice` butuh index berupa angka, bukan karakter string:
```javascript
const remainingChars = str.slice(char) + str.slice(char)
// slice("b") → tidak bekerja seperti yang diharapkan
```

✅ **Benar** — gunakan index `i` yang berupa angka:
```javascript
const remainingChars = str.slice(0, i) + str.slice(i + 1)
```

---

### 5. Kedua argument `slice` sama

❌ **Salah** — `slice(char) + slice(char)` menggunakan argument yang sama, hasilnya duplikat bukan sisa karakter:
```javascript
const remainingChars = str.slice(char) + str.slice(char)
// "abc".slice("b") + "abc".slice("b") → duplikat!
```

✅ **Benar** — argument pertama untuk bagian kiri, kedua untuk bagian kanan:
```javascript
const remainingChars = str.slice(0, i) + str.slice(i + 1)
```

---

### 6. Pakai `for...of` tapi tetap pakai variable `i`

❌ **Salah** — `i` tidak terdefinisi di dalam `for...of`:
```javascript
for (const char of str) {
  const remainingChars = str.slice(0, i) + str.slice(i + 1)
  // ReferenceError: i is not defined
}
```

✅ **Benar** — pilih salah satu: pakai `for` biasa dengan `i`, atau gunakan `indexOf` kalau tetap mau `for...of`:
```javascript
// Opsi 1
for (let i = 0; i < str.length; i++) { ... }

// Opsi 2
for (const char of str) {
  const i = str.indexOf(char)
  ...
}
```

---

### 7. Menggabungkan array dengan operator `+`

❌ **Salah** — operator `+` pada array menghasilkan string yang aneh, bukan array gabungan:
```javascript
result = result + mappedResult
// ["abc"] + ["bac"] → "abc,bac" ← jadi string!
```

✅ **Benar** — gunakan `.concat()` untuk menggabungkan dua array:
```javascript
result = result.concat(mappedResult)
```

---

<a name="keywords"></a>
## 📖 Keywords

| Istilah | Penjelasan |
|---|---|
| **Rekursi** | Teknik di mana fungsi memanggil dirinya sendiri |
| **Base Case** | Kondisi berhenti rekursi agar tidak looping selamanya |
| **Recursive Case** | Bagian fungsi yang memanggil dirinya sendiri dengan input lebih kecil |
| **Permutasi** | Semua kemungkinan susunan karakter dari sebuah string |
| **Faktorial (n!)** | Cara menghitung jumlah permutasi: `n × (n-1) × ... × 1` |
| **`slice()`** | Method string untuk mengambil bagian tertentu berdasarkan index |
| **`concat()`** | Method array untuk menggabungkan dua array atau lebih menjadi satu |
| **`map()`** | Method array untuk mentransformasi setiap elemen menjadi nilai baru |
| **`flatMap()`** | Method array seperti `map()` tapi hasilnya langsung diratakan (flat) |
| **`split('')`** | Method string untuk memecah string menjadi array karakter |
| **Spread Operator (`...`)** | Sintaks untuk menyebarkan elemen iterable ke dalam array |
| **`filter()`** | Method array untuk menyaring elemen berdasarkan kondisi tertentu |
| **`join('')`** | Method array untuk menggabungkan elemen array menjadi string |
| **Descent** | Fase rekursi turun — fungsi terus memanggil dirinya ke lapisan lebih dalam |
| **Ascent** | Fase rekursi naik — fungsi mulai mengembalikan nilai dari lapisan terdalam ke luar |
| **Call Stack** | Tumpukan pemanggilan fungsi — setiap rekursi menambah satu lapisan |

---

<a name="faq"></a>
## ❓ FAQ

<details>
<summary>❓ Kenapa base case return <code>[str]</code> bukan <code>str</code>?</summary>

Karena hasil rekursi akan diproses dengan `.map()` dan `.concat()` — keduanya butuh array. Kalau base case return string biasa, `.map(perm => char + perm)` tidak akan bekerja seperti yang diharapkan karena `perm` akan menjadi karakter satu per satu, bukan satu string utuh.

```javascript
// Kalau return str (string):
permutations("c") → "c"
["c"].map(perm => "b" + perm)  // ini tidak terjadi!
"c".map(...)                   // Error: map is not a function

// Kalau return [str] (array):
permutations("c") → ["c"]
["c"].map(perm => "b" + perm) → ["bc"]  ✅
```

</details>

<details>
<summary>❓ Kenapa <code>slice</code> butuh index angka, bukan karakter?</summary>

`slice` adalah method string/array yang bekerja berdasarkan **posisi (index)**, bukan nilai karakter. Kalau kita kasih karakter seperti `"b"`, JavaScript akan mencoba mengkonversi ke angka — hasilnya `NaN`, dan `slice(NaN)` diperlakukan seperti `slice(0)` yang tidak memotong apapun.

```javascript
"abc".slice("b")   // → "abc" (NaN dianggap 0)
"abc".slice(1)     // → "bc"  ✅
```

Makanya kita butuh `indexOf` atau index `i` dari loop untuk mendapatkan posisi angkanya.

</details>

<details>
<summary>❓ Kenapa <code>result + mappedResult</code> tidak bisa menggabungkan array?</summary>

Operator `+` pada array tidak menggabungkan seperti yang kita harapkan — JavaScript malah mengkonversi keduanya ke string dulu baru digabungkan.

```javascript
["abc", "acb"] + ["bac", "bca"]
// → "abc,acbbac,bca"  ← jadi string!

["abc", "acb"].concat(["bac", "bca"])
// → ["abc", "acb", "bac", "bca"]  ✅
```

Untuk menggabungkan array, gunakan `.concat()` atau spread operator: `[...arr1, ...arr2]`.

</details>

<details>
<summary>❓ Kenapa <code>flatMap</code> lebih ringkas dari <code>for</code> loop + <code>concat</code>?</summary>

`flatMap` menggabungkan tiga langkah sekaligus yang di V1 harus dilakukan secara terpisah:

```
V1 butuh:
1. let result = []          → tempat menampung hasil
2. result.concat(...)       → menggabungkan tiap iterasi
3. return result            → mengembalikan hasil akhir

V2 dengan flatMap:
1. flatMap otomatis menampung, menggabungkan, dan meratakan hasilnya
2. Langsung di-return
```

Intinya: `flatMap` = `map` + `flat` dalam satu langkah. Cocok dipakai saat tiap iterasi menghasilkan array dan kita ingin semua hasilnya digabung jadi satu array rata.

</details>

<details>
<summary>❓ Apa bedanya <code>split('')</code> dan <code>[...str]</code>?</summary>

Keduanya menghasilkan hal yang sama — array karakter dari string:

```javascript
"abc".split('')  // → ["a", "b", "c"]
[..."abc"]       // → ["a", "b", "c"]
```

Perbedaannya hanya gaya penulisan:
- `split('')` → cara klasik, lebih eksplisit
- `[...str]` → cara modern pakai spread operator, lebih ringkas

Untuk string yang hanya berisi karakter ASCII (seperti huruf biasa), keduanya identik. Perbedaan baru muncul kalau ada emoji atau karakter Unicode khusus — tapi untuk challenge ini tidak relevan.

</details>

<details>
<summary>❓ Kenapa <code>filter</code> bisa menggantikan <code>slice</code> untuk ambil sisa karakter?</summary>

Keduanya menghasilkan `remainingChars` yang sama, tapi pendekatannya berbeda:

```javascript
// slice — bekerja di level string, potong kiri + kanan
str.slice(0, i) + str.slice(i + 1)

// filter — bekerja di level array, buang elemen di index i
[...str].filter((_, j) => j !== i).join('')
```

`filter((_, j) => j !== i)` artinya: "ambil semua elemen kecuali yang index-nya sama dengan `i`". Parameter `_` adalah nilai elemen (diabaikan), `j` adalah index-nya.

```
str = "abc", i = 1
[..."abc"] → ["a", "b", "c"]
filter: j=0 (0!==1 ✅), j=1 (1!==1 ❌ buang), j=2 (2!==1 ✅)
→ ["a", "c"]
.join('') → "ac"  ✅
```

</details>

---

<a name="insight"></a>
## 💡 Insight

> Challenge `permutations` mengajarkan pola rekursi yang sangat elegan: **pilih satu, rekursi sisanya**. Pola ini akan muncul lagi di banyak problem lain — kombinasi, subset, backtracking. Kalau sudah paham pola ini, banyak problem yang kelihatan rumit sebenarnya cuma variasi dari ide yang sama.

> Ketiga versi solusi di atas melakukan hal yang identik — yang berbeda hanya cara mengekspresikannya. V1 paling mudah di-trace satu per satu, V2 lebih idiomatik di JavaScript modern, V3 paling "functional". Tidak ada yang lebih benar — pilih yang paling mudah dibaca untuk dirimu sendiri.

> Kesalahan terbanyak terjadi di bagian `remainingChars` — wajar, karena di situlah "inti" dari algoritma ini. Kita harus memotong tepat satu karakter dari posisi yang tepat. Begitu bagian ini benar, sisanya mengikuti sendiri.
