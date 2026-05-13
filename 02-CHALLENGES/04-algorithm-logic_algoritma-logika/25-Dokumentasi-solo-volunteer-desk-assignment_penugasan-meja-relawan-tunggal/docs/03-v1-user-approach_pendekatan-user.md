# 🛡️ V1 — User Frequency Map Approach — Pendekatan Awal User

### ✨ _Kode pertama yang saya tulis secara mandiri sebelum sesi mentoring — menggunakan Frequency Map dan loop dari depan_

> 🎯 **Tujuan:** Mendokumentasikan pendekatan awal saya saat mencoba mengerjakan challenge sendiri, lengkap dengan evaluasi kelebihan dan kekurangan dari setiap bagian kode.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20String%20|%20Math-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V1-purple?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 💻 | [Kode Lengkap](#kode) | Kode asli yang saya tulis sebelum mentoring |
| 🔍 | [Penjelasan Baris per Baris](#penjelasan) | Breakdown setiap blok kode |
| 🧠 | [Konsep Kunci](#konsep) | Frequency Map & teknik yang dipakai |
| 🎞️ | [Simulasi Langkah demi Langkah](#simulasi) | Tracing eksekusi dengan contoh nyata |
| ⚠️ | [Evaluasi & Kritik](#evaluasi) | Apa yang bagus dan apa yang harus diperbaiki |

---

<a name="kode"></a>
## 💻 Kode Lengkap

Versi ini adalah kode yang saya tulis **secara mandiri** sebelum sesi mentoring dimulai — dengan mencari-cari dokumentasi dan mengakali dari melihat test case.

```javascript
function findSoloVolunteer(employeeIds, roomName, deskNumber) {

    const grouped = {};

    for (const id of employeeIds) {
        grouped[id] = (grouped[id] || 0) + 1;
    }

    let count = 1;
    let resultScore = null;

    for (const key in grouped) {
        if (grouped[key] === count) {
            count = grouped[key];
            resultScore = Number(key);
        }
    }

    const vowelChars = 'aiueoAIUEO';
    let positionIndex = -1;

    for (let i = 0; i < roomName.length; i++) {
        const char = roomName[i];

        if (vowelChars.includes(char)) {
            positionIndex = i + 1;
        }
    }

    let isPowerThree = deskNumber === 1 || deskNumber % 3 === 0 ? true : false;

    return [resultScore, positionIndex, isPowerThree];
}
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

### 🔵 Misi 1 — Cari ID Jomblo (Frequency Map)

```javascript
const grouped = {};

for (const id of employeeIds) {
    grouped[id] = (grouped[id] || 0) + 1;
}
```

📦 **Buat peta frekuensi.** Untuk setiap ID di array, hitung berapa kali dia muncul. Hasilnya adalah object seperti `{ 10: 2, 20: 2, 30: 1 }`.

> 📖 **Penjelasan kata per kata:**
>
> | Bagian | Arti |
> |--------|------|
> | `const grouped = {}` | Buat object kosong sebagai wadah penghitung |
> | `grouped[id]` | Ambil nilai saat ini untuk ID tersebut |
> | `\|\| 0` | Jika belum pernah dihitung (undefined), anggap 0 |
> | `+ 1` | Tambah 1 ke counter |

---

```javascript
let count = 1;
let resultScore = null;

for (const key in grouped) {
    if (grouped[key] === count) {
        count = grouped[key];
        resultScore = Number(key);
    }
}
```

🔎 **Cari ID yang muncul 1 kali.** Loop menelusuri semua key di object `grouped` dan mencari yang nilainya `=== 1`.

> 📖 **Penjelasan kata per kata:**
>
> | Bagian | Arti |
> |--------|------|
> | `for (const key in grouped)` | Loop melalui setiap key (ID) di object |
> | `grouped[key] === count` | Cek apakah frekuensinya sama dengan 1 |
> | `Number(key)` | Konversi key dari string ke number (object keys selalu string) |

---

### 🟢 Misi 2 — Cari Vokal Terakhir (Loop dari Depan)

```javascript
const vowelChars = 'aiueoAIUEO';
let positionIndex = -1;

for (let i = 0; i < roomName.length; i++) {
    const char = roomName[i];

    if (vowelChars.includes(char)) {
        positionIndex = i + 1;
    }
}
```

🔤 **Telusuri string dari depan, timpa posisi setiap kali ketemu vokal.** Posisi terakhir yang tertimpa otomatis menjadi vokal terakhir. Pendekatan ini **100% sama** dengan kode resmi Coddy.tech!

---

### 🟠 Misi 3 — Cek Power of 3 (⚠️ LOGIKA SALAH)

```javascript
let isPowerThree = deskNumber === 1 || deskNumber % 3 === 0 ? true : false;
```

❌ **Mengecek kelipatan 3, bukan pangkat 3!** Kode ini menggunakan `% 3 === 0` (modulo) yang hanya mengecek apakah angka habis dibagi 3. Angka seperti `6` atau `12` akan salah terdeteksi sebagai `true`.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### 1️⃣ Frequency Map — _"Absensi Karyawan"_ 📋

```
🎯 Fungsi    → Menghitung berapa kali setiap elemen muncul di array
📌 Teknik    → Object sebagai penampung: key = elemen, value = jumlah kemunculan
🔐 Analogi   → Seperti guru yang mencentang absensi siswa satu-satu
```

**Contoh visual:**
```
Array: [10, 20, 30, 20, 10]

Loop ke-1: id = 10 → grouped = { 10: 1 }
Loop ke-2: id = 20 → grouped = { 10: 1, 20: 1 }
Loop ke-3: id = 30 → grouped = { 10: 1, 20: 1, 30: 1 }
Loop ke-4: id = 20 → grouped = { 10: 1, 20: 2, 30: 1 }
Loop ke-5: id = 10 → grouped = { 10: 2, 20: 2, 30: 1 }
                                                  ↑
                                        Ini yang count-nya 1 = JOMBLO!
```

> [!IMPORTANT]
> 🔔 **Kenapa `Number(key)` diperlukan?** Karena key di object JavaScript **selalu bertipe string**, bahkan jika kita memasukkan angka. `grouped[10]` sebenarnya disimpan sebagai `grouped["10"]`. Tanpa konversi `Number()`, output kita akan berisi string `"30"` bukan angka `30`.

### 2️⃣ Pola `(value || 0) + 1` — _"Counter Aman"_ 🛡️

```
🎯 Fungsi    → Inisialisasi dan increment dalam satu baris
📌 Teknik    → Short-circuit evaluation dengan OR (||)
🔐 Analogi   → "Kalau sudah ada angkanya, tambah 1. Kalau belum ada, mulai dari 0 lalu tambah 1."
```

> [!TIP]
> 💡 **Pola `(value || 0) + 1` sangat sering dipakai** oleh Senior Developer untuk membuat frequency counter. Kamu akan menemukannya di banyak challenge seputar menghitung kemunculan elemen, mengelompokkan data, atau membuat histogram.

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi:
   Input: employeeIds = [2, 2, 3], roomName = "Main", deskNumber = 9

   ──── MISI 1: Frequency Map ────

   Loop for...of:
     id = 2 → grouped = { "2": 1 }
     id = 2 → grouped = { "2": 2 }
     id = 3 → grouped = { "2": 2, "3": 1 }

   Loop for...in:
     key = "2" → grouped["2"] = 2 → 2 === 1? ❌ SKIP
     key = "3" → grouped["3"] = 1 → 1 === 1? ✅ → resultScore = Number("3") = 3

   ──── MISI 2: Vokal dari Depan ────

   i=0 → 'M' → vokal? ❌
   i=1 → 'a' → vokal? ✅ → positionIndex = 1 + 1 = 2
   i=2 → 'i' → vokal? ✅ → positionIndex = 2 + 1 = 3  ← TIMPA!
   i=3 → 'n' → vokal? ❌

   ──── MISI 3: Cek Power of 3 ────

   deskNumber = 9
   9 === 1? ❌ || 9 % 3 === 0? ✅ → isPowerThree = true
   (Kebetulan benar untuk angka 9, tapi logika ini SALAH secara umum!)

   ──── OUTPUT ────

   return [3, 3, true] ✅
```

---

<a name="evaluasi"></a>
## ⚠️ Evaluasi & Kritik

### ✅ Yang Sudah Bagus

| Aspek | Penjelasan |
|-------|------------|
| 🧠 Frequency Map | Teknik yang sangat solid dan fleksibel — bahkan lebih fleksibel dari `indexOf/lastIndexOf` karena bisa dipakai untuk menghitung kemunculan berapa kali pun |
| 🔄 Konversi `Number(key)` | Menunjukkan pemahaman bahwa object keys di JS selalu berupa string |
| 🔤 Pencarian vokal | Logikanya 100% sama dengan kode resmi Coddy.tech |

### ❌ Yang Perlu Diperbaiki

| Masalah | Kode Bermasalah | Dampak | Perbaikan |
|---------|:---------------:|:------:|:---------:|
| 🔴 Variabel `count` dimutasi | `count = grouped[key]` | Mengubah syarat pencarian di dalam loop — berbahaya jika data lebih kompleks | Langsung pakai `=== 1` tanpa variabel perantara |
| 🔴 Logika Misi 3 salah | `deskNumber % 3 === 0` | Angka `6` atau `12` akan salah terdeteksi sebagai power of 3 | Gunakan `while` loop pembagian berulang |
| 🟡 Ternary redundan | `? true : false` | Mubazir — ekspresi `===` sudah menghasilkan boolean | Hapus `? true : false` |
| 🟡 Naming kurang deskriptif | `resultScore`, `count` | Tidak jelas apa isinya tanpa membaca keseluruhan konteks | Ganti ke `soloId`, hapus `count` |
| 🟡 Tidak ada `break` | Loop Misi 1 & 2 | Membuang waktu komputasi — tetap menelusuri data meskipun jawaban sudah ditemukan | Tambahkan `break` setelah jawaban ditemukan |

> [!WARNING]
> ⚠️ **Kenapa kode ini bisa "terasa lulus" test case?** Karena semua test case yang diberikan (1, 9, 27, 81) kebetulan merupakan kelipatan 3 **sekaligus** pangkat 3. Jika Coddy.tech menambahkan test case dengan angka `6` atau `12`, kode ini akan gagal. Selalu uji logikamu dengan *edge case* di luar test case yang terlihat!

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 02 — Problem Solving Approach](./02-problem-solving-approach_alur-berpikir.md)**
- **📖 [Lanjut ke Part 04 — V2 Refactored Approach →](./04-v2-refactored-approach_pendekatan-refactored.md)**
