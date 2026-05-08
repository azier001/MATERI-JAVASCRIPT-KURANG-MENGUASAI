# 📋 01 — Spesifikasi Soal

![Level](https://img.shields.io/badge/Level-8%20kyu-blue)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Referensi Eksternal

[🔗 Codewars: Counting sheep...](https://www.codewars.com/kata/54edbc7200b811e956000556)

---

## 📝 Deskripsi Masalah

Diberikan sebuah array yang merepresentasikan **kandang domba**, di mana setiap elemen menunjukkan apakah seekor domba **hadir** (`true`) atau **tidak hadir** (`false`) di tempatnya. Beberapa tempat mungkin kosong atau berisi *bad values* seperti `null` atau `undefined`.

Tugas kita adalah membuat fungsi yang **menghitung jumlah domba yang benar-benar hadir** — yaitu elemen yang bernilai **`true` secara ketat**.

> 💡 **Inti Masalah:** Ini adalah pola klasik *conditional counting* — melakukan iterasi pada sebuah koleksi data sambil menghitung hanya elemen yang memenuhi kriteria tertentu.

---

## 📦 Definisi Parameter

| Parameter | Tipe Data | Deskripsi Fungsional |
|-----------|-----------|----------------------|
| `arrayOfSheep` | `Array<boolean \| null \| undefined>` | Array campuran yang berisi `true` (domba hadir), `false` (domba absen), atau *bad values* seperti `null`/`undefined` (slot kosong/rusak). |

---

## 🎯 Ekspektasi Return

| Tipe Data | Deskripsi |
|-----------|-----------|
| `Number` | Bilangan bulat non-negatif yang merepresentasikan jumlah total elemen bernilai `true` di dalam array. |

---

## 🧪 Skenario Pengujian (Test Cases)

```javascript
// Skenario 1: Array normal dengan campuran true dan false
countSheeps([
  true,  true,  true,  false,
  true,  true,  true,  true ,
  true,  false, true,  false,
  true,  false, false, true ,
  true,  true,  true,  true ,
  false, false, true,  true
]) 
// → 17 (hitung manual: 17 elemen true dari 24 total)

// Skenario 2: Array mengandung bad values
countSheeps([true, false, null, undefined, true]) 
// → 2 (null dan undefined diabaikan, hanya true yang dihitung)

// Skenario 3: Array kosong
countSheeps([]) 
// → 0 (tidak ada elemen sama sekali)

// Skenario 4: Semua domba hadir
countSheeps([true, true, true]) 
// → 3

// Skenario 5: Tidak ada domba yang hadir
countSheeps([false, null, undefined, false]) 
// → 0
```

---

## ⚠️ Analisis Batasan & Edge Cases

- [x] **Bad Values**: Array bisa mengandung `null` atau `undefined` — elemen-elemen ini **bukan** `false`, melainkan *falsy values* yang harus diabaikan secara aman tanpa menyebabkan error.
- [x] **Strict Equality**: Hanya `true` (boolean literal) yang dihitung. Nilai *truthy* lain seperti `1`, `"true"`, atau `[]` **tidak boleh** dianggap sebagai domba hadir.
- [x] **Empty Array**: Fungsi harus menangani array kosong dengan baik dan mengembalikan `0`.

---

## 🧩 Pola yang Dibutuhkan

```text
┌─────────────────────────────────────────────┐
│          CONDITIONAL COUNTING               │
│                                             │
│  1. Siapkan accumulator (counter = 0)       │
│  2. Iterasi setiap elemen dalam koleksi     │
│  3. Evaluasi: apakah memenuhi kriteria?     │
│  4. Jika ya → increment counter             │
│  5. Return total counter                    │
└─────────────────────────────────────────────┘
```

> Pola ini identik dengan challenge **Sum of Positives** (hitung hanya angka > 0) dan **Square(n) Sum** (akumulasi nilai). Perbedaannya hanya pada **kriteria** yang digunakan untuk memfilter.

---

## ➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)
