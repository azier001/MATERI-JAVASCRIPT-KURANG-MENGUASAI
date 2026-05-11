# 📊 Perbandingan Semua Versi — All Versions Comparison

![Topic](https://img.shields.io/badge/Topic-Comparison-blue?style=for-the-badge)
![Versions](https://img.shields.io/badge/Versions-5-orange?style=for-the-badge)

---

## 📑 Daftar Isi

- 📋 [Semua Kode Sekilas](#semua-kode)
- 📊 [Tabel Perbandingan](#tabel-perbandingan)
- 🏆 [Rekomendasi](#rekomendasi)
- ✅ [Ringkasan](#ringkasan)

---

<a name="semua-kode"></a>
## 📋 Semua Kode Sekilas

### Versi 1 — If-Else Loop

```js
const getSum = (a, b) => {
  let start;
  let end;

  if (a > b) {
    start = b;
    end = a;
  } else {
    start = a;
    end = b;
  }

  let sum = 0;

  for (let i = start; i <= end; i++) {
    sum += i;
  }

  return sum;
};
```

---

### Versi 2 — Math.min/max Loop

```js
const getSum = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  let sum = 0;

  for (let i = min; i <= max; i++) {
    sum += i;
  }

  return sum;
};
```

---

### Versi 3 — Gauss Min Max

```js
const getSum = (a, b) => {
  let min = Math.min(a, b),
      max = Math.max(a, b);
  return (max - min + 1) * (min + max) / 2;
};
```

---

### Versi 4 — Gauss Math.abs ⭐ Rekomendasi

```js
function getSum(a, b) {
  return (Math.abs(a - b) + 1) * (a + b) / 2;
}
```

---

### Versi 5 — Recursive

```js
function getSum(a, b) {
  if (a == b) return a;
  else if (a < b) return a + getSum(a + 1, b);
  else return a + getSum(a - 1, b);
}
```

---

<a name="tabel-perbandingan"></a>
## 📊 Tabel Perbandingan

### Teknik & Pendekatan

| Versi | Pendekatan | Cara Tentukan Batas | Cara Hitung Total |
|:---:|:---|:---|:---|
| V1 | If-Else + Loop | `if-else` manual (8 baris) | `for` loop satu per satu |
| V2 | Built-in + Loop | `Math.min()` / `Math.max()` | `for` loop satu per satu |
| V3 | Built-in + Gauss | `Math.min()` / `Math.max()` | Rumus Gauss (1 baris) |
| V4 | Math.abs + Gauss | Tidak perlu (pakai `Math.abs`) ⭐ | Rumus Gauss (1 baris) ⭐ |
| V5 | Rekursif | Tidak perlu (arah ditentukan kondisi) | Fungsi memanggil diri sendiri |

### Kompleksitas & Performa

| Versi | Waktu (Time) | Memori (Space) | Jumlah Baris Inti |
|:---:|:---:|:---:|:---:|
| V1 | O(n) | O(1) | 12 baris |
| V2 | O(n) | O(1) | 7 baris |
| V3 | O(1) ⭐ | O(1) ⭐ | 3 baris |
| V4 | O(1) ⭐ | O(1) ⭐ | 1 baris ⭐ |
| V5 | O(n) | O(n) ❌ | 3 baris |

### Kelebihan & Kekurangan

| Versi | Kelebihan | Kekurangan |
|:---|:---|:---|
| V1 | Paling mudah dipahami pemula | Paling panjang, lambat untuk rentang besar |
| V2 | Lebih ringkas dari V1, aman dengan `const` | Masih lambat (O(n)) |
| V3 | Cepat (O(1)), variabel `min/max` mudah dibaca | 2 pemanggilan fungsi built-in |
| V4 | Paling cepat & ringkas, cuma 1 baris inti ⭐ | Rumus tidak intuitif bagi pemula |
| V5 | Elegan, tidak butuh built-in, melatih rekursi | Bisa crash (Stack Overflow), boros memori |

---

<a name="rekomendasi"></a>
## 🏆 Rekomendasi

| Situasi | Versi yang Disarankan |
|:---|:---|
| Baru belajar dan ingin paham alur dasar | **V1** — logika paling eksplisit, mudah di-trace |
| Ingin kode bersih tanpa `if-else` panjang | **V2** — refactoring sederhana dengan `Math.min/max` |
| Butuh performa cepat tapi tetap readable | **V3** — Gauss + variabel `min/max` yang jelas |
| Production code atau rentang angka sangat besar | **V4** — paling efisien, 1 baris, O(1) ⭐ |
| Latihan konsep rekursi atau interview prep | **V5** — melatih cara berpikir rekursif |

---

<a name="ringkasan"></a>
## ✅ Ringkasan

Semua versi menghasilkan output yang sama — yang berbeda hanya **cara berpikirnya**:

- **V1 & V2** — berpikir via **iterasi (loop)**: "Saya akan berjalan dari angka awal ke akhir, menjumlahkan satu per satu."
- **V3 & V4** — berpikir via **matematika (rumus)**: "Saya tahu polanya, jadi langsung hitung hasilnya tanpa jalan satu per satu."
- **V5** — berpikir via **delegasi (rekursi)**: "Saya ambil angka ini, sisanya saya serahkan ke diri saya sendiri."

> 💬 "Tidak ada versi yang paling benar — setiap versi mengajarkan cara berpikir yang berbeda. Developer yang hebat bukan yang hanya tahu satu cara, tapi yang tahu kapan harus pakai cara yang mana."

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 07 — V5 Recursive](./07-version-v5-recursive.md)**
- **📖 [Lanjut ke Part 09 — Insight →](./09-insight.md)**
