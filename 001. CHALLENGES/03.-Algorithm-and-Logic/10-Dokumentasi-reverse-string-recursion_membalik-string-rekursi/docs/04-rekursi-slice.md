# 📚 reverseString - PART 4: SOLUSI UTAMA — REKURSI + `slice()`

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║        ✨ PART 4: SOLUSI UTAMA — REKURSI + slice() ✨                    ║
║                                                                          ║
║           Solusi Rekursi Paling Ringkas dan Idiomatis                    ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| ✂️ slice() | 📉 Fase Turun | 📈 Fase Naik | 📊 Tabel Iterasi | 🧪 Test Cases |
|:----------:|:------------:|:------------:|:----------------:|:-------------:|
| [Jump](#-mengenal-slice) | [Jump](#-fase-turun) | [Jump](#-fase-naik) | [Jump](#-tabel-iterasi) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja `slice()` dengan index negatif
- ✅ Memahami bagaimana `slice()` digunakan untuk memotong string di rekursi
- ✅ Memahami fase turun dan fase naik secara visual dan detail
- ✅ Mengenali pitfall umum dan cara menghindarinya

---

## ✂️ Mengenal `slice()`

`slice()` adalah method string untuk mengambil sebagian karakter. Yang istimewa, `slice()` mendukung **index negatif**.

```javascript
const str = "hello"

// Index positif — hitung dari depan
str.slice(0, 3)   // → "hel"  (index 0 sampai sebelum 3)
str.slice(1)      // → "ello" (dari index 1 sampai akhir)

// Index negatif — hitung dari belakang
str.slice(-1)     // → "o"    (1 karakter dari belakang)
str.slice(-3)     // → "llo"  (3 karakter dari belakang)
str.slice(0, -1)  // → "hell" (semua kecuali 1 karakter terakhir)
```

Dua yang digunakan di solusi ini:

| Method | Hasil untuk `"hello"` | Keterangan |
|--------|----------------------|------------|
| `str.slice(-1)` | `'o'` | Ambil karakter terakhir |
| `str.slice(0, -1)` | `"hell"` | Ambil semua kecuali karakter terakhir |

---

## ✅ Kode Final

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str.slice(0, -1))
}
```

**Cara membacanya:**
1. Jika `str` kosong → base case, langsung return `''`
2. Ambil **karakter terakhir** dengan `str.slice(-1)`
3. Gabungkan dengan hasil `reverseString` dari **sisa string** tanpa karakter terakhir
4. Ulangi sampai `str` kosong

---

## 📉 Fase Turun

Fase turun adalah saat fungsi terus memanggil dirinya sendiri — setiap panggilan menerima string yang satu karakter lebih pendek, belum ada hasil yang dikembalikan.

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str.slice(0, -1))
//                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                       panggil ulang dengan str lebih pendek
}
```

```
reverseString("hello")   → belum selesai, nunggu reverseString("hell")
  reverseString("hell")  → belum selesai, nunggu reverseString("hel")
    reverseString("hel") → belum selesai, nunggu reverseString("he")
      reverseString("he")→ belum selesai, nunggu reverseString("h")
        reverseString("h")→ belum selesai, nunggu reverseString("")
          reverseString("")→ BASE CASE! langsung return ''
```

> 💡 Setiap panggilan "parkir" sambil menunggu hasil dari panggilan
> di bawahnya — seperti tumpukan piring yang belum bisa diambil
> sebelum piring paling bawah selesai.

---

## 📈 Fase Naik

Fase naik adalah saat base case tercapai dan hasil mulai dikembalikan dari bawah ke atas, mengumpulkan karakter satu per satu hingga membentuk string terbalik.

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str.slice(0, -1))
//        ^^^^^^^^^^^^
//        karakter ini digabung dengan hasil yang naik dari bawah
}
```

```
reverseString("") selesai → kembalikan '' ke atas

reverseString("h") terima ''
  → 'h' + '' = 'h' → kembalikan 'h' ke atas

reverseString("he") terima 'h'
  → 'e' + 'h' = 'eh' → kembalikan 'eh' ke atas

reverseString("hel") terima 'eh'
  → 'l' + 'eh' = 'leh' → kembalikan 'leh' ke atas

reverseString("hell") terima 'leh'
  → 'l' + 'leh' = 'lleh' → kembalikan 'lleh' ke atas

reverseString("hello") terima 'lleh'
  → 'o' + 'lleh' = 'olleh' ✅ SELESAI!
