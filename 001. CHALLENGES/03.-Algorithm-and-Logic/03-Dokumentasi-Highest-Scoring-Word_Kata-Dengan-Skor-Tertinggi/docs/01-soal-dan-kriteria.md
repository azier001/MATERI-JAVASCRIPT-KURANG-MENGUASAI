# 📚 highestScoringWord - PART 1: SOAL & KRITERIA

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║            📋 PART 1: SOAL & KRITERIA 📋                                ║
║                                                                          ║
║           Apa yang Diminta dan Bagaimana Cara Kerjanya                   ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 📋 Soal | 🔍 Kriteria | 📊 Contoh | ✅ Ringkasan |
|:-------:|:-----------:|:---------:|:-----------:|
| [Jump](#-soal) | [Jump](#-kriteria) | [Jump](#-contoh-contoh) | [Jump](#-ringkasan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami apa yang diminta soal
- ✅ Tahu sistem penilaian huruf berdasarkan posisi alfabet
- ✅ Paham logika perbandingan skor antar kata
- ✅ Siap untuk melihat dan menganalisis kode di Part 2

---

## 📋 Soal

> ### 📋 Deskripsi
>
> Diberikan sebuah function **`highestScoringWord(str)`** yang menerima satu parameter:
>
> | Parameter | Tipe | Keterangan |
> |-----------|------|------------|
> | `str` | `string` | Kalimat berisi kata-kata yang dipisah spasi |
>
> Setiap huruf memiliki nilai sesuai posisinya di alfabet:
>
> | Huruf | a | b | c | ... | x | y | z |
> |-------|---|---|---|-----|---|---|---|
> | Nilai | 1 | 2 | 3 | ... | 24 | 25 | 26 |
>
> **Skor sebuah kata** = jumlah nilai semua hurufnya.
>
> Buatlah function yang mengembalikan **kata dengan skor tertinggi** dari kalimat tersebut.

### 📝 Function Signature

```javascript
/**
 * Returns the highest scoring word from a string.
 * @param {string} str - The input string.
 * @returns {string} - The highest scoring word.
 */
function highestScoringWord(str) {
  // your code here
}
```

---

## 🔍 Kriteria

> **1.** Jika `str` kosong (`''`) atau falsy
> → return string kosong `''`
>
> **2.** Skor kata = jumlah nilai alfabet semua hurufnya (`a=1, b=2, ..., z=26`)
>
> **3.** Return **kata dengan skor tertinggi**
>
> **4.** Jika dua kata memiliki skor yang sama (tie)
> → return kata yang **paling awal** muncul di kalimat
>
> **5.** Semua huruf dijamin **lowercase** dan input selalu **valid**

---

## 📊 Contoh-contoh

### Output yang Diharapkan

```javascript
// ✅ Basic case 1
highestScoringWord('man i need a taxi up to ubud')
// → 'taxi'
// taxi = 20+1+24+9 = 54 (tertinggi)
```

```javascript
// ✅ Basic case 2
highestScoringWord('what time are we climbing up the volcano')
// → 'volcano'
// volcano = 22+15+12+3+1+14+15 = 82 (tertinggi)
```

```javascript
// ✅ Basic case 3
highestScoringWord('take me to semynak')
// → 'semynak'
// semynak = 19+5+13+25+14+1+11 = 88 (tertinggi)
```

```javascript
// ✅ Tie case — skor sama, pilih kata pertama
highestScoringWord('abc cab')
// → 'abc'
// abc = 1+2+3 = 6
// cab = 3+1+2 = 6
// skor sama → pilih 'abc' (muncul lebih awal)
```

```javascript
// ✅ Edge case — input kosong
highestScoringWord('')
// → ''
```

---

### Simulasi Perhitungan Skor: `'man i need a taxi'`

```
Kata   → Perhitungan               → Skor
─────────────────────────────────────────
man    → m(13) + a(1) + n(14)      → 28
i      → i(9)                      → 9
need   → n(14)+e(5)+e(5)+d(4)     → 33  ← sementara tertinggi
a      → a(1)                      → 1
taxi   → t(20)+a(1)+x(24)+i(9)    → 54  ← tertinggi ✅

return 'taxi'
```

---

## ✅ Ringkasan

| Kriteria | Detail |
|----------|--------|
| Parameter | `str` — string kalimat berisi kata-kata |
| Sistem nilai | `a=1, b=2, ..., z=26` |
| Skor kata | Jumlah nilai semua huruf dalam kata |
| Jika tie | Kembalikan kata yang **paling awal** |
| Edge case | `str` falsy → return `''` |
| Return | String — kata dengan skor tertinggi |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 2: Proses Pengerjaan →](02-proses-pengerjaan.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
