# 🎯 Solo Volunteer Desk Assignment — `findSoloVolunteer`

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topics](https://img.shields.io/badge/Topics-Array%20|%20String%20|%20Math-blue?style=for-the-badge)
![Source](https://img.shields.io/badge/Source-Coddy.tech-purple?style=for-the-badge)
![Versions](https://img.shields.io/badge/Versions-4-orange?style=for-the-badge)

> 📝 *Dokumentasi pribadi ini dibuat untuk membantu saya memahami dan mengingat
> kembali konsep-konsep yang dipelajari saat mengerjakan challenge Solo Volunteer Desk Assignment.*

---

## 🧩 Deskripsi Challenge

Buat fungsi `findSoloVolunteer` yang menerima tiga parameter: array ID karyawan (setiap ID muncul 2 kali kecuali satu relawan tunggal), nama ruangan (string), dan nomor meja (integer). Kembalikan array berisi tiga nilai: ID relawan tunggal, posisi 1-indexed vokal terakhir di nama ruangan (atau -1), dan boolean apakah nomor meja merupakan pangkat 3.

```
Input: ([2, 2, 3], "Main", 9)
  → Misi 1: Cari ID jomblo → 3 (hanya muncul 1 kali)
  → Misi 2: Vokal terakhir di "Main" → 'i' di posisi 3 (1-indexed)
  → Misi 3: Apakah 9 = pangkat 3? → 3² = 9 → true
Output: [3, 3, true] ✅
```

> ⚠️ **Catatan penting:** Challenge ini menguji **3 konsep berbeda** dalam 1 fungsi — manipulasi Array (mencari elemen unik), pencarian String (vokal terakhir), dan logika Matematika (pangkat 3 ≠ kelipatan 3).

---

## 📤 Expected Output

```javascript
findSoloVolunteer([2, 2, 3], "Main", 9)
// → [3, 3, true]

findSoloVolunteer([5, 5, 7], "Rhythm", 1)
// → [7, -1, true]

findSoloVolunteer([1, 2, 3, 2, 1], "Conference Room B", 27)
// → [3, 14, true]

findSoloVolunteer([10, 20, 30, 20, 10], "Main Hall", 81)
// → [30, 7, true]

findSoloVolunteer([8, 15, 22, 15, 8, 33, 33], "Breakroom", 1)
// → [22, 8, true]
```

---

## 📚 Dokumentasi

### 📑 Daftar Isi

| No | File | Deskripsi |
|----|------|-----------|
| 📋 | [01 — Challenge Overview](./docs/01-challenge-overview_gambaran-tantangan.md) | Deskripsi soal, aturan, 3 misi, dan test cases |
| 🧠 | [02 — Problem Solving Approach](./docs/02-problem-solving-approach_alur-berpikir.md) | Visualisasi pola, tabel analisis, pseudocode |
| 🛡️ | [03 — V1 User Approach](./docs/03-v1-user-approach_pendekatan-user.md) | Kode awal user (Frequency Map) + evaluasi |
| ⚡ | [04 — V2 Refactored Approach](./docs/04-v2-refactored-approach_pendekatan-refactored.md) | Kode user setelah di-refactor (naming, break, fix) |
| 🚀 | [05 — V3 Declarative Approach](./docs/05-v3-declarative-approach_pendekatan-deklaratif.md) | Versi modern (.find, .findLastIndex, spread) |
| 🏫 | [06 — V4 Coddy Approach](./docs/06-v4-coddy-approach_pendekatan-coddy.md) | Kode resmi Coddy.tech (XOR, loop depan) |
| 📊 | [07 — All Versions Comparison](./docs/07-all-versions-comparison_perbandingan-semua-versi.md) | Perbandingan 4 versi + naming + rekomendasi |
| 💡 | [08 — Deep Dive Insight](./docs/08-deep-dive-insight_wawasan-mendalam.md) | XOR, Regex, dan Logaritma secara mendalam |
| 📋 | [Ringkasan Algoritma](./ringkasan-algoritma-semua-versi.md) | Cheat sheet semua versi untuk copy-paste |

---

## ⭐ Versi Rekomendasi

**Untuk belajar:** V2 (Refactored) — Frequency Map yang eksplisit dan mudah di-trace.

```javascript
function findSoloVolunteer(employeeIds, roomName, deskNumber) {
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

    const vowelChars = 'aiueoAIUEO';
    let vowelPosition = -1;
    for (let i = roomName.length - 1; i >= 0; i--) {
        if (vowelChars.includes(roomName[i])) {
            vowelPosition = i + 1;
            break;
        }
    }

    let isPowerOfThree = false;
    if (deskNumber > 0) {
        let num = deskNumber;
        while (num % 3 === 0) {
            num = num / 3;
        }
        isPowerOfThree = (num === 1);
    }

    return [soloId, vowelPosition, isPowerOfThree];
}
```

---

> 📝 **Catatan Akhir:**
> Dokumentasi ini dibuat pada **14 Mei 2026** berdasarkan sesi mentoring langsung di **Windows** dengan JavaScript (ES6+). Sesi ini menghasilkan 4 versi solusi yang membahas berbagai pendekatan dari Frequency Map hingga Bitwise XOR.
