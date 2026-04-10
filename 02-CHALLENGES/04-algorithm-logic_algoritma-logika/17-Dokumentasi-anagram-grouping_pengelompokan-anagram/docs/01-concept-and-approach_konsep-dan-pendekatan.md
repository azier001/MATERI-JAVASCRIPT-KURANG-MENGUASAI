# 💡 Part 01 — Konsep & Pendekatan

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 💡 Konsep | 🔑 Derived Key | 🗺️ Pendekatan | ✅ Ringkasan |
|:---------:|:--------------:|:-------------:|:-----------:|
| [Jump](#-apa-itu-anagram) | [Jump](#-ide-utama-derived-key) | [Jump](#-pendekatan-penyelesaian) | [Jump](#-ringkasan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami apa itu anagram dan cara mendeteksinya
- ✅ Memahami konsep derived key dari sorting huruf
- ✅ Tahu kenapa pendekatan sorting lebih efisien dari checkAnagram()
- ✅ Siap untuk melihat implementasi kode di Part 02

---

## 💡 Apa itu Anagram?

Anagram adalah kata yang terbentuk dari **huruf-huruf yang sama** tapi disusun dalam **urutan yang berbeda**.

```
'cat'  →  c, a, t
'act'  →  a, c, t
'tac'  →  t, a, c
```

Ketiga kata di atas punya huruf yang sama (`a`, `c`, `t`) — hanya urutannya yang berbeda. Jadi ketiganya adalah anagram satu sama lain.

---

## 🔑 Ide Utama: Derived Key

Tantangan utama challenge ini adalah: **bagaimana cara mengelompokkan kata-kata yang merupakan anagram?**

Idenya sederhana — kalau kita **sort huruf-huruf** dari setiap kata, kata-kata yang merupakan anagram akan menghasilkan **hasil sort yang identik**:

```
'cat' → split → ['c','a','t'] → sort → ['a','c','t'] → join → 'act'
'act' → split → ['a','c','t'] → sort → ['a','c','t'] → join → 'act'
'tac' → split → ['t','a','c'] → sort → ['a','c','t'] → join → 'act'

'dog' → split → ['d','o','g'] → sort → ['d','g','o'] → join → 'dgo'
'god' → split → ['g','o','d'] → sort → ['d','g','o'] → join → 'dgo'
```

Hasil sort inilah yang kita sebut **derived key** — sebuah kunci yang *diturunkan* dari kata aslinya. Kata-kata dengan derived key yang sama berarti anagram satu sama lain!

---

## 🗺️ Pendekatan Penyelesaian

Setelah punya derived key, kita tinggal **mengelompokkan** kata-kata berdasarkan key tersebut. Polanya mirip dengan challenge `graduates` dan `highestScore` yang pernah dikerjakan sebelumnya:

### Langkah-langkah:

```
1. Siapkan tempat penampung (Object {} atau Map)

2. Untuk setiap kata:
   a. Hitung derived key → sort huruf-hurufnya
   b. Kalau key belum ada di penampung → buat entry baru
   c. Masukkan kata ke dalam entry yang sesuai

3. Ambil semua value dari penampung → itulah array of arrays-nya
```

### Visualisasi Proses:

```
Input: ['cat', 'act', 'dog', 'god', 'tac']

Iterasi 1 — 'cat':
  key: 'act'
  penampung: { act: ['cat'] }

Iterasi 2 — 'act':
  key: 'act'
  penampung: { act: ['cat', 'act'] }

Iterasi 3 — 'dog':
  key: 'dgo'
  penampung: { act: ['cat', 'act'], dgo: ['dog'] }

Iterasi 4 — 'god':
  key: 'dgo'
  penampung: { act: ['cat', 'act'], dgo: ['dog', 'god'] }

Iterasi 5 — 'tac':
  key: 'act'
  penampung: { act: ['cat', 'act', 'tac'], dgo: ['dog', 'god'] }

Ambil values:
  [['cat', 'act', 'tac'], ['dog', 'god']] ✅
```

---

## ❌ Kenapa Tidak Pakai checkAnagram()?

Mungkin kamu sempat berpikir — kenapa tidak pakai fungsi `checkAnagram()` seperti di challenge `validAnagrams`?

```javascript
// ❌ Pendekatan checkAnagram — kurang efisien untuk grouping
for (let i = 0; i < words.length; i++) {
  for (let j = i + 1; j < words.length; j++) {
    if (checkAnagram(words[i], words[j])) {
      // kelompokkan...
    }
  }
}
```

Masalahnya, pendekatan ini membandingkan setiap kata dengan semua kata lain — artinya ada **loop di dalam loop** (O(n²)). Semakin banyak kata, semakin lambat.

Pendekatan derived key jauh lebih efisien — cukup **satu kali loop** (O(n)) karena setiap kata hanya diproses sekali.

---

## ✅ Ringkasan

| Konsep | Penjelasan |
|--------|------------|
| Anagram | Kata dengan huruf yang sama, urutan berbeda |
| Derived key | Hasil sort huruf dari sebuah kata |
| Cara dapat key | `word.split('').sort().join('')` |
| Cara kelompokkan | Gunakan Object `{}` atau `Map` dengan key = derived key |
| Cara ambil hasil | `Object.values()` atau `[...map.values()]` |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 00: Deskripsi Soal](00-challenge-description_deskripsi-soal.md)**
- **📖 [Lanjut ke Part 02: Solusi — reduce + Object →](02-solution-reduce-object_solusi-reduce-objek.md)**

---

<div align="center">

Made with ❤️ for learners

</div>