# 🌊 Poetic Numbers in the Coastal Cove

### ✨ *Menyaring angka-angka puitis dari deburan ombak pesisir — sebuah perjalanan memahami Guard Clauses, digit extraction, dan clean loop logic.*

---

## 📑 Daftar Isi

| No | Bagian | Deskripsi |
|:--:|--------|-----------|
| 🎯 | [Ringkasan Soal](#-ringkasan-soal) | Apa yang diminta challenge ini |
| 🔍 | [Analisis & Visualisasi](#-analisis--visualisasi) | Evaluasi angka riil: lolos atau gagal? |
| 🚪 | [Analogi Penjaga Pintu](#-analogi-penjaga-pintu) | Memahami `continue` sebagai Guard Clause |
| 🧮 | [Visualisasi Digit Extraction](#-visualisasi-digit-extraction) | Step-by-step cara kerja `while` loop matematika |
| 📐 | [Blueprint & Kamus Variabel](#-blueprint--kamus-variabel) | Kerangka kode kosong + peran setiap variabel |
| 🏷️ | [Naming Convention](#️-naming-convention) | Penamaan variabel yang bersih dan bermakna |
| 🚶 | [Pendekatan Bertahap](#-pendekatan-bertahap) | Langkah eksekusi dari nol sampai selesai |
| 📄 | [Lanjut ke Solusi & Evolusi](./02-solusi-evolusi.md) | Kode lengkap, perbandingan, dan gotchas |
| 🗂️ | [Versi Satu File (Monolitik)](./single-file-version/poetic-numbers-cove.md) | Seluruh dokumentasi digabung dalam 1 halaman |

---

<a name="-ringkasan-soal"></a>
## 🎯 Ringkasan Soal

Buat fungsi `poeticNumbersInCove(start, end)` yang mengembalikan array berisi **"angka puitis"** dalam rentang `start` sampai `end` (inklusif).

**Syarat angka puitis** — harus lolos **SEMUA** kriteria:

| # | Kriteria | Analogi |
|:-:|----------|---------|
| 1 | Habis dibagi **3** | 🌊 Irama ombak |
| 2 | **Tidak** habis dibagi **5** | 🚫 Absennya legenda |
| 3 | Jumlah digit **genap** | ⚖️ Keseimbangan alam |

**Contoh:**
- `poeticNumbersInCove(1, 10)` → `[6]`
- `poeticNumbersInCove(10, 30)` → `[24]`

---

<a name="-analisis--visualisasi"></a>
## 🔍 Analisis & Visualisasi

Mari evaluasi tiga angka untuk memahami pola seleksi:

### Tabel Evaluasi Angka

| Angka | ÷3? | ÷5? | Σ Digit | Genap? | Hasil |
|:-----:|:---:|:---:|:-------:|:------:|:-----:|
| **12** | ✅ 12÷3=4 | ✅ Tidak habis | 1+2 = **3** | ❌ Ganjil | 🔴 **Gagal** |
| **15** | ✅ 15÷3=5 | ❌ 15÷5=3 | — | — | 🔴 **Gagal** (berhenti di syarat 2) |
| **24** | ✅ 24÷3=8 | ✅ Tidak habis | 2+4 = **6** | ✅ Genap | 🟢 **Lolos!** |

> [!TIP]
> **Perhatikan angka 15**: evaluasi **berhenti lebih awal** di syarat ke-2 karena habis dibagi 5. Inilah kekuatan `continue` — kita tidak perlu menghitung jumlah digit jika sudah gagal di syarat sebelumnya!

### Alur Evaluasi Visual

```
Angka 24 masuk ke filter:

  ┌─ Syarat 1: 24 % 3 === 0? ─── ✅ YA ──→ Lanjut
  │
  ├─ Syarat 2: 24 % 5 === 0? ─── ✅ TIDAK ──→ Lanjut
  │
  ├─ Syarat 3: (2+4) % 2 === 0? ── ✅ GENAP ──→ LOLOS! 🎉
  │
  └─ Masuk ke array poeticNumbers ✨
```

---

<a name="-analogi-penjaga-pintu"></a>
## 🚪 Analogi Penjaga Pintu

> 🏰 Bayangkan sebuah gua pesisir dengan **dua penjaga pintu** sebelum ruang utama:
>
> **Penjaga 1** (Gerbang Ombak): *"Apakah kamu kelipatan 3?"*
> → Jika **bukan** kelipatan 3 → 🚫 `continue` — diusir, langsung ke angka berikutnya.
>
> **Penjaga 2** (Gerbang Legenda): *"Apakah kamu kelipatan 5?"*
> → Jika **iya** kelipatan 5 → 🚫 `continue` — diusir, angka ini membawa legenda.
>
> **Ruang Utama** (Evaluasi Akhir): Hitung jumlah digit.
> → Hanya angka dengan jumlah digit **genap** yang boleh tinggal. ⚖️

> [!IMPORTANT]
> **Konsep inti di sini adalah *Guard Clause***: kita menyaring yang **tidak memenuhi syarat** lebih dulu dengan `continue`, sehingga logika utama (penghitungan digit) hanya dijalankan untuk angka yang sudah lolos filter awal. Ini membuat kode lebih bersih, flat, dan efisien.

```javascript
// Guard Clauses dalam aksi:
if (num % 3 !== 0) continue;  // 🚪 Penjaga 1: bukan kelipatan 3? Pergi!
if (num % 5 === 0) continue;  // 🚪 Penjaga 2: kelipatan 5? Pergi!
// ... hanya angka berkualitas yang sampai sini
```

---

<a name="-visualisasi-digit-extraction"></a>
## 🧮 Visualisasi Digit Extraction

Bagaimana cara menghitung jumlah digit **tanpa mengubah angka menjadi string**? Gunakan matematika murni dengan `while` loop!

### Step-by-Step: Mengekstrak Digit dari Angka `24`

**Setup Awal:**
```
tempNum = 24    ← salinan angka yang akan "dipotong"
digitSum = 0    ← akumulator jumlah digit
```

---

**🔄 Putaran 1** — Ambil digit terakhir (`4`):
```
lastDigit = 24 % 10       = 4      ← sisa bagi 10 = digit terakhir
digitSum  = 0 + 4          = 4      ← tambahkan ke akumulator
tempNum   = floor(24 / 10) = 2      ← "potong" digit terakhir
```

---

**🔄 Putaran 2** — Ambil digit terakhir (`2`):
```
lastDigit = 2 % 10        = 2      ← sisa bagi 10 = digit terakhir
digitSum  = 4 + 2          = 6      ← tambahkan ke akumulator
tempNum   = floor(2 / 10)  = 0      ← "potong" digit terakhir
```

---

**🛑 Putaran 3** — Berhenti!
```
tempNum = 0 → kondisi while(tempNum > 0) = FALSE
Loop berhenti. Hasil akhir: digitSum = 6 ✅ (genap!)
```

> [!TIP]
> **Rumus inti dua baris** yang harus diingat:
> ```
> digitSum += tempNum % 10;           // ambil digit paling kanan
> tempNum = Math.floor(tempNum / 10); // buang digit paling kanan
> ```
> Ini bekerja karena **modulo 10** selalu memberi digit terakhir, dan **floor division 10** selalu membuangnya.

---

<a name="-blueprint--kamus-variabel"></a>
## 📐 Blueprint & Kamus Variabel

### Kerangka Kode Kosong (Blueprint)

```javascript
function poeticNumbersInCove(start, end) {
  // 1. Buat wadah penampung
  const ______ = [];

  // 2. Loop dari start sampai end
  for (let ___ = ___; ___ <= ___; ___++) {

    // 3. Guard Clause 1: Cek kelipatan 3
    if (___ % _ !== 0) continue;

    // 4. Guard Clause 2: Cek kelipatan 5
    if (___ % _ === 0) continue;

    // 5. Hitung jumlah digit (pilih salah satu cara)
    // ... (lihat 3 versi solusi di file berikutnya)

    // 6. Cek apakah jumlah digit genap
    if (________ % 2 === 0) ______.push(___);
  }

  // 7. Kembalikan hasil
  return ______;
}
```

### Kamus Variabel

| Variabel | Tipe | Peran |
|----------|:----:|-------|
| `start` | `number` | Parameter — batas awal rentang (inklusif) |
| `end` | `number` | Parameter — batas akhir rentang (inklusif) |
| `poeticNumbers` | `number[]` | Wadah penampung angka yang lolos semua syarat |
| `num` | `number` | Iterator — angka utuh yang sedang dievaluasi |
| `numStr` | `string` | Representasi string dari `num` (versi string) |
| `digitStr` / `char` | `string` | Satu karakter digit dari `numStr` (masih string!) |
| `tempNum` | `number` | Salinan `num` yang akan dipotong per-digit (versi math) |
| `digitSum` / `total` | `number` | Akumulator jumlah semua digit |

---

<a name="️-naming-convention"></a>
## 🏷️ Naming Convention

> [!IMPORTANT]
> **Clean Code dimulai dari penamaan.** Variabel yang bermakna membuat kode bisa dibaca seperti kalimat bahasa Inggris.

| ❌ Buruk | ✅ Baik | Alasan |
|:--------:|:-------:|--------|
| `result` / `numbers` | `poeticNumbers` | Wadah ini spesifik berisi angka **puitis**, bukan sembarang angka |
| `i` / `x` | `num` / `currentNum` | Ini bukan index array — ini **angka utuh** yang sedang dievaluasi |
| `number` / `n` | `digitStr` / `char` | Hasil pecahan string **masih berupa teks**, bukan angka! Nama harus mengingatkan hal ini |
| `temp` | `tempNum` | Lebih jelas bahwa ini **salinan angka** sementara untuk dipotong |
| `sum` | `digitSum` / `totalDigits` | Menjelaskan **apa yang dijumlahkan**: digit, bukan sembarang hal |

---

<a name="-pendekatan-bertahap"></a>
## 🚶 Pendekatan Bertahap

### Langkah 1 — Siapkan Wadah & Loop
```javascript
const poeticNumbers = [];
for (let num = start; num <= end; num++) {
  // ... evaluasi di sini
}
return poeticNumbers;
```
> Fondasi: loop standar dari `start` ke `end` dengan wadah kosong.

---

### Langkah 2 — Pasang Guard Clauses
```javascript
if (num % 3 !== 0) continue;  // bukan kelipatan 3? Skip!
if (num % 5 === 0) continue;  // kelipatan 5? Skip!
```
> Dua penjaga pintu memfilter angka yang tidak layak **sebelum** kita repot menghitung digit.

---

### Langkah 3 — Hitung Jumlah Digit
```javascript
const numStr = String(num);
let total = 0;
for (let j = 0; j < numStr.length; j++) {
  total += Number(numStr[j]);
}
```
> Ubah angka ke string, iterasi tiap karakter, konversi kembali ke angka, dan jumlahkan.

---

### Langkah 4 — Evaluasi Final & Simpan
```javascript
if (total % 2 === 0) poeticNumbers.push(num);
```
> Hanya angka dengan jumlah digit **genap** yang masuk ke hasil akhir.

---

**👉 Lanjut ke [Solusi Lengkap & Evolusi](./02-solusi-evolusi.md)** untuk melihat 3 versi kode final, tabel perbandingan paradigma, dan gotchas yang harus dihindari.

---

> 📝 **Catatan Akhir:**
> Dokumentasi ini dibuat pada **25 Mei 2026** berdasarkan sesi mentoring langsung di **Google Antigravity** dengan JavaScript (ES6+). Sesi ini menghasilkan 3 versi solusi yang membahas berbagai pendekatan dari String Iteration, Matematika Murni, hingga manipulasi array Declarative menggunakan `.reduce()`.
