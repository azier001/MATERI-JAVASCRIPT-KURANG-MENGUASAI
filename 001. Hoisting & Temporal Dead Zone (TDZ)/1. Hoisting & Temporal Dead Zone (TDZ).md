# 🚀 Hoisting & Temporal Dead Zone (TDZ)

## 📚 Pengenalan

Pernahkah kamu bertanya-tanya kenapa kadang variabel bisa diakses sebelum dideklarasikan, tapi kadang malah error? Jawabannya ada di konsep **Hoisting** dan **Temporal Dead Zone**!

---

## 🎯 Apa itu Hoisting?

**Hoisting** adalah perilaku JavaScript yang "mengangkat" deklarasi variabel dan fungsi ke **atas scope** mereka sebelum kode dijalankan.

### 🔍 Analoginya Seperti Ini:

Bayangkan kamu menulis daftar belanja:
1. Kamu tulis "beli apel" di tengah kertas
2. JavaScript otomatis "memindahkan" tulisan "apel (belum tau isinya)" ke atas kertas
3. Baru kemudian ngisi nilainya saat baca baris aslinya

---

## 🔴 Hoisting dengan `var`

### Contoh Kode:

```javascript
console.log(nama); // Output: undefined
var nama = "Budi";
console.log(nama); // Output: "Budi"
```

### 🤔 Yang Terjadi di Balik Layar:

JavaScript sebenarnya membacanya seperti ini:

```javascript
var nama; // Deklarasi diangkat ke atas
console.log(nama); // undefined (sudah ada variabelnya, tapi belum diisi)
nama = "Budi"; // Baru diisi nilainya
console.log(nama); // "Budi"
```

### ✅ Kesimpulan `var`:
- **Deklarasi** di-hoist (diangkat)
- **Nilai** tidak di-hoist
- Sebelum diisi, nilainya `undefined`
- **Tidak error**, hanya `undefined`

---

## 🟢 Hoisting dengan `let` & `const`

### Contoh Kode:

```javascript
console.log(umur); // ❌ ReferenceError!
let umur = 25;
```

```javascript
console.log(PI); // ❌ ReferenceError!
const PI = 3.14;
```

### 🚨 Kenapa Error?

`let` dan `const` juga di-hoist, TAPI mereka masuk ke **Temporal Dead Zone (TDZ)**!

---

## ⏰ Apa itu Temporal Dead Zone (TDZ)?

**TDZ** adalah zona waktu di mana variabel sudah dideklarasikan (secara internal), tapi **belum bisa diakses**.

### 📍 Visualisasi TDZ:

```javascript
// ⚠️ TDZ DIMULAI (zona berbahaya!)
// Variabel 'score' sudah ada, tapi belum bisa dipakai
console.log(score); // ❌ ReferenceError

// ⚠️ TDZ MASIH BERLANGSUNG
let x = 10;

// ✅ TDZ BERAKHIR (aman!)
let score = 100; 
console.log(score); // ✅ 100
```

### 🎯 Aturan TDZ:

1. **TDZ dimulai** dari awal scope
2. **TDZ berakhir** saat variabel dideklarasikan
3. Akses variabel di dalam TDZ = **Error!**

---

## 📊 Perbandingan `var`, `let`, `const`

| Aspek | `var` | `let` | `const` |
|-------|-------|-------|---------|
| **Di-hoist?** | ✅ Ya | ✅ Ya | ✅ Ya |
| **Punya TDZ?** | ❌ Tidak | ✅ Ya | ✅ Ya |
| **Bisa akses sebelum deklarasi?** | ✅ Ya (undefined) | ❌ Error | ❌ Error |
| **Bisa diubah nilainya?** | ✅ Ya | ✅ Ya | ❌ Tidak |
| **Scope** | Function scope | Block scope | Block scope |

---

## 🧪 Eksperimen Praktis

### 💻 Percobaan 1: `var` vs `let`

```javascript
function test1() {
    console.log(a); // undefined
    console.log(b); // ReferenceError
    
    var a = 10;
    let b = 20;
}
```

**Penjelasan:**
- `a` dengan `var`: bisa diakses, nilainya `undefined`
- `b` dengan `let`: error karena masih di TDZ

---

### 💻 Percobaan 2: Block Scope

```javascript
{
    // TDZ untuk 'x' dimulai
    console.log(x); // ReferenceError
    let x = 5; // TDZ berakhir
    console.log(x); // 5
}
```

---

### 💻 Percobaan 3: Function Hoisting

```javascript
// Fungsi juga di-hoist!
sapa(); // ✅ "Halo!" (fungsi declaration)

function sapa() {
    console.log("Halo!");
}
```

```javascript
// Tapi function expression tidak!
halo(); // ❌ ReferenceError

const halo = function() {
    console.log("Halo!");
};
```

---

## 🎓 Variasi Lainnya untuk Dicoba

### 🔹 Variasi 1: Nested Scope

```javascript
let x = "luar";

function contoh() {
    console.log(x); // ReferenceError (TDZ!)
    let x = "dalam";
    console.log(x); // "dalam"
}
```

**Kenapa error?** Karena `let x` di dalam fungsi membuat TDZ baru!

---

### 🔹 Variasi 2: `const` di Loop

```javascript
// ❌ Error
for (const i = 0; i < 3; i++) {
    console.log(i); // Error karena i++ mencoba ubah const
}

// ✅ Boleh
const arr = [1, 2, 3];
for (const num of arr) {
    console.log(num); // OK! const baru tiap iterasi
}
```

---

### 🔹 Variasi 3: TDZ dengan Default Parameter

```javascript
function buatUser(nama = password) { // ReferenceError!
    let password = "rahasia";
    return nama;
}
```

**Kenapa error?** Parameter dievaluasi sebelum `password` dideklarasikan!

---

## 💡 Tips & Best Practices

### ✅ **LAKUKAN:**
1. Selalu deklarasikan variabel di **awal scope**
2. Gunakan `const` secara default
3. Gunakan `let` hanya jika perlu reassign
4. Hindari `var` di kode modern

### ❌ **JANGAN:**
1. Akses variabel sebelum deklarasi
2. Bergantung pada hoisting
3. Campur `var` dengan `let`/`const`

---

## 🎯 Kesimpulan

### 🔑 Poin Penting:

1. **Hoisting** = Deklarasi "diangkat" ke atas scope
2. **`var`** = Di-hoist tanpa TDZ (jadi `undefined`)
3. **`let`/`const`** = Di-hoist dengan TDZ (jadi error jika diakses lebih awal)
4. **TDZ** = Zona waktu antara awal scope sampai deklarasi variabel

### 📝 Quote untuk Diingat:

> *"Hoisting itu seperti JavaScript membaca kode dua kali: pertama untuk tahu ada variabel apa aja, kedua untuk jalanin kodemu."*

---

## 🚀 Latihan Mandiri

Coba prediksi output dari kode ini:

```javascript
function latihan() {
    console.log(a); // ?
    console.log(b); // ?
    console.log(c); // ?
    
    var a = 1;
    let b = 2;
    const c = 3;
}
```

**Jawaban:** `undefined`, `ReferenceError` (tidak sampai baris b), `ReferenceError`

---

## 📖 Sumber Belajar Lanjutan

- MDN Web Docs: Hoisting
- JavaScript.info: Variable Scope
- You Don't Know JS: Scope & Closures

---

**🎉 Selamat! Sekarang kamu paham Hoisting & TDZ!**

*Keep coding, keep learning! 💻✨*
