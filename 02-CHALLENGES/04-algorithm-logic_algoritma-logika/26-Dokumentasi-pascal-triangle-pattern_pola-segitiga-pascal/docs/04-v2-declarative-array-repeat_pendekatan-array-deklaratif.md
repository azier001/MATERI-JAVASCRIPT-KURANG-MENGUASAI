# ✨ V2 — Declarative Array + `.repeat()` — Pendekatan Array Deklaratif

### ✨ _Refactoring V1: mengganti nested loop spasi dengan `.repeat()` dan menerapkan clean naming_

> 🎯 **Tujuan:** Mendokumentasikan evolusi dari V1 ke V2 — di mana kita menghilangkan satu nested loop yang tidak perlu dan menerapkan penamaan variabel yang lebih deskriptif dari hasil sesi Fase 3 & 4 mentoring.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20String.repeat-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V2%20Recommended-green?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🔄 | [Apa yang Berubah dari V1?](#perubahan) | Daftar perubahan + alasan refactoring |
| 🧠 | [Perbedaan Mental Model](#mental-model) | Imperative vs Declarative thinking |
| 💻 | [Kode Final V2](#kode) | Kode lengkap versi recommended |
| 📊 | [Perbandingan Singkat V1 vs V2](#perbandingan) | Tabel perbedaan kunci |

---

<a name="perubahan"></a>
## 🔄 Apa yang Berubah dari V1?

Hanya **2 perubahan** dari V1, tapi dampaknya signifikan terhadap keterbacaan kode:

### Perubahan 1 — Loop Spasi → `.repeat()`

```diff
  for (let row = 1; row <= num; row++) {
-   for (let space = 1; space <= num - row; space++) {
-     pattern += ' ';
-   }
+   pattern += ' '.repeat(num - row);
```

**Kenapa diubah?**

Nested loop `for` hanya untuk mencetak karakter berulang itu *overkill* — seperti menyuruh seseorang menghitung "satu... dua... tiga... empat..." hanya untuk bilang "tolong berikan 4 spasi". Method `.repeat()` langsung menyatakan niat kita tanpa detail mekanik.

| Aspek | V1 (Nested Loop) | V2 (`.repeat()`) |
|---|---|---|
| Jumlah baris kode | 3 baris | 1 baris |
| Variabel tambahan | `space` (counter loop) | Tidak ada |
| Tingkat nested | 2 level dalam | 1 level saja |
| Niat kode | Tersirat *(harus baca loop dulu)* | Eksplisit *(langsung terbaca)* |

### Perubahan 2 — Variabel `idx` → `col`

```diff
- for (let idx = 0; idx < prevRow.length - 1; idx++) {
-   currRow.push(prevRow[idx] + prevRow[idx + 1]);
+ for (let col = 0; col < prevRow.length - 1; col++) {
+   currRow.push(prevRow[col] + prevRow[col + 1]);
```

**Kenapa diubah?**

Nama `idx` (singkatan *index*) terlalu generik — tidak menjelaskan **apa** yang sedang di-index. Dengan mengganti ke `col` (singkatan *column*), kode langsung terbaca: "kita sedang beriterasi kolom demi kolom di dalam sebuah baris". Ini konsisten dengan mental model **baris × kolom** (`row` × `col`).

---

<a name="mental-model"></a>
## 🧠 Perbedaan Mental Model

Kedua versi menghasilkan output yang identik, tapi **cara berpikir** di baliknya berbeda:

```
┌─────────────────────────────────────────────────────┐
│ V1 — IMPERATIVE (Memerintahkan Langkah per Langkah) │
│                                                     │
│ "Komputer, mulai dari 1. Setiap kali bertambah 1,  │
│  cetakkan satu karakter spasi. Berhenti kalau sudah │
│  mencapai num - row."                               │
│                                                     │
│ → Kita mendikte BAGAIMANA caranya                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ V2 — DECLARATIVE (Menyatakan Apa yang Diinginkan)   │
│                                                     │
│ "Komputer, tolong berikan saya spasi yang diulang   │
│  sebanyak num - row kali."                          │
│                                                     │
│ → Kita menyatakan APA yang kita mau                 │
└─────────────────────────────────────────────────────┘
```

> [!TIP]
> 💡 **Analogi Sehari-hari:**
> - **Imperative:** "Ambil gelas, buka keran, tunggu sampai penuh, tutup keran, berikan ke saya."
> - **Declarative:** "Tolong berikan saya segelas air."
>
> Keduanya menghasilkan hal yang sama, tapi cara deklaratif lebih mudah dibaca dan dipahami orang lain.

---

<a name="kode"></a>
## 💻 Kode Final V2

```javascript
const pascalTriangle = (num) => {
  let pattern = '';
  let prevRow = [];

  for (let row = 1; row <= num; row++) {
    // 1. Spasi Pendorong (Declarative dengan .repeat)
    pattern += ' '.repeat(num - row);

    // 2. Membentuk Baris Saat Ini (currRow)
    let currRow = [];

    if (row === 1) {
      currRow.push(1); // Puncak piramida
    } else {
      currRow.push(1); // Kiri selalu 1

      // Loop untuk menjumlahkan elemen di baris sebelumnya
      for (let col = 0; col < prevRow.length - 1; col++) {
        currRow.push(prevRow[col] + prevRow[col + 1]);
      }

      currRow.push(1); // Kanan selalu 1
    }

    // 3. Menggabungkan Array menjadi String
    pattern += currRow.join(' ') + '\n';

    // 4. Update prevRow untuk iterasi selanjutnya
    prevRow = currRow;
  }

  return pattern;
};

console.log(pascalTriangle(5));
```

**Output:**
```
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

---

<a name="perbandingan"></a>
## 📊 Perbandingan Singkat V1 vs V2

| Aspek | V1 (Nested Loop) | V2 (Declarative) |
|---|:---:|:---:|
| **Loop spasi** | `for` loop manual | `.repeat()` |
| **Nama variabel kolom** | `idx` | `col` |
| **Total nested loop** | 2 (spasi + penjumlahan) | 1 (penjumlahan saja) |
| **Readability** | ⭐⭐⭐ Baik | ⭐⭐⭐⭐⭐ Sangat baik |
| **Logika inti** | Sama persis | Sama persis |
| **Performa** | Identik | Identik |
| **Cocok untuk** | Belajar fundamental loop | Produksi & code review |

> [!IMPORTANT]
> 🔔 **V2 adalah versi yang direkomendasikan** untuk penggunaan sehari-hari. Kodenya lebih bersih, lebih sedikit variabel, dan niatnya langsung terbaca tanpa harus "menerjemahkan" loop spasi secara mental.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 03 — V1 Nested Loop Array](./03-v1-nested-loop-array_pendekatan-array-loop-bersarang.md)**
- **📖 [Lanjut ke Part 05 — V3 Math Combinatorial →](./05-v3-math-combinatorial_pendekatan-matematika-kombinatorial.md)**
