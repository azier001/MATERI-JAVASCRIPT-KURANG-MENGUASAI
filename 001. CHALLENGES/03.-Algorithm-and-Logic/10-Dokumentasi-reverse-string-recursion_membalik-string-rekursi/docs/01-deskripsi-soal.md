# 📚 reverseString - PART 1: DESKRIPSI SOAL

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║              📋 PART 1: DESKRIPSI SOAL 📋                               ║
║                                                                          ║
║            Apa yang Diminta dan Bagaimana Rekursi Bekerja                ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 📋 Soal | 🔍 Analisis | 📊 Contoh | ✅ Ringkasan |
|:-------:|:-----------:|:---------:|:-----------:|
| [Jump](#-soal) | [Jump](#-analisis-soal) | [Jump](#-contoh-contoh) | [Jump](#-ringkasan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami apa yang diminta soal
- ✅ Memahami kenapa rekursi diperlukan di sini
- ✅ Tahu apa itu edge case dan kenapa penting
- ✅ Siap untuk melihat kode original dan evaluasinya di Part 3

---

## 📋 Soal

> ### 📋 Deskripsi
>
> Diberikan sebuah function **`reverseString(str)`** yang menerima satu parameter:
>
> | Parameter | Tipe | Keterangan |
> |-----------|------|------------|
> | `str` | `string` | String yang akan dibalik urutan karakternya |
>
> Implementasikan function **`reverseString`** untuk mengembalikan **versi terbalik dari string** yang diberikan. Wajib menggunakan **rekursi** dalam solusinya.

### 📝 Template Soal

```javascript
function reverseString(str) {
  // Code disini
}
```

---

## 🔍 Analisis Soal

### Apa yang Dimaksud "Membalik String"?

Membalik string artinya urutan karakter dibalik dari belakang ke depan:

```
Input  : 'hello'
         h e l l o
         ↓ ↓ ↓ ↓ ↓
Output : 'olleh'
         o l l e h
```

Setiap karakter tetap sama, hanya urutannya yang dibalik.

---

### Kenapa Harus Rekursi?

Soal ini secara eksplisit meminta rekursi. Rekursi cocok untuk masalah ini karena string bisa dipecah menjadi sub-masalah yang lebih kecil:

```
reverseString("hello")
  = karakter terakhir + reverseString(sisa string)
  = 'o' + reverseString("hell")
         = 'l' + reverseString("hel")
                = 'l' + reverseString("he")
                        = 'e' + reverseString("h")
                                = 'h' + reverseString("")
                                        = ''  ← BERHENTI
```

> Setiap langkah memecah masalah menjadi **satu karakter + sisa string** sampai string habis.

---

### Dua Komponen Wajib Rekursi

Setiap fungsi rekursi wajib punya dua bagian:

```
1. BASE CASE  → kondisi berhenti
               Kapan rekursi tidak lagi memanggil dirinya sendiri?
               Jawab: ketika str sudah kosong ""

2. RECURSIVE CASE → memanggil diri sendiri dengan input lebih kecil
               Apa yang dilakukan sebelum memanggil diri sendiri?
               Jawab: ambil karakter terakhir, kirim sisa string
```

---

### Edge Case

> **Edge case** adalah kondisi khusus yang perlu ditangani secara berbeda dari kondisi normal.

Untuk soal ini ada dua edge case:

```javascript
reverseString('') // → ''   (string kosong)
reverseString('a') // → 'a' (satu karakter)
```

Kenapa perlu ditangani khusus?
- String kosong tidak punya karakter untuk dibalik → langsung return `''`
- String satu karakter tidak berubah saat dibalik → rekursi berhenti setelah 1 langkah
- Tanpa base case untuk string kosong, rekursi tidak akan pernah berhenti

---

## 📊 Contoh-contoh

### Output yang Diharapkan

```javascript
// ✅ Edge case — string kosong
reverseString('')
// → ''
```

```javascript
// ✅ Edge case — satu karakter
reverseString('a')
// → 'a'
```

```javascript
// ✅ Normal case — kata biasa
reverseString('hello')
// → 'olleh'

reverseString('world')
// → 'dlrow'
```

```javascript
// ✅ Palindrome — hasil sama dengan input
reverseString('racecar')
// → 'racecar'
```

```javascript
// ✅ Huruf campuran & angka sebagai string
reverseString('JavaScript')
// → 'tpircSavaJ'

reverseString('12345')
// → '54321'
```

---

### Simulasi Pembalikan: `reverseString("hello")`

```
str = "hello"

Langkah 1: ambil 'o', sisa "hell"
Langkah 2: ambil 'l', sisa "hel"
Langkah 3: ambil 'l', sisa "he"
Langkah 4: ambil 'e', sisa "h"
Langkah 5: ambil 'h', sisa ""
Langkah 6: str kosong → BERHENTI

Kumpulkan dari bawah ke atas:
  '' → 'h' → 'eh' → 'leh' → 'lleh' → 'olleh' ✅
```

---

## ✅ Ringkasan

| Kriteria | Detail |
|----------|--------|
| Parameter | `str` — string yang akan dibalik |
| Struktur input | String biasa |
| Output | String terbalik |
| Output edge case | String kosong `''` → return `''` |
| Proses utama | Ambil karakter terakhir + rekursi dengan sisa string |
| Wajib | Menggunakan rekursi |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 2: Analisis Rekursi →](02-analisis-soal.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
