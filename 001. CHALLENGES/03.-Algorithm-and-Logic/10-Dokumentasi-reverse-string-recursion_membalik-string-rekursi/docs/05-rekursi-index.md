# 📚 reverseString - PART 5: ALTERNATIF 1 — REKURSI + INDEX PARAMETER

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║        ✨ PART 5: ALTERNATIF 1 — REKURSI + INDEX PARAMETER ✨            ║
║                                                                          ║
║           Rekursi dengan Index yang Mundur Tanpa Memotong String         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 🔢 Default Parameter | 📉 Fase Turun | 📈 Fase Naik | 📊 Tabel Iterasi | 🧪 Test Cases |
|:-------------------:|:------------:|:------------:|:----------------:|:-------------:|
| [Jump](#-mengenal-default-parameter) | [Jump](#-fase-turun) | [Jump](#-fase-naik) | [Jump](#-tabel-iterasi) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja default parameter di JavaScript
- ✅ Memahami pendekatan rekursi dengan index yang mundur
- ✅ Tahu perbedaan pendekatan ini dengan solusi utama
- ✅ Mengenali pitfall umum dan cara menghindarinya

---

## 🔢 Mengenal Default Parameter

Default parameter adalah nilai otomatis yang digunakan ketika argumen tidak diberikan saat pemanggilan fungsi.

```javascript
// Tanpa default parameter — harus selalu isi argumen kedua
const reverseString = (str, index) => { ... }
reverseString("hello", 4)  // harus isi 4 secara manual

// Dengan default parameter — argumen kedua otomatis terisi
const reverseString = (str, index = str.length - 1) => { ... }
reverseString("hello")     // index otomatis = 4
```

Ini penting agar pemanggil **tidak perlu tahu** bahwa fungsi ini butuh `index` di dalamnya — cukup panggil seperti biasa.

```javascript
// ✅ Pemanggilan dari luar tetap bersih
reverseString("hello")    // index = 4 otomatis
reverseString("world")    // index = 4 otomatis
reverseString("")         // index = -1 → langsung base case
```

---

## ✅ Kode Final

```javascript
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index - 1)
}
```

**Cara membacanya:**
1. `index` dimulai dari posisi karakter **terakhir** secara otomatis
2. Jika `index < 0` → base case, semua karakter sudah diambil, return `''`
3. Ambil karakter di posisi `index` dengan `str[index]`
4. Gabungkan dengan hasil `reverseString` dari `index - 1`
5. Ulangi sampai `index` mencapai `-1`

---

## 📉 Fase Turun

Fase turun adalah saat fungsi terus memanggil dirinya sendiri — setiap panggilan menerima `index` yang satu angka lebih kecil, `str` tetap sama.

```javascript
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index - 1)
//                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                    panggil ulang dengan index mundur
}
```

```
reverseString("hello", 4) → belum selesai, nunggu reverseString("hello", 3)
  reverseString("hello", 3)→ belum selesai, nunggu reverseString("hello", 2)
    reverseString("hello", 2)→ belum selesai, nunggu reverseString("hello", 1)
      reverseString("hello", 1)→ belum selesai, nunggu reverseString("hello", 0)
        reverseString("hello", 0)→ belum selesai, nunggu reverseString("hello", -1)
          reverseString("hello", -1)→ BASE CASE! langsung return ''
```

> 💡 Berbeda dengan solusi utama yang memotong `str`, di sini `str`
> tetap `"hello"` di semua panggilan — hanya `index` yang berubah.

---

## 📈 Fase Naik

Fase naik adalah saat base case tercapai dan hasil mulai dikembalikan dari bawah ke atas, mengumpulkan karakter satu per satu.

```javascript
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index - 1)
//        ^^^^^^^^^
//        karakter ini digabung dengan hasil yang naik dari bawah
}
```

```
reverseString("hello", -1) selesai → kembalikan '' ke atas

reverseString("hello", 0) terima ''
  → str[0] + '' = 'h' + '' = 'h' → kembalikan 'h' ke atas

reverseString("hello", 1) terima 'h'
  → str[1] + 'h' = 'e' + 'h' = 'eh' → kembalikan 'eh' ke atas

reverseString("hello", 2) terima 'eh'
  → str[2] + 'eh' = 'l' + 'eh' = 'leh' → kembalikan 'leh' ke atas

reverseString("hello", 3) terima 'leh'
  → str[3] + 'leh' = 'l' + 'leh' = 'lleh' → kembalikan 'lleh' ke atas

reverseString("hello", 4) terima 'lleh'
  → str[4] + 'lleh' = 'o' + 'lleh' = 'olleh' ✅ SELESAI!
```

---

### Visualisasi Lengkap Fase Turun & Naik

```
FASE TURUN                                        FASE NAIK
──────────────────────────────────────────────────────────────
reverseString("hello", 4)                         = 'olleh' ✅
  str[4]='o' + reverseString("hello", 3)          = 'o' + 'lleh'
               str[3]='l' + reverseString("hello", 2) = 'l' + 'leh'
                            str[2]='l' + reverseString("hello", 1) = 'l' + 'eh'
                                         str[1]='e' + reverseString("hello", 0) = 'e' + 'h'
                                                      str[0]='h' + reverseString("hello", -1) = 'h' + ''
                                                                   return ''  ← TITIK BALIK
```

---

## 📊 Tabel Iterasi

| Panggilan ke- | `index` | `str[index]` | `index - 1` dikirim | Return |
|:---:|:---:|:---:|:---:|---|
| 1 | `4` | `'o'` | `3` | `'o' + ...` |
| 2 | `3` | `'l'` | `2` | `'l' + ...` |
| 3 | `2` | `'l'` | `1` | `'l' + ...` |
| 4 | `1` | `'e'` | `0` | `'e' + ...` |
| 5 | `0` | `'h'` | `-1` | `'h' + ...` |
| 6 | `-1` | — | — | `''` ← base case |

---

## ⚠️ Pitfalls (Jebakan Umum)

**1) ❌ Base case salah — pakai `index === 0` bukan `index < 0`**
```javascript
// ❌ SALAH — berhenti sebelum karakter pertama diambil
const reverseString = (str, index = str.length - 1) => {
  if (index === 0) return ''  // karakter index 0 tidak ikut!
  return str[index] + reverseString(str, index - 1)
}
// reverseString("hello") → "olle" bukan "olleh"

// ✅ BENAR — berhenti setelah karakter pertama diambil
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index - 1)
}
// reverseString("hello") → "olleh" ✅
```

