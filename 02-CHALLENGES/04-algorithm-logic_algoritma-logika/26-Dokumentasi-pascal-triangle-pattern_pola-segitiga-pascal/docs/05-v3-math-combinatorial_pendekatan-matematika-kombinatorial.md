# 🪄 V3 — Math Combinatorial — Pendekatan Matematika Kombinatorial

### ✨ _Pendekatan tanpa Array: menghitung angka secara on-the-fly menggunakan rumus Binomial Coefficient_

> 🎯 **Tujuan:** Mendokumentasikan pendekatan *advanced* yang dieksplorasi di akhir sesi mentoring — di mana kita membuang semua Array (`prevRow`, `currRow`) dan menghitung setiap angka langsung menggunakan rumus matematika. Ingat mantra: **"Kali Sisa, Bagi Maju"**.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Binomial%20Coefficient%20|%20Math-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V3%20Advanced-orange?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 💡 | [Ide Utama: Mengapa Tanpa Array?](#ide) | Perbedaan fundamental dengan V1/V2 |
| 🪄 | [Mantra "Kali Sisa, Bagi Maju"](#mantra) | Penjelasan rumus + simulasi per kolom |
| 🪜 | [Pendekatan Bertahap](#bertahap) | 2 step membangun kode dari nol |
| 🧠 | [Algoritma Tahan Lupa](#algoritma) | Setiap langkah dengan "Kenapa" + contoh angka |
| 💻 | [Kode Final V3](#kode) | Kode lengkap yang sudah berfungsi |
| 🎞️ | [Simulasi Eksekusi](#simulasi) | Tracing semua baris untuk `num = 5` |
| ⚠️ | [Gotchas & Catatan](#gotchas) | Hal-hal yang perlu diperhatikan |

---

<a name="ide"></a>
## 💡 Ide Utama: Mengapa Tanpa Array?

Di V1 dan V2, kita **harus menyimpan baris sebelumnya** (`prevRow`) agar bisa menghitung angka baris saat ini. Ini memakan memori sebanding dengan ukuran piramida.

V3 mengambil pendekatan yang **fundamentally berbeda**: setiap angka di baris manapun bisa dihitung langsung dari angka sebelumnya *di baris yang sama* — tanpa perlu melihat baris atas sama sekali.

```
V1/V2: "Untuk tahu angka berikutnya, saya perlu melihat baris di atas saya."
                    ↓
V3:    "Untuk tahu angka berikutnya, saya cukup mengubah angka saya sendiri."
```

**Rahasianya?** Rumus **Binomial Coefficient** — sebuah properti matematis Segitiga Pascal yang memungkinkan kita menghitung `C(i, j+1)` langsung dari `C(i, j)`.

---

<a name="mantra"></a>
## 🪄 Mantra: "Kali Sisa, Bagi Maju"

Rumus untuk menghitung angka berikutnya dalam baris yang sama:

```
val = (val × (i - j)) / (j + 1)
       ─────────────    ───────
       KALI SISA        BAGI MAJU
```

### Membedah Rumus

| Bagian | Nama | Arti | Perilaku |
|:---:|:---|:---|:---|
| `val` | Angka saat ini | Angka yang baru saja kita cetak | Menjadi basis perhitungan |
| `(i - j)` | **Sisa Langkah** | Jarak dari posisi kita ke ujung baris | Mengecil setiap kolom → val turun |
| `(j + 1)` | **Langkah Maju** | Nomor langkah berikutnya (karena j mulai dari 0) | Membesar setiap kolom → val turun |

### Kalimat untuk Mengingat

> *"Untuk mencari angka berikutnya, **kalikan** angka saat ini dengan **sisa langkah** ke ujung, lalu **bagi** dengan nomor **langkah maju** selanjutnya."*

### Simulasi Visual: Baris ke-4 (`i = 4`)

Target output: `1 4 6 4 1`

```
Mulai: val = 1 (selalu dimulai dari 1)

┌─────────┬──────────┬───────────────────────────────┬──────────┐
│ Kolom j │ Cetak    │ Hitung val berikutnya         │ val baru │
├─────────┼──────────┼───────────────────────────────┼──────────┤
│ j = 0   │ 🖨️ "1"  │ 1 × (4-0) / (0+1) = 1×4/1   │ → 4      │
│ j = 1   │ 🖨️ "4"  │ 4 × (4-1) / (1+1) = 4×3/2   │ → 6      │
│ j = 2   │ 🖨️ "6"  │ 6 × (4-2) / (2+1) = 6×2/3   │ → 4      │
│ j = 3   │ 🖨️ "4"  │ 4 × (4-3) / (3+1) = 4×1/4   │ → 1      │
│ j = 4   │ 🖨️ "1"  │ (loop selesai)                │ —        │
└─────────┴──────────┴───────────────────────────────┴──────────┘

Output: 1 4 6 4 1 ✅
```

> 💡 **Perhatikan pola simetris:** Pengali (Sisa) mengecil `4→3→2→1`, sedangkan pembagi (Maju) membesar `1→2→3→4`. Ini yang membuat angka-angka Segitiga Pascal naik di tengah dan turun kembali di ujung — membentuk kurva lonceng yang simetris.

---

<a name="bertahap"></a>
## 🪜 Pendekatan Bertahap (Step-by-Step Building)

### Step 1 — Kerangka Spasi + Loop Kolom Kosong

Pertama, buat piramida dengan spasi dan loop kolom yang belum mengisi angka. Versi ini menggunakan **0-indexed** (`i` mulai dari 0):

```javascript
const pascalTriangle = (num) => {
  let pattern = '';

  for (let i = 0; i < num; i++) {
    pattern += ' '.repeat(num - i - 1); // Spasi: rumus disesuaikan (0-indexed)

    let val = 1; // Angka pertama selalu 1

    for (let j = 0; j <= i; j++) {
      pattern += val + ' '; // Cetak angka saat ini
      // (Rumus belum ditambahkan — semua angka masih 1)
    }

    pattern += '\n';
  }

  return pattern;
};
```

> [!WARNING]
> ⚠️ **Jebakan batas loop kolom:**
> Awalnya saya menulis `j < i` (tanpa tanda sama dengan). Ini menyebabkan baris pertama (`i = 0`) tidak mencetak angka sama sekali karena `0 < 0` langsung `false`. Harus menggunakan `j <= i` agar baris pertama tetap mencetak 1 angka.

---

### Step 2 — Tambahkan Rumus "Kali Sisa, Bagi Maju"

Sisipkan satu baris rumus di bawah `pattern += val + ' '`:

```javascript
      pattern += val + ' ';

      // Mantra: Kali Sisa (i - j), Bagi Maju (j + 1)
      val = (val * (i - j)) / (j + 1);
```

Selesai! Hanya dengan menambahkan **1 baris kode**, piramida angka 1 berubah menjadi Segitiga Pascal yang sempurna.

---

<a name="algoritma"></a>
## 🧠 Algoritma Tahan Lupa

1. **Menyiapkan Kanvas `[INISIALISASI]`**:
   - Buat `pattern = ''`. *(Kenapa tidak ada `prevRow`? Karena V3 tidak butuh Array sama sekali — setiap angka dihitung secara mandiri dari angka sebelumnya di baris yang sama.)*

2. **Membentuk Tinggi Piramida `[FOR LOOP BARIS]`** (Iterasi `i` dari 0 sampai `< num`):

   - **Spasi Pendorong `[STRING.REPEAT]`**: `' '.repeat(num - i - 1)`. *(Kenapa ada `-1` tambahan? Karena `i` dimulai dari 0, bukan 1. Contoh: num=5, baris pertama (`i=0`) → 5-0-1 = 4 spasi.)*

   - **Nilai Awal `[INISIALISASI val]`**: `let val = 1`. *(Kenapa selalu 1? Karena setiap baris Segitiga Pascal selalu dimulai dengan angka 1, ini setara dengan C(n,0) = 1.)*

   - **Cetak & Hitung `[FOR LOOP KOLOM]`**: Loop `j` dari 0 sampai `<= i`:
     - Cetak `val` ke pattern. *(Kenapa cetak dulu baru hitung? Karena `val` saat ini sudah berisi angka yang benar untuk kolom ini. Setelah dicetak, kita siapkan `val` untuk kolom berikutnya.)*
     - Hitung angka berikutnya: `val = (val * (i - j)) / (j + 1)`. *(Kenapa "Kali Sisa"? Sisa langkah `(i-j)` mengecil setiap kolom sehingga angka mulai turun kembali. "Bagi Maju"? Langkah `(j+1)` membesar setiap kolom sebagai penyeimbang. Contoh i=4, j=1: val=4 × 3/2 = 6.)*

   - **Pindah Baris `[NEWLINE]`**: `pattern += '\n'`.

---

<a name="kode"></a>
## 💻 Kode Final V3

```javascript
const pascalTriangle = (num) => {
  let pattern = '';

  for (let i = 0; i < num; i++) {
    // 1. Spasi Pendorong (0-indexed, maka perlu -1)
    pattern += ' '.repeat(num - i - 1);

    // 2. Loop Kolom: Cetak & Hitung Angka Berikutnya
    let val = 1;

    for (let j = 0; j <= i; j++) {
      pattern += val + ' ';

      // Mantra: Kali Sisa (i - j), Bagi Maju (j + 1)
      val = (val * (i - j)) / (j + 1);
    }

    pattern += '\n';
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

<a name="simulasi"></a>
## 🎞️ Simulasi Eksekusi (`num = 5`)

```
═══════════════════════════════════════════════════════════════
BARIS i=0: Spasi = 5-0-1 = 4
═══════════════════════════════════════════════════════════════
  val = 1
  j=0: cetak "1"  → val = (1×0)/(1) = 0  (loop selesai, j <= 0)
  Output: "    1 "

═══════════════════════════════════════════════════════════════
BARIS i=1: Spasi = 5-1-1 = 3
═══════════════════════════════════════════════════════════════
  val = 1
  j=0: cetak "1"  → val = (1×1)/(1) = 1
  j=1: cetak "1"  → val = (1×0)/(2) = 0  (loop selesai)
  Output: "   1 1 "

═══════════════════════════════════════════════════════════════
BARIS i=2: Spasi = 5-2-1 = 2
═══════════════════════════════════════════════════════════════
  val = 1
  j=0: cetak "1"  → val = (1×2)/(1) = 2
  j=1: cetak "2"  → val = (2×1)/(2) = 1
  j=2: cetak "1"  → val = (1×0)/(3) = 0  (loop selesai)
  Output: "  1 2 1 "

═══════════════════════════════════════════════════════════════
BARIS i=3: Spasi = 5-3-1 = 1
═══════════════════════════════════════════════════════════════
  val = 1
  j=0: cetak "1"  → val = (1×3)/(1) = 3
  j=1: cetak "3"  → val = (3×2)/(2) = 3
  j=2: cetak "3"  → val = (3×1)/(3) = 1
  j=3: cetak "1"  → val = (1×0)/(4) = 0  (loop selesai)
  Output: " 1 3 3 1 "

═══════════════════════════════════════════════════════════════
BARIS i=4: Spasi = 5-4-1 = 0
═══════════════════════════════════════════════════════════════
  val = 1
  j=0: cetak "1"  → val = (1×4)/(1) = 4
  j=1: cetak "4"  → val = (4×3)/(2) = 6
  j=2: cetak "6"  → val = (6×2)/(3) = 4
  j=3: cetak "4"  → val = (4×1)/(4) = 1
  j=4: cetak "1"  → val = (1×0)/(5) = 0  (loop selesai)
  Output: "1 4 6 4 1 "
```

---

<a name="gotchas"></a>
## ⚠️ Gotchas & Catatan

> ⚠️ **Gotcha 1 — Batas loop kolom `j < i` vs `j <= i`**
> Jika menggunakan `j < i`, baris pertama (`i = 0`) tidak mencetak angka sama sekali karena kondisi `0 < 0` langsung `false`. Harus `j <= i`.

> ⚠️ **Gotcha 2 — Spasi 0-indexed butuh `-1` tambahan**
> Rumus spasi di V1/V2 (1-indexed) adalah `num - row`. Di V3 (0-indexed), karena `i` dimulai dari 0, rumusnya menjadi `num - i - 1`. Tanpa `-1`, piramida akan terlalu menjorok ke kanan.

> ⚠️ **Gotcha 3 — Rumus hanya bekerja di 0-indexed**
> Mantra "Kali Sisa, Bagi Maju" `(val * (i - j)) / (j + 1)` dirancang untuk indeks yang dimulai dari 0. Jika kamu menggunakan 1-indexed (`i` dan `j` mulai dari 1), rumusnya harus disesuaikan menjadi `(val * (i - j)) / j` — yang lebih rawan error.

> [!NOTE]
> 💡 **Trailing space:** Kode V3 menghasilkan satu spasi tambahan di akhir setiap baris (`val + ' '`). Untuk kebanyakan penggunaan ini tidak masalah, tapi jika diperlukan output yang presisi, bisa ditambahkan `.trimEnd()` pada setiap baris atau menggunakan logika ternary: `val + (j === i ? '' : ' ')`.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 04 — V2 Declarative Array Repeat](./04-v2-declarative-array-repeat_pendekatan-array-deklaratif.md)**
- **📖 [Lanjut ke Part 06 — All Versions Comparison →](./06-all-versions-comparison_perbandingan-semua-versi.md)**
