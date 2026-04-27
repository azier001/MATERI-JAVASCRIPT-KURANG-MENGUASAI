# 🔤 cekHanyaHuruf — Validasi Hanya Huruf

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Regex](https://img.shields.io/badge/Konsep-Regex-blue)
![Character Class](https://img.shields.io/badge/Konsep-Character%20Class-green)
![Status](https://img.shields.io/badge/Status-Selesai-brightgreen)

> Fungsi untuk memvalidasi apakah sebuah string **hanya berisi huruf** (a-z dan A-Z), tanpa angka, spasi, atau simbol apapun.

---

## 🔗 Daftar Isi

- 📋 [Deskripsi Soal](#deskripsi-soal)
- 📌 [Aturan Validasi](#aturan-validasi)
- 💡 [Konsep Kunci](#konsep-kunci)
- 🔢 [Final Code](#final-code)
- 🧪 [Test Cases](#test-cases)
- ⚠️ [Pitfalls](#pitfalls)
- 🔑 [Keywords](#keywords)

---

<a name="deskripsi-soal"></a>
## 📋 Deskripsi Soal

Buat fungsi `cekHanyaHuruf(str)` yang mengembalikan `true` jika **seluruh karakter** dalam string adalah huruf alfabet (a-z atau A-Z), dan `false` jika tidak.

String kosong `""` dianggap **tidak valid** (harus ada minimal satu huruf).

---

<a name="aturan-validasi"></a>
## 📌 Aturan Validasi

String dianggap **valid** (hanya huruf) jika memenuhi **semua** syarat berikut:

| # | Syarat | Contoh Gagal |
|---|--------|--------------|
| 1 | Minimal ada **satu karakter** | `""` (string kosong) |
| 2 | Semua karakter adalah **huruf a-z atau A-Z** | `"abc123"` (ada angka) |
| 3 | **Tidak ada spasi** di manapun | `"abc def"` (ada spasi) |
| 4 | **Tidak ada simbol** apapun | `"Hello!"` (ada tanda seru) |

---

<a name="konsep-kunci"></a>
## 💡 Konsep Kunci

### 1. Character Class `[a-zA-Z]` — Memilih Karakter Spesifik

Character Class memungkinkan kita **memilih secara eksklusif** karakter mana yang boleh muncul.

```
[a-zA-Z]
 │   │
 │   └── A-Z → huruf besar dari A sampai Z
 └────── a-z → huruf kecil dari a sampai z
```

> 💡 **Kenapa tidak pakai `\w`?**
> `\w` itu singkatan dari `[a-zA-Z0-9_]` — dia juga membolehkan **angka** dan **underscore**.
> Untuk validasi "hanya huruf", kita harus pakai `[a-zA-Z]` yang lebih eksklusif.

```js
/\w/.test("abc123")      // true  ← angka ikut lolos!
/[a-zA-Z]/.test("123")   // false ← angka ditolak ✅
```

---

### 2. Anchor `^` dan `$` — Mengunci Seluruh String

Tanpa anchor, regex hanya mengecek "apakah **ada** huruf di dalamnya", bukan "apakah **semuanya** huruf".

```
/^[a-zA-Z]+$/
 │          │
 │          └── $  → harus BERAKHIR di sini (tidak ada karakter lain setelahnya)
 └───────────── ^  → harus DIMULAI dari sini (tidak ada karakter lain sebelumnya)
```

```js
// ❌ Tanpa anchor — hanya cek "ada huruf di dalamnya"
/[a-zA-Z]+/.test("abc123")   // true  ← salah! ada angka tapi lolos

// ✅ Dengan anchor — cek seluruh string harus huruf semua
/^[a-zA-Z]+$/.test("abc123") // false ← benar ditolak
```

---

### 3. Quantifier `+` — Satu atau Lebih

Quantifier `+` memastikan karakter yang dibolehkan harus muncul **minimal satu kali**.

```
/^[a-zA-Z]+$/
            │
            └── + → minimal 1 huruf, boleh lebih banyak
```

Tanpa `+`, regex hanya menerima **tepat satu** karakter:

```js
/^[a-zA-Z]$/.test("a")     // true  ← hanya 1 karakter
/^[a-zA-Z]$/.test("abc")   // false ← ditolak karena lebih dari 1!

/^[a-zA-Z]+$/.test("abc")  // true  ← bisa terima banyak huruf ✅
```

---

### 4. Bedah Pola Lengkap

```
/^[a-zA-Z]+$/

  ^           → "Mulai dari karakter pertama..."
  [a-zA-Z]    → "...yang boleh ada HANYA huruf kecil atau besar..."
  +           → "...minimal satu huruf, boleh banyak..."
  $           → "...dan harus langsung berakhir. Tidak boleh ada yang lain."
```

Visualisasi proses pengecekan:

```
Input: "Hello"

  H → [a-zA-Z]? ✅
  e → [a-zA-Z]? ✅
  l → [a-zA-Z]? ✅
  l → [a-zA-Z]? ✅
  o → [a-zA-Z]? ✅
  $ → akhir string? ✅

  RESULT: true ✅
```

```
Input: "abc123"

  a → [a-zA-Z]? ✅
  b → [a-zA-Z]? ✅
  c → [a-zA-Z]? ✅
  1 → [a-zA-Z]? ❌ STOP!

  RESULT: false ❌
```

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

### 1. Pakai `\w` tanpa Quantifier

Percobaan pertama saat sesi belajar — **dua masalah sekaligus:**

```js
// ❌ Percobaan pertama
const regex = /^\w$/;
```



| Masalah | Penjelasan |
|---------|------------|
| `\w` terlalu luas | `\w` = `[a-zA-Z0-9_]` — angka dan underscore ikut lolos |
| Tidak ada `+` | Hanya menerima **tepat 1 karakter** — `"abc"` pun ditolak |

```js
/^\w$/.test("a")      // true  ← kebetulan benar (1 huruf)
/^\w$/.test("abc")    // false ← salah! harusnya true
/^\w$/.test("1")      // true  ← salah! angka ikut lolos
```

---

### 2. Tambah `+` tapi masih pakai `\w`

```js
// ❌ Percobaan kedua — masalah quantifier sudah diperbaiki
const regex = /^\w+$/;
```



| Masalah | Penjelasan |
|---------|------------|
| `\w` masih terlalu luas | Angka dan underscore tetap lolos |

```js
/^\w+$/.test("abc")       // true  ✅
/^\w+$/.test("abc123")    // true  ❌ ← harusnya false!
/^\w+$/.test("halo_dunia") // true  ❌ ← underscore lolos!
```

---

### 3. Solusi yang benar — `[a-zA-Z]`

```js
// ✅ Percobaan ketiga — BENAR!
const regex = /^[a-zA-Z]+$/;
```

Sekarang hanya huruf murni yang bisa lolos:

```js
/^[a-zA-Z]+$/.test("abc")       // true  ✅
/^[a-zA-Z]+$/.test("Hello")     // true  ✅
/^[a-zA-Z]+$/.test("abc123")    // false ✅
/^[a-zA-Z]+$/.test("halo_dunia") // false ✅
```

> 💡 **Pelajaran:** `\w` itu jalan pintas yang "terlalu murah hati".
> Kalau kamu butuh kontrol ketat atas karakter yang dibolehkan,
> selalu gunakan Character Class `[...]` yang eksplisit.

---

### 4. Membolehkan Spasi — Hati-hati "Space Only" Trap

Jika ingin menerima nama seperti `"Budi Santoso"`, tambahkan spasi di dalam Character Class:

```js
const regex = /^[a-z ]+$/i;
```

> ⚠️ **Hati-hati:** Pola ini juga menerima input yang **hanya spasi** (`"   "` → `true`).
> Di dunia nyata, gunakan `.trim()` terlebih dahulu sebelum validasi regex.

---

### 5. Best Practice: `trim()` Sebelum Regex

```
INPUT: "  Aditya  "
  │
  ▼
┌────────────────────────────────┐
│  STEP 1: str.trim()           │  ← Bersihkan spasi di ujung
│                                │
│  "  Aditya  " → "Aditya"     │
└────────────────────────────────┘
  │
  ▼
┌────────────────────────────────┐
│  STEP 2: /^[a-zA-Z]+$/.test() │  ← Validasi isi "bersih"
│                                │
│  "Aditya" → true ✅           │
└────────────────────────────────┘
```

> 💡 **Prinsip:** Pisahkan tanggung jawab — `.trim()` untuk **membersihkan**,
> regex untuk **memvalidasi**. Jangan bebankan semua ke regex.

<a name="final-code"></a>
## 🔢 Final Code

```js
const cekHanyaHuruf = (input) => {
  const regex = /^[a-zA-Z]+$/;

  return regex.test(input);
};
```

**Alternatif** dengan flag `i` (case insensitive):

```js
const cekHanyaHuruf = (input) => {
  const regex = /^[a-z]+$/i;

  return regex.test(input);
};
```

> 💡 Flag `i` membuat regex **mengabaikan perbedaan huruf besar/kecil**,
> sehingga cukup tulis `[a-z]` saja tanpa perlu `A-Z`.

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Fungsi

```js
const cekHanyaHuruf = (input) => {
  const regex = /^[a-zA-Z]+$/;

  return regex.test(input);
};
```

### Console.log

```js
console.log(cekHanyaHuruf("abc"));      // true
console.log(cekHanyaHuruf("Hello"));    // true
console.log(cekHanyaHuruf("abc123"));   // false
console.log(cekHanyaHuruf("abc def"));  // false
console.log(cekHanyaHuruf(""));         // false
```

### Hasil

```
true
true
false
false
false
```

---

---

<a name="keywords"></a>
## 🔑 Keywords

| Keyword | Penjelasan |
|---------|------------|
| `[a-zA-Z]` | Character Class — hanya mencocokkan huruf alfabet |
| `[a-z]` + flag `i` | Alternatif lebih pendek untuk `[a-zA-Z]` |
| `\w` | Shorthand untuk `[a-zA-Z0-9_]` — terlalu luas untuk "hanya huruf" |
| `^` | Anchor regex — cocokkan dari awal string |
| `$` | Anchor regex — cocokkan sampai akhir string |
| `+` | Quantifier — satu atau lebih kemunculan |
| `regex.test()` | Method untuk mengecek apakah string cocok dengan pola regex |
| `.trim()` | Method string untuk menghapus spasi di awal dan akhir |
| Flag `i` | Case insensitive — abaikan perbedaan huruf besar/kecil |