```

---

### Visualisasi Lengkap Fase Turun & Naik

```
FASE TURUN                                  FASE NAIK
────────────────────────────────────────────────────────
reverseString("hello")                      = 'olleh' ✅
  'o' + reverseString("hell")               = 'o' + 'lleh'
         'l' + reverseString("hel")         = 'l' + 'leh'
                'l' + reverseString("he")   = 'l' + 'eh'
                       'e' + reverseString("h")  = 'e' + 'h'
                              'h' + reverseString("") = 'h' + ''
                                     return ''  ← TITIK BALIK
```

---

## 📊 Tabel Iterasi

| Panggilan ke- | `str` masuk | `slice(-1)` | `slice(0,-1)` dikirim | Return |
|:---:|---|:---:|---|---|
| 1 | `"hello"` | `'o'` | `"hell"` | `'o' + ...` |
| 2 | `"hell"`  | `'l'` | `"hel"`  | `'l' + ...` |
| 3 | `"hel"`   | `'l'` | `"he"`   | `'l' + ...` |
| 4 | `"he"`    | `'e'` | `"h"`    | `'e' + ...` |
| 5 | `"h"`     | `'h'` | `""`     | `'h' + ...` |
| 6 | `""`      | —     | —        | `''` ← base case |

---

## ⚠️ Pitfalls (Jebakan Umum)

**1) ❌ Posisi `slice(-1)` di belakang**
```javascript
// ❌ SALAH — karakter terakhir diletakkan di belakang hasil rekursi
return reverseString(str.slice(0, -1)) + str.slice(-1)
// reverseString("hello") → "hello" bukan "olleh"

// ✅ BENAR — karakter terakhir diletakkan di depan hasil rekursi
return str.slice(-1) + reverseString(str.slice(0, -1))
// reverseString("hello") → "olleh" ✅
```

**2) ❌ Tidak ada base case**
```javascript
// ❌ SALAH — rekursi tidak pernah berhenti → Maximum call stack exceeded
const reverseString = (str) => {
  return str.slice(-1) + reverseString(str.slice(0, -1))
}

// ✅ BENAR — base case menghentikan rekursi
const reverseString = (str) => {
  if (!str) return ''  // ← base case
  return str.slice(-1) + reverseString(str.slice(0, -1))
}
```

**3) ❌ Memanggil rekursi dengan `str` yang sama**
```javascript
// ❌ SALAH — str tidak berubah → infinite loop
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str)  // str tidak dipotong!
}

// ✅ BENAR — kirim str yang sudah dipotong
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str.slice(0, -1))
}
```

---

## 🧪 Test Cases

```javascript
// Edge case — string kosong
console.log(reverseString(''));
// → ''
```

```javascript
// Edge case — satu karakter
console.log(reverseString('a'));
// → 'a'
```

```javascript
// Normal case — kata biasa
console.log(reverseString('hello'));
// → 'olleh'

console.log(reverseString('world'));
// → 'dlrow'
```

```javascript
// Palindrome
console.log(reverseString('racecar'));
// → 'racecar'
```

```javascript
// Huruf campuran & angka sebagai string
console.log(reverseString('JavaScript'));
// → 'tpircSavaJ'

console.log(reverseString('12345'));
// → '54321'
```

---

## ⚡ Kompleksitas

| | Nilai | Penjelasan |
|---|---|---|
| Waktu | **O(n)** | Fungsi dipanggil sebanyak panjang string `n` |
| Memori | **O(n)** | Setiap panggilan rekursi disimpan di call stack |

---

## 💡 Insight Penting

> **Kenapa `slice(-1)` harus di depan?**
> Karena hasil rekursi baru tersedia di fase naik (dari bawah ke atas). Karakter yang diambil paling awal (`'o'` dari `"hello"`) harus menjadi yang paling depan di hasil akhir. Dengan meletakkan `slice(-1)` di depan, setiap karakter otomatis tersusun dalam urutan terbalik.

> **Kenapa `str` tidak berubah tapi setiap panggilan berbeda?**
> Karena `str.slice(0, -1)` menghasilkan **string baru** yang dikirim sebagai argumen ke panggilan berikutnya. Setiap panggilan rekursi punya variabel `str`-nya sendiri di memory — bukan mengubah `str` yang sama.

> **Kenapa ini solusi paling direkomendasikan?**
> Karena paling ringkas, tidak butuh parameter tambahan, dan menggunakan `slice()` dengan index negatif yang idiomatis di JavaScript. Mudah dibaca dan mudah dipahami polanya.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 3: Kode Original & Evaluasi](03-kode-original.md)**
- **📖 [Lanjut ke Part 5: Alternatif 1 — Rekursi + Index →](05-rekursi-index.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
