# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-6%20kyu-yellow)
![Status](https://img.shields.io/badge/Status-✅%20Completed-green)

---

## 💭 Proses Berpikir Awal

Setelah membaca soal, yang perlu dilakukan:
1. Mencari sebuah titik potong (index) di mana jumlah angka di sebelah kiri sama dengan jumlah angka di sebelah kanan.
2. Titik potong itu sendiri tidak ikut dijumlahkan.
3. Array kosong (misalnya sisi kiri dari index 0) bernilai `0`.

**Pendekatan yang terpikirkan pertama: Brute Force (Memotong & Menjumlahkan)**
Ide awalnya adalah mencoba setiap index satu per satu. Untuk setiap index, potong array menjadi dua bagian (kiri dan kanan), lalu jumlahkan masing-masing. Jika hasilnya sama, kita temukan index-nya.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Buat perulangan (loop) dari index 0 hingga akhir array.
2. Pada setiap index (i):
   a. Ambil bagian kiri (dari awal sampai sebelum i), lalu jumlahkan.
   b. Ambil bagian kanan (dari i + 1 sampai akhir), lalu jumlahkan.
3. Bandingkan jumlah bagian kiri dan bagian kanan.
4. Jika sama, return nilai i.
5. Jika loop selesai dan tidak ada yang cocok, return -1.
```

---

## 🔄 Percobaan Pertama (Brute Force)

**Pendekatan:** Menggunakan `slice()` dan `reduce()` di dalam `for` loop.

```javascript
function findEvenIndex(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 1. Ambil bagian kiri dari index i, lalu jumlahkan
    let leftSide = arr.slice(0, i);
    let leftSum = leftSide.reduce((total, number) => total + number, 0);

    // 2. Ambil bagian kanan dari index i, lalu jumlahkan
    let rightSide = arr.slice(i + 1);
    let rightSum = rightSide.reduce((total, number) => total + number, 0);

    // 3. Jika jumlah kiri == jumlah kanan, return i
    if (leftSum === rightSum) {
      return i;
    }
  }

  return -1;
}
```

**Hasil:** ✅ Lulus secara logika, tapi ada masalah performa!

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐⭐☆ |
| Pendekatan | Brute Force (O(n²)) |
| **Bugs** | Tidak ada bug logika |
| **Performa** | ⚠️ Sangat lambat untuk array besar |

**Kenapa kurang optimal?**
Setiap kali loop berjalan (sebanyak `N` kali), kita melakukan `slice` (membuat array baru) dan `reduce` (loop lagi). Ini membuat kodenya memiliki *Time Complexity* **O(N²)**. Kalau array-nya sangat panjang, kode ini akan memakan waktu komputasi yang besar.

---

## ✅ Solusi Final (Optimasi - Best Practice)

**Pendekatan:** Pre-kalkulasi Total Sum (O(n))

Ide cerdas: Daripada menjumlahkan sisa elemen terus-menerus, kita bisa menghitung **Total Keseluruhan** terlebih dahulu di awal. Kemudian, seiring berjalannya loop, kita hanya perlu mencatat total elemen yang sudah kita lewati di kiri (`sumLeft`).

Lalu, bagaimana mencari jumlah kanan (`sumRight`) tanpa harus loop lagi?
`sumRight = Total Semua - sumLeft - Angka Saat Ini`

```javascript
// Versi Bersih (Tanpa Komentar) untuk Copy-Paste
function findEvenIndex(arr) {
  const sumTotal = arr.reduce((total, num) => total + num, 0);
  let sumLeft = 0;

  for (let i = 0; i < arr.length; i++) {
    const currentNumber = arr[i];
    let sumRight = sumTotal - sumLeft - currentNumber;

    if (sumLeft === sumRight) return i;

    sumLeft += currentNumber;
  }

  return -1;
}
```

```javascript
// Versi Edukasi (Dengan Komentar)
function findEvenIndex(arr) {
  // 1. Hitung total semua angka di array terlebih dahulu (hanya 1x loop)
  const sumTotal = arr.reduce((total, num) => total + num, 0);

  let sumLeft = 0;

  // 2. Loop array lagi untuk mencari titik seimbang
  for (let i = 0; i < arr.length; i++) {
    const currentNumber = arr[i];

    // 3. Kalkulasi sumRight secara matematis!
    let sumRight = sumTotal - sumLeft - currentNumber;

    // 4. Cek apakah seimbang?
    if (sumLeft === sumRight) return i;

    // 5. Tambahkan angka saat ini ke sumLeft untuk iterasi berikutnya
    sumLeft += currentNumber;
  }

  return -1;
}
```

**Hasil:** ✅ Lulus! (Sangat Optimal)

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐⭐⭐ |
| Pendekatan | Pre-calculation (O(n)) |
| **Bugs** | ✅ Teratasi semua |
| **Performa** | ✅ Sangat Cepat (hanya butuh O(2N) loop total) |

**Optimasi dari V1:**
- ✅ Menghilangkan `slice()` yang memakan memori.
- ✅ Menghilangkan `reduce()` berlapis di dalam loop.
- ✅ Mengubah komputasi dari O(N²) menjadi O(N).

---

## ⚖️ Perbandingan 2 Versi

| Aspek | V1 (Brute Force) | V2 (Final / Optimal) |
|-------|--------------|------------|
| **Pendekatan** | slice & reduce dalam loop | Matematika (Total - Kiri - Saat Ini) |
| **Time Complexity** | **O(N²)** lambat | **O(N)** sangat cepat |
| **Space Complexity** | **O(N)** bikin array baru | **O(1)** memori sangat hemat |
| **Readability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🔍 Penjelasan Baris per Baris (Solusi Final)

```javascript
// Baris 1-2: Pre-calculation Total
const sumTotal = arr.reduce((total, num) => total + num, 0);
// Hitung jumlah semua elemen di dalam array SEBELUM loop utama berjalan.
// Ini sangat penting agar kita tidak perlu menjumlahkan berulang-ulang nanti.

