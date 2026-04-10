# 📝 Part 09 — Ringkasan Algoritma

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 🗺️ Alur Umum | 📊 Ringkasan Per Versi | 🔑 Konsep Kunci | ✅ Checklist |
|:------------:|:---------------------:|:---------------:|:-----------:|
| [Jump](#-alur-algoritma-umum) | [Jump](#-ringkasan-per-versi) | [Jump](#-konsep-kunci) | [Jump](#-checklist-sebelum-submit) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memiliki ringkasan algoritma semua versi dalam satu tempat
- ✅ Memahami alur umum yang berlaku di semua versi
- ✅ Punya checklist siap pakai sebelum submit solusi

---

## 🗺️ Alur Algoritma Umum

Semua versi solusi mengikuti alur yang sama:

```
START
  │
  ▼
Siapkan penampung kosong
(Object {} atau Map)
  │
  ▼
Untuk setiap kata di array:
  │
  ├─► Hitung derived key
  │   word.split('').sort().join('')
  │
  ├─► Apakah key sudah ada di penampung?
  │   ├── TIDAK → buat entry baru
  │   └── YA   → lanjut
  │
  └─► Masukkan kata ke entry yang sesuai
  │
  ▼
Ambil semua value dari penampung
(Object.values() atau [...map.values()])
  │
  ▼
RETURN array of arrays
```

---

## 📊 Ringkasan Per Versi

### 🔵 Versi 1 — `reduce` + Object
```
Penampung  : Object {}
Loop       : reduce (acc dimulai dari {})
Key cek    : !acc[key]
Init       : acc[key] = []
Push       : acc[key].push(word)
Wajib      : return acc di setiap iterasi
Return     : Object.values(result)
```

### 🟢 Versi 2 — `forEach` + Object
```
Penampung  : Object {} (dideklarasikan di luar loop)
Loop       : forEach
Key cek    : !grouped[key]
Init       : grouped[key] = []
Push       : grouped[key].push(word)
Return     : Object.values(grouped)
```

### 🟡 Versi 3 — `forEach` + Map
```
Penampung  : new Map() (dideklarasikan di luar loop)
Loop       : forEach
Key cek    : !grouped.has(key)
Init       : grouped.set(key, [])
Push       : grouped.get(key).push(word)
Return     : [...grouped.values()]
```

### 🟠 Versi 4 — `for...of` + Map (dari dokumentasi)
```
Penampung  : new Map()
Loop       : for...of
Key cek    : if/else — anagramGroups.has(sortedChars)
Init       : anagramGroups.set(sortedChars, [word]) — di branch else
Push       : anagramGroups.get(sortedChars).push(word) — di branch if
Return     : Array.from(anagramGroups.values())
```

### 🔴 Versi 5 — `for...of` + Map (dari AI)
```
Penampung  : new Map()
Loop       : for...of
Key cek    : !anagramMap.has(sortedWord)
Init       : anagramMap.set(sortedWord, [])
Push       : anagramMap.get(sortedWord).push(word)
Return     : [...anagramMap.values()]
```

---

## 🔑 Konsep Kunci

| Konsep | Penjelasan |
|--------|------------|
| **Derived key** | Hasil sort huruf kata — `word.split('').sort().join('')` |
| **Lazy initialization** | Buat entry baru hanya saat key belum ada |
| **Object.values()** | Ambil semua value dari Object menjadi array |
| **Map.values()** | Ambil semua value dari Map sebagai iterator |
| **Spread `[...]`** | Ubah iterator menjadi array biasa |
| **Array.from()** | Alternatif spread untuk mengubah iterator ke array |
| **return acc** | Wajib di `reduce` — meneruskan nilai acc antar iterasi |

---

## ❌ Pitfalls yang Paling Sering Terjadi

```javascript
// ❌ 1. Lupa return acc di reduce
words.reduce((acc, word) => {
  // ... logika ...
  // lupa return acc → crash!
}, {})

// ❌ 2. Push key bukan word
acc[key].push(key)   // harusnya push(word)

// ❌ 3. Deklarasi penampung di dalam loop
words.forEach((word) => {
  const grouped = {}  // reset setiap iterasi!
})

// ❌ 4. Lupa spread/Array.from untuk Map
return grouped.values()  // MapIterator, bukan array!

// ❌ 5. Pakai sintaks Object untuk Map
grouped[key] = []  // tidak bekerja untuk Map
```

---

## ✅ Checklist Sebelum Submit

- [ ] Derived key dihitung dengan `split('').sort().join('')`
- [ ] Penampung dideklarasikan di luar loop (untuk `forEach`/`for...of`)
- [ ] Lazy initialization ada sebelum push
- [ ] Push kata asli (`word`), bukan key
- [ ] `return acc` ada di setiap iterasi `reduce`
- [ ] Return akhir mengubah penampung ke array of arrays
- [ ] Test dengan array kosong `[]`
- [ ] Test dengan kata tunggal `['cat']`
- [ ] Test dengan semua anagram `['cat', 'act', 'tac']`
- [ ] Test dengan tidak ada anagram `['hello', 'world']`

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 08: Edge Cases](08-edge-cases_kasus-tepi.md)**

---

<div align="center">

**🎉 Selesai! Kamu sudah menyelesaikan seluruh dokumentasi Anagram Grouping.**

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>