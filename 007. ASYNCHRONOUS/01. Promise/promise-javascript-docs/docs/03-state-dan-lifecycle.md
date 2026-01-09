# 03 - State dan Lifecycle Promise

## 📌 Apa itu State?

**State** adalah status atau kondisi Promise pada suatu waktu. Setiap Promise memiliki state yang menunjukkan apakah operasinya masih berjalan, sudah selesai, atau gagal.

---

## 🔄 3 State Promise

Promise memiliki **3 state** yang mungkin:

### 1️⃣ Pending (Menunggu)

```plaintext
⏳ PENDING
└─ Kondisi awal
└─ Operasi masih berjalan
└─ Belum ada hasil
```

**Contoh:**
```javascript
let promise = new Promise(function(resolve, reject) {
  // Masih proses, belum panggil resolve/reject
  setTimeout(() => resolve("OK"), 3000);
});

console.log(promise); // Promise { <pending> }
```

---

### 2️⃣ Fulfilled (Berhasil)

```plaintext
✅ FULFILLED
└─ Operasi selesai dengan sukses
└─ resolve() sudah dipanggil
└─ Ada nilai hasil
```

**Contoh:**
```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("Berhasil!");
});

console.log(promise); // Promise { 'Berhasil!' }
```

---

### 3️⃣ Rejected (Gagal)

```plaintext
❌ REJECTED
└─ Operasi gagal
└─ reject() sudah dipanggil
└─ Ada error
```

**Contoh:**
```javascript
let promise = new Promise(function(resolve, reject) {
  reject(new Error("Gagal!"));
});

console.log(promise); // Promise { <rejected> Error: Gagal! }
```

---

## 🎯 Lifecycle Promise

Promise mengalami perjalanan hidup (lifecycle) dari satu state ke state lainnya:

```plaintext
        ┌─────────────┐
        │   PENDING   │  ← Kondisi awal
        └──────┬──────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
  ┌──────────┐  ┌──────────┐
  │FULFILLED │  │ REJECTED │  ← Kondisi akhir
  └──────────┘  └──────────┘
  
  resolve()      reject()
```

**Aturan penting:**
- Semua Promise dimulai dari **pending**
- Hanya bisa berubah **1 kali** ke fulfilled ATAU rejected
- Setelah berubah, **tidak bisa berubah lagi** (immutable)

---

## 📦 Internal Properties

Promise punya 2 properti internal yang tidak bisa diakses langsung:

### 1️⃣ Property `state`

Menyimpan status Promise saat ini.

```javascript
// Kita tidak bisa akses langsung:
// promise.state ❌

// Tapi bisa lihat lewat console:
console.log(promise); // Lihat statusnya
```

### 2️⃣ Property `result`

Menyimpan nilai hasil atau error.

```javascript
// Kita tidak bisa akses langsung:
// promise.result ❌

// Tapi bisa akses lewat .then() atau .catch()
```

---

## 💡 Contoh Perubahan State

### Dari Pending ke Fulfilled

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log("State: pending");
  
  setTimeout(() => {
    resolve("Selesai!");
    console.log("State: fulfilled");
  }, 2000);
});

// Detik 0: pending
// Detik 2: fulfilled
```

**Perubahan internal properties:**

| Waktu | state | result |
|-------|-------|--------|
| Awal | `"pending"` | `undefined` |
| Setelah resolve | `"fulfilled"` | `"Selesai!"` |

---

### Dari Pending ke Rejected

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log("State: pending");
  
  setTimeout(() => {
    reject(new Error("Error!"));
    console.log("State: rejected");
  }, 2000);
});

// Detik 0: pending
// Detik 2: rejected
```

**Perubahan internal properties:**

| Waktu | state | result |
|-------|-------|--------|
| Awal | `"pending"` | `undefined` |
| Setelah reject | `"rejected"` | `Error: Error!` |

---

## 🔒 State Bersifat Final