// Baris 4: Inisialisasi sumLeft
let sumLeft = 0;
// Menyiapkan variabel untuk menampung jumlah angka di sisi kiri titik tumpu.
// Awalnya 0, karena belum ada angka di sebelah kiri index 0.

// Baris 6: Loop Utama
for (let i = 0; i < arr.length; i++) {
  const currentNumber = arr[i]; // Simpan angka yang sedang dievaluasi (titik tumpu)
  
  // Baris 9: Kalkulasi Pintar untuk sumRight
  let sumRight = sumTotal - sumLeft - currentNumber;
  // Karena total = kiri + kanan + titik_tumpu, maka secara matematis:
  // kanan = total - kiri - titik_tumpu.
  // Ini menghindari loop berulang (reduce) di sisi kanan!

  // Baris 11: Pengecekan Keseimbangan
  if (sumLeft === sumRight) return i;
  // Jika seimbang, langsung return posisi index-nya.

  // Baris 13: Update sumLeft
  sumLeft += currentNumber;
  // Jika belum seimbang, geser titik tumpu ke kanan.
  // Artinya, angka saat ini akan masuk menjadi rombongan 'sisi kiri' untuk loop berikutnya.
}

// Baris 16: Jika Tidak Ditemukan
return -1;
```

---

## 🧪 Verifikasi Manual

**Test Case 1 (Valid):**
```javascript
arr = [1, 2, 3, 4, 3, 2, 1]

// Proses:
1. sumTotal = 16
2. Index 0 (Num 1): sumLeft = 0, sumRight = (16 - 0 - 1) = 15. (0 != 15)
   sumLeft update = 0 + 1 = 1
3. Index 1 (Num 2): sumLeft = 1, sumRight = (16 - 1 - 2) = 13. (1 != 13)
   sumLeft update = 1 + 2 = 3
4. Index 2 (Num 3): sumLeft = 3, sumRight = (16 - 3 - 3) = 10. (3 != 10)
   sumLeft update = 3 + 3 = 6
5. Index 3 (Num 4): sumLeft = 6, sumRight = (16 - 6 - 4) = 6. (6 == 6) ✅
6. Return: 3 ✓
```

---

## 📈 Evolusi Solusi & Pelajaran

### Pelajaran Penting:
1. **Hindari Loop di dalam Loop (O(N²)) sebisa mungkin.**
   Penggunaan `reduce()` atau `filter()` di dalam `for` loop sering kali menjebak kita dalam performa lambat tanpa disadari.
2. **Kalkulasi Matematis Sederhana bisa Menggantikan Loop.**
   Konsep `Total = Kiri + Tengah + Kanan` diubah menjadi `Kanan = Total - Kiri - Tengah` sangat elegan dan cerdas, menghemat banyak proses komputasi.
3. **Pentingnya Pre-kalkulasi.**
   Jika ada data mutlak yang tidak berubah dan bisa dihitung di awal (seperti `sumTotal`), hitunglah sebelum masuk ke loop yang berat.

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
