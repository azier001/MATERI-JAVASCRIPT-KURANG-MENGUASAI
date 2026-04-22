# 🛠️ Refactoring & Optimasi

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Clean%20Code%20|%20Refactoring-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📚 Daftar Isi

- 🛡️ [Teknik 1 — Guard Clause](#guard-clause)
- ⚡ [Teknik 2 — Early Exit dengan pop()](#early-exit)
- 🏷️ [Teknik 3 — Penamaan Variabel Deskriptif](#penamaan)
- 🔄 [Evolusi Kode: Sebelum vs Sesudah](#evolusi)

---

<a name="guard-clause"></a>
## 🛡️ Teknik 1 — Guard Clause (Penjaga Pintu)

### Apa itu Guard Clause?

Guard clause adalah pengecekan di **baris paling awal** fungsi untuk menyaring input yang **pasti gagal**, sehingga kode utama tidak perlu dijalankan.

> 💡 **Analogi:** Bayangkan satpam di pintu masuk gedung. Jika tamu tidak punya undangan, satpam langsung menolak — tidak perlu naik lift, cek ruangan, dll.

---

### Sebelum (Tanpa Guard Clause)

```js
function isBalanced(str) {
  const stack = [];
  for (const paren of str) {        // ← harus loop dulu
    if (paren === '(') stack.push(paren);
    else if (paren === ')') {
      if (stack.pop() === undefined) return false;
    }
  }
  return stack.length === 0;         // ← baru tahu hasilnya di sini
}
```

Input `"(()"` (3 karakter) → harus **loop 3 kali** baru tahu hasilnya `false`.

---

### Sesudah (Dengan Guard Clause)

```js
function isBalanced(str) {
  if (str.length % 2 !== 0) return false;  // ← satpam menolak langsung!

  const stack = [];
  // ... sisanya sama
}
```

Input `"(()"` (3 karakter) → langsung `return false` **tanpa loop sama sekali**.

---

### Kenapa `str.length % 2 !== 0`?

Operator `%` (modulo) menghitung **sisa bagi**:

```
Panjang 4 → 4 % 2 = 0 → Genap ✅ (mungkin seimbang)
Panjang 3 → 3 % 2 = 1 → Ganjil ❌ (pasti tidak seimbang)
Panjang 6 → 6 % 2 = 0 → Genap ✅ (mungkin seimbang)
Panjang 1 → 1 % 2 = 1 → Ganjil ❌ (pasti tidak seimbang)
```

> 💡 **Logikanya:** Setiap `(` butuh tepat satu `)`. Jika jumlah karakter ganjil, pasti ada satu kurung yang **jomblo** — mustahil seimbang!

---

### Visualisasi Alur Eksekusi

```
Input: "(()"

TANPA Guard Clause:              DENGAN Guard Clause:
──────────────────────            ──────────────────────
  ↓                                ↓
  Loop step 1: '('                 Guard: panjang 3 → GANJIL!
  ↓                                ↓
  Loop step 2: '('                 return false 💥
  ↓                                (SELESAI — 0 loop!)
  Loop step 3: ')'
  ↓
  Final check: stack.length = 1
  ↓
  return false
  (SELESAI — 3 loop + 1 check)
```

---

<a name="early-exit"></a>
## ⚡ Teknik 2 — Early Exit dengan `pop() === undefined`

### Apa itu Early Exit?

Early exit berarti **keluar dari fungsi sesegera mungkin** begitu kita tahu hasilnya pasti gagal, tanpa menunggu loop selesai.

---

### Sebelum (Cek Manual, 2 Langkah)

```js
if (paren === ')') {
  if (stack.length === 0) {   // Langkah 1: cek apakah kosong
    return false;
  }
  stack.pop();                 // Langkah 2: ambil elemen
}
```

**Dua operasi terpisah:** cek dulu, baru ambil.

---

### Sesudah (Trik pop(), 1 Langkah)

```js
if (paren === ')') {
  if (stack.pop() === undefined) {   // Cek + ambil sekaligus!
    return false;
  }
}
```

**Satu operasi:** ambil sekaligus cek hasilnya.

---

### Kenapa ini bisa bekerja?

Di JavaScript, `.pop()` pada **array kosong** mengembalikan `undefined`:

```js
const arr = [];
console.log(arr.pop());   // undefined

const arr2 = ['('];
console.log(arr2.pop());  // '('
```

Jadi kita bisa menggabungkan *aksi* (mengambil) dan *pengecekan* (apakah kosong) dalam satu langkah:

```
stack.pop()
  │
  ├── Jika stack ada isi → mengembalikan elemen teratas (misal '(')
  │   → '(' === undefined? NO → aman, lanjut
  │
  └── Jika stack kosong → mengembalikan undefined
      → undefined === undefined? YES → return false 💥
```

> ⚠️ **Catatan:** Kedua pendekatan menghasilkan hasil yang **sama persis**. Versi `pop()` hanya lebih **ringkas**, bukan lebih cepat. Gunakan mana yang lebih mudah kamu pahami — readability lebih penting daripada cleverness!

---

<a name="penamaan"></a>
## 🏷️ Teknik 3 — Penamaan Variabel Deskriptif

### Kenapa penamaan penting?

Kode ditulis sekali, tapi dibaca **berkali-kali**. Nama variabel yang tepat membuat kode "bercerita" tanpa perlu komentar tambahan.

---

### Perbandingan Penamaan

| Sebelum | Sesudah | Kenapa lebih baik? |
|---------|---------|-------------------|
| `char` | `paren` | Lebih spesifik — kita tahu ini adalah karakter parenthesis, bukan sembarang karakter |
| `arr` | `stack` | Menjelaskan **peran** array tersebut, bukan tipe datanya |
| `i` | `count` | (Untuk versi Counter) Menjelaskan bahwa variabel ini menghitung sesuatu |

---

### Contoh Kode dengan Penamaan Baik

```js
function isBalanced(str) {
  if (str.length % 2 !== 0) return false;

  const stack = [];                  // ← "stack", bukan "arr" atau "temp"

  for (const paren of str) {        // ← "paren", bukan "char" atau "c"
    if (paren === '(') {
      stack.push(paren);
    } else if (paren === ')') {
      if (stack.pop() === undefined) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

> 💡 **Aturan Praktis:** Jika kamu harus menambahkan komentar untuk menjelaskan apa itu variabel, mungkin nama variabelnya yang perlu diperbaiki.

---

<a name="evolusi"></a>
## 🔄 Evolusi Kode: Dari Awal Hingga Akhir

Berikut perjalanan kode kita dari versi pertama hingga versi final yang sudah di-refactor:

### Versi Awal (Kode Pertama Saya)

```js
function balancedParenthesis(str) {
  const stack = [];

  for (const char of str) {
    if (char === '(') {
      stack.push(char);
    }

    if (char === ')') {
      if (stack.length === 0) {
        return false;
      } else {
        stack.pop();
      }
    }
  }

  return stack.length === 0;
}
```

**Apa yang sudah benar:**
- ✅ Logika push/pop tepat
- ✅ Cek stack kosong sebelum pop
- ✅ Final check `stack.length === 0`

**Apa yang bisa diperbaiki:**
- ❌ Dua `if` terpisah (bisa pakai `else if`)
- ❌ Belum ada guard clause
- ❌ Penamaan `char` kurang spesifik

---

### Versi Final (Setelah Refactoring)

```js
function isBalanced(str) {
  if (str.length % 2 !== 0) return false;   // ✨ Guard clause

  const stack = [];

  for (const paren of str) {                // ✨ Penamaan deskriptif
    if (paren === '(') {
      stack.push(paren);
    } else if (paren === ')') {             // ✨ else if (bukan if terpisah)
      if (stack.pop() === undefined) {      // ✨ Early exit (trik pop)
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

---

### Rangkuman Perubahan

| # | Perubahan | Manfaat |
|---|----------|---------|
| 1 | Tambah **guard clause** `str.length % 2` | Hemat waktu — input ganjil langsung ditolak |
| 2 | Ganti `if...if` → `if...else if` | Hindari pengecekan ganda yang tidak perlu |
| 3 | Trik `stack.pop() === undefined` | Lebih ringkas — cek + ambil dalam satu langkah |
| 4 | Ganti `char` → `paren` | Kode lebih mudah dibaca dan "bercerita" |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 4 — V2 Counter Implementation](./04-v2-counter-implementation_counter.md)**
- **📖 [Lanjut ke Part 6 — Edge Cases →](./06-edge-cases_kasus-pojok.md)**
