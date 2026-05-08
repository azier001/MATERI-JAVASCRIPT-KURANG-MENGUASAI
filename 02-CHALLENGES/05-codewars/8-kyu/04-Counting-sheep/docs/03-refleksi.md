# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-8%20kyu-blue)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Langsung mengenali pola soal: **loop + conditional counting**.
- Menggunakan `=== true` (strict equality) sehingga otomatis mengabaikan `null`, `undefined`, dan `false` tanpa perlu pengecekan tambahan.
- Pseudocode yang disusun di awal langsung tepat, sehingga implementasi berjalan tanpa error.

---

## ❌ Apa yang Salah di Awal?

| Kesalahan | Penyebab | Solusi |
|-----------|----------|--------|
| *(Tidak ada error)* | Soal cukup straightforward | — |

> Soal ini berhasil diselesaikan di percobaan pertama tanpa error.

---

## 🌟 Best Practice dari Komunitas

### Versi 1 — `reduce()`

```javascript
function countSheeps(sheep) {
  return sheep.reduce((acc, curr) => {
    if (curr === true) acc++;
    return acc;
  }, 0);
}
```

**Analisis:**
- Menggunakan `.reduce()` untuk mengakumulasi jumlah `true` dari array.
- `acc` adalah *accumulator* (penampung total), dimulai dari `0`.
- `curr` adalah elemen yang sedang diperiksa di setiap iterasi.
- Secara logika **sama persis** dengan `for` loop + `count++`, tapi ditulis dalam gaya **functional programming**.
- Cocok saat kamu ingin "merangkum" seluruh array menjadi **satu nilai tunggal** (jumlah, total, rata-rata, dll).

---

### Versi 2 — `filter(Boolean)`

```javascript
function countSheeps(arrayOfSheeps) {
  return arrayOfSheeps.filter(Boolean).length;
}
```

**Analisis:**
- `Boolean` adalah fungsi bawaan JavaScript yang mengonversi nilai ke `true`/`false`.
- `filter(Boolean)` artinya: **saring hanya elemen yang *truthy***.
- `null` → `false`, `undefined` → `false`, `false` → `false`, `true` → `true`.
- Hasilnya adalah array baru berisi hanya elemen `true`, lalu tinggal hitung `.length`.
- **Trick**: `filter(Boolean)` adalah shorthand populer untuk membuang semua *falsy values* dari array.

---

### Versi 3 — Arrow Function One-liner

```javascript
let countSheeps = x => x.filter(s => s).length;
```

**Analisis:**
- Ini versi paling ringkas dari Versi 2.
- `s => s` artinya: kembalikan elemen itu sendiri — JavaScript akan mengevaluasinya sebagai *truthy* atau *falsy*.
- Secara logika **identik** dengan `filter(Boolean)`, hanya ditulis lebih singkat.
- Menggunakan `let` dan *arrow function* tanpa keyword `function`.

---

## 🔄 Perbandingan Semua Versi

| Aspek | For Loop (Solusi Kamu) | `reduce()` | `filter(Boolean)` | Arrow One-liner |
|-------|----------------------|------------|-------------------|-----------------|
| **Gaya** | Imperatif | Functional | Functional | Functional |
| **Readability** | ⭐⭐⭐ Sangat jelas | ⭐⭐ Jelas | ⭐⭐ Cukup jelas | ⭐ Singkat tapi padat |
| **Performa** | ✅ Cepat (1 iterasi) | ✅ Cepat (1 iterasi) | ⚠️ Sedikit lebih lambat (buat array baru) | ⚠️ Sama seperti filter |
| **Cocok untuk pemula** | ✅ Ya | 🔶 Perlu paham reduce | 🔶 Perlu paham filter + Boolean | ❌ Sulit dibaca awal |

---

## 📚 Konsep Baru yang Dipelajari

| Konsep | Penjelasan Singkat |
|--------|-------------------|
| `Array.reduce()` | Method untuk "merangkum" array menjadi satu nilai (jumlah, string, objek, dll) |
| `filter(Boolean)` | Shorthand untuk membuang semua *falsy values* (`null`, `undefined`, `false`, `0`, `""`) dari array |
| `s => s` sebagai filter | Arrow function yang mengembalikan elemen itu sendiri, digunakan sebagai *truthy check* |
| Strict Equality `===` | Membandingkan nilai DAN tipe data, sehingga `true === true` tapi `null !== true` |

---

## 🔗 Keterkaitan dengan Materi Lain

> Challenge ini berkaitan dengan pola **conditional counting** yang sama dengan challenge-challenge sebelumnya.

- Berkaitan dengan: Challenge `Sum of Positives` (filter + akumulasi)
- Berkaitan dengan: Challenge `Square(n) Sum` (reduce pattern)
- Konsep `filter(Boolean)` bisa dipakai ulang kapan saja perlu membersihkan array dari *bad values*

---

## 📝 Catatan untuk Masa Depan

- [x] Pola **loop + counter + conditional** sudah dikuasai untuk soal counting.
- [ ] Mulai eksplorasi `reduce()` sebagai alternatif untuk akumulasi.
- [ ] Ingat trick `filter(Boolean)` untuk membersihkan *falsy values* dari array.
- [ ] Pertimbangkan performa: `for` loop tidak membuat array baru, sedangkan `filter()` membuat array baru di memori.

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
