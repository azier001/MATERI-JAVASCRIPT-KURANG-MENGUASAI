# 04 - Aturan Penting Promise

## 📌 Aturan Fundamental

Memahami aturan-aturan ini akan membantumu menghindari bug dan menulis kode Promise yang benar.

---

## 🔒 Aturan 1: Hanya Satu Hasil

Promise **hanya bisa** memiliki satu hasil atau satu error. Panggilan kedua dan seterusnya akan diabaikan.

### ❌ Yang Salah

```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("Hasil pertama");
  resolve("Hasil kedua");     // ❌ Diabaikan
  reject(new Error("Error")); // ❌ Diabaikan
});

// Yang dipakai hanya: "Hasil pertama"
```

### ✅ Yang Benar

```javascript
let promise = new Promise(function(resolve, reject) {
  // Hanya panggil resolve ATAU reject SEKALI
  if (dataValid) {
    resolve("Berhasil");
  } else {
    reject(new Error("Gagal"));
  }
});
```

---

## 📥 Aturan 2: Hanya Satu Argumen

`resolve()` dan `reject()` hanya menerima **satu argumen**. Argumen tambahan akan diabaikan.

### ❌ Yang Salah

```javascript
let promise = new Promise(function(resolve, reject) {
  // Hanya argumen pertama yang dipakai
  resolve("Data 1", "Data 2", "Data 3");
  //         ↑         ↑         ↑
  //      dipakai   diabaikan diabaikan
});
```

### ✅ Yang Benar

```javascript
// Jika butuh kirim banyak data, gunakan object atau array
let promise = new Promise(function(resolve, reject) {
  resolve({
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3"
  });
});

// Atau gunakan array
let promise2 = new Promise(function(resolve, reject) {
  resolve(["Data 1", "Data 2", "Data 3"]);
});
```

---

## 🛑 Aturan 3: Gunakan Error Object

Saat reject, **sangat disarankan** menggunakan objek `Error` (atau turunannya).

### ⚠️ Kurang Baik

```javascript
let promise = new Promise(function(resolve, reject) {
  reject("Terjadi kesalahan"); // Bisa, tapi kurang baik
});
```

### ✅ Best Practice

```javascript
let promise = new Promise(function(resolve, reject) {
  reject(new Error("Terjadi kesalahan"));
});
```

**Kenapa?**
- Error object punya informasi lebih lengkap (stack trace)
- Lebih mudah debugging
- Standar yang umum digunakan

---

## ⚡ Aturan 4: Resolve/Reject Bisa Langsung

Tidak harus asynchronous! Promise bisa langsung selesai.

### Contoh: Data Sudah Ada

```javascript
function getDataFromCache(key) {
  return new Promise(function(resolve, reject) {
    let cachedData = cache[key];
    
    if (cachedData) {
      // Langsung resolve jika data ada
      resolve(cachedData);
    } else {
      // Fetch dari server (asynchronous)
      fetchFromServer(key).then(resolve).catch(reject);
    }
  });
}
```

### Contoh: Validasi Input

```javascript
function validateAge(age) {
  return new Promise(function(resolve, reject) {
    // Langsung reject jika tidak valid
    if (age < 0) {
      reject(new Error("Umur tidak boleh negatif"));
      return;
    }
    
    // Langsung resolve jika valid
    if (age >= 17) {
      resolve("Boleh buat KTP");
    } else {
      reject(new Error("Belum cukup umur"));
    }
  });
}
```

---

## 🔐 Aturan 5: State dan Result Internal

Property `state` dan `result` **tidak bisa diakses langsung**.

### ❌ Yang Salah

```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("OK");
});

console.log(promise.state);  // ❌ undefined
console.log(promise.result); // ❌ undefined
```

### ✅ Yang Benar

```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("OK");
});

// Gunakan .then() untuk akses result
promise.then(result => {
  console.log(result); // ✅ "OK"
});
```

---

## 🎯 Aturan 6: Executor Langsung Dijalankan

Executor dijalankan **segera** saat Promise dibuat, **bukan** saat `.then()` dipanggil.

### Contoh:

```javascript
console.log("1. Sebelum Promise");

let promise = new Promise(function(resolve, reject) {
  console.log("2. Executor jalan!");
  resolve("OK");
});

console.log("3. Setelah Promise");

promise.then(result => {
  console.log("4. Then handler");
});

// Output:
// 1. Sebelum Promise
// 2. Executor jalan!
// 3. Setelah Promise
// 4. Then handler
```

**Penjelasan urutan:**
1. Kode sebelum Promise jalan dulu
2. Promise dibuat → executor **langsung** jalan
3. Kode setelah Promise jalan
4. Handler `.then()` jalan (asynchronous)

---

## 🏗️ Best Practices

### 1️⃣ Selalu Handle Error

```javascript
// ❌ Buruk - Tidak handle error
somePromise.then(result => {
  console.log(result);
});

// ✅ Baik - Ada error handling
somePromise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

---

### 2️⃣ Return Promise dari Function

```javascript
// ✅ Baik - Return Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // ... logic
  });
}

// Bisa di-chain
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

---

### 3️⃣ Jangan Campur Callback dengan Promise

```javascript
// ❌ Buruk - Campur callback dan promise
function badFunction(callback) {
  return new Promise((resolve) => {
    // Bingung mau pakai callback atau promise?
  });
}

// ✅ Baik - Pilih salah satu
function goodFunction() {
  return new Promise((resolve, reject) => {
    // Pure promise
  });
}
```

---

### 4️⃣ Gunakan Meaningful Error Messages

```javascript
// ❌ Kurang jelas
reject(new Error("Error"));

// ✅ Lebih jelas
reject(new Error("Gagal mengambil data user dengan ID: " + userId));
```

---

## 📋 Checklist Aturan Promise

Saat membuat Promise, pastikan:

- ✅ Hanya panggil resolve/reject **sekali**
- ✅ Gunakan `new Error()` untuk reject
- ✅ Kirim hanya **satu argumen** ke resolve/reject
- ✅ Jangan akses `.state` atau `.result` langsung
- ✅ Ingat executor **langsung** dijalankan
- ✅ Selalu handle error dengan `.catch()`
- ✅ Return Promise dari function agar bisa di-chain

---

## ⚠️ Kesalahan Umum

### 1. Lupa Return Promise

```javascript
// ❌ Salah - Tidak return
function getData() {
  new Promise((resolve) => {
    resolve("data");
  });
}

let result = getData(); // undefined ❌

// ✅ Benar
function getData() {
  return new Promise((resolve) => {
    resolve("data");
  });
}

let result = getData(); // Promise ✅
```

### 2. Panggil Resolve Berkali-kali

```javascript
// ❌ Salah - Mengira bisa panggil berkali-kali
new Promise((resolve) => {
  resolve(1);
  resolve(2); // Diabaikan
  resolve(3); // Diabaikan
});
```

### 3. Tidak Gunakan Error Object

```javascript
// ⚠️ Kurang baik
reject("Error message");

// ✅ Lebih baik
reject(new Error("Error message"));
```

---

## 📝 Ringkasan

- Promise hanya bisa punya **satu hasil/error**
- `resolve()` dan `reject()` hanya terima **satu argumen**
- Gunakan `new Error()` untuk reject
- Executor **langsung jalan** saat Promise dibuat
- Property internal tidak bisa diakses langsung
- Selalu handle error dengan `.catch()`
- Return Promise dari function untuk chaining

---

**File sebelumnya:** `03-state-dan-lifecycle.md`

**File selanjutnya:** `05-menggunakan-then.md`

Kita akan belajar cara mengambil hasil dari Promise menggunakan `.then()`!