**2) ❌ Lupa `index - 1` — index tidak mundur**
```javascript
// ❌ SALAH — index tidak berubah → infinite loop
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index)  // index tetap!
}

// ✅ BENAR — index mundur setiap panggilan
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index - 1)
}
```

**3) ❌ Memanggil fungsi dengan index manual dari luar**
```javascript
// ❌ TIDAK IDEAL — pemanggil harus tahu detail implementasi
reverseString("hello", 4)

// ✅ BENAR — default parameter menangani ini otomatis
reverseString("hello")  // index = str.length - 1 otomatis
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

> **Apa bedanya dengan solusi utama?**
> Solusi utama memotong `str` menjadi lebih pendek setiap panggilan dengan `slice(0, -1)` — membuat string baru di setiap rekursi. Alternatif ini tidak mengubah `str` sama sekali — hanya `index` yang mundur. Keduanya menghasilkan hasil yang sama.

> **Kenapa pakai default parameter?**
> Agar pemanggil tidak perlu tahu bahwa fungsi ini butuh `index`. Cukup panggil `reverseString("hello")` dan `index` otomatis dimulai dari posisi terakhir. Ini menjaga antarmuka fungsi tetap bersih dan sederhana dari luar.

> **Kapan pendekatan index ini lebih berguna?**
> Ketika kamu ingin menghindari pembuatan string baru di setiap panggilan. `str.slice(0, -1)` membuat string baru setiap rekursi, sedangkan `str[index]` hanya membaca dari string yang sama tanpa membuat salinan baru — lebih hemat memori untuk string panjang.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 4: Solusi Utama — Rekursi + slice()](04-rekursi-slice.md)**
- **📖 [Lanjut ke Part 6: Alternatif 2 — Rekursi + charAt() →](06-rekursi-charAt.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
