# 📋 Ringkasan Konsep — Regular Expression (REGEX)

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Cheat%20Sheet-purple?style=for-the-badge)

> Cheat sheet ringkas untuk referensi cepat. Untuk penjelasan mendalam, buka file docs/.

---

## ✍️ Cara Membuat REGEX

```javascript
const literal      = /pattern/flags;          // Direkomendasikan
const constructor  = new RegExp('pattern', 'flags'); // Untuk pattern dinamis
```

---

## 🎭 Metacharacters

| Simbol | Arti | Contoh |
|:---:|---|---|
| `.` | Karakter apapun kecuali newline | `/c.t/` → "cat", "cot" |
| `^` | Awal string | `/^Hello/` |
| `$` | Akhir string | `/world$/` |
| `\` | Escape (jadikan literal) | `/3\.14/` |
| `\|` | ATAU | `/cat\|dog/` |

---

## 🗂️ Character Classes

| Pattern | Arti |
|:---:|---|
| `[abc]` | a, b, atau c |
| `[a-z]` | Huruf kecil a–z |
| `[A-Z]` | Huruf besar A–Z |
| `[0-9]` | Angka 0–9 |
| `[^abc]` | Bukan a, b, atau c |
| `\d` | Digit → `[0-9]` |
| `\D` | Bukan digit → `[^0-9]` |
| `\w` | Word char → `[a-zA-Z0-9_]` |
| `\W` | Bukan word char |
| `\s` | Whitespace |
| `\S` | Bukan whitespace |

---

## 📏 Quantifiers

| Simbol | Arti | Lazy (tambah `?`) |
|:---:|---|:---:|
| `*` | 0 atau lebih | `*?` |
| `+` | 1 atau lebih | `+?` |
| `?` | 0 atau 1 | `??` |
| `{n}` | Tepat n kali | — |
| `{n,}` | Minimal n kali | `{n,}?` |
| `{n,m}` | n sampai m kali | `{n,m}?` |

---

## ⚓ Anchors

| Simbol | Arti |
|:---:|---|
| `^` | Awal string / baris (dengan flag m) |
| `$` | Akhir string / baris |
| `\b` | Word boundary (batas kata) |
| `\B` | Bukan word boundary |

---

## 👥 Groups

| Syntax | Nama | Simpan? |
|---|---|:---:|
| `(abc)` | Capturing group | ✅ Ya |
| `(?:abc)` | Non-capturing group | ❌ Tidak |
| `(?<name>abc)` | Named capturing group | ✅ Ya (dengan nama) |
| `\1`, `\2` | Backreference ke group | — |

---

## 🔭 Lookahead & Lookbehind

| Syntax | Nama | Arti |
|---|---|---|
| `(?=...)` | Positive lookahead | Harus diikuti oleh ... |
| `(?!...)` | Negative lookahead | Tidak boleh diikuti oleh ... |
| `(?<=...)` | Positive lookbehind | Harus didahului oleh ... |
| `(?<!...)` | Negative lookbehind | Tidak boleh didahului oleh ... |

---

## 🚩 Flags

| Flag | Nama | Efek |
|:---:|---|---|
| `g` | Global | Temukan semua match |
| `i` | Case-insensitive | Abaikan huruf besar/kecil |
| `m` | Multiline | `^`/`$` per baris |
| `s` | Dotall | `.` cocok dengan newline |
| `u` | Unicode | Full Unicode support |
| `d` | Indices | Info posisi tiap group |

---

## 🔧 Method JavaScript

| Method | Dipanggil Pada | Kembalikan |
|---|:---:|---|
| `regex.test(str)` | RegExp | `true` / `false` |
| `str.match(regex)` | String | Array / `null` |
| `str.matchAll(regex)` | String | Iterator (butuh flag g) |
| `str.replace(regex, rep)` | String | String baru |
| `str.search(regex)` | String | Indeks / `-1` |
| `str.split(regex)` | String | Array |
| `regex.exec(str)` | RegExp | Array / `null` |

---

## ⚠️ Jebakan Umum

```javascript
// 1. Lupa escape metacharacter
/file\.txt/  // ✅  vs  /file.txt/  // ❌ (. cocok semua)

// 2. Greedy over-matching
/<b>.*?<\/b>/g  // ✅ lazy  vs  /<b>.*<\/b>/  // ❌ greedy

// 3. Lupa flag g saat ganti semua
str.replace(/aaa/g, 'xxx')  // ✅  vs  str.replace(/aaa/, 'xxx')  // ❌ hanya pertama

// 4. Bug flag g + test() berulang
const r = /\d/;   // ✅ tanpa g  vs  const r = /\d/g;  // ❌ lastIndex bergeser

// 5. Tidak tangani null dari match()
const m = str.match(/\d+/g) || [];  // ✅  vs  str.match(/\d+/g).join()  // ❌
```

---

## 🔗 Navigation

- **📚 [Kembali ke README](./README.md)**
- **📖 [Mulai dari Part 01 — Pengantar Konsep](./docs/01-pengantar-konsep_regex.md)**
