# 🧠 Problem Solving Approach — Alur Berpikir

### ✨ _Memecah 1 challenge menjadi 3 misi independen sebelum menulis satu baris kode pun_

> 🎯 **Tujuan:** Memahami logika di balik setiap misi (Array, String, Math) menggunakan visualisasi tabel dan analogi sehari-hari — sehingga saat mulai ngoding, kita tinggal "menerjemahkan" apa yang sudah dipahami.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20String%20|%20Math-blue?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🔍 | [Langkah 1 — Pahami Masalah](#langkah-1) | Terjemahkan challenge ke bahasa sederhana |
| 🔵 | [Langkah 2 — Analisis Misi 1: Cari ID Jomblo](#langkah-2) | Logika indexOf vs lastIndexOf |
| 🟢 | [Langkah 3 — Analisis Misi 2: Vokal Terakhir](#langkah-3) | Strategi loop mundur + konversi 1-indexed |
| 🟠 | [Langkah 4 — Analisis Misi 3: Power of 3](#langkah-4) | Pembagian berulang sampai mentok |
| 🔗 | [Langkah 5 — Gabungkan Menjadi Pseudocode](#langkah-5) | Blueprint fungsi sebelum ngoding |
| ❌ | [Kesalahan Pertama Saya](#kesalahan) | Jebakan "kelipatan 3" vs "pangkat 3" |

---

<a name="langkah-1"></a>
## 🔍 Langkah 1 — Pahami Masalah

Sebelum menulis kode, terjemahkan dulu masalahnya ke bahasa sederhana:

> *"Saya seorang koordinator acara sukarela. Bos memberikan tiga data: daftar ID karyawan (semuanya kembar kecuali satu relawan tunggal), nama ruangan kantor, dan nomor meja. Saya harus mencari tahu: (1) siapa relawan yang sendirian, (2) di mana posisi huruf vokal terakhir di nama ruangan, dan (3) apakah nomor meja merupakan hasil pangkat 3."*

3 pertanyaan kunci:
- **Apa inputnya?** → Tiga parameter berbeda tipe: `array`, `string`, dan `number`.
- **Apa outputnya?** → Satu array berisi 3 elemen: `[number, number, boolean]`.
- **Apa yang unik dari challenge ini?** → Ini bukan 1 masalah, tapi **3 masalah berbeda** yang digabung dalam 1 fungsi. Setiap misi bisa dikerjakan secara independen.

> [!TIP]
> 💡 **Analogi Mudah Dipahami**
>
> | | Tanpa Pemecahan | Dengan Pemecahan |
> |---|---|---|
> | 📝 | Melihat soal sebagai 1 masalah besar yang menakutkan | Memecahnya menjadi 3 masalah kecil yang bisa ditaklukkan satu-satu |
> | 🔑 | Bingung mau mulai dari mana | Kerjakan Misi 1 dulu, lalu Misi 2, lalu Misi 3 |

---

<a name="langkah-2"></a>
## 🔵 Langkah 2 — Analisis Misi 1: Cari ID yang Jomblo

**Pertanyaan:** Dari array `[10, 20, 30, 20, 10]`, bagaimana menemukan angka yang hanya muncul 1 kali?

### Tabel Breakdown Pola

| Angka | Index Pertama (`indexOf`) | Index Terakhir (`lastIndexOf`) | Sama? | Kesimpulan |
|:-----:|:-------------------------:|:------------------------------:|:-----:|:----------:|
| `10` | 0 | 4 | ❌ 0 ≠ 4 | Punya kembaran |
| `20` | 1 | 3 | ❌ 1 ≠ 3 | Punya kembaran |
| `30` | 2 | 2 | ✅ 2 = 2 | **JOMBLO!** |

### Visualisasi ASCII

```
Array: [10, 20, 30, 20, 10]
Index:   0   1   2   3   4

Cek angka 10:
  indexOf(10)     = 0  ──┐
  lastIndexOf(10) = 4  ──┘──→ 0 ≠ 4 → Punya pasangan → SKIP

Cek angka 20:
  indexOf(20)     = 1  ──┐
  lastIndexOf(20) = 3  ──┘──→ 1 ≠ 3 → Punya pasangan → SKIP

Cek angka 30:
  indexOf(30)     = 2  ──┐
  lastIndexOf(30) = 2  ──┘──→ 2 = 2 → JOMBLO! → soloId = 30 ✅
```

### 💡 Rumus yang Ditemukan

> **Jika `indexOf(angka) === lastIndexOf(angka)`, maka angka tersebut hanya muncul 1 kali.**
>
> *Kenapa?* Karena jika angka muncul lebih dari sekali, posisi pertama dan terakhirnya pasti **berbeda**. Jika posisinya **sama**, berarti dia hanya ada di satu tempat — alias jomblo.

---

<a name="langkah-3"></a>
## 🟢 Langkah 3 — Analisis Misi 2: Cari Vokal Terakhir

**Pertanyaan:** Dari string `"Main"`, bagaimana menemukan posisi huruf vokal terakhir? Dan kenapa hasilnya `3` (bukan `2`)?

### Tabel Breakdown Pola

| Huruf | `M` | `a` | `i` | `n` |
|:---:|:---:|:---:|:---:|:---:|
| **Index Komputer (0-based)** | 0 | 1 | 2 | 3 |
| **Posisi Manusia (1-based)** | 1 | 2 | 3 | 4 |
| **Apakah Vokal?** | ❌ | ✅ | ✅ | ❌ |

### Strategi: Cek dari Belakang (Kanan ke Kiri)

Karena yang dicari adalah vokal **terakhir**, cara paling efisien adalah mencari **dari belakang**:

```
String: "Main"
         M  a  i  n
         ←  ←  ←  ←  (arah pencarian: mundur)

Langkah 1: Cek 'n' (index 3) → bukan vokal → lanjut mundur
Langkah 2: Cek 'i' (index 2) → VOKAL! → STOP!
                                   │
                                   ▼
                         Konversi ke 1-indexed:
                         index 2 + 1 = posisi 3 ✅
```

> [!IMPORTANT]
> 🔔 **Kenapa cek dari belakang lebih efisien?**
> Kalau cek dari depan, kita harus membaca **seluruh** string sampai habis (karena kita tidak tahu apakah ada vokal lagi di belakang). Kalau dari belakang, begitu ketemu vokal pertama kali → langsung `break` → hemat waktu!

### Kasus Khusus: Tidak Ada Vokal

```
String: "Rhythm"
         R  h  y  t  h  m
         ←  ←  ←  ←  ←  ←  (mundur sampai habis)

Semua huruf dicek → tidak ada vokal ditemukan
→ posisi tetap di nilai awal = -1 ✅
```

### 💡 Rumus yang Ditemukan

> **Loop mundur dari `length - 1` ke `0`. Begitu ketemu vokal, simpan `index + 1` (konversi ke 1-indexed), lalu `break`.**
>
> *Kenapa `index + 1`?* Karena soal meminta posisi dimulai dari **1** (hitungan manusia), bukan dari **0** (hitungan komputer).

> [!WARNING]
> ⚠️ **Hati-hati dengan huruf besar/kecil!** String `"Main"` mengandung huruf `a` (kecil) dan tidak ada `A` (besar) di posisi vokal. Tapi string lain mungkin punya campuran. Solusinya: cek terhadap `'aiueoAIUEO'` sekaligus, atau gunakan `.toLowerCase()`.

---

<a name="langkah-4"></a>
## 🟠 Langkah 4 — Analisis Misi 3: Cek Power of 3

**Pertanyaan:** Dari angka `27`, bagaimana mengecek apakah dia adalah hasil pangkat 3?

### Perbedaan Mendasar: Kelipatan 3 vs Pangkat 3

| Angka | Habis Dibagi 3? (Kelipatan) | Pangkat 3? (Power) | Penjelasan |
|:-----:|:---------------------------:|:-------------------:|:----------:|
| 3 | ✅ | ✅ | 3¹ = 3 |
| 6 | ✅ | ❌ | Tidak ada 3ˣ = 6 |
| 9 | ✅ | ✅ | 3² = 9 |
| 12 | ✅ | ❌ | Tidak ada 3ˣ = 12 |
| 27 | ✅ | ✅ | 3³ = 27 |
| 1 | ❌ | ✅ | 3⁰ = 1 |

> [!CAUTION]
> 🔴 **JEBAKAN PALING BERBAHAYA!** Jangan samakan `deskNumber % 3 === 0` (kelipatan 3) dengan "power of 3" (pangkat 3). Angka 6 habis dibagi 3 tapi **bukan** pangkat 3!

### Strategi: Pembagian Berulang Sampai Mentok

Logika dasarnya: **Bagi angka dengan 3 terus-menerus selama masih habis dibagi. Jika sisa akhirnya adalah `1`, berarti dia pangkat 3.**

```
Contoh 1: deskNumber = 27 (Pangkat 3 ✅)

  27 ÷ 3 = 9   (habis? Ya ✅ → lanjut)
   9 ÷ 3 = 3   (habis? Ya ✅ → lanjut)
   3 ÷ 3 = 1   (habis? Ya ✅ → lanjut)
   1 % 3 ≠ 0   (STOP!)
   
   Hasil akhir = 1 → isPowerOfThree = true ✅
```

```
Contoh 2: deskNumber = 6 (Bukan Pangkat 3 ❌)

  6 ÷ 3 = 2   (habis? Ya ✅ → lanjut)
  2 % 3 ≠ 0   (STOP!)
  
  Hasil akhir = 2 → isPowerOfThree = false ❌
  (Karena 2 bukan 1, berarti 6 bukan pangkat 3)
```

```
Contoh 3: deskNumber = 1 (Edge Case ✅)

  1 % 3 ≠ 0   (STOP! Tidak perlu dibagi sama sekali)
  
  Hasil akhir = 1 → isPowerOfThree = true ✅
  (Karena 3⁰ = 1)
```

### 💡 Rumus yang Ditemukan

> **Selama `num % 3 === 0` dan `num > 0`, bagi terus: `num = num / 3`. Jika hasil akhir `num === 1`, maka `true`.**
>
> *Kenapa cara ini kebal jebakan?* Karena angka seperti `6` akan berhenti di `2` (bukan `1`), sehingga terdeteksi sebagai bukan pangkat 3.

---

<a name="langkah-5"></a>
## 🔗 Langkah 5 — Gabungkan Menjadi Pseudocode

```
FUNCTION findSoloVolunteer(employeeIds, roomName, deskNumber):

  ──── MISI 1: Cari ID Jomblo ────
  1. UNTUK setiap id di employeeIds:
       - JIKA indexOf(id) SAMA DENGAN lastIndexOf(id):
           → soloId = id
           → BERHENTI MENCARI (break)

  ──── MISI 2: Cari Vokal Terakhir ────
  2. Set vowelPosition = -1 (default: tidak ada vokal)
  3. LOOP MUNDUR dari akhir roomName ke awal:
       - JIKA huruf saat ini adalah vokal (a/i/u/e/o):
           → vowelPosition = index + 1 (konversi ke 1-indexed)
           → BERHENTI MENCARI (break)

  ──── MISI 3: Cek Pangkat 3 ────
  4. Set isPowerOfThree = false
  5. JIKA deskNumber > 0:
       - SELAMA deskNumber habis dibagi 3:
           → deskNumber = deskNumber ÷ 3
       - JIKA deskNumber sekarang === 1:
           → isPowerOfThree = true

  ──── OUTPUT ────
  6. Return [soloId, vowelPosition, isPowerOfThree]
```

Dari pseudocode ini, kita bisa membuat kode JavaScript yang sesungguhnya.
Masing-masing versi dibahas di **Part 03 sampai Part 06**.

---

<a name="kesalahan"></a>
## ❌ Kesalahan Pertama Saya

Saat pertama kali mencoba mengerjakan challenge ini secara mandiri (sebelum sesi mentoring), saya membuat kesalahan fatal pada **Misi 3**:

```javascript
// ❌ SALAH — mengecek kelipatan 3, bukan pangkat 3!
let isPowerThree = deskNumber === 1 || deskNumber % 3 === 0 ? true : false;
```

**Masalah 1 — Logika Matematika Salah:**
Kode ini mengecek apakah angka **habis dibagi 3** (kelipatan), bukan apakah angka **merupakan pangkat 3**. Angka `6` akan lolos (`6 % 3 === 0` → `true`), padahal `6` bukan power of 3.

**Masalah 2 — Ternary Redundan:**
Menulis `kondisi ? true : false` itu mubazir karena `kondisi` sendiri sudah menghasilkan `true`/`false`. Cukup tulis `let isPowerThree = (deskNumber === 1 || deskNumber % 3 === 0);`.

```javascript
// ✅ BENAR — gunakan while loop untuk membagi berulang-ulang
let isPowerOfThree = false;
if (deskNumber > 0) {
  let num = deskNumber;
  while (num % 3 === 0) {
    num = num / 3;
  }
  isPowerOfThree = (num === 1);
}
```

> [!TIP]
> 💡 **Pelajaran:** Challenge ini bisa "terasa lulus" test case karena kebetulan angka-angka yang diberikan (1, 9, 27, 81) memang kebetulan kelipatan 3 **sekaligus** pangkat 3. Tapi jika ada test case tersembunyi dengan angka seperti `6` atau `12`, kode yang salah akan gagal. Selalu pikirkan *edge case* di luar test case yang terlihat!

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 01 — Challenge Overview](./01-challenge-overview_gambaran-tantangan.md)**
- **📖 [Lanjut ke Part 03 — V1 User Approach →](./03-v1-user-approach_pendekatan-user.md)**
