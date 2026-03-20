# 🔢 Frequency Counter
### Menghitung Kemunculan Data

![Kategori](https://img.shields.io/badge/Kategori-Fundamentals-blue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Loop%20%7C%20Object%20%7C%20Key--Value-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Frequency Counter |
| 2 | [🧠 Memahami Konsep](#-memahami-konsep) | Inti cara kerjanya |
| 3 | [🧪 Contoh Kasus](#-contoh-kasus) | Input & output yang diharapkan |
| 4 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 5 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 6 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 7 | [🔀 Versi Alternatif](#-versi-alternatif) | Cara lain menulis solusi (2 versi) |
| 8 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 9 | [💡 Insight](#-insight) | Catatan penting |
| 10 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |

---

## 📋 Deskripsi

**Frequency Counter** adalah pola untuk menghitung berapa kali suatu data muncul.

Digunakan ketika:
- menghitung **jumlah per kategori**
- melakukan **analisis data sederhana**
- menghitung kemunculan **karakter, angka, atau properti objek**

---

## 🧠 Memahami Konsep

> Inti dari frequency counter:
> **Gunakan object sebagai penyimpan jumlah kemunculan tiap key.**

Bayangkan kamu punya sekeranjang buah dan menghitung satu per satu — setiap kali menemukan buah yang sama, kamu tambah tally-nya. Object bekerja persis seperti itu.

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
```

**Output yang diharapkan:**
```javascript
{
  apple: 3,
  banana: 2,
  orange: 1
}
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Iterasi (loop) | Menelusuri setiap elemen array |
| Object sebagai map | Menyimpan pasangan key-value untuk setiap data |
| Increment nilai | Menambah hitungan setiap kali data ditemukan |

---

## 🔄 Implementasi

```javascript
const countFrequency = (arr) => {
  const result = {}

  for (const item of arr) {
    result[item] = (result[item] || 0) + 1
  }

  return result
}
```

---

## 🧪 Visualisasi

**Data:** `['apple', 'banana', 'apple', 'orange', 'banana', 'apple']`

| Langkah | Elemen Saat Ini | Nilai Sebelumnya | Operasi | Nilai Setelah |
|---------|-----------------|------------------|---------|---------------|
| 1 | `'apple'` | `undefined` | `(undefined \|\| 0) + 1` | `apple: 1` |
| 2 | `'banana'` | `undefined` | `(undefined \|\| 0) + 1` | `banana: 1` |
| 3 | `'apple'` | `1` | `(1 \|\| 0) + 1` | `apple: 2` |
| 4 | `'orange'` | `undefined` | `(undefined \|\| 0) + 1` | `orange: 1` |
| 5 | `'banana'` | `1` | `(1 \|\| 0) + 1` | `banana: 2` |
| 6 | `'apple'` | `2` | `(2 \|\| 0) + 1` | `apple: 3` |

**Hasil akhir:**
```javascript
{ apple: 3, banana: 2, orange: 1 }
```

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan `for` biasa

```javascript
const countFrequency = (arr) => {
  const result = {}

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    result[item] = (result[item] || 0) + 1
  }

  return result
}
```

> **Kapan pakai ini?**
> Ketika kamu butuh akses ke index elemen, misalnya untuk membandingkan posisi elemen satu dengan lainnya.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const countFrequency = (arr) => {
  return arr.reduce((result, item) => {
    result[item] = (result[item] || 0) + 1
    return result
  }, {})
}
```

> **Kapan pakai ini?**
> Cocok untuk gaya fungsional. Semua logika terangkum dalam satu ekspresi tanpa variabel tambahan.

---

## ⚠️ Jebakan Umum

### ❌ 1. Tidak handle nilai awal

```javascript
result[item]++
```

**Masalah:** Jika `result[item]` belum ada, nilainya `undefined` — dan `undefined++` menghasilkan `NaN`.

```javascript
// ❌ Hasil: { apple: NaN }
```

✅ **Solusi:** Gunakan pola `(result[item] || 0) + 1`

---

### ❌ 2. Menggunakan variabel tunggal

```javascript
let count = 0
count++
```

**Masalah:** Hanya bisa tracking satu nilai — tidak bisa membedakan antar kategori.

✅ **Solusi:** Gunakan object `{}` agar setiap key bisa disimpan terpisah

---

### ❌ 3. Salah menulis key

```javascript
result['item'] = (result['item'] || 0) + 1
```

**Masalah:** String `'item'` adalah key literal — semua elemen akan masuk ke satu key yang sama.

```javascript
// ❌ Hasil: { item: 6 }
```

✅ **Solusi:** Gunakan variabel tanpa tanda kutip: `result[item]`

---

## 💡 Insight

> **Ini adalah fondasi dari semua pattern grouping.**
> Sebelum bisa mengelompokkan data, kamu harus bisa menghitungnya dulu.

Frequency Counter bisa dipakai untuk:
- **String** → menghitung kemunculan karakter
- **Number** → menghitung kemunculan angka
- **Object property** → `result[obj.category]`
- **Interview** → sangat sering muncul sebagai bagian dari soal yang lebih kompleks

Kompleksitas: **O(n)** — cukup satu kali loop.

---

## 📝 Pelajaran yang Didapat

- ✅ Cara menghitung kemunculan data dengan efisien menggunakan object
- ✅ Pola `(result[item] || 0) + 1` untuk handle nilai awal yang aman
- ✅ Perbedaan `result['item']` (key literal) vs `result[item]` (key dinamis)
- ✅ Mengapa object lebih tepat dari variabel tunggal untuk multi-kategori
- ✅ Tiga cara menulis solusi: `for...of`, `for` biasa, `.reduce()`
- ✅ Frequency Counter adalah fondasi dari grouping pattern yang lebih kompleks
