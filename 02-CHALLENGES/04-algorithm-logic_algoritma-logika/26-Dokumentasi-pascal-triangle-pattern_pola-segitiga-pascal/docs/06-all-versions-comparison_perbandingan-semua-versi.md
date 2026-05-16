# 📊 All Versions Comparison — Perbandingan Semua Versi

### ✨ _Membandingkan 3 versi solusi secara head-to-head — dari nested loop dasar hingga rumus matematika tanpa Array_

> 🎯 **Tujuan:** Memberikan pandangan menyeluruh tentang kelebihan dan kekurangan setiap versi, sehingga kamu bisa memilih pendekatan yang paling tepat untuk konteks yang berbeda-beda.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Nested%20Loop%20|%20Array%20|%20Math-blue?style=for-the-badge)
![Versions](https://img.shields.io/badge/Versions-3-purple?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 📋 | [Ringkasan 3 Versi](#ringkasan) | Gambaran singkat setiap versi dalam 1 tabel |
| 🔀 | [Perbandingan Spasi Pendorong](#spasi) | Nested loop vs `.repeat()` |
| ➕ | [Perbandingan Logika Angka](#angka) | Array prevRow/currRow vs Rumus Kombinatorial |
| 🏷️ | [Perbandingan Indexing](#indexing) | 1-indexed vs 0-indexed |
| 💻 | [Kode Side-by-Side](#side-by-side) | Ketiga versi dalam format ringkas |
| 🏆 | [Rekomendasi Final](#rekomendasi) | Versi mana untuk konteks apa |

---

<a name="ringkasan"></a>
## 📋 Ringkasan 3 Versi

| Aspek | V1 🔧 Nested Loop | V2 ✨ Declarative | V3 🪄 Math |
|-------|:---:|:---:|:---:|
| **Spasi pendorong** | `for` loop manual | `.repeat()` | `.repeat()` |
| **Logika angka** | Array `prevRow`/`currRow` | Array `prevRow`/`currRow` | Rumus Binomial |
| **Indexing** | 1-indexed | 1-indexed | 0-indexed |
| **Jumlah variabel** | 5 (`pattern`, `prevRow`, `currRow`, `row`, `space`/`col`) | 4 (`pattern`, `prevRow`, `currRow`, `row`/`col`) | 3 (`pattern`, `val`, `i`/`j`) |
| **Nested loop** | 2 level | 1 level | 1 level |
| **Butuh Array?** | ✅ Ya | ✅ Ya | ❌ Tidak |
| **Space Complexity** | O(n) per baris | O(n) per baris | O(1) |
| **Readability** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Cocok untuk** | Belajar fundamental | Produksi & code review | Interview & optimasi |

---

<a name="spasi"></a>
## 🔀 Perbandingan Spasi Pendorong

### V1 — Loop Manual (Imperative)

```javascript
for (let space = 1; space <= num - row; space++) {
  pattern += ' ';
}
```

- Butuh variabel tambahan `space`
- 3 baris kode
- Niat harus "diterjemahkan" dari mekanik loop

### V2 & V3 — `.repeat()` (Declarative)

```javascript
// V2 (1-indexed)
pattern += ' '.repeat(num - row);

// V3 (0-indexed)
pattern += ' '.repeat(num - i - 1);
```

- Tidak butuh variabel tambahan
- 1 baris kode
- Niat langsung terbaca

> [!TIP]
> 💡 **Kapan loop manual masih berguna?** Ketika kamu sedang belajar konsep loop untuk pertama kali. Memahami V1 membuat kamu menghargai kenapa `.repeat()` ada.

---

<a name="angka"></a>
## ➕ Perbandingan Logika Angka

Ini adalah **perbedaan paling fundamental** antara ketiga versi:

### V1 & V2 — Array "Kotak Baris" (Melihat Baris Atas)

```
Cara kerja:
  Baris 4: [1, 3, 3, 1]  ← disimpan di prevRow
                ↓ ↓ ↓
  Baris 5: [1, 4, 6, 4, 1]  ← dihitung dari prevRow
```

| Kelebihan | Kekurangan |
|---|---|
| Logika intuitif (penjumlahan visual) | Butuh 2 array (`prevRow` + `currRow`) |
| Mudah di-debug (cek isi array) | Memory usage bertambah seiring baris |
| Cocok untuk pemula | 3 langkah: push(1) → loop → push(1) |

### V3 — Rumus Kombinatorial (Hitung Sendiri)

```
Cara kerja:
  Baris 5: val=1 → ×4/1=4 → ×3/2=6 → ×2/3=4 → ×1/4=1
           Setiap angka dihitung dari angka sebelumnya di baris YANG SAMA
```

| Kelebihan | Kekurangan |
|---|---|
| Tidak butuh array sama sekali | Rumus sulit diingat tanpa mantra |
| O(1) space complexity | Sulit di-debug (tidak ada array untuk dicek) |
| Kode sangat ringkas | Butuh pemahaman matematika |

---

<a name="indexing"></a>
## 🏷️ Perbandingan Indexing

| Aspek | V1 & V2 (1-Indexed) | V3 (0-Indexed) |
|---|---|---|
| Loop baris | `row = 1` sampai `<= num` | `i = 0` sampai `< num` |
| Rumus spasi | `num - row` | `num - i - 1` |
| Kondisi baris pertama | `row === 1` | `i === 0` |
| Nama variabel | `row`, `col` (deskriptif) | `i`, `j` (konvensi matematis) |

> [!NOTE]
> 💡 **Kenapa V3 menggunakan 0-indexed?** Rumus Binomial Coefficient `C(i, j)` secara matematis dirancang untuk indeks yang dimulai dari 0. Memaksa 1-indexed akan membuat rumusnya lebih rumit dan rawan error.

---

<a name="side-by-side"></a>
## 💻 Kode Side-by-Side (Versi Ringkas)

### V1 — Nested Loop Array

```javascript
const pascalV1 = (num) => {
  let pattern = '', prevRow = [];

  for (let row = 1; row <= num; row++) {
    for (let space = 1; space <= num - row; space++) pattern += ' ';

    let currRow = [];

    if (row === 1) { currRow.push(1); }
    else {
      currRow.push(1);

      for (let col = 0; col < prevRow.length - 1; col++)
        currRow.push(prevRow[col] + prevRow[col + 1]);

      currRow.push(1);
    }

    pattern += currRow.join(' ') + '\n';

    prevRow = currRow;
  }
  return pattern;
};
```

### V2 — Declarative Array + `.repeat()` ⭐

```javascript
const pascalV2 = (num) => {
  let pattern = '', prevRow = [];

  for (let row = 1; row <= num; row++) {
    pattern += ' '.repeat(num - row);

    let currRow = [];

    if (row === 1) { currRow.push(1); }
    else {
      currRow.push(1);

      for (let col = 0; col < prevRow.length - 1; col++)
        currRow.push(prevRow[col] + prevRow[col + 1]);

      currRow.push(1);
    }

    pattern += currRow.join(' ') + '\n';

    prevRow = currRow;
  }

  return pattern;
};
```

### V3 — Math Combinatorial

```javascript
const pascalV3 = (num) => {
  let pattern = '';

  for (let i = 0; i < num; i++) {
    pattern += ' '.repeat(num - i - 1);

    let val = 1;

    for (let j = 0; j <= i; j++) {
      pattern += val + ' ';
      val = (val * (i - j)) / (j + 1);
    }

    pattern += '\n';
  }
  
  return pattern;
};
```

---

<a name="rekomendasi"></a>
## 🏆 Rekomendasi Final

```
┌────────────────────────────────────────────────────────────┐
│                    PANDUAN MEMILIH VERSI                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📚 Belajar fundamental loop & array?                      │
│     → Gunakan V1 (Nested Loop Array)                       │
│                                                            │
│  💼 Menulis kode untuk tim / code review?                  │
│     → Gunakan V2 (Declarative Array) ⭐ RECOMMENDED        │
│                                                            │
│  🧠 Interview / optimasi memory?                           │
│     → Gunakan V3 (Math Combinatorial)                      │
│                                                            │
│  🤔 Tidak yakin?                                           │
│     → Selalu pilih V2 — paling seimbang!                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> 🔔 **Semua versi menghasilkan output yang IDENTIK.** Perbedaannya hanya pada *cara berpikir*, *penggunaan memori*, dan *keterbacaan kode*. Tidak ada versi yang "salah" — yang ada hanya versi yang lebih cocok untuk konteks tertentu.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 05 — V3 Math Combinatorial](./05-v3-math-combinatorial_pendekatan-matematika-kombinatorial.md)**
- **📖 [Lanjut ke Part 07 — Insight: Array vs Combinatorial →](./07-insight-array-vs-combinatorial_wawasan-array-vs-kombinatorial.md)**
