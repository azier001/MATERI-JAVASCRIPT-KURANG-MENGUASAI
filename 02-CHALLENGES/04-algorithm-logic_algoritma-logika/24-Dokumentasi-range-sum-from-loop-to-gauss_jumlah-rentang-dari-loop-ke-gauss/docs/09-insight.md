# 💡 Insight: Loop vs Formula vs Recursion — Kapan Pakai Iterasi, Rumus, atau Rekursi

![Topic](https://img.shields.io/badge/Topic-Mental%20Model-blue?style=for-the-badge)

---

## 📑 Daftar Isi

- ⚔️ [Pembuka Konsep](#pembuka)
- 🔁 [Kapan Menggunakan Loop (Iterasi)](#loop)
- 🧮 [Kapan Menggunakan Rumus Matematika](#rumus)
- 🌀 [Kapan Menggunakan Rekursi](#rekursi)
- 📝 [Naming Convention — Best Practice](#naming)
- 🎯 [Kesimpulan Pilihan Pattern](#kesimpulan)

---

<a name="pembuka"></a>
## ⚔️ Tiga Paradigma, Satu Hasil

Dari sesi mentoring dan 5 versi kode (V1 sampai V5), pelajaran paling berharga yang saya dapatkan adalah: **satu masalah bisa diselesaikan dengan cara berpikir yang sangat berbeda**, dan masing-masing punya tempat dan waktunya sendiri.

Challenge "Sum of Numbers" ini terlihat sederhana, tapi di baliknya tersembunyi pertanyaan fundamental dalam dunia programming: *"Haruskah saya menghitung satu per satu, langsung pakai rumus, atau menyerahkan ke fungsi lain?"*

Ketiga paradigma ini — **Iterasi**, **Rumus Matematika**, dan **Rekursi** — adalah fondasi cara berpikir seorang developer. Mari kita lihat kapan harus pakai yang mana.

---

<a name="loop"></a>
## 🔁 Kapan Menggunakan Loop (Iterasi)

Pendekatan `for` loop tergolong **Iterasi (Brute Force)** — kita mengunjungi setiap elemen satu per satu.

**Ciri-ciri masalah yang cocok:**
1. **Tidak ada rumus matematika yang bisa menyingkat prosesnya:** Misalnya, memfilter data dari array berdasarkan kondisi tertentu — kamu harus cek satu per satu.
2. **Kamu perlu melakukan sesuatu pada setiap elemen:** Contoh: mengubah format setiap item, menggabungkan string, atau menghitung berdasarkan kondisi.
3. **Data bersifat dinamis dan tidak bisa diprediksi:** Contoh: array berisi campuran tipe data yang harus dicek satu per satu.

**Contoh Kasus Ideal:**
*"Hitung berapa banyak angka genap dalam sebuah array."*

```js
// Harus cek satu per satu — tidak ada rumus untuk ini
const arr = [3, 8, 15, 2, 7, 10];
let count = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) count++;
}
// count = 3
```

---

<a name="rumus"></a>
## 🧮 Kapan Menggunakan Rumus Matematika

Pendekatan Rumus Gauss tergolong **Mathematical Optimization** — mengganti proses berulang dengan satu kali perhitungan.

**Ciri-ciri masalah yang cocok:**
1. **Ada pola matematis yang bisa dieksploitasi:** Deret aritmatika, deret geometri, kombinatorik, dll.
2. **Hasilnya bisa dihitung tanpa mengunjungi setiap elemen:** Contoh: jumlah angka 1 sampai n, luas segitiga, rata-rata dari range.
3. **Performa adalah prioritas utama:** Ketika rentang data bisa sangat besar (jutaan atau miliaran), rumus memberikan hasil instan.

**Contoh Kasus Ideal:**
*"Hitung jumlah semua angka dari 1 sampai 1.000.000."*

```js
// Loop: harus iterasi 1 juta kali — lambat
// Rumus: satu kali hitung — instan!
const n = 1000000;
const total = (n * (n + 1)) / 2;
// total = 500000500000
```

---

<a name="rekursi"></a>
## 🌀 Kapan Menggunakan Rekursi

Pendekatan rekursif tergolong **Divide and Conquer** — memecah masalah besar menjadi versi kecilnya sendiri.

**Ciri-ciri masalah yang cocok:**
1. **Masalah bersifat "nested" atau bercabang:** Contoh: menelusuri folder di dalam folder, pohon keluarga, DOM tree.
2. **Setiap sub-masalah identik dengan masalah utamanya:** Contoh: membalik string = membalik sub-string + 1 karakter.
3. **Struktur data berbentuk tree atau graph:** Contoh: binary search tree, file system, menu navigasi bertingkat.

**Contoh Kasus Ideal:**
*"Ratakan (flatten) array yang nested ke level tak terbatas."*

```js
// Loop biasa tidak bisa menangani kedalaman yang tak terbatas
// Rekursi bisa!
function flatten(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item)); // rekursi!
    } else {
      result.push(item);
    }
  }
  return result;
}
// flatten([1, [2, [3, [4]]]]) → [1, 2, 3, 4]
```

---

<a name="naming"></a>
## 📝 Naming Convention — Best Practice

Dari sesi mentoring, kita juga membahas pentingnya penamaan variabel yang bersih. Berikut rangkumannya:

### Tabel Perbandingan Naming

| Konteks | ❌ Kurang Oke | ✅ Rekomendasi | Alasan |
|:---|:---|:---|:---|
| Batas bawah | `s`, `x`, `low` | `min`, `start` | Jelas perannya sebagai angka terkecil |
| Batas atas | `e`, `y`, `high` | `max`, `end` | Jelas perannya sebagai angka terbesar |
| Penampung total | `res`, `total` | `sum` | Standar industri untuk penjumlahan |
| Nama fungsi | `GetSum` (PascalCase) | `getSum` (camelCase) | PascalCase hanya untuk Class/Component |

### Prinsip yang Dipelajari

> **`const` vs `let`:** Jika nilai variabel tidak akan pernah berubah setelah dihitung, selalu gunakan `const`. Ini memberikan sinyal "variabel ini suci" dan JavaScript akan melempar error jika ada yang coba mengubahnya.

> **Deklarasi terpisah vs koma:** Gaya `let a = 1, b = 2;` (koma) adalah gaya lama. Gaya modern memisahkan per baris — lebih mudah di-debug dan lebih rapi di Git diff.

---

<a name="kesimpulan"></a>
## 🎯 Kesimpulan Pilihan Pattern

```
Masalah Penjumlahan/Perhitungan?
  │
  ├── Ada rumus matematika yang bisa dipakai?
  │     │
  │     ├── Ya → ✅ Pakai Rumus (O(1), paling efisien)
  │     │
  │     └── Tidak → Apakah datanya bersifat nested/bercabang?
  │                   │
  │                   ├── Ya → ✅ Pakai Rekursi
  │                   │
  │                   └── Tidak → ✅ Pakai Loop (paling aman & universal)
  │
  └── Tidak yakin?
        └── ✅ Mulai dengan Loop dulu, lalu optimasi kalau perlu
```

> **Pesan untuk diri sendiri di masa depan:**
> Jangan langsung melompat ke solusi paling "canggih". Mulailah dengan Loop (V1/V2) untuk memahami masalahnya. Setelah kodenya benar, baru pikirkan: "Apakah ada rumus yang bisa menyingkat ini?" Evolusi dari sederhana ke efisien itulah yang membedakan coder biasa dengan developer sejati.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 08 — Comparison](./08-comparison.md)**
