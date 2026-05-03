# 🧠 02 — Metodologi & Pendekatan

![Level](https://img.shields.io/badge/Level-8%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Dekonstruksi Masalah (Mental Model)

Tantangan ini terdiri dari **dua tahap operasi** yang berurutan:

1. **Komputasi Aritmatika** — Menghitung rata-rata dari tiga nilai input.
2. **Klasifikasi Kondisional** — Memetakan nilai rata-rata ke dalam rentang huruf yang sesuai.

Tantangan utamanya bukan pada matematikanya (yang trivial), melainkan pada **penyusunan urutan kondisi** agar logika `if-else` bekerja dengan benar dan efisien — sebuah pola klasik yang disebut *Waterfall Logic*.

---

## 🗺️ Algoritma Dasar (Pseudocode)

```text
START
  RECEIVE argumen s1, s2, s3
  COMPUTE average = (s1 + s2 + s3) / 3
  IF average >= 90 THEN
    RETURN 'A'
  ELSE IF average >= 80 THEN
    RETURN 'B'
  ELSE IF average >= 70 THEN
    RETURN 'C'
  ELSE IF average >= 60 THEN
    RETURN 'D'
  ELSE
    RETURN 'F'
  END IF
END
```

---

## 🎨 Visualisasi Alur: Waterfall Logic

```text
 [ Input: s1, s2, s3 ]
          │
  (s1 + s2 + s3) / 3  ──► [ average ]
          │
 ┌────────────────────────┐
 │ average >= 90? ────────┼──► Ya: return 'A' (STOP)
 └────────┬───────────────┘
          │ Tidak (pasti < 90)
 ┌────────────────────────┐
 │ average >= 80? ────────┼──► Ya: return 'B' (STOP)
 └────────┬───────────────┘
          │ Tidak (pasti < 80)
 ┌────────────────────────┐
 │ average >= 70? ────────┼──► Ya: return 'C' (STOP)
 └────────┬───────────────┘
          │ Tidak (pasti < 70)
 ┌────────────────────────┐
 │ average >= 60? ────────┼──► Ya: return 'D' (STOP)
 └────────┬───────────────┘
          │ Tidak (pasti < 60)
          └───────────────────► return 'F'
```

> 💡 **Prinsip Kunci:** Karena JavaScript mengeksekusi `if-else if` secara sekuensial dari atas ke bawah, setiap kondisi yang berhasil dilewati secara implisit menyaring rentang di atasnya. Inilah mengapa kita **tidak perlu** menulis `average >= 80 && average < 90` — cukup `average >= 80` saja sudah mewakili rentang 80–89.

---

## ✅ Solusi Final

```javascript
function getGrade(s1, s2, s3) {
  const average = (s1 + s2 + s3) / 3;

  if (average >= 90 && average <= 100) {
    return 'A';
  } else if (average >= 80) {
    return 'B';
  } else if (average >= 70) {
    return 'C';
  } else if (average >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}
```

---

## 🔍 Analisis Komponen Kritis

1. **`(s1 + s2 + s3) / 3`** — *Grouping Operator* `()` memastikan penjumlahan dilakukan **sebelum** pembagian. Tanpa kurung, hanya `s3` yang akan dibagi 3 karena JavaScript mengikuti aturan *operator precedence* (perkalian/pembagian didahulukan dari penjumlahan).

2. **`const average`** — Menggunakan `const` karena nilai rata-rata tidak akan bermutasi setelah dihitung. Ini adalah praktik baik untuk menandai variabel yang bersifat *immutable*.

3. **`average >= 90 && average <= 100`** — Kondisi pertama secara eksplisit menyertakan batas atas (`<= 100`). Sebenarnya tidak wajib karena soal menjamin nilai 0–100, tetapi menjadi *self-documenting code* yang menjelaskan rentang secara jelas.

4. **Waterfall Pattern** — Kondisi-kondisi berikutnya (`>= 80`, `>= 70`, `>= 60`) tidak memerlukan batas atas karena sudah terfilter oleh kondisi di atasnya. Ini menghasilkan kode yang lebih bersih dan mengurangi duplikasi logika.

5. **`else` sebagai Safety Net** — Blok `else` terakhir menangkap semua nilai di bawah 60 tanpa perlu kondisi eksplisit. Ini adalah pola *catch-all* yang umum dalam logika bertingkat.

---

## 🧪 Verifikasi Manual

```javascript
console.log(getGrade(95, 90, 93));   // avg = 92.67  → 'A' ✅
console.log(getGrade(70, 70, 100));  // avg = 80.00  → 'B' ✅
console.log(getGrade(75, 70, 75));   // avg = 73.33  → 'C' ✅
console.log(getGrade(60, 60, 60));   // avg = 60.00  → 'D' ✅
console.log(getGrade(44, 55, 52));   // avg = 50.33  → 'F' ✅
```

---

## ⏱️ Kompleksitas Komputasi

- **Time Complexity:** $O(1)$ — Jumlah operasi aritmatika dan perbandingan bersifat konstan, tidak bergantung pada ukuran input.
- **Space Complexity:** $O(1)$ — Hanya satu variabel tambahan (`average`) yang dialokasikan.

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
