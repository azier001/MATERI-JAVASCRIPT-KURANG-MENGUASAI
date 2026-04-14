# 💡 Part 01 — Konsep & Pendekatan

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 💡 Konsep | 🔑 Awal Urutan | 📐 Selisih | 🗺️ Pendekatan | ✅ Ringkasan |
|:---------:|:--------------:|:----------:|:-------------:|:-----------:|
| [Jump](#-apa-itu-consecutive-sequence) | [Jump](#-ide-utama-menemukan-awal-urutan) | [Jump](#-konsep-selisih-pada-sorting) | [Jump](#-pendekatan-penyelesaian) | [Jump](#-ringkasan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami apa itu consecutive sequence
- ✅ Memahami konsep "awal urutan" sebagai ide kunci solusi Set
- ✅ Memahami konsep selisih sebagai ide kunci solusi Sorting
- ✅ Memahami dua pendekatan berbeda yang akan dibahas
- ✅ Siap untuk melihat implementasi kode di Part 02

---

## 💡 Apa itu Consecutive Sequence?

Consecutive sequence adalah urutan bilangan bulat yang **berurutan** — setiap angka berikutnya selisihnya tepat `1` dari angka sebelumnya.

```
✅ Consecutive:     [1, 2, 3, 4]      → selisih antar angka = 1
✅ Consecutive:     [5, 6, 7]         → selisih antar angka = 1
❌ Bukan consecutive: [1, 3, 5]       → selisih antar angka = 2
❌ Bukan consecutive: [1, 2, 4, 5]    → ada yang lompat di 2→4
```

Challenge ini meminta kita menemukan **panjang** consecutive sequence terpanjang dari array yang **tidak terurut**:

```
Input:  [100, 4, 200, 1, 3, 2]
                         ↑
               acak, tidak terurut!

Output: 4
        ↑
        panjang urutan [1, 2, 3, 4]
```

---

## 🔑 Ide Utama: Menemukan Awal Urutan

Tantangan utama challenge ini adalah: **bagaimana cara menemukan di mana sebuah urutan dimulai?**

Perhatikan array setelah dimasukkan ke Set:

```
Set: {100, 4, 200, 1, 3, 2}
```

Dari semua angka di atas, hanya `1` dan `100` dan `200` yang merupakan **awal urutan**. Bagaimana cara mengetahuinya?

> **Sebuah angka adalah awal urutan kalau angka sebelumnya (`num - 1`) tidak ada di Set.**

```
num = 1   → cek apakah 0 ada di Set?   ❌ Tidak ada → AWAL URUTAN ✅
num = 2   → cek apakah 1 ada di Set?   ✅ Ada       → bukan awal, skip
num = 3   → cek apakah 2 ada di Set?   ✅ Ada       → bukan awal, skip
num = 4   → cek apakah 3 ada di Set?   ✅ Ada       → bukan awal, skip
num = 100 → cek apakah 99 ada di Set?  ❌ Tidak ada → AWAL URUTAN ✅
num = 200 → cek apakah 199 ada di Set? ❌ Tidak ada → AWAL URUTAN ✅
```

Setelah menemukan awal urutan, kita hitung panjangnya ke depan dengan `while` loop selama angka berikutnya ada di Set.

---

## 📐 Konsep Selisih pada Sorting

Pendekatan Sorting menggunakan ide yang berbeda — **membandingkan selisih antar elemen yang berdekatan** setelah array diurutkan:

```
Setelah sort: [1, 2, 3, 4, 100, 200]

selisih 2-1   = 1 → berurutan ✅ lanjutkan hitungan
selisih 3-2   = 1 → berurutan ✅ lanjutkan hitungan
selisih 4-3   = 1 → berurutan ✅ lanjutkan hitungan
selisih 100-4 = 96 → putus ❌ reset hitungan
selisih 200-100 = 100 → putus ❌ reset hitungan
```

Ada tiga kemungkinan selisih:

| Selisih | Artinya | Aksi |
|---------|---------|------|
| `=== 1` | Berurutan | `currentLength++` |
| `=== 0` | Duplikat | Skip, lanjut |
| `> 1` | Putus | Reset `currentLength = 1` |

---

## 🗺️ Pendekatan Penyelesaian

Ada dua pendekatan berbeda yang akan kita bahas:

### Pendekatan 1 — Sorting

```
1. Sort array secara ascending
2. Loop dari index 1, bandingkan nums[i] dengan nums[i-1]
3. Kalau selisih === 1 → currentLength++
4. Kalau selisih === 0 → skip (duplikat)
5. Kalau selisih > 1  → reset currentLength = 1
6. Update longestLength setiap iterasi
```

Mudah dipahami karena mengikuti alur yang natural — urutkan dulu, lalu hitung.

---

### Pendekatan 2 — Set

```
1. Masukkan semua angka ke Set
2. Loop setiap angka di Set
3. Kalau num - 1 tidak ada di Set → ini awal urutan!
4. Hitung panjang urutan ke depan dengan while loop
5. Update longestLength kalau lebih panjang
```

Lebih efisien karena tidak perlu sorting — pengecekan `has()` di Set hanya O(1).

---

## ❌ Kenapa Tidak Cukup Nested Loop Saja?

Kita bisa saja mengecek semua kombinasi pasangan angka, tapi ini sangat tidak efisien:

```javascript
// Nested Loop — mengecek semua kombinasi: O(n²)
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    // setiap elemen dicek dengan semua elemen lainnya
  }
}
```

Sorting dan Set jauh lebih efisien karena tidak perlu mengecek semua kombinasi.

| Pendekatan | Waktu | Memori |
|------------|-------|--------|
| Nested Loop | O(n²) | O(1) |
| Sorting | O(n log n) | O(1) |
| Set | O(n) | O(n) |

---

## ✅ Ringkasan

| Konsep | Penjelasan |
|--------|------------|
| Consecutive sequence | Urutan bilangan bulat dengan selisih tepat `1` antar angka |
| Awal urutan | Angka `num` di mana `num - 1` tidak ada di Set |
| Selisih | Perbedaan nilai antar dua angka berdekatan setelah di-sort |
| Sorting | Urutkan dulu, lalu bandingkan selisih — O(n log n) |
| Set | Simpan semua angka, cari awal urutan, hitung ke depan — O(n) |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 00: Deskripsi Soal](00-challenge-description_deskripsi-soal.md)**
- **📖 [Lanjut ke Part 02: Solusi — Sorting O(n log n) →](02-solution-sorting-on-log-n_solusi-sorting-on-log-n.md)**

---

<div align="center">

Made with ❤️ for learners

</div>