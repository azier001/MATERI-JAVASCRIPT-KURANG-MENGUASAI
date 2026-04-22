# 🔢 V2 — Counter Implementation — Implementasi Counter

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Counter%20|%20O(1)%20Space-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V2--Counter-purple?style=for-the-badge)

---

## 📚 Daftar Isi

- 💻 [Kode Lengkap](#kode)
- 🔍 [Penjelasan Baris per Baris](#penjelasan)
- 🧠 [Konsep Kunci](#konsep)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- ⚖️ [Perbandingan Stack vs Counter](#perbandingan)
- 💡 [Insight Penting](#insight)

---

<a name="kode"></a>
## 💻 Kode Lengkap

```js
function isBalanced(str) {
  if (str.length % 2 !== 0) return false;

  let count = 0;

  for (const paren of str) {
    if (paren === '(') count++;
    else if (paren === ')') count--;

    if (count < 0) return false;
  }

  return count === 0;
}
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

### Guard Clause

```js
if (str.length % 2 !== 0) return false;
```

🛡️ Sama seperti V1 — jika panjang ganjil, mustahil seimbang. Langsung pulang!

---

### Persiapan Counter

```js
let count = 0;
```

🔢 Bukan array, tapi **satu variabel angka**. Counter ini merepresentasikan *"berapa banyak kurung buka yang belum punya pasangan"*.

> 💡 **Analogi: Lift di Gedung.**
> - `count` adalah **lantai** tempat lift berada.
> - Lantai `0` = Ground Floor (posisi awal & posisi akhir yang benar).
> - Naik (`count++`) = ada kurung buka.
> - Turun (`count--`) = ada kurung tutup.
> - Masuk **basement** (`count < 0`) = ILEGAL! 🚨

---

### Loop & Hitung

```js
for (const paren of str) {
  if (paren === '(') count++;
  else if (paren === ')') count--;
```

🔄 Untuk setiap karakter:
- `(` → counter **naik** (lift naik satu lantai — ada hutang baru)
- `)` → counter **turun** (lift turun satu lantai — hutang dilunasi)

---

### Validasi di Tengah Jalan

```js
  if (count < 0) return false;
```

🚨 **Pengecekan kritis!** Jika counter jadi **negatif**, artinya ada `)` yang muncul tanpa `(` sebelumnya — lift masuk basement, tidak boleh!

> ⚠️ **Kenapa tidak cukup cek di akhir saja?**
> Karena input `)(` akan menghasilkan `count = 0` di akhir (turun 1, naik 1). Tapi urutannya salah! Pengecekan `count < 0` **di dalam loop** menangkap error ini secepat mungkin.

---

### Final Check

```js
return count === 0;
```

✅ Setelah loop selesai:
- `count === 0` → Lift kembali ke Ground Floor → semua seimbang → `true`
- `count > 0` → Lift masih di atas → ada kurung buka yang jomblo → `false`

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Kenapa Counter bisa menggantikan Stack?

Karena tantangan ini **hanya punya satu jenis kurung** `()`. Kita tidak perlu tahu *isi* tumpukan, kita cuma perlu tahu *jumlahnya*.

```
Stack menyimpan:     [ '(', '(', '(' ]   ← butuh memori untuk 3 elemen
Counter menyimpan:   3                    ← cuma satu angka!
```

Keduanya punya informasi yang **sama persis** untuk kasus satu jenis kurung.

---

### Kenapa Counter GAGAL untuk kurung campuran?

Bayangkan input `([)]` dengan pendekatan Counter:

```
Counter approach (SALAH):
  '(' → roundCount: 1
  '[' → squareCount: 1
  ')' → roundCount: 0     ← "hutang dilunasi"
  ']' → squareCount: 0    ← "hutang dilunasi"
  
  Hasil: true ❌ (SEHARUSNYA false!)
```

```
Stack approach (BENAR):
  '(' → Stack: [ '(' ]
  '[' → Stack: [ '(', '[' ]
  ')' → pop() → dapat '[' → TIDAK COCOK dengan ')' 💥
  
  Hasil: false ✅
```

> 💡 **Kesimpulan:**
> - **Counter** hanya tahu **jumlah** — cocok untuk 1 jenis kurung.
> - **Stack** tahu **jumlah + urutan + jenis** — wajib untuk banyak jenis kurung.

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

### ✅ Skenario Sukses: Input `(())`

```
Input: "(())"
Panjang: 4 (Genap → lolos guard clause!)

STEP 1: paren = '('
   Action: count++ → count = 1
   Lantai: 🏢 ▲ Lt.1
   Cek: count < 0? NO → lanjut

STEP 2: paren = '('
   Action: count++ → count = 2
   Lantai: 🏢 ▲ Lt.2
   Cek: count < 0? NO → lanjut

STEP 3: paren = ')'
   Action: count-- → count = 1
   Lantai: 🏢 ▼ Lt.1
   Cek: count < 0? NO → lanjut

STEP 4: paren = ')'
   Action: count-- → count = 0
   Lantai: 🏢 ▼ Ground Floor
   Cek: count < 0? NO → lanjut

FINAL CHECK:
   count === 0?  YES ✅
   return true 🎉
```

### Visualisasi Lift:

```
Lantai
  2  │      ╭──╮
  1  │   ╭──╯  ╰──╮
  0  │───╯         ╰───  ← Ground Floor (start & finish)
 -1  │ · · · · · · · · · (ZONA TERLARANG)
     └──────────────────
       (  (  )  )
```

---

### 💥 Skenario Gagal di Tengah: Input `())(` 

```
Input: "())("
Panjang: 4 (Genap → lolos guard clause)

STEP 1: paren = '('
   Action: count++ → count = 1
   Lantai: 🏢 ▲ Lt.1
   Cek: count < 0? NO → lanjut

STEP 2: paren = ')'
   Action: count-- → count = 0
   Lantai: 🏢 ▼ Ground Floor
   Cek: count < 0? NO → lanjut

STEP 3: paren = ')'
   Action: count-- → count = -1
   Lantai: 🏢 ▼ BASEMENT! 🚨
   Cek: count < 0? YES!

   → return false 💥
```

### Visualisasi Lift:

```
Lantai
  1  │   ╭──╮
  0  │───╯  ╰──╮         ← Ground Floor
 -1  │ · · · · ╰── 💥    (MASUK BASEMENT → GAGAL!)
     └──────────────────
       (  )  )  (
```

---

### 💥 Skenario Gagal di Akhir: Input `((`

```
Input: "(("
Panjang: 2 (Genap → lolos guard clause)

STEP 1: paren = '('
   Action: count++ → count = 1
   Lantai: 🏢 ▲ Lt.1
   Cek: count < 0? NO → lanjut

STEP 2: paren = '('
   Action: count++ → count = 2
   Lantai: 🏢 ▲ Lt.2
   Cek: count < 0? NO → lanjut

FINAL CHECK:
   count === 0?  NO ❌ (count = 2)
   return false 💥

   (Lift masih di Lt.2, tidak kembali ke Ground Floor!)
```

### Visualisasi Lift:

```
Lantai
  2  │      ╭──── 💥     (TERJEBAK DI ATAS → GAGAL!)
  1  │   ╭──╯
  0  │───╯                ← Ground Floor (seharusnya finish di sini)
 -1  │ · · · · · · · · ·
     └──────────────────
       (  (
```

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan Langsung: Stack vs Counter

| Aspek | V1 — Stack | V2 — Counter |
|-------|-----------|-------------|
| **Struktur data** | Array (`[]`) | Variabel angka (`0`) |
| **Operasi utama** | `push()` / `pop()` | `count++` / `count--` |
| **Deteksi "tutup tanpa buka"** | `pop() === undefined` | `count < 0` |
| **Final check** | `stack.length === 0` | `count === 0` |
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | **O(n)** | **O(1)** ✨ |
| **Support multi-kurung** | ✅ Ya (`{}`, `[]`, `()`) | ❌ Tidak |
| **Kapan digunakan** | Kurung campuran / interview umum | Satu jenis kurung / optimasi memori |

---

<a name="insight"></a>
## 💡 Insight Penting

> **Kenapa versi Counter lebih hemat memori?**
> Stack (Array) menyimpan **setiap karakter** `(` yang belum ditutup. Jika inputnya satu miliar karakter `(`, array harus menampung satu miliar data. Counter hanya menyimpan **satu angka** — `1.000.000.000` — tidak peduli seberapa besar inputnya.

> **Kapan harus pilih Counter daripada Stack?**
> Jika kamu **yakin** inputnya hanya punya **satu jenis kurung** dan kamu ingin mengoptimalkan penggunaan memori. Di interview, tunjukkan versi Stack dulu, lalu tawarkan optimasi Counter — ini menunjukkan kamu paham trade-off antara *correctness* dan *efficiency*.

> **Tips Interview:**
> *"Untuk pendekatan Stack, Space Complexity-nya O(n). Tapi karena kita hanya punya satu jenis kurung, kita bisa optimasi menjadi O(1) Space menggunakan variabel counter, sehingga memori yang digunakan tetap konstan berapa pun panjang inputnya."*

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 3 — V1 Stack Implementation](./03-v1-stack-implementation_stack.md)**
- **📖 [Lanjut ke Part 5 — Refactoring & Optimasi →](./05-refactoring_optimasi.md)**
