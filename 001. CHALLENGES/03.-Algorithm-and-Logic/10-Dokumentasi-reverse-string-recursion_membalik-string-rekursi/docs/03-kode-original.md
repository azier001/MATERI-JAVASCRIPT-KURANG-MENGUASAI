# 📚 reverseString - PART 3: KODE ORIGINAL & EVALUASI

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║          🔍 PART 3: KODE ORIGINAL & EVALUASI 🔍                         ║
║                                                                          ║
║           Analisis Kode Pertama — Apa yang Sudah Benar                   ║
║           dan Apa yang Menjadi Masalah                                   ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 📄 Kode Original | ✅ Yang Sudah Baik | ⚠️ Yang Bermasalah | 📊 Ringkasan |
|:----------------:|:-----------------:|:-----------------:|:------------:|
| [Jump](#-kode-original) | [Jump](#-yang-sudah-baik) | [Jump](#-yang-bermasalah) | [Jump](#-ringkasan-evaluasi) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami logika kode original secara keseluruhan
- ✅ Tahu bagian mana yang sudah benar
- ✅ Tahu tiga masalah utama yang membuat kode tidak bekerja
- ✅ Siap untuk melihat solusi yang benar di Part 4

---

## 📄 Kode Original

Ini adalah kode pertama yang ditulis saat mengerjakan challenge — kondisi masih stuck dan belum menemukan pola rekursi yang tepat.

```javascript
const reverseString = (str) => {
  if(!str) return ''

  let result = ''
  let start = 0

  if(start > str.length - 1) return

  result += str[start]

  start++
  return reverseString(str)
}
```

---

## ✅ Yang Sudah Baik

### 1. Base Case Sudah Ada

```javascript
if(!str) return ''
```

Pengecekan string kosong sudah benar — ini adalah base case yang tepat untuk `reverseString`. Ketika `str` kosong, langsung return `''` tanpa proses apapun.

### 2. Niat Menggunakan Rekursi Sudah Benar

```javascript
return reverseString(str)
```

Sudah ada niat untuk memanggil diri sendiri — ini adalah fondasi yang benar untuk rekursi. Masalahnya bukan di konsepnya, tapi di cara implementasinya.

### 3. Niat Mengumpulkan Karakter Sudah Ada

```javascript
result += str[start]
```

Ada usaha untuk mengambil karakter satu per satu menggunakan index. Arahnya benar — hanya saja pendekatan dengan variabel lokal tidak cocok untuk rekursi.

---

## ⚠️ Yang Bermasalah

### 1. `str` yang Dikirim ke Rekursi Tidak Berubah

```javascript
// ❌ MASALAH — str dikirim apa adanya, tidak dipotong
start++
return reverseString(str)  // str masih "hello", bukan "hell"
```

Rekursi memanggil `reverseString(str)` dengan string yang **sama persis** — tidak ada yang berubah. Akibatnya fungsi akan terus memanggil dirinya sendiri dengan `"hello"` selamanya → **infinite loop**.

```javascript
// ✅ SEHARUSNYA — kirim str yang sudah dipotong
return reverseString(str.slice(0, -1))  // "hello" → "hell" → "hel" → ...
```

### 2. Variabel `result` dan `start` Direset Setiap Panggilan

```javascript
// ❌ MASALAH — variabel lokal direset setiap rekursi baru
let result = ''   // selalu mulai dari '' lagi
let start = 0     // selalu mulai dari 0 lagi
```

Setiap kali `reverseString` dipanggil, variabel `result` dan `start` dibuat ulang dari awal. Nilai yang sudah dikumpulkan di panggilan sebelumnya **hilang sepenuhnya** karena variabel lokal tidak bisa "diwariskan" ke panggilan rekursi berikutnya.

```javascript
// ✅ SEHARUSNYA — tidak perlu variabel lokal sama sekali
return str.slice(-1) + reverseString(str.slice(0, -1))
// hasil dikumpulkan lewat return value, bukan variabel lokal
```

### 3. Kondisi `start > str.length - 1` Tidak Pernah Terpenuhi

```javascript
// ❌ MASALAH — start selalu 0 saat kondisi ini dicek
let start = 0

if(start > str.length - 1) return  // 0 > (panjang-1) → selalu false!
```

Karena `start` baru saja dideklarasikan sebagai `0`, kondisi `start > str.length - 1` tidak akan pernah `true` kecuali untuk string kosong — dan string kosong sudah ditangani oleh base case di atas. Kondisi ini tidak berguna dan hanya menambah kebingungan.

---

## 🔄 Perbandingan Kode Original vs Solusi Benar

```javascript
// ❌ KODE ORIGINAL — tidak bekerja
const reverseString = (str) => {
  if(!str) return ''

  let result = ''
  let start = 0

  if(start > str.length - 1) return

  result += str[start]

  start++
  return reverseString(str)       // ← str tidak berubah!
}
```

```javascript
// ✅ SOLUSI BENAR — bekerja dengan benar
const reverseString = (str) => {
  if (!str) return ''

  return str.slice(-1) + reverseString(str.slice(0, -1))
  //     ^^^^^^^^^^^^     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //     ambil karakter   panggil ulang dengan str lebih pendek
  //     terakhir
}
```

---

## 📊 Ringkasan Evaluasi

| Aspek | Status | Catatan |
|-------|--------|---------|
| Base case `!str` | ✅ Benar | Kondisi berhenti yang tepat |
| Niat menggunakan rekursi | ✅ Benar | Fondasi rekursi sudah ada |
| Niat mengambil karakter | ✅ Benar | Arah berpikir sudah benar |
| `str` yang dikirim ke rekursi | ❌ Masalah | `str` tidak dipotong → infinite loop |
| Variabel `result` dan `start` | ❌ Masalah | Direset setiap panggilan → tidak bisa akumulasi |
| Kondisi `start > str.length - 1` | ❌ Masalah | Tidak pernah terpenuhi → tidak berguna |

---

## 💡 Insight Penting

> **Kenapa variabel lokal tidak cocok untuk rekursi?**
> Setiap panggilan rekursi adalah eksekusi fungsi yang **baru dan terpisah** di memory. Variabel lokal seperti `result` dan `start` dibuat ulang dari awal setiap kali fungsi dipanggil. Untuk mengumpulkan hasil di rekursi, gunakan **return value** — bukan variabel lokal.

> **Kenapa `str` harus dipotong sebelum dikirim ke rekursi?**
> Rekursi bekerja dengan memecah masalah menjadi **sub-masalah yang lebih kecil**. Jika `str` tidak berubah, tidak ada kemajuan — fungsi terus mengerjakan masalah yang sama selamanya. `str.slice(0, -1)` memastikan setiap panggilan mendapat string yang satu karakter lebih pendek.

> **Apa yang bisa dipelajari dari kode original ini?**
> Kode original menunjukkan pola berpikir yang masih campuran antara loop (menggunakan index dan variabel akumulator) dan rekursi. Rekursi punya cara berbeda dalam mengumpulkan hasil — lewat return value yang digabung, bukan variabel yang diakumulasi.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 2: Analisis Rekursi & Pola Berpikir](02-analisis-soal.md)**
- **📖 [Lanjut ke Part 4: Solusi Utama — Rekursi + slice() →](04-rekursi-slice.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
