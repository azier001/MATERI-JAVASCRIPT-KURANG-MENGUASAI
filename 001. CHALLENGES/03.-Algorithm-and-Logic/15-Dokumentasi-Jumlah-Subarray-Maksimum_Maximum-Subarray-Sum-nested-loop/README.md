# 📦 Maximum Subarray Sum — O(n²) Solution

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Level](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)
![Technique](https://img.shields.io/badge/Technique-Nested%20Loop-blue?style=for-the-badge)
![Complexity](https://img.shields.io/badge/Complexity-O(n²)-red?style=for-the-badge)

> Dokumentasi pribadi — challenge dari traversy-js-challenges 
> Mencari jumlah terbesar dari subarray dengan panjang `k` menggunakan nested loop.

---

## 📋 Daftar Isi

- 📖 [Deskripsi Challenge](#deskripsi-challenge)
- 🧠 [Konsep Utama](#konsep-utama)
- 🔢 [Contoh Visual](#contoh-visual)
- 💡 [Solusi](#solusi)
- 🔍 [Bedah Kode](#bedah-kode)
- ⚠️ [Pitfalls](#pitfalls)
- 📊 [Tabel Keywords](#tabel-keywords)
- ❓ [FAQ](#faq)
- 📝 [Catatan Pribadi](#catatan-pribadi)

---

<a name="deskripsi-challenge"></a>
## 📖 Deskripsi Challenge

Tulis fungsi `maxSubarraySum` yang menerima:
- `arr` → array berisi bilangan bulat (bisa negatif!)
- `k` → panjang subarray yang ingin dihitung

Fungsi harus mengembalikan **jumlah terbesar** dari semua subarray berurutan sepanjang `k`.

**Contoh:**
```javascript
console.log(maxSubarraySum([2, 5, 3, 1, 11, 7, 6, 4], 3)); // → 24
```

```javascript
console.log(maxSubarraySum([-2, -5, -3, -1, -11, -7, -6, -4], 4)); // → -9
```

---

<a name="konsep-utama"></a>
## 🧠 Konsep Utama

### 🔹 Apa itu Subarray?

Subarray adalah **potongan elemen berurutan** dari sebuah array — tidak boleh loncat-loncat, harus menyambung.

```
arr = [2, 5, 3, 1, 11, 7, 6, 4]

✅ Subarray yang valid (berurutan):
   [2, 5, 3]
   [5, 3, 1]
   [11, 7, 6]

❌ Bukan subarray (tidak berurutan):
   [2, 3, 11]
   [5, 1, 7]
```

### 🔹 Apa itu O(n²)?

O(n²) adalah cara kita mengukur seberapa banyak pekerjaan yang dilakukan program.

Bayangkan kamu punya 8 elemen:
- Loop luar berjalan ~8 kali
- Loop dalam berjalan ~8 kali juga di setiap iterasi

Total pekerjaan ≈ 8 × 8 = 64 langkah → itulah kenapa disebut **O(n²)**.

> 💡 Ini bukan cara paling efisien, tapi paling mudah dipahami dulu. Nanti kita akan pelajari **Sliding Window** yang jauh lebih cepat (O(n)).

---

<a name="contoh-visual"></a>
## 🔢 Contoh Visual

```
arr = [2, 5, 3, 1, 11, 7, 6, 4]
k   =  3

Semua kemungkinan subarray panjang 3:
┌─────────────────────────────────────┐
│ Mulai i=0 → [2,  5,  3]  = 10      │
│ Mulai i=1 → [5,  3,  1]  = 9       │
│ Mulai i=2 → [3,  1, 11]  = 15      │
│ Mulai i=3 → [1, 11,  7]  = 19      │
│ Mulai i=4 → [11, 7,  6]  = 24  ✅  │  ← TERBESAR
│ Mulai i=5 → [7,  6,  4]  = 17      │
└─────────────────────────────────────┘

Jawaban: 24
```

**Kenapa loop luar berhenti di indeks 5?**

```
n = 8, k = 3
Batas terakhir = n - k = 8 - 3 = 5

Kalau mulai dari i=6 → butuh arr[6], arr[7], arr[8]
arr[8] tidak ada! → ❌ out of bounds
```

---

<a name="solusi"></a>
## 💡 Solusi

### ✅ V1 — `nestedLoop` (Solusi Dasar)

```javascript
function maxSubarraySum(arr, k) {
  const n = arr.length;

  let sum;
  let maxSum = -Infinity;

  for (let i = 0; i <= n - k; i++) {
    sum = 0;

    for (let j = i; j < i + k; j++) {
      sum += arr[j];
    }

    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  return maxSum;
}
```

---

### ✅ V2 — `nestedLoopWithEdgeCase` (Dengan Pengecekan Edge Case)

```javascript
function maxSubarraySum(arr, k) {
  const n = arr.length;

  if (n < k) return null; // 🛡️ pengecekan: k lebih besar dari panjang array

  let maxSum = -Infinity;

  for (let i = 0; i <= n - k; i++) {
    let sum = 0; // dideklarasikan di dalam loop luar — lebih rapi

    for (let j = i; j < i + k; j++) {
      sum += arr[j];
    }

    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  return maxSum;
}
```

**Perbedaan V1 vs V2:**

| | V1 | V2 |
|---|---|---|
| Edge case `n < k` | ❌ Tidak ada | ✅ Return `null` |
| Deklarasi `sum` | Di luar loop luar | Di dalam loop luar |
| Logika inti | Sama | Sama |

---

<a name="bedah-kode"></a>
## 🔍 Bedah Kode

### 🔷 Step 1 — Siapkan variabel

```javascript
const n = arr.length;   // simpan panjang array
let maxSum = -Infinity; // nilai awal terkecil yang mungkin
```

> Kenapa `-Infinity` bukan `0`? Karena kalau semua elemen negatif, `0` akan selalu lebih besar dari semua jumlah subarray → hasil salah!

---

### 🔷 Step 2 — Loop luar (berpindah titik awal)

```javascript
for (let i = 0; i <= n - k; i++)
```

`i` adalah **titik awal** subarray. Batas `i <= n - k` memastikan kita tidak mengambil elemen yang tidak ada.

```
n=8, k=3 → i berjalan: 0, 1, 2, 3, 4, 5
```

---

### 🔷 Step 3 — Loop dalam (jumlahkan k elemen)

```javascript
let sum = 0;
for (let j = i; j < i + k; j++) {
  sum += arr[j];
}
```

`j` mulai dari `i` dan berjalan sebanyak `k` langkah. Misalnya `i=2, k=3`:

```
j=2 → arr[2] = 3
j=3 → arr[3] = 1
j=4 → arr[4] = 11
sum = 3 + 1 + 11 = 15
```

---

### 🔷 Step 4 — Update maxSum

```javascript
if (sum > maxSum) {
  maxSum = sum;
}
```

Setelah loop dalam selesai, bandingkan `sum` dengan `maxSum`. Kalau lebih besar, simpan.

---

### 🔷 Step 5 — Kembalikan maxSum

```javascript
return maxSum;
```

> Jangan `return sum` — itu hanya jumlah subarray **terakhir**, bukan yang terbesar!

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

Ini adalah kesalahan nyata yang terjadi saat mengerjakan challenge ini. Dicatat supaya tidak terulang! 😄

---

**1. Batas loop luar salah**

```javascript
// ❌ Salah — indeks terakhir yang valid terlewat
for (let i = 0; i < n - k; i++)

// ✅ Benar — harus pakai <=
for (let i = 0; i <= n - k; i++)
```

---

**2. Lupa reset `sum` di setiap iterasi**

```javascript
// ❌ Salah — sum terus menumpuk dari subarray sebelumnya
let sum = 0;
for (let i = 0; i <= n - k; i++) {
  for (let j = i; j < i + k; j++) {
    sum += arr[j];
  }
}

// ✅ Benar — reset sum di awal setiap iterasi loop luar
for (let i = 0; i <= n - k; i++) {
  let sum = 0;
  for (let j = i; j < i + k; j++) {
    sum += arr[j];
  }
}
```

---

**3. Nilai awal maxSum = 0 saat semua elemen negatif**

```javascript
// ❌ Salah — kalau semua elemen negatif, 0 tidak akan pernah diupdate
let maxSum = 0;

// ✅ Benar — -Infinity selalu lebih kecil dari nilai apapun
let maxSum = -Infinity;
```

---

**4. Batas loop dalam salah**

```javascript
// ❌ Salah — j < k tidak memperhitungkan posisi i
for (let j = i; j < k; j++)

// ✅ Benar
for (let j = i; j < i + k; j++)
```

Contoh: `i=2, k=3` → dengan `j < k`, `j` berhenti di 3, padahal seharusnya sampai 4.

---

**5. Update maxSum di dalam loop dalam**

```javascript
// ❌ Salah — sum belum selesai dihitung!
for (let j = i; j < i + k; j++) {
  sum += arr[j];
  if (sum > maxSum) maxSum = sum; // terlalu cepat!
}

// ✅ Benar — update setelah loop dalam selesai
for (let j = i; j < i + k; j++) {
  sum += arr[j];
}
if (sum > maxSum) maxSum = sum;
```

---

**6. Kondisi if terbalik**

```javascript
// ❌ Salah — ini menyimpan nilai yang lebih kecil!
if (maxSum > sum) {
  maxSum = sum;
}

// ✅ Benar
if (sum > maxSum) {
  maxSum = sum;
}
```

---

**7. Variabel yang diupdate tertukar**

```javascript
// ❌ Salah — sum malah diubah jadi maxSum
if (sum > maxSum) {
  sum = maxSum;
}

// ✅ Benar — yang diupdate adalah maxSum
if (sum > maxSum) {
  maxSum = sum;
}
```

---

**8. Return variabel yang salah**

```javascript
// ❌ Salah — ini hanya nilai subarray terakhir
return sum;

// ✅ Benar
return maxSum;
```

---

<a name="tabel-keywords"></a>
## 📊 Tabel Keywords

| Kata Kunci | Artinya |
|---|---|
| `subarray` | Potongan elemen berurutan dari array |
| `k` | Panjang subarray yang ingin dihitung |
| `n` | Panjang total array (`arr.length`) |
| `n - k` | Indeks terakhir yang valid sebagai titik awal |
| `O(n²)` | Kompleksitas waktu: dua loop bersarang |
| `nested loop` | Loop di dalam loop |
| `-Infinity` | Nilai yang selalu lebih kecil dari bilangan apapun |
| `maxSum` | Variabel penyimpan jumlah terbesar |
| `sum` | Jumlah sementara untuk subarray saat ini |
| `edge case` | Kondisi ekstrem yang perlu ditangani khusus (misal: `n < k`) |

---

<a name="faq"></a>
## ❓ FAQ

<details>
<summary>🤔 Kenapa harus pakai <code>-Infinity</code> bukan <code>0</code>?</summary>

Karena array bisa berisi semua bilangan negatif. Kalau `maxSum = 0`, maka tidak ada `sum` yang bisa mengalahkan `0`, sehingga `maxSum` tidak pernah diupdate dan hasilnya salah.

Contoh: `[-2, -5, -3, -1]` dengan `k=2`
- Semua jumlah subarray pasti negatif
- Jawaban yang benar: `-3` (dari `[-2, -1]`)
- Kalau `maxSum = 0`, fungsi tidak pernah update → salah!

`-Infinity` selalu lebih kecil dari nilai apapun, sehingga pasti akan diupdate di iterasi pertama.

</details>

<details>
<summary>🤔 Kenapa batas loop luar <code>i <= n - k</code>, bukan <code>i < n</code>?</summary>

Karena kita butuh `k` elemen mulai dari `i`. Kalau `i` terlalu besar, kita akan mengakses indeks yang tidak ada.

Contoh: `n=8, k=3`
- Kalau `i=6` → butuh `arr[6], arr[7], arr[8]` → `arr[8]` tidak ada!
- Titik awal terakhir yang aman = `n - k = 5`

</details>

<details>
<summary>🤔 Bedanya O(n²) dan O(n) itu apa?</summary>

- **O(n²)** → pekerjaan bertambah secara kuadrat. Array 100 elemen → ~10.000 operasi.
- **O(n)** → pekerjaan bertambah secara linear. Array 100 elemen → ~100 operasi.

Untuk challenge ini, teknik **Sliding Window** bisa menyelesaikan masalah yang sama dengan O(n) — akan dipelajari di dokumentasi terpisah!

</details>

<details>
<summary>🤔 Kenapa <code>sum</code> perlu direset ke 0 di setiap iterasi loop luar?</summary>

Karena setiap iterasi loop luar adalah subarray **baru**. Kalau `sum` tidak direset, nilai dari subarray sebelumnya akan ikut terhitung di subarray berikutnya.

</details>

---

<a name="catatan-pribadi"></a>
## 📝 Catatan Pribadi

- Challenge ini mengajarkan pentingnya **titik awal yang tepat** untuk loop — batas `n - k` adalah kunci utamanya.
- Kesalahan terbanyak ada di bagian inisialisasi variabel (`maxSum = 0` vs `-Infinity`) dan posisi update `maxSum`.
- Untuk array dengan semua nilai negatif, selalu ingat: gunakan `-Infinity` bukan `0`.
- Sliding Window untuk versi O(n) akan didokumentasikan terpisah.
