# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

Pikiran pertama yang muncul saat membaca soal ini adalah menggunakan **Regular Expression (Regex)**. Karena kita perlu mencari karakter tertentu dalam string (huruf `n` sampai `z`), Regex adalah cara yang paling efisien dan singkat dibandingkan melakukan loop manual satu per satu huruf.

Ide kuncinya:
1. Cari semua huruf yang termasuk kategori "error" (`n-z`).
2. Hitung berapa jumlahnya.
3. Ambil panjang total string aslinya.
4. Gabungkan keduanya dalam format `"error/panjang"`.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```text
1. Buat pola Regex untuk menangkap huruf 'n' sampai 'z'.
2. Gunakan method .match() dengan flag 'g' (global) untuk mencari semua kecocokan.
3. Gunakan operator '||' untuk menangani kasus null (jika tidak ada error sama sekali).
4. Ambil .length dari hasil match tersebut.
5. Gunakan template literal untuk mengembalikan string "jumlah_error/panjang_string".
```

---

## 🎨 Visualisasi Alur

```
[Input] → printerError("aaaxbbbbyyhwawiwjjjwwm")

Langkah 1: Jalankan Regex /[n-z]/gi pada string
  s.match(/[n-z]/gi)
  → Scan setiap karakter:
    a(✅) a(✅) a(✅) x(❌) b(✅) b(✅) b(✅) b(✅) y(❌) y(❌)
    h(✅) w(❌) a(✅) w(❌) i(✅) w(❌) j(✅) j(✅) j(✅) w(❌)
    w(❌) m(✅)

  → Hasil match: ["x", "y", "y", "w", "w", "w", "w", "w"]

Langkah 2: Hitung jumlah error
  matches = ["x", "y", "y", "w", "w", "w", "w", "w"].length
  matches = 8

Langkah 3: Ambil panjang string
  s.length = 22

Langkah 4: Format output
  `${8}/${22}` → "8/22"

[Output] → "8/22"
```

---

## 🔄 Percobaan Pertama — Negated Regex & Ternary (Kode Awal)

Kode pertama yang ditulis **sebelum mentoring**. Langsung lulus tes, tapi bisa dipoles.

```javascript
// Attempt #1 — Original Code (Negated Regex & Ternary)
function printerError(s) {
  const pattern = /[^a-m]/gi;
  const matches = s.match(pattern);
  const matchesLength = matches ? matches.length : 0;

  return `${matchesLength}/${s.length}`;
}
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ Setiap langkah jelas, mudah di-debug |
| Keringkasan | ⭐⭐⭐ Ada 3 variabel perantara (bisa diringkas) |
| Pendekatan Regex | `[^a-m]` — Negated set, cari semua yang BUKAN a-m |
| Null Handling | Ternary `matches ? ... : 0` — aman tapi verbose |

> 💡 **Insight**: Penggunaan `[^a-m]` (negated regex) sebenarnya sangat cerdik. Alih-alih mengatakan "cari n sampai z", kita bilang "cari apapun yang bukan a sampai m". Hasilnya identik, tapi perspektifnya berbeda.

---

## 🔄 Percobaan Kedua — Refactored (Setelah Mentoring)

Setelah mentoring, kita melakukan *refactoring* dengan dua perubahan:
1. Ganti `[^a-m]` → `[n-z]` (lebih eksplisit sesuai deskripsi soal).
2. Ganti ternary → `|| []` (lebih idiomatis, *short-circuiting*).

```javascript
// Attempt #2 — Refactored (Short-circuiting & Explicit Range)
function printerError(s) {
  const matches = (s.match(/[n-z]/gi) || []).length;
  return `${matches}/${s.length}`;
}
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐ Masih jelas, cukup 2 baris inti |
| Keringkasan | ⭐⭐⭐⭐⭐ Dari 5 baris menjadi 2 baris |
| Pendekatan Regex | `[n-z]` — Explicit range, langsung sesuai soal |
| Null Handling | `\|\| []` — Short-circuit, lebih idiomatis |

> 💡 **Perbaikan kunci**: Pola `(s.match(...) || []).length` adalah *best practice* JavaScript yang sangat umum. Jika `.match()` mengembalikan `null`, operator `||` akan menggantikannya dengan array kosong `[]` — sehingga `.length` tetap menghasilkan `0` tanpa error.

---

## ✅ Solusi Final

```javascript
function printerError(s) {
  const pattern = /[n-z]/gi;
  const matches = (s.match(pattern) || []).length;

  return `${matches}/${s.length}`;
}
```

---

## 🔍 Penjelasan Baris per Baris

```javascript
function printerError(s) {       // Menerima parameter 's' berupa control string dari printer
  const pattern = /[n-z]/gi;     // Pola Regex: cari huruf n sampai z
                                 //   'g' → global (cari semua, bukan cuma yang pertama)
                                 //   'i' → case-insensitive (abaikan besar/kecil huruf)

  const matches = (s.match(pattern) || []).length;
  // s.match(pattern)  → cari semua karakter yang cocok, hasilnya Array atau null
  // || []             → jika null (tidak ada error), ganti dengan array kosong
  // .length           → hitung jumlah elemen (= jumlah error)

  return `${matches}/${s.length}`;
  // Template literal → gabungkan jumlah error dan panjang string
  // Contoh: `${8}/${22}` → "8/22"
}
```

---

## 📈 Potensi Evolusi Solusi

```
V1 / Kode Awal (Negated Regex)        V2 / Final (Explicit Range)
──────────────────────────────         ──────────────────────────────
function printerError(s) {             function printerError(s) {
  const pattern = /[^a-m]/gi;     →      const pattern = /[n-z]/gi;
  const matches = s.match(pattern);      const matches = (s.match(pattern)
  const matchesLength =                                   || []).length;
    matches ? matches.length : 0;
                                         return `${matches}/${s.length}`;
  return `${matchesLength}/              }
          ${s.length}`;
}
(5 baris, 3 variabel)                  (3 baris, 1 variabel)
```

> 💡 Versi refactored lebih ringkas, tapi keduanya punya **O(n) Time Complexity** yang sama (regex harus scan seluruh string). Lihat alternatif dari komunitas di [03-refleksi.md](03-refleksi.md).

---

## 🧪 Verifikasi Manual

| Input `s` | Error (n-z) | Total | Hasil | Expected | Status |
|:---------:|:-----------:|:-----:|:-----:|:--------:|:------:|
| `"aaabbbbhaijjjm"` | 0 | 14 | `"0/14"` | `"0/14"` | ✅ |
| `"aaaxbbbbyyhwawiwjjjwwm"` | 8 | 22 | `"8/22"` | `"8/22"` | ✅ |
| `"nnnn"` | 4 | 4 | `"4/4"` | `"4/4"` | ✅ |
| `"a"` | 0 | 1 | `"0/1"` | `"0/1"` | ✅ |

```javascript
console.log(printerError("aaabbbbhaijjjm"));        // → "0/14" ✅
console.log(printerError("aaaxbbbbyyhwawiwjjjwwm")); // → "8/22" ✅
console.log(printerError("nnnn"));                   // → "4/4"  ✅
console.log(printerError("a"));                      // → "0/1"  ✅
```

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
