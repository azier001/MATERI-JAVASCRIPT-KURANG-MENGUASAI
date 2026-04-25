# ⚖️ Perbandingan Konsep — Rekursif vs Iterasi (Looping)

![Topic](https://img.shields.io/badge/Topic-Mental%20Model-blue?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Comparison-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 🤔 [Mengapa Sering Membingungkan?](#mengapa-bingung)
- 📋 [Tabel Perbandingan Cepat](#tabel-perbandingan)
- 🔍 [Detail Rekursif — Kapan Digunakan](#detail-rekursif)
- 🔍 [Detail Iterasi — Kapan Digunakan](#detail-iterasi)
- 🎯 [Panduan Pilihan: Kapan Pakai Apa?](#panduan)
- 🔗 [Navigation](#navigation)

---

<a name="mengapa-bingung"></a>
## 🤔 Mengapa Sering Membingungkan?

Dari sesi mentoring, salah satu pertanyaan yang paling sering muncul adalah: *"Kapan sebaiknya pakai rekursif dan kapan pakai loop biasa?"* Keduanya terlihat mirip karena keduanya sama-sama menjalankan sebuah blok kode secara berulang. Hasilnya pun bisa identik — `generateArray(5)` baik dengan loop maupun rekursif menghasilkan `[0, 1, 2, 3, 4, 5]` yang sama persis.

Kebingungan ini biasanya muncul saat developer baru belajar rekursif dan bertanya-tanya: *"Kalau hasilnya sama, kenapa harus repot-repot pakai rekursif?"* Sebaliknya, yang sudah terbiasa dengan rekursif kadang tergoda memakainya untuk semua kasus, termasuk yang sebenarnya lebih cocok dengan loop sederhana.

Perbedaan fundamentalnya bukan di **apa yang dihasilkan**, tapi di **bagaimana mereka mengelola state** dan **seberapa cocok mereka dengan struktur masalah** yang dihadapi.

---

<a name="tabel-perbandingan"></a>
## 📋 Tabel Perbandingan Cepat

| Aspek | Rekursif | Iterasi (Loop) |
|:------|:---------|:--------------|
| **Cara Kerja** | Fungsi memanggil dirinya sendiri | Perulangan dengan `for`/`while` |
| **State** | Tidak mengubah variabel — nilai baru diteruskan | Mengubah variabel `counter` setiap langkah |
| **Immutability** | ✅ Immutable — cocok untuk FP | ❌ Mutable — counter berubah |
| **Konsumsi Memori** | Lebih tinggi — setiap panggilan butuh slot di Call Stack | Lebih rendah — hanya butuh satu stack frame |
| **Risiko Error** | Stack Overflow jika input terlalu besar atau base case salah | Infinite loop jika kondisi berhenti salah |
| **Keterbacaan (Kode Flat)** | Lebih verbose untuk kasus sederhana | Lebih langsung dan mudah dibaca |
| **Keterbacaan (Nested)** | Jauh lebih elegan untuk struktur bertingkat | Butuh loop bersarang yang membingungkan |
| **Kecocokan Masalah** | Masalah bercabang / kedalaman tidak pasti | Masalah linear / jumlah iterasi diketahui |
| **Paradigma** | Functional Programming (FP) | Imperative Programming |
| **Contoh Terbaik** | Folder bertingkat, Tree, Faktorial | Jumlah array, Cetak 1-100, Pagination |

---

<a name="detail-rekursif"></a>
## 🔍 Rekursif — Kapan Digunakan

**Rekursif** tergolong **teknik pemecahan masalah berbasis divide-and-conquer** dalam JavaScript, di mana sebuah masalah besar dipecah menjadi sub-masalah yang lebih kecil dan serupa.

**Ciri-ciri situasi yang tepat untuk Rekursif:**

1. **Struktur datanya bersifat rekursif:** Data kamu adalah folder yang berisi folder, menu yang berisi submenu, atau komentar yang punya balasan bersarang — struktur datanya sendiri berbentuk "sesuatu yang berisi sesuatu yang sama".
2. **Kedalaman tidak diketahui di awal:** Kamu tidak tahu di coding time ada berapa tingkatan — bisa 2, bisa 10, bisa 100. Loop biasa tidak bisa menangani ini tanpa dimodifikasi.
3. **Ingin menjaga immutability (gaya FP):** Kamu tidak ingin ada variabel yang nilainya berubah-ubah — setiap langkah hanya meneruskan nilai baru, bukan mengubah yang lama.
4. **Definisi masalahnya sendiri bersifat rekursif:** Seperti Faktorial (`n! = n × (n-1)!`) atau Fibonacci — definisi matematisnya sudah rekursif, jadi kodenya pun rekursif secara natural.

```js
// ✅ Contoh ideal pakai Rekursif: Struktur bertingkat tak terbatas
function printAll(node) {
  console.log(node.name);
  for (const child of node.children) {
    printAll(child); // Tidak peduli seberapa dalam strukturnya
  }
}
```

---

<a name="detail-iterasi"></a>
## 🔍 Iterasi (Looping) — Kapan Digunakan

**Iterasi (Looping)** tergolong **teknik kontrol alur imperatif** dalam JavaScript, di mana sebuah blok kode diulang dengan kondisi eksplisit dan variabel counter yang terus diperbarui.

**Ciri-ciri situasi yang tepat untuk Iterasi:**

1. **Jumlah pengulangan sudah diketahui atau mudah dihitung:** Kamu tahu persis harus iterasi berapa kali — misalnya sebanyak panjang array, atau dari 1 sampai 100.
2. **Input bisa sangat besar:** Jika kamu perlu mengiterasi 100.000 elemen, loop aman karena hanya butuh satu stack frame. Rekursif berisiko Stack Overflow.
3. **Struktur datanya linear/flat:** Data kamu adalah array biasa atau list yang tidak bercabang — tidak ada "nested" yang perlu ditelusuri secara rekursif.
4. **Performa adalah prioritas:** Loop secara konsisten lebih cepat dari rekursif karena tidak ada overhead penambahan Execution Context ke Call Stack di setiap langkah.

```js
// ✅ Contoh ideal pakai Iterasi: Array linear dengan jumlah pasti
function sumArray(arr) {
  let total = 0;
  for (const num of arr) {
    total += num; // Counter berubah — tapi ini memang tujuannya
  }
  return total;
}
```

---

<a name="panduan"></a>
## 🎯 Panduan Pilihan: Kapan Pakai Apa?

### Flowchart Keputusan

```
Apa jenis masalahmu?
  │
  ├── Struktur datanya BERTINGKAT (nested) dengan kedalaman tidak pasti?
  │     └── ✅ PAKAI REKURSIF
  │
  ├── Input bisa sangat besar (>10.000 item)?
  │     └── ✅ PAKAI ITERASI (hindari Stack Overflow)
  │
  ├── Definisi masalahnya sendiri bersifat rekursif (misal: Faktorial, Fibonacci)?
  │     └── ✅ PAKAI REKURSIF
  │
  ├── Iterasi sederhana — jumlah sudah diketahui, data flat/linear?
  │     └── ✅ PAKAI ITERASI
  │
  └── Sedang menulis kode bergaya Functional Programming (FP)?
        └── ✅ PAKAI REKURSIF (menjaga immutability)
```

### Tabel Situasi → Pilihan

| Situasi | Pilihan Terbaik | Alasan |
|:--------|:---------------|:-------|
| Menelusuri struktur folder dengan kedalaman tak tentu | **Rekursif** | Loop butuh nested `for` sebanyak tingkatan |
| Menghitung jumlah semua elemen dalam array biasa | **Iterasi** | Jumlah pasti, input bisa besar, loop lebih aman |
| Menghitung Faktorial atau Fibonacci | **Rekursif** | Definisi matematis sudah rekursif secara natural |
| Mengiterasi 1 juta data untuk transformasi | **Iterasi** | Rekursif akan Stack Overflow di input sebesar ini |
| Menulis utility function bergaya FP (immutable) | **Rekursif** | Loop membutuhkan mutasi variabel counter |
| Menelusuri DOM/HTML tree untuk mencari elemen | **Rekursif** | Struktur DOM bersifat tree — nested secara natural |
| Menampilkan angka 1–100 | **Iterasi** | Sederhana, jumlah pasti, tidak perlu rekursif |

### Aturan Jempol

> **Aturan Jempol:**
> Jika datamu berbentuk "sesuatu di dalam sesuatu yang sama" (nested/tree), pakai **Rekursif**.
> Jika datamu berbentuk list lurus yang jelas batasnya, pakai **Iterasi**.
> Jika ragu dan input bisa sangat besar, pilih **Iterasi** — lebih aman dari Stack Overflow.

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 04 — Contoh Nyata](./04-contoh-nyata_rekursif.md)**
- **📖 [Lanjut ke Part 06 — Latihan Pemahaman →](./06-latihan-pemahaman_rekursif.md)**
