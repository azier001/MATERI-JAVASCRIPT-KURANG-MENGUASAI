# ⚡ V2 — Refactored User Approach — Pendekatan User Setelah Diperbaiki

### ✨ _Kode awal user yang di-refactor berdasarkan kritik & saran dari sesi mentoring — tetap Frequency Map, tapi lebih aman dan efisien_

> 🎯 **Tujuan:** Menunjukkan bagaimana kode V1 yang sudah berjalan bisa ditingkatkan kualitasnya melalui perbaikan naming, optimasi performa (`break`), dan perbaikan logika yang salah — tanpa mengubah pendekatan dasarnya.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20String%20|%20Math-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V2-purple?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 💻 | [Kode Lengkap](#kode) | Kode V1 setelah semua perbaikan diterapkan |
| 🔍 | [Apa yang Berubah?](#perubahan) | Daftar perubahan dari V1 ke V2 |
| 🧠 | [Kamus Variabel](#kamus) | Tabel penamaan variabel rekomendasi |
| 🗺️ | [Blueprint Kode](#blueprint) | Kerangka kosong sebelum kode lengkap |
| 🎞️ | [Simulasi Langkah demi Langkah](#simulasi) | Tracing eksekusi dengan edge case angka 6 |
| 💡 | [Insight Penting](#insight) | Pelajaran dari proses refactoring |

---

<a name="kode"></a>
## 💻 Kode Lengkap

Versi ini adalah **kode V1 (Frequency Map) yang sudah di-refactor** berdasarkan saran mentor. Pendekatan dasarnya tetap sama, tapi naming lebih jelas, ada `break` untuk optimasi, dan logika Misi 3 sudah diperbaiki.

```javascript
function findSoloVolunteer(employeeIds, roomName, deskNumber) {

    // ==========================================
    // MISI 1: Grouping (Frequency Map)
    // ==========================================
    const grouped = {};
    for (const id of employeeIds) {
        grouped[id] = (grouped[id] || 0) + 1;
    }

    let soloId = null;

    for (const key in grouped) {
        if (grouped[key] === 1) {
            soloId = Number(key);
            break;
        }
    }

    // ==========================================
    // MISI 2: Vokal Terakhir
    // ==========================================
    const vowelChars = 'aiueoAIUEO';
    let vowelPosition = -1;

    for (let i = roomName.length - 1; i >= 0; i--) {
        const char = roomName[i];

        if (vowelChars.includes(char)) {
            vowelPosition = i + 1;
            break;
        }
    }

    // ==========================================
    // MISI 3: Power of 3 (Pangkat 3)
    // ==========================================
    let isPowerOfThree = false;

    if (deskNumber > 0) {
        let num = deskNumber;
        while (num % 3 === 0) {
            num = num / 3;
        }
        isPowerOfThree = (num === 1);
    }

    // Output Akhir
    return [soloId, vowelPosition, isPowerOfThree];
}
```

---

<a name="perubahan"></a>
## 🔍 Apa yang Berubah? (V1 → V2)

Berikut semua perubahan yang dilakukan dari V1 ke V2, dikelompokkan berdasarkan tingkat keparahan:

### 🔴 Perbaikan Kritis (Bug Fix)

**1. Logika Misi 3 diganti total**

```javascript
// ❌ V1 — Mengecek kelipatan 3 (SALAH)
let isPowerThree = deskNumber === 1 || deskNumber % 3 === 0 ? true : false;

// ✅ V2 — Mengecek pangkat 3 dengan pembagian berulang (BENAR)
let isPowerOfThree = false;
if (deskNumber > 0) {
    let num = deskNumber;
    while (num % 3 === 0) {
        num = num / 3;
    }
    isPowerOfThree = (num === 1);
}
```

> *Kenapa?* Kode V1 akan salah deteksi angka `6` sebagai power of 3. Kode V2 membagi berulang-ulang sampai mentok — hanya angka yang benar-benar hasil pangkat 3 yang akan tersisa menjadi `1`.

---

### 🟡 Perbaikan Sedang (Optimasi & Clean Code)

**2. Variabel `count` dihapus, syarat di-hardcode**

```javascript
// ❌ V1 — Variabel count bisa termutasi
let count = 1;
if (grouped[key] === count) {
    count = grouped[key];  // ← BAHAYA: mengubah syarat pencarian!
}

// ✅ V2 — Langsung cek === 1
if (grouped[key] === 1) {  // ← Tegas dan aman
```

> *Kenapa?* Variabel `count` dimutasi di dalam loop — jika datanya lebih kompleks, ini bisa menyebabkan bug yang sulit dilacak.

---

**3. Tambahkan `break` di Misi 1 dan Misi 2**

```javascript
// ❌ V1 — Tidak ada break (loop terus berjalan meski jawaban sudah ditemukan)
for (const key in grouped) {
    if (grouped[key] === count) {
        resultScore = Number(key);
        // ← Loop tetap lanjut sampai habis!
    }
}

// ✅ V2 — Ada break (hemat waktu komputasi)
for (const key in grouped) {
    if (grouped[key] === 1) {
        soloId = Number(key);
        break;  // ← STOP! Jawaban sudah ditemukan
    }
}
```

> *Kenapa?* Tanpa `break`, komputer tetap memeriksa semua data meskipun jawaban sudah ditemukan. Bayangkan array dengan 1 juta elemen — pemborosan besar!

---

**4. Loop Misi 2 dibalik arah (mundur)**

```javascript
// ❌ V1 — Cek dari depan, harus baca seluruh string
for (let i = 0; i < roomName.length; i++) { ... }

// ✅ V2 — Cek dari belakang, bisa break lebih cepat
for (let i = roomName.length - 1; i >= 0; i--) { ... break; }
```

> *Kenapa?* Karena yang dicari adalah vokal **terakhir**, mulai dari belakang berarti vokal pertama yang ditemukan pasti sudah yang terakhir — langsung `break`.

---

### 🟢 Perbaikan Ringan (Naming Convention)

**5. Semua nama variabel diganti lebih deskriptif**

| V1 (Sebelum) | V2 (Sesudah) | Alasan |
|:------------:|:------------:|:------:|
| `resultScore` | `soloId` | `resultScore` terdengar seperti skor game, padahal ini ID karyawan |
| `count` | *(dihapus)* | Tidak diperlukan — langsung cek `=== 1` |
| `positionIndex` | `vowelPosition` | Lebih jelas bahwa ini posisi **vokal**, bukan posisi sembarang |
| `isPowerThree` | `isPowerOfThree` | Lebih gramatikal — "power **of** three" |

---

<a name="kamus"></a>
## 🧠 Kamus Variabel

| Lokasi / Peran | ✅ Rekomendasi | ❌ Jangan Gunakan | Alasan |
|----------------|---------------|-------------------|--------|
| Peta frekuensi | `grouped` | `obj`, `map` | Menjelaskan bahwa data dikelompokkan berdasarkan ID |
| ID relawan tunggal | `soloId` | `resultScore`, `number` | Kata "solo" langsung mengarah ke soal |
| Kumpulan huruf vokal | `vowelChars` | `vowels`, `huruf` | Menambahkan `Chars` memperjelas isi: deretan karakter |
| Posisi vokal terakhir | `vowelPosition` | `index`, `pos` | Jelas bahwa ini posisi vokal, bukan index sembarang |
| Penanda pangkat 3 | `isPowerOfThree` | `cekTiga`, `hasil` | Awalan `is...` = best practice untuk boolean |
| Salinan deskNumber | `num` | `n`, `x` | Singkat tapi masih bisa dipahami dalam konteks lokal |

---

<a name="blueprint"></a>
## 🗺️ Blueprint Kode

Kerangka kosong sebelum diisi kode lengkap — menunjukkan "peta" struktur fungsi:

```javascript
// 🗺️ KERANGKA KODE (Mental Model: 3 Misi Independen → 1 Output Array)

function findSoloVolunteer(employeeIds, roomName, deskNumber) {

    // ──── MISI 1: Frequency Map ────
    const grouped = {};                      // [WADAH] peta frekuensi
    for (const id of employeeIds) { ... }    // [LOOP 1] hitung kemunculan

    let soloId = null;                       // [PENAMPUNG] ID jomblo
    for (const key in grouped) { ... }       // [LOOP 2] cari yang count === 1

    // ──── MISI 2: Vokal Terakhir ────
    const vowelChars = '...';                // [REFERENSI] daftar huruf vokal
    let vowelPosition = -1;                  // [PENAMPUNG] default: tidak ada
    for (let i = ...; i >= 0; i--) { ... }   // [LOOP 3] mundur dari belakang

    // ──── MISI 3: Power of 3 ────
    let isPowerOfThree = false;              // [PENAMPUNG] default: bukan
    while (num % 3 === 0) { ... }            // [LOOP 4] bagi terus sampai mentok
    isPowerOfThree = (num === 1);            // [KEPUTUSAN] sisa === 1?

    return [soloId, vowelPosition, isPowerOfThree];  // [OUTPUT]
}
```

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

Kali ini kita trace dengan **edge case angka 6** untuk membuktikan perbaikan Misi 3 bekerja:

```
📊 Tracing Eksekusi:
   Input: employeeIds = [10, 20, 30, 20, 10], roomName = "Main Hall", deskNumber = 6

   ──── MISI 1: Frequency Map ────

   Loop for...of (membangun peta):
     id = 10 → grouped = { "10": 1 }
     id = 20 → grouped = { "10": 1, "20": 1 }
     id = 30 → grouped = { "10": 1, "20": 1, "30": 1 }
     id = 20 → grouped = { "10": 1, "20": 2, "30": 1 }
     id = 10 → grouped = { "10": 2, "20": 2, "30": 1 }

   Loop for...in (mencari jomblo):
     key = "10" → grouped["10"] = 2 → 2 === 1? ❌ SKIP
     key = "20" → grouped["20"] = 2 → 2 === 1? ❌ SKIP
     key = "30" → grouped["30"] = 1 → 1 === 1? ✅ → soloId = 30 → BREAK!

   ──── MISI 2: Vokal dari Belakang ────

   roomName = "Main Hall"
                M  a  i  n     H  a  l  l
   Index:       0  1  2  3  4  5  6  7  8

   i=8 → 'l' → vokal? ❌
   i=7 → 'l' → vokal? ❌
   i=6 → 'a' → vokal? ✅ → vowelPosition = 6 + 1 = 7 → BREAK!

   ──── MISI 3: Power of 3 (EDGE CASE!) ────

   deskNumber = 6 → 6 > 0? ✅ → mulai pembagian

   ❌ V1 akan bilang: 6 % 3 === 0 → true (SALAH!)

   ✅ V2 melakukan:
     num = 6
     6 % 3 === 0? ✅ → num = 6 / 3 = 2
     2 % 3 === 0? ❌ → STOP!
     num === 1? ❌ (num = 2) → isPowerOfThree = false ✅ (BENAR!)

   ──── OUTPUT ────

   return [30, 7, false] ✅
```

> [!TIP]
> 💡 **Perhatikan perbedaan V1 vs V2 pada angka 6:** V1 akan menghasilkan `true` (salah), sedangkan V2 menghasilkan `false` (benar). Inilah kekuatan *while loop* pembagian berulang — dia kebal terhadap jebakan kelipatan 3!

---

<a name="insight"></a>
## 💡 Insight Penting

> **Refactoring bukan berarti menulis ulang dari nol.**
> Perhatikan bahwa kode V2 ini masih menggunakan pendekatan Frequency Map yang sama persis dengan V1. Yang berubah hanyalah: (1) nama variabel, (2) arah loop, (3) penambahan `break`, dan (4) perbaikan logika Misi 3. Fondasi kodenya tetap sama — hanya dipoles agar lebih aman dan profesional.

> **"Kode yang bekerja" berbeda dengan "kode yang benar".**
> Kode V1 bisa lulus semua test case yang terlihat, tapi logikanya salah untuk kasus yang belum diuji. Kebiasaan memikirkan *edge case* di luar test case yang diberikan adalah ciri khas programmer yang matang.

> **`break` adalah teman baikmu.**
> Setiap kali kamu menulis loop yang mencari **satu jawaban**, tanyakan pada dirimu: *"Apakah aku perlu terus mencari setelah jawabannya ketemu?"* Jika tidak, tambahkan `break`.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 03 — V1 User Approach](./03-v1-user-approach_pendekatan-user.md)**
- **📖 [Lanjut ke Part 05 — V3 Declarative Approach →](./05-v3-declarative-approach_pendekatan-deklaratif.md)**
