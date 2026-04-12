# 💡 Part 01 — Konsep & Pendekatan

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 💡 Konsep | 🔑 Complement | 📐 j = i + 1 | 🗺️ Pendekatan | ✅ Ringkasan |
|:---------:|:-------------:|:------------:|:-------------:|:-----------:|
| [Jump](#-apa-itu-two-sum) | [Jump](#-ide-utama-complement) | [Jump](#-kenapa-j--i--1) | [Jump](#-pendekatan-penyelesaian) | [Jump](#-ringkasan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami apa yang diminta soal Two Sum
- ✅ Memahami konsep complement sebagai ide utama
- ✅ Memahami kenapa `j = i + 1` pada nested loop
- ✅ Memahami tiga pendekatan berbeda yang akan dibahas
- ✅ Siap untuk melihat implementasi kode di Part 02

---

## 💡 Apa itu Two Sum?

Two Sum adalah challenge klasik yang meminta kita mencari **dua angka** dalam array yang jika dijumlahkan menghasilkan nilai target — lalu mengembalikan **indeks** keduanya.

```
nums   = [2, 7, 11, 15]
target = 9

2 + 7 = 9 ✅ → indeksnya adalah 0 dan 1
→ return [0, 1]
```

Perhatikan — yang dikembalikan adalah **indeks**, bukan nilai angkanya!

---

## 🔑 Ide Utama: Complement

Tantangan utama challenge ini adalah: **bagaimana cara menemukan pasangan yang tepat?**

Idenya sederhana — kalau kita sudah tahu nilai `nums[i]` dan `target`, maka kita sudah tahu **angka apa yang kita butuhkan** sebagai pasangan:

```
complement = target - nums[i]
```

Contoh:
```
target = 9, nums[i] = 2
complement = 9 - 2 = 7  ← kita butuh angka 7!

target = 9, nums[i] = 7
complement = 9 - 7 = 2  ← kita butuh angka 2!
```

Dengan konsep ini, kita tidak perlu mencoba semua kombinasi — cukup cek apakah complement-nya sudah ada.

---

## 📐 Kenapa j = i + 1?

Pada pendekatan nested loop, kita menggunakan dua variabel `i` dan `j` untuk mencari pasangan. Pertanyaannya — kenapa `j` harus mulai dari `i + 1`?

Bayangkan kita punya 4 orang: **A, B, C, D** dan ingin menjodohkan mereka sebagai pasangan:

```
❌ j mulai dari 0 — ada pasangan diri sendiri & duplikat:
  A-A, A-B, A-C, A-D
  B-A, B-B, B-C, B-D  ← A-B dan B-A itu pasangan yang sama!
  C-A, C-B, C-C, C-D

❌ j mulai dari i — masih ada pasangan diri sendiri:
  A-A, A-B, A-C, A-D
  B-B, B-C, B-D        ← A-A, B-B tidak masuk akal!
  C-C, C-D

✅ j mulai dari i + 1 — setiap pasangan unik:
  A-B, A-C, A-D
  B-C, B-D             ← bersih, tidak ada duplikat!
  C-D
```

Dengan `j = i + 1`, setiap pasangan hanya ditemukan **sekali** dan tidak ada elemen yang dipasangkan dengan dirinya sendiri.

---

## 🗺️ Pendekatan Penyelesaian

Ada tiga pendekatan berbeda yang akan kita bahas:

### Pendekatan 1 — Nested Loop (Brute Force)

```
Untuk setiap pasangan (i, j) di mana j > i:
  Cek apakah nums[i] + nums[j] === target
  Kalau ya → return [i, j]
```

Sederhana dan mudah dipahami, tapi mengecek **semua kombinasi** — lambat untuk array besar.

---

### Pendekatan 2 — HashMap

```
Untuk setiap nums[i]:
  Hitung complement = target - nums[i]
  Cek apakah complement sudah ada di Map
  Kalau ya → return [index complement, i]
  Kalau tidak → simpan nums[i] dan indeksnya ke Map
```

Hanya butuh **satu loop** — jauh lebih efisien. Map menyimpan angka beserta indeksnya sehingga kita bisa langsung mengambil indeks complement tanpa mencari ulang.

---

### Pendekatan 3 — Set

```
Untuk setiap nums[i]:
  Hitung complement = target - nums[i]
  Cek apakah complement sudah ada di Set
  Kalau ya → cari indeks complement dengan indexOf(), return hasilnya
  Kalau tidak → simpan nums[i] ke Set
```

Mirip HashMap tapi Set hanya menyimpan **nilai** tanpa indeks — akibatnya harus pakai `indexOf()` untuk mencari indeks, yang punya kelemahan tersendiri.

---

## ❌ Kenapa Tidak Cukup Nested Loop Saja?

Nested loop memang mudah dipahami, tapi ada kelemahannya:

```javascript
// Nested Loop — mengecek semua kombinasi
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    // setiap elemen dicek dengan semua elemen lainnya
  }
}
```

Untuk array **1 juta elemen**, nested loop bisa butuh hingga **1 triliun operasi**. HashMap hanya butuh **1 juta operasi** — 1 juta kali lebih cepat!

Konsep ini disebut **time-space trade-off** — HashMap lebih cepat (O(n)) tapi butuh memori ekstra untuk menyimpan data di Map.

| Pendekatan | Waktu | Memori |
|------------|-------|--------|
| Nested Loop | O(n²) | O(1) |
| HashMap | O(n) | O(n) |
| Set | O(n) | O(n) |

---

## ✅ Ringkasan

| Konsep | Penjelasan |
|--------|------------|
| Two Sum | Cari dua angka yang dijumlahkan = target, return indeksnya |
| Complement | `target - nums[i]` — angka yang kita butuhkan sebagai pasangan |
| `j = i + 1` | Agar setiap pasangan unik, tidak ada duplikat atau pasangan diri sendiri |
| Nested Loop | Cek semua kombinasi — mudah dipahami, O(n²) |
| HashMap | Simpan complement di Map — efisien, O(n) |
| Set | Mirip HashMap tapi tanpa indeks — ada kelemahan `indexOf()` |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 00: Deskripsi Soal](00-challenge-description_deskripsi-soal.md)**
- **📖 [Lanjut ke Part 02: Solusi — Nested Loop →](02-solution-nested-loop_solusi-nested-loop.md)**

---

<div align="center">

Made with ❤️ for learners

</div>