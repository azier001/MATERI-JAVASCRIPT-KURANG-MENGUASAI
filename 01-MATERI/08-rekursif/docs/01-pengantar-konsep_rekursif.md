# 🎯 Pengantar Konsep — Recursion — Rekursif

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Recursion-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- ❓ [Apa Itu Recursion?](#apa-itu)
- 🔍 [Kenapa Recursion Ada?](#kenapa-ada)
- 💥 [Masalah yang Diselesaikan](#masalah)
- 🌍 [Analogi Dunia Nyata](#analogi)
- 🗺️ [Gambaran Besar](#gambaran-besar)
- 🔗 [Navigation](#navigation)

---

<a name="apa-itu"></a>
## ❓ Apa Itu Recursion?

**Recursion (Rekursif)** adalah teknik pemrograman di mana sebuah function memanggil dirinya sendiri secara berulang hingga mencapai kondisi berhenti yang disebut *base case*.

Kalau kamu pernah melihat cermin yang berdiri di depan cermin lain, kamu akan melihat bayangan yang terus-menerus muncul di dalam bayangan — semakin jauh, semakin kecil, sampai akhirnya tidak terlihat lagi. Itulah gambaran rekursif: sebuah proses yang terus "mengulangi dirinya sendiri" dengan versi yang lebih kecil, sampai ada kondisi yang menghentikannya.

Dalam kode, sebuah fungsi rekursif selalu punya dua bagian wajib:

```
function namaFungsi(input) {
  ┌─────────────────────────────────────────┐
  │  🛑 Base Case                           │
  │  Kondisi berhenti — titik akhir rekursi │
  └─────────────────────────────────────────┘
  ┌─────────────────────────────────────────┐
  │  🔁 Recursive Case                      │
  │  Panggil diri sendiri dengan input      │
  │  yang semakin mendekati base case       │
  └─────────────────────────────────────────┘
}
```

---

<a name="kenapa-ada"></a>
## 🔍 Kenapa Recursion Ada?

Sebelum rekursif populer, developer menyelesaikan semua perulangan dengan `for` atau `while` loop. Ini bekerja dengan baik untuk kasus sederhana — misalnya mencetak angka 1 sampai 10.

Tapi ada satu jenis masalah yang menyiksa dengan loop biasa: **struktur data yang bertingkat-tingkat dengan kedalaman yang tidak diketahui**. Misalnya:

- Sebuah **folder** yang bisa berisi sub-folder, yang di dalamnya ada sub-folder lagi, dan seterusnya.
- Sebuah **menu navigasi** yang punya sub-menu, yang punya sub-sub-menu.
- Sebuah **organisasi perusahaan** dengan hierarki yang tidak terbatas.

Untuk kasus-kasus seperti ini, kamu tidak bisa tahu di awal harus menulis berapa banyak `for` loop. Kalau ternyata ada 10 tingkatan, kamu harus tulis 10 `for` loop bersarang — dan kode-mu akan menjadi mimpi buruk.

Rekursif lahir sebagai solusi elegan untuk masalah ini: **"Tidak tahu seberapa dalam? Biarkan fungsinya sendiri yang memutuskan kapan harus berhenti."**

Di dunia **Functional Programming (FP)** seperti Haskell, rekursif bahkan menjadi *satu-satunya* cara melakukan perulangan, karena FP melarang pengubahan nilai variabel (prinsip *immutability*) — sementara loop biasa selalu membutuhkan variabel `counter` yang nilainya berubah-ubah.

---

<a name="masalah"></a>
## 💥 Masalah yang Diselesaikan

Bayangkan kamu ingin mencetak semua nama folder dalam sebuah struktur folder bertingkat.

```js
const folders = {
  name: "Root",
  subfolders: [
    { name: "Music", subfolders: [] },
    {
      name: "Photos",
      subfolders: [
        { name: "2023", subfolders: [] },
        { name: "2024", subfolders: [] }
      ]
    }
  ]
};
```

**Dengan loop biasa**, kamu harus menulis loop bersarang sebanyak tingkatan folder:

```js
// ❌ Tanpa Rekursif — tidak skalabel
for (const folder of folders.subfolders) {
  console.log(folder.name);
  for (const sub of folder.subfolders) {  // Harus tulis loop baru lagi!
    console.log(sub.name);
    // Kalau ada 5 tingkatan? 5 for loop bersarang!
  }
}

// Masalah: Kode tidak fleksibel. Kalau ada 10 tingkatan folder,
// kamu harus menulis 10 for loop bersarang secara manual.
```

**Dengan rekursif**, satu fungsi cukup untuk semua kedalaman:

```js
// ✅ Dengan Rekursif — skalabel & elegan
function printFolders(folder) {
  console.log(folder.name);  // Cetak nama folder saat ini

  for (const sub of folder.subfolders) {
    printFolders(sub);  // 🔁 Rekursif: "Lakukan hal yang sama untuk sub-folder ini"
  }
}

printFolders(folders);
// Output:
// Root
// Music
// Photos
// 2023
// 2024

// Hasilnya: Tidak peduli ada 2 atau 100 tingkatan,
// fungsinya tetap satu dan tetap berjalan dengan benar.
```

> 💡 **Intinya:** Rekursif adalah solusi terbaik ketika kamu tidak tahu seberapa dalam sebuah struktur data — biarkan fungsinya yang menentukan batasnya sendiri melalui *base case*.

---

<a name="analogi"></a>
## 🌍 Analogi Dunia Nyata

Bayangkan kamu sedang mencari sebuah buku di gudang yang penuh dengan kardus bertingkat. Setiap kardus besar bisa berisi kardus-kardus kecil lagi di dalamnya — dan kamu tidak tahu seberapa dalam tumpukannya.

Cara kamu mencari buku itu adalah:
1. Buka kardus.
2. Kalau isinya **buku** → selesai, ambil bukunya! *(ini Base Case)*
3. Kalau isinya **kardus lagi** → lakukan langkah 1 lagi untuk kardus di dalam itu. *(ini Recursive Case)*

Dalam JavaScript, rekursif bekerja persis seperti itu: fungsi mengecek apakah sudah mencapai tujuan — kalau belum, dia memanggil dirinya sendiri untuk meneruskan pencarian dengan input yang lebih kecil.

| Analogi Kardus | JavaScript |
|----------------|------------|
| Satu kardus | Satu pemanggilan fungsi |
| Isi kardus → buku | Base Case tercapai → `return` nilai |
| Isi kardus → kardus lagi | Recursive Case → fungsi memanggil dirinya sendiri |
| Tidak tahu ada berapa lapisan | Input `n` yang terus mengecil setiap langkah |
| Berhenti saat buku ketemu | Berhenti saat kondisi `if` terpenuhi |

---

<a name="gambaran-besar"></a>
## 🗺️ Gambaran Besar

**Posisi Rekursif dalam Ekosistem JavaScript:**

```
JavaScript
  │
  ├── 📦 Function (Fungsi)
  │     ├── Regular Function
  │     ├── Arrow Function
  │     ├── Higher-Order Function
  │     └── 🔄 Recursive Function  ← KITA DI SINI
  │
  ├── 🔁 Control Flow (Alur Kendali)
  │     ├── for / while (Iterasi)
  │     └── 🔄 Rekursif (Alternatif Iterasi)
  │
  └── 🧩 Paradigma
        ├── OOP (Object-Oriented)
        └── FP (Functional Programming) ← Rekursif sangat erat di sini
```

**Hubungan dengan konsep lain:**

Untuk memahami rekursif dengan baik, kamu juga perlu tahu:
- **Call Stack** — wadah di memori yang menampung setiap pemanggilan fungsi; inilah yang "menumpuk" saat rekursif berjalan.
- **Function** — rekursif pada dasarnya adalah fungsi yang memanggil dirinya sendiri, jadi pemahaman dasar tentang fungsi sangat penting.

Rekursif juga menjadi fondasi untuk:
- **Tree Traversal** — cara menelusuri struktur data berbentuk pohon (misal: DOM HTML, Binary Search Tree).
- **Dynamic Programming** — teknik optimasi yang sering diawali dengan solusi rekursif sebelum dioptimalkan.
- **Divide and Conquer** — strategi memecah masalah besar menjadi sub-masalah kecil (misal: Merge Sort, Quick Sort).

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 02 — Cara Kerja →](./02-cara-kerja_rekursif.md)**
