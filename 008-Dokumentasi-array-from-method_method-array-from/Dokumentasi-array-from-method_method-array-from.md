# 🧰 `Array.from()` — JavaScript Method

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tipe](https://img.shields.io/badge/Tipe-Method_Reference-4A90D9?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Pemula_Friendly-2ECC71?style=for-the-badge)

> Method powerful untuk **membuat array** dari iterable, array-like object, atau pola tertentu.

---

## 📑 Daftar Isi

- 🧠 [Apa Itu Array.from()](#apa-itu)
- 🔧 [Cara 1 — Convert ke Array](#cara-1)
- 📏 [Cara 2 — Buat Array Kosong dengan Panjang Tertentu](#cara-2)
- 🗺️ [Cara 3 — Buat Array + Mapping](#cara-3)
- 🤔 [Kenapa Pakai `_` (Underscore)?](#underscore)
- ⏰ [Kapan Pakai Array.from()](#kapan-pakai)
- ⚡ [Quick Comparison](#quick-comparison)
- ⚠️ [Pitfalls](#pitfalls)

---

<a name="apa-itu"></a>
## 🧠 Apa Itu `Array.from()`?

`Array.from()` adalah **static method** yang mengubah sesuatu menjadi array — baik itu string, Set, NodeList, maupun object dengan property `length`.

**Syntax dasar:**
```javascript
Array.from(arrayLike)
Array.from(arrayLike, mappingFunction)
```

---

<a name="cara-1"></a>
## 🔧 Cara 1 — Convert ke Array

Mengubah **iterable** atau **array-like object** menjadi array sungguhan.

```javascript
// String → array of characters
Array.from("hello")
// ✅ ["h", "e", "l", "l", "o"]

// Set → array (duplikat otomatis hilang)
Array.from(new Set([1, 2, 2, 3]))
// ✅ [1, 2, 3]

// NodeList → array (bisa pakai .map(), .filter(), dll.)
const divs = document.querySelectorAll('div')
Array.from(divs)
// ✅ [div, div, div, ...]
```

> 💡 NodeList **bukan** array biasa — tidak bisa langsung pakai `.map()`. Setelah `Array.from()`, baru bisa!

---

<a name="cara-2"></a>
## 📏 Cara 2 — Buat Array Kosong dengan Panjang Tertentu

Membuat array dengan **jumlah slot tertentu**, semua berisi `undefined`.

```javascript
Array.from({ length: 5 })
// ✅ [undefined, undefined, undefined, undefined, undefined]
```

**Kenapa `{ length: 5 }` bisa dipakai?**

Karena `Array.from()` menerima **array-like object** — yaitu object yang punya property `length`. Object `{ length: 5 }` memenuhi syarat itu!

---

<a name="cara-3"></a>
## 🗺️ Cara 3 — Buat Array + Mapping *(Paling Powerful!)*

Selain membuat array, sekaligus **mengisi setiap slot** menggunakan mapping function.

```javascript
Array.from(arrayLike, (currentValue, index) => { ... })
```

| Parameter | Nilai |
|---|---|
| `currentValue` | Nilai di slot tersebut (biasanya `undefined` kalau dari `{ length }`) |
| `index` | Posisi slot: `0, 1, 2, 3, ...` |

**Contoh-contoh:**

```javascript
// Array angka 0–4
Array.from({ length: 5 }, (_, i) => i)
// ✅ [0, 1, 2, 3, 4]

// Array angka 1–5
Array.from({ length: 5 }, (_, i) => i + 1)
// ✅ [1, 2, 3, 4, 5]

// Array kelipatan 10
Array.from({ length: 5 }, (_, i) => i * 10)
// ✅ [0, 10, 20, 30, 40]

// Array string template
Array.from({ length: 3 }, (_, i) => `Item ${i + 1}`)
// ✅ ["Item 1", "Item 2", "Item 3"]

// Array nilai random
Array.from({ length: 5 }, () => Math.random())
// ✅ [0.234, 0.876, 0.123, 0.456, 0.789]
```

---

<a name="underscore"></a>
## 🤔 Kenapa Pakai `_` (Underscore)?

```javascript
Array.from({ length: 5 }, (value, index) => index)
//                          ^^^^^  ^^^^^
//                          ❌ Tidak    ✅ Dipakai
//                             dipakai
```

`_` adalah **konvensi** untuk menandai **parameter yang tidak dipakai**. Kita hanya butuh `index`, bukan `currentValue`, jadi parameter pertama diganti `_` sebagai placeholder.

```javascript
Array.from({ length: 5 }, (_, i) => i)
//                          ^  ^
//                          |  └─ Dipakai
//                          └─ Placeholder (tidak dipakai)
```

> 💡 Ini bukan syntax khusus JavaScript — murni **konvensi** yang disepakati developer supaya kode lebih mudah dibaca.

---

<a name="kapan-pakai"></a>
## ⏰ Kapan Pakai `Array.from()`?

| Situasi | Pakai `Array.from()`? |
|---|---|
| Mau convert string jadi array karakter | ✅ Ya |
| Mau hapus duplikat dari array | ✅ Ya (via `Set`) |
| Dapat NodeList dari DOM, mau pakai `.map()` | ✅ Ya |
| Mau buat array angka berurutan (misal 1–10) | ✅ Ya |
| Mau buat array dengan pola/rumus tertentu | ✅ Ya |
| Sudah punya array, mau transform isinya | ❌ Pakai `.map()` saja |

---

<a name="quick-comparison"></a>
## ⚡ Quick Comparison

Beberapa cara alternatif untuk buat array berurutan:

```javascript
// Cara 1: Array.from() — paling readable
Array.from({ length: 5 }, (_, i) => i)
// ✅ [0, 1, 2, 3, 4]

// Cara 2: Spread + Array.keys()
[...Array(5).keys()]
// ✅ [0, 1, 2, 3, 4]

// Cara 3: Array + fill + map
Array(5).fill(0).map((_, i) => i)
// ✅ [0, 1, 2, 3, 4]
```

> 💡 Ketiganya menghasilkan output yang sama. `Array.from()` paling mudah dibaca, terutama kalau mapping function-nya kompleks.

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

**1. `Array.from()` tidak mengubah array asli**
```javascript
const arr = [1, 2, 3]
Array.from(arr, x => x * 2) // ❌ arr tidak berubah
// ✅ Simpan hasilnya: const doubled = Array.from(arr, x => x * 2)
```

**2. `currentValue` selalu `undefined` kalau pakai `{ length }`**
```javascript
Array.from({ length: 3 }, (val, i) => val)
// ❌ [undefined, undefined, undefined]
// ✅ Pakai index-nya: Array.from({ length: 3 }, (_, i) => i)
```

**3. Lupa bahwa NodeList bukan array**
```javascript
const divs = document.querySelectorAll('div')
divs.map(d => d.id)         // ❌ TypeError: divs.map is not a function
Array.from(divs).map(d => d.id) // ✅
```
