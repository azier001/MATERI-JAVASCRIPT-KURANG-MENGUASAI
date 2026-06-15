# 📘 Solusi Bertahap — Dari Rumus ASCII ke Kode Pertama (`for...of`)

### ✨ _Menerjemahkan penemuan rumus menjadi baris kode yang bekerja, selangkah demi selangkah_

> 🎯 **Tujuan:** Membangun solusi pertama `alphabetPosition` secara bertahap — dimulai dari membaca karakter, menyeragamkan huruf, memvalidasi abjad, hingga menerapkan rumus konversi ASCII.

---

<a name="daftar-isi"></a>

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🧠 | [Algoritma Tahan Lupa](#algoritma-tahan-lupa) | Langkah-langkah dengan penjelasan "Kenapa" (Pilar 2) |
| 🗺️ | [Blueprint & Kamus Variabel](#blueprint) | Kerangka kode kosong + tabel penamaan (Pilar 3) |
| 🔨 | [Pendekatan Bertahap](#pendekatan-bertahap) | Membangun kode step-by-step (Pilar 4) |
| ✅ | [Kode Final V1](#kode-final) | Solusi lengkap versi `for...of` |

---

<a name="algoritma-tahan-lupa"></a>

## 🧠 Algoritma Tahan Lupa

> **Pilar 2** — Setiap langkah menjelaskan **"Kenapa"**, bukan cuma rumusnya, plus **contoh angka konkret**.

### 1. **Seragamkan Huruf `[LOWERCASE]`** — Samakan huruf besar dan kecil

- **Apa:** Ubah seluruh string menjadi huruf kecil dengan `.toLowerCase()`.
- **Kenapa:** Huruf `'T'` (ASCII 84) dan `'t'` (ASCII 116) punya kode berbeda. Jika tidak diseragamkan, rumus `ASCII - 96` hanya benar untuk huruf kecil. Huruf kapital akan menghasilkan angka yang salah (misal `'T'` → `84 - 96 = -12` 😱).
- **Contoh:** `"The sunset"` → `"the sunset"`.

### 2. **Siapkan Penampung `[ARRAY]`** — Wadah untuk mengumpulkan angka hasil

- **Apa:** Buat array kosong `result = []`.
- **Kenapa:** Kita tidak tahu berapa banyak huruf valid yang akan ditemukan. Array bersifat dinamis — bisa menampung berapa pun elemen. Nanti di akhir, `.join(' ')` akan merangkai semua angka dengan spasi secara otomatis dan rapi.
- **Contoh:** `[]` → `[20, 8, 5]` → `"20 8 5"`.

### 3. **Iterasi Karakter `[FOR...OF]`** — Baca satu per satu

- **Apa:** Gunakan `for...of` untuk menelusuri setiap karakter.
- **Kenapa:** `for...of` dirancang khusus untuk memecah *iterable* seperti string. Setiap iterasi memberikan kita tepat satu karakter, siap untuk dievaluasi.
- **Contoh:** `"the"` → iterasi 1: `'t'`, iterasi 2: `'h'`, iterasi 3: `'e'`.

### 4. **Validasi Huruf `[GUARD CLAUSE]`** — Hanya abjad yang boleh lewat

- **Apa:** Cek `char >= 'a' && char <= 'z'` di dalam loop.
- **Kenapa:** Input bisa mengandung spasi, titik, angka, simbol — semuanya harus diabaikan. Guard clause ini menjadi "penjaga gerbang" yang hanya mengizinkan abjad murni (a-z) untuk diproses lebih lanjut.
- **Contoh:** `'t'` → ✅ lolos, `' '` → ❌ ditolak, `'.'` → ❌ ditolak.

### 5. **Terapkan Rumus `[ASCII - 96]`** — Konversi huruf ke posisi

- **Apa:** Ambil kode ASCII karakter dengan `.charCodeAt(0)`, lalu kurangi `96`.
- **Kenapa:** Huruf `'a'` memiliki ASCII `97`. Karena kita ingin `'a' = 1`, maka offset-nya adalah `96`. Rumus ini berlaku konsisten untuk seluruh alfabet kecil.
- **Contoh:** `'t'` → `116 - 96 = 20`, `'h'` → `104 - 96 = 8`, `'e'` → `101 - 96 = 5`.

### 6. **Rangkai Hasil `[JOIN]`** — Satukan angka menjadi string output

- **Apa:** Gunakan `result.join(' ')` untuk menggabungkan isi array.
- **Kenapa:** `.join(' ')` secara cerdas menyisipkan spasi **di antara** elemen saja — tidak ada spasi berlebih di awal atau akhir. Ini jauh lebih bersih daripada merangkai string secara manual.
- **Contoh:** `[20, 8, 5]` → `"20 8 5"`.

---

<a name="blueprint"></a>

## 🗺️ Blueprint & Kamus Variabel

> **Pilar 3** — Kerangka kode kosong + tabel penamaan variabel sebelum menulis kode final.

### 📖 Kamus Variabel

| Lokasi / Peran | ✅ Rekomendasi | ❌ Jangan Gunakan | Alasan |
|----------------|----------------|-------------------|--------|
| Teks yang di-lowercase | `formatted` | `f`, `txt2` | Menunjukkan teks sudah diproses |
| Array penampung | `result` | `res`, `arr` | Umum tapi cukup jelas untuk penampung akhir |
| Nilai ASCII terhitung | `code` | `c`, `num` | Singkat tapi bermakna — kode ASCII hasil konversi |

### 🗺️ Kerangka Kode

```javascript
// 🗺️ KERANGKA KODE (Mental Model: Seragamkan → Siapkan → Iterasi → Validasi → Konversi → Rangkai)

const alphabetPosition = (text) => {
  // [LOWERCASE] — seragamkan huruf
  // [ARRAY] — siapkan penampung kosong
  // [FOR...OF] — iterasi setiap karakter
    // [GUARD] — hanya abjad yang boleh lewat
    // [ASCII - 96] — konversi huruf ke angka
    // [PUSH] — simpan ke penampung
  // [JOIN] — rangkai menjadi string output
};
```

---

<a name="pendekatan-bertahap"></a>

## 🔨 Pendekatan Bertahap (Step-by-Step)

> **Pilar 4** — Kode dibangun selangkah demi selangkah, bukan langsung full code.

### Step 1 — Membaca Karakter Satu Per Satu

Mulai dari hal paling dasar: pastikan kita bisa membaca isi string karakter per karakter.

```javascript
const alphabetPosition = (text) => {
  for (const char of text) {
    console.log(char); // Tes cetak karakter satu per satu
  }
};
```

> [!NOTE]
> 💡 **Kenapa `for...of`?** Dibanding `for (let i = 0; ...)` yang butuh index manual, `for...of` langsung memberikan kita nilai karakter-nya. Lebih bersih dan minim kemungkinan bug off-by-one.

---

### Step 2 — Menyeragamkan Huruf & Validasi

Tambahkan dua lapisan: lowercase semua teks, lalu filter hanya abjad.

```javascript
const alphabetPosition = (text) => {
  const formatted = text.toLowerCase();

  for (const char of formatted) {
    if (char >= 'a' && char <= 'z') {
      console.log(char); // Sekarang hanya abjad kecil yang dicetak
    }
  }
};
```

> [!TIP]
> 💡 **Tips Debugging:** Jalankan kode ini dulu dengan input `"The sunset..."` dan pastikan output hanya menampilkan huruf kecil (tanpa spasi atau titik) sebelum lanjut ke step berikutnya.

---

### Step 3 — Implementasi Rumus & Pengumpulan Hasil

Tahap terakhir: konversi huruf valid ke angka, kumpulkan, dan rangkai.

```javascript
const alphabetPosition = (text) => {
  const formatted = text.toLowerCase();
  const result = [];

  for (const char of formatted) {
    if (char >= 'a' && char <= 'z') {
      const code = char.charCodeAt(0) - 96;
      result.push(code);
    }
  }

  return result.join(' ');
};
```

Tiga hal baru ditambahkan:
- `result = []` — penampung array kosong
- `.charCodeAt(0) - 96` — rumus konversi ASCII
- `.join(' ')` — merangkai array menjadi string dengan spasi

---

<a name="kode-final"></a>

## ✅ Kode Final — Versi 1 (`for...of`)

```javascript
const alphabetPosition = (text) => {
  const formatted = text.toLowerCase();
  const result = [];

  for (const char of formatted) {
    if (char >= 'a' && char <= 'z') {
      const code = char.charCodeAt(0) - 96;
      result.push(code);
    }
  }

  return result.join(' ');
};
```

**Trace lengkap** untuk input `"The."`:

```
Input: "The."
│
├─ toLowerCase()  →  "the."
├─ Iterasi:
│   ├─ 't' → >= 'a' ✅ → charCodeAt(0) = 116 → 116 - 96 = 20 → push(20)
│   ├─ 'h' → >= 'a' ✅ → charCodeAt(0) = 104 → 104 - 96 = 8  → push(8)
│   ├─ 'e' → >= 'a' ✅ → charCodeAt(0) = 101 → 101 - 96 = 5  → push(5)
│   └─ '.' → >= 'a' ❌ → diabaikan
│
├─ result = [20, 8, 5]
└─ join(' ') → "20 8 5" ✅
```

---

[⬅️ Kembali ke README](../README.md) · [➡️ Lanjut ke 02 — Evolusi & Clean Code](02-evolusi-dan-clean-code.md)
