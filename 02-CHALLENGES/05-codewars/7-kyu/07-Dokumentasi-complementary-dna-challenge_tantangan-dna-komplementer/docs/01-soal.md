# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Complementary DNA — Codewars](https://www.codewars.com/kata/554e4a2f232cdd87d9000038)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> Deoxyribonucleic acid (DNA) is a chemical found in the nucleus of cells and carries the "instructions" for the development and functioning of living organisms.
>
> If you want to know more: http://en.wikipedia.org/wiki/DNA
>
> In DNA strings, symbols "A" and "T" are complements of each other, as "C" and "G". Your function receives one side of the DNA (string, except for Haskell); you need to return the other complementary side. DNA strand is never empty or there is no DNA at all (again, except for Haskell).
>
> More similar exercise are found here: http://rosalind.info/problems/list-view/ (source)
>
> Example: (input --> output)
>
> `"ATTGC" --> "TAACG"`
> `"GTAT" --> "CATA"`

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Dalam challenge ini, kamu diberikan satu sisi dari untai DNA berupa string. Tugasmu adalah mengembalikan sisi komplementernya berdasarkan aturan pasangan basa: **"A" berpasangan dengan "T"**, dan **"C" berpasangan dengan "G"**. Untai DNA yang diberikan dijamin tidak pernah kosong.

### 🗣️ Penjelasan Sederhana

Bayangkan untai DNA seperti **ritsleting (zipper)**. Satu sisi ritsleting punya deretan gerigi dengan bentuk tertentu, dan sisi seberangnya harus punya gerigi yang pas sebagai pasangannya:

- Gerigi tipe **"A"** hanya cocok dengan gerigi tipe **"T"** (dan sebaliknya)
- Gerigi tipe **"C"** hanya cocok dengan gerigi tipe **"G"** (dan sebaliknya)

Tugasmu: diberikan satu sisi ritsleting, rakit sisi seberangnya dengan memasangkan setiap gerigi ke pasangannya yang tepat.

```
Sisi Input:        A   T   T   G   C
                   ↕   ↕   ↕   ↕   ↕
Sisi Komplementer: T   A   A   C   G
```

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `dna` | `String` | String berisi karakter DNA (`"A"`, `"T"`, `"C"`, `"G"`) yang merepresentasikan satu sisi untai DNA. Dijamin tidak kosong. |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `String` | String komplementer dari untai DNA input, dengan aturan pasangan: `"A"` ↔ `"T"` dan `"C"` ↔ `"G"`. |

---

## 🧪 Contoh

```javascript
// Contoh 1 — String campuran semua basa
dnaStrand("ATTGC") // → "TAACG"
// Penjelasan: A→T, T→A, T→A, G→C, C→G

// Contoh 2 — String tanpa C
dnaStrand("GTAT") // → "CATA"
// Penjelasan: G→C, T→A, A→T, T→A

// Contoh 3 — String dengan satu karakter
dnaStrand("A") // → "T"
// Penjelasan: Hanya ada satu basa, tinggal cari pasangannya.
```

---

## ⚠️ Catatan Khusus

- [x] Aturan pasangan bersifat **dua arah**: `"A"` ↔ `"T"` dan `"C"` ↔ `"G"`.
- [x] String input **tidak pernah kosong** (dijamin oleh soal).
- [x] Input hanya berisi 4 karakter valid: `A`, `T`, `C`, `G` (huruf kapital).

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
