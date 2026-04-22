# 🧠 Problem Solving Approach — Alur Berpikir

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Stack%20|%20LIFO-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📚 Daftar Isi

- 🔍 [Langkah 1 — Pahami Masalah](#langkah-1)
- 📦 [Langkah 2 — Pilih Struktur Data](#langkah-2)
- 🛑 [Langkah 3 — Tentukan Kondisi Gagal & Sukses](#langkah-3)
- 🔗 [Langkah 4 — Susun Pseudocode](#langkah-4)
- ❌ [Kesalahan Umum Pemula](#kesalahan)

---

<a name="langkah-1"></a>
## 🔍 Langkah 1 — Pahami Masalah

Sebelum menulis kode, terjemahkan dulu masalahnya ke bahasa sehari-hari:

> *"Periksa apakah setiap tanda kurung buka `(` punya pasangan kurung tutup `)` yang cocok, dan urutannya harus benar — yang terakhir dibuka harus pertama ditutup."*

Tiga pertanyaan kunci:
- **Apa yang kita cari?** → Apakah semua kurung berpasangan dengan benar.
- **Kapan dianggap gagal?** → Saat ada `)` tanpa `(`, atau ada `(` yang tidak tertutup.
- **Kapan dianggap sukses?** → Saat semua kurung buka sudah punya pasangan tutup.

---

### 📦 Analogi: Si Tukang Kardus

Bayangkan kamu bekerja di gudang yang menumpuk kardus:

```
Aturan Gudang:
┌─────────────────────────────────────────────────────┐
│  1. Setiap ada barang MASUK '(' → tumpuk 1 kardus   │
│  2. Setiap ada barang KELUAR ')' → ambil 1 kardus   │
│  3. Mau ambil tapi kardus habis? → GAGAL! 🚨        │
│  4. Akhir hari masih ada kardus? → GAGAL! 🚨        │
│  5. Akhir hari kardus habis pas? → SUKSES! ✅        │
└─────────────────────────────────────────────────────┘
```

Analogi ini **persis** menggambarkan cara kerja Stack untuk memvalidasi tanda kurung.

---

<a name="langkah-2"></a>
## 📦 Langkah 2 — Pilih Struktur Data

Pertanyaan: *"Struktur data apa yang cocok untuk tumpukan kardus?"*

Jawabannya: **Stack** — karena kita butuh prinsip **LIFO** (Last In, First Out).

Di JavaScript, kita bisa menggunakan **Array** sebagai Stack dengan dua method:

| Method | Fungsi | Analogi |
|--------|--------|---------|
| `push()` | Menambah elemen di **atas** tumpukan | Taruh kardus di atas |
| `pop()` | Mengambil elemen **paling atas** | Ambil kardus paling atas |

```
Visualisasi Stack dengan Array:

push('(')    push('(')    pop()        push('(')    pop()        pop()
─────────    ─────────    ─────────    ─────────    ─────────    ─────────
             ┌───┐                     ┌───┐
             │ ( │                     │ ( │
┌───┐        ├───┤        ┌───┐        ├───┤        ┌───┐
│ ( │        │ ( │        │ ( │        │ ( │        │ ( │
└───┘        └───┘        └───┘        └───┘        └───┘        (kosong)
Step 1       Step 2       Step 3       Step 4       Step 5       Step 6
```

> 💡 **Kenapa bukan Counter?** Sebenarnya bisa! Karena tantangan ini hanya punya satu jenis kurung `()`, kita bisa pakai Counter (angka naik-turun) sebagai alternatif yang lebih hemat memori. Kita akan bahas di Part 4.

---

<a name="langkah-3"></a>
## 🛑 Langkah 3 — Tentukan Kondisi Gagal & Sukses

Ada **tiga** titik pengecekan dalam algoritma ini:

### Guard Clause (Sebelum Looping)

```js
if (str.length % 2 !== 0) return false;
```

> ⚠️ **Kenapa?** Jika jumlah karakter ganjil, mustahil setiap `(` punya pasangan `)`. Contoh: `"(()"` punya 3 karakter — pasti ada yang jomblo!

### Kondisi Gagal di Tengah Looping

```
Skenario: Input ")("

Karakter ke-1: ')'
  → Mau ambil kardus dari tumpukan...
  → Tapi tumpukan KOSONG! 🚨
  → Langsung return false 💥
```

### Kondisi Akhir (Setelah Looping)

```
Skenario SUKSES: Input "()"        Skenario GAGAL: Input "(("
  → Loop selesai                     → Loop selesai
  → Stack: []  (KOSONG)              → Stack: ['(', '(']  (MASIH ADA ISI)
  → return true ✅                   → return false ❌
```

---

<a name="langkah-4"></a>
## 🔗 Langkah 4 — Susun Pseudocode

Setelah semua kondisi jelas, gabungkan menjadi alur logika:

```
FUNGSI isBalanced(str):

  ┌─ GUARD CLAUSE ──────────────────────────────┐
  │  Jika panjang str GANJIL → return false      │
  └──────────────────────────────────────────────┘
            │
            ▼
  ┌─ PERSIAPAN ─────────────────────────────────┐
  │  Buat tumpukan kosong (stack = [])           │
  └──────────────────────────────────────────────┘
            │
            ▼
  ┌─ LOOP setiap karakter ──────────────────────┐
  │                                              │
  │  Jika karakter === '('                       │
  │    → push ke stack                           │
  │                                              │
  │  Jika karakter === ')'                       │
  │    → Coba pop dari stack                     │
  │    → Jika stack kosong (pop = undefined)     │
  │      → return false 💥                       │
  │                                              │
  └──────────────────────────────────────────────┘
            │
            ▼
  ┌─ FINAL CHECK ───────────────────────────────┐
  │  Apakah stack kosong?                        │
  │    → Ya  → return true  ✅                   │
  │    → Tidak → return false ❌                  │
  └──────────────────────────────────────────────┘
```

Dari pseudocode ini, kita tinggal **menerjemahkan** ke JavaScript — yang akan kita lakukan di Part 3 (Stack) dan Part 4 (Counter).

---

<a name="kesalahan"></a>
## ❌ Kesalahan Umum Pemula

### Kesalahan 1 — Hanya menghitung jumlah `(` dan `)` tanpa urutan

```js
// ❌ SALAH — Hanya cek jumlah sama, tidak cek urutan
function isBalanced(str) {
  let open = 0;
  let close = 0;
  for (const ch of str) {
    if (ch === '(') open++;
    if (ch === ')') close++;
  }
  return open === close;
}
```

**Masalahnya:** Input `)(` akan dianggap `true` (1 buka, 1 tutup) padahal urutannya salah!

```
Input: ")("
  → open = 1, close = 1
  → open === close → true ❌ (SEHARUSNYA false!)
```

✅ **Perbaikan:** Harus cek urutan — jangan sampai `)` muncul saat tidak ada `(` yang bisa dipasangkan.

---

### Kesalahan 2 — Langsung `return true` di akhir tanpa cek stack

```js
// ❌ SALAH — Tidak mengecek apakah stack masih ada isi
function isBalanced(str) {
  const stack = [];
  for (const ch of str) {
    if (ch === '(') stack.push(ch);
    else if (ch === ')') {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return true; // ← BAHAYA! Bagaimana jika stack masih ada isinya?
}
```

**Masalahnya:** Input `"(()"` akan dianggap `true` karena loop selesai tanpa error, padahal masih ada `(` yang tidak tertutup.

```
Input: "(()"
  → Loop selesai, tidak ada error di tengah jalan
  → Tapi stack masih berisi: ['(']
  → return true ❌ (SEHARUSNYA false!)
```

✅ **Perbaikan:** Ganti `return true` dengan `return stack.length === 0`.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 1 — Challenge Overview](./01-challenge-overview_gambaran-challenge.md)**
- **📖 [Lanjut ke Part 3 — V1 Stack Implementation →](./03-v1-stack-implementation_stack.md)**
