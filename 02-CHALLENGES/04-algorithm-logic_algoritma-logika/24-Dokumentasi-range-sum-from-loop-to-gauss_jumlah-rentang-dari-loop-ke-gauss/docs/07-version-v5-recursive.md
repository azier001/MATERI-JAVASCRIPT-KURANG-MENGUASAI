# 🌀 V5 — Recursive — Rekursif

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Algorithm%20Logic-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V5-purple?style=for-the-badge)

---

## 📑 Daftar Isi

- 💻 [Kode Lengkap](#kode)
- 🔍 [Penjelasan Baris per Baris](#penjelasan)
- 🧠 [Konsep Kunci](#konsep)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- ⏪ [Proses Unwinding](#unwinding)
- 💡 [Insight Penting](#insight)
- ⚠️ [Jebakan yang Ditemukan](#jebakan)
- ⚖️ [Evaluasi Versi Ini](#evaluasi)

---

<a name="kode"></a>
## 💻 Kode Lengkap

Versi ini menggunakan pendekatan yang sangat berbeda — fungsi memanggil dirinya sendiri (rekursi) alih-alih menggunakan loop atau rumus. Setiap panggilan mengambil satu angka, lalu menyerahkan sisanya ke panggilan berikutnya.

```js
function getSum(a, b) {
  if (a == b) return a;
  else if (a < b) return a + getSum(a + 1, b);
  else return a + getSum(a - 1, b);
}
```

### 🎨 Visualisasi ASCII

```text
Target: getSum(1, 3)

[Start]
  |
  V
  a = 1, b = 3
  Cek: a == b? (1 == 3?) ❌
  Cek: a < b?  (1 < 3?)  ✅
  → return 1 + getSum(2, 3)    ← TUNGGU...
                |
                V
                a = 2, b = 3
                Cek: a == b? (2 == 3?) ❌
                Cek: a < b?  (2 < 3?)  ✅
                → return 2 + getSum(3, 3)    ← TUNGGU...
                              |
                              V
                              a = 3, b = 3
                              Cek: a == b? (3 == 3?) ✅
                              → return 3    ← SELESAI!

  [Unwinding / Kembali ke Atas]
                              return 3
                return 2 + 3 = 5
      return 1 + 5 = 6
  |
  V
  return 6 ✅
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

```js
function getSum(a, b) {
```
🏗️ Membuat fungsi `getSum` menggunakan Function Declaration. Gaya ini dipilih agar fungsi bisa "melihat dirinya sendiri" untuk memanggil dirinya kembali (rekursi).

---

```js
if (a == b) return a;
```
🛑 **Base Case** — Kondisi berhenti. Jika `a` sudah sama dengan `b`, artinya kita sudah sampai di ujung deret. Tidak perlu memanggil fungsi lagi, langsung kembalikan angka `a`. Tanpa baris ini, fungsi akan memanggil diri sendiri tanpa henti sampai komputer kehabisan memori.

---

```js
else if (a < b) return a + getSum(a + 1, b);
```
🔁 **Recursive Step (Maju)** — Jika `a` lebih kecil dari `b`, kita ambil angka `a` saat ini, lalu minta fungsi `getSum` menghitung sisanya mulai dari `a + 1`. Angka `a` "berjalan maju" satu langkah mendekati `b`.

---

```js
else return a + getSum(a - 1, b);
```
🔁 **Recursive Step (Mundur)** — Jika `a` lebih besar dari `b`, logikanya sama tapi `a` "berjalan mundur" (`a - 1`) mendekati `b`.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Kenapa rekursi bisa menggantikan loop?

Karena keduanya melakukan hal yang sama: **mengulang sebuah proses sampai kondisi tertentu tercapai**. Bedanya:

| Aspek | Loop (`for`) | Rekursi |
|:---:|:---:|:---:|
| Cara mengulang | Variabel counter (`i++`) | Fungsi memanggil diri sendiri |
| Cara berhenti | Kondisi `i <= max` gagal | Base case tercapai (`a == b`) |
| Menyimpan hasil | Variabel `sum` di-update terus | Ditumpuk di call stack |

> 💡 **Analogi:** "Loop itu seperti kamu sendiri yang berjalan dari lantai 1 ke lantai 5, menghitung anak tangga satu per satu. Rekursi itu seperti kamu menyuruh orang lain: 'Hei, tolong hitung dari lantai 2 ke 5, nanti aku tambahkan lantai 1.' Orang itu lalu menyuruh orang lain lagi: 'Tolong hitung dari lantai 3 ke 5...' dan seterusnya."

### Apa itu Base Case dan kenapa wajib ada?

Base Case adalah **rem darurat** dari rekursi. Tanpa base case, fungsi akan terus memanggil diri sendiri tanpa batas, menghabiskan seluruh memori komputer, dan akhirnya crash dengan error: `Maximum call stack size exceeded`.

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi: getSum(5, 2)

  Panggilan 1: getSum(5, 2)
    a = 5, b = 2
    Cek: 5 == 2? ❌
    Cek: 5 < 2?  ❌
    → else: return 5 + getSum(4, 2)    ← TUNGGU

  Panggilan 2: getSum(4, 2)
    a = 4, b = 2
    Cek: 4 == 2? ❌
    Cek: 4 < 2?  ❌
    → else: return 4 + getSum(3, 2)    ← TUNGGU

  Panggilan 3: getSum(3, 2)
    a = 3, b = 2
    Cek: 3 == 2? ❌
    Cek: 3 < 2?  ❌
    → else: return 3 + getSum(2, 2)    ← TUNGGU

  Panggilan 4: getSum(2, 2)
    a = 2, b = 2
    Cek: 2 == 2? ✅ BASE CASE!
    → return 2
```

---

<a name="unwinding"></a>
## ⏪ Proses Unwinding

Setelah base case tercapai, semua panggilan yang "menunggu" mulai menghitung balik dari bawah ke atas:

```
📊 Unwinding (Kembali ke Atas):

  Panggilan 4: return 2                        ← BASE CASE
  Panggilan 3: return 3 + 2           = 5
  Panggilan 2: return 4 + 5           = 9
  Panggilan 1: return 5 + 9           = 14

  Output: 14
```

Visualisasi tumpukan (Call Stack):

```
  ┌─────────────────────┐
  │ getSum(2, 2) → 2    │  ← Paling atas, selesai duluan
  ├─────────────────────┤
  │ getSum(3, 2) → 3+2  │
  ├─────────────────────┤
  │ getSum(4, 2) → 4+5  │
  ├─────────────────────┤
  │ getSum(5, 2) → 5+9  │  ← Paling bawah, selesai terakhir
  └─────────────────────┘
```

---

<a name="insight"></a>
## 💡 Insight Penting

> **Kenapa rekursi ini tidak butuh `Math.min`, `Math.max`, atau `Math.abs`?**
> Karena rekursi menangani urutan secara alami! Jika `a < b`, angka `a` berjalan maju (`a + 1`). Jika `a > b`, angka `a` berjalan mundur (`a - 1`). Kedua arah sudah ditangani tanpa perlu menentukan siapa yang lebih kecil.

> **Apakah rekursi selalu buruk?**
> Tidak! Rekursi sangat cocok untuk masalah yang bersifat "pohon" (tree traversal, nested structure, divide & conquer). Untuk kasus penjumlahan deret sederhana seperti ini, rekursi memang bukan pilihan terbaik — tapi sangat bagus untuk melatih pemahaman konsep.

---

<a name="jebakan"></a>
## ⚠️ Jebakan yang Ditemukan

### Jebakan 1 — Stack Overflow

Jika jarak antara `a` dan `b` terlalu besar (misalnya `getSum(1, 1000000)`), rekursi akan memanggil diri sendiri **1 juta kali**. Setiap panggilan menambah satu "piring" ke tumpukan (call stack). Browser dan Node.js punya batas tumpukan — jika terlampaui, program crash.

```js
getSum(1, 1000000);
// ❌ RangeError: Maximum call stack size exceeded
```

> 💡 **Pelajaran:** Selalu pertimbangkan seberapa dalam rekursi bisa berjalan. Jika bisa sangat dalam, gunakan loop atau rumus matematika sebagai gantinya.

---

<a name="evaluasi"></a>
## ⚖️ Evaluasi Versi Ini

| Kelebihan | Kekurangan |
|-----------|------------|
| Tidak butuh `Math.min/max/abs` | Bisa crash untuk rentang besar (Stack Overflow) |
| Kode sangat elegan dan matematis | Lebih lambat dari loop (overhead panggilan fungsi) |
| Melatih pemahaman konsep rekursi | Sulit di-debug karena banyak panggilan tersembunyi |
| Menangani urutan `a`/`b` secara alami | Kompleksitas waktu O(n) + boros memori O(n) |

> 💡 **Cocok digunakan ketika** kamu ingin melatih pemahaman rekursi atau mengerjakan soal yang memang membutuhkan pendekatan rekursif. Untuk production code dengan rentang angka besar, gunakan V3 atau V4 (Rumus Gauss).

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 06 — V4 Gauss Math.abs](./06-version-v4-gauss-math-abs.md)**
- **📖 [Lanjut ke Part 08 — Comparison →](./08-comparison.md)**
