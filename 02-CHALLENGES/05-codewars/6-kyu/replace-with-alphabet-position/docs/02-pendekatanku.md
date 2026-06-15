# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-6%20kyu-yellow)
![Status](https://img.shields.io/badge/Status-✅%20Completed-green)

---

## 💭 Proses Berpikir Awal

Setelah membaca soal, yang perlu dilakukan:
1. Mengambil setiap karakter dari sebuah string.
2. Cek apakah karakter tersebut adalah huruf alfabet (A-Z / a-z).
3. Jika ya, ubah huruf itu menjadi angka posisinya di alfabet (a=1, b=2, ..., z=26).
4. Gabungkan semua angka menjadi satu string, dipisahkan spasi.

**Pendekatan yang terpikirkan pertama: Imperatif (for...of + charCodeAt)**

Alasan: Langsung loop satu per satu karakter, cek manual apakah huruf atau bukan, lalu konversi pakai ASCII. Cara ini paling intuitif dan mudah dipahami.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Ubah semua karakter ke huruf kecil (toLowerCase)
2. Siapkan array kosong untuk menampung hasil
3. Loop setiap karakter:
   a. Cek apakah karakter berada di range 'a' hingga 'z'
   b. Jika ya, hitung posisinya: charCode - 96
   c. Masukkan angka ke dalam array
4. Gabungkan array dengan spasi → return sebagai string
```

---

## 🔄 Percobaan Pertama (Imperatif — for...of Loop)

**Pendekatan:** Menggunakan `for...of` loop dengan pengecekan range manual dan konversi ASCII.

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

**Hasil:** ✅ Lulus semua test case!

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐☆☆ |
| Pendekatan | Imperatif (for...of loop) |
| **Bugs** | ✅ Tidak ada |
| **Performa** | ✅ O(n) — sangat efisien |

**Kenapa sudah bagus?**
Logikanya sederhana, jelas, dan performa sudah optimal O(n). Tapi kodenya masih cukup panjang (7+ baris logika). Bisakah kita mempersingkatnya tanpa mengorbankan keterbacaan?

---

## ✅ Solusi Final (Deklaratif — Regex + map)

**Pendekatan:** Menggunakan Regex `match()` untuk filter huruf, lalu `map()` untuk konversi.

Ide: Daripada loop manual dan cek satu-satu apakah huruf atau bukan, kita bisa langsung **ambil semua huruf sekaligus** pakai Regex `/[a-z]/g`. Setelah itu, tinggal `map` setiap huruf ke posisi alfabet-nya.

```javascript
// Versi Bersih (Tanpa Komentar) untuk Copy-Paste
const alphabetPosition = (text) => {
  const matchedChars = text.toLowerCase().match(/[a-z]/g) || [];

  return matchedChars.map((char) => char.charCodeAt(0) - 96).join(' ');
};
```

```javascript
// Versi Edukasi (Dengan Komentar)
const alphabetPosition = (text) => {
  // 1. Ubah ke lowercase, lalu ambil SEMUA huruf sekaligus pakai Regex
  //    match() return array ['t','h','e',...] atau null jika tidak ada match
  //    || [] → fallback ke array kosong jika null (safety net)
  const matchedChars = text.toLowerCase().match(/[a-z]/g) || [];

  // 2. Map setiap huruf ke posisi alfabet, lalu gabung jadi string
  //    'a'.charCodeAt(0) = 97, dikurangi 96 → 1
  //    'z'.charCodeAt(0) = 122, dikurangi 96 → 26
  return matchedChars.map((char) => char.charCodeAt(0) - 96).join(' ');
};
```

**Hasil:** ✅ Lulus semua test case!

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐⭐⭐ |
| Pendekatan | Deklaratif (Regex + map) |
| **Bugs** | ✅ Tidak ada |
| **Performa** | ✅ O(n) — sama efisiennya |

**Optimasi dari V1:**
- ✅ Menghilangkan `for...of` loop manual → diganti `match()` + `map()`
- ✅ Menghilangkan `if` check manual → Regex sudah otomatis filter huruf saja
- ✅ Menghilangkan variabel `result` dan `push()` → `map()` langsung return array baru
- ✅ Kode jauh lebih ringkas (2 baris logika vs 7+ baris)

---

## ⚖️ Perbandingan 2 Versi

| Aspek | V1 (Imperatif) | V2 (Deklaratif / Final) |
|-------|-----------------|-------------------------|
| **Pendekatan** | for...of + if manual | Regex match + map |
| **Filter huruf** | `if (char >= 'a' && char <= 'z')` | `/[a-z]/g` (Regex) |
| **Konversi** | `charCodeAt(0) - 96` | `charCodeAt(0) - 96` (sama) |
| **Kumpulkan hasil** | `result.push(code)` | `map()` langsung return array |
| **Jumlah baris logika** | 7+ baris | 2 baris |
| **Readability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | O(n) | O(n) |

---

## 🔍 Penjelasan Baris per Baris (Solusi Final)

```javascript
// Baris 1: Deklarasi fungsi
const alphabetPosition = (text) => {
// Arrow function yang menerima satu parameter 'text' (string input)

// Baris 2: Extract semua huruf
  const matchedChars = text.toLowerCase().match(/[a-z]/g) || [];
// text.toLowerCase()     → Seragamkan huruf besar & kecil menjadi lowercase
// .match(/[a-z]/g)       → Cari SEMUA karakter yang cocok dengan pattern [a-z]
//   /[a-z]/              → Character class: cocokkan huruf 'a' sampai 'z'
//   g (global flag)      → Cari SEMUA kemunculan, bukan hanya yang pertama
//   Return: ['t','h','e',...] atau null jika tidak ada huruf sama sekali
// || []                  → Jika match() return null, gunakan array kosong
//                          Ini mencegah error saat .map() dipanggil pada null

// Baris 4: Transform & gabung
  return matchedChars.map((char) => char.charCodeAt(0) - 96).join(' ');
// .map((char) => ...)    → Transform setiap huruf menjadi angka posisi alfabet
//   char.charCodeAt(0)   → Ambil kode ASCII dari karakter
//                          'a' = 97, 'b' = 98, ..., 'z' = 122
//   - 96                 → Geser agar 'a' = 1, 'b' = 2, ..., 'z' = 26
// .join(' ')             → Gabungkan array angka menjadi string dengan pemisah spasi
//                          [20, 8, 5] → "20 8 5"
};
```

---

## 🧪 Verifikasi Manual

**Test Case 1:**
```javascript
alphabetPosition("The sunset sets at twelve o' clock.")

// Proses:
1. toLowerCase()  → "the sunset sets at twelve o' clock."
2. match(/[a-z]/g) → ['t','h','e','s','u','n','s','e','t','s','e','t','s',
                       'a','t','t','w','e','l','v','e','o','c','l','o','c','k']
   // Spasi, apostrof, dan titik otomatis diabaikan oleh Regex ✅
3. map(charCodeAt - 96) → [20,8,5,19,21,14,19,5,20,19,5,20,19,
                            1,20,20,23,5,12,22,5,15,3,12,15,3,11]
4. join(' ') → "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"
// ✅ Sesuai expected output!
```

**Test Case 2:**
```javascript
alphabetPosition("The narwhal bacons at midnight.")

// Proses:
1. toLowerCase()  → "the narwhal bacons at midnight."
2. match(/[a-z]/g) → ['t','h','e','n','a','r','w','h','a','l','b','a','c',
                       'o','n','s','a','t','m','i','d','n','i','g','h','t']
3. map(charCodeAt - 96) → [20,8,5,14,1,18,23,8,1,12,2,1,3,
                            15,14,19,1,20,13,9,4,14,9,7,8,20]
4. join(' ') → "20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20"
// ✅ Sesuai expected output!
```

---

## 📈 Evolusi Solusi & Pelajaran

```
V1 (Imperatif)                          V2 (Deklaratif / Final)
─────────────────────────               ─────────────────────────
✓ toLowerCase()                         ✓ toLowerCase()
✓ for...of loop manual                  ✓ match(/[a-z]/g) → otomatis
✓ if (char >= 'a' && char <= 'z')  →    ✓ Regex sudah handle filter
✓ charCodeAt(0) - 96                    ✓ charCodeAt(0) - 96
✓ result.push(code)                →    ✓ map() langsung return array
✓ result.join(' ')                      ✓ .join(' ') di-chain langsung
⚠️ 7+ baris logika                      ✅ 2 baris logika
```

### Pelajaran dari Refactoring:

1. **Regex `match()` Sangat Powerful untuk Filtering**
   - Daripada loop + if manual, `/[a-z]/g` langsung mengekstrak semua huruf sekaligus.
   - Karakter non-huruf (spasi, angka, simbol) otomatis diabaikan tanpa kita perlu menulis logika tambahan.

2. **Selalu Handle `null` dari `match()`**
   - `match()` return `null` (bukan array kosong) jika tidak ada yang cocok.
   - Pattern `|| []` adalah *safety net* standar agar `.map()` tidak error.

3. **Chaining Method = Kode Lebih Ringkas**
   - `text.toLowerCase().match().map().join()` — semua operasi bisa di-chain dalam satu alur.
   - Tidak perlu variabel perantara (`result`, `formatted`).

4. **`charCodeAt(0) - 96` adalah Rumus Konversi Huruf → Angka**
   - ASCII 'a' = 97. Dikurangi 96 → posisi 1.
   - Ini adalah teknik klasik yang sering muncul di challenge string manipulation.

---

**Konsep Penting yang Dipelajari:**
1. **Regex `/[a-z]/g`**: Character class untuk mencocokkan huruf lowercase, flag `g` untuk global match.
2. **`match()` + `|| []`**: Pattern safety net menghindari null error.
3. **`charCodeAt(0) - 96`**: Rumus konversi huruf ke posisi alfabet.
4. **`map()` vs manual loop**: Deklaratif lebih ringkas tanpa kehilangan performa.
5. **Method chaining**: Menggabungkan beberapa operasi dalam satu alur yang elegan.

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
