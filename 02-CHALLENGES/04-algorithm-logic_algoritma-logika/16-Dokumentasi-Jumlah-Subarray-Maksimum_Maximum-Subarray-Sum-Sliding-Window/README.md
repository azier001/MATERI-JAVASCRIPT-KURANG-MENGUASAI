# 📦 Maximum Subarray Sum — Sliding Window (O(n))

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Level](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)
![Technique](https://img.shields.io/badge/Technique-Sliding%20Window-blue?style=for-the-badge)
![Complexity](https://img.shields.io/badge/Complexity-O(n)-brightgreen?style=for-the-badge)

> Dokumentasi pribadi — lanjutan dari Maximum Subarray Sum O(n²)
> Teknik yang lebih efisien: geser jendela, jangan hitung ulang dari nol!

---

## 📋 Daftar Isi

- 🪟 [Apa itu Sliding Window?](#apa-itu-sliding-window)
- ⚠️ [Masalah dengan O(n²)](#masalah-dengan-on2)
- 💡 [Ide Utama](#ide-utama)
- ✅ [Kode Lengkap](#kode-lengkap)
- 🔄 [Perbandingan Dua Kode](#perbandingan-dua-kode)
- 🎯 [Kapan Pakai Sliding Window?](#kapan-pakai-sliding-window)
- 🪤 [Jebakan Umum](#jebakan-umum)

---

<a name="apa-itu-sliding-window"></a>
## 🪟 Apa itu Sliding Window?

Sliding Window adalah teknik untuk memproses **subarray berurutan** tanpa harus menghitung ulang dari nol setiap kali.

Bayangkan seperti jendela yang bergeser ke kanan:
- Elemen di sisi kiri **keluar** dari jendela
- Elemen di sisi kanan **masuk** ke jendela
- Elemen di tengah? **Tidak perlu dihitung ulang!**

```
arr = [2, 5, 3, 1, 11, 7, 6, 4]   k = 3

🪟 [2, 5, 3] 1  11  7  6  4     → sum = 10
    2 🪟[5, 3, 1] 11  7  6  4   → sum = 9
    2  5 🪟[3, 1,11]  7  6  4   → sum = 15
   ...dan seterusnya
```

---

<a name="masalah-dengan-on2"></a>
## ⚠️ Masalah dengan O(n²)

Di solusi sebelumnya (nested loop), kita menghitung ulang hampir semua elemen di setiap langkah:

```
[2, 5, 3] → 2 + 5 + 3 = 10
[5, 3, 1] → 5 + 3 + 1 = 9   ← 5 dan 3 dihitung LAGI!
[3, 1,11] → 3 + 1 + 11 = 15 ← 3 dihitung LAGI!
```

Padahal `5` dan `3` sudah kita hitung sebelumnya. **Kenapa harus diulang?**

Inilah yang membuat O(n²) boros — makin panjang array, makin banyak pekerjaan yang sia-sia.

---

<a name="ide-utama"></a>
## 💡 Ide Utama

Daripada menjumlahkan ulang dari nol, cukup:

> **Kurangi elemen yang keluar, tambahkan elemen yang masuk**

```
arr = [2, 5, 3, 1, 11, 7, 6, 4]   k = 3
       ↑              ↑
    keluar          masuk

Step 1 (window awal):  2 + 5 + 3   = 10
Step 2:               10 - 2 + 1   = 9    ✓ tidak perlu hitung 5+3 lagi!
Step 3:                9 - 5 + 11  = 15
Step 4:               15 - 3 + 7   = 19
Step 5:               19 - 1 + 6   = 24   ← TERBESAR ✅
Step 6:               24 - 11 + 4  = 17
```

Setiap langkah hanya butuh **1 pengurangan + 1 penjumlahan** — jauh lebih hemat!

---

<a name="kode-lengkap"></a>
## ✅ Kode Lengkap

Kode ini dibangun pelan-pelan dari pemahaman sendiri:

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = -Infinity; // aman untuk array negatif
  let currentSum = 0;

  // Tahap 1: hitung sum window pertama
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }

  // Tahap 2: simpan sebagai maxSum awal
  maxSum = currentSum;

  // Tahap 3: geser window dan update maxSum
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
}
```

**Visualisasi alur kode:**

```
┌─────────────────────────────────────────────────┐
│  Tahap 1: Hitung window pertama                 │
│  loop i = 0 sampai k                            │
│  currentSum = 2 + 5 + 3 = 10                    │
├─────────────────────────────────────────────────┤
│  Tahap 2: Simpan ke maxSum                      │
│  maxSum = currentSum = 10                        │
├─────────────────────────────────────────────────┤
│  Tahap 3: Geser window                          │
│  loop i = k sampai arr.length                   │
│                                                 │
│  i=3: currentSum = 10 - arr[0] + arr[3]         │
│             = 10 - 2 + 1 = 9                    │
│       maxSum = 10 (tidak berubah)               │
│                                                 │
│  i=4: currentSum = 9 - arr[1] + arr[4]          │
│             = 9 - 5 + 11 = 15                   │
│       maxSum = 15 ✅                            │
│                                                 │
│  i=5: currentSum = 15 - arr[2] + arr[5]         │
│             = 15 - 3 + 7 = 19                   │
│       maxSum = 19 ✅                            │
│                                                 │
│  i=6: currentSum = 19 - arr[3] + arr[6]         │
│             = 19 - 1 + 6 = 24                   │
│       maxSum = 24 ✅                            │
│                                                 │
│  i=7: currentSum = 24 - arr[4] + arr[7]         │
│             = 24 - 11 + 4 = 17                  │
│       maxSum = 24 (tidak berubah)               │
└─────────────────────────────────────────────────┘
Hasil: 24 ✅
```

### 🧪 Test Cases

```javascript
maxSubarraySum([2, 5, 3, 1, 11, 7, 6, 4], 3); // → 24
maxSubarraySum([-2, -5, -3, -1], 2);           // → -4
```

---

<a name="perbandingan-dua-kode"></a>
## 🔄 Perbandingan Dua Kode

Saat belajar, ada dua versi kode yang dibandingkan. Keduanya menggunakan Sliding Window, tapi ada perbedaan penting:

### Versi Referensi

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0;        // ⚠️ berbahaya untuk array negatif!
  let currentSum = 0;

  for (let i = 0; i < k; i++) {
    maxSum += arr[i];    // langsung hitung ke maxSum
  }

  currentSum = maxSum;   // baru copy ke currentSum

  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum); // pakai Math.max()
  }

  return maxSum;
}
```

### Versi Sendiri ✅

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = -Infinity; // ✅ aman untuk semua kasus
  let currentSum = 0;

  for (let i = 0; i < k; i++) {
    currentSum += arr[i]; // hitung dulu ke currentSum
  }

  maxSum = currentSum;    // baru assign ke maxSum

  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];

    if (currentSum > maxSum) { // pakai if statement
      maxSum = currentSum;
    }
  }

  return maxSum;
}
```

### 📊 Tabel Perbandingan

| | Versi Referensi | Versi Sendiri |
|---|---|---|
| **Nilai awal maxSum** | `0` ❌ | `-Infinity` ✅ |
| **Hitung window pertama** | Langsung ke `maxSum` | Ke `currentSum` dulu |
| **Update maxSum** | `Math.max()` | `if` statement |
| **Aman untuk array negatif?** | ❌ Tidak | ✅ Ya |
| **Hasil** | Sama (kecuali array negatif) | Sama |

> 💡 Perbedaan utamanya hanya di inisialisasi `maxSum`. Versi sendiri lebih aman karena pakai `-Infinity`.

---

<a name="kapan-pakai-sliding-window"></a>
## 🎯 Kapan Pakai Sliding Window?

Sliding Window cocok dipakai kalau:

- ✅ Data yang dicari **berurutan/bersebelahan**
- ✅ Ukuran window-nya **tetap** (seperti `k`)

```
✅ Cocok:
"Cari jumlah terbesar dari 3 angka yang BERSEBELAHAN"
 → [2,5,3] → [5,3,1] → [3,1,11] → ...
 Window bergeser satu per satu secara berurutan

❌ Tidak cocok:
"Cari jumlah terbesar dari 3 angka MANA SAJA"
 → [2,11,7] bisa dipilih bebas, tidak harus berurutan
 Sliding Window tidak bisa dipakai di sini!
```

Alasannya sederhana — Sliding Window bekerja dengan cara **menghilangkan angka paling kiri dan menambah angka paling kanan** secara berurutan. Kalau datanya boleh dipilih acak, teknik ini tidak bisa dipakai.

---

<a name="jebakan-umum"></a>
## 🪤 Jebakan Umum

Ini adalah kesalahan nyata yang terjadi saat mengerjakan challenge ini. Dicatat supaya tidak terulang! 😄

---

**1. Hanya mengambil satu elemen untuk window pertama**

```javascript
// ❌ Salah — hanya ambil satu elemen, bukan k elemen
let currentSum = 0;
currentSum += arr[i];

// ✅ Benar — loop sebanyak k kali untuk window pertama
let currentSum = 0;
for (let i = 0; i < k; i++) {
  currentSum += arr[i];
}
```

---

**2. Tidak ada bagian geser window sama sekali**

```javascript
// ❌ Salah — hanya ada satu loop, tidak ada mekanisme geser
for (let i = 0; i <= arr.length - k; i++) {
  currentSum += arr[i];
  if (currentSum > maxSum) maxSum = currentSum;
}

// ✅ Benar — ada dua tahap: hitung window pertama, lalu geser
for (let i = 0; i < k; i++) { currentSum += arr[i]; }
maxSum = currentSum;
for (let i = k; i < arr.length; i++) {
  currentSum = currentSum - arr[i - k] + arr[i];
  if (currentSum > maxSum) maxSum = currentSum;
}
```

---

**3. Batas loop geser window salah**

```javascript
// ❌ Salah — elemen terakhir array tidak diproses
for (let i = k; i < arr.length - 1; i++)

// ✅ Benar
for (let i = k; i < arr.length; i++)
```

---

**4. Rumus geser window salah**

```javascript
// ❌ Salah — indeks elemen yang keluar dan masuk tidak tepat
currentSum = currentSum - arr[i - 1] + arr[i + 2];

// ✅ Benar — arr[i-k] adalah yang keluar, arr[i] adalah yang masuk
currentSum = currentSum - arr[i - k] + arr[i];
```

Saat `i = k = 3`:
```
Yang keluar → index 0 → arr[i - k] = arr[3 - 3] = arr[0] = 2
Yang masuk  → index 3 → arr[i]     = arr[3]              = 1
```

---

**5. Update maxSum di luar loop geser**

```javascript
// ❌ Salah — maxSum hanya dibandingkan sekali di akhir (window terakhir saja!)
for (let i = k; i < arr.length; i++) {
  currentSum = currentSum - arr[i - k] + arr[i];
}
if (currentSum > maxSum) maxSum = currentSum;

// ✅ Benar — update maxSum di setiap langkah geser
for (let i = k; i < arr.length; i++) {
  currentSum = currentSum - arr[i - k] + arr[i];
  if (currentSum > maxSum) maxSum = currentSum; // di dalam loop!
}
```

```
Ilustrasi masalahnya:

Window:      [2,5,3] [5,3,1] [3,1,11] [1,11,7] [11,7,6] [7,6,4]
currentSum:    10      9       15       19        24       17

❌ if di luar loop → maxSum hanya dapat nilai 17 (window terakhir)
✅ if di dalam loop → maxSum dapat nilai 24 (yang terbesar) ✅
```

---

**6. Pakai if tidak perlu untuk window pertama**

```javascript
// ❌ Tidak perlu — maxSum = -Infinity, kondisi ini selalu true
if (currentSum > maxSum) {
  maxSum = currentSum;
}

// ✅ Lebih simpel — langsung assign saja
maxSum = currentSum;
```

> 💡 Karena `maxSum` dimulai dari `-Infinity`, nilai apapun pasti lebih besar. Jadi `if`-nya tidak diperlukan di sini.

---

## 📝 Catatan Pribadi

- Sliding Window terasa membingungkan di awal, tapi kuncinya ada di **rumus geser**: `currentSum - arr[i-k] + arr[i]`
- Kesalahan terbanyak ada di **posisi update maxSum** — harus di dalam loop geser, bukan di luar
- Selalu pakai `-Infinity` untuk inisialisasi `maxSum`, bukan `0`
- Sliding Window hanya cocok untuk data yang **berurutan** — kalau boleh pilih acak, teknik ini tidak berlaku
