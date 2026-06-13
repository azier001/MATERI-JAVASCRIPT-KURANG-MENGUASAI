# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-6%20kyu-yellow)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Berhasil menemukan solusi Brute Force awal menggunakan `slice()` dan `reduce()`.
- Berhasil mengoptimasi kode dari **O(N²)** menjadi **O(N)** dengan pendekatan pre-kalkulasi matematika.
- Menghindari pembuatan array baru di dalam loop, sehingga memori sangat hemat (Space Complexity **O(1)**).

---

## ❌ Apa yang Kurang Optimal di Awal?

| Hal | Sebelumnya (Brute Force) | Yang Lebih Baik (Optimasi Akhir) |
|-----|-----------|-----------------|
| Memory (Space) | Membuat array baru berulang kali dengan `slice()` | Menggunakan 2 variabel angka (`sumLeft`, `sumTotal`) |
| Kecepatan (Time) | Melakukan komputasi ulang (loop di dalam loop) | Kalkulasi total sekali saja di awal, lalu gunakan pengurangan matematika. |

---

## 🌟 Best Practice & Clever Solutions dari Komunitas

### **Solusi 1: Refactoring Kode 1 & 2 (O(N) Pre-calculation)**

Dua kode pertama dari komunitas memiliki pola yang persis sama dengan solusi optimal kita, namun gaya penulisannya perlu dirapikan (mengubah `var` menjadi `let`/`const` dan perbaikan *readability*).

**Versi Komunitas (Dirapikan & Lebih *Readable*):**

```javascript
function findEvenIndex(arr) {
  let leftSum = 0;
  
  // Hitung total kanan di awal (sama dengan sumTotal kita)
  let rightSum = arr.reduce((total, num) => total + num, 0);
  
  for (let i = 0; i < arr.length; i++) {
    // Kurangi nilai kanan dengan angka yang sedang diinjak (titik tumpu)
    rightSum -= arr[i];
    
    // Bandingkan
    if (leftSum === rightSum) return i;
    
    // Jika belum sama, angka saat ini pindah rombongan ke sisi kiri
    leftSum += arr[i];
  }
  
  return -1;
}
```

**Perbandingan dengan solusi kita:**
Sangat mirip! Bedanya, solusi komunitas langsung menggunakan variabel `right` sebagai total di awal, lalu menguranginya terus-menerus. Pendekatan ini lebih ringkas satu langkah ketimbang menyimpan `sumTotal` secara terpisah.

---

### **Solusi 2: Si Paling "Clever" (Functional One-Liner)**

```javascript
const sum = (arr, from, to) => arr.slice(from, to).reduce((total, num) => total + num, 0);

const findEvenIndex = arr => arr.findIndex((el, index) => sum(arr, 0, index) === sum(arr, index + 1));
```

**Kelebihan:**
- ✅ Super duper ringkas! Hanya butuh 2 baris.
- ✅ Sangat *Declarative* dan *Functional*. Memanfaatkan `.findIndex()` untuk mencari langsung index yang syaratnya terpenuhi.

**Kekurangan:**
- ⚠️ **Performa Buruk (O(N²))**: Sama seperti percobaan pertama kita, fungsi `sum` akan melakukan `slice` (bikin array baru) dan `reduce` (looping lagi) berulang kali untuk **setiap elemen**. Untuk array yang sangat panjang, ini jauh lebih lambat dari solusi O(N) kita.

---

## 🔬 Bedah Perbedaan Kunci

### 1️⃣ Imperatif (For Loop) vs Deklaratif (`findIndex`)

```javascript
// Solusi kita (imperatif):
for (let i = 0; i < arr.length; i++) {
  if (kiri === kanan) return i;
}

// Solusi komunitas "clever" (deklaratif):
return arr.findIndex((el, index) => kiri === kanan);
```

**Pelajaran:**
- Pendekatan **Deklaratif** (`findIndex`) sangat elegan secara sintaks dan asyik dibaca karena niatnya jelas: *"Cari index di mana ... "*.
- Pendekatan **Imperatif** (`for`) terkadang memakan banyak baris, namun memberikan kita kontrol mutlak atas performa (seperti yang kita lakukan dengan trik matematika).

### 2️⃣ Time Complexity: O(N) vs O(N²)

```javascript
// O(N) - Solusi Kita & Best Practice Komunitas
// Loop jalan 1x (untuk reduce awal) + 1x (untuk for loop)
// Waktu eksekusi sangat stabil.

// O(N²) - Solusi Clever
// Jika array panjangnya 1.000, maka akan terjadi pemotongan & penjumlahan hingga 1.000 x 1.000 = 1 Juta kali proses!
```

**Pelajaran:**
- Di Codewars, solusi yang mendapat upvote "Clever" terbanyak **belum tentu** solusi yang paling efisien ("Best Practice"). Seringkali "Clever" hanya berarti kode itu ditulis seringkas mungkin (one-liner) mengorbankan performa.
- Untuk wawancara kerja (Technical Interview), interviewer akan lebih menyukai solusi **O(N)** kita dibanding yang one-liner.

---

## 📚 Konsep yang Diperkuat

| Konsep | Penjelasan |
|--------|-----------|
| `Array.prototype.findIndex()` | Mencari dan mengembalikan *index pertama* yang memenuhi syarat callback. Jika tidak ada, mengembalikan `-1`. |
| `Array.prototype.slice()` | Memotong array. Ingat bahwa operasi ini membuat array baru sehingga memakan memori (**O(N) Space**). |
| `Array.prototype.reduce()` | Menjumlahkan / memanipulasi seluruh isi array menjadi satu nilai tunggal. |
| Time Complexity (Big-O) | Mengukur seberapa efisien kecepatan kode kita seiring bertambahnya ukuran data. |
| Space Complexity | Mengukur seberapa efisien penggunaan memori (RAM) dari kode kita. |

---

## 🔗 Keterkaitan dengan Materi Lain

- Berkaitan dengan: materi **Array Methods** (`.findIndex()`, `.reduce()`, `.slice()`)
- Berkaitan dengan: materi **Time & Space Complexity** (Big-O Notation)
- Berkaitan dengan: materi **Functional vs Imperative Programming**

---

## 📝 Catatan untuk Masa Depan

> *Pola yang wajib diingat untuk soal algoritma serupa:*

- [x] Jika harus mencari "titik potong" / keseimbangan, **selalu pertimbangkan Pre-calculation**. Hitung total di awal!
- [x] Kurangi penggunaan `.slice()` dan `.reduce()` yang bersarang (nested) di dalam `for` loop jika dataset berpotensi besar.
- [x] Kode yang keren (satu baris) belum tentu cepat. Prioritaskan algoritma matematik yang cerdik daripada sekadar *method chaining* buta.

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
