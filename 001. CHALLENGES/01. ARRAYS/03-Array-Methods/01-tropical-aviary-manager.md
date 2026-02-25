# 🦜 manageAviary — Ringkasan Algoritma

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║         🦜 RINGKASAN ALGORITMA — COMPLETE REFERENCE 🦜                 ║
║         Array Methods · Switch Statement · Aviary Simulation             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Concept](https://img.shields.io/badge/Concept-Array%20Methods%20%2B%20Switch%20Statement-blue?style=for-the-badge)

---

## 🧭 Quick Jump
| 📋 Soal | 📊 Contoh | ✅ Solusi | 🧪 Test Cases | 🎯 Quick Reference |
|:-------:|:---------:|:--------:|:-------------:|:-----------------:|
| [Jump](#-deskripsi-challenge) | [Jump](#-contoh-contoh) | [Jump](#-solusi-final) | [Jump](#-test-cases-lengkap) | [Jump](#-quick-reference-card) |

---

## 🎯 Tujuan

- ✅ Memahami cara memanipulasi array menggunakan built-in methods
- ✅ Memahami penggunaan `switch` statement untuk multiple conditions
- ✅ Memahami perhitungan indeks tengah pada array ganjil dan genap

---

# 🧩 DESKRIPSI CHALLENGE

📝 **Deskripsi**
Buat function `manageAviary(birds, action)` yang mensimulasikan pengelolaan inventori burung eksotis di sebuah penangkaran tropis.

🎯 **Parameter:**
- `birds` — array berisi nama-nama spesies burung
- `action` — angka yang menentukan operasi apa yang akan dilakukan

📌 **Aturan:**
- Gunakan `switch` untuk menentukan operasi berdasarkan nilai `action`
- Nama burung bersifat **case-sensitive**
- Untuk array panjang genap, posisi tengah = `Math.floor((length - 1) / 2)`
- Return array yang sudah dimodifikasi

---

## 🔧 Function Signature

```javascript
manageAviary(birds, action)
```

| Parameter | Tipe | Contoh | Keterangan |
|-----------|------|--------|------------|
| `birds` | `array` | `["Parrot", "Eagle"]` | Array berisi nama spesies burung |
| `action` | `number` | `1` | Angka operasi (1–5) |
| **return** | `array` | `["Parrot", "Eagle", "Toucan"]` | Array setelah dimodifikasi |

### Daftar Action:

| Action | Operasi | Deskripsi |
|--------|---------|-----------|
| 1 | **Tambah** | Menambahkan `"Toucan"` di akhir array |
| 2 | **Hapus** | Menghapus burung pertama dari array |
| 3 | **Ganti** | Mengganti burung di posisi tengah dengan `"Flamingo"` |
| 4 | **Balik** | Membalikkan urutan seluruh burung |
| 5 | **Urutkan** | Mengurutkan nama burung secara alfabetis |

---

## ⚡ Quick Test — Tulis Fungsinya Sendiri Dulu, Lalu Test Satu per Satu!

> 💡 Tulis function `manageAviary` kamu sendiri terlebih dahulu, baru paste test di bawah ini satu per satu untuk ngecek hasilnya.

```javascript
// Test 1 — Action 1: Tambah Toucan di akhir
console.log(manageAviary(["Parrot", "Eagle", "Sparrow"], 1)); // ["Parrot", "Eagle", "Sparrow", "Toucan"]
```

```javascript
// Test 2 — Action 2: Hapus burung pertama
console.log(manageAviary(["Parrot", "Eagle", "Sparrow", "Toucan"], 2)); // ["Eagle", "Sparrow", "Toucan"]
```

```javascript
// Test 3 — Action 3: Ganti burung tengah
console.log(manageAviary(["Parrot", "Eagle", "Sparrow"], 3)); // ["Parrot", "Flamingo", "Sparrow"]
```

```javascript
// Test 4 — Action 4: Balik urutan
console.log(manageAviary(["Parrot", "Eagle", "Sparrow"], 4)); // ["Sparrow", "Eagle", "Parrot"]
```

```javascript
// Test 5 — Action 5: Urutkan alfabetis
console.log(manageAviary(["Zebra Finch", "Parrot", "Eagle", "Sparrow"], 5)); // ["Eagle", "Parrot", "Sparrow", "Zebra Finch"]
```

---

## 📊 Contoh-contoh

### 🔢 Action 1 — Tambah Toucan

```
birds = ["Parrot", "Eagle", "Sparrow"]
action = 1
```

| Kondisi | Operasi | Hasil |
|---------|---------|-------|
| action === 1 | `push("Toucan")` | `["Parrot", "Eagle", "Sparrow", "Toucan"]` |

```
RETURN → ["Parrot", "Eagle", "Sparrow", "Toucan"]
```

---

### 🔢 Action 2 — Hapus Burung Pertama

```
birds = ["Parrot", "Eagle", "Sparrow", "Toucan"]
action = 2
```

| Kondisi | Operasi | Hasil |
|---------|---------|-------|
| action === 2 | `shift()` | `["Eagle", "Sparrow", "Toucan"]` |

```
RETURN → ["Eagle", "Sparrow", "Toucan"]
```

---

### 🔢 Action 3 — Ganti Burung Tengah (Array Ganjil)

```
birds = ["Parrot", "Eagle", "Sparrow"]
action = 3
```

| Kondisi | Kalkulasi | Indeks Tengah | Hasil |
|---------|-----------|:-------------:|-------|
| action === 3 | `(3-1)/2 = 1` | 1 | `["Parrot", "Flamingo", "Sparrow"]` |

```
RETURN → ["Parrot", "Flamingo", "Sparrow"]
```

---

### 🔢 Action 3 — Ganti Burung Tengah (Array Genap)

```
birds = ["A", "B", "C", "D"]
action = 3
```

| Kondisi | Kalkulasi | Indeks Tengah | Hasil |
|---------|-----------|:-------------:|-------|
| action === 3 | `(4-1)/2 = 1.5 → 1` | 1 | `["A", "Flamingo", "C", "D"]` |

```
RETURN → ["A", "Flamingo", "C", "D"]
```

---

### 🔢 Action 4 — Balik Urutan

```
birds = ["Parrot", "Eagle", "Sparrow"]
action = 4
```

| Kondisi | Operasi | Hasil |
|---------|---------|-------|
| action === 4 | `reverse()` | `["Sparrow", "Eagle", "Parrot"]` |

```
RETURN → ["Sparrow", "Eagle", "Parrot"]
```

---

### 🔢 Action 5 — Urutkan Alfabetis

```
birds = ["Zebra Finch", "Parrot", "Eagle", "Sparrow"]
action = 5
```

| Kondisi | Operasi | Hasil |
|---------|---------|-------|
| action === 5 | `sort()` | `["Eagle", "Parrot", "Sparrow", "Zebra Finch"]` |

```
RETURN → ["Eagle", "Parrot", "Sparrow", "Zebra Finch"]
```

---

> 💡 **Pola Penting:** Array methods seperti `push`, `shift`, `reverse`, dan `sort` langsung mengubah array asli (mutable). Selalu pastikan `break` ada di setiap `case` agar tidak terjadi fall-through ke case berikutnya.

---

═══════════════════════════════════════════════════════════════════════

# ✅ SOLUSI FINAL

═══════════════════════════════════════════════════════════════════════

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
function manageAviary(birds, action) {
  switch (action) {
    case 1:
      birds.push("Toucan");
      break;
    case 2:
      birds.shift();
      break;
    case 3:
      const middleIndex = Math.floor((birds.length - 1) / 2);
      birds[middleIndex] = "Flamingo";
      break;
    case 4:
      birds.reverse();
      break;
    case 5:
      birds.sort();
      break;
  }
  return birds;
}
```

</details>

---

### **Konsep Inti:**
```
Terima birds (array) dan action (number)
Switch berdasarkan nilai action:
  case 1 → push("Toucan") ke akhir array
  case 2 → shift() elemen pertama
  case 3 → hitung middleIndex, ganti dengan "Flamingo"
  case 4 → reverse() seluruh array
  case 5 → sort() secara alfabetis
Return birds yang sudah dimodifikasi
```

---

### **Step-by-Step (Detail):**

#### 🟣 Definisi Fungsi:

1. **`function manageAviary(birds, action)`**
   - `birds` — array nama spesies burung yang dikelola
   - `action` — angka penentu operasi (1–5)
   - **return** — array yang sudah dimodifikasi

#### 🔵 Switch Statement:

2. **`switch (action)`**
   - Mengecek nilai `action` dan menjalankan `case` yang sesuai
   - Setiap `case` diakhiri `break` agar tidak fall-through ke case berikutnya

#### 🔄 Setiap Case:

3. **`case 1` — `birds.push("Toucan")`**
   - Menambahkan `"Toucan"` ke **akhir** array
   - `push()` langsung mengubah array asli

4. **`case 2` — `birds.shift()`**
   - Menghapus elemen **pertama** dari array
   - `shift()` langsung mengubah array asli dan mengembalikan elemen yang dihapus

5. **`case 3` — Hitung tengah + ganti**
   - `Math.floor((birds.length - 1) / 2)` → rumus indeks tengah
   - Untuk array ganjil (5): `(5-1)/2 = 2` ✅
   - Untuk array genap (4): `(4-1)/2 = 1.5 → 1` ✅
   - `birds[middleIndex] = "Flamingo"` → ganti nilai di indeks tersebut

6. **`case 4` — `birds.reverse()`**
   - Membalik urutan semua elemen
   - Elemen terakhir jadi pertama, elemen pertama jadi terakhir

7. **`case 5` — `birds.sort()`**
   - Mengurutkan elemen secara alfabetis (A–Z)
   - Bersifat case-sensitive: huruf kapital diurutkan sebelum huruf kecil

#### 🔵 Di Luar Switch:

8. **`return birds`**
   - Mengembalikan array yang sudah dimodifikasi
   - Karena array bersifat mutable, array asli sudah berubah sejak dalam switch

---

### **Visualisasi untuk setiap action:**

```
┌──────────────────────────────────────────────────────────────────┐
│  ACTION 1 — push                                                 │
│  birds = ["Parrot", "Eagle"]                                     │
│  birds.push("Toucan")                                            │
│  → ["Parrot", "Eagle", "Toucan"] ✅                              │
├──────────────────────────────────────────────────────────────────┤
│  ACTION 2 — shift                                                │
│  birds = ["Parrot", "Eagle", "Toucan"]                           │
│  birds.shift() → hapus "Parrot"                                  │
│  → ["Eagle", "Toucan"] ✅                                        │
├──────────────────────────────────────────────────────────────────┤
│  ACTION 3 — ganti tengah                                         │
│  birds = ["Parrot", "Eagle", "Sparrow"]  (length = 3)           │
│  middleIndex = Math.floor((3-1)/2) = 1                           │
│  birds[1] = "Flamingo"                                           │
│  → ["Parrot", "Flamingo", "Sparrow"] ✅                          │
├──────────────────────────────────────────────────────────────────┤
│  ACTION 4 — reverse                                              │
│  birds = ["Parrot", "Eagle", "Sparrow"]                          │
│  birds.reverse()                                                 │
│  → ["Sparrow", "Eagle", "Parrot"] ✅                             │
├──────────────────────────────────────────────────────────────────┤
│  ACTION 5 — sort                                                 │
│  birds = ["Zebra Finch", "Parrot", "Eagle"]                      │
│  birds.sort()                                                    │
│  → ["Eagle", "Parrot", "Zebra Finch"] ✅                         │
└──────────────────────────────────────────────────────────────────┘
```

---

### **Keywords:**
- 🦜 **Array Methods** — `push`, `shift`, `reverse`, `sort` untuk manipulasi array
- 🔀 **Switch Statement** — control flow untuk multiple conditions
- 📐 **Math.floor()** — pembulatan ke bawah untuk menghitung indeks tengah
- 🔁 **Mutable Array** — array methods langsung mengubah array asli
- 🔤 **Case-sensitive** — `"Parrot"` ≠ `"parrot"`

---

### **Pitfalls (Jebakan Umum):**

**1) ❌ Lupa `break` di switch**
```javascript
// ❌ SALAH — tanpa break, case 1 lanjut ke case 2 (fall-through!)
switch (action) {
  case 1:
    birds.push("Toucan"); // Ini jalan...
  case 2:
    birds.shift(); // ...ini juga ikut jalan! 😱
}

// ✅ BENAR — selalu akhiri setiap case dengan break
switch (action) {
  case 1:
    birds.push("Toucan");
    break; // Stop di sini ✓
  case 2:
    birds.shift();
    break;
}
```

**2) ❌ Rumus indeks tengah yang salah**
```javascript
// ❌ KURANG TEPAT — untuk array genap hasilnya berbeda
const middleIndex = Math.floor(birds.length / 2);
// Panjang 4: 4/2 = 2 ← indeks 2, bukan 1

// ✅ BENAR (sesuai spesifikasi) — (length - 1) / 2
const middleIndex = Math.floor((birds.length - 1) / 2);
// Panjang 4: (4-1)/2 = 1.5 → 1 ✓
// Panjang 5: (5-1)/2 = 2 ✓
```

**3) ❌ Mengubah parameter birds langsung dengan reassignment**
```javascript
// ❌ KURANG TEPAT — reassignment tidak mengubah array asli di luar fungsi
birds = birds.concat(["Toucan"]); // ini membuat array baru!

// ✅ BENAR — gunakan methods yang mutate array asli
birds.push("Toucan");
```

**4) ❌ Lupa bahwa sort() bersifat case-sensitive**
```javascript
// Urutan Unicode: huruf kapital (A-Z) SEBELUM huruf kecil (a-z)
["parrot", "Eagle"].sort(); // → ["Eagle", "parrot"] 
// "E" (kapital) < "p" (kecil) dalam Unicode
```

---

### **💡 Insight Penting:**

> **Kenapa rumus indeks tengah `(length - 1) / 2` dan bukan `length / 2`?**
> Karena indeks array dimulai dari 0. Elemen "tengah" dari array `["A","B","C"]` ada di indeks 1, bukan 1.5. Rumus `(length - 1) / 2` memastikan kita selalu mendapat indeks valid yang ada di array.

> **Kenapa semua array methods di sini bersifat mutable?**
> `push`, `shift`, `reverse`, dan `sort` semuanya mengubah array asli secara langsung — bukan membuat salinan baru. Ini penting dipahami agar tidak terkejut saat array asli berubah setelah fungsi dipanggil.

---

═══════════════════════════════════════════════════════════════════════

# 🧪 TEST CASES LENGKAP

═══════════════════════════════════════════════════════════════════════

```javascript
function manageAviary(birds, action) {
  switch (action) {
    case 1:
      birds.push("Toucan");
      break;
    case 2:
      birds.shift();
      break;
    case 3:
      const middleIndex = Math.floor((birds.length - 1) / 2);
      birds[middleIndex] = "Flamingo";
      break;
    case 4:
      birds.reverse();
      break;
    case 5:
      birds.sort();
      break;
  }
  return birds;
}
```

```javascript
const testCases = [
  { input: [["Parrot", "Eagle", "Sparrow"], 1], expected: ["Parrot", "Eagle", "Sparrow", "Toucan"], desc: "Action 1: Tambah Toucan di akhir" },
  { input: [["Parrot", "Eagle", "Sparrow", "Toucan"], 2], expected: ["Eagle", "Sparrow", "Toucan"], desc: "Action 2: Hapus burung pertama" },
  { input: [["Parrot", "Eagle", "Sparrow"], 3], expected: ["Parrot", "Flamingo", "Sparrow"], desc: "Action 3: Ganti burung tengah (ganjil)" },
  { input: [["A", "B", "C", "D"], 3], expected: ["A", "Flamingo", "C", "D"], desc: "Action 3: Ganti burung tengah (genap)" },
  { input: [["Parrot", "Eagle", "Sparrow"], 4], expected: ["Sparrow", "Eagle", "Parrot"], desc: "Action 4: Balik urutan" },
  { input: [["Zebra Finch", "Parrot", "Eagle", "Sparrow"], 5], expected: ["Eagle", "Parrot", "Sparrow", "Zebra Finch"], desc: "Action 5: Urutkan alfabetis" },
]

testCases.forEach(({ input, expected, desc }, index) => {
  const result = manageAviary(...input)
  const status = JSON.stringify(result) === JSON.stringify(expected) ? "✅ PASS" : "❌ FAIL"
  console.log(`Test Case #${index + 1}: ${status} - ${desc} | manageAviary() = ${JSON.stringify(result)}`)
  if (status === "❌ FAIL") {
    console.log("Expected:", expected)
    console.log("Result  :", result)
  }
})
```

---

## 🔑 Key Takeaways

```
┌─────────────────────────────────────────────────────────────────────┐
│  💡 break di Switch Itu Wajib                                       │
│     Tanpa break, eksekusi lanjut ke case berikutnya (fall-through)  │
│     Selalu akhiri setiap case dengan break kecuali memang disengaja  │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Array Methods Bersifat Mutable                                  │
│     push, shift, reverse, sort langsung mengubah array asli         │
│     Tidak perlu reassign — cukup panggil method-nya                 │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Rumus Indeks Tengah: Math.floor((length - 1) / 2)              │
│     Berlaku untuk array ganjil maupun genap                         │
│     Selalu menghasilkan indeks valid yang ada di array              │
├─────────────────────────────────────────────────────────────────────┤
│  💡 sort() Bersifat Case-Sensitive                                  │
│     Huruf kapital diurutkan sebelum huruf kecil (standar Unicode)   │
│     "Eagle" < "parrot" karena 'E' < 'p' dalam tabel Unicode        │
└─────────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🎯 Quick Reference Card

| Action | Method | Efek |
|--------|--------|------|
| 1 | `push("Toucan")` | Tambah di akhir array |
| 2 | `shift()` | Hapus elemen pertama |
| 3 | `birds[middleIndex] = "Flamingo"` | Ganti elemen tengah |
| 4 | `reverse()` | Balik seluruh urutan |
| 5 | `sort()` | Urutkan A–Z (case-sensitive) |

---

Made with ❤️ for learners

**Happy Coding! 🚀**

</div>
