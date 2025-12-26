# 📚 Dokumentasi Lengkap: Belajar Sorting Multi-Kriteria JavaScript

> **Dokumentasi Pribadi** - Dari Pemula untuk Pemula 🚀

---

## 📑 Daftar Isi

- [Pengenalan](#pengenalan)
- [Challenge: Organize Backup Files](#challenge)
- [Test Cases](#test-cases)
- [Percobaan Pertama - Kesalahan Umum](#percobaan-pertama)
- [Mengapa Kode Pertama Salah?](#analisis-kesalahan)
- [Memahami Fungsi Sort](#memahami-sort)
- [Pseudocode - Rencana Solusi](#pseudocode)
- [Step-by-Step Coding](#step-by-step)
  - [Step 1: Struktur Dasar](#step-1)
  - [Step 2: Hitung Selisih Importance](#step-2)
  - [Step 3: Logika Kondisional](#step-3)
- [Percobaan Kedua - Hampir Benar](#percobaan-kedua)
- [Solusi Final - Kode yang Benar](#solusi-final)
- [Penjelasan Detail dengan Visualisasi](#penjelasan-detail)
- [Variasi Kode - Ternary Operator](#variasi-kode)
- [Rangkuman & Tips](#rangkuman)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Dokumentasi ini adalah **catatan belajar pribadi** tentang bagaimana mengurutkan array dengan **multi-kriteria** di JavaScript. 

### 🎓 Yang Akan Dipelajari:
- ✅ Cara kerja fungsi `.sort()` dengan comparison function
- ✅ Sorting berdasarkan 2 kriteria sekaligus
- ✅ Kesalahan umum yang sering terjadi
- ✅ Step-by-step dari nol sampai solusi final

---

<a name="challenge"></a>
## 💼 Challenge: Organize Backup Files

### 📋 Deskripsi Problem

Buatlah fungsi `organizeBackupFiles` yang:
- **Input**: Array of objects (file dengan `name`, `size`, `importance`)
- **Output**: Array of strings (nama file yang sudah diurutkan)

### 🎯 Aturan Sorting:
1. **Prioritas 1**: Sort berdasarkan `importance` (yang **besar** duluan - descending)
2. **Prioritas 2**: Jika `importance` sama, sort berdasarkan `size` (yang **kecil** duluan - ascending)

### 📝 Template Kode

```javascript
function organizeBackupFiles(files) {
    // Write code here
}
```

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Test Case 1: Basic Sorting
```javascript
const files1 = [
    { name: "report.pdf", size: 5, importance: 7 },
    { name: "photo.jpg", size: 2, importance: 7 },
    { name: "backup.zip", size: 10, importance: 9 }
];

// Expected output:
["backup.zip", "photo.jpg", "report.pdf"]

// Penjelasan: 
// - backup.zip importance 9 (tertinggi)
// - photo.jpg dan report.pdf sama-sama importance 7
//   diurutkan by size (2MB < 5MB)
```

### Test Case 2: Same Importance
```javascript
const files2 = [
    { name: "video.mp4", size: 100, importance: 5 },
    { name: "doc.txt", size: 1, importance: 5 },
    { name: "image.png", size: 50, importance: 5 }
];

// Expected output:
["doc.txt", "image.png", "video.mp4"]

// Penjelasan: Semua importance 5
// Diurutkan by size (1 < 50 < 100)
```

### Test Case 3: Mixed Priorities ⭐
```javascript
const files3 = [
    { name: "log.txt", size: 3, importance: 2 },
    { name: "database.sql", size: 20, importance: 10 },
    { name: "config.json", size: 1, importance: 10 },
    { name: "temp.tmp", size: 5, importance: 1 }
];

// Expected output:
["config.json", "database.sql", "log.txt", "temp.tmp"]

// Penjelasan: 
// - importance 10: config.json (1MB) < database.sql (20MB)
// - importance 2: log.txt (3MB)
// - importance 1: temp.tmp (5MB)
```

---

<a name="percobaan-pertama"></a>
## ❌ Percobaan Pertama - Kesalahan Umum

### Kode yang Saya Tulis:

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((productA, productB) => productB.importance - productA.importance)
    .sort((productA, productB) => productA.size - productB.size)
    .map((product) => product.name);
}
```

### 🔴 Hasil yang Didapat:
```javascript
// Output: ["log.txt", "config.json", "database.sql", "temp.tmp"]
// Expected: ["config.json", "database.sql", "log.txt", "temp.tmp"]
```

**SALAH!** ❌

---

<a name="analisis-kesalahan"></a>
## 🔍 Mengapa Kode Pertama Salah?

### 💡 Masalah Utama: Double Sort

```javascript
.sort((a, b) => b.importance - a.importance)  // Sort 1: by importance ✓
.sort((a, b) => a.size - b.size)              // Sort 2: by size
                                              // ❌ MENIMPA hasil sort 1!
```

### 📊 Visualisasi Kesalahan:

```
AWAL:
[log.txt, database.sql, config.json, temp.tmp]

SETELAH SORT 1 (by importance):
[database.sql, config.json, log.txt, temp.tmp] ✓ Benar!

SETELAH SORT 2 (by size):
[config.json, log.txt, temp.tmp, database.sql] ❌ Urutan importance hilang!
```

### 🎯 Pelajaran:

> **⚠️ JANGAN sort dua kali terpisah!**
> 
> Sort kedua akan **menimpa** hasil sort pertama. Kita perlu sorting dalam **SATU fungsi** dengan **SATU comparison function**.

---

<a name="memahami-sort"></a>
## 📖 Memahami Fungsi Sort

### 🔑 Cara Kerja `.sort()`

Fungsi `.sort()` membandingkan **2 item secara berpasangan** dan menentukan urutannya berdasarkan **return value**:

```javascript
files.sort((fileA, fileB) => {
  // Return sebuah angka:
  // NEGATIF → fileA di depan fileB
  // POSITIF → fileB di depan fileA
  // NOLL    → urutan tidak berubah
})
```

### 📊 Tabel Aturan Return Value:

| Return Value | Artinya | Hasil |
|--------------|---------|-------|
| **< 0** (negatif) | fileA lebih kecil | fileA di depan fileB |
| **> 0** (positif) | fileB lebih kecil | fileB di depan fileA |
| **= 0** (nol) | Sama | Urutan tidak berubah |

### 🎯 Contoh Sederhana:

```javascript
// Ascending (kecil ke besar)
[3, 1, 2].sort((a, b) => a - b)
// Result: [1, 2, 3]

// Descending (besar ke kecil)
[3, 1, 2].sort((a, b) => b - a)
// Result: [3, 2, 1]
```

---

<a name="pseudocode"></a>
## 📝 Pseudocode - Rencana Solusi

### 🎯 Logika yang Benar:

```
FUNCTION organizeBackupFiles(files):
    
    sorted_files = SORT files WITH comparison:
        
        COMPARE fileA and fileB:
            
            // 1️⃣ Bandingkan importance (descending)
            importance_diff = fileB.importance - fileA.importance
            
            // 2️⃣ Cek apakah importance berbeda
            IF importance_diff ≠ 0 THEN
                RETURN importance_diff
                // Gunakan ini untuk sorting
            
            // 3️⃣ Jika sama, bandingkan size (ascending)
            ELSE
                size_diff = fileA.size - fileB.size
                RETURN size_diff
            END IF
        
        END COMPARE
    
    END SORT
    
    // 4️⃣ Extract nama file saja
    file_names = MAP sorted_files to get "name"
    
    RETURN file_names
    
END FUNCTION
```

### 🔑 Kunci Utama:

> **Semua perbandingan dilakukan dalam SATU fungsi sort!**

---

<a name="step-by-step"></a>
## 🛠️ Step-by-Step Coding

<a name="step-1"></a>
### Step 1: Struktur Dasar

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((fileA, fileB) => {
      // Kita akan isi bagian ini
    })
    .map((file) => file.name);
}
```

✅ **Struktur sudah benar!**

---

<a name="step-2"></a>
### Step 2: Hitung Selisih Importance

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((fileA, fileB) => {
      const importanceDiff = fileB.importance - fileA.importance;
      // TODO: Tambahkan logika untuk size
    })
    .map((file) => file.name);
}
```

**Catatan:**
- `fileB - fileA` → **descending** (besar duluan)
- `fileA - fileB` → **ascending** (kecil duluan)

---

<a name="step-3"></a>
### Step 3: Logika Kondisional

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((fileA, fileB) => {
      const importanceDiff = fileB.importance - fileA.importance;
      
      // Cek apakah importance berbeda
      if (importanceDiff !== 0) {
        return importanceDiff;  // Gunakan importance
      } else {
        return ???;  // TODO: Bandingkan size
      }
    })
    .map((file) => file.name);
}
```

**Pertanyaan:** Apa yang harus di-return di bagian `else`?

---

<a name="percobaan-kedua"></a>
## ⚠️ Percobaan Kedua - Hampir Benar

### Kode yang Saya Tulis:

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((fileA, fileB) => {
      const importanceDiff = fileB.importance - fileA.importance;

      if (importanceDiff !== 0) {
        return importanceDiff;
      } else {
        fileB.importance - fileA.importance;  // ❌ Kesalahan!
      }
    })
    .map((file) => file.name);
}
```

### 🔴 Dua Kesalahan:

#### ❌ Kesalahan 1: Tidak Ada `return`
```javascript
else {
  fileB.importance - fileA.importance;  // Tidak ada return!
}
```

✅ **Harus:**
```javascript
else {
  return fileB.importance - fileA.importance;
}
```

#### ❌ Kesalahan 2: Salah Properti
Harusnya bandingkan **`size`**, bukan `importance` lagi!

✅ **Harus:**
```javascript
else {
  return fileA.size - fileB.size;  // Size ascending
}
```

---

<a name="solusi-final"></a>
## ✅ Solusi Final - Kode yang Benar

### 🎉 Kode Final:

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((fileA, fileB) => {
      const importanceDiff = fileB.importance - fileA.importance;

      if (importanceDiff !== 0) {
        return importanceDiff;
      } else {
        return fileA.size - fileB.size;
      }
    })
    .map((file) => file.name);
}
```

### ✅ Test dengan Files3:

```javascript
const files3 = [
  { name: 'log.txt', size: 3, importance: 2 },
  { name: 'database.sql', size: 20, importance: 10 },
  { name: 'config.json', size: 1, importance: 10 },
  { name: 'temp.tmp', size: 5, importance: 1 },
];

const result = organizeBackupFiles(files3);
console.log(result);

// Output: ["config.json", "database.sql", "log.txt", "temp.tmp"]
// ✅ BENAR!
```

---

<a name="penjelasan-detail"></a>
## 🔬 Penjelasan Detail dengan Visualisasi

### 📊 Contoh 1: Importance SAMA

**Membandingkan:**
```javascript
fileA = { name: "database.sql", size: 20, importance: 10 }
fileB = { name: "config.json", size: 1, importance: 10 }
```

#### Langkah 1️⃣: Hitung Selisih Importance
```javascript
const importanceDiff = fileB.importance - fileA.importance;
//                   = 10 - 10
//                   = 0  ← SAMA!
```

#### Langkah 2️⃣: Cek Kondisi
```javascript
if (importanceDiff !== 0) {
  // 0 !== 0 → FALSE ❌
  // Blok ini di-skip
}
```

#### Langkah 3️⃣: Masuk ke ELSE
```javascript
else {
  return fileA.size - fileB.size;
  //   = 20 - 1
  //   = 19  ← POSITIF!
}
```

#### 🎯 Hasil:
**Return 19 (POSITIF)** → fileB (`config.json`) di depan fileA (`database.sql`)

✅ **Urutan:** `["config.json", "database.sql"]`

---

### 📊 Contoh 2: Importance BERBEDA

**Membandingkan:**
```javascript
fileA = { name: "config.json", size: 1, importance: 10 }
fileB = { name: "log.txt", size: 3, importance: 2 }
```

#### Langkah 1️⃣: Hitung Selisih
```javascript
const importanceDiff = fileB.importance - fileA.importance;
//                   = 2 - 10
//                   = -8  ← NEGATIF!
```

#### Langkah 2️⃣: Cek Kondisi
```javascript
if (importanceDiff !== 0) {
  // -8 !== 0 → TRUE ✅
  return importanceDiff;  // Return -8
}
```

#### 🎯 Hasil:
**Return -8 (NEGATIF)** → fileA (`config.json`) di depan fileB (`log.txt`)

✅ **Urutan:** `["config.json", "log.txt"]`

**Blok `else` tidak dijalankan!** Karena importance sudah berbeda.

---

### 🎬 Visualisasi Lengkap Proses Sorting

```
📦 AWAL:
[
  { name: "log.txt", size: 3, importance: 2 },
  { name: "database.sql", size: 20, importance: 10 },
  { name: "config.json", size: 1, importance: 10 },
  { name: "temp.tmp", size: 5, importance: 1 }
]

🔄 PROSES SORT (beberapa comparison):

Compare: database.sql (imp:10, size:20) vs log.txt (imp:2, size:3)
  ├─ importanceDiff = 2 - 10 = -8 (negatif)
  └─ ✅ database.sql di depan

Compare: config.json (imp:10, size:1) vs database.sql (imp:10, size:20)
  ├─ importanceDiff = 10 - 10 = 0 (sama!)
  ├─ sizeDiff = 1 - 20 = -19 (negatif)
  └─ ✅ config.json di depan

Compare: log.txt (imp:2, size:3) vs temp.tmp (imp:1, size:5)
  ├─ importanceDiff = 1 - 2 = -1 (negatif)
  └─ ✅ log.txt di depan

✨ HASIL AKHIR:
["config.json", "database.sql", "log.txt", "temp.tmp"]
```

---

### 📋 Tabel Ringkasan

| Kondisi | importanceDiff | Yang Di-return | Hasil Urutan |
|---------|---------------|----------------|--------------|
| Importance **berbeda** | ≠ 0 | `importanceDiff` | Yang importance **lebih besar** di depan |
| Importance **sama** | = 0 | `fileA.size - fileB.size` | Yang size **lebih kecil** di depan |

---

<a name="variasi-kode"></a>
## 🎨 Variasi Kode - Ternary Operator

### Versi 1: Dengan Variable

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((fileA, fileB) => {
      const importanceDiff = fileB.importance - fileA.importance;
      return importanceDiff !== 0 ? importanceDiff : fileA.size - fileB.size;
    })
    .map((file) => file.name);
}
```

**Penjelasan:**
```javascript
condition ? valueIfTrue : valueIfFalse
```
- Jika `importanceDiff !== 0` (TRUE) → return `importanceDiff`
- Jika FALSE → return `fileA.size - fileB.size`

---

### Versi 2: Menggunakan OR Operator (||)

```javascript
function organizeBackupFiles(files) {
  return files
    .sort((fileA, fileB) => 
      fileB.importance - fileA.importance || fileA.size - fileB.size
    )
    .map((file) => file.name);
}
```

**Penjelasan:**
- Jika `fileB.importance - fileA.importance` menghasilkan **0** (falsy), maka JavaScript akan evaluasi bagian kanan `||`
- Jika **bukan 0** (truthy), langsung return nilai tersebut

**⚠️ Catatan:** Versi ini paling singkat tapi mungkin kurang jelas untuk pemula.

---

<a name="rangkuman"></a>
## 🎓 Rangkuman & Tips

### 💡 Poin Penting:

1. **Jangan sort dua kali terpisah** - akan saling menimpa hasil
2. **Semua kriteria dalam SATU comparison function**
3. **Return value menentukan urutan:**
   - Negatif → A di depan B
   - Positif → B di depan A
   - Nol → tidak berubah
4. **Multi-criteria:** Cek kriteria utama dulu, jika sama baru cek kriteria kedua

### 🎯 Analogi Sederhana:

Seperti mengurutkan tugas:
- **Priority tinggi** → kerjakan dulu (importance)
- **Priority sama** → kerjakan yang cepat/kecil dulu (size)

### ✅ Checklist Saat Coding:

- [ ] Apakah saya menggunakan **satu** `.sort()` saja?
- [ ] Apakah saya membandingkan **kriteria pertama** dulu?
- [ ] Apakah saya menggunakan **if/else** atau **ternary** untuk cek kondisi?
- [ ] Apakah arah sorting sudah benar? (ascending/descending)
- [ ] Apakah saya sudah test dengan berbagai test case?

### 🚀 Next Steps:

- Coba buat sorting dengan 3 kriteria
- Praktikkan dengan data real (products, users, dll)
- Pelajari sorting custom objects lainnya

---

## 🎉 Selamat!

Kamu sudah berhasil memahami **multi-criteria sorting** di JavaScript! 

Keep learning and happy coding! 💻✨
