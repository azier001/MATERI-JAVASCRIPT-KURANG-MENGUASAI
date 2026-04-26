# 🔧 Cara Membuat REGEX — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- ✍️ [Dua Cara Membuat REGEX](#dua-cara)
- 📌 [Literal Notation](#literal)
- 🏗️ [Constructor RegExp](#constructor)
- ⚖️ [Perbandingan & Kapan Pakai Yang Mana](#perbandingan)
- 🔗 [Navigation](#navigation)

---

<a name="dua-cara"></a>
## ✍️ Dua Cara Membuat REGEX

Di JavaScript, ada **2 cara** untuk membuat REGEX. Keduanya menghasilkan objek `RegExp` yang sama, tapi punya kegunaan yang berbeda.

```
┌─────────────────────────────────────────────────┐
│            Dua Cara Membuat REGEX               │
├────────────────────┬────────────────────────────┤
│  1. Literal        │  2. Constructor             │
│  /pattern/flags    │  new RegExp('pattern','f')  │
│                    │                             │
│  ✅ Direkomendasikan│  ✅ Untuk pattern dinamis  │
│  ✅ Lebih ringkas   │  ✅ Pattern dari variable   │
│  ✅ Performa lebih  │  ⚠️ Perlu double escape    │
│     baik           │                             │
└────────────────────┴────────────────────────────┘
```

---

<a name="literal"></a>
## 📌 Literal Notation (Direkomendasikan)

Cara paling umum dan direkomendasikan. Pola ditulis langsung di antara dua garis miring `/`.

**Sintaks:**
```javascript
const regex = /pattern/;
const regexWithFlags = /pattern/flags;
```

**Contoh:**
```javascript
// Mencari kata "hello"
const regex1 = /hello/;

// Mencari "hello" tanpa peduli huruf besar/kecil (flag i)
const regex2 = /hello/i;

// Mencari semua angka (flag g = global)
const regex3 = /\d+/g;

// Gabungan beberapa flags
const regex4 = /hello/gi;

console.log(regex1); // Output: /hello/
console.log(regex2); // Output: /hello/i
console.log(regex3); // Output: /\d+/g
```

**Cara kerjanya:**

```
   /  hello  /  i
   ↑         ↑  ↑
  Buka     Tutup Flag
  delimiter delimiter (case insensitive)
```

> ✅ **Kapan pakai Literal?** Ketika pattern-nya sudah pasti dan tidak berubah-ubah.

---

<a name="constructor"></a>
## 🏗️ Constructor RegExp

Cara kedua menggunakan `new RegExp()`. Pattern ditulis sebagai **string**.

**Sintaks:**
```javascript
const regex = new RegExp('pattern');
const regexWithFlags = new RegExp('pattern', 'flags');
```

**Contoh:**
```javascript
// Pattern tetap — sama dengan literal
const regex1 = new RegExp('hello');
const regex2 = new RegExp('hello', 'i');

// ✨ Keunggulan utama: pattern DINAMIS dari variable!
const userInput = 'JavaScript';
const dynamicRegex = new RegExp(userInput, 'i');

const text = "Saya belajar javascript";
console.log(dynamicRegex.test(text)); // true
```

**⚠️ Perhatian: Double Escape**

Karena pattern adalah string, karakter escape seperti `\d` harus ditulis `\\d`:

```javascript
// Literal — tulis satu backslash
const literalRegex = /\d+/;

// Constructor — tulis DUA backslash (karena string butuh escape)
const constructorRegex = new RegExp('\\d+');

// Keduanya menghasilkan regex yang SAMA
const str = "Umur: 25";
console.log(literalRegex.test(str));     // true
console.log(constructorRegex.test(str)); // true
```

**Visualisasi double escape:**

```
Literal:     /\d+/      → \d berarti "digit"
Constructor: '\\d+'     → \\ berarti satu backslash \
                           jadi \\d → \d → digit ✅

❌ Salah:    '\d+'      → \d dalam string biasa
                          tidak punya arti khusus
```

> ✅ **Kapan pakai Constructor?** Ketika pattern dibuat secara dinamis dari input user, variable, atau operasi string.

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan & Kapan Pakai Yang Mana

| Aspek | Literal `/pattern/` | Constructor `new RegExp()` |
|---|---|---|
| **Sintaks** | Ringkas, mudah dibaca | Lebih panjang |
| **Performa** | Sedikit lebih cepat (di-parse saat compile) | Sedikit lebih lambat (di-parse saat runtime) |
| **Pattern Dinamis** | ❌ Tidak bisa | ✅ Bisa dari variable |
| **Escape Character** | `\d` | `\\d` |
| **Rekomendasi** | Untuk kebanyakan kasus | Untuk pattern dinamis |

**Contoh kasus nyata untuk Constructor:**

```javascript
// Fitur "Search" di aplikasi — pattern dari input user
function searchInText(text, keyword) {
  const regex = new RegExp(keyword, 'gi'); // pattern dari input!
  return text.match(regex) || [];
}

const article = "Belajar JavaScript itu menyenangkan. JavaScript sangat berguna.";

console.log(searchInText(article, 'javascript'));
// Output: ['JavaScript', 'JavaScript']

console.log(searchInText(article, 'belajar'));
// Output: ['Belajar']
```

**Catatan penting:** Jika keyword berasal dari user input dan mengandung karakter spesial REGEX (seperti `.`, `*`, `?`), kamu perlu **escape** terlebih dahulu:

```javascript
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function safeSearch(text, keyword) {
  const safeKeyword = escapeRegex(keyword); // escape dulu!
  const regex = new RegExp(safeKeyword, 'gi');
  return text.match(regex) || [];
}

// Contoh: user mengetik "3.14" (titik adalah metacharacter)
console.log(safeSearch("Pi adalah 3.14 bukan 3x14", "3.14"));
// Output: ['3.14']  ← hanya yang benar-benar "3.14"
```

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 01 — Pengantar Konsep](./01-pengantar-konsep_regex.md)**
- **📖 [Lanjut ke Part 03 — Karakter & Pola Dasar →](./03-karakter-pola-dasar_regex.md)**
