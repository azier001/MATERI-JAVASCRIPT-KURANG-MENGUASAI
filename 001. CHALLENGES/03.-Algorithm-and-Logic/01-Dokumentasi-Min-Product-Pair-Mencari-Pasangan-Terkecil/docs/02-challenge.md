# 📚 Min Product Pair - Part 2: Challenge

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║                  🎋 PART 2: BAMBOO FENCE CHALLENGE 🎋                   ║
║                                                                          ║
║                  Latihan Mandiri — Temukan Pasangan Terkecil             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-20%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 🎯 Misi | 📦 Input | 🧪 Test Cases | ⚠️ Peraturan | ✅ Solusi |
|:-------:|:--------:|:-------------:|:------------:|:--------:|
| [Jump](#-misi) | [Jump](#-material-yang-tersedia) | [Jump](#-test-cases) | [Jump](#-peraturan) | [Jump](#-solusi) |

---

## 🎯 Tujuan Pembelajaran

Setelah mengerjakan challenge ini, kamu akan:
- ✅ Bisa mengimplementasikan double loop secara mandiri
- ✅ Paham cara menyimpan nilai minimum selama iterasi
- ✅ Terbiasa memvalidasi kode dengan test cases
- ✅ Siap melihat proses belajar bertahap di Part 3

---

## 🌿 Deskripsi

> *Sebuah desa kecil membutuhkan bantuanmu...*

Desa **Bambureja** sedang membangun pagar taman, tapi anggaran mereka **sangat terbatas**. Mereka punya beberapa batang bambu dengan panjang berbeda, dan butuh kamu untuk menemukan **dua batang dengan luas panel terkecil** agar tidak boros material.

Luas panel dihitung dari:
```
luas = panjang batang pertama × panjang batang kedua
```

Bisakah kamu menyelamatkan anggaran desa? 🏘️

---

## 📦 Material yang Tersedia

```javascript
const poleLengths = [7, 2, 9, 4, 3, 6];
```

---

## 🎯 Misi

Temukan **dua batang bambu** yang jika dikalikan menghasilkan **luas panel terkecil**, lalu simpan hasilnya ke:

| Variabel | Tipe | Isi |
|----------|------|-----|
| `minProduct` | `number` | Nilai product terkecil |
| `smallestPair` | `array` | Dua batang yang menghasilkan product terkecil |

---

## 🧪 Test Cases

```javascript
// Test 1 — cek nilai product terkecil
console.log("minProduct:", minProduct);
// ✅ Expected: 6

// Test 2 — cek pasangan batang terkecil
console.log("smallestPair:", smallestPair);
// ✅ Expected: [2, 3]

// Test 3 — cek panjang smallestPair (harus selalu 2 elemen)
console.log("jumlah batang dipilih:", smallestPair.length);
// ✅ Expected: 2

// Test 4 — verifikasi hasil kali smallestPair sesuai minProduct
console.log("verifikasi product:", smallestPair[0] * smallestPair[1] === minProduct);
// ✅ Expected: true

// Test 5 — cek kedua batang ada di array asli
console.log("batang valid:", smallestPair.every(p => poleLengths.includes(p)));
// ✅ Expected: true
```

> 💡 **Tips mengerjakan:**
> Pastikan **Test 1 & 2** lulus dulu sebelum lanjut ke Test 3–5. Kalau Test 1 & 2 sudah benar, biasanya Test 3–5 otomatis ikut benar.

---

## ⚠️ Peraturan

- Tidak boleh memilih batang yang sama dua kali
- Harus mengecek **semua kombinasi** yang mungkin
- Desa menunggumu! ⏳

---

## 💡 Hint

<details>
<summary><strong>Hint 1 — Nilai awal variabel</strong></summary>

```javascript
let minProduct = ???  // nilai apa yang pasti lebih besar dari semua product?
let smallestPair = ???  // tipe data apa yang cocok untuk menyimpan 2 elemen?
```

</details>

<details>
<summary><strong>Hint 2 — Kerangka loop</strong></summary>

```javascript
for (let i = 0; i < ???; i++) {
  for (let j = ???; j < ???; j++) {
    // hitung product di sini
  }
}
```

</details>

<details>
<summary><strong>Hint 3 — Kondisi update</strong></summary>

```javascript
const currentProduct = poleLengths[i] * poleLengths[j];

if (??? < ???) {
  // update minProduct
  // update smallestPair
}
```

</details>

---

## ✅ Solusi

<details>
<summary><strong>Lihat Solusi Lengkap</strong></summary>

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

</details>

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 1: Konsep Dasar](01-konsep-dasar.md)**
- **📝 [Lanjut ke Part 3: Proses Belajar →](03-proses-belajar.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
