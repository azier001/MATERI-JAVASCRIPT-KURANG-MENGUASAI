# 🧪 Edge Cases — Kasus Pojok

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Edge%20Cases%20|%20Input%20Validation-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📚 Daftar Isi

- 🫙 [Kasus 1 — String Kosong](#kasus-1)
- 🔤 [Kasus 2 — String dengan Spasi atau Karakter Lain](#kasus-2)
- 📏 [Kasus 3 — String Sangat Panjang](#kasus-3)
- 📋 [Ringkasan Semua Edge Cases](#ringkasan)

---

<a name="kasus-1"></a>
## 🫙 Kasus 1 — String Kosong `""`

### Apa yang terjadi?

```js
console.log(isBalanced(''));  // Output: ???
```

Mari kita telusuri alur eksekusinya:

```
Input: ""
Panjang: 0

GUARD CLAUSE:
  str.length % 2 !== 0?
  → 0 % 2 = 0 → GENAP → lolos ✅

LOOP:
  → String kosong, tidak ada karakter untuk diproses
  → Loop TIDAK berjalan sama sekali

FINAL CHECK:
  stack.length === 0? → YES (stack masih [] kosong)
  → return true ✅
```

### Apakah ini benar?

**Ya!** String kosong dianggap **balanced** (seimbang).

> 💡 **Kenapa?** Secara logika: *"Tidak ada kurung buka yang tidak tertutup, dan tidak ada kurung tutup yang tidak punya pasangan."* Tidak ada pelanggaran aturan = valid.

> 🧠 **Analogi:** Bayangkan gudang kardus di akhir hari. Tidak ada kardus masuk, tidak ada kardus keluar. Gudang bersih — tidak ada masalah!

### Tips Interview

Jika interviewer bertanya tentang string kosong, jawab dengan percaya diri:

> *"Saya menganggap string kosong sebagai balanced, karena tidak ada pelanggaran aturan apapun. Tapi jika requirement mengatakan sebaliknya, saya bisa menambahkan guard clause `if (str.length === 0) return false;` di awal."*

---

<a name="kasus-2"></a>
## 🔤 Kasus 2 — String dengan Spasi atau Karakter Lain

### Konteks

Constraint challenge mengatakan *"String hanya berisi kurung"*. Tapi di dunia nyata, input bisa saja mengandung spasi atau karakter lain:

```js
isBalanced('( )');        // Ada spasi di tengah
isBalanced('(a + b)');    // Ada huruf dan operator
isBalanced('  ()  ');     // Ada spasi di awal dan akhir
```

### Tiga Opsi Penanganan

---

#### Opsi A — Ignore (Abaikan) ✅ Rekomendasi

Karakter selain `(` dan `)` **diabaikan** begitu saja. Kode kita yang sudah ada sebenarnya **sudah melakukan ini secara otomatis!**

```js
for (const paren of str) {
  if (paren === '(') {
    stack.push(paren);
  } else if (paren === ')') {     // ← hanya bereaksi pada '(' dan ')'
    if (stack.pop() === undefined) return false;
  }
  // Karakter lain? Tidak masuk if manapun → DIABAIKAN
}
```

Visualisasi dengan input `( )`:

```
Input: "( )"

STEP 1: paren = '('
   → Masuk if pertama → stack.push('(')
   Stack: ['(']

STEP 2: paren = ' '
   → Bukan '(' → skip if pertama
   → Bukan ')' → skip else if
   → TIDAK TERJADI APA-APA ✨
   Stack: ['(']  (tidak berubah)

STEP 3: paren = ')'
   → Masuk else if → stack.pop()
   Stack: []

FINAL: stack.length === 0 → true ✅
```

> 💡 **Kenapa ini rekomendasi?** Karena kode kita sudah melakukannya secara natural tanpa perlu modifikasi!

---

#### Opsi B — Strict (Ketat)

Jika ada karakter selain `(` dan `)`, langsung anggap **tidak valid**:

```js
function isBalanced(str) {
  // Reject jika ada karakter selain ( dan )
  if (/[^()]/.test(str)) return false;

  // ... logika stack seperti biasa
}
```

Penjelasan Regex `/[^()]/`:
```
/[^()]/
  │ │
  │ └── () → karakter yang "diizinkan"
  └──── ^  → "SELAIN" karakter di dalam []

Artinya: "Apakah ada karakter SELAIN ( dan ) di dalam string?"
```

---

#### Opsi C — Sanitasi (Pembersihan)

Bersihkan karakter yang tidak diinginkan **sebelum** memproses:

```js
function isBalanced(str) {
  // Hapus semua karakter selain ( dan )
  str = str.replace(/[^()]/g, '');

  // ... logika stack seperti biasa
}
```

Visualisasi:
```
Input asli:     "( a + b )"
Setelah sanitasi: "()"

→ Baru diproses oleh logika stack
```

---

### Kapan Pakai Opsi Mana?

| Opsi | Kapan Digunakan |
|------|----------------|
| **A — Ignore** | Challenge / soal yang menjamin input hanya kurung |
| **B — Strict** | API / library yang butuh validasi ketat |
| **C — Sanitasi** | Aplikasi user-facing yang harus toleran terhadap typo |

---

<a name="kasus-3"></a>
## 📏 Kasus 3 — String Sangat Panjang

### Apa yang terjadi pada performa?

Misalkan inputnya satu juta karakter:

```
Stack Approach:
  → Loop 1.000.000 kali (Time: O(n) → aman)
  → Worst case: stack menyimpan 1.000.000 elemen (Space: O(n) → boros!)

Counter Approach:
  → Loop 1.000.000 kali (Time: O(n) → aman)
  → Hanya menyimpan 1 variabel (Space: O(1) → aman!)
```

> 💡 **Kesimpulan:** Untuk string yang sangat panjang dengan satu jenis kurung, **Counter** lebih aman karena tidak berisiko kehabisan memori.

### Guard Clause Menyelamatkan!

Jika inputnya 999.999 karakter (ganjil):

```
TANPA guard clause:  Loop 999.999 kali, baru tahu hasilnya false
DENGAN guard clause: Langsung return false, 0 loop! 🚀
```

Satu baris guard clause bisa menghemat **ratusan ribu operasi**!

---

<a name="ringkasan"></a>
## 📋 Ringkasan Semua Edge Cases

| Input | Expected Output | Alasan |
|-------|----------------|--------|
| `""` (kosong) | `true` | Tidak ada pelanggaran aturan |
| `"()"` | `true` | Satu pasang yang cocok |
| `"("` | `false` | Guard clause: panjang ganjil |
| `")"` | `false` | Guard clause: panjang ganjil |
| `")("` | `false` | Kurung tutup sebelum buka |
| `"(("` | `false` | Kurung buka tanpa pasangan |
| `"))"` | `false` | Kurung tutup tanpa pasangan |
| `"( )"` | `true` * | Spasi diabaikan (Opsi A) |
| `"(a)"` | `true` * | Karakter lain diabaikan (Opsi A) |

> \* Tergantung opsi penanganan yang dipilih. Tabel ini menggunakan **Opsi A (Ignore)**.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 5 — Refactoring & Optimasi](./05-refactoring_optimasi.md)**
- **📖 [Lanjut ke Part 7 — Complexity Analysis →](./07-complexity-analysis_analisis-kompleksitas.md)**
