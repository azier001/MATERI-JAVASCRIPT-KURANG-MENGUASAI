# 📚 Min Product Pair - Part 3: Proses Belajar

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║              📝 PART 3: PROSES BELAJAR BERTAHAP & KESALAHAN 📝          ║
║                                                                          ║
║           Catatan Perjalanan — Dari Nol Sampai Kode Berjalan             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 🗺️ Tahapan | ❌ Kesalahan | 💡 Pelajaran | ✅ Kode Final |
|:----------:|:-----------:|:------------:|:------------:|
| [Jump](#-tahapan-pengerjaan) | [Jump](#-kesalahan--perbaikan) | [Jump](#-pelajaran-yang-didapat) | [Jump](#-kode-final) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami proses berpikir bertahap dalam menulis kode
- ✅ Mengenal kesalahan umum dan cara menghindarinya
- ✅ Lebih teliti dalam penulisan nama variabel dan sintaks
- ✅ Memahami pentingnya membangun kode sedikit demi sedikit

---

## 🗺️ Tahapan Pengerjaan

Kode tidak langsung ditulis sekaligus — melainkan dibangun **sedikit demi sedikit** dalam beberapa tahap:

```
Tahap 1           Tahap 2           Tahap 3           Tahap 4
Inisialisasi  →   Kerangka Loop  →  Hitung Product  → Kondisi If
variabel          (i dan j)         di dalam loop     & Update
```

---

### Tahap 1 — Inisialisasi Variabel

**Pertanyaan awal:** Nilai apa yang cocok untuk `minProduct` dan `smallestPair`?

```javascript
// ✅ Hasil akhir tahap 1
let minProduct = Infinity;
let smallestPair = [];
```

> 💡 Awalnya sempat terpikir `minProduct = 0` atau `null` — tapi setelah dipikir ulang, nilai apapun dari array tidak akan pernah lebih kecil dari `0`, sehingga `minProduct` tidak akan pernah terupdate. Solusinya: gunakan `Infinity`.

---

### Tahap 2 — Kerangka Double Loop

**Pertanyaan:** `i` dan `j` mulai dari mana dan berhenti di mana?

```javascript
// ✅ Hasil akhir tahap 2
for (let i = 0; i < poleLengths.length - 1; i++) {
  for (let j = i + 1; j < poleLengths.length; j++) {
    // belum diisi
  }
}
```

> 💡 Kunci di tahap ini adalah memahami bahwa `j` harus dimulai dari `i + 1` agar tidak memilih elemen yang sama dan tidak mengulang pasangan yang sudah dicek.

---

### Tahap 3 — Menghitung Product

```javascript
// ✅ Hasil akhir tahap 3
for (let i = 0; i < poleLengths.length - 1; i++) {
  for (let j = i + 1; j < poleLengths.length; j++) {
    const currentProduct = poleLengths[i] * poleLengths[j];
  }
}
```

---

### Tahap 4 — Kondisi If & Update

```javascript
// ✅ Hasil akhir tahap 4
for (let i = 0; i < poleLengths.length - 1; i++) {
  for (let j = i + 1; j < poleLengths.length; j++) {
    const currentProduct = poleLengths[i] * poleLengths[j];

    if (currentProduct < minProduct) {
      minProduct = currentProduct;
      smallestPair = [poleLengths[i], poleLengths[j]];
    }
  }
}
```

---

## ❌ Kesalahan & Perbaikan

### Kesalahan 1 — Nilai Awal minProduct

```javascript
// ❌ Salah
let minProduct = 0;

// ✅ Benar
let minProduct = Infinity;
```

**Kenapa salah?**
Semua product dari array bernilai positif, sehingga tidak ada yang lebih kecil dari `0`. Akibatnya `minProduct` tidak pernah terupdate dan `smallestPair` tetap `[]`.

**Cara menghindari:**
Untuk pola pencarian nilai minimum, selalu inisialisasi dengan `Infinity` agar perbandingan pertama selalu berhasil masuk ke blok `if`.

---

### Kesalahan 2 — Posisi Start j yang Salah

```javascript
// ❌ Salah
for (let j = 1; j < poleLengths.length; j++)

// ✅ Benar
for (let j = i + 1; j < poleLengths.length; j++)
```

**Kenapa salah?**
`j = 1` selalu mulai dari index `1` tanpa peduli posisi `i`. Ini menyebabkan beberapa pasangan dicek dua kali dan `i` bisa dipasangkan dengan elemen di sebelah kirinya.

**Cara menghindari:**
Inner loop harus selalu mulai dari `i + 1` sehingga `j` selalu berada **di depan** `i`.

---

### Kesalahan 3 — Typo Nama Variabel

```javascript
// ❌ Salah
const currentProduct = poleLength[i] * poleLength[j];
//                      ^^^^^^^^^^       ^^^^^^^^^^
//                      kurang huruf 's'

// ✅ Benar
const currentProduct = poleLengths[i] * poleLengths[j];
```

**Kenapa salah?**
`poleLength` tidak terdefinisi — nama variabel yang benar adalah `poleLengths`. JavaScript akan melempar `ReferenceError` saat kode dijalankan.

**Cara menghindari:**
Biasakan menggunakan autocomplete editor, dan selalu perhatikan pesan error di console — biasanya langsung menunjuk ke nama variabel yang salah.

---

### Kesalahan 4 — Menggunakan const untuk Variabel yang Di-reassign

```javascript
// ❌ Salah
const smallestPair = [];
// ...
smallestPair = [poleLengths[i], poleLengths[j]]; // TypeError!

// ✅ Benar
let smallestPair = [];
// ...
smallestPair = [poleLengths[i], poleLengths[j]]; // ✅
```

**Kenapa salah?**
`const` tidak bisa di-reassign. Karena `smallestPair` perlu diupdate setiap kali ditemukan pasangan yang lebih kecil, harus menggunakan `let`.

**Cara menghindari:**
Gunakan `const` hanya untuk nilai yang tidak akan pernah berubah. Gunakan `let` jika nilai variabel perlu diupdate di kemudian hari.

---

### Kesalahan 5 — Lupa Menutup Kurung Siku

```javascript
// ❌ Salah
smallestPair = [poleLengths[i], poleLengths[j];
//                                             ^
//                                      kurang tutup ']'

// ✅ Benar
smallestPair = [poleLengths[i], poleLengths[j]];
```

**Kenapa salah?**
Sintaks array literal harus diawali `[` dan diakhiri `]`. Tanpa penutup `]`, JavaScript akan melempar `SyntaxError`.

**Cara menghindari:**
Biasakan langsung menulis kurung buka dan tutup sekaligus sebelum mengisi isinya. Kebanyakan code editor modern juga otomatis menambahkan kurung penutup.

---

## 💡 Pelajaran yang Didapat

| # | Pelajaran | Konteks |
|---|-----------|---------|
| 1 | Untuk pola pencarian minimum, selalu inisialisasi dengan `Infinity` | `minProduct = Infinity` |
| 2 | Inner loop harus mulai dari `i + 1`, bukan dari `0` atau `1` | `j = i + 1` |
| 3 | Nama variabel harus ditulis persis sama — JavaScript case-sensitive | `poleLengths` bukan `poleLength` |
| 4 | Gunakan `let` jika variabel perlu di-reassign di dalam loop | `let smallestPair` |
| 5 | Selalu pastikan semua kurung buka memiliki pasangan kurung tutup | `[..., ...]` |

---

## ✅ Kode Final

```javascript
const poleLengths = [7, 2, 9, 4, 3, 6];

let minProduct = Infinity;
let smallestPair = [];

for (let i = 0; i < poleLengths.length - 1; i++) {
  for (let j = i + 1; j < poleLengths.length; j++) {
    const currentProduct = poleLengths[i] * poleLengths[j];

    if (currentProduct < minProduct) {
      minProduct = currentProduct;
      smallestPair = [poleLengths[i], poleLengths[j]];
    }
  }
}

console.log("minProduct:", minProduct);
// ✅ Expected: 6

console.log("smallestPair:", smallestPair);
// ✅ Expected: [2, 3]

console.log("jumlah batang dipilih:", smallestPair.length);
// ✅ Expected: 2

console.log("verifikasi product:", smallestPair[0] * smallestPair[1] === minProduct);
// ✅ Expected: true

console.log("batang valid:", smallestPair.every(p => poleLengths.includes(p)));
// ✅ Expected: true
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **🎋 [← Part 2: Challenge](02-challenge.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
