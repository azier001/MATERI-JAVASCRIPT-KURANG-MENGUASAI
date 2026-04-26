# 🔬 Deep Dive — Pola Rekursif untuk Membangun Array

> 📝 **Catatan pribadi** — pendalaman pola-pola rekursi pada fungsi `generateArray`, terinspirasi dari alternatif implementasi `numberRange`

---

## 📑 Daftar Isi

- 🧭 [Konteks & Latar Belakang](#konteks)
- 🔍 [Masalah pada Kode Awal](#masalah-kode-awal)
- 🛡️ [Kenapa `n < 0` Lebih Aman dari `n === 0`](#base-case-aman)
- 💡 [Kenapa Return `[]` Bukan `[0]`](#return-array-kosong)
- 🏗️ [4 Versi Implementasi `generateArray`](#empat-versi)
  - 🅰️ [Versi Push](#versi-push)
  - 🅱️ [Versi Concat](#versi-concat)
  - 🅲️ [Versi Spread Operator](#versi-spread)
  - 🅳️ [Versi Unshift (Arah Maju)](#versi-unshift)
- ⚖️ [Perbandingan Keempat Versi](#perbandingan)
- 🧠 [Rangkuman & Pelajaran](#rangkuman)

---

<a name="konteks"></a>
## 🧭 Konteks & Latar Belakang

Dari dokumentasi `numberRange`, kita sudah melihat bahwa **satu masalah rekursi bisa diselesaikan dengan banyak cara** — yang membedakan adalah **arah gerak** dan **cara menggabungkan** hasilnya.

Sekarang kita coba terapkan pola-pola tersebut ke fungsi yang lebih sederhana: `generateArray(n)` — fungsi yang menghasilkan array dari `0` sampai `n`.

```
generateArray(5) → [0, 1, 2, 3, 4, 5]
generateArray(0) → [0]
generateArray(-1) → []
```

### 🤔 Pertanyaan Awal

Kode awal yang kita punya:

```javascript
const generateArray = (number) => {
  if (number === 0) {
    return [0];
  }

  return generateArray(number - 1).concat(number);
};

console.log(generateArray(5)); // Output: [0, 1, 2, 3, 4, 5]
```

Lalu muncul versi baru yang berbeda:

```javascript
function generateArray(n) {
  if (n < 0) return [];
  return [...generateArray(n - 1), n];
}

console.log(generateArray(0));  // [0]
console.log(generateArray(-1)); // []
```

Pertanyaannya: **apa sih bedanya?** Dan kenapa versi baru dianggap lebih baik?

---

<a name="masalah-kode-awal"></a>
## 🔍 Masalah pada Kode Awal

Kode awal kita pakai base case `number === 0`:

```javascript
const generateArray = (number) => {
  if (number === 0) {  // ← Harus TEPAT 0
    return [0];
  }
  return generateArray(number - 1).concat(number);
};
```

### ⚠️ Apa yang Terjadi Jika Input Negatif?

```
generateArray(-1)
  └─ generateArray(-2)      ← number bukan 0, lanjut!
       └─ generateArray(-3)  ← masih bukan 0, lanjut lagi!
            └─ generateArray(-4)
                 └─ ... SELAMANYA! 💥 Stack Overflow!
```

Karena kondisi berhentinya harus **tepat** `=== 0`, maka angka `-1` akan terus dikurangi menjadi `-2, -3, -4...` dan **tidak akan pernah** menyentuh `0`. Komputer akhirnya menyerah karena kehabisan memori (*Stack Overflow*).

> 🚨 **Kesimpulan:** Base case `=== 0` hanya aman jika kita **yakin 100%** inputnya selalu positif atau nol. Tapi di dunia nyata, kita tidak selalu bisa menjamin itu.

---

<a name="base-case-aman"></a>
## 🛡️ Kenapa `n < 0` Lebih Aman dari `n === 0`

Versi baru menggunakan `n < 0` sebagai base case:

```javascript
function generateArray(n) {
  if (n < 0) return [];  // ← Menangkap SEMUA angka negatif
  return [...generateArray(n - 1), n];
}
```

### ✅ Keunggulannya

| Skenario | `n === 0` | `n < 0` |
|---|---|---|
| `generateArray(5)` | ✅ `[0, 1, 2, 3, 4, 5]` | ✅ `[0, 1, 2, 3, 4, 5]` |
| `generateArray(0)` | ✅ `[0]` | ✅ `[0]` |
| `generateArray(-1)` | 💥 **Stack Overflow!** | ✅ `[]` (aman) |
| `generateArray(-100)` | 💥 **Stack Overflow!** | ✅ `[]` (aman) |

> 🧠 **Prinsipnya:** Base case dengan **perbandingan range** (`<`, `>`, `<=`, `>=`) lebih aman daripada **perbandingan tepat** (`===`) karena ia menangkap lebih banyak kemungkinan input.

---

<a name="return-array-kosong"></a>
## 💡 Kenapa Return `[]` Bukan `[0]`

Ini pertanyaan penting: di base case, kenapa kita return **array kosong `[]`** bukannya `[0]`?

### 🎬 Coba Kita Trace `generateArray(0)`

```
generateArray(0)
  └─ generateArray(-1) ← n < 0, return []
```

Saat kembali ke `generateArray(0)`:

```javascript
return [...generateArray(-1), 0]
//     [...[],              0]
//     [0]                        ← Hasilnya tetap benar! ✅
```

### 🔑 Rahasia Spread Operator dengan Array Kosong

```javascript
[...[], 0]     → [0]         // Array kosong "menghilang", tinggal 0
[...[1], 2]    → [1, 2]      // Array isinya di-spread, lalu tambah 2
[...[1,2], 3]  → [1, 2, 3]   // Sama saja!
```

> 💬 Array kosong `[]` berfungsi seperti **"titik nol"** — saat di-spread, ia tidak menyumbang elemen apapun. Ini membuat logika rekursi jadi sangat bersih: setiap level hanya bertanggung jawab **menambahkan satu angka**.

### 🆚 Bandingkan dengan `return [0]`

Jika kita pakai `return [0]`, maka `0` sudah "diklaim" oleh base case. Ini berarti:
- Base case harus **tahu** angka terkecil yang diinginkan (yaitu `0`)
- Kalau suatu saat kita mau mulai dari angka lain, base case-nya harus diubah

Dengan `return []`, base case **tidak peduli** tentang isi array — ia hanya bilang: *"sudah tidak ada angka lagi, ini array kosong untuk kamu isi"*.

---

<a name="empat-versi"></a>
## 🏗️ 4 Versi Implementasi `generateArray`

Terinspirasi dari pola-pola `numberRange`, berikut keempat cara untuk menulis `generateArray(n)`:

---

<a name="versi-push"></a>
### 🅰️ Versi Push

*Membangun array dengan cara "menitipkan" angka di belakang saat fase unwinding.*

```javascript
function generateArrayPush(n) {
  if (n < 0) return [];

  const arr = generateArrayPush(n - 1); // Rekursi dulu
  arr.push(n); // Baru push saat fase unwinding
  return arr;
}

console.log(generateArrayPush(5)); // [0, 1, 2, 3, 4, 5]
```

#### 🎬 Simulasi: `generateArrayPush(3)`

##### 📉 Fase Penurunan (Diving)

```
generateArrayPush(3)
  └─ generateArrayPush(2)
       └─ generateArrayPush(1)
            └─ generateArrayPush(0)
                 └─ generateArrayPush(-1) ← 🛑 return []
```

##### 📈 Fase Pembalikan (Unwinding)

```
generateArrayPush(-1) → return []
generateArrayPush(0)  → arr = [], push(0) → return [0]
generateArrayPush(1)  → arr = [0], push(1) → return [0, 1]
generateArrayPush(2)  → arr = [0, 1], push(2) → return [0, 1, 2]
generateArrayPush(3)  → arr = [0, 1, 2], push(3) → return [0, 1, 2, 3] ✅
```

> 📌 **Ciri khas:** Butuh variabel perantara (`arr`) karena `.push()` me-return panjang array, bukan array-nya sendiri.

---

<a name="versi-concat"></a>
### 🅱️ Versi Concat

*Gaya fungsional — menggabungkan array tanpa variabel perantara, langsung di return.*

```javascript
function generateArrayConcat(n) {
  if (n < 0) return [];

  return generateArrayConcat(n - 1).concat(n);
}

console.log(generateArrayConcat(5)); // [0, 1, 2, 3, 4, 5]
```

#### 🎬 Simulasi: `generateArrayConcat(3)`

##### 📉 Fase Penurunan

```
generateArrayConcat(3)
  └─ generateArrayConcat(2)
       └─ generateArrayConcat(1)
            └─ generateArrayConcat(0)
                 └─ generateArrayConcat(-1) ← 🛑 return []
```

##### 📈 Fase Pembalikan

```
generateArrayConcat(-1) → return []
generateArrayConcat(0)  → [].concat(0) → return [0]
generateArrayConcat(1)  → [0].concat(1) → return [0, 1]
generateArrayConcat(2)  → [0, 1].concat(2) → return [0, 1, 2]
generateArrayConcat(3)  → [0, 1, 2].concat(3) → return [0, 1, 2, 3] ✅
```

> 📌 **Ciri khas:** Tidak butuh variabel perantara karena `.concat()` me-return array baru. Bisa langsung di-chain di baris `return`.

---

<a name="versi-spread"></a>
### 🅲️ Versi Spread Operator

*Gaya ES6 modern — paling "visual" karena kita bisa melihat bentuk akhir array-nya.*

```javascript
function generateArraySpread(n) {
  if (n < 0) return [];

  return [...generateArraySpread(n - 1), n];
}

console.log(generateArraySpread(5)); // [0, 1, 2, 3, 4, 5]
```

#### 🎬 Simulasi: `generateArraySpread(3)`

##### 📉 Fase Penurunan

```
generateArraySpread(3)
  └─ generateArraySpread(2)
       └─ generateArraySpread(1)
            └─ generateArraySpread(0)
                 └─ generateArraySpread(-1) ← 🛑 return []
```

##### 📈 Fase Pembalikan

```
generateArraySpread(-1) → return []
generateArraySpread(0)  → [...[], 0] → return [0]
generateArraySpread(1)  → [...[0], 1] → return [0, 1]
generateArraySpread(2)  → [...[0, 1], 2] → return [0, 1, 2]
generateArraySpread(3)  → [...[0, 1, 2], 3] → return [0, 1, 2, 3] ✅
```

> 📌 **Ciri khas:** Sintaks `[...hasilRekursi, elemenBaru]` sangat visual — langsung terlihat bahwa kita "membuka" isi array lama lalu menambahkan satu elemen baru di belakang.

---

<a name="versi-unshift"></a>
### 🅳️ Versi Unshift (Arah Maju)

*Tantangan unik — arah rekursinya terbalik, dari kecil ke besar, lalu sisipkan di depan saat kembali.*

```javascript
function generateArrayUnshift(n, current = 0) {
  // Butuh parameter tambahan 'current' untuk tahu posisi saat ini
  if (current > n) return [];

  const arr = generateArrayUnshift(n, current + 1); // Gerak maju
  arr.unshift(current); // Sisipkan di depan
  return arr;
}

console.log(generateArrayUnshift(5)); // [0, 1, 2, 3, 4, 5]
```

#### 🤔 Kenapa Butuh Parameter Tambahan?

Di `numberRange`, kita punya 2 parameter (`startNum`, `endNum`) sehingga bisa menaikkan `startNum`. Tapi `generateArray` hanya punya 1 parameter (`n`).

Untuk bergerak **maju** (dari 0 ke n), kita butuh "penunjuk posisi" — yaitu `current`. Nilai default-nya `0` sehingga pemanggilan dari luar tetap bersih: `generateArrayUnshift(5)`.

#### 🎬 Simulasi: `generateArrayUnshift(3)`

##### 📉 Fase Penurunan (Maju ke atas)

```
generateArrayUnshift(3, 0)
  └─ generateArrayUnshift(3, 1)
       └─ generateArrayUnshift(3, 2)
            └─ generateArrayUnshift(3, 3)
                 └─ generateArrayUnshift(3, 4) ← 🛑 current > n, return []
```

##### 📈 Fase Pembalikan

```
generateArrayUnshift(3, 4) → return []
generateArrayUnshift(3, 3) → arr = [], unshift(3) → return [3]
generateArrayUnshift(3, 2) → arr = [3], unshift(2) → return [2, 3]
generateArrayUnshift(3, 1) → arr = [2, 3], unshift(1) → return [1, 2, 3]
generateArrayUnshift(3, 0) → arr = [1, 2, 3], unshift(0) → return [0, 1, 2, 3] ✅
```

> 📌 **Ciri khas:** Arah geraknya **maju** (0 → n), tapi array dibangun **dari belakang ke depan** karena `.unshift()` menyisipkan elemen di awal array.

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan Keempat Versi

| | Arah Rekursi | Method | Mutate array? | Butuh variabel perantara? | Butuh parameter tambahan? |
|---|---|---|---|---|---|
| **Push** | Mundur (`n - 1`) | `.push()` | ✅ Ya | ✅ Ya (`arr`) | ❌ Tidak |
| **Concat** | Mundur (`n - 1`) | `.concat()` | ❌ Tidak | ❌ Tidak | ❌ Tidak |
| **Spread** | Mundur (`n - 1`) | `...` | ❌ Tidak | ❌ Tidak | ❌ Tidak |
| **Unshift** | Maju (`current + 1`) | `.unshift()` | ✅ Ya | ✅ Ya (`arr`) | ✅ Ya (`current`) |

### 🏆 Mana yang "Terbaik"?

| Kriteria | Pemenang |
|---|---|
| **Paling ringkas** | 🅲️ Spread — satu baris, sangat ekspresif |
| **Paling aman** | Semua sama (karena pakai `n < 0`) |
| **Paling efisien (memori)** | 🅰️ Push — tidak membuat array baru tiap langkah |
| **Paling *functional*** | 🅱️ Concat — immutable, tidak ada mutasi |
| **Paling unik untuk dipelajari** | 🅳️ Unshift — melatih berpikir dari arah berbeda |

---

<a name="rangkuman"></a>
## 🧠 Rangkuman & Pelajaran

### 1. Base Case yang Aman

```
❌ if (n === 0) return [0]   → Crash jika input negatif
✅ if (n < 0) return []      → Aman untuk semua input
```

**Pelajaran:** Selalu gunakan **perbandingan range** untuk base case, bukan perbandingan tepat, kecuali kamu yakin inputnya selalu valid.

### 2. Array Kosong sebagai "Titik Nol"

Return `[]` di base case membuat logika lebih bersih:
- Setiap level rekursi hanya bertanggung jawab **menambah 1 angka**
- Tidak ada level yang "istimewa" — termasuk level terbawah

### 3. Empat Cara, Satu Hasil

| Versi | Pelajaran Utama |
|---|---|
| Push | Mutasi array + variabel perantara |
| Concat | Immutability + kode ringkas |
| Spread | Sintaks ES6 modern yang visual |
| Unshift | Arah rekursi bisa dibalik, tapi butuh kreativitas |

### 4. Pola Universal

> 🧠 **Pola umumnya sama dengan `numberRange`:** Satu masalah rekursi bisa diselesaikan dengan banyak cara. Yang membedakan bukan hasilnya, tapi **arah gerak** dan **cara menggabungkan** hasil rekursinya.

> 💬 Kalau kamu sudah paham keempat pola ini, kamu bisa menerapkannya ke **fungsi rekursif apapun** yang membangun array — bukan cuma `generateArray` atau `numberRange`.
