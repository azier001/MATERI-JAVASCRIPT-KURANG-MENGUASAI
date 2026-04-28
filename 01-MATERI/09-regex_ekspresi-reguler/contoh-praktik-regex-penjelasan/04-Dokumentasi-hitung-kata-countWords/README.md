# 🔢 countWords — Hitung Jumlah & Frekuensi Kata

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Regex](https://img.shields.io/badge/Konsep-Regex-blue)
![Match](https://img.shields.io/badge/Konsep-String.match()-green)
![Reduce](https://img.shields.io/badge/Konsep-Array.reduce()-orange)

> Fungsi untuk **menghitung jumlah kata** dan **frekuensi kemunculan setiap kata** dalam sebuah teks menggunakan Regex.

---

## 🔗 Daftar Isi

- 📋 [Deskripsi Soal](#deskripsi-soal)
- 📌 [Aturan Validasi](#aturan-validasi)
- 💡 [Konsep Kunci](#konsep-kunci)
- ⚠️ [Pitfalls](#pitfalls)
- 🔢 [Final Code](#final-code)
- 🧪 [Test Cases](#test-cases)
- 🔑 [Keywords](#keywords)

---

<a name="deskripsi-soal"></a>
## 📋 Deskripsi Soal

Dalam banyak aplikasi (text editor, SEO tool, chat app), kita perlu menghitung **berapa banyak kata** yang ada di dalam sebuah teks. Fitur ini terlihat sederhana, tapi menyimpan banyak jebakan jika tidak ditangani dengan benar.

Tugasnya:
1. Buat fungsi `countWords(text)` yang mengembalikan **jumlah total kata** (number).
2. Buat fungsi `countWordFrequency(text)` yang mengembalikan **objek frekuensi** setiap kata (object).

---

<a name="aturan-validasi"></a>
## 📌 Aturan Validasi

Hasil dianggap **akurat** jika memenuhi **semua** syarat berikut:

| # | Syarat | Contoh Gagal |
|---|--------|--------------|
| 1 | String kosong `""` menghasilkan **0** | `"".split(" ")` → `[""]` → **1** (salah!) |
| 2 | String hanya spasi `"   "` menghasilkan **0** | `"   ".split(" ")` → `["","","",""]` → **4** (salah!) |
| 3 | Spasi ganda di tengah **tidak menambah** jumlah kata | `"a  b".split(" ")` → `["a","","b"]` → **3** (salah!) |
| 4 | Tanda baca di tengah kata **tidak memecah** kata (untuk `countWords`) | `"don't"` → harus **1 kata**, bukan 2 |

> 💡 **Kenapa string kosong harus 0?**
> Metode `.split()` pada string kosong menghasilkan array berisi satu string kosong `[""]`,
> yang membuat `.length` mengembalikan **1** — padahal tidak ada kata sama sekali.
> Ini alasan utama kita menggunakan `.match()` sebagai gantinya.

---

<a name="konsep-kunci"></a>
## 💡 Konsep Kunci

### 1. `\S+` — Mencocokkan "Apapun yang Bukan Spasi"

`\S` (S kapital) adalah kebalikan dari `\s`. Dia mencocokkan **semua karakter kecuali whitespace** (spasi, tab, newline).

```
/\S+/g
 │ │ │
 │ │ └── g  → flag global, cari semua kemunculan
 │ └──── +  → satu atau lebih karakter berturut-turut
 └────── \S → karakter apapun SELAIN whitespace
```

```js
const text = "  Halo   dunia!  ";
console.log(text.match(/\S+/g));
// ["Halo", "dunia!"] → 2 kata ✅
```

> 💡 **Kenapa `\S+` bukan `\w+`?**
> `\S+` menganggap `"don't"` sebagai **1 kata**, sedangkan `\w+` memecahnya jadi **2** (`["don", "t"]`)
> karena tanda kutip `'` bukan termasuk `\w` (word character).

---

### 2. `\w+` — Mencocokkan "Huruf, Angka, Underscore"

`\w` adalah shorthand untuk `[a-zA-Z0-9_]`. Cocok digunakan ketika kita ingin **membuang tanda baca** dari kata.

```
/\w+/gi
 │ │ ││
 │ │ │└── i  → case insensitive
 │ │ └─── g  → flag global
 │ └───── +  → satu atau lebih
 └─────── \w → [a-zA-Z0-9_]
```

```js
const text = "Belajar Regex itu seru, karena Regex sangat sakti!";
console.log(text.match(/\w+/gi));
// ["Belajar", "Regex", "itu", "seru", "karena", "Regex", "sangat", "sakti"]
// Koma dan tanda seru otomatis terbuang ✅
```

> ⚠️ **Kapan pakai `\w+` vs `\S+`?**
> - **`\S+`** → untuk menghitung **jumlah total kata** (tanda baca boleh menempel).
> - **`\w+`** → untuk menghitung **frekuensi kata** (tanda baca harus dibuang agar `"seru,"` = `"seru"`).

---

### 3. `.match()` + Null Safety — Menghindari Crash

Metode `.match(regex)` mengembalikan **`null`** jika tidak ada kecocokan ditemukan.
Jika langsung akses `.length` pada `null`, aplikasi akan **crash** dengan `TypeError`.

```
INPUT
  │
  ▼
┌────────────────────────────────────┐
│  text.match(/\S+/g)               │
│                                    │
│  Ada kata? → return Array          │
│  Kosong?   → return null ⚠️       │
└────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────┐
│  Null Safety Check                 │
│                                    │
│  matches ? matches.length : 0     │
│  ─────────────────────────────     │
│  Ada array → hitung .length        │
│  null      → kembalikan 0          │
└────────────────────────────────────┘
```

```js
// ❌ CRASH — null tidak punya .length
"".match(/\S+/g).length  // TypeError: Cannot read property 'length' of null

// ✅ AMAN — ternary operator menangani null
const matches = "".match(/\S+/g);
matches ? matches.length : 0;  // 0 ✅
```

---

### 4. `.reduce()` + Akumulasi Objek — Menghitung Frekuensi

Metode `.reduce()` digunakan untuk **mengubah array menjadi satu nilai** — dalam kasus ini, sebuah objek frekuensi.

Visualisasi step-by-step untuk input: `"Kopi itu enak, kopi pahit"`

| Iterasi | Kata | State `counts` (Accumulator) | Aksi |
| :---: | :---: | :--- | :--- |
| Start | — | `{}` | Object kosong |
| 1 | `"kopi"` | `{ kopi: 1 }` | Baru, set 1 |
| 2 | `"itu"` | `{ kopi: 1, itu: 1 }` | Baru, set 1 |
| 3 | `"enak"` | `{ kopi: 1, itu: 1, enak: 1 }` | Baru, set 1 |
| 4 | `"kopi"` | `{ kopi: 2, itu: 1, enak: 1 }` | **Duplikat!** +1 |
| 5 | `"pahit"` | `{ kopi: 2, itu: 1, enak: 1, pahit: 1 }` | Baru, set 1 |

Logic inti:

```js
counts[cleanWord] = (counts[cleanWord] || 0) + 1;
//                   ──────────────────────
//                   Jika undefined → pakai 0
//                   Jika sudah ada → pakai nilainya
//                   Lalu + 1
```

---

### 5. Unicode Property Escapes `\p{L}` — Support Multilingual

Regex `\w` hanya mengenali karakter **ASCII** (`[A-Za-z0-9_]`).
Untuk aplikasi global yang harus mendukung huruf beraksen (Prancis, Spanyol, dll), gunakan `\p{L}` dengan flag `u`.

```
/\p{L}+/gu
 ││││ │ ││
 ││││ │ │└── u → flag unicode (WAJIB untuk \p{})
 ││││ │ └─── g → flag global
 ││││ └───── + → satu atau lebih
 │││└─────── L → Unicode category "Letter" (semua huruf di semua bahasa)
 ││└──────── { → pembuka property
 │└───────── p → property escape
 └────────── \ → escape character
```

```js
const teks = "Hôtel Mañana café";

// ❌ \w+ memecah kata karena karakter beraksen
console.log(teks.match(/\w+/g));
// ["H", "tel", "Ma", "ana", "caf"]

// ✅ \p{L}+ mengenali semua huruf Unicode
console.log(teks.match(/\p{L}+/gu));
// ["Hôtel", "Mañana", "café"]
```

> 💡 **Kapan pakai `\p{L}`?**
> Gunakan saat aplikasi menerima input dari user internasional.
> Di Indonesia, ini jarang dibutuhkan — tapi sangat penting untuk aplikasi skala global.

---

### 6. Performance: `match()` vs `matchAll()` — Efisiensi Memori

Untuk teks pendek, `.match()` sudah cukup. Tapi untuk teks besar (puluhan ribu kata),
`.matchAll()` lebih hemat memori karena bersifat **Lazy (Iterator)**.

```
[.match()]    → Eager (Seketika)
[ TEKS ] → [ ARRAY 100.000 ITEM ] → [ RAM PENUH 😱 ]

[.matchAll()] → Lazy (Satu per Satu)
[ TEKS ] → [ Ambil 1 ] → [ Proses ] → [ Ambil 1 ] → [ RAM AMAN 😎 ]
```

```js
// Versi hemat memori untuk teks sangat besar
const regex = /\S+/g;
let count = 0;

for (const match of teksBesar.matchAll(regex)) {
  count++;
}
// Tidak membuat array besar, hanya menghitung satu per satu
```

> 💡 **Rule of Thumb:**
> - Teks pendek (chat, form input) → pakai `.match()` — simpel dan cukup.
> - Teks besar (buku, log file) → pertimbangkan `.matchAll()` — lebih efisien.

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

### 1. Menggunakan `split(" ")` untuk String dengan Spasi Ganda

Percobaan awal yang umum — **spasi ganda menghasilkan elemen kosong di array:**

```js
// ❌ Salah — split(" ") tidak menangani spasi ganda
"Halo   dunia".split(" ")
// ["Halo", "", "", "dunia"] → .length = 4 (harusnya 2!)

// ✅ Benar — match(\S+) hanya mengambil yang bukan spasi
"Halo   dunia".match(/\S+/g)
// ["Halo", "dunia"] → .length = 2 ✅
```

| Masalah | Penjelasan |
|---------|------------|
| Spasi ganda | `split(" ")` membuat string kosong `""` untuk setiap spasi ekstra |
| Spasi di ujung | `"  Halo  ".split(" ")` → `["", "", "Halo", "", ""]` → 5 elemen |

---

### 2. Menggunakan `split()` pada String Kosong

Percobaan yang sering terlewat — **string kosong tetap menghasilkan 1 elemen:**

```js
// ❌ Salah — string kosong tetap menghasilkan array berisi 1 elemen
"".split(/\s+/)
// [""] → .length = 1 (harusnya 0!)

// ✅ Benar — match() mengembalikan null jika tidak ada kata
"".match(/\S+/g)
// null → ditangani ternary → 0 ✅
```

| Masalah | Penjelasan |
|---------|------------|
| `"".split()` | Selalu menghasilkan `[""]` (array dengan satu string kosong) |
| `"".match()` | Mengembalikan `null` — lebih mudah ditangani dengan ternary |

---

### 3. Lupa Menangani `null` dari `.match()`

Percobaan tanpa null safety — **langsung akses `.length` pada `null`:**

```js
// ❌ Salah — crash saat tidak ada kata ditemukan
function countWords(text) {
  return text.match(/\S+/g).length;
  // TypeError: Cannot read property 'length' of null
}
countWords(""); // 💥 CRASH!

// ✅ Benar — ternary operator menangani null
function countWords(text) {
  const matches = text.match(/\S+/g);
  return matches ? matches.length : 0;
}
countWords(""); // 0 ✅
```

| Masalah | Penjelasan |
|---------|------------|
| `null.length` | JavaScript melempar `TypeError` jika akses property pada `null` |
| Tidak ada fallback | Tanpa pengecekan, fungsi crash pada input kosong atau hanya spasi |

---

### 4. Menggunakan `\S+` untuk Frekuensi Kata (Tanda Baca Menempel)

Percobaan yang tampak benar — **tapi tanda baca membuat kata "berbeda":**

```js
// ❌ Salah — \S+ menyertakan tanda baca sebagai bagian dari kata
"seru, seru!".match(/\S+/g)
// ["seru,", "seru!"] → { "seru,": 1, "seru!": 1 } (harusnya "seru": 2!)

// ✅ Benar — \w+ membuang tanda baca otomatis
"seru, seru!".match(/\w+/g)
// ["seru", "seru"] → { "seru": 2 } ✅
```

| Masalah | Penjelasan |
|---------|------------|
| `"seru,"` ≠ `"seru"` | Koma membuat kata dianggap berbeda |
| Frekuensi tidak akurat | Kata yang sama tapi beda tanda baca dihitung terpisah |

> 💡 **Pelajaran:** Pilihan regex tergantung **konteks penggunaan**.
> - Hitung total kata → `\S+` (tanda baca boleh menempel, yang penting pemisahnya spasi).
> - Hitung frekuensi → `\w+` (tanda baca harus dibuang agar kata bisa dinormalisasi).

---

<a name="final-code"></a>
## 🔢 Final Code

### Fungsi 1: Hitung Jumlah Kata

```js
const countWords = (text) => {
  const matches = text.match(/\S+/g);

  return matches ? matches.length : 0;
};
```

### Fungsi 2: Hitung Frekuensi Kata

```js
const countWordFrequency = (text) => {
  const words = text.match(/\w+/gi) || [];

  return words.reduce((counts, word) => {
    const cleanWord = word.toLowerCase();
    counts[cleanWord] = (counts[cleanWord] || 0) + 1;
    return counts;
  }, {});
};
```

**Alternatif** versi Unicode (multilingual support):

```js
const countWordsUnicode = (text) => {
  const matches = text.match(/\p{L}+/gu);

  return matches ? matches.length : 0;
};
```

> 💡 Versi Unicode menggunakan `\p{L}` (Letter) dengan flag `u` untuk mendukung
> huruf beraksen seperti `ô`, `ñ`, `é` di bahasa asing.
> Gunakan saat aplikasi menerima input multilingual.

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Fungsi

```js
const countWords = (text) => {
  const matches = text.match(/\S+/g);
  return matches ? matches.length : 0;
};

const countWordFrequency = (text) => {
  const words = text.match(/\w+/gi) || [];
  return words.reduce((counts, word) => {
    const cleanWord = word.toLowerCase();
    counts[cleanWord] = (counts[cleanWord] || 0) + 1;
    return counts;
  }, {});
};
```

### Console.log

#### countWords

```js
console.log(countWords("Halo dunia"))
```

```
2
```

---

```js
console.log(countWords("  Aku   suka   JS  "))
```

```
3
```

---

```js
console.log(countWords(""))
```

```
0
```

---

```js
console.log(countWords("     "))
```

```
0
```

---

```js
console.log(countWords("don't stop!"))
```

```
2
```

---

#### countWordFrequency

```js
console.log(countWordFrequency("Belajar Regex itu seru, karena Regex sangat sakti!"))
```

```
{ belajar: 1, regex: 2, itu: 1, seru: 1, karena: 1, sangat: 1, sakti: 1 }
```

---

```js
console.log(countWordFrequency(""))
```

```
{}
```

---

```js
console.log(countWordFrequency("kopi Kopi KOPI"))
```

```
{ kopi: 3 }
```

### Hasil

```
2
3
0
0
2
{ belajar: 1, regex: 2, itu: 1, seru: 1, karena: 1, sangat: 1, sakti: 1 }
{}
{ kopi: 3 }
```

### Test Runner Lengkap

```js
const testCasesCountWords = [
  // Edge Cases
  { input: "", expected: 0, desc: "String kosong" },
  { input: "     ", expected: 0, desc: "Hanya spasi" },
  { input: "\t\n", expected: 0, desc: "Hanya whitespace (tab & newline)" },
  // Kasus Normal
  { input: "Halo dunia", expected: 2, desc: "Dua kata biasa" },
  { input: "  Aku   suka   JS  ", expected: 3, desc: "Spasi ganda di mana-mana" },
  // Kasus Tanda Baca
  { input: "don't stop!", expected: 2, desc: "Tanda baca menempel" },
  { input: "email@domain.com", expected: 1, desc: "Email sebagai satu kata" },
]

const testCasesFrequency = [
  // Edge Cases
  { input: "", expected: {}, desc: "String kosong" },
  // Kasus Duplikat
  { input: "kopi Kopi KOPI", expected: { kopi: 3 }, desc: "Case insensitive" },
  // Kasus Normal
  { input: "a b a", expected: { a: 2, b: 1 }, desc: "Frekuensi sederhana" },
  // Tanda Baca
  { input: "seru, seru!", expected: { seru: 2 }, desc: "Tanda baca dibuang" },
]

function runTests(fn, testCases, fnName) {
  console.log(`\n=== RUNNING TESTS: ${fnName} ===\n`)
  let passCount = 0

  testCases.forEach(({ input, expected, desc }, index) => {
    const result = fn(input)
    const status = JSON.stringify(result) === JSON.stringify(expected) ? '✅ PASS' : '❌ FAIL'
    if (status === '✅ PASS') passCount++
    console.log(`Test #${index + 1}: ${status} - ${desc}`)
    if (status === '❌ FAIL') {
      console.log('  Input   :', JSON.stringify(input))
      console.log('  Expected:', JSON.stringify(expected))
      console.log('  Result  :', JSON.stringify(result))
    }
  })

  console.log(`\nRESULT: ${passCount}/${testCases.length} Passed\n`)
}

runTests(countWords, testCasesCountWords, "countWords")
runTests(countWordFrequency, testCasesFrequency, "countWordFrequency")
```

### Hasil Test Runner

```
=== RUNNING TESTS: countWords ===

Test #1: ✅ PASS - String kosong
Test #2: ✅ PASS - Hanya spasi
Test #3: ✅ PASS - Hanya whitespace (tab & newline)
Test #4: ✅ PASS - Dua kata biasa
Test #5: ✅ PASS - Spasi ganda di mana-mana
Test #6: ✅ PASS - Tanda baca menempel
Test #7: ✅ PASS - Email sebagai satu kata

RESULT: 7/7 Passed

=== RUNNING TESTS: countWordFrequency ===

Test #1: ✅ PASS - String kosong
Test #2: ✅ PASS - Case insensitive
Test #3: ✅ PASS - Frekuensi sederhana
Test #4: ✅ PASS - Tanda baca dibuang

RESULT: 4/4 Passed
```

---

<a name="keywords"></a>
## 🔑 Keywords

| Keyword | Penjelasan |
|---------|------------|
| `\S` | Shorthand character class — mencocokkan karakter apapun **selain whitespace** |
| `\S+` | Satu atau lebih karakter bukan spasi berturut-turut (= satu "kata") |
| `\w` | Shorthand untuk `[a-zA-Z0-9_]` — word character |
| `\w+` | Satu atau lebih word character (mengabaikan tanda baca) |
| `\p{L}` | Unicode Property Escape — mencocokkan **semua huruf** di bahasa apapun |
| `+` | Quantifier — satu atau lebih kemunculan |
| Flag `g` | Global — cari semua kemunculan, bukan hanya yang pertama |
| Flag `i` | Case Insensitive — abaikan perbedaan huruf besar/kecil |
| Flag `u` | Unicode — mengaktifkan dukungan Unicode Property Escapes (`\p{}`) |
| `.match()` | Method string — mengembalikan array hasil cocok atau `null` |
| `.matchAll()` | Method string — mengembalikan iterator (lazy, hemat memori) |
| `.reduce()` | Method array — mengakumulasi array menjadi satu nilai (objek frekuensi) |
| `.toLowerCase()` | Method string — mengubah semua huruf menjadi huruf kecil |
| Ternary `? :` | Operator kondisional — menangani `null` dari `.match()` |
| `\|\| 0` | Short-circuit — fallback ke 0 jika nilai `undefined` |
| `\|\| []` | Short-circuit — fallback ke array kosong jika `match()` mengembalikan `null` |
