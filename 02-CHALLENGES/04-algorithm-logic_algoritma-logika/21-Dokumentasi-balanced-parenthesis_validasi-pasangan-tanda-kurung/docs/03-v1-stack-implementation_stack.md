# 📚 V1 — Stack Implementation — Implementasi Stack

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Stack%20|%20LIFO-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V1--Stack-purple?style=for-the-badge)

---

## 📚 Daftar Isi

- 💻 [Kode Lengkap](#kode)
- 🔍 [Penjelasan Baris per Baris](#penjelasan)
- 🧠 [Konsep Kunci](#konsep)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- 💡 [Insight Penting](#insight)

---

<a name="kode"></a>
## 💻 Kode Lengkap

```js
function isBalanced(str) {
  if (str.length % 2 !== 0) return false;

  const stack = [];

  for (const paren of str) {
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

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

### Guard Clause

```js
if (str.length % 2 !== 0) return false;
```

🛡️ **Guard clause** — jika panjang string ganjil, mustahil setiap kurung punya pasangan. Langsung pulang, tidak perlu kerja lebih!

> 💡 **Kenapa ini efektif?** Input `"(()"` punya 3 karakter. Tanpa guard clause, kita harus loop 3 kali baru tahu hasilnya `false`. Dengan guard clause, kita tahu **seketika**.

---

### Persiapan Stack

```js
const stack = [];
```

📦 Membuat tumpukan kosong. Array ini akan bertindak sebagai **Stack** (LIFO) — tempat kita menyimpan kurung buka yang belum punya pasangan.

---

### Loop & Push

```js
for (const paren of str) {
  if (paren === '(') {
    stack.push(paren);
  }
```

🔄 Untuk setiap karakter dalam string:
- Jika ketemu `(` → **push** ke stack (taruh kardus di atas tumpukan)
- Artinya: *"Ada satu hutang kurung tutup yang harus dilunasi nanti."*

---

### Pop & Validasi

```js
  } else if (paren === ')') {
    if (stack.pop() === undefined) {
      return false;
    }
  }
```

🎯 Jika ketemu `)`:
1. Panggil `stack.pop()` — **ambil** elemen teratas dari stack.
2. Jika hasilnya `undefined`, berarti stack sudah **kosong** — tidak ada `(` yang bisa dipasangkan.
3. Langsung `return false` — seperti menutup pintu yang tidak pernah dibuka!

> 💡 **Trik "sakti":** `.pop()` pada array kosong di JavaScript mengembalikan `undefined`. Jadi kita bisa **mengambil sekaligus mengecek** dalam satu baris — tidak perlu cek `stack.length === 0` terpisah.

---

### Final Check

```js
return stack.length === 0;
```

✅ Setelah loop selesai, periksa apakah stack **benar-benar kosong**:
- `stack.length === 0` → Semua `(` sudah punya pasangan → `true`
- `stack.length > 0` → Masih ada `(` yang jomblo → `false`

> ⚠️ **Jangan pernah** langsung `return true` di sini! Ingat kasus `"(("` — loop selesai tanpa error, tapi stack masih berisi dua kurung buka.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Kenapa Stack (LIFO)?

Karena kurung yang **terakhir dibuka** harus **pertama ditutup**. Persis seperti tumpukan kardus:

```
Input: "(())"

Buka pertama:   (        ← ini harus ditutup TERAKHIR
Buka kedua:       (      ← ini harus ditutup PERTAMA
Tutup pertama:      )    ← menutup yang terakhir dibuka ✅
Tutup terakhir:       )  ← menutup yang pertama dibuka ✅
```

Kalau kita pakai antrian (FIFO), urutannya akan berantakan!

---

### Perbandingan: Cek Manual vs `pop() === undefined`

| Pendekatan | Kode | Jumlah Baris |
|-----------|------|-------------|
| Cek manual | `if (stack.length === 0) return false; stack.pop();` | 2 baris |
| Trik pop | `if (stack.pop() === undefined) return false;` | 1 baris |

Keduanya menghasilkan hasil yang **sama persis**. Versi `pop()` lebih ringkas karena menggabungkan *aksi* (mengambil) dan *pengecekan* (apakah kosong) dalam satu langkah.

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

### ✅ Skenario Sukses: Input `(()())`

```
Input: "(()())"
Panjang: 6 (Genap → lolos guard clause!)

STEP 1: paren = '('
   Action: stack.push('(')
   Stack:  [ '(' ]
           ─────

STEP 2: paren = '('
   Action: stack.push('(')
   Stack:  [ '(', '(' ]
           ──────────

STEP 3: paren = ')'
   Action: stack.pop() → '(' (bukan undefined, aman!)
   Stack:  [ '(' ]
           ─────

STEP 4: paren = '('
   Action: stack.push('(')
   Stack:  [ '(', '(' ]
           ──────────

STEP 5: paren = ')'
   Action: stack.pop() → '(' (aman!)
   Stack:  [ '(' ]
           ─────

STEP 6: paren = ')'
   Action: stack.pop() → '(' (aman!)
   Stack:  [ ]
           ───

FINAL CHECK:
   stack.length === 0 ?  YES ✅
   return true 🎉
```

---

### 💥 Skenario Gagal di Tengah: Input `)(`

```
Input: ")("
Panjang: 2 (Genap → lolos guard clause)

STEP 1: paren = ')'
   Action: stack.pop() → undefined 🚨
   Stack kosong, tidak ada '(' untuk dipasangkan!

   → return false 💥

   (Loop berhenti di step 1, tidak lanjut ke step 2)
```

---

### 💥 Skenario Gagal di Akhir: Input `((`

```
Input: "(("
Panjang: 2 (Genap → lolos guard clause)

STEP 1: paren = '('
   Action: stack.push('(')
   Stack:  [ '(' ]
           ─────

STEP 2: paren = '('
   Action: stack.push('(')
   Stack:  [ '(', '(' ]
           ──────────

   (Loop selesai tanpa error di tengah jalan)

FINAL CHECK:
   stack.length === 0 ?  NO ❌ (stack.length = 2)
   return false 💥

   (Ada 2 kurung buka yang tidak punya pasangan!)
```

---

### 🛡️ Skenario Guard Clause: Input `(()`

```
Input: "(()"
Panjang: 3 (GANJIL!)

GUARD CLAUSE:
   str.length % 2 !== 0 ?  YES (3 % 2 = 1)
   → return false 💥

   (Tidak perlu looping sama sekali!)
```

---

<a name="insight"></a>
## 💡 Insight Penting

> **Kenapa Stack cocok untuk masalah ini?**
> Stack menyimpan **konteks urutan** — kita tahu persis kurung mana yang harus ditutup berikutnya. Ini yang membuat Stack lebih unggul dari sekadar menghitung jumlah kurung, terutama jika nanti tantangannya diperluas ke beberapa jenis kurung (`{}`, `[]`, `()`).

> **Apakah versi ini sudah optimal?**
> Dari sisi **waktu (Time Complexity)**: Ya, sudah **O(n)** — kita hanya melewati string satu kali. Dari sisi **memori (Space Complexity)**: Belum — ini masih **O(n)** karena dalam kasus terburuk (misal `((((`) semua karakter masuk ke Stack. Untuk tantangan yang hanya punya satu jenis kurung, kita bisa optimasi ke **O(1) space** menggunakan Counter — yang akan dibahas di Part 4.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 2 — Alur Berpikir](./02-problem-solving-approach_alur-berpikir.md)**
- **📖 [Lanjut ke Part 4 — V2 Counter Implementation →](./04-v2-counter-implementation_counter.md)**
