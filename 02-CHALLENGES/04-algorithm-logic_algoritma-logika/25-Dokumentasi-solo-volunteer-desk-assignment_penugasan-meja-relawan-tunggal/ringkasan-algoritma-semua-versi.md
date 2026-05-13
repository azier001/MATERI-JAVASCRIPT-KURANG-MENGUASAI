# 📋 Ringkasan Algoritma — Semua Versi

> findSoloVolunteer — Solo Volunteer Desk Assignment

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Versions](https://img.shields.io/badge/Versions-4-purple?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Cheat%20Sheet-orange?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🛡️ | [V1 — User Frequency Map](#v1) | Kode awal user (ada bug di Misi 3) |
| ⚡ | [V2 — Refactored Approach](#v2) | Kode user yang sudah diperbaiki |
| 🚀 | [V3 — Declarative Approach](#v3) | Versi modern dengan Array Methods |
| 🏫 | [V4 — Coddy Official](#v4) | Kode resmi Coddy.tech (XOR) |
| 🏆 | [Rekomendasi](#rekomendasi) | Versi mana untuk konteks apa |

---

<a name="v1"></a>
## 🛡️ V1 — User Frequency Map Approach (Kode Awal)

**Ide utama:** Hitung frekuensi setiap ID dengan Object, cari vokal dari depan (timpa), dan cek kelipatan 3 (❌ salah).

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
        if (vowelChars.includes(roomName[i])) {
            positionIndex = i + 1;
        }
    }

    let isPowerThree = deskNumber === 1 || deskNumber % 3 === 0 ? true : false;
    return [resultScore, positionIndex, isPowerThree];
}
```

> ⚠️ **Bug:** Misi 3 mengecek kelipatan 3 (`% 3`), bukan pangkat 3. Angka `6` akan salah terdeteksi.

---

<a name="v2"></a>
## ⚡ V2 — Refactored User Approach ⭐ Rekomendasi Belajar

**Ide utama:** Sama seperti V1 tapi dengan naming yang diperbaiki, `break` ditambahkan, loop mundur untuk Misi 2, dan logika Misi 3 yang benar.

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

<a name="v3"></a>
## 🚀 V3 — Declarative Approach ⭐ Rekomendasi Interview

**Ide utama:** `.find()` + indexOf/lastIndexOf untuk Misi 1, Spread + `.findLastIndex()` untuk Misi 2, while loop untuk Misi 3.

```javascript
const findSoloVolunteer = (employeeIds, roomName, deskNumber) => {
  const soloId = employeeIds.find(
    (id) => employeeIds.indexOf(id) === employeeIds.lastIndexOf(id),
  );

  const vowelChars = 'aiueoAIUEO';
  let vowelPosition = [...roomName].findLastIndex((char) =>
    vowelChars.includes(char),
  );
  vowelPosition = vowelPosition !== -1 ? vowelPosition + 1 : -1;

  let isPowerOfThree = false;
  while (deskNumber % 3 === 0 && deskNumber > 0) {
    deskNumber = deskNumber / 3;
  }
  if (deskNumber === 1) isPowerOfThree = true;

  return [soloId, vowelPosition, isPowerOfThree];
};
```

---

<a name="v4"></a>
## 🏫 V4 — Coddy Official Approach

**Ide utama:** Bitwise XOR (`^=`) untuk Misi 1 (angka kembar saling hancur), loop depan untuk Misi 2, while loop untuk Misi 3.

```javascript
function findSoloVolunteer(employeeIds, roomName, deskNumber) {
  let soloId = 0;
  for (let id of employeeIds) {
    soloId ^= id;
  }

  const vowels = 'aeiouAEIOU';
  let lastVowelPosition = -1;
  for (let i = 0; i < roomName.length; i++) {
    if (vowels.includes(roomName[i])) {
      lastVowelPosition = i + 1;
    }
  }

  let isPowerOf3 = false;
  if (deskNumber > 0) {
    let num = deskNumber;
    while (num > 1) {
      if (num % 3 !== 0) break;
      num = num / 3;
    }
    isPowerOf3 = (num === 1);
  }

  return [soloId, lastVowelPosition, isPowerOf3];
}
```

---

<a name="rekomendasi"></a>
## 🏆 Rekomendasi

| Konteks | Versi | Alasan |
|---------|:-----:|--------|
| 📖 Belajar & Review | **V2** | Eksplisit, mudah di-trace, naming terbaik |
| 💼 Interview | **V3** | Modern, ringkas, menunjukkan penguasaan JS |
| ⚡ Performa Maksimal | **V4** (Misi 1) + **V2** (Misi 2) | XOR O(n) + loop mundur bisa break awal |

---

> 📝 **Catatan Akhir:**
> Dokumentasi ini dibuat pada **14 Mei 2026** berdasarkan sesi mentoring langsung di **Windows** dengan JavaScript (ES6+).
