# 🔢 Radix — Sistem Bilangan

![Topik](https://img.shields.io/badge/Topik-Sistem%20Bilangan-blue?style=for-the-badge)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow?style=for-the-badge)
![Tipe](https://img.shields.io/badge/Tipe-Materi%20Umum-purple?style=for-the-badge)

> Sebelum bisa konversi bilangan biner, kamu perlu paham dulu apa itu radix dan mengapa ada lebih dari satu cara menulis sebuah angka.

---

## 📑 Daftar Isi

- 📖 [Apa itu Radix?](#apa-itu-radix)
- 🔢 [Basis yang Umum Dipakai](#basis-yang-umum-dipakai)
- 🔍 [Angka yang Sama, Tampilan Berbeda](#angka-yang-sama-tampilan-berbeda)
- 💻 [Radix di JavaScript](#radix-di-javascript)
- 🌍 [Kapan Radix Selain 10 Dipakai?](#kapan-radix-selain-10-dipakai)
- 📚 [Keywords](#keywords)
- ⚠️ [Pitfalls](#pitfalls)
- ❓ [FAQ](#faq)

---

<a name="apa-itu-radix"></a>
## 📖 Apa itu Radix?

**Radix** (atau **basis**) adalah jumlah digit unik yang digunakan dalam suatu sistem bilangan.

Kita sehari-hari pakai sistem **desimal** — artinya ada 10 digit unik: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`. Kalau sudah habis, kita "naik level" ke puluhan, ratusan, dst.

Tapi komputer tidak harus pakai basis 10. Basis bisa berapa saja — dan masing-masing punya kegunaan sendiri.

```
Radix 2  → hanya pakai digit: 0, 1
Radix 8  → hanya pakai digit: 0, 1, 2, 3, 4, 5, 6, 7
Radix 10 → hanya pakai digit: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
Radix 16 → pakai digit:       0-9 dan A, B, C, D, E, F
```

---

<a name="basis-yang-umum-dipakai"></a>
## 🔢 Basis yang Umum Dipakai

| Basis | Nama | Digit yang Dipakai | Contoh |
|-------|------|--------------------|--------|
| 2 | Biner (Binary) | `0, 1` | `1010` |
| 8 | Oktal (Octal) | `0–7` | `12` |
| 10 | Desimal (Decimal) | `0–9` | `10` |
| 16 | Heksadesimal (Hex) | `0–9, A–F` | `A` |

Semua contoh di atas sebenarnya merepresentasikan **angka yang sama**: `10` dalam desimal.

---

<a name="angka-yang-sama-tampilan-berbeda"></a>
## 🔍 Angka yang Sama, Tampilan Berbeda

Bayangkan angka **255** dalam desimal. Ini tampilannya di berbagai basis:

```
Desimal      →  255
Biner        →  11111111
Oktal        →  377
Heksadesimal →  FF
```

Semua itu merepresentasikan nilai yang **sama persis** — hanya cara penulisannya yang berbeda tergantung basis yang dipakai.

### Cara membaca bilangan biner secara manual

Setiap posisi dalam bilangan biner punya nilai **pangkat 2**:

```
Bilangan biner: 1 0 1 0
                │ │ │ └── posisi 0 → 2⁰ = 1  → 0 × 1 = 0
                │ │ └──── posisi 1 → 2¹ = 2  → 1 × 2 = 2
                │ └────── posisi 2 → 2² = 4  → 0 × 4 = 0
                └──────── posisi 3 → 2³ = 8  → 1 × 8 = 8

Total: 8 + 0 + 2 + 0 = 10 ✅
```

---

<a name="radix-di-javascript"></a>
## 💻 Radix di JavaScript

Di JavaScript, radix muncul di dua tempat:

### `number.toString(radix)` — number → string

Mengubah angka ke string dalam basis tertentu.

```js
(10).toString(2)   // "1010"  → desimal 10 dalam biner
(10).toString(8)   // "12"    → desimal 10 dalam oktal
(10).toString(10)  // "10"    → desimal 10 dalam desimal (default)
(10).toString(16)  // "a"     → desimal 10 dalam heksadesimal
```

### `parseInt(string, radix)` — string → number

Membaca string sebagai bilangan dalam basis tertentu, lalu mengubahnya ke desimal.

```js
parseInt("1010", 2)   // 10  → biner "1010" dibaca sebagai desimal
parseInt("12", 8)     // 10  → oktal "12" dibaca sebagai desimal
parseInt("10", 10)    // 10  → desimal "10" tetap desimal
parseInt("a", 16)     // 10  → hex "a" dibaca sebagai desimal
```

### Visualisasi arah konversi

```
                  toString(radix)
number (desimal) ─────────────────► string (basis lain)

                   parseInt(str, radix)
string (basis lain) ────────────────► number (desimal)
```

Keduanya **berlawanan arah** — ini yang sering membingungkan!

---

<a name="kapan-radix-selain-10-dipakai"></a>
## 🌍 Kapan Radix Selain 10 Dipakai?

| Radix | Dipakai di mana |
|-------|----------------|
| **2** (Biner) | Logika komputer, bit manipulation, permission file di Unix (`chmod 755`) |
| **8** (Oktal) | Permission file di sistem Unix/Linux |
| **16** (Hex) | Warna CSS (`#FF5733`), encoding karakter, alamat memori, hash |

Contoh nyata yang mungkin sudah kamu temui:

```js
// Warna CSS dalam heksadesimal
'#FF5733'  // R=255, G=87, B=51

// Konversi warna ke desimal
parseInt('FF', 16)  // 255
parseInt('57', 16)  // 87
parseInt('33', 16)  // 51
```

---

<a name="keywords"></a>
## 📚 Keywords

| Istilah | Penjelasan |
|--------|-----------|
| `Radix` | Basis sistem bilangan — jumlah digit unik yang digunakan |
| `Biner` | Sistem bilangan basis 2, hanya menggunakan digit `0` dan `1` |
| `Oktal` | Sistem bilangan basis 8, menggunakan digit `0–7` |
| `Desimal` | Sistem bilangan basis 10 yang kita pakai sehari-hari |
| `Heksadesimal` | Sistem bilangan basis 16, menggunakan `0–9` dan `A–F` |
| `toString(radix)` | Method number untuk mengubah ke string dalam basis tertentu |
| `parseInt(str, radix)` | Fungsi untuk membaca string sebagai bilangan dalam basis tertentu |
| `Bit` | Satu digit dalam sistem biner — nilainya `0` atau `1` |

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

### ❌ Tidak menyertakan radix di `parseInt`

```js
// ❌ Berbahaya — tanpa radix, JavaScript menebak basisnya sendiri
parseInt("010")   // bisa menghasilkan 8 (oktal) di beberapa environment
```

```js
// ✅ Aman — selalu sertakan radix secara eksplisit
parseInt("010", 10)  // 10 (desimal)
parseInt("010", 8)   // 8  (oktal)
```

---

### ❌ Bingung arah konversi `toString` vs `parseInt`

```js
// ❌ Salah paham — dikira toString(2) mengubah string ke biner
"4".toString(2)  // TypeError! string tidak punya toString dengan radix
```

```js
// ✅ Benar — toString(2) hanya untuk NUMBER
(4).toString(2)        // "100" ✅
"Rose".length.toString(2)  // "100" ✅ (length adalah number)
```

---

### ❌ Lupa bahwa hasil `toString` adalah STRING

```js
// ❌ Bisa mengejutkan — hasilnya bukan angka, tapi string
const biner = (10).toString(2)
console.log(biner + 1)  // "10101" bukan 11 !
```

```js
// ✅ Kalau perlu angkanya kembali, konversi dulu
const biner = (10).toString(2)     // "1010"
const kembali = parseInt(biner, 2) // 10
```

---

<a name="faq"></a>
## ❓ FAQ

<details>
<summary>🤔 Kenapa komputer pakai biner, bukan desimal?</summary>

Karena komputer bekerja dengan sinyal listrik yang hanya punya dua kondisi: **nyala (1)** dan **mati (0)**. Sistem biner cocok sempurna untuk ini — setiap digit biner merepresentasikan satu kondisi sinyal.

</details>

<details>
<summary>🤔 Apa bedanya radix dan basis?</summary>

Tidak ada bedanya — keduanya istilah yang sama. "Radix" lebih sering dipakai dalam konteks pemrograman (seperti parameter di `parseInt`), sedangkan "basis" lebih umum dipakai dalam konteks matematika.

</details>

<details>
<summary>🤔 Kenapa heksadesimal pakai huruf A–F?</summary>

Karena basis 16 butuh 16 simbol berbeda. Digit `0–9` hanya menyediakan 10 simbol, jadi huruf `A, B, C, D, E, F` dipakai untuk merepresentasikan nilai `10, 11, 12, 13, 14, 15`. Jadi `F` dalam hex = `15` dalam desimal.

</details>

<details>
<summary>🤔 Apakah toString(2) dan parseInt bisa dipakai untuk basis selain 2?</summary>

Ya! Keduanya mendukung semua basis dari 2 sampai 36. Basis 36 menggunakan semua digit `0–9` dan huruf `a–z` sebagai simbolnya.

```js
(255).toString(16)  // "ff"
(255).toString(8)   // "377"
parseInt("ff", 16)  // 255
parseInt("377", 8)  // 255
```

</details>
