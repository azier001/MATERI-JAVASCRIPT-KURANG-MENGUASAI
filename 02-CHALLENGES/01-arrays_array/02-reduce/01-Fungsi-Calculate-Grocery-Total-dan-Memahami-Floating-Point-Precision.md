# 🛒 Dokumentasi Lengkap: Fungsi Calculate Grocery Total

> **Catatan Pribadi**: Dokumentasi ini dibuat untuk memahami cara kerja fungsi perhitungan total belanjaan dengan sistem diskon bertingkat dan memahami masalah floating-point precision di JavaScript.

---

## 📑 Daftar Isi

- [Pengenalan](#pengenalan)
- [Kode Versi 1 (Kode Saya)](#kode-versi-1)
  - [Penjelasan Kode Versi 1](#penjelasan-versi-1)
  - [Cara Kerja](#cara-kerja-v1)
- [Kode Versi 2 (Kode dari Web)](#kode-versi-2)
  - [Penjelasan Kode Versi 2](#penjelasan-versi-2)
  - [Cara Kerja](#cara-kerja-v2)
- [Perbandingan Kedua Kode](#perbandingan)
- [Masalah Floating-Point Precision](#floating-point)
  - [Apa itu Floating-Point?](#apa-itu-floating-point)
  - [Contoh Masalah](#contoh-masalah)
  - [Mengapa Terjadi?](#mengapa-terjadi)
- [Hasil Test Case](#hasil-test-case)
- [Kesimpulan dan Pelajaran](#kesimpulan)
- [Tips untuk Pemula](#tips)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Fungsi `calculateGroceryTotal` adalah fungsi untuk menghitung:
- ✅ Total harga asli dari semua item belanjaan
- ✅ Diskon yang didapat (berdasarkan total belanja)
- ✅ Total akhir setelah diskon

### 🎁 Sistem Diskon:
| Total Belanja | Diskon |
|--------------|--------|
| > Rp 100 | **10%** |
| > Rp 50 (≤ Rp 100) | **5%** |
| ≤ Rp 50 | **0%** (Tidak ada diskon) |

---

<a name="kode-versi-1"></a>
## 📝 Kode Versi 1 (Kode Saya - Metode Perkalian)

```javascript
function calculateGroceryTotal(items) {
  let discount = 0;
  let finalTotal = 0;

  const originalTotal = items.reduce((acc, curr) => acc + curr.price, 0);

  if (originalTotal > 100) {
    discount = 0.1 * originalTotal;
    finalTotal = originalTotal * 0.9;  // 👈 PERKALIAN
  } else if (originalTotal > 50) {
    discount = 0.05 * originalTotal;
    finalTotal = originalTotal * 0.95; // 👈 PERKALIAN
  } else {
    discount = 0;
    finalTotal = originalTotal;
  }

  return {
    originalTotal,
    discount,
    finalTotal,
  };
}
```

<a name="penjelasan-versi-1"></a>
### 💡 Penjelasan Kode Versi 1

#### 1️⃣ **Deklarasi Variabel**
```javascript
let discount = 0;
let finalTotal = 0;
```
- Membuat variabel `discount` dan `finalTotal` dengan nilai awal 0
- Menggunakan `let` karena nilai akan berubah

#### 2️⃣ **Menghitung Total Asli**
```javascript
const originalTotal = items.reduce((acc, curr) => acc + curr.price, 0);
```
- `reduce()` = metode untuk menjumlahkan semua harga
- `acc` = accumulator (penampung jumlah)
- `curr` = item yang sedang diproses
- `0` = nilai awal accumulator

**Contoh:**
```javascript
items = [
  { name: "Apel", price: 10 },
  { name: "Jeruk", price: 15 }
]
// originalTotal = 0 + 10 + 15 = 25
```

#### 3️⃣ **Logika Diskon (Metode Perkalian)**
```javascript
if (originalTotal > 100) {
    discount = 0.1 * originalTotal;      // Hitung diskon 10%
    finalTotal = originalTotal * 0.9;    // Langsung kalikan 90%
}
```

**Penjelasan:**
- Jika total > 100 → diskon 10%
- `originalTotal * 0.9` = ambil 90% dari total (sama dengan kurangi 10%)
- **Kelebihan**: Lebih singkat
- **Kekurangan**: Bisa ada presisi floating-point berbeda

<a name="cara-kerja-v1"></a>
### 🔍 Cara Kerja Versi 1

**Contoh Kasus:**
```javascript
items = [{ name: "Truffle Oil", price: 245.5 }]
```

**Langkah-langkah:**
1. `originalTotal = 245.5`
2. Cek kondisi: `245.5 > 100` ✅ (True)
3. `discount = 0.1 * 245.5 = 24.55`
4. `finalTotal = 245.5 * 0.9 = 220.95000000000002` ⚠️ (floating-point error)

---

<a name="kode-versi-2"></a>
## 📝 Kode Versi 2 (Kode dari Web - Metode Pengurangan)

```javascript
function calculateGroceryTotal(items) {
    const originalTotal = items.reduce((sum, item) => sum + item.price, 0);
    
    let discountPercentage = 0;
    
    if (originalTotal > 100) {
        discountPercentage = 0.10; // 10% discount
    } else if (originalTotal > 50) {
        discountPercentage = 0.05; // 5% discount
    }
    
    const discount = originalTotal * discountPercentage;
    const finalTotal = originalTotal - discount; // 👈 PENGURANGAN
    
    return {
        originalTotal,
        discount,
        finalTotal
    };
}
```

<a name="penjelasan-versi-2"></a>
### 💡 Penjelasan Kode Versi 2

#### 1️⃣ **Menghitung Total Asli**
```javascript
const originalTotal = items.reduce((sum, item) => sum + item.price, 0);
```
- Sama seperti versi 1, tapi nama variabel berbeda (`sum` bukan `acc`)

#### 2️⃣ **Tentukan Persentase Diskon**
```javascript
let discountPercentage = 0;

if (originalTotal > 100) {
    discountPercentage = 0.10;
} else if (originalTotal > 50) {
    discountPercentage = 0.05;
}
```
- Simpan **persentase diskon** dulu di variabel
- Belum menghitung nilai diskon dalam rupiah

#### 3️⃣ **Hitung Diskon dan Total Akhir (Metode Pengurangan)**
```javascript
const discount = originalTotal * discountPercentage;
const finalTotal = originalTotal - discount; // 👈 KURANGI
```

**Penjelasan:**
- Hitung nilai diskon dalam rupiah
- `originalTotal - discount` = kurangi total dengan diskon
- **Kelebihan**: Lebih presisi, lebih jelas step-by-step
- **Kekurangan**: Sedikit lebih panjang

<a name="cara-kerja-v2"></a>
### 🔍 Cara Kerja Versi 2

**Contoh Kasus:**
```javascript
items = [{ name: "Truffle Oil", price: 245.5 }]
```

**Langkah-langkah:**
1. `originalTotal = 245.5`
2. Cek kondisi: `245.5 > 100` ✅ (True)
3. `discountPercentage = 0.10`
4. `discount = 245.5 * 0.10 = 24.55`
5. `finalTotal = 245.5 - 24.55 = 220.95` ✅ (lebih presisi!)

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan Kedua Kode

| Aspek | Versi 1 (Perkalian) | Versi 2 (Pengurangan) |
|-------|---------------------|----------------------|
| **Metode** | `originalTotal * 0.9` | `originalTotal - discount` |
| **Presisi** | ⚠️ Kurang presisi | ✅ Lebih presisi |
| **Panjang Kode** | ✅ Lebih singkat | ⚠️ Sedikit lebih panjang |
| **Kejelasan** | ⚠️ Kurang jelas | ✅ Lebih jelas step-by-step |
| **Hasil** | `220.95000000000002` | `220.95` |

### 🎯 Contoh Konkret

**Input:** `originalTotal = 245.5`

#### Versi 1:
```javascript
finalTotal = 245.5 * 0.9
// Hasil: 220.95000000000002 ❌
```

#### Versi 2:
```javascript
discount = 245.5 * 0.10 = 24.55
finalTotal = 245.5 - 24.55
// Hasil: 220.95 ✅
```

---

<a name="floating-point"></a>
## 🔢 Masalah Floating-Point Precision

<a name="apa-itu-floating-point"></a>
### 📖 Apa itu Floating-Point?

**Floating-point** adalah cara komputer menyimpan angka desimal (angka dengan koma).

Komputer menyimpan angka dalam format **binary (0 dan 1)**, bukan desimal seperti manusia. Ini kadang menyebabkan **ketidakpresisian kecil**.

<a name="contoh-masalah"></a>
### ⚠️ Contoh Masalah

```javascript
console.log(0.1 + 0.2);
// Output: 0.30000000000000004 (Bukan 0.3!)
```

```javascript
console.log(245.5 * 0.9);
// Output: 220.95000000000002 (Bukan 220.95!)
```

<a name="mengapa-terjadi"></a>
### 🤔 Mengapa Terjadi?

Karena komputer menyimpan angka dalam **binary (basis 2)**, bukan **decimal (basis 10)**.

**Analogi sederhana:**
- Seperti mencoba menulis 1/3 dalam desimal = 0.333333... (tidak pernah tepat)
- Komputer mengalami hal serupa saat menyimpan angka desimal tertentu

### 🎯 Perbedaan Operasi Matematika

Meskipun **secara matematika**:
```
x * 0.9 = x - (x * 0.1)
```

Dalam **floating-point arithmetic**, operasi berbeda bisa menghasilkan presisi berbeda:

| Operasi | Presisi |
|---------|---------|
| `245.5 * 0.9` | ⚠️ `220.95000000000002` |
| `245.5 - 24.55` | ✅ `220.95` |

**Pengurangan** lebih presisi dibanding **perkalian** untuk kasus ini!

---

<a name="hasil-test-case"></a>
## 🧪 Hasil Test Case

### Test Case 1: Truffle Oil (245.5)

**Versi 1 (Perkalian):**
```javascript
{
  originalTotal: 245.5,
  discount: 24.55,
  finalTotal: 220.95000000000002 ❌
}
```

**Versi 2 (Pengurangan):**
```javascript
{
  originalTotal: 245.5,
  discount: 24.55,
  finalTotal: 220.95 ✅
}
```

**Expected Output:**
```javascript
{
  originalTotal: 245.5,
  discount: 24.55,
  finalTotal: 220.95 ✅
}
```

---

### Test Case 2: Artisanal Cheese Mix (63.47)

**Versi 1 (Perkalian):**
```javascript
{
  originalTotal: 63.470000000000006,
  discount: 3.1735000000000007,
  finalTotal: 60.2965 ❌
}
```

**Versi 2 (Pengurangan):**
```javascript
{
  originalTotal: 63.470000000000006,
  discount: 3.1735000000000007,
  finalTotal: 60.29650000000001 ✅
}
```

**Expected Output:**
```javascript
{
  originalTotal: 63.470000000000006,
  discount: 3.1735000000000007,
  finalTotal: 60.29650000000001 ✅
}
```

---

<a name="kesimpulan"></a>
## 🎓 Kesimpulan dan Pelajaran

### ✅ Yang Benar

1. **Kedua kode LOGIKANYA BENAR** ✅
   - Sistem diskon bekerja dengan baik
   - Output hampir identik (perbedaan sangat kecil)

2. **Versi 2 (Pengurangan) LEBIH BAIK** karena:
   - ✅ Lebih presisi dalam floating-point
   - ✅ Lebih jelas step-by-step
   - ✅ Lebih mudah di-debug
   - ✅ Sesuai dengan expected output

### 📚 Pelajaran Penting

#### 1️⃣ **Floating-Point Bukan Bug**
Perbedaan kecil seperti `220.95000000000002` vs `220.95` adalah **normal** dan bukan error programmer.

#### 2️⃣ **Operasi Berbeda, Presisi Berbeda**
- Perkalian: `x * 0.9` → kurang presisi
- Pengurangan: `x - (x * 0.1)` → lebih presisi

#### 3️⃣ **Pilih Metode yang Sesuai**
Untuk aplikasi keuangan atau yang butuh presisi:
- ✅ Gunakan **pengurangan** (`originalTotal - discount`)
- ⚠️ Hindari **perkalian langsung** (`originalTotal * 0.9`)

#### 4️⃣ **Jika Perlu Presisi Sempurna**
Gunakan rounding atau library khusus:
```javascript
finalTotal = Math.round((originalTotal - discount) * 100) / 100;
```

---

<a name="tips"></a>
## 💡 Tips untuk Pemula

### 🎯 Best Practices

1. **Untuk Perhitungan Uang:**
   ```javascript
   // ✅ BAIK
   const finalTotal = originalTotal - discount;
   
   // ⚠️ KURANG BAIK
   const finalTotal = originalTotal * 0.9;
   ```

2. **Gunakan Variabel yang Jelas:**
   ```javascript
   // ✅ BAIK
   let discountPercentage = 0.10;
   const discount = originalTotal * discountPercentage;
   
   // ⚠️ KURANG JELAS
   const discount = originalTotal * 0.1;
   ```

3. **Pisahkan Logika Step-by-step:**
   ```javascript
   // ✅ BAIK - Lebih mudah di-debug
   const discount = originalTotal * discountPercentage;
   const finalTotal = originalTotal - discount;
   
   // ⚠️ KURANG BAIK - Sulit di-debug
   const finalTotal = originalTotal * (1 - discountPercentage);
   ```

### 🔧 Jika Masih Ada Error Presisi

```javascript
// Bulatkan ke 2 desimal
function roundToTwo(num) {
  return Math.round(num * 100) / 100;
}

return {
  originalTotal: roundToTwo(originalTotal),
  discount: roundToTwo(discount),
  finalTotal: roundToTwo(finalTotal)
};
```

### 📝 Catatan Akhir

> **Ingat:** Kode yang "salah" karena floating-point precision sebenarnya **TIDAK SALAH**. Ini adalah karakteristik alami dari cara komputer bekerja. Yang penting adalah memahami **kapan** dan **bagaimana** menanganinya! 💪

---

## 🎉 Selamat!

Kamu sudah memahami:
- ✅ Cara kerja fungsi calculate grocery total
- ✅ Perbedaan metode perkalian vs pengurangan
- ✅ Masalah floating-point precision
- ✅ Best practices untuk perhitungan keuangan

**Keep learning and happy coding!** 🚀

---

*Dokumentasi ini dibuat untuk pembelajaran pribadi | Last updated: 2025*
