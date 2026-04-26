# 📏 Quantifiers — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 📊 [Apa Itu Quantifier?](#apa-itu)
- ⭐ [Quantifier Dasar](#dasar)
- 🔢 [Curly Braces — Jumlah Spesifik](#curly)
- 🐢 [Greedy vs Lazy](#greedy-lazy)
- 🔗 [Navigation](#navigation)

---

<a name="apa-itu"></a>
## 📊 Apa Itu Quantifier?

**Quantifier** menentukan **berapa kali** sebuah karakter atau grup harus muncul dalam string agar dianggap cocok.

```
Tanpa quantifier: /ab/ → harus ada persis "a" lalu "b"
Dengan quantifier: /ab+/ → harus ada "a" lalu satu atau lebih "b"
```

Tabel ringkasan:

| Quantifier | Arti |
|:---:|---|
| `*` | 0 atau lebih |
| `+` | 1 atau lebih |
| `?` | 0 atau 1 (opsional) |
| `{n}` | Tepat n kali |
| `{n,}` | Minimal n kali |
| `{n,m}` | Antara n sampai m kali |

---

<a name="dasar"></a>
## ⭐ Quantifier Dasar

### 1. Asterisk (*) — 0 atau Lebih

Karakter sebelumnya boleh **tidak muncul sama sekali** atau muncul **berapa kali saja**.

```javascript
/ab*c/.test("ac");    // true — 0 huruf 'b'
/ab*c/.test("abc");   // true — 1 huruf 'b'
/ab*c/.test("abbc");  // true — 2 huruf 'b'
/ab*c/.test("abbbc"); // true — 3 huruf 'b'
```

```
Pattern: a b* c
             ↑
             b boleh 0 kali atau lebih

"ac"    → a(0×b)c → ✅
"abc"   → a(1×b)c → ✅
"abbc"  → a(2×b)c → ✅
```

### 2. Plus (+) — 1 atau Lebih

Karakter sebelumnya harus muncul **minimal 1 kali**.

```javascript
/ab+c/.test("ac");    // false — butuh minimal 1 'b'
/ab+c/.test("abc");   // true  — 1 huruf 'b' ✅
/ab+c/.test("abbc");  // true  — 2 huruf 'b' ✅
```

```
Pattern: a b+ c
             ↑
             b WAJIB minimal 1 kali

"ac"  → a(0×b)c → ❌ tidak cocok
"abc" → a(1×b)c → ✅ cocok
```

**Contoh nyata — ambil semua angka:**

```javascript
const str = "Item: 10, total: 2500, diskon: 5";
str.match(/\d+/g);
// Output: ['10', '2500', '5']
// \d+ → satu atau lebih digit (jadi "2500" diambil sebagai satu angka)
```

### 3. Question Mark (?) — 0 atau 1 (Opsional)

Karakter sebelumnya bersifat **opsional** — boleh ada, boleh tidak.

```javascript
/colou?r/.test("color");   // true — tanpa 'u'
/colou?r/.test("colour");  // true — dengan 'u'
/colou?r/.test("colouur"); // false — 2 huruf 'u' (lebih dari 1)
```

**Contoh nyata — URL dengan/tanpa "www":**

```javascript
const regex = /https?:\/\/(www\.)?/;
//       ↑ 's' opsional    ↑ "www." opsional

regex.test("http://example.com");      // true
regex.test("https://example.com");     // true
regex.test("https://www.example.com"); // true
```

---

<a name="curly"></a>
## 🔢 Curly Braces — Jumlah Spesifik

Kurung kurawal `{}` memberikan kontrol yang lebih presisi.

### {n} — Tepat n kali

```javascript
/\d{4}/.test("2024");    // true  — tepat 4 digit
/\d{4}/.test("202");     // false — kurang dari 4

// Validasi tahun
/^\d{4}$/.test("2024"); // true
/^\d{4}$/.test("24");   // false
```

### {n,} — Minimal n kali

```javascript
/\d{3,}/.test("12");    // false — kurang dari 3 digit
/\d{3,}/.test("123");   // true  — tepat 3 digit
/\d{3,}/.test("12345"); // true  — lebih dari 3 digit
```

### {n,m} — Antara n dan m kali

```javascript
/\d{2,4}/.test("1");    // false — kurang dari 2
/\d{2,4}/.test("12");   // true  — 2 digit
/\d{2,4}/.test("123");  // true  — 3 digit
/\d{2,4}/.test("1234"); // true  — 4 digit
/\d{2,4}/.test("12345");// true  — 5 digit (cocok bagian 1234-nya)
```

**Contoh nyata — validasi format nomor telepon:**

```javascript
// Nomor Indonesia: diawali 08, lalu 8-11 digit
const phoneRegex = /^08\d{8,11}$/;

console.log(phoneRegex.test("081234567890")); // true  (12 digit total)
console.log(phoneRegex.test("08123456"));     // false (terlalu pendek)
console.log(phoneRegex.test("081234567890123")); // false (terlalu panjang)
```

**Visualisasi `{n,m}`:**

```
Pattern: /\d{2,4}/

"1"     → 1 digit  → ❌ (kurang dari 2)
"12"    → 2 digit  → ✅ (sesuai minimum)
"1234"  → 4 digit  → ✅ (sesuai maximum)
"12345" → 5 digit  → ✅ tapi hanya cocok "1234" (sisanya tidak termasuk)
```

---

<a name="greedy-lazy"></a>
## 🐢 Greedy vs Lazy

Ini adalah salah satu konsep paling penting — dan paling sering menjadi sumber bug!

### Greedy (Default) — Ambil Sebanyak Mungkin

Secara default, quantifier bersifat **greedy**: mereka akan mencoba mencocokkan karakter **sebanyak mungkin** sebelum menyerah.

```javascript
const html = "<b>teks satu</b> dan <b>teks dua</b>";

// Greedy: mengambil dari <b> pertama sampai </b> TERAKHIR
html.match(/<b>.*<\/b>/);
// Output: '<b>teks satu</b> dan <b>teks dua</b>'  ← terlalu banyak!
```

```
Greedy: /<b>.*<\/b>/

"<b>teks satu</b> dan <b>teks dua</b>"
  ↑                                  ↑
  mulai sini              ambil sampai </b> TERAKHIR
```

### Lazy (Tambahkan `?`) — Ambil Sesedikit Mungkin

Tambahkan `?` setelah quantifier untuk membuatnya **lazy**: ambil karakter **sesedikit mungkin**.

```javascript
const html = "<b>teks satu</b> dan <b>teks dua</b>";

// Lazy: mengambil dari <b> sampai </b> TERDEKAT
html.match(/<b>.*?<\/b>/g);
// Output: ['<b>teks satu</b>', '<b>teks dua</b>']  ← benar! ✅
```

```
Lazy: /<b>.*?<\/b>/

"<b>teks satu</b> dan <b>teks dua</b>"
  ↑             ↑       ↑            ↑
  mulai    berhenti di  mulai    berhenti di
           </b> pertama          </b> pertama
```

### Perbandingan Lengkap

| Quantifier | Greedy | Lazy |
|:---:|:---:|:---:|
| 0 atau lebih | `*` | `*?` |
| 1 atau lebih | `+` | `+?` |
| 0 atau 1 | `?` | `??` |
| n sampai m | `{n,m}` | `{n,m}?` |

**Contoh tambahan:**

```javascript
const str = "<a>foo</a><a>bar</a>";

// Greedy — ambil dari awal sampai </a> terakhir
str.match(/<a>.*<\/a>/)[0];
// Output: '<a>foo</a><a>bar</a>'

// Lazy — ambil sampai </a> terdekat
str.match(/<a>.*?<\/a>/)[0];
// Output: '<a>foo</a>'

// Dengan flag g untuk semua
str.match(/<a>.*?<\/a>/g);
// Output: ['<a>foo</a>', '<a>bar</a>'] ✅
```

> 💡 **Aturan praktis:** Ketika berurusan dengan tag HTML atau tanda kutip yang berpasangan, hampir selalu gunakan **lazy** (`+?` atau `*?`) untuk menghindari over-matching.

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 03 — Karakter & Pola Dasar](./03-karakter-pola-dasar_regex.md)**
- **📖 [Lanjut ke Part 05 — Groups & Lookaround →](./05-groups-lookaround_regex.md)**
