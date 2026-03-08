# 📚 Min Product Pair - Complete Learning Guide

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║         🎯 MIN PRODUCT PAIR - COMPLETE LEARNING GUIDE 🎯                ║
║                                                                          ║
║              Mencari Pasangan Dua Angka Dengan Hasil Kali Terkecil       ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)
![Topics](https://img.shields.io/badge/Topics-Array%20|%20Double%20Loop%20|%20Algorithm-blue)
![Status](https://img.shields.io/badge/Status-Complete-success)

---

## 📖 Tentang Dokumentasi Ini

Dokumentasi ini membahas algoritma **Min Product Pair** — mencari dua elemen dalam sebuah array yang menghasilkan **nilai perkalian (product) terkecil**. Mencakup penjelasan konsep, challenge untuk latihan, dan proses belajar bertahap lengkap dengan kesalahan yang ditemukan.

**Cocok untuk:**
- 🎓 **Pemula** — Belajar konsep array, double loop, dan perbandingan nilai
- 💻 **Developer** — Memahami pola pencarian minimum dengan nested loop
- 🚀 **Enthusiast** — Eksplorasi logika algoritma sederhana namun fundamental

---

## 🎯 Apa yang Dibahas?

Algoritma menerima `poleLengths` (array of number), lalu menemukan pasangan dua angka dengan hasil kali terkecil:

```javascript
const poleLengths = [7, 2, 9, 4, 3, 6];

// → smallestPair : [2, 3]
// → minProduct   : 6
```

---

## 📚 Daftar Part Dokumentasi

| Part | Topik | Level |
|------|-------|-------|
| **[Part 1](docs/01-konsep-dasar.md)** | Konsep Dasar & Penjelasan Kode | 🌱 Pemula |
| **[Part 2](docs/02-challenge.md)** | Challenge: Bamboo Fence 🎋 | 🌱 Pemula |
| **[Part 3](docs/03-proses-belajar.md)** | Proses Belajar Bertahap & Kesalahan | 🌱 Pemula |

---

## 🗺️ Roadmap Belajar

### **📚 Jalur Lengkap (Recommended)**
```
Part 1 → Part 2 → Part 3
```

**Hasil:**
- ✅ Memahami konsep double loop dan pencarian nilai minimum
- ✅ Bisa mengerjakan challenge secara mandiri
- ✅ Tahu kesalahan umum dan cara menghindarinya

### **⚡ Jalur Cepat (Langsung ke challenge)**
```
Part 1 → Part 2
```

**Hasil:**
- ✅ Memahami konsep dasar
- ✅ Langsung latihan dengan challenge

---

## 📊 Quick Overview: Algoritma

| Komponen | Detail |
|----------|--------|
| **Input** | Array of number (`poleLengths`) |
| **Output** | `minProduct` (number) & `smallestPair` (array of 2 numbers) |
| **Pendekatan** | Double loop — cek semua kombinasi pasangan |
| **Kompleksitas Waktu** | O(n²) |
| **Inisialisasi** | `minProduct = Infinity`, `smallestPair = []` |

---

## 🧪 Test Cases Standar

```javascript
const poleLengths = [7, 2, 9, 4, 3, 6];

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

## 🤔 FAQ

<details>
<summary><strong>❓ Kenapa minProduct diinisialisasi dengan Infinity?</strong></summary>

Karena kita butuh nilai awal yang **pasti lebih besar** dari product manapun di array. Dengan `Infinity`, perbandingan pertama dijamin selalu masuk ke blok `if`, sehingga `minProduct` langsung terupdate dari awal.

</details>

<details>
<summary><strong>❓ Kenapa j dimulai dari i + 1, bukan dari 0?</strong></summary>

Supaya tidak memilih elemen yang sama dua kali dan tidak mengulang pasangan yang sudah dicek. Misalnya pasangan `(7, 2)` sudah dicek saat `i=0, j=1`, sehingga tidak perlu dicek lagi saat `i=1, j=0`.

</details>

<details>
<summary><strong>❓ Kenapa i berhenti di length - 1, bukan length?</strong></summary>

Karena `i` selalu butuh `j` di sebelah kanannya. Jika `i` sampai ke elemen terakhir, tidak ada lagi elemen di sebelah kanannya untuk dipasangkan, sehingga iterasi tersebut tidak berguna.

</details>

<details>
<summary><strong>❓ Apa bedanya const dan let untuk smallestPair?</strong></summary>

`const` tidak bisa di-reassign nilainya, sedangkan `smallestPair` perlu diupdate di dalam loop setiap kali ditemukan pasangan yang lebih kecil. Karena itu harus menggunakan `let`.

</details>

---

## 📚 Prerequisites

- ✅ JavaScript dasar (variabel, loop, kondisi)
- ✅ Pemahaman dasar array
- ✅ Familiar dengan konsep perbandingan nilai

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Memahami pola double loop untuk mengecek semua kombinasi
- ✅ Menggunakan `Infinity` sebagai nilai inisialisasi pencarian minimum
- ✅ Membedakan penggunaan `const` vs `let`
- ✅ Mengidentifikasi dan memperbaiki kesalahan umum pada nested loop

---

<div align="center">

## 🎯 Mari Mulai Belajar!

**📚 [Mulai dari Part 1 →](docs/01-konsep-dasar.md)**

---

**Quick Links:**

[Part 1](docs/01-konsep-dasar.md) • [Part 2](docs/02-challenge.md) • [Part 3](docs/03-proses-belajar.md)

---

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>
