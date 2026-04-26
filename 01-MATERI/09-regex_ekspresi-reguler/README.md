# 🔍 REGEX — Regular Expression dalam JavaScript

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Pemula-4CAF50?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

> 📖 Dokumentasi pribadi untuk mempelajari Regular Expression di JavaScript — mulai dari dasar sampai penggunaan nyata.

---

## 📂 Struktur Dokumentasi

Dokumentasi ini dibagi menjadi **9 bagian** untuk memudahkan navigasi per sub-materi:

```
09-regex_ekspresi-reguler/
│
├── README.md                          ← Kamu di sini
├── ringkasan-konsep_regex.md          ← Cheat sheet cepat
│
└── docs/
    ├── 01-pengantar-konsep_regex.md   ← Apa itu REGEX & kenapa penting
    ├── 02-cara-membuat_regex.md       ← Literal vs Constructor
    ├── 03-karakter-pola-dasar_regex.md← Metacharacters, classes, anchors
    ├── 04-quantifiers_regex.md        ← *, +, ?, {n,m}, greedy vs lazy
    ├── 05-groups-lookaround_regex.md  ← Groups, named, backreference, lookahead
    ├── 06-flags_regex.md              ← g, i, m, s, u, d + gotcha flag g
    ├── 07-method-javascript_regex.md  ← test, match, matchAll, replace, dll
    ├── 08-contoh-praktis_regex.md     ← Email, telepon, password, URL, dll
    └── 09-kesalahan-tips_regex.md     ← Kesalahan umum & best practice
```

---

## 🗺️ Panduan Belajar

### Jalur Cepat (30 menit)
Baca **cheat sheet** dan langsung coba contoh:
1. [📋 Ringkasan Konsep](./ringkasan-konsep_regex.md)
2. [💡 Contoh Praktis](./docs/08-contoh-praktis_regex.md)

### Jalur Lengkap (Disarankan)
Baca semua part secara berurutan:

| Part | File | Topik |
|:---:|---|---|
| 01 | [Pengantar Konsep](./docs/01-pengantar-konsep_regex.md) | Apa itu REGEX, kenapa penting, analogi |
| 02 | [Cara Membuat REGEX](./docs/02-cara-membuat_regex.md) | Literal vs Constructor |
| 03 | [Karakter & Pola Dasar](./docs/03-karakter-pola-dasar_regex.md) | Metacharacters, classes, anchors |
| 04 | [Quantifiers](./docs/04-quantifiers_regex.md) | *, +, ?, {n,m}, greedy vs lazy |
| 05 | [Groups & Lookaround](./docs/05-groups-lookaround_regex.md) | Capturing, named, backreference, lookahead |
| 06 | [Flags](./docs/06-flags_regex.md) | g, i, m, s, u, d + gotcha flag g |
| 07 | [Method JavaScript](./docs/07-method-javascript_regex.md) | test, match, replace, split, exec |
| 08 | [Contoh Praktis](./docs/08-contoh-praktis_regex.md) | Email, telepon, password, URL, rupiah |
| 09 | [Kesalahan & Tips](./docs/09-kesalahan-tips_regex.md) | Bug umum, best practice, tools |

---

## ⚡ Quick Reference

```javascript
// Dua cara membuat REGEX
const r1 = /hello/gi;                   // literal (direkomendasikan)
const r2 = new RegExp('hello', 'gi');   // constructor (untuk pattern dinamis)

// Method yang paling sering dipakai
regex.test(str)      // → true/false
str.match(regex)     // → array atau null
str.replace(regex, replacement)  // → string baru
str.split(regex)     // → array string

// Shorthand paling berguna
\d  // digit [0-9]
\w  // word char [a-zA-Z0-9_]
\s  // whitespace

// Quantifier paling berguna
+   // 1 atau lebih
*   // 0 atau lebih
?   // 0 atau 1 (opsional)
+?  // lazy: 1 atau lebih, ambil sesedikit mungkin
```

---

## 🔗 Referensi Eksternal

- [MDN — Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [MDN — RegExp Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [javascript.info — Regular Expressions](https://javascript.info/regular-expressions)
- [Regex101](https://regex101.com/) — Tool testing REGEX online (pilih JavaScript V8)
- [RegExr](https://regexr.com/) — Alternatif dengan penjelasan hover
