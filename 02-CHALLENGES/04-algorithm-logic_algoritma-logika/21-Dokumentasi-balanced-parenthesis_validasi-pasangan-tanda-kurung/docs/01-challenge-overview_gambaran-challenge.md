# 📋 Challenge Overview — Gambaran Challenge

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Stack%20|%20LIFO-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📚 Daftar Isi

- 🧩 [Deskripsi Challenge](#deskripsi)
- 📏 [Aturan Challenge](#aturan)
- 🔧 [Function Signature](#signature)
- 📤 [Contoh Input & Output](#contoh)
- 🧠 [Pemahaman Awal](#pemahaman)

---

<a name="deskripsi"></a>
## 🧩 Deskripsi Challenge

Diberikan sebuah fungsi `isBalanced(str)` yang menerima satu parameter berupa **string**. String tersebut hanya berisi karakter tanda kurung buka `(` dan kurung tutup `)`. Fungsi harus memeriksa apakah setiap kurung buka memiliki pasangan kurung tutup yang sesuai.

- Jika **seimbang** → kembalikan `true`
- Jika **tidak seimbang** → kembalikan `false`

> 💡 **Analogi sederhana:** Bayangkan kamu membuka pintu. Setiap pintu yang kamu **buka** `(` harus kamu **tutup** `)` kembali. Jika ada pintu yang tidak tertutup, atau kamu menutup pintu yang tidak pernah dibuka — itu tidak seimbang!

---

<a name="aturan"></a>
## 📏 Aturan Challenge

| Aturan | Keterangan |
|--------|-----------|
| 📝 Input | String yang **hanya** berisi `(` dan `)` |
| ✅ Seimbang | Setiap `(` memiliki pasangan `)` yang cocok |
| 🛑 Tidak seimbang | Ada `(` tanpa `)`, atau `)` muncul tanpa `(` sebelumnya |
| 📤 Output | `true` (seimbang) atau `false` (tidak seimbang) |

---

<a name="signature"></a>
## 🔧 Function Signature

```js
/**
 * Returns true if the parenthesis in a string are balanced.
 * @param {string} str - The string to check.
 * @returns {boolean} - Whether the parenthesis in the string are balanced.
 */
function isBalanced(str) {
  // ...
}
```

---

<a name="contoh"></a>
## 📤 Contoh Input & Output

```js
console.log(isBalanced('()'));      // Output: true
console.log(isBalanced('()()'));    // Output: true
console.log(isBalanced('(()())'));  // Output: true
console.log(isBalanced('(()'));     // Output: false
console.log(isBalanced(')('));      // Output: false
```

---

### Kenapa `isBalanced('()')` hasilnya `true`?

```
Input: "()"

Karakter ke-1: '('  → Ada kurung buka, butuh pasangan
Karakter ke-2: ')'  → Kurung tutup ditemukan, cocok dengan '('

Semua kurung punya pasangan ✅ → return true
```

---

### Kenapa `isBalanced('(())')` hasilnya `true`?

```
Input: "(())"

Karakter ke-1: '('  → Buka pintu pertama
Karakter ke-2: '('  → Buka pintu kedua (di dalam pintu pertama)
Karakter ke-3: ')'  → Tutup pintu kedua ✅
Karakter ke-4: ')'  → Tutup pintu pertama ✅

Semua pintu tertutup ✅ → return true
```

---

### Kenapa `isBalanced('(()')` hasilnya `false`?

```
Input: "(()"

Karakter ke-1: '('  → Buka pintu pertama
Karakter ke-2: '('  → Buka pintu kedua
Karakter ke-3: ')'  → Tutup pintu kedua ✅

⚠️ Pintu pertama masih terbuka! Tidak ada ')' lagi untuk menutupnya.
→ return false
```

---

### Kenapa `isBalanced(')(')` hasilnya `false`?

```
Input: ")("

Karakter ke-1: ')'  → Mau tutup pintu...
  🚨 Tapi belum ada pintu yang dibuka!
  → Langsung return false 💥
```

> 💡 **Perhatikan:** Urutan sangat penting! `)` yang muncul sebelum `(` langsung membuat string tidak seimbang, meskipun jumlah `(` dan `)` sama.

---

<a name="pemahaman"></a>
## 🧠 Pemahaman Awal

Sebelum menulis kode, ada tiga pertanyaan kunci yang harus dijawab:

**1. Struktur data apa yang cocok?**
> **Stack (Tumpukan)** — karena kita butuh prinsip LIFO (Last In First Out). Kurung yang terakhir dibuka harus pertama ditutup.

**2. Kapan kita tahu string tidak seimbang? (Kondisi gagal)**
> - Saat bertemu `)` tapi Stack **kosong** (tidak ada `(` yang bisa dipasangkan).
> - Saat looping selesai tapi Stack **masih ada isinya** (ada `(` yang tidak tertutup).

**3. Kapan kita tahu string seimbang? (Kondisi sukses)**
> Saat looping selesai dan Stack **kosong** — semua kurung buka sudah punya pasangan.

```
isBalanced(str)
  │
  ├── Bertemu '(' → push ke Stack           ← SIMPAN
  │
  ├── Bertemu ')' dan Stack kosong → false   ← GAGAL (tidak ada pasangan)
  │
  ├── Bertemu ')' dan Stack ada isi → pop    ← COCOKKAN
  │
  └── Selesai loop → Stack kosong? 
        ├── Ya  → return true                ← SEIMBANG ✅
        └── Tidak → return false             ← TIDAK SEIMBANG ❌
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 2 — Alur Berpikir →](./02-problem-solving-approach_alur-berpikir.md)**
