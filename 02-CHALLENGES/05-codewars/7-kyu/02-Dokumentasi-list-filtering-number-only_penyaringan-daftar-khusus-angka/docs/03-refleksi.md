# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Berhasil mengidentifikasi `typeof` sebagai cara mengecek tipe data elemen array
- Berhasil membangun solusi manual (imperatif) terlebih dahulu sebelum menggunakan built-in method
- Berhasil mengevolusi solusi dari `for` loop → `.filter()` → one-liner secara mandiri
- Logika pengecekan tipe (`typeof item === 'number'`) sudah benar sejak percobaan pertama

---

## ❌ Apa yang Salah di Awal?

Tidak ada error fatal — kode V1 langsung lulus. Namun ada poin menarik yang ditemukan:

| Hal | Pendekatan Awal | Yang Lebih Baik |
|-----|----------------|-----------------|
| Pengecekan tipe | `typeof item === 'number'` (positif) | Bisa juga `typeof item !== 'string'` (negatif) — keduanya valid untuk soal ini |
| Pendekatan | Imperatif (`for` loop + `push`) | Deklaratif (`.filter()`) — lebih ringkas dan ekspresif |
| Return style | Explicit `return` dengan `{}` | Implicit return (one-liner) — mengurangi noise |

> ⚠️ **Insight penting**: Pendekatan `=== 'number'` lebih **defensif** dibanding `!== 'string'`. Jika suatu hari inputnya mengandung tipe data lain (boolean, null, object), versi `=== 'number'` hanya meloloskan angka, sedangkan `!== 'string'` akan meloloskan semua yang bukan string.

---

## 🌟 Best Practice dari Komunitas

### Solusi 1 — `Number.isInteger()` dengan callback wrapper

```javascript
function filter_list(l) {
  return l.filter(e => Number.isInteger(e));
}
```

### Solusi 2 — `Number.isInteger` langsung sebagai callback (point-free style)

```javascript
function filter_list(l) {
  return l.filter(Number.isInteger);
}
```

**Perbandingan dengan solusi saya:**

| Aspek | Solusi Saya | Solusi Komunitas |
|-------|-------------|-----------------|
| Pengecekan | `typeof item === 'number'` | `Number.isInteger(item)` |
| Keamanan | Meloloskan semua number (termasuk `NaN`, `3.14`) | Hanya meloloskan bilangan bulat sejati |
| Gaya | Arrow function expression | Function declaration |
| Keringkasan | 1 baris | 1 baris (Solusi 2 bahkan tanpa wrapper) |

---

## 🔬 Bedah Perbedaan Kunci

### 1️⃣ `typeof === 'number'` vs `Number.isInteger()` — Tingkat keketatan

```javascript
typeof 42 === 'number'       // true  ✅
Number.isInteger(42)         // true  ✅

typeof 3.14 === 'number'     // true  ← lolos!
Number.isInteger(3.14)       // false ← diblokir!

typeof NaN === 'number'      // true  ← lolos! (padahal bukan angka valid)
Number.isInteger(NaN)        // false ← diblokir!

typeof '42' === 'number'     // false ✅ (keduanya sama)
Number.isInteger('42')       // false ✅
```

> 💡 **Kesimpulan**: `Number.isInteger()` lebih **strict** — hanya meloloskan bilangan bulat valid. Untuk soal ini yang inputnya pasti integer dan string, hasilnya sama. Tapi di dunia nyata, `Number.isInteger()` lebih aman.

### 2️⃣ Point-Free Style — `.filter(Number.isInteger)`

```javascript
// Dengan wrapper (eksplisit):
l.filter(e => Number.isInteger(e))

// Tanpa wrapper (point-free):
l.filter(Number.isInteger)
```

Kenapa bisa tanpa wrapper? Karena `.filter()` sudah otomatis melempar setiap elemen sebagai argumen pertama ke callback. Dan `Number.isInteger` hanya butuh 1 argumen. Jadi kita bisa langsung "melempar" fungsinya tanpa membungkus ulang.

> ⚠️ **Hati-hati**: Point-free style tidak selalu aman! Contoh bahaya: `['1','2','3'].map(parseInt)` menghasilkan `[1, NaN, NaN]` karena `.map()` melempar 3 argumen (value, index, array) dan `parseInt` menerima 2 (string, radix). Tapi untuk `Number.isInteger` yang hanya peduli argumen pertama, ini aman.

---

## 📚 Konsep yang Diperkuat

| Konsep | Penjelasan |
|--------|-----------|
| `typeof` operator | Operator bawaan JS yang mengembalikan string tipe data: `"number"`, `"string"`, `"boolean"`, `"object"`, dll. |
| `Array.filter()` | Method untuk menyaring elemen array — hanya elemen yang callback-nya mengembalikan `true` yang masuk ke array baru |
| Imperatif vs Deklaratif | Imperatif = "bagaimana caranya" (for loop). Deklaratif = "apa yang diinginkan" (.filter()) |
| `Number.isInteger()` | Method bawaan yang mengecek apakah suatu nilai adalah bilangan bulat — lebih strict dari `typeof === 'number'` |
| Implicit Return | Arrow function tanpa `{}` otomatis me-return ekspresinya — cocok untuk one-liner |

---

## 🔗 Keterkaitan dengan Materi Lain

- Berkaitan dengan: materi **Array Methods** (`.filter()`, `.map()`, `.reduce()`)
- Berkaitan dengan: materi **Type Checking** (`typeof`, `instanceof`, `Number.isInteger()`)
- Berkaitan dengan: challenge **Categorize New Member** (sama-sama menggunakan pola iterasi + kondisi)

---

## 📝 Catatan untuk Masa Depan

> *Pola yang wajib diingat untuk soal serupa:*

- [x] Jika soal meminta **penyaringan array** (pilih elemen tertentu) → gunakan `.filter()`
- [x] Untuk mengecek tipe data → gunakan `typeof` (cepat & umum) atau `Number.isInteger()` (strict untuk integer)
- [x] Selalu mulai dari **pendekatan manual** untuk memahami logikanya, baru refactor ke built-in method
- [ ] Perhatikan perbedaan antara pengecekan **positif** (`=== 'number'`) dan **negatif** (`!== 'string'`) — pilih yang lebih aman
- [ ] Pola `arr.filter(item => typeof item === 'tipe')` bisa digunakan untuk menyaring tipe data apapun

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