Sekali Promise berubah ke fulfilled atau rejected, **tidak bisa berubah lagi**:

```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("Hasil pertama");
  
  // Semua ini DIABAIKAN:
  resolve("Hasil kedua");     // ❌ Diabaikan
  reject(new Error("Error")); // ❌ Diabaikan
  resolve("Hasil ketiga");    // ❌ Diabaikan
});

// Yang dipakai hanya: "Hasil pertama"
```

**Visualisasi:**

```plaintext
┌──────────┐
│ PENDING  │
└────┬─────┘
     │
     │ resolve("Hasil pertama") ✅
     ▼
┌──────────┐
│FULFILLED │ ← LOCKED! Tidak bisa berubah lagi
└──────────┘
     ✕
     │ resolve("Hasil kedua") ❌ Diabaikan
     │ reject(error) ❌ Diabaikan
```

---

## 🎭 Istilah Penting

### Settled vs Pending

- **Pending**: Promise yang masih menunggu
- **Settled**: Promise yang sudah selesai (fulfilled atau rejected)

```javascript
// Pending
let promise1 = new Promise((resolve) => {
  setTimeout(() => resolve("OK"), 1000);
});

// Settled (fulfilled)
let promise2 = new Promise((resolve) => {
  resolve("OK");
});

// Settled (rejected)
let promise3 = new Promise((resolve, reject) => {
  reject(new Error("Gagal"));
});
```

---

## 🔍 Cara Melihat State

### Di Browser Console

```javascript
let promise = new Promise((resolve) => {
  setTimeout(() => resolve("OK"), 2000);
});

console.log(promise); // Klik untuk expand dan lihat [[PromiseState]]
```

### Dengan .then() dan .catch()

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Berhasil!"), 1000);
});

promise.then(result => {
  console.log("Promise fulfilled dengan:", result);
});
```

---

## ⚡ Contoh Praktis

### Simulasi API Request

```javascript
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    console.log(`[PENDING] Mengambil data user ${userId}...`);
    
    setTimeout(() => {
      if (userId > 0) {
        console.log("[FULFILLED] Data ditemukan!");
        resolve({ id: userId, name: "John" });
      } else {
        console.log("[REJECTED] User tidak valid!");
        reject(new Error("Invalid user ID"));
      }
    }, 2000);
  });
}

// Test:
let request1 = fetchUser(1);   // Akan fulfilled
let request2 = fetchUser(-1);  // Akan rejected
```

---

## 📊 Diagram Lengkap

```plaintext
┌─────────────────────────────────────────────┐
│         Promise Lifecycle                    │
└─────────────────────────────────────────────┘

  new Promise()
       │
       ▼
  ┌─────────┐
  │ PENDING │  state: "pending"
  └────┬────┘  result: undefined
       │
       │ Executor selesai
       │
    ┌──┴───┐
    │      │
    ▼      ▼
┌─────┐  ┌─────┐
│ resolve() │  │ reject() │
└─────┘  └─────┘
    │      │
    ▼      ▼
┌──────────┐  ┌──────────┐
│FULFILLED │  │ REJECTED │
└──────────┘  └──────────┘
state: "fulfilled"  state: "rejected"
result: value       result: error
```

---

## 📝 Ringkasan

- Promise memiliki 3 state: **pending**, **fulfilled**, **rejected**
- Semua Promise dimulai dari **pending**
- State hanya bisa berubah **1 kali** (final/immutable)
- **Fulfilled** = operasi berhasil (resolve dipanggil)
- **Rejected** = operasi gagal (reject dipanggil)
- **Settled** = sudah selesai (fulfilled atau rejected)
- Property `state` dan `result` adalah internal, tidak bisa diakses langsung

---

**File sebelumnya:** `02-membuat-promise.md`

**File selanjutnya:** `04-aturan-penting.md`

Kita akan pelajari aturan-aturan penting dalam menggunakan Promise!
