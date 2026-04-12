# 📝 Part 09 — Ringkasan Algoritma

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📝 Semua Versi | 📊 Kompleksitas | 🎯 Kapan Pakai | 🏆 Key Takeaway |
|:--------------:|:---------------:|:--------------:|:---------------:|
| [Jump](#-semua-versi-dalam-satu-halaman) | [Jump](#-tabel-kompleksitas) | [Jump](#-kapan-pakai-versi-mana) | [Jump](#-key-takeaway) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memiliki ringkasan semua versi dalam satu halaman
- ✅ Memahami kompleksitas waktu dan ruang setiap versi
- ✅ Tahu kapan memilih versi yang tepat
- ✅ Membawa pulang pelajaran terpenting dari challenge ini

---

## 📝 Semua Versi dalam Satu Halaman

### 🔵 Versi 1 — Nested Loop

```javascript
const twoSum = (numbers, number) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === number) {
        return [i, j]
      }
    }
  }

  return []
}
```

**Ide:** Cek semua kombinasi pasangan satu per satu.

---

### 🟢 Versi 2 — HashMap (versi sendiri)

```javascript
const twoSum = (numbers, number) => {
  const map = new Map()

  for (let i = 0; i < numbers.length; i++) {
    const complement = number - numbers[i]

    if (map.has(complement)) {
      return [map.get(complement), i]
    }

    map.set(numbers[i], i)
  }

  return []
}
```

**Ide:** Simpan angka yang sudah dilihat ke Map. Untuk setiap angka baru, cek apakah complement-nya sudah ada.

---

### 🟡 Versi 3 — HashMap (versi AI)

```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const needed = target - current;

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(current, i);
  }

  return [];
}
```

**Ide:** Identik dengan Versi 2 — variabel `current` dan `needed` ditambahkan untuk keterbacaan.

---

### 🟠 Versi 4 — Set

```javascript
function twoSum(nums, target) {
  const numSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numSet.has(complement)) {
      return [nums.indexOf(complement), i];
    }
    
    numSet.add(nums[i]);
  }

  return [];
}
```

**Ide:** Mirip HashMap tapi Set hanya menyimpan nilai — indeks dicari ulang dengan `indexOf()`.

---

## 📊 Tabel Kompleksitas

| Versi | Time Complexity | Space Complexity | Catatan |
|-------|:--------------:|:----------------:|---------|
| V1 — Nested Loop | O(n²) | O(1) | Lambat, tapi hemat memori |
| V2 — HashMap (sendiri) | O(n) | O(n) | Cepat, butuh memori ekstra |
| V3 — HashMap (AI) | O(n) | O(n) | Identik dengan V2 |
| V4 — Set | O(n)* | O(n) | *`indexOf()` menambah O(n) tersembunyi |

> ⚠️ **Catatan Versi 4:** Meskipun loop utama O(n), `indexOf()` di dalamnya juga O(n) — sehingga kompleksitas sebenarnya bisa O(n²) dalam kasus terburuk. Untuk challenge ini dengan input unik, praktisnya tetap cepat.

---

## 🎯 Kapan Pakai Versi Mana

```
Baru belajar Two Sum?
└─ Pakai Versi 1 (Nested Loop)
   → Paling mudah dipahami, tidak ada struktur data baru

Input array kecil atau prototype cepat?
└─ Pakai Versi 1 (Nested Loop)
   → Cukup untuk kebutuhan sederhana

Butuh performa optimal?
└─ Pakai Versi 2 atau 3 (HashMap)
   → O(n), aman untuk semua input

Ingin kode paling readable?
└─ Pakai Versi 3 (HashMap AI)
   → Nama variabel current dan needed sangat deskriptif

Ingin eksplorasi Set?
└─ Pakai Versi 4 (Set)
   → Pahami kelemahannya — hanya aman untuk input unik
```

---

## 🏆 Key Takeaway

> **1. Konsep Complement**
> Daripada mencoba semua kombinasi, hitung langsung angka yang dibutuhkan: `complement = target - nums[i]`. Ini adalah inti dari efisiensi HashMap.

> **2. `j = i + 1` untuk Pasangan Unik**
> Ketika mencari pasangan dalam satu array, selalu mulai `j` dari `i + 1` agar setiap pasangan hanya ditemukan sekali dan tidak ada elemen yang dipasangkan dengan dirinya sendiri.

> **3. Time-Space Trade-off**
> HashMap lebih cepat (O(n)) tapi butuh memori ekstra (O(n)). Nested Loop lebih lambat (O(n²)) tapi hemat memori (O(1)). Pilih sesuai kebutuhan — kecepatan atau efisiensi memori.

> **4. Map vs Set**
> Gunakan Map kalau butuh menyimpan **key dan value** (angka + indeks). Gunakan Set kalau hanya butuh mengecek **keberadaan nilai**. Untuk Two Sum, Map lebih tepat karena kita butuh indeks.

> **5. Selalu Tambahkan `return []` di Akhir**
> Meskipun challenge menjamin selalu ada pasangan, `return []` adalah kebiasaan defensif yang baik — fungsi selalu mengembalikan array, tidak pernah `undefined`.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 08: Test Cases](08-test-cases_pengujian-semua-versi.md)**

---

<div align="center">

**🎉 Selamat! Kamu telah menyelesaikan semua part dokumentasi Two Sum!**

---

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>