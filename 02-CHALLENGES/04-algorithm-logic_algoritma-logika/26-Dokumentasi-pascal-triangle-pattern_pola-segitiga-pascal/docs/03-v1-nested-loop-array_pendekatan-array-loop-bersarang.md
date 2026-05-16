# 🔧 V1 — Nested Loop Array — Pendekatan Array Loop Bersarang

### ✨ _Solusi pertama yang dibangun step-by-step dari nol — menggunakan nested `for` loop dan Array `prevRow`/`currRow`_

> 🎯 **Tujuan:** Mendokumentasikan proses membangun solusi secara bertahap dari Fase 2 sesi mentoring — mulai dari kerangka spasi, lalu menambahkan logika Array satu per satu hingga kode berfungsi sempurna.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Nested%20Loop%20|%20Array-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V1-purple?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🪜 | [Pendekatan Bertahap](#bertahap) | 4 step membangun kode dari nol |
| 🧠 | [Algoritma Tahan Lupa](#algoritma) | Setiap langkah dengan "Kenapa" + contoh angka |
| 💻 | [Kode Final V1](#kode) | Kode lengkap yang sudah berfungsi |
| 🎞️ | [Simulasi Eksekusi](#simulasi) | Tracing langkah demi langkah untuk `num = 5` |
| ⚠️ | [Gotchas & Jebakan](#gotchas) | Kesalahan yang ditemukan saat proses building |

---

<a name="bertahap"></a>
## 🪜 Pendekatan Bertahap (Step-by-Step Building)

Kode ini **tidak ditulis sekaligus**. Kita membangunnya selangkah demi selangkah agar setiap bagian dipahami sebelum menambahkan yang baru.

### Step 1 — Kerangka Spasi Pendorong

Langkah pertama: buat piramida kosong dengan spasi pendorong saja, tanpa angka.

```javascript
const pascalTriangle = (num) => {
  let pattern = '';

  for (let row = 1; row <= num; row++) {
    for (let space = 1; space <= num - row; space++) {
      pattern += '#'; // Pakai '#' agar spasi terlihat saat debugging
    }

    pattern += '\n';
  }

  return pattern;
};
```

> 💡 **Tips debugging:** Mengganti spasi dengan karakter `#` adalah kebiasaan sehat agar kita bisa **melihat** apakah jumlah spasi sudah benar sebelum melanjutkan.

**Output saat ini:**
```
####
###
##
#

```

✅ Spasi pendorong sudah membentuk "tangga terbalik" — fondasi piramida kita sudah benar.

---

### Step 2 — Menambahkan Variabel Array & Baris Pertama

Sekarang tambahkan struktur Array dan logika untuk baris pertama (puncak piramida).

```javascript
const pascalTriangle = (num) => {
  let pattern = '';
  let prevRow = []; // Pengingat baris sebelumnya

  for (let row = 1; row <= num; row++) {
    for (let space = 1; space <= num - row; space++) {
      pattern += ' ';
    }

    let currRow = []; // Kotak untuk baris saat ini
    if (row === 1) {
      currRow.push(1); // Puncak piramida selalu [1]
    } else {
      // (Belum diisi — nanti Step 3)
    }

    pattern += currRow.join(' '); // Gabungkan array → string
    prevRow = currRow;            // Simpan untuk baris berikutnya
    pattern += '\n';
  }

  return pattern;
};
```

**Output saat ini:**
```
    1


 
 
```

✅ Angka `1` sudah muncul di puncak dengan spasi yang benar.

> [!WARNING]
> ⚠️ **Jebakan `.push()` yang ditemukan di step ini:**
> Awalnya saya menulis `pattern += currRow.push(1)` — menggabungkan push langsung ke pattern. Ini **SALAH** karena `.push()` mengembalikan **panjang array baru** (angka `1`), bukan isi array-nya. Hasilnya terlihat benar secara kebetulan, tapi logikanya keliru!
>
> ❌ `pattern += currRow.push(1)` → Menambahkan angka "1" (panjang array), bukan isi array
> ✅ `currRow.push(1)` lalu `pattern += currRow.join(' ')` → Benar!

---

### Step 3 — Mengisi Blok `else` (Logika Inti)

Ini adalah jantung dari Segitiga Pascal — 3 langkah "Kotak Array":

```javascript
    } else {
      // 1. Kiri selalu 1
      currRow.push(1);

      // 2. Loop angka tengah — jumlahkan elemen berdampingan dari prevRow
      for (let col = 0; col < prevRow.length - 1; col++) {
        currRow.push(prevRow[col] + prevRow[col + 1]);
      }

      // 3. Kanan selalu 1
      currRow.push(1);
    }
```

> [!WARNING]
> ⚠️ **Jebakan batas loop yang ditemukan di step ini:**
> Awalnya saya menulis `col < prevRow.length` (tanpa `-1`). Simulasi membuktikan ini error:
>
> ```
> prevRow = [1, 1]  (panjang = 2)
> 
> col = 0: prevRow[0] + prevRow[1] = 1 + 1 = 2      ✅ Benar
> col = 1: prevRow[1] + prevRow[2] = 1 + undefined   ❌ NaN!
> ```
>
> Solusi: Gunakan `col < prevRow.length - 1` agar indeks terakhir tidak melampaui array.

---

### Step 4 — Menyatukan Semua & Update `prevRow`

Setelah dipastikan semuanya benar, kita tidak boleh lupa satu hal krusial: **menyimpan `currRow` ke `prevRow`** agar baris berikutnya bisa melihat isi baris saat ini.

```javascript
    pattern += currRow.join(' '); // Array → String dengan pemisah spasi
    prevRow = currRow;            // ← WAJIB! Tanpa ini, baris berikutnya tidak punya data
    pattern += '\n';
```

> [!CAUTION]
> 🔴 **Tanpa `prevRow = currRow`**, semua baris setelah baris pertama akan kosong karena `prevRow` tetap `[]` (array kosong). Ini adalah kesalahan yang sulit di-debug karena tidak menghasilkan error — hanya output yang salah.

---

<a name="algoritma"></a>
## 🧠 Algoritma Tahan Lupa

Setiap langkah dijelaskan dengan **Label Peran**, **Kenapa**, dan **Contoh Angka Konkret**:

1. **Menyiapkan Kanvas & Memori `[INISIALISASI]`**:
   - Buat `pattern = ''` dan `prevRow = []`. *(Kenapa prevRow kosong di awal? Karena baris pertama tidak punya baris di atasnya untuk dirujuk. Kondisi `row === 1` akan menangani kasus ini secara khusus.)*

2. **Membentuk Tinggi Piramida `[FOR LOOP UTAMA]`** (Iterasi `row` dari 1 sampai `num`):

   - **Spasi Pendorong `[NESTED LOOP SPASI]`**: Cetak spasi sebanyak `num - row`. *(Kenapa: Semakin turun baris, piramida makin lebar sehingga spasi pendorong berkurang. Contoh: num=5, baris ke-2 → 5-2 = 3 spasi, baris ke-5 → 5-5 = 0 spasi.)*

   - **Puncak Piramida `[PENGKONDISIAN row === 1]`**: Jika baris pertama, cukup `currRow.push(1)`. *(Kenapa: Puncak Segitiga Pascal selalu hanya berisi angka 1. Tidak ada baris di atasnya untuk dijumlahkan.)*

   - **Kiri Selalu 1 `[PUSH AWAL]`**: `currRow.push(1)`. *(Kenapa: Properti matematis Segitiga Pascal — tepi kiri selalu bernilai 1, ini setara dengan C(n,0) = 1.)*

   - **Angka Tengah `[NESTED LOOP PENJUMLAHAN]`**: Loop `col` dari 0 sampai `< prevRow.length - 1`, lalu `currRow.push(prevRow[col] + prevRow[col+1])`. *(Kenapa dikurangi 1? Agar `col+1` tidak melampaui batas array. Contoh: prevRow = [1,3,3,1] → col berjalan 0,1,2 → menghasilkan 4,6,4.)*

   - **Kanan Selalu 1 `[PUSH AKHIR]`**: `currRow.push(1)`. *(Kenapa: Sama seperti tepi kiri, tepi kanan Segitiga Pascal selalu 1, ini setara dengan C(n,n) = 1.)*

   - **Penggabungan `[JOIN + NEWLINE]`**: `pattern += currRow.join(' ') + '\n'`. *(Kenapa `.join(' ')` bukan `.join('')`? Agar antar angka ada pemisah spasi supaya pola terbaca dengan jelas.)*

   - **Update Memori `[ASSIGNMENT]`**: `prevRow = currRow`. *(Kenapa: Baris yang baru saja dibentuk akan menjadi "baris sebelumnya" untuk iterasi berikutnya. Tanpa langkah ini, prevRow tetap kosong selamanya.)*

---

<a name="kode"></a>
## 💻 Kode Final V1

```javascript
const pascalTriangle = (num) => {
  let pattern = '';
  let prevRow = [];

  for (let row = 1; row <= num; row++) {
    // 1. Spasi Pendorong
    for (let space = 1; space <= num - row; space++) {
      pattern += ' ';
    }

    // 2. Membentuk Baris Saat Ini
    let currRow = [];
    if (row === 1) {
      currRow.push(1);
    } else {
      currRow.push(1); // Kiri selalu 1

      for (let col = 0; col < prevRow.length - 1; col++) {
        currRow.push(prevRow[col] + prevRow[col + 1]);
      }

      currRow.push(1); // Kanan selalu 1
    }

    // 3. Gabungkan & Simpan
    pattern += currRow.join(' ') + '\n';
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

<a name="simulasi"></a>
## 🎞️ Simulasi Eksekusi (`num = 5`)

### Iterasi per Baris

```
═══════════════════════════════════════════════════════════════
ROW 1: prevRow = []
═══════════════════════════════════════════════════════════════
  Spasi: 5-1 = 4 → "    "
  Kondisi: row === 1 → currRow.push(1)
  currRow = [1]
  pattern += "    " + "1" + "\n"
  prevRow = [1]

═══════════════════════════════════════════════════════════════
ROW 2: prevRow = [1]
═══════════════════════════════════════════════════════════════
  Spasi: 5-2 = 3 → "   "
  Masuk else:
    push(1)       → currRow = [1]
    Loop tengah:  prevRow.length - 1 = 0 → LOOP TIDAK JALAN
                  (Karena 0 < 0 adalah false)
    push(1)       → currRow = [1, 1]
  pattern += "   " + "1 1" + "\n"
  prevRow = [1, 1]

═══════════════════════════════════════════════════════════════
ROW 3: prevRow = [1, 1]
═══════════════════════════════════════════════════════════════
  Spasi: 5-3 = 2 → "  "
  Masuk else:
    push(1)       → currRow = [1]
    Loop tengah:  prevRow.length - 1 = 1 → col = 0
      col=0: prevRow[0] + prevRow[1] = 1 + 1 = 2 → push(2)
    push(1)       → currRow = [1, 2, 1]
  pattern += "  " + "1 2 1" + "\n"
  prevRow = [1, 2, 1]

═══════════════════════════════════════════════════════════════
ROW 4: prevRow = [1, 2, 1]
═══════════════════════════════════════════════════════════════
  Spasi: 5-4 = 1 → " "
  Masuk else:
    push(1)       → currRow = [1]
    Loop tengah:  prevRow.length - 1 = 2 → col = 0, 1
      col=0: 1 + 2 = 3 → push(3)
      col=1: 2 + 1 = 3 → push(3)
    push(1)       → currRow = [1, 3, 3, 1]
  pattern += " " + "1 3 3 1" + "\n"
  prevRow = [1, 3, 3, 1]

═══════════════════════════════════════════════════════════════
ROW 5: prevRow = [1, 3, 3, 1]
═══════════════════════════════════════════════════════════════
  Spasi: 5-5 = 0 → ""
  Masuk else:
    push(1)       → currRow = [1]
    Loop tengah:  prevRow.length - 1 = 3 → col = 0, 1, 2
      col=0: 1 + 3 = 4 → push(4)
      col=1: 3 + 3 = 6 → push(6)
      col=2: 3 + 1 = 4 → push(4)
    push(1)       → currRow = [1, 4, 6, 4, 1]
  pattern += "" + "1 4 6 4 1" + "\n"
  prevRow = [1, 4, 6, 4, 1]
```

---

<a name="gotchas"></a>
## ⚠️ Gotchas & Jebakan

Berikut adalah kesalahan yang **benar-benar ditemukan** selama proses building di sesi mentoring:

> ⚠️ **Gotcha 1 — `.push()` return value**
> Method `Array.push()` mengembalikan **panjang array baru**, bukan isi array.
> ```javascript
> // ❌ SALAH
> pattern += currRow.push(1); // Menambahkan angka "1" (panjang), bukan array
>
> // ✅ BENAR
> currRow.push(1);
> pattern += currRow.join(' ');
> ```

> ⚠️ **Gotcha 2 — Batas loop `< prevRow.length` tanpa `-1`**
> Saat `col` mencapai indeks terakhir, `prevRow[col + 1]` mengakses `undefined`.
> ```javascript
> // ❌ SALAH — menghasilkan NaN
> for (let col = 0; col < prevRow.length; col++)
>
> // ✅ BENAR — aman dari undefined
> for (let col = 0; col < prevRow.length - 1; col++)
> ```

> ⚠️ **Gotcha 3 — Lupa `prevRow = currRow`**
> Tanpa update ini, `prevRow` tetap `[]` selamanya. Tidak ada error message — hanya output kosong setelah baris pertama. Bug yang sangat sulit dilacak!

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 02 — Problem Solving Approach](./02-problem-solving-approach_alur-berpikir.md)**
- **📖 [Lanjut ke Part 04 — V2 Declarative Array Repeat →](./04-v2-declarative-array-repeat_pendekatan-array-deklaratif.md)**
