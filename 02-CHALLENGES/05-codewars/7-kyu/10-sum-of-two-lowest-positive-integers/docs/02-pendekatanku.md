# 🧠 02 — Pendekatan & Solusiku

## 💭 Proses Berpikir

1. **Pemahaman Masalah**: Kita perlu mencari dua angka positif terkecil dari sebuah array yang panjangnya minimal 4.
2. **Cara Termudah**: Secara logika, jika kita punya sekumpulan angka acak dan ingin mencari angka terkecil, cara paling mudah adalah dengan mengurutkan (sorting) kumpulan angka tersebut dari yang terkecil ke yang terbesar.
3. **Pengambilan Nilai**: Setelah array terurut, dua angka terkecil secara otomatis akan berada di posisi pertama (indeks `0`) dan kedua (indeks `1`).
4. **Penjumlahan**: Kita hanya perlu mengambil nilai dari kedua indeks tersebut dan mengembalikannya (return) sebagai hasil penjumlahan.
5. **Best Practice**: `Array.prototype.sort()` bersifat *mutating* (akan memodifikasi array aslinya di memori). Karena mengubah input asli (`numbers`) sering kali dianggap sebagai kebiasaan buruk dalam fungsional programming, kita menggunakan `[...numbers]` (spread syntax) untuk menduplikasi array sebelum diurutkan.

## 💡 Solusi Kodenya

```javascript
const sumTwoSmallestNumbers = (numbers) => {
  // 1. Copy array dengan spread operator agar tidak merubah data asli
  // 2. Gunakan .sort((a, b) => a - b) untuk mengurutkan angka dari kecil ke besar
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  // 3. Jumlahkan elemen di indeks 0 dan indeks 1
  return sortedNumbers[0] + sortedNumbers[1];
};
```

## 📝 Penjelasan Baris per Baris

- `const sortedNumbers = [...numbers]...` : Membuat sebuah array baru yang merupakan salinan dari `numbers`.
- `.sort((a, b) => a - b)` : Mengurutkan array salinan tersebut secara *ascending* (dari kecil ke besar). Fungsi `(a, b) => a - b` memastikan JavaScript mengurutkannya sebagai angka, bukan sebagai urutan abjad (string).
- `return sortedNumbers[0] + sortedNumbers[1];` : Mengambil elemen pertama (terkecil) dan elemen kedua (terkecil kedua), menjumlahkannya, dan memberikan output akhirnya.

---

## 💎 Alternatif Sintaks Modern (Mentor's Approach)

Solusi di atas sudah sangat baik dan merupakan **Best Practice**. Namun, jika ingin menuliskannya dengan gaya JavaScript modern (ES6) agar lebih "elegan" dan terbaca seperti bahasa manusia, kita bisa menggunakan teknik **Destructuring Assignment**:

```javascript
const sumTwoSmallestNumbers = (numbers) => {
  // Langsung tangkap elemen ke-1 dan ke-2 ke dalam variabel bernama deskriptif
  const [firstSmallest, secondSmallest] = [...numbers].sort((a, b) => a - b);
  
  return firstSmallest + secondSmallest;
};
```

**Kelebihan pendekatan ini:**
1. Alih-alih memanggil indeks `[0]` dan `[1]` yang kaku, kita langsung mendeklarasikan variabel yang bernama jelas (`firstSmallest` dan `secondSmallest`).
2. Baris kodenya menjadi lebih sedikit dan rapi, tanpa mengorbankan logika dasarnya (tetap menyalin array dan melakukan sorting numerik).

---

*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
