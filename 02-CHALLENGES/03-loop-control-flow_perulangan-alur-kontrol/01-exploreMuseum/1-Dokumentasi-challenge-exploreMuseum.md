# 🏛️ exploreMuseum — Ringkasan Algoritma

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║         🏛️ RINGKASAN ALGORITMA — COMPLETE REFERENCE 🏛️                 ║
║         Nested Loops · Break & Continue · Museum Simulation              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Concept](https://img.shields.io/badge/Concept-Nested%20Loop%20%2B%20Break%20%2B%20Continue-blue?style=for-the-badge)

---

## 🎯 Tujuan

- ✅ Memahami konsep nested loop dalam konteks simulasi nyata
- ✅ Memahami perbedaan dan penggunaan `break` vs `continue`
- ✅ Memahami kenapa urutan pengecekan kondisi itu penting

---

# 🧩 DESKRIPSI CHALLENGE

📝 **Deskripsi**
Buat function `exploreMuseum(totalTime, exhibits, skipExhibits)` yang mensimulasikan perjalanan pengunjung museum melewati berbagai exhibit di berbagai lantai.

🎯 **Parameter:**
- `totalTime` — total waktu kunjungan dalam menit
- `exhibits` — 2D array, tiap sub-array adalah lantai, tiap string adalah nama exhibit
- `skipExhibits` — array berisi nama exhibit yang ingin di-skip

📌 **Aturan:**
- Setiap exhibit membutuhkan **30 menit**
- Gunakan `continue` untuk skip exhibit yang ada di `skipExhibits`
- Gunakan `break` untuk berhenti jika waktu habis
- Return array berisi nama exhibit yang berhasil dikunjungi

---

## 🔧 Function Signature

```javascript
exploreMuseum(totalTime, exhibits, skipExhibits)
```

| Parameter | Tipe | Contoh | Keterangan |
|-----------|------|--------|------------|
| `totalTime` | `number` | `90` | Total waktu kunjungan dalam menit |
| `exhibits` | `array` (2D) | `[["Dinosaurs", "Fossils"], ["Gems"]]` | Tiap sub-array = 1 lantai, tiap string = nama exhibit |
| `skipExhibits` | `array` | `["Fossils"]` | Daftar exhibit yang ingin dilewati |
| **return** | `array` | `["Dinosaurs", "Gems"]` | Daftar exhibit yang berhasil dikunjungi |

---

## ⚡ Quick Test — Tulis Fungsinya Sendiri Dulu, Lalu Test Satu per Satu!

> 💡 Tulis function `exploreMuseum` kamu sendiri terlebih dahulu, baru paste test di bawah ini satu per satu untuk ngecek hasilnya.

```javascript
// Test 1 — Normal: ada exhibit yang di-skip
console.log(exploreMuseum(90, [["Dinosaurs", "Fossils"], ["Gems", "Minerals"]], ["Fossils"])); // ["Dinosaurs", "Gems", "Minerals"]
```

```javascript
// Test 2 — Waktu tidak cukup sama sekali
console.log(exploreMuseum(20, [["Dinosaurs"]], [])); // []
```

```javascript
// Test 3 — Semua exhibit di-skip
console.log(exploreMuseum(90, [["Dinosaurs"]], ["Dinosaurs"])); // []
```

```javascript
// Test 4 — Waktu habis di tengah perjalanan
console.log(exploreMuseum(60, [["Dinosaurs", "Fossils"], ["Gems", "Minerals"]], [])); // ["Dinosaurs", "Fossils"]
```

---

## 📊 Contoh-contoh

### 🔢 Kasus Normal
```
totalTime = 90
exhibits = [["Dinosaurs", "Fossils"], ["Gems", "Minerals"]]
skipExhibits = ["Fossils"]
```

| Lantai | Exhibit | Status | Sisa Waktu |
|--------|---------|--------|:----------:|
| 0 | Dinosaurs | ✅ Dikunjungi | 60 |
| 0 | Fossils | ⏭️ Di-skip | 60 |
| 1 | Gems | ✅ Dikunjungi | 30 |
| 1 | Minerals | ✅ Dikunjungi | 0 |

```
RETURN → ["Dinosaurs", "Gems", "Minerals"]
```

---

### 🔢 Waktu Tidak Cukup
```
totalTime = 20
exhibits = [["Dinosaurs"]]
skipExhibits = []
```

| Lantai | Exhibit | Status | Sisa Waktu |
|--------|---------|--------|:----------:|
| 0 | Dinosaurs | ❌ Waktu < 30 | 20 |

```
RETURN → []
```

---

### 🔢 Semua Di-skip
```
totalTime = 90
exhibits = [["Dinosaurs"]]
skipExhibits = ["Dinosaurs"]
```

| Lantai | Exhibit | Status | Sisa Waktu |
|--------|---------|--------|:----------:|
| 0 | Dinosaurs | ⏭️ Di-skip | 90 |

```
RETURN → []
```

---

### 🔢 Waktu Habis di Tengah
```
totalTime = 60
exhibits = [["Dinosaurs", "Fossils"], ["Gems", "Minerals"]]
skipExhibits = []
```

| Lantai | Exhibit | Status | Sisa Waktu |
|--------|---------|--------|:----------:|
| 0 | Dinosaurs | ✅ Dikunjungi | 30 |
| 0 | Fossils | ✅ Dikunjungi | 0 |
| 1 | Gems | ❌ Waktu < 30, break | 0 |

```
RETURN → ["Dinosaurs", "Fossils"]
```

---

> 💡 **Pola Penting:** Urutan pengecekan kondisi di dalam inner loop sangat menentukan hasil — cek `skip` terlebih dahulu sebelum cek `waktu`.

---

═══════════════════════════════════════════════════════════════════════

# ✅ SOLUSI FINAL (Versi Coddy)

═══════════════════════════════════════════════════════════════════════

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
function exploreMuseum(totalTime, exhibits, skipExhibits) {
  const visitedExhibits = [];
  let remainingTime = totalTime;

  for (let floor = 0; floor < exhibits.length; floor++) {
    for (let exhibit = 0; exhibit < exhibits[floor].length; exhibit++) {
      const currentExhibit = exhibits[floor][exhibit];

      if (skipExhibits.includes(currentExhibit)) {
        continue;
      }

      if (remainingTime < 30) {
        break;
      }

      visitedExhibits.push(currentExhibit);
      remainingTime -= 30;
    }

    if (remainingTime < 30) {
      break;
    }
  }

  return visitedExhibits;
}
```

</details>

---

### **Konsep Inti:**
```
Inisialisasi visitedExhibits = [] dan remainingTime = totalTime
Loop tiap lantai (outer loop)
  Loop tiap exhibit di lantai tersebut (inner loop)
    Jika exhibit ada di skipList → skip (continue)
    Jika waktu < 30 → hentikan inner loop (break)
    Kunjungi exhibit → push ke array, kurangi waktu 30
  Jika waktu < 30 setelah inner loop → hentikan outer loop (break)
Return visitedExhibits
```

---

### **Step-by-Step (Detail):**

#### 🟣 Definisi Fungsi:

1. **`function exploreMuseum(totalTime, exhibits, skipExhibits)`**
   - `totalTime` — total waktu kunjungan dalam menit
   - `exhibits` — 2D array representasi lantai dan exhibit museum
   - `skipExhibits` — daftar nama exhibit yang ingin dilewati
   - **return** — array berisi nama exhibit yang berhasil dikunjungi

#### 🔵 Di Luar Loop:

2. **Inisialisasi `visitedExhibits = []`**
   - Dideklarasikan **sebelum loop** agar bisa diisi dan diakses sepanjang iterasi
   - Array kosong sebagai wadah nama exhibit yang berhasil dikunjungi

3. **Inisialisasi `remainingTime = totalTime`**
   - Salinan dari parameter `totalTime` yang akan berkurang setiap kunjungan
   - Tidak mengubah nilai parameter asli

#### 🔄 Outer Loop — `for (let floor = 0; floor < exhibits.length; floor++)`:

4. **Iterasi tiap lantai museum**
   - `exhibits` adalah 2D array — tiap index mewakili satu lantai
   - Setiap iterasi masuk ke inner loop untuk menjelajahi exhibit di lantai tersebut

#### 🔄 Inner Loop — `for (let exhibit = 0; exhibit < exhibits[floor].length; exhibit++)`:

5. **`const currentExhibit = exhibits[floor][exhibit]`**
   - Ambil nama exhibit saat ini dari array 2D
   - Disimpan ke variabel agar mudah dibaca dan dibandingkan

6. **`if (skipExhibits.includes(currentExhibit)) continue`** ← PERTAMA
   - Cek skip **lebih dulu** sebelum cek waktu
   - Jika masuk skipList → lompat ke exhibit berikutnya tanpa kurangi waktu

7. **`if (remainingTime < 30) break`** ← KEDUA *(di dalam inner loop)*
   - Jika waktu tidak cukup → hentikan inner loop
   - `break` di sini hanya keluar dari **inner loop**

8. **`visitedExhibits.push(currentExhibit)` + `remainingTime -= 30`**
   - Catat exhibit yang berhasil dikunjungi ke array result
   - Kurangi sisa waktu sebesar 30 menit

#### 🔵 Setelah Inner Loop, Masih di Outer Loop:

9. **`if (remainingTime < 30) break`** *(di dalam outer loop)*
   - Cek ulang waktu untuk menghentikan **outer loop** juga
   - Tanpa ini, program lanjut ke lantai berikutnya meski waktu sudah habis

#### 🔵 Di Luar Semua Loop:

10. **`return visitedExhibits`**
   - Return semua exhibit yang berhasil dikunjungi setelah loop selesai

---

### **Visualisasi untuk kasus utama:**
```
┌──────────────────────────────────────────────────────────────────┐
│  totalTime=90, skipExhibits=["Fossils"]                          │
│  exhibits=[["Dinosaurs","Fossils"],["Gems","Minerals"]]          │
│  remainingTime = 90                                              │
│                                                                  │
│  ── Lantai 0 ──────────────────────────────────────────         │
│  "Dinosaurs" → bukan skipList ✅ → waktu 90≥30 ✅               │
│               push("Dinosaurs"), remainingTime = 60             │
│                                                                  │
│  "Fossils"   → ada di skipList ❌ → continue ⏭️                 │
│                                                                  │
│  Cek outer: 60 ≥ 30 → lanjut ke lantai berikutnya              │
│                                                                  │
│  ── Lantai 1 ──────────────────────────────────────────         │
│  "Gems"      → bukan skipList ✅ → waktu 60≥30 ✅               │
│               push("Gems"), remainingTime = 30                  │
│                                                                  │
│  "Minerals"  → bukan skipList ✅ → waktu 30≥30 ✅               │
│               push("Minerals"), remainingTime = 0               │
│                                                                  │
│  Cek outer: 0 < 30 → break ❌ stop                              │
│                                                                  │
│  return ["Dinosaurs", "Gems", "Minerals"] ✅                    │
└──────────────────────────────────────────────────────────────────┘
```

---

### **Keywords:**
- 🏛️ **2D Array** — struktur data berlapis untuk representasi lantai & exhibit
- ⏭️ **continue** — skip exhibit tanpa menghentikan loop
- 🛑 **break** — hentikan loop saat waktu tidak cukup
- 🔁 **Double break pattern** — break inner + break outer untuk keluar dari nested loop sepenuhnya
- 📋 **Array.includes()** — cek apakah nilai ada di dalam array
- ⏱️ **O(n×m)** complexity — n lantai, m exhibit per lantai

---

### **Pitfalls (Jebakan Umum):**

**1) ❌ Cek waktu sebelum cek skip**
```javascript
// ❌ KURANG TEPAT — exhibit yang harusnya di-skip malah menghentikan loop
if (remainingTime < 30) break;
if (skipExhibits.includes(currentExhibit)) continue;

// ✅ BENAR (versi Coddy) — skip dulu, baru cek waktu
if (skipExhibits.includes(currentExhibit)) continue;
if (remainingTime < 30) break;
```

**2) ❌ Lupa break di outer loop**
```javascript
// ❌ SALAH — hanya break inner loop, outer loop tetap jalan ke lantai berikutnya
for (let floor ...) {
  for (let exhibit ...) {
    if (remainingTime < 30) break;
  }
  // ← tanpa ini, lanjut ke lantai berikutnya meski waktu habis!
}

// ✅ BENAR — tambahkan break di outer loop juga
  if (remainingTime < 30) break; // ← wajib ada setelah inner loop
```

**3) ❌ Langsung kurangi waktu tanpa push ke array**
```javascript
// ❌ SALAH — exhibit tidak tercatat di hasil
remainingTime -= 30;

// ✅ BENAR — push dulu ke array, baru kurangi waktu
visitedExhibits.push(currentExhibit);
remainingTime -= 30;
```

**4) ❌ Mengubah totalTime langsung**
```javascript
// ❌ SALAH — totalTime langsung dipakai dan diubah nilainya
totalTime -= 30;

// ✅ BENAR — buat salinan dulu, jangan ubah parameter asli
let remainingTime = totalTime;
remainingTime -= 30;
```

---

### **💡 Insight Penting:**

> **Kenapa `continue` (skip) dicek sebelum `break` (waktu)?**
> Karena skip tidak membutuhkan waktu. Jika waktu habis tapi exhibit berikutnya adalah skip, seharusnya kita skip dulu dan lanjut — bukan langsung berhenti. Versi Coddy lebih tepat secara logika simulasi.

> **Kenapa butuh 2x pengecekan `remainingTime < 30`?**
> `break` hanya keluar dari loop **terdalam**. Untuk menghentikan outer loop, kita perlu mengecek ulang kondisi yang sama setelah inner loop selesai. Tanpa ini, pengunjung akan "pindah lantai" meski waktunya sudah habis.

---

═══════════════════════════════════════════════════════════════════════

# ⚔️ PERBANDINGAN: Versi Saya vs Versi Coddy

═══════════════════════════════════════════════════════════════════════

| Aspek | ❌ Versi Saya | ✅ Versi Coddy |
|-------|:------------:|:-------------:|
| Urutan cek di inner loop | Waktu dulu → Skip | Skip dulu → Waktu |
| Logika simulasi | Kurang tepat di edge case | Lebih tepat ✅ |
| Double break pattern | Ada ✅ | Ada ✅ |
| Hasil mayoritas kasus | Sama | Sama |
| Hasil edge case | Berbeda ⚠️ | Lebih benar ✅ |

### Skenario Edge Case yang Berbeda:
```
remainingTime = 20 (tidak cukup)
exhibit berikutnya = "Fossils" (ada di skipList)

Versi Saya  → cek waktu dulu → break ❌ (berhenti padahal harusnya skip)
Versi Coddy → cek skip dulu  → continue ⏭️ (lanjut ke exhibit berikutnya)
```

---

═══════════════════════════════════════════════════════════════════════

# 🧪 TEST CASES LENGKAP

═══════════════════════════════════════════════════════════════════════

```javascript
function exploreMuseum(totalTime, exhibits, skipExhibits) {
  const visitedExhibits = [];
  let remainingTime = totalTime;

  for (let floor = 0; floor < exhibits.length; floor++) {
    for (let exhibit = 0; exhibit < exhibits[floor].length; exhibit++) {
      const currentExhibit = exhibits[floor][exhibit];

      if (skipExhibits.includes(currentExhibit)) {
        continue;
      }

      if (remainingTime < 30) {
        break;
      }

      visitedExhibits.push(currentExhibit);
      remainingTime -= 30;
    }

    if (remainingTime < 30) {
      break;
    }
  }

  return visitedExhibits;
}
```

```javascript
const testCases = [
  // Normal case
  { input: [90, [["Dinosaurs", "Fossils"], ["Gems", "Minerals"]], ["Fossils"]], expected: ["Dinosaurs", "Gems", "Minerals"], desc: "Normal: ada exhibit yang di-skip" },
  // Waktu tidak cukup
  { input: [20, [["Dinosaurs"]], []], expected: [], desc: "Waktu tidak cukup sama sekali" },
  // Semua di-skip
  { input: [90, [["Dinosaurs"]], ["Dinosaurs"]], expected: [], desc: "Semua exhibit di-skip" },
  // Waktu habis di tengah
  { input: [60, [["Dinosaurs", "Fossils"], ["Gems", "Minerals"]], []], expected: ["Dinosaurs", "Fossils"], desc: "Waktu habis di tengah perjalanan" },
  // Edge case
  { input: [0, [["Dinosaurs"]], []], expected: [], desc: "Edge case: totalTime = 0" },
]

testCases.forEach(({ input, expected, desc }, index) => {
  const result = exploreMuseum(...input)
  const status = JSON.stringify(result) === JSON.stringify(expected) ? "✅ PASS" : "❌ FAIL"
  console.log(`Test Case #${index + 1}: ${status} - ${desc} | exploreMuseum(${input[0]}) = ${JSON.stringify(result)}`)
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
│  💡 Urutan Kondisi Itu Penting                                      │
│     Selalu pikirkan: "mana yang harus dicek lebih dulu?"            │
│     Skip tidak butuh waktu → cek skip SEBELUM cek waktu            │
├─────────────────────────────────────────────────────────────────────┤
│  💡 break Hanya Keluar dari Loop Terdalam                           │
│     Untuk nested loop, selalu tambahkan break di setiap level       │
│     jika ingin menghentikan semua loop sekaligus                    │
├─────────────────────────────────────────────────────────────────────┤
│  💡 continue vs break                                               │
│     continue → lewati iterasi ini, lanjut ke berikutnya            │
│     break    → hentikan loop sepenuhnya                            │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Selalu Test Edge Cases                                          │
│     totalTime = 0, semua di-skip, array kosong                      │
│     Perbedaan kecil dalam logika bisa terlihat hanya di edge case   │
└─────────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🎯 Quick Reference Card

| Kondisi | Statement | Efek |
|---------|-----------|------|
| Exhibit ada di skipList | `continue` | Lewati, lanjut ke exhibit berikutnya |
| Waktu < 30 (inner) | `break` | Hentikan inner loop |
| Waktu < 30 (outer) | `break` | Hentikan outer loop |
| Exhibit valid + waktu cukup | `push` + `-= 30` | Catat kunjungan |

---

Made with ❤️ for learners

**Happy Coding! 🚀**

</div>
