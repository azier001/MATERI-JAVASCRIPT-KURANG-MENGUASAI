# 🧠 Problem Solving Approach — Alur Berpikir

### ✨ _Membedah pola Segitiga Pascal langkah demi langkah sebelum menulis satu baris kode pun_

> 🎯 **Tujuan:** Menemukan rumus spasi pendorong, memahami logika penjumlahan antar baris, dan menyusun blueprint kode — sehingga saat mulai ngoding, kita tinggal "menerjemahkan" apa yang sudah dipahami.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Nested%20Loop%20|%20Array%20|%20Math-blue?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🔍 | [Langkah 1 — Tabel Breakdown Pola](#langkah-1) | Membedah pola spasi dan angka baris per baris |
| 📐 | [Langkah 2 — Penemuan Rumus Spasi](#langkah-2) | Menemukan rumus `num - row` dari tabel |
| ➕ | [Langkah 3 — Logika Penjumlahan Angka](#langkah-3) | Aturan "Kotak Array" untuk membentuk baris baru |
| 🪄 | [Langkah 4 — Alternatif: Rumus Kombinatorial](#langkah-4) | Mantra "Kali Sisa, Bagi Maju" |
| 📖 | [Langkah 5 — Kamus Variabel](#langkah-5) | Tabel penamaan variabel yang deskriptif |
| 🗺️ | [Langkah 6 — Blueprint Kode](#langkah-6) | Kerangka kosong kedua pendekatan |

---

<a name="langkah-1"></a>
## 🔍 Langkah 1 — Tabel Breakdown Pola

Sebelum menulis kode, bedah dulu polanya baris per baris. Kita ambil contoh `num = 5`:

### Tabel Analisis Pola (1-Indexed)

| Baris (`row`) | Jumlah Spasi | Jumlah Angka | Array Angka | Output Visual |
|:---:|:---:|:---:|:---|:---|
| 1 | 4 | 1 | `[1]` | `····1` |
| 2 | 3 | 2 | `[1, 1]` | `···1 1` |
| 3 | 2 | 3 | `[1, 2, 1]` | `··1 2 1` |
| 4 | 1 | 4 | `[1, 3, 3, 1]` | `·1 3 3 1` |
| 5 | 0 | 5 | `[1, 4, 6, 4, 1]` | `1 4 6 4 1` |

> *Keterangan: tanda `·` melambangkan spasi.*

### 3 Pola yang Terlihat dari Tabel

1. **Spasi semakin berkurang** — dari 4 turun ke 0 seiring bertambahnya baris.
2. **Jumlah angka = nomor baris** — baris ke-3 punya 3 angka, baris ke-5 punya 5 angka.
3. **Angka ujung selalu `1`** — setiap baris diawali dan diakhiri angka `1`, sisanya dihitung dari baris atasnya.

---

<a name="langkah-2"></a>
## 📐 Langkah 2 — Penemuan Rumus Spasi

Dari tabel di atas, kita bisa mencari hubungan antara nomor baris dan jumlah spasi:

| Baris (`row`) | Total Baris (`num`) | Jumlah Spasi | Perhitungan |
|:---:|:---:|:---:|:---:|
| 1 | 5 | 4 | 5 - 1 = **4** |
| 2 | 5 | 3 | 5 - 2 = **3** |
| 3 | 5 | 2 | 5 - 3 = **2** |
| 4 | 5 | 1 | 5 - 4 = **1** |
| 5 | 5 | 0 | 5 - 5 = **0** |

### 💡 Rumus yang Ditemukan

> **Jumlah Spasi = `num - row`**
>
> *Kenapa?* Semakin ke bawah (`row` bertambah), piramida semakin lebar ke kiri sehingga butuh lebih sedikit "dorongan" spasi agar posisinya tetap rata tengah. Di baris terakhir (`row === num`), spasi = 0 karena angka sudah menempel di tepi kiri.

---

<a name="langkah-3"></a>
## ➕ Langkah 3 — Logika Penjumlahan Angka (Pendekatan Array)

Ini adalah inti dari Segitiga Pascal. Setiap angka di tengah baris merupakan **hasil penjumlahan dua angka berdampingan di baris atasnya**.

### Analogi: Sistem "Kotak Array"

Bayangkan setiap baris Segitiga Pascal disimpan dalam sebuah kotak (Array). Untuk membuat kotak baris baru, kita melihat isi kotak baris sebelumnya:

**Contoh: Membuat Baris ke-4 dari Baris ke-3**

```
prevRow (baris 3) :     1       2       1
                        \     / \     /
                         (1+2)   (2+1)
                           ↓       ↓
currRow (baris 4) :  1     3       3     1
```

### 3 Langkah Pembentukan Baris Baru

| Langkah | Aksi | Contoh (Baris ke-5 dari `[1, 3, 3, 1]`) |
|:---:|:---|:---|
| 1️⃣ | **Kiri selalu 1** — `currRow.push(1)` | `currRow = [1]` |
| 2️⃣ | **Loop tengah** — jumlahkan elemen berdampingan di `prevRow` | `1+3=4`, `3+3=6`, `3+1=4` → `currRow = [1, 4, 6, 4]` |
| 3️⃣ | **Kanan selalu 1** — `currRow.push(1)` | `currRow = [1, 4, 6, 4, 1]` ✅ |

### Batas Loop Penjumlahan

Loop tengah berjalan dari `col = 0` sampai `col < prevRow.length - 1`:

```
prevRow = [1, 3, 3, 1]   (panjang = 4)
Loop: col = 0 sampai col < 3 (yaitu col = 0, 1, 2)

col = 0: prevRow[0] + prevRow[1] = 1 + 3 = 4
col = 1: prevRow[1] + prevRow[2] = 3 + 3 = 6
col = 2: prevRow[2] + prevRow[3] = 3 + 1 = 4
```

> [!WARNING]
> ⚠️ **Kenapa `< prevRow.length - 1` dan bukan `< prevRow.length`?** Karena di dalam loop kita mengakses `prevRow[col + 1]`. Jika `col` mencapai indeks terakhir, maka `col + 1` akan mengakses elemen yang tidak ada (`undefined`), dan penjumlahan dengan `undefined` menghasilkan `NaN`!

---

<a name="langkah-4"></a>
## 🪄 Langkah 4 — Alternatif: Rumus Kombinatorial

Ada cara menghitung angka Segitiga Pascal **tanpa menyimpan baris sebelumnya** — menggunakan rumus Binomial Coefficient.

### Mantra: "Kali Sisa, Bagi Maju"

```
val = (val × (i - j)) / (j + 1)
       ─────────────    ───────
       KALI SISA        BAGI MAJU
```

- **Kali Sisa `(i - j)`**: Kalikan dengan sisa langkah menuju ujung baris.
- **Bagi Maju `(j + 1)`**: Bagi dengan nomor langkah maju selanjutnya.

### Simulasi di Baris ke-4 (`i = 4`)

| Kolom (`j`) | `val` saat ini | Cetak | Hitung val berikutnya | Hasil `val` baru |
|:---:|:---:|:---:|:---|:---:|
| 0 | 1 | **1** | `1 × (4-0) / (0+1)` = `1 × 4 / 1` | **4** |
| 1 | 4 | **4** | `4 × (4-1) / (1+1)` = `4 × 3 / 2` | **6** |
| 2 | 6 | **6** | `6 × (4-2) / (2+1)` = `6 × 2 / 3` | **4** |
| 3 | 4 | **4** | `4 × (4-3) / (3+1)` = `4 × 1 / 4` | **1** |
| 4 | 1 | **1** | *(loop selesai)* | — |

Output baris ke-4: **`1 4 6 4 1`** ✅ — Tanpa array, tanpa melihat baris sebelumnya!

> [!TIP]
> 💡 **Kapan pakai pendekatan mana?**
>
> | | Pendekatan Array | Pendekatan Matematika |
> |---|---|---|
> | 📝 | Logika mudah dipahami pemula | Butuh paham rumus Kombinatorial |
> | 🗃️ | Butuh memori untuk `prevRow` & `currRow` | Cukup 1 variabel `val` |
> | 🎯 | Cocok untuk belajar fundamental | Cocok untuk optimasi & interview |

---

<a name="langkah-5"></a>
## 📖 Langkah 5 — Kamus Variabel

Penamaan variabel yang deskriptif membuat kode mudah dibaca oleh siapapun:

| Lokasi / Peran | ✅ Rekomendasi | ❌ Hindari | Alasan |
|---|---|---|---|
| Penampung akhir | `pattern` | `res`, `string`, `s` | Kita mencetak **pola**, bukan sekadar "hasil" |
| Loop baris (luar) | `row` | `i`, `a`, `x` | Merepresentasikan baris ke-berapa |
| Pengingat baris sebelumnya | `prevRow` | `arr1`, `prev`, `p` | Deskriptif: *previous row* |
| Kotak baris saat ini | `currRow` | `arr2`, `curr`, `c` | Deskriptif: *current row* |
| Loop kolom (dalam) | `col` | `j`, `k`, `idx` | Konsisten dengan mental model **baris × kolom** |
| Nilai angka saat ini (Math) | `val` | `n`, `v`, `num` | Jelas bahwa ini adalah **value** angka yang dicetak |

> [!IMPORTANT]
> 🔔 **Kapan `i` dan `j` boleh dipakai?** Pada pendekatan Matematika (Versi 3) yang menggunakan 0-indexed, konvensi `i` (baris) dan `j` (kolom) sangat lazim dan bisa diterima karena rumus Kombinatorial memang biasa ditulis dengan notasi `C(i, j)`.

---

<a name="langkah-6"></a>
## 🗺️ Langkah 6 — Blueprint Kode

Kerangka kosong ini menjadi "peta" sebelum kita menulis kode yang sesungguhnya di Part 03–05.

### Blueprint A: Pendekatan Array (1-Indexed)

```javascript
// 🗺️ KERANGKA KODE (Mental Model: Kotak Array Baris per Baris)

function pascalTriangle(num) {
  let pattern = '';                          // [KANVAS] penampung pola akhir
  let prevRow = [];                          // [MEMORI] pengingat baris sebelumnya

  for (let row = 1; row <= num; row++) {     // [LOOP UTAMA] → baris ke-berapa
    pattern += ' '.repeat(num - row);        //   [SPASI] → dorong ke kanan

    let currRow = [];                        //   [KOTAK] → array baris saat ini
    if (row === 1) {
      currRow.push(1);                       //   [PUNCAK] → baris pertama selalu [1]
    } else {
      currRow.push(1);                       //   [KIRI] → ujung kiri selalu 1
      for (let col = 0; ...) {               //   [TENGAH] → jumlahkan prevRow
        currRow.push(prevRow[col] + prevRow[col + 1]);
      }
      currRow.push(1);                       //   [KANAN] → ujung kanan selalu 1
    }

    pattern += currRow.join(' ') + '\n';     //   [GABUNG] → array → string
    prevRow = currRow;                       //   [UPDATE] → simpan untuk baris berikutnya
  }

  return pattern;
}
```

### Blueprint B: Pendekatan Matematika (0-Indexed)

```javascript
// 🗺️ KERANGKA KODE (Mental Model: Kali Sisa, Bagi Maju)

function pascalTriangleMath(num) {
  let pattern = '';                          // [KANVAS] penampung pola akhir

  for (let i = 0; i < num; i++) {            // [LOOP BARIS] → 0-indexed
    pattern += ' '.repeat(num - i - 1);      //   [SPASI] → rumus disesuaikan

    let val = 1;                             //   [AWAL] → selalu mulai dari 1
    for (let j = 0; j <= i; j++) {           //   [LOOP KOLOM] → cetak & hitung
      pattern += val + ' ';                  //     [CETAK] → tampilkan angka
      val = (val * (i - j)) / (j + 1);      //     [RUMUS] → Kali Sisa, Bagi Maju
    }

    pattern += '\n';                         //   [PINDAH BARIS]
  }

  return pattern;
}
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 01 — Challenge Overview](./01-challenge-overview_gambaran-challenge.md)**
- **📖 [Lanjut ke Part 03 — V1 Nested Loop Array →](./03-v1-nested-loop-array_pendekatan-array-loop-bersarang.md)**
