# 📊 All Versions Comparison — Perbandingan Semua Versi

### ✨ _Membandingkan 4 versi solusi secara head-to-head — dari kode awal yang masih mentah hingga trik hacker XOR_

> 🎯 **Tujuan:** Memberikan pandangan menyeluruh tentang kelebihan dan kekurangan setiap versi, sehingga kamu bisa memilih pendekatan yang paling tepat untuk konteks yang berbeda-beda.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20String%20|%20Math-blue?style=for-the-badge)
![Versions](https://img.shields.io/badge/Versions-4-purple?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 📋 | [Ringkasan 4 Versi](#ringkasan) | Gambaran singkat setiap versi dalam 1 tabel |
| 🔵 | [Perbandingan Misi 1](#misi-1) | Frequency Map vs indexOf vs .find() vs XOR |
| 🟢 | [Perbandingan Misi 2](#misi-2) | Loop depan vs loop mundur vs .findLastIndex() |
| 🟠 | [Perbandingan Misi 3](#misi-3) | Modulo (salah) vs while loop (benar) |
| 🏷️ | [Naming Convention](#naming) | Tabel penamaan variabel ❌ vs ✅ |
| 🏆 | [Rekomendasi Final](#rekomendasi) | Versi mana yang terbaik untuk konteks apa |

---

<a name="ringkasan"></a>
## 📋 Ringkasan 4 Versi

| Aspek | V1 🛡️ User Awal | V2 ⚡ Refactored | V3 🚀 Declarative | V4 🏫 Coddy |
|-------|:---------:|:----------:|:-----------:|:------:|
| **Misi 1** | Frequency Map | Frequency Map + `break` | `.find()` + indexOf | Bitwise XOR |
| **Misi 2** | Loop depan (timpa) | Loop mundur + `break` | `[...str].findLastIndex()` | Loop depan (timpa) |
| **Misi 3** | ❌ `% 3 === 0` (salah) | ✅ While loop | ✅ While loop | ✅ While loop |
| **Jumlah baris** | ~20 baris | ~25 baris | ~18 baris | ~22 baris |
| **Readability** | 🟡 Sedang | 🟢 Tinggi | 🟢 Tinggi | 🟡 Sedang (XOR sulit) |
| **Kebenaran** | ❌ Bug di Misi 3 | ✅ Benar | ✅ Benar | ✅ Benar |
| **Performa** | 🟡 Sedang | 🟢 Baik | 🟡 Sedang | 🟢 Baik (XOR O(n)) |

---

<a name="misi-1"></a>
## 🔵 Perbandingan Misi 1 — Mencari ID Jomblo

### Kode Side-by-Side

**V1/V2 — Frequency Map:**
```javascript
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
```

**V3 — `.find()` + indexOf:**
```javascript
const soloId = employeeIds.find(
    (id) => employeeIds.indexOf(id) === employeeIds.lastIndexOf(id),
);
```

**V4 — Bitwise XOR:**
```javascript
let soloId = 0;
for (let id of employeeIds) {
    soloId ^= id;
}
```

### Tabel Perbandingan Detail

| Kriteria | V1/V2 Frequency Map | V3 `.find()` | V4 XOR |
|----------|:-------------------:|:------------:|:------:|
| Jumlah baris | 8 baris | 3 baris | 4 baris |
| Memori tambahan | 🔴 Object `grouped` | 🟢 Tidak ada | 🟢 Tidak ada |
| Kecepatan | 🟢 O(n) — 1 loop bangun + 1 loop cari | 🟡 O(n²) — `.find()` memanggil indexOf per elemen | 🟢 O(n) — 1 loop saja |
| Readability | 🟢 Jelas | 🟢 Jelas | 🔴 Sulit bagi pemula |
| Fleksibilitas | 🟢 Bisa cari yang muncul 3x, 4x, dst | 🟡 Hanya untuk "muncul 1x" | 🔴 Hanya untuk "kembar berpasangan" |

> [!TIP]
> 💡 **Kapan pakai yang mana?**
> - **Frequency Map** → Paling fleksibel. Cocok untuk kasus apapun yang melibatkan penghitungan kemunculan.
> - **`.find()` + indexOf** → Paling ringkas dan mudah dibaca. Cocok untuk array kecil-sedang.
> - **XOR** → Paling cepat dan hemat memori. Cocok untuk array sangat besar tapi **hanya** jika setiap elemen muncul tepat 2x kecuali 1.

---

<a name="misi-2"></a>
## 🟢 Perbandingan Misi 2 — Mencari Vokal Terakhir

### Kode Side-by-Side

**V1/V4 — Loop dari depan (timpa):**
```javascript
for (let i = 0; i < roomName.length; i++) {
    if (vowelChars.includes(roomName[i])) {
        positionIndex = i + 1;
    }
}
```

**V2 — Loop mundur + `break`:**
```javascript
for (let i = roomName.length - 1; i >= 0; i--) {
    if (vowelChars.includes(roomName[i])) {
        vowelPosition = i + 1;
        break;
    }
}
```

**V3 — `.findLastIndex()`:**
```javascript
let vowelPosition = [...roomName].findLastIndex((char) =>
    vowelChars.includes(char),
);
vowelPosition = vowelPosition !== -1 ? vowelPosition + 1 : -1;
```

### Tabel Perbandingan Detail

| Kriteria | V1/V4 Loop Depan | V2 Loop Mundur | V3 `.findLastIndex()` |
|----------|:----------------:|:--------------:|:---------------------:|
| Arah pencarian | Kiri → Kanan | Kanan → Kiri | Kanan → Kiri (otomatis) |
| Bisa `break` lebih awal? | ❌ Harus baca semua | ✅ Stop begitu ketemu | ✅ Stop begitu ketemu |
| Memori tambahan | 🟢 Tidak ada | 🟢 Tidak ada | 🟡 `[...str]` membuat array baru |
| Readability | 🟢 Mudah | 🟢 Mudah | 🟡 Perlu paham Ternary |
| Best case | O(n) selalu | O(1) jika vokal di akhir | O(1) jika vokal di akhir |

> [!TIP]
> 💡 **Pemenang Misi 2: V2 (Loop Mundur)**
> Dia paling efisien (bisa `break` lebih awal), paling hemat memori (tidak membuat array baru seperti V3), dan tetap mudah dibaca. Kode kita **mengalahkan** kode resmi Coddy.tech di misi ini!

---

<a name="misi-3"></a>
## 🟠 Perbandingan Misi 3 — Mengecek Pangkat 3

### Kode Side-by-Side

**V1 — Modulo saja (❌ SALAH):**
```javascript
let isPowerThree = deskNumber === 1 || deskNumber % 3 === 0 ? true : false;
```

**V2/V3/V4 — While loop pembagian berulang (✅ BENAR):**
```javascript
while (deskNumber % 3 === 0 && deskNumber > 0) {
    deskNumber = deskNumber / 3;
}
isPowerOfThree = (deskNumber === 1);
```

### Tabel Perbandingan Detail

| Kriteria | V1 Modulo (❌) | V2/V3/V4 While Loop (✅) |
|----------|:--------------:|:------------------------:|
| Angka 9 | ✅ `true` | ✅ `true` |
| Angka 27 | ✅ `true` | ✅ `true` |
| Angka 6 | ❌ `true` (SALAH!) | ✅ `false` (BENAR!) |
| Angka 12 | ❌ `true` (SALAH!) | ✅ `false` (BENAR!) |
| Angka 1 | ✅ `true` | ✅ `true` |
| Angka 0 | ❌ `true` (SALAH!) | ✅ `false` (BENAR!) |

> [!CAUTION]
> 🔴 **V1 lolos test case karena kebetulan!** Semua angka yang diberikan di test case (1, 9, 27, 81) kebetulan merupakan kelipatan 3 sekaligus pangkat 3. Ini adalah contoh nyata bahwa "test case hijau" tidak menjamin "logika benar".

---

<a name="naming"></a>
## 🏷️ Naming Convention — Perbandingan Semua Versi

| Peran Variabel | V1 ❌ | V2/V3 ✅ | V4 (Coddy) | Alasan V2/V3 Terbaik |
|----------------|:-----:|:--------:|:----------:|:--------------------:|
| ID relawan tunggal | `resultScore` | `soloId` | `soloId` | Kata "solo" langsung mengarah ke konteks soal |
| Kumpulan vokal | `vowelChars` | `vowelChars` | `vowels` | `vowelChars` lebih spesifik (kumpulan karakter) |
| Posisi vokal | `positionIndex` | `vowelPosition` | `lastVowelPosition` | Harus jelas bahwa ini posisi *vokal*, bukan sembarang |
| Penanda pangkat 3 | `isPowerThree` | `isPowerOfThree` | `isPowerOf3` | Awalan `is...` + gramatikal "of" = best practice |
| Counter frekuensi | `count` | *(dihapus)* | *(tidak ada)* | Tidak perlu variabel perantara — langsung `=== 1` |

> [!IMPORTANT]
> 🔔 **Aturan emas naming untuk boolean:** Selalu awali dengan kata tanya seperti `is...`, `has...`, `can...`, atau `should...`. Contoh: `isPowerOfThree`, `hasVowel`, `canBreak`. Ini membuat kode terbaca seperti pertanyaan bahasa Inggris.

---

<a name="rekomendasi"></a>
## 🏆 Rekomendasi Final

### Untuk Belajar & Dokumentasi → ⭐ V2 (Refactored)

```
Alasan:
✅ Menggunakan Frequency Map yang paling fleksibel untuk Misi 1
✅ Loop mundur yang efisien untuk Misi 2
✅ While loop yang kebal jebakan untuk Misi 3
✅ Naming convention paling bersih dan deskriptif
✅ Semua logika eksplisit — mudah di-trace saat belajar
```

### Untuk Interview / Code Review → ⭐ V3 (Declarative)

```
Alasan:
✅ Menggunakan Array Methods modern (.find(), .findLastIndex())
✅ Menunjukkan penguasaan JavaScript modern
✅ Kode lebih ringkas tanpa mengorbankan readability
✅ Arrow function dan ternary operator = standar industri
```

### Untuk Performa Maksimal → ⭐ V4 (XOR) + V2 (Loop Mundur)

```
Alasan:
✅ XOR dari V4 untuk Misi 1 — O(n) tanpa memori tambahan
✅ Loop mundur dari V2 untuk Misi 2 — bisa break lebih awal
✅ While loop dari V2/V3/V4 untuk Misi 3 — sudah optimal
⚠️ Catatan: XOR hanya cocok untuk kasus "kembar berpasangan"
```

> [!TIP]
> 💡 **Tidak ada "versi terbaik" yang absolut.** Setiap versi punya konteks penggunaan yang tepat. Programmer yang matang bukan hanya tahu satu cara, tapi memahami **kapan** menggunakan cara yang mana.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 06 — V4 Coddy Approach](./06-v4-coddy-approach_pendekatan-coddy.md)**
- **📖 [Lanjut ke Part 08 — Deep Dive Insight →](./08-deep-dive-insight_wawasan-mendalam.md)**
