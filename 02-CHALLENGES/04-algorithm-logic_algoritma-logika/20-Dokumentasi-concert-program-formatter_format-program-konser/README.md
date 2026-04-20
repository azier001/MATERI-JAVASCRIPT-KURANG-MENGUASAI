# 🎵 Rustic Village Church Concert Program Formatter

> **Platform:** [Coddy.tech](https://coddy.tech) — JavaScript Challenge (Easy)
> **Tanggal Belajar:** 21 April 2026

---

## 📑 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan-challenge)
- 📝 [Aturan yang Harus Dipenuhi](#aturan-yang-harus-dipenuhi)
- 🚫 [Langkah 1 — Skip Lagu "Forbidden" (continue)](#langkah-1)
- 🔢 [Langkah 2 — Counter Terpisah untuk maxPieces (break)](#langkah-2)
- ✂️ [Langkah 3 — Pemotongan Nama Komposer (Truncation)](#langkah-3)
- 🧩 [Langkah 4 — Logika Separator: Koma & Newline](#langkah-4)
- ✅ [Kode Final Lengkap](#kode-final-lengkap)
- 🔬 [Perbandingan dengan Solusi Coddy](#perbandingan-solusi)
- 💡 [Pelajaran yang Didapat](#pelajaran-yang-didapat)

---

<a name="pengenalan-challenge"></a>
## 🎯 Pengenalan Challenge

Tugasnya adalah membuat fungsi `formatConcertProgram` yang menerima **3 parameter**:

| Parameter    | Tipe     | Keterangan                                      |
|-------------|----------|--------------------------------------------------|
| `composers` | Array    | Daftar nama komposer                             |
| `pieces`    | Array    | Daftar judul lagu (urutan sama dengan komposer)  |
| `maxPieces` | Number   | Batas maksimal lagu yang ditampilkan              |

Fungsi ini akan mengembalikan **string** berisi program konser yang sudah diformat rapi.

### 🖼️ Gambaran Besar

```
INPUT:
  composers  → ["Frédéric Chopin", "Pyotr Ilyich Tchaikovsky"]
  pieces     → ["Nocturne in E-flat major", "Swan Lake"]
  maxPieces  → 2

PROSES:
  ┌─────────────────────────────────────────────────┐
  │  1. Cek "forbidden" → skip kalau ada            │
  │  2. Cek maxPieces   → berhenti kalau sudah      │
  │  3. Potong nama     → kalau > 15 karakter       │
  │  4. Gabungkan       → pakai koma atau newline    │
  └─────────────────────────────────────────────────┘

OUTPUT:
  "Frédéric Chopin: Nocturne in E-flat major, Pyotr Ilyich Tc...: Swan Lake"
```

---

<a name="aturan-yang-harus-dipenuhi"></a>
## 📝 Aturan yang Harus Dipenuhi

Challenge ini punya **5 aturan spesifik**:

> 1️⃣ Format setiap lagu sebagai `"Composer: Piece Title"`
>
> 2️⃣ Tambahkan line break (`\n`) setiap **2 lagu**
>
> 3️⃣ Jika nama komposer > 15 karakter, potong dan tambahkan `...`
>
> 4️⃣ Gunakan `continue` untuk skip lagu dengan kata **"forbidden"** (case-insensitive)
>
> 5️⃣ Gunakan `break` untuk berhenti saat sudah mencapai `maxPieces`

---

<a name="langkah-1"></a>
## 🚫 Langkah 1 — Skip Lagu "Forbidden" (`continue`)

### 💬 Konsep: Apa itu `continue`?

Bayangkan kamu lagi absen murid satu per satu. Kalau ada murid yang **izin**, kamu **lewati** dan langsung lanjut ke murid berikutnya. Itulah `continue` — dia bilang ke loop: *"Skip yang ini, lanjut ke yang berikutnya!"*

### ⚠️ Kesalahan Awal

```javascript
// ❌ SALAH — mengecek SELURUH array, bukan lagu ke-i
if (pieces.toLowerCase().includes('forbidden')) continue;

// ✅ BENAR — mengecek lagu yang SEDANG diperiksa saat ini
if (pieces[i].toLowerCase().includes('forbidden')) continue;
```

### 🔍 Kenapa Harus `pieces[i]`?

```
pieces = ["Nocturne", "Forbidden Song", "Swan Lake"]
                         ↑
                    pieces[1] ← kita cek SATU PER SATU

pieces.toLowerCase()  ← ❌ ERROR! Array tidak punya toLowerCase()
pieces[i].toLowerCase() ← ✅ String punya toLowerCase()
```

### 🎨 Visualisasi Alur `continue`

```
Loop dimulai...

  i=0: pieces[0] = "Nocturne"
       └─ Mengandung "forbidden"? ❌ TIDAK
       └─ ✅ Proses lagu ini!

  i=1: pieces[1] = "Forbidden Song"
       └─ Mengandung "forbidden"? ✅ YA!
       └─ 🚫 CONTINUE → Loncat ke i=2, kode di bawahnya TIDAK dijalankan

  i=2: pieces[2] = "Swan Lake"
       └─ Mengandung "forbidden"? ❌ TIDAK
       └─ ✅ Proses lagu ini!
```

> 💡 **Tips:** `.toLowerCase()` membuat pengecekan menjadi **case-insensitive**.
> Jadi `"FORBIDDEN"`, `"Forbidden"`, dan `"forbidden"` semuanya akan terdeteksi!

---

<a name="langkah-2"></a>
## 🔢 Langkah 2 — Counter Terpisah untuk `maxPieces` (`break`)

### 💬 Konsep: Apa itu `break`?

Kalau `continue` itu "lewati satu", maka `break` itu **"berhenti total"**. Loop langsung selesai, tidak peduli masih ada data yang belum diproses.

### ⚠️ Kenapa Tidak Bisa Pakai `i` sebagai Penghitung?

Karena ada lagu yang di-**skip** (forbidden), `i` tidak akurat untuk menghitung jumlah lagu yang **benar-benar masuk** ke program.

```
Contoh: maxPieces = 2

  i=0: Bach          → ✅ Masuk (lagu ke-1)
  i=1: "forbidden"   → 🚫 SKIP
  i=2: Beethoven     → ✅ Masuk (lagu ke-2)

Kalau pakai i:
  i=2 saat lagu ke-2 masuk → i ≠ jumlah lagu sebenarnya

Kalau pakai count:
  count=0 → Bach masuk    → count jadi 1
  count=1 → skip          → count TETAP 1 (tidak naik!)
  count=1 → Beethoven     → count jadi 2 → BREAK!
```

### ✅ Solusi: Variabel `count` Terpisah

```javascript
let count = 0; // ← Penghitung lagu yang BERHASIL masuk

for (let i = 0; i < composers.length; i++) {
  // Skip forbidden
  if (pieces[i].toLowerCase().includes('forbidden')) continue;

  // Berhenti kalau sudah cukup
  if (count === maxPieces) break;

  // ... proses lagu ...

  count++; // ← Naikkan HANYA kalau lagu berhasil masuk
}
```

### 🎨 Visualisasi `count` vs `i`

```
composers = ["Bach", "Mozart (forbidden)", "Beethoven", "Vivaldi"]
maxPieces = 2

┌───────┬────────────────────┬─────┬───────┬─────────────┐
│ Step  │ Composer           │  i  │ count │ Aksi        │
├───────┼────────────────────┼─────┼───────┼─────────────┤
│   1   │ Bach               │  0  │  0→1  │ ✅ Masuk    │
│   2   │ Mozart (forbidden) │  1  │   1   │ 🚫 SKIP     │
│   3   │ Beethoven          │  2  │  1→2  │ ✅ Masuk    │
│   4   │ Vivaldi            │  3  │   2   │ 🛑 BREAK!   │
└───────┴────────────────────┴─────┴───────┴─────────────┘

Hasil: 2 lagu (Bach & Beethoven) — count = maxPieces ✓
```

> 💡 **Pelajaran:** Jangan andalkan index loop (`i`) sebagai penghitung jika ada item yang bisa di-skip!

---

<a name="langkah-3"></a>
## ✂️ Langkah 3 — Pemotongan Nama Komposer (Truncation)

### 💬 Konsep: `slice()` dan Truncation

Jika nama komposer lebih dari 15 karakter, kita **potong** sampai 15 huruf pertama lalu tambahkan `...`

```javascript
let composerName = composers[i];

if (composerName.length > 15) {
  composerName = composerName.slice(0, 15) + '...';
}
```

### 🎨 Visualisasi Pemotongan

```
"Pyotr Ilyich Tchaikovsky"
 ├──────────────┤
 0             14  ← 15 karakter pertama (index 0-14)

 slice(0, 15) mengambil index 0 sampai 14

 Hasil: "Pyotr Ilyich Tc" + "..." = "Pyotr Ilyich Tc..."


"Frédéric Chopin"
 ├──────────────┤
 Panjang = 15 karakter → TIDAK dipotong (syaratnya > 15, bukan >= 15)

 Hasil: "Frédéric Chopin" (tetap utuh)
```

### 📊 Contoh Lainnya

```
┌────────────────────────────┬────────┬───────────────────────┐
│ Nama Asli                  │ Length │ Hasil                 │
├────────────────────────────┼────────┼───────────────────────┤
│ "Frédéric Chopin"          │   15   │ "Frédéric Chopin"     │
│ "Pyotr Ilyich Tchaikovsky" │   25   │ "Pyotr Ilyich Tc..." │
│ "Johann Sebastian Bach"    │   21   │ "Johann Sebastia..."  │
│ "Wolfgang Amadeus Mozart"  │   23   │ "Wolfgang Amadeu..."  │
│ "Ludwig van Beethoven"     │   20   │ "Ludwig van Beet..."  │
└────────────────────────────┴────────┴───────────────────────┘
```

---

<a name="langkah-4"></a>
## 🧩 Langkah 4 — Logika Separator: Koma & Newline

Ini adalah bagian **paling tricky** dari challenge ini! 🧠

### 💬 Aturan: *"Add a line break after every second piece"*

Artinya setiap **2 lagu**, tambahkan baris baru (`\n`).

```
Lagu 1, Lagu 2
Lagu 3, Lagu 4
Lagu 5, Lagu 6
```

### ⚠️ Kesalahan Awal: Menggunakan Array + Slice

```javascript
// ❌ Pendekatan awal — terlalu rumit dan tidak scalable
let result = [];
// ... push ke array ...
return result.slice(0, 2).join(', ') + result.slice(-1);
```

**Masalahnya:**
- `result.slice(-1)` hanya mengambil elemen terakhir
- Tidak bisa menangani data lebih dari 3 lagu dengan benar
- Logika `join` dan `slice` tidak fleksibel

### ✅ Solusi: Akumulasi ke String Langsung

Daripada pakai array, lebih mudah **membangun string langsung** di dalam loop:

```javascript
if (count === 0) {
  // Lagu pertama: langsung masukkan, tanpa pemisah
  result += formattedPiece;
} else if (count % 2 === 1) {
  // count ganjil (1, 3, 5...): lagu ke-2, 4, 6 → pakai KOMA
  result += ', ' + formattedPiece;
} else {
  // count genap (2, 4, 6...): lagu ke-3, 5, 7 → pakai NEWLINE
  result += '\n' + formattedPiece;
}
```

### 🎨 Visualisasi Logika Separator

```
count = 0 → Lagu 1    → Langsung masukkan (tidak ada pemisah sebelumnya)
count = 1 → Lagu 2    → count % 2 === 1 → Tambah KOMA ","
                         ────────── selesai sepasang ──────────
count = 2 → Lagu 3    → count % 2 === 0 → Tambah NEWLINE "\n"
count = 3 → Lagu 4    → count % 2 === 1 → Tambah KOMA ","
                         ────────── selesai sepasang ──────────
count = 4 → Lagu 5    → count % 2 === 0 → Tambah NEWLINE "\n"
count = 5 → Lagu 6    → count % 2 === 1 → Tambah KOMA ","
```

### 📋 Hasil Akhir

```
Lagu1, Lagu2     ← count 0 (langsung) dan count 1 (koma)
Lagu3, Lagu4     ← count 2 (newline) dan count 3 (koma)
Lagu5, Lagu6     ← count 4 (newline) dan count 5 (koma)
```

> 💡 **Tips:** Operator **modulo** (`%`) sangat berguna untuk pola berulang!
> `count % 2` menghasilkan pola: `0, 1, 0, 1, 0, 1...` — sempurna untuk pergantian koma ↔ newline.

---

<a name="kode-final-lengkap"></a>
## ✅ Kode Final Lengkap

```javascript
function formatConcertProgram(composers, pieces, maxPieces) {
  let result = '';
  let count = 0;

  for (let i = 0; i < composers.length; i++) {
    // 1. Skip jika mengandung kata 'forbidden'
    if (pieces[i].toLowerCase().includes('forbidden')) continue;

    // 2. Berhenti jika sudah mencapai jumlah maksimal lagu
    if (count === maxPieces) break;

    // 3. Handle pemotongan nama komposer (> 15 karakter)
    let composerName = composers[i];
    if (composerName.length > 15) {
      composerName = composerName.slice(0, 15) + '...';
    }

    let formattedPiece = `${composerName}: ${pieces[i]}`;

    // 4. Logika Penempatan Koma dan Newline
    if (count === 0) {
      // Lagu pertama: langsung masukkan saja
      result += formattedPiece;
    } else if (count % 2 === 1) {
      // Lagu ke-2, 4, 6... (indeks ganjil): tambahkan koma
      result += ', ' + formattedPiece;
    } else {
      // Lagu ke-3, 5, 7... (indeks genap): tambahkan line break
      result += '\n' + formattedPiece;
    }

    count++;
  }

  return result;
}
```

### 🧪 Test Case

```javascript
// --- TEST 1 ---
const composers1 = ['Frédéric Chopin', 'Pyotr Ilyich Tchaikovsky'];
const pieces1 = ['Nocturne in E-flat major', 'Swan Lake'];
console.log(formatConcertProgram(composers1, pieces1, 2));
```

**Output Test 1:**
```
Frédéric Chopin: Nocturne in E-flat major, Pyotr Ilyich Tc...: Swan Lake
```

```javascript
// --- TEST 2 ---
const composers2 = ['Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven'];
const pieces2 = ['Air on the G String', 'Eine kleine Nachtmusik', 'Symphony No. 5'];
console.log(formatConcertProgram(composers2, pieces2, 3));
```

**Output Test 2:**
```
Johann Sebastia...: Air on the G String, Wolfgang Amadeu...: Eine kleine Nachtmusik
Ludwig van Beet...: Symphony No. 5
```

---

<a name="perbandingan-solusi"></a>
## 🔬 Perbandingan dengan Solusi Coddy

Solusi dari web Coddy.tech menggunakan pendekatan yang sedikit berbeda. Mari kita bandingkan:

### 📊 Tabel Perbandingan

| Aspek | 🧑‍💻 Kode Kita | 🌐 Solusi Coddy |
|-------|-------------|-----------------|
| **Separator** | Ditentukan **sebelum** lagu ditambahkan | Ditambahkan **setelah** lagu ditambahkan |
| **Break** | `if (count === maxPieces) break;` di dalam body loop | `pieceCount < maxPieces` di kondisi `for` |
| **Trailing separator** | Tidak ada masalah (separator di depan) | Dicegah dengan `&& pieceCount < maxPieces` |
| **Keterbacaan** | ✅ Lebih intuitif untuk pemula | ⚡ Lebih ringkas tapi perlu pengalaman |

### 🌐 Solusi Coddy

```javascript
function formatConcertProgram(composers, pieces, maxPieces) {
  let program = '';
  let pieceCount = 0;

  // Kondisi maxPieces langsung di dalam for — lebih ringkas
  for (let i = 0; i < composers.length && pieceCount < maxPieces; i++) {
    if (pieces[i].toLowerCase().includes('forbidden')) {
      continue;
    }

    let composer = composers[i];
    if (composer.length > 15) {
      composer = composer.slice(0, 15) + '...';
    }

    // Lagu ditambahkan DULU...
    program += `${composer}: ${pieces[i]}`;
    pieceCount++;

    // ...baru separator ditambahkan SETELAHNYA (untuk lagu berikutnya)
    if (pieceCount % 2 === 0 && pieceCount < maxPieces) {
      program += '\n';
    } else if (pieceCount < maxPieces) {
      program += ', ';
    }

    if (pieceCount === maxPieces) {
      break;
    }
  }

  return program;
}
```

### 🎨 Visualisasi Perbedaan Alur

```
┌─────────────────────────────────────────────────────────────────┐
│                    KODE KITA (Separator di DEPAN)               │
│                                                                 │
│  count=0: result += "Bach: Air"           → "Bach: Air"        │
│  count=1: result += ", " + "Mozart: Eine" → "..., Mozart: ..." │
│  count=2: result += "\n" + "Beet: Sym"    → "...\nBeet: ..."   │
│                                                                 │
│  ✅ Tidak perlu cek "apakah ini lagu terakhir?"                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                 SOLUSI CODDY (Separator di BELAKANG)            │
│                                                                 │
│  pC=1: program += "Bach: Air" + ", "      → "Bach: Air, "      │
│  pC=2: program += "Mozart: Eine" + "\n"   → "..., Mozart\n"    │
│  pC=3: program += "Beet: Sym"             → "...\nBeet: ..."   │
│                                                                 │
│  ⚠️ Harus cek "pieceCount < maxPieces" agar tidak ada          │
│     koma/newline "sampah" di akhir string                       │
└─────────────────────────────────────────────────────────────────┘
```

> 💡 **Kesimpulan:** Kedua pendekatan menghasilkan output yang sama.
> Kode kita lebih mudah dibaca, solusi Coddy lebih ringkas.
> **Tidak ada yang lebih benar — yang penting kamu paham logikanya!**

---

<a name="pelajaran-yang-didapat"></a>
## 💡 Pelajaran yang Didapat

### 🧠 Konsep JavaScript yang Dipraktikkan

| # | Konsep | Penggunaan di Challenge |
|---|--------|----------------------|
| 1 | `continue` | Skip lagu "forbidden" tanpa menghentikan loop |
| 2 | `break` | Berhenti total saat `maxPieces` tercapai |
| 3 | `slice(0, 15)` | Memotong string sampai 15 karakter |
| 4 | `toLowerCase()` | Membuat pengecekan case-insensitive |
| 5 | `includes()` | Mengecek apakah string mengandung kata tertentu |
| 6 | Modulo (`%`) | Membuat pola berulang (koma ↔ newline) |
| 7 | Template Literal | Format string dengan backtick `` `${var}: ${var}` `` |
| 8 | Counter terpisah | Menghitung item valid, bukan index loop |

### 🏆 Tips Penting

> **🎯 Jangan andalkan `i` sebagai penghitung jika ada item yang di-skip!**
> Selalu buat variabel counter terpisah (`count`) yang hanya naik saat data benar-benar diproses.

> **🎯 Operator modulo (`%`) adalah sahabat terbaik untuk pola berulang!**
> `n % 2` → bergantian antara 0 dan 1
> `n % 3` → berulang 0, 1, 2, 0, 1, 2...

> **🎯 Tidak perlu minder melihat solusi yang lebih pendek.**
> Yang paling penting kamu paham **alasan** di balik setiap baris kode yang kamu tulis!

---

> 📅 *Dokumentasi dibuat pada 21 April 2026 — Sesi mentoring JavaScript Challenge*
