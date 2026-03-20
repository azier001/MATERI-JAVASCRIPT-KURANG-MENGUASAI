# 🔼 Max Pattern
### Mencari Nilai Tertinggi

![Kategori](https://img.shields.io/badge/Kategori-Fundamentals-blue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Loop%20%7C%20Comparison%20%7C%20Tracker-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Max Pattern |
| 2 | [🧠 Memahami Konsep](#-memahami-konsep) | Inti cara kerjanya |
| 3 | [🧪 Contoh Kasus](#-contoh-kasus) | Input & output yang diharapkan |
| 4 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 5 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 6 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 7 | [🔀 Versi Alternatif](#-versi-alternatif) | Cara lain menulis solusi (3 versi) |
| 8 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 9 | [💡 Insight](#-insight) | Catatan penting |
| 10 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |

---

## 📋 Deskripsi

**Max Pattern** adalah pola untuk mencari nilai terbesar dari sekumpulan data.

Digunakan ketika:
- mencari **skor tertinggi**
- mencari **harga tertinggi**
- mencari **nilai maksimum** dalam array

---

## 🧠 Memahami Konsep

> Inti dari max pattern:
> **Selalu simpan nilai terbaik saat ini, lalu bandingkan dengan data berikutnya.**

Bayangkan kamu sedang lomba lari dan mencatat siapa yang paling cepat sejauh ini — setiap ada pelari baru yang lebih cepat, kamu perbarui catatanmu.

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const numbers = [10, 5, 20, 8]
```

**Output yang diharapkan:**
```javascript
20
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Iterasi (loop) | Menelusuri setiap elemen array |
| Perbandingan nilai | Menentukan mana yang lebih besar |
| Variabel tracker | Menyimpan nilai terbesar sementara |

---

## 🔄 Implementasi

```javascript
const findMax = (arr) => {
  if (arr.length === 0) return null

  let max = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }

  return max
}
```

---

## 🧪 Visualisasi

**Data:** `[10, 5, 20, 8]`

| Langkah | Elemen Saat Ini | Nilai `max` Sebelum | Kondisi | Nilai `max` Setelah |
|---------|-----------------|----------------------|---------|----------------------|
| 1 | `10` (index 0) | — | Inisialisasi | `10` |
| 2 | `5` (index 1) | `10` | `5 > 10` → ❌ | `10` |
| 3 | `20` (index 2) | `10` | `20 > 10` → ✅ | `20` |
| 4 | `8` (index 3) | `20` | `8 > 20` → ❌ | `20` |

**Hasil akhir:** `20` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan `Math.max()`

```javascript
const findMax = (arr) => {
  if (arr.length === 0) return null
  return Math.max(...arr)
}
```

> **Kapan pakai ini?**
> Cocok untuk array sederhana berisi angka. Lebih ringkas, tapi kurang fleksibel jika data berbentuk objek.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const findMax = (arr) => {
  if (arr.length === 0) return null
  return arr.reduce((max, current) => current > max ? current : max, arr[0])
}
```

> **Kapan pakai ini?**
> Cocok ketika kamu sudah familiar dengan `.reduce()` dan ingin gaya fungsional. Lebih mudah diadaptasi untuk array berisi objek.

---

### Versi 4 — Menggunakan `for...of`

```javascript
const findMax = (arr) => {
  if (arr.length === 0) return null

  let max = arr[0]

  for (const num of arr) {
    if (num > max) {
      max = num
    }
  }

  return max
}
```

> **Kapan pakai ini?**
> Cocok ketika kamu tidak butuh index. Lebih bersih dan mudah dibaca dibanding `for` biasa. Iterasi pertama membandingkan `arr[0]` dengan dirinya sendiri — tidak masalah, hasilnya tetap benar.

---

## ⚠️ Jebakan Umum

### ❌ 1. Inisialisasi dengan `0`

```javascript
let max = 0
```

**Masalah:** Kalau semua angka negatif, hasilnya akan salah.

```javascript
findMax([-5, -3, -10]) // ❌ Hasil: 0 (seharusnya -3)
```

✅ **Solusi:** Inisialisasi dengan `arr[0]`

---

### ❌ 2. Tidak menangani array kosong

```javascript
// Tanpa pengecekan
return arr[0] // undefined jika array kosong
```

✅ **Solusi:** Selalu cek `arr.length === 0` di awal

---

### ❌ 3. Salah operator perbandingan

```javascript
if (arr[i] < max) // ❌ Ini jadi Min Pattern, bukan Max!
```

✅ **Solusi:** Gunakan `>` untuk Max, `<` untuk Min

---

## 💡 Insight

> **Tidak perlu sorting!**
> Max Pattern hanya butuh **1 kali loop** → efisiensi O(n).
> Sorting butuh O(n log n) — jauh lebih lambat untuk kebutuhan ini.

Pattern ini juga bisa diadaptasi untuk:
- **Objek** → bandingkan `obj.score`
- **String** → bandingkan `str.length`
- **Kondisi custom** → bandingkan dengan logika apapun

---

## 📝 Pelajaran yang Didapat

- ✅ Cara menyimpan nilai terbaik saat iterasi berlangsung
- ✅ Pentingnya inisialisasi yang benar (`arr[0]`, bukan `0`)
- ✅ Cara menangani edge case array kosong
- ✅ Perbedaan Max vs Min Pattern (hanya beda operator)
- ✅ Tiga cara menulis solusi: loop manual, `Math.max()`, `.reduce()`
- ✅ Efisiensi O(n) tanpa perlu sorting
