# 🔽 Min Pattern
### Mencari Nilai Terendah

![Kategori](https://img.shields.io/badge/Kategori-Fundamentals-blue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Loop%20%7C%20Comparison%20%7C%20Tracker-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Min Pattern |
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

**Min Pattern** adalah pola untuk mencari nilai terkecil dari sekumpulan data.

Digunakan ketika:
- mencari **skor terendah**
- mencari **harga termurah**
- mencari **nilai minimum** dalam array

---

## 🧠 Memahami Konsep

> Inti dari min pattern:
> **Selalu simpan nilai terkecil saat ini, lalu bandingkan dengan data berikutnya.**

Min Pattern adalah kebalikan langsung dari Max Pattern — satu-satunya perbedaan ada pada operator perbandingan: `<` menggantikan `>`.

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const numbers = [10, 5, 20, 8]
```

**Output yang diharapkan:**
```javascript
5
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Iterasi (loop) | Menelusuri setiap elemen array |
| Perbandingan nilai | Menentukan mana yang lebih kecil |
| Variabel tracker | Menyimpan nilai terkecil sementara |

---

## 🔄 Implementasi

```javascript
const findMin = (arr) => {
  if (arr.length === 0) return null

  let min = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }

  return min
}
```

---

## 🧪 Visualisasi

**Data:** `[10, 5, 20, 8]`

| Langkah | Elemen Saat Ini | Nilai `min` Sebelum | Kondisi | Nilai `min` Setelah |
|---------|-----------------|----------------------|---------|----------------------|
| 1 | `10` (index 0) | — | Inisialisasi | `10` |
| 2 | `5` (index 1) | `10` | `5 < 10` → ✅ | `5` |
| 3 | `20` (index 2) | `5` | `20 < 5` → ❌ | `5` |
| 4 | `8` (index 3) | `5` | `8 < 5` → ❌ | `5` |

**Hasil akhir:** `5` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan `Math.min()`

```javascript
const findMin = (arr) => {
  if (arr.length === 0) return null
  return Math.min(...arr)
}
```

> **Kapan pakai ini?**
> Cocok untuk array sederhana berisi angka. Lebih ringkas, tapi kurang fleksibel jika data berbentuk objek.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const findMin = (arr) => {
  if (arr.length === 0) return null
  return arr.reduce((min, current) => current < min ? current : min, arr[0])
}
```

> **Kapan pakai ini?**
> Cocok untuk gaya fungsional dan mudah diadaptasi untuk array berisi objek.

---

### Versi 4 — Menggunakan `for...of`

```javascript
const findMin = (arr) => {
  if (arr.length === 0) return null

  let min = arr[0]

  for (const num of arr) {
    if (num < min) {
      min = num
    }
  }

  return min
}
```

> **Kapan pakai ini?**
> Cocok ketika kamu tidak butuh index. Lebih bersih dan mudah dibaca dibanding `for` biasa.

---

## ⚠️ Jebakan Umum

### ❌ 1. Inisialisasi dengan `0`

```javascript
let min = 0
```

**Masalah:** Kalau semua angka positif, hasilnya akan salah karena `0` selalu lebih kecil.

```javascript
findMin([5, 3, 10]) // ❌ Hasil: 0 (seharusnya 3)
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
if (arr[i] > min) // ❌ Ini jadi Max Pattern, bukan Min!
```

✅ **Solusi:** Gunakan `<` untuk Min, `>` untuk Max

---

## 💡 Insight

> **Satu-satunya perbedaan dengan Max Pattern adalah operatornya.**
> Max pakai `>`, Min pakai `<` — semua logika lainnya identik.

Pattern ini juga bisa diadaptasi untuk:
- **Objek** → bandingkan `obj.price`
- **String** → bandingkan `str.length`
- **Kondisi custom** → bandingkan dengan logika apapun

---

## 📝 Pelajaran yang Didapat

- ✅ Min Pattern adalah kebalikan langsung dari Max Pattern
- ✅ Satu-satunya perbedaan: operator `<` vs `>`
- ✅ Inisialisasi yang benar tetap kunci utama (`arr[0]`, bukan `0`)
- ✅ Edge case array kosong selalu perlu ditangani
- ✅ Empat cara menulis solusi: loop manual, `Math.min()`, `.reduce()`, `for...of`
- ✅ Efisiensi O(n) tanpa perlu sorting
