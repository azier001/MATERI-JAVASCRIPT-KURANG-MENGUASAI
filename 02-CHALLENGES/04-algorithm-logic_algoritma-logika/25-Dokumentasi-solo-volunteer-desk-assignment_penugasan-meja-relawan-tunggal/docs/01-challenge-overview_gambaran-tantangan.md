# 📋 Challenge Overview — Gambaran Tantangan

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20String%20|%20Math-blue?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Source](https://img.shields.io/badge/Source-Coddy.tech-purple?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🧩 | [Deskripsi Challenge](#deskripsi) | Penjelasan soal dan tujuan fungsi |
| 📏 | [Aturan Challenge](#aturan) | Format input, output, dan ketentuan penting |
| 🎯 | [3 Misi dalam 1 Fungsi](#misi) | Breakdown visual tiap misi dengan tabel contoh |
| 📤 | [Contoh Input & Output](#contoh) | Test cases lengkap + walkthrough detail |
| 🧠 | [Pemahaman Awal](#pemahaman) | Pertanyaan kunci & diagram alur sebelum ngoding |

---

<a name="deskripsi"></a>
## 🧩 Deskripsi Challenge

Bayangkan kamu seorang koordinator acara sukarela di sebuah kantor besar. Bosmu memberikan tiga data sekaligus: daftar ID karyawan (di mana setiap ID muncul dua kali kecuali **satu relawan tunggal**), nama ruangan kantor, dan nomor meja. Tugasmu adalah menganalisis ketiga data tersebut dan memberikan laporan berisi tiga informasi sekaligus.

Secara teknis, buat fungsi `findSoloVolunteer(employeeIds, roomName, deskNumber)` yang menerima tiga parameter:
- **`employeeIds`** (array of numbers) — daftar ID karyawan di mana setiap ID muncul tepat dua kali, kecuali satu ID yang hanya muncul sekali.
- **`roomName`** (string) — nama ruangan kantor.
- **`deskNumber`** (integer) — nomor meja.

Fungsi ini harus mengembalikan array berisi tiga nilai: ID relawan tunggal, posisi 1-indexed huruf vokal terakhir di nama ruangan (atau `-1` jika tidak ada vokal), dan boolean apakah nomor meja merupakan pangkat 3 (*power of 3*).

> ⚠️ **Catatan penting:** Challenge ini menguji **3 konsep berbeda sekaligus** dalam satu fungsi — manipulasi Array, pencarian String, dan logika Matematika. Setiap "misi" bersifat independen satu sama lain.

---

<a name="aturan"></a>
## 📏 Aturan Challenge

| Aturan | Keterangan |
|--------|------------|
| 📦 Format Input | `employeeIds`: array of numbers, `roomName`: string, `deskNumber`: integer |
| 📤 Format Output | Array berisi 3 elemen: `[number, number, boolean]` |
| 🔍 Elemen 1 | ID karyawan yang hanya muncul **sekali** (tidak punya pasangan) |
| 🔤 Elemen 2 | Posisi **1-indexed** dari huruf vokal **terakhir** di `roomName` (`-1` jika tidak ada vokal) |
| 🔢 Elemen 3 | `true` jika `deskNumber` adalah **pangkat 3** (power of 3), `false` jika bukan |

> [!IMPORTANT]
> 🔔 **"1-indexed"** berarti hitungan posisi dimulai dari **1** (bukan 0 seperti index komputer). Jadi huruf pertama dalam string berada di posisi **1**, bukan **0**.

> [!IMPORTANT]
> 🔔 **"Power of 3"** berbeda dengan **"kelipatan 3"**! Angka 6 habis dibagi 3 (kelipatan 3), tapi **bukan** pangkat 3. Power of 3 adalah hasil dari 3⁰=1, 3¹=3, 3²=9, 3³=27, 3⁴=81, dst.

---

<a name="misi"></a>
## 🎯 3 Misi dalam 1 Fungsi

Challenge ini bisa dipecah menjadi **3 misi independen** yang masing-masing memiliki logika tersendiri:

```
findSoloVolunteer(employeeIds, roomName, deskNumber)
  │
  ├── 🔵 MISI 1: Cari ID yang Jomblo (Array)
  │     └── Cari angka yang hanya muncul 1 kali
  │
  ├── 🟢 MISI 2: Cari Vokal Terakhir (String)
  │     └── Temukan posisi 1-indexed vokal paling akhir
  │
  └── 🟠 MISI 3: Cek Pangkat 3 (Matematika)
        └── Apakah angka = 3⁰, 3¹, 3², 3³, ... ?
```

### 🔵 Misi 1 — Mencari ID Relawan Tunggal

> **Pertanyaan inti:** Dari sekumpulan angka di mana setiap angka muncul 2 kali kecuali satu, bagaimana menemukan angka yang "jomblo"?

| Array Input | Penjelasan | Solo ID |
|:-----------:|:----------:|:-------:|
| `[2, 2, 3]` | Angka 2 ada 2 kali, angka 3 hanya 1 kali | **3** |
| `[5, 5, 7]` | Angka 5 ada 2 kali, angka 7 hanya 1 kali | **7** |
| `[1, 2, 3, 2, 1]` | Angka 1 dan 2 masing-masing 2 kali, angka 3 hanya 1 kali | **3** |

### 🟢 Misi 2 — Mencari Posisi Vokal Terakhir

> **Pertanyaan inti:** Dari sebuah string, di mana posisi huruf vokal (a, i, u, e, o) yang paling terakhir? Hitungannya dimulai dari 1 (bukan 0).

| Room Name | Huruf Vokal yang Ada | Vokal Terakhir | Posisi (1-indexed) |
|:---------:|:--------------------:|:--------------:|:------------------:|
| `"Main"` | **a** (pos 2), **i** (pos 3) | `i` | **3** |
| `"Rhythm"` | *(tidak ada vokal)* | — | **-1** |
| `"Conference Room B"` | o(2), e(5), e(8), o(12), o(14) | `o` | **14** |
| `"Main Hall"` | a(2), i(3), a(7) | `a` | **7** |
| `"Breakroom"` | e(3), a(4), o(8) | `o` | **8** |

### 🟠 Misi 3 — Mengecek Power of 3

> **Pertanyaan inti:** Apakah sebuah angka merupakan hasil dari 3 dipangkatkan sesuatu (3⁰, 3¹, 3², ...)?

| Desk Number | Apakah Power of 3? | Penjelasan |
|:-----------:|:-------------------:|:----------:|
| `1` | ✅ `true` | 3⁰ = 1 |
| `9` | ✅ `true` | 3² = 9 |
| `27` | ✅ `true` | 3³ = 27 |
| `81` | ✅ `true` | 3⁴ = 81 |
| `6` | ❌ `false` | Habis dibagi 3, tapi bukan pangkat 3 |
| `12` | ❌ `false` | Habis dibagi 3, tapi bukan pangkat 3 |
| `0` | ❌ `false` | Tidak ada pangkat 3 yang menghasilkan 0 |

> [!WARNING]
> ⚠️ **Jebakan Klasik:** Jangan samakan "habis dibagi 3" dengan "pangkat 3"! Angka `6` habis dibagi 3 (`6 % 3 === 0`), tapi dia **bukan** power of 3 karena tidak ada bilangan bulat `x` di mana `3ˣ = 6`.

---

<a name="contoh"></a>
## 📤 Contoh Input & Output

```javascript
console.log(findSoloVolunteer([2, 2, 3], "Main", 9));
// Output: [3, 3, true]
```

### Kenapa `findSoloVolunteer([2, 2, 3], "Main", 9)` hasilnya `[3, 3, true]`?

```
Mulai dengan employeeIds = [2, 2, 3], roomName = "Main", deskNumber = 9

🔵 MISI 1 — Cari ID Jomblo:
  Angka 2 → muncul di index 0 dan 1 → punya pasangan → SKIP
  Angka 3 → muncul di index 2 saja  → JOMBLO! → soloId = 3 ✅

🟢 MISI 2 — Cari Vokal Terakhir dari "Main":
  Cek dari belakang:
  Index 3: 'n' → bukan vokal → lanjut mundur
  Index 2: 'i' → VOKAL! → posisi 1-indexed = 2 + 1 = 3 → STOP! ✅

🟠 MISI 3 — Cek apakah 9 adalah Power of 3:
  9 ÷ 3 = 3 (habis dibagi 3, lanjut)
  3 ÷ 3 = 1 (habis dibagi 3, lanjut)
  Hasil akhir = 1 → isPowerOfThree = true ✅

Output: [3, 3, true] ✅
```

```javascript
console.log(findSoloVolunteer([5, 5, 7], "Rhythm", 1));
// Output: [7, -1, true]
```

```javascript
console.log(findSoloVolunteer([1, 2, 3, 2, 1], "Conference Room B", 27));
// Output: [3, 14, true]
```

```javascript
console.log(findSoloVolunteer([10, 20, 30, 20, 10], "Main Hall", 81));
// Output: [30, 7, true]
```

```javascript
console.log(findSoloVolunteer([8, 15, 22, 15, 8, 33, 33], "Breakroom", 1));
// Output: [22, 8, true]
```

> 💡 **Perhatikan:** Test case kedua (`"Rhythm"`) tidak punya huruf vokal sama sekali, sehingga output elemen kedua adalah `-1`. Dan test case terakhir menunjukkan bahwa `1` adalah Power of 3 (karena 3⁰ = 1), meskipun angka 1 **tidak** habis dibagi 3!

---

<a name="pemahaman"></a>
## 🧠 Pemahaman Awal

Sebelum menulis kode, ada 3 pertanyaan kunci — satu untuk setiap misi:

**1. 🔵 Bagaimana cara menemukan angka yang hanya muncul sekali di dalam array?**
> Ada beberapa pendekatan: menggunakan **Frequency Map** (Object untuk menghitung kemunculan), membandingkan **`indexOf` vs `lastIndexOf`** (jika posisi pertama = posisi terakhir, berarti hanya muncul sekali), atau menggunakan **`.find()`** dengan logika yang sama. Pendekatan paling "hacker" adalah menggunakan **Bitwise XOR** di mana angka kembar saling menghancurkan.

**2. 🟢 Bagaimana cara menemukan posisi vokal terakhir secara efisien?**
> Karena yang dicari adalah vokal **terakhir**, cara paling efisien adalah menelusuri string **dari belakang (kanan ke kiri)**. Begitu vokal pertama ditemukan saat berjalan mundur, itu pasti vokal terakhir — langsung `break` tanpa perlu memeriksa huruf sisanya. Jangan lupa konversi ke 1-indexed (`index + 1`).

**3. 🟠 Bagaimana cara mengecek apakah suatu angka adalah pangkat 3?**
> Bagi angka tersebut dengan 3 secara berulang (`while` loop) selama masih habis dibagi. Jika hasil akhirnya adalah `1`, maka angka tersebut adalah pangkat 3. Jika bukan `1`, berarti bukan pangkat 3.

```
findSoloVolunteer(employeeIds, roomName, deskNumber)
  │
  ├── 🔵 MISI 1: Cari soloId
  │     ├── Pendekatan A: Frequency Map → cari yang count-nya 1
  │     ├── Pendekatan B: indexOf === lastIndexOf → jomblo!
  │     └── Pendekatan C: Bitwise XOR → kembar saling hancur
  │
  ├── 🟢 MISI 2: Cari vowelPosition
  │     ├── Loop mundur dari akhir string
  │     ├── Cek apakah huruf termasuk 'aiueoAIUEO'
  │     └── Ketemu? Simpan (index + 1) lalu STOP
  │
  ├── 🟠 MISI 3: Cek isPowerOfThree
  │     ├── deskNumber <= 0? → langsung false
  │     ├── While habis dibagi 3 → terus bagi
  │     └── Hasil akhir === 1? → true, selain itu false
  │
  └── return [soloId, vowelPosition, isPowerOfThree]
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 02 — Problem Solving Approach →](./02-problem-solving-approach_alur-berpikir.md)**
