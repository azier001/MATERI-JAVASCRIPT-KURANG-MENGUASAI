# 📗 Evolusi & Clean Code — Refactoring, Regex, dan Naming Convention

### ✨ _Dari solusi imperatif menuju pendekatan fungsional yang ringkas, lalu menyempurnakan penamaan agar kode "bercerita"_

> 🎯 **Tujuan:** Mengeksplorasi pendekatan alternatif dengan Regex + `.map()`, memahami perbedaan paradigma imperatif vs deklaratif, lalu menerapkan naming convention standar Clean Code.

---

<a name="daftar-isi"></a>

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🔄 | [Evolusi Solusi](#evolusi-solusi) | Refactoring dari `for...of` ke Regex + `.map()` (Pilar 5) |
| 🧠 | [Perbandingan Mental Model](#mental-model) | Imperatif vs Deklaratif — kapan pakai yang mana |
| 🏷️ | [Naming Convention](#naming-convention) | Tabel penamaan variabel ❌ vs ✅ (Pilar 6) |
| ✅ | [Kode Final V2](#kode-final-v2) | Solusi deklaratif lengkap |
| 💎 | [Kode Final Clean Code](#kode-final-clean) | V1 & V2 dengan naming terbaik |

---

<a name="evolusi-solusi"></a>

## 🔄 Evolusi Solusi — `for...of` ➜ Regex + `.map()`

> **Pilar 5** — Minimal 2 versi solusi yang sudah dibahas, dengan perbandingan kapan pakai yang mana.

### Apa yang Berubah?

Di V1, kita melakukan **dua tugas terpisah** secara manual di dalam loop:
1. **Filter** — `if (char >= 'a' && char <= 'z')` untuk menyortir huruf
2. **Konversi** — `.charCodeAt(0) - 96` untuk mengubah huruf ke angka

Di V2, kedua tugas ini didelegasikan ke method bawaan JavaScript yang sudah **dioptimasi khusus** untuk masing-masing tugas.

---

### Step 1 — Ekstraksi Karakter dengan Regex `.match()`

Alih-alih melooping tiap huruf lalu mengecek kondisinya satu per satu, kita gunakan `.match()` dengan Regular Expression:

```javascript
const matchedChars = text.toLowerCase().match(/[a-z]/g) || [];
```

**Breakdown:**

| Bagian | Penjelasan |
|--------|------------|
| `/[a-z]/` | Pola pencarian: cocokkan karakter apapun dari `a` sampai `z` |
| `g` (flag Global) | Cari **semua** kemunculan, bukan cuma yang pertama |
| `.match()` | Kembalikan array berisi semua karakter yang cocok |
| `\|\| []` | **Fallback keamanan** — jika tidak ada abjad sama sekali, `.match()` mengembalikan `null`. Operator `\|\|` menggantinya dengan array kosong agar `.map()` di baris selanjutnya tidak error |

**Contoh:**

```
"The sunset..."
  └─ .toLowerCase() → "the sunset..."
  └─ .match(/[a-z]/g) → ['t','h','e','s','u','n','s','e','t']
                         ↑ Spasi dan titik otomatis terbuang!

"1234!!!"
  └─ .match(/[a-z]/g) → null
  └─ || [] → []        ← Aman, tidak error
```

> [!NOTE]
> 💡 **Regex menggantikan dua tugas sekaligus:** Ia berfungsi sebagai `toLowerCase()` + `if guard` dalam satu baris. String langsung di-*lowercase*, lalu abjad diekstrak — tanpa perlu loop manual.

---

### Step 2 — Transformasi dengan `.map()`

Setelah kita punya array murni berisi abjad, kita tidak perlu membuat penampung baru lalu `push` secara manual. Method `.map()` bertugas **memetakan** sebuah array dari bentuk A ke bentuk B:

```javascript
return matchedChars.map((char) => char.charCodeAt(0) - 96).join(' ');
```

**Alur chaining:**

```
['t', 'h', 'e']
  │
  ├─ .map(char => char.charCodeAt(0) - 96)
  │   └─ [20, 8, 5]          ← Array huruf → Array angka
  │
  └─ .join(' ')
      └─ "20 8 5"             ← Array angka → String output
```

> [!TIP]
> 💡 **`.map()` vs manual `push`:** Keduanya menghasilkan hal yang sama — array baru. Bedanya, `.map()` **mendeklarasikan transformasi** dalam satu ekspresi, sementara `push` **memerintahkan langkah** secara manual. Hasilnya: kode 2 baris vs 7 baris.

---

<a name="mental-model"></a>

## 🧠 Perbandingan Mental Model

| Aspek | V1 — Imperatif 🔵 | V2 — Deklaratif 🟢 |
|-------|:------------------:|:-------------------:|
| **Fokus** | "BAGAIMANA" setiap tahap terjadi | "APA" hasil akhir yang diinginkan |
| **Filter huruf** | `for...of` + `if` guard manual | Regex `/[a-z]/g` otomatis |
| **Konversi** | `push()` satu per satu | `.map()` sekaligus |
| **Jumlah baris** | 10 baris | 4 baris |
| **Bisa `break`?** | ✅ Ya | ❌ Tidak (tapi tidak dibutuhkan) |
| **Cocok untuk** | Pemula yang belajar alur logika | Kode produksi yang ringkas |

**Analogi:**

```
🔵 Imperatif  = Resep masak langkah demi langkah
                "Ambil telur → pecahkan → kocok → tuang → goreng"

🟢 Deklaratif = Pesan di restoran
                "Saya mau telur dadar" (biarkan chef yang urus caranya)
```

> [!IMPORTANT]
> 🔔 **Bukan tentang mana yang "lebih baik"!** V1 dan V2 adalah **dua sudut pandang berbeda** untuk masalah yang sama. V1 lebih cocok untuk belajar dan debugging. V2 lebih cocok untuk kode yang ringkas dan profesional.

---

<a name="naming-convention"></a>

## 🏷️ Naming Convention — Clean Code

> **Pilar 6** — Semua variabel harus punya nama yang deskriptif dan bermakna.

### Masalah Awal

Walaupun kode V1 dan V2 sudah menghindari singkatan buruk satu huruf, nama variabelnya masih bisa disempurnakan. Dalam standar Clean Code, nama variabel harus bisa **"bercerita"** kepada pembaca tanpa memerlukan komentar tambahan.

### Tabel Perbandingan

| Konteks Variabel | ❌ Hindari | ✅ Cukup Baik (Awal) | 🌟 Terbaik (Clean Code) | Alasan Perbaikan |
|-------------------|-----------|----------------------|------------------------|-------------------|
| Teks yang di-lowercase (V1) | `f`, `txt2` | `formatted` | `lowerCaseText` | `formatted` terlalu luas — bisa berarti apa saja. `lowerCaseText` eksplisit |
| Array penampung akhir (V1) | `res`, `arr` | `result` | `positions` | `positions` menceritakan isi array: posisi-posisi huruf |
| Nilai hitungan ASCII (V1) | `c`, `num` | `code` | `charPosition` | Mempertegas bahwa angka ini adalah posisi absolut karakter |
| Array murni abjad (V2) | `m`, `chars` | `matchedChars` | `lettersOnly` | Konteks seketika: array ini sudah "dibersihkan" dari non-huruf |

### Prinsip yang Dipelajari

```
🎯 Prinsip 1  →  Nama harus menjawab "APA isinya" bukan "APA tipenya"
                  ❌ result (hanya bilang "ini hasil")
                  ✅ positions (bilang "ini kumpulan posisi")

📌 Prinsip 2  →  Nama yang kuat = mengurangi kebutuhan komentar
                  ✅ const lowerCaseText = text.toLowerCase();
                  // Tidak perlu komentar — nama sudah menjelaskan!

🔐 Prinsip 3  →  Semakin spesifik konteksnya, semakin panjang nama boleh jadi
                  ✅ charPosition lebih baik dari code
                  ✅ lettersOnly lebih baik dari matchedChars
```

---

<a name="kode-final-v2"></a>

## ✅ Kode Final — Versi 2 (Regex + `.map()`)

```javascript
const alphabetPosition = (text) => {
  // 1. Ekstrak hanya abjad kecil ke dalam array menggunakan Regex
  const matchedChars = text.toLowerCase().match(/[a-z]/g) || [];

  // 2. Petakan tiap huruf ke urutan angkanya, lalu satukan dengan spasi
  return matchedChars.map((char) => char.charCodeAt(0) - 96).join(' ');
};
```

*(Kode ini bahkan bisa ditulis dalam satu baris jika `{}` dan `return` dihilangkan. Namun, versi dua baris di atas paling ideal — menyeimbangkan keringkasan dengan keterbacaan.)*

---

<a name="kode-final-clean"></a>

## 💎 Kode Final — Clean Code (Naming Terbaik)

Setelah menerapkan penamaan terbaik, kedua versi menjadi lebih profesional dan self-documenting:

### V1 Clean — Imperatif

```javascript
const alphabetPosition = (text) => {
  const lowerCaseText = text.toLowerCase();
  const positions = [];

  for (const char of lowerCaseText) {
    if (char >= 'a' && char <= 'z') {
      const charPosition = char.charCodeAt(0) - 96;
      positions.push(charPosition);
    }
  }

  return positions.join(' ');
};
```

### V2 Clean — Deklaratif

```javascript
const alphabetPosition = (text) => {
  const lettersOnly = text.toLowerCase().match(/[a-z]/g) || [];

  return lettersOnly.map((char) => char.charCodeAt(0) - 96).join(' ');
};
```

> [!TIP]
> 💡 **Perhatikan perbedaannya:** Tanpa membaca satu pun komentar, pembaca sudah bisa memahami bahwa `positions` berisi kumpulan posisi dan `lettersOnly` berisi huruf-huruf saja. Itulah kekuatan naming yang baik — kode yang "bercerita" sendiri.

---

[⬅️ Kembali ke 01 — Solusi Bertahap](01-solusi-bertahap.md) · [➡️ Lanjut ke 03 — Insight Trial & Error](03-insight-trial-error.md)
