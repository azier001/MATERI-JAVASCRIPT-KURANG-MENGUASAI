# 🔀 Konversi Bilangan Biner

![Topik](https://img.shields.io/badge/Topik-Konversi%20Biner-blue?style=for-the-badge)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow?style=for-the-badge)
![Tipe](https://img.shields.io/badge/Tipe-Materi%20Umum-purple?style=for-the-badge)

> Setelah paham apa itu radix, sekarang kita fokus ke konversi biner — mengubah angka ke biner dan sebaliknya di JavaScript.

---

## 📑 Daftar Isi

- 📖 [Dua Arah Konversi](#dua-arah-konversi)
- ➡️ [Desimal ke Biner — toString(2)](#desimal-ke-biner)
- ⬅️ [Biner ke Desimal — parseInt(str, 2)](#biner-ke-desimal)
- 🧩 [padStart — Padding Biner](#padstart)
- 🔬 [Contoh Penggunaan di Challenge](#contoh-penggunaan)
- 📚 [Keywords](#keywords)
- ⚠️ [Pitfalls](#pitfalls)
- ❓ [FAQ](#faq)

---

<a name="dua-arah-konversi"></a>
## 📖 Dua Arah Konversi

Konversi biner di JavaScript punya dua arah yang sering tertukar:

```
                toString(2)
number ──────────────────────► string biner
  10                              "1010"

                parseInt(str, 2)
string biner ────────────────► number
  "1010"                          10
```

Mudah diingat:
- **`toString(2)`** → dari number **ke** string biner
- **`parseInt(str, 2)`** → dari string biner **ke** number

---

<a name="desimal-ke-biner"></a>
## ➡️ Desimal ke Biner — `toString(2)`

`toString(2)` dipanggil pada sebuah **number**, dan menghasilkan **string** representasi binernya.

```js
(2).toString(2)   // "10"
(3).toString(2)   // "11"
(4).toString(2)   // "100"
(7).toString(2)   // "111"
(8).toString(2)   // "1000"
(10).toString(2)  // "1010"
(255).toString(2) // "11111111"
```

### Cara pakai dengan variabel

```js
const angka = 10
angka.toString(2)  // "1010" ✅

// Atau langsung dari panjang string
const nama = "Rose"
nama.length.toString(2)  // "100" (panjang 4 → "100")
```

### Tabel referensi desimal → biner

| Desimal | Biner | Panjang digit |
|---------|-------|---------------|
| 1 | `1` | 1 |
| 2 | `10` | 2 |
| 3 | `11` | 2 |
| 4 | `100` | 3 |
| 5 | `101` | 3 |
| 6 | `110` | 3 |
| 7 | `111` | 3 |
| 8 | `1000` | 4 |
| 10 | `1010` | 4 |
| 16 | `10000` | 5 |

---

<a name="biner-ke-desimal"></a>
## ⬅️ Biner ke Desimal — `parseInt(str, 2)`

`parseInt(string, radix)` membaca string sebagai bilangan dalam basis tertentu, lalu mengubahnya ke desimal.

```js
parseInt("10", 2)       // 2
parseInt("11", 2)       // 3
parseInt("100", 2)      // 4
parseInt("1010", 2)     // 10
parseInt("11111111", 2) // 255
```

### Cara verifikasi konversi

Kamu bisa verifikasi bolak-balik seperti ini:

```js
const angka = 42
const biner = angka.toString(2)       // "101010"
const kembali = parseInt(biner, 2)    // 42

console.log(angka === kembali)        // true ✅
```

---

<a name="padstart"></a>
## 🧩 `padStart` — Padding Biner

Kadang kamu butuh biner dengan **panjang digit yang seragam** — misalnya selalu 8 digit. Di sinilah `padStart` berguna.

### Sintaks

```js
string.padStart(targetLength, padString)
```

- `targetLength` — panjang minimal yang diinginkan
- `padString` — karakter pengisi di depan (biasanya `'0'` untuk biner)

### Contoh

```js
(3).toString(2)              // "11"     → hanya 2 digit
(3).toString(2).padStart(3, '0')  // "011"    → dipadding jadi 3 digit
(3).toString(2).padStart(8, '0')  // "00000011" → dipadding jadi 8 digit

(4).toString(2)              // "100"    → sudah 3 digit
(4).toString(2).padStart(3, '0')  // "100"    → tidak berubah (sudah cukup)
```

### Kapan padStart dipakai?

```js
// Tanpa padStart — panjang digit tidak seragam
["Rose", "Oak", "Lily"].map(p => p.length.toString(2))
// ["100", "11", "100"]  ← "Oak" hanya 2 digit

// Dengan padStart — panjang digit seragam
["Rose", "Oak", "Lily"].map(p => p.length.toString(2).padStart(3, '0'))
// ["100", "011", "100"]  ← semua 3 digit
```

> Di challenge Botanical Glasshouse, solusi Coddy menggunakan `padStart(3, '0')`, tapi solusi tanpa `padStart` juga diterima platform.

---

<a name="contoh-penggunaan"></a>
## 🔬 Contoh Penggunaan di Challenge

Berikut cara konversi biner dipakai di challenge **Botanical Glasshouse Rearrangement**:

```js
// Untuk setiap nama tanaman, tambahkan binary dari panjang namanya
result = result.map((row) => {
  return row.map((plant) => {
    const length = plant.length          // ambil panjang nama
    const stringBinary = length.toString(2)  // ubah ke biner
    return `${plant}${stringBinary}`     // gabungkan
  })
})
```

Hasilnya:
```
"Rose"  → panjang 4 → "100"  → "Rose100"
"Oak"   → panjang 3 → "11"   → "Oak11"
"Lily"  → panjang 4 → "100"  → "Lily100"
"Fern"  → panjang 4 → "100"  → "Fern100"
```

---

<a name="keywords"></a>
## 📚 Keywords

| Istilah | Penjelasan |
|--------|-----------|
| `toString(2)` | Method number untuk mengubah ke string biner |
| `parseInt(str, 2)` | Fungsi untuk mengubah string biner ke number desimal |
| `padStart(n, '0')` | Menambah `'0'` di depan string hingga panjangnya mencapai `n` |
| `Biner` | Sistem bilangan basis 2 — hanya digit `0` dan `1` |
| `Desimal` | Sistem bilangan basis 10 yang kita pakai sehari-hari |
| `Radix` | Basis bilangan — angka 2 di `toString(2)` adalah radix |

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

### 🪲 Pitfall #1 — Bingung arah konversi

Ini kesalahan yang paling sering terjadi — tertukar antara `toString` dan `parseInt`.

```js
// ❌ Salah — parseInt tidak mengubah number ke biner
parseInt(4)        // tetap 4, tidak ada yang berubah
parseInt("Rose".length)  // tetap 4
```

```js
// ✅ Benar — toString(2) yang mengubah number ke string biner
(4).toString(2)           // "100"
"Rose".length.toString(2) // "100"
```

---

### 🪲 Pitfall #2 — Memanggil toString(2) pada string

```js
// ❌ Error — string tidak bisa langsung pakai toString dengan radix
"4".toString(2)   // tidak menghasilkan biner dari angka 4!
```

```js
// ✅ Benar — pastikan yang dipanggil adalah number
const panjang = "Rose".length  // ini number
panjang.toString(2)            // "100" ✅
```

---

### 🪲 Pitfall #3 — Lupa bahwa hasil toString adalah string

```js
// ❌ Mengejutkan — "+" pada string adalah concatenation, bukan penjumlahan
(10).toString(2) + 1   // "10101" bukan 11
```

```js
// ✅ Kalau butuh operasi angka, konversi kembali dulu
const biner = (10).toString(2)   // "1010"
parseInt(biner, 2) + 1           // 11 ✅
```

---

### 🪲 Pitfall #4 — padStart tidak mengubah jika sudah cukup panjang

```js
// Tidak ada yang salah, tapi kadang membingungkan
(255).toString(2).padStart(3, '0')
// "11111111" — tidak berubah karena sudah 8 digit, lebih dari target 3
```

> `padStart` hanya menambah padding jika panjang string **kurang dari** target. Kalau sudah sama atau lebih panjang, tidak ada yang ditambahkan.

---

<a name="faq"></a>
## ❓ FAQ

<details>
<summary>🤔 Kenapa parameternya angka 2, bukan kata "binary"?</summary>

Karena `toString` dan `parseInt` dirancang untuk mendukung **semua basis**, bukan hanya biner. Angka `2` adalah radix — basis bilangan yang ingin dipakai. Kalau mau oktal, pakai `8`. Kalau mau heksadesimal, pakai `16`.

</details>

<details>
<summary>🤔 Apakah ada cara lain selain toString(2) untuk konversi ke biner?</summary>

Ada, tapi lebih panjang. Misalnya konversi manual dengan loop:

```js
const toBinary = (n) => {
  if (n === 0) return "0"
  let result = ""
  while (n > 0) {
    result = (n % 2) + result
    n = Math.floor(n / 2)
  }
  return result
}

toBinary(10)  // "1010"
```

Tapi `toString(2)` jauh lebih ringkas dan sudah built-in — tidak ada alasan pakai cara manual kecuali untuk belajar algoritma.

</details>

<details>
<summary>🤔 Apakah parseInt aman untuk semua string biner?</summary>

Ya, selama string hanya berisi `0` dan `1`. Kalau ada karakter lain, `parseInt` akan berhenti membaca di karakter yang tidak valid:

```js
parseInt("1010abc", 2)  // 10 — hanya membaca "1010", berhenti di "a"
parseInt("abc", 2)      // NaN — tidak ada digit valid sama sekali
```

</details>

<details>
<summary>🤔 Apa bedanya padStart dan padEnd?</summary>

`padStart` menambah karakter di **depan** string, `padEnd` di **belakang**:

```js
"11".padStart(4, '0')  // "0011" — padding di depan
"11".padEnd(4, '0')    // "1100" — padding di belakang
```

Untuk biner, selalu pakai `padStart` karena padding `0` di depan tidak mengubah nilai, sedangkan `0` di belakang mengubah nilai.

</details>
