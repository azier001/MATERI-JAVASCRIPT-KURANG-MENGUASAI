# 📋 Challenge Overview — Gambaran Challenge

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Nested%20Loop%20|%20Array%20|%20Math-blue?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🧩 | [Deskripsi Challenge](#deskripsi) | Penjelasan soal dan tujuan fungsi |
| 📏 | [Aturan Challenge](#aturan) | Format input, output, dan ketentuan penting |
| 📤 | [Contoh Input & Output](#contoh) | Visualisasi output untuk berbagai nilai `num` |
| 🧠 | [Pemahaman Awal](#pemahaman) | Pertanyaan kunci & diagram alur sebelum ngoding |

---

<a name="deskripsi"></a>
## 🧩 Deskripsi Challenge

Bayangkan kamu seorang arsitek digital yang diminta membuat sebuah piramida angka. Tapi ini bukan piramida biasa — ini adalah **Segitiga Pascal**, di mana setiap angka di tengah merupakan hasil penjumlahan dari dua angka yang berada tepat di atasnya. Pola ini terkenal di dunia matematika dan sering muncul di berbagai bidang mulai dari probabilitas hingga kombinatorika.

Secara teknis, buat fungsi `pascalTriangle(num)` yang menerima satu parameter:
- **`num`** (integer) — jumlah baris Segitiga Pascal yang ingin dicetak.

Fungsi ini harus mengembalikan sebuah **string** yang membentuk pola piramida Segitiga Pascal, di mana:
- Setiap baris diawali dan diakhiri dengan angka `1`.
- Angka di tengah dihitung dari penjumlahan dua angka di baris atasnya.
- Piramida diratakan ke tengah menggunakan **spasi pendorong** di sisi kiri.

> ⚠️ **Catatan penting:** Challenge ini menguji kemampuan **nested loop**, pemahaman **Array** sebagai penampung data sementara, dan opsional **rumus Matematika Kombinatorial** — tiga konsep yang saling melengkapi.

---

<a name="aturan"></a>
## 📏 Aturan Challenge

| Aturan | Keterangan |
|--------|------------|
| 📦 Format Input | `num`: integer positif (jumlah baris piramida) |
| 📤 Format Output | String multiline membentuk piramida Segitiga Pascal |
| 📐 Spasi Pendorong | Setiap baris diawali spasi sebanyak `num - row` (agar piramida rata tengah) |
| 1️⃣ Ujung Baris | Setiap baris **selalu** diawali dan diakhiri dengan angka `1` |
| ➕ Angka Tengah | Dihitung dari penjumlahan dua angka berdampingan di baris sebelumnya |
| 🔢 Pemisah Angka | Antar angka dalam satu baris dipisahkan oleh **1 spasi** |

> [!IMPORTANT]
> 🔔 **Inti Logika Segitiga Pascal:** Angka di posisi `[baris][kolom]` = angka di posisi `[baris-1][kolom-1]` + angka di posisi `[baris-1][kolom]`. Inilah yang membedakan Segitiga Pascal dari pola bintang biasa.

---

<a name="contoh"></a>
## 📤 Contoh Input & Output

```javascript
console.log(pascalTriangle(1));
// Output:
// 1
```

```javascript
console.log(pascalTriangle(3));
// Output:
//   1
//  1 1
// 1 2 1
```

```javascript
console.log(pascalTriangle(5));
// Output:
//     1
//    1 1
//   1 2 1
//  1 3 3 1
// 1 4 6 4 1
```

### Kenapa `pascalTriangle(5)` menghasilkan pola tersebut?

```
Mulai dengan num = 5

Baris 1: Spasi = 5-1 = 4 → "    " + [1]           → "    1"
Baris 2: Spasi = 5-2 = 3 → "   "  + [1, 1]         → "   1 1"
Baris 3: Spasi = 5-3 = 2 → "  "   + [1, 2, 1]      → "  1 2 1"
         └─ Angka 2 berasal dari: 1 + 1 (baris atasnya)
Baris 4: Spasi = 5-4 = 1 → " "    + [1, 3, 3, 1]   → " 1 3 3 1"
         └─ Angka 3 berasal dari: 1 + 2 dan 2 + 1
Baris 5: Spasi = 5-5 = 0 → ""     + [1, 4, 6, 4, 1] → "1 4 6 4 1"
         └─ Angka 4 dari: 1 + 3, Angka 6 dari: 3 + 3, Angka 4 dari: 3 + 1
```

### Visualisasi Hubungan Antar Angka

```
        1              Baris 1: Puncak piramida
       / \
      1   1             Baris 2: Selalu [1, 1]
     / \ / \
    1   2   1           Baris 3: 2 = 1+1
   / \ / \ / \
  1   3   3   1         Baris 4: 3 = 1+2, 3 = 2+1
 / \ / \ / \ / \
1   4   6   4   1       Baris 5: 4 = 1+3, 6 = 3+3, 4 = 3+1
```

> 💡 **Perhatikan:** Setiap angka di tengah selalu merupakan **penjumlahan dua angka yang terhubung langsung di atasnya** (visualisasi garis `/` dan `\`). Angka di tepi kiri dan tepi kanan selalu `1`.

---

<a name="pemahaman"></a>
## 🧠 Pemahaman Awal

Sebelum menulis kode, ada 3 pertanyaan kunci yang harus dijawab:

**1. 📐 Bagaimana cara membentuk piramida yang rata tengah?**
> Gunakan **spasi pendorong** di awal setiap baris. Rumusnya: `num - row`. Semakin ke bawah, spasi makin sedikit sehingga angka bergeser ke kiri dan membentuk piramida.

**2. ➕ Bagaimana cara menghitung angka-angka di setiap baris?**
> Ada **dua pendekatan**:
> - **Pendekatan Array:** Simpan baris sebelumnya (`prevRow`), lalu jumlahkan elemen berdampingan untuk membentuk baris baru (`currRow`). Baris selalu diawali dan diakhiri dengan `1`.
> - **Pendekatan Matematika:** Gunakan rumus Kombinatorial. Dari angka saat ini (`val`), angka berikutnya = `val × (i-j) / (j+1)` — mantra: **"Kali Sisa, Bagi Maju"**.

**3. 🗃️ Bagaimana cara menyimpan dan menampilkan hasilnya?**
> Gunakan variabel `pattern` (string) sebagai kanvas. Setiap baris, gabungkan array angka dengan `.join(' ')`, tambahkan `\n`, dan simpan ke `pattern`.

```
pascalTriangle(num)
  │
  ├── num === 1 → return "1\n"                    ← EDGE CASE
  │
  └── num > 1
        │
        ├── PENDEKATAN A: Array
        │     ├── STEP 1: Cetak spasi (.repeat)
        │     ├── STEP 2: Buat currRow dari prevRow
        │     │     ├── Push(1) di awal
        │     │     ├── Loop: prevRow[col] + prevRow[col+1]
        │     │     └── Push(1) di akhir
        │     ├── STEP 3: Gabung ke pattern (.join)
        │     └── STEP 4: Update prevRow = currRow
        │
        └── PENDEKATAN B: Matematika
              ├── STEP 1: Cetak spasi (.repeat)
              ├── STEP 2: val = 1 (selalu mulai dari 1)
              ├── STEP 3: Loop kolom
              │     ├── Cetak val
              │     └── val = (val × (i-j)) / (j+1)
              └── STEP 4: Pindah baris
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 02 — Problem Solving Approach →](./02-problem-solving-approach_alur-berpikir.md)**
