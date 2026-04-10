# 05 - Memeriksa Status Response 🚦

> **Tujuan Pembelajaran**: Memahami cara cek apakah request berhasil atau gagal

---

## 🚦 HTTP Status Codes: Lampu Lalu Lintas Internet!

Setiap response dari server punya **status code** yang memberitahu apakah request berhasil atau tidak.

```
🟢 200-299 = Berhasil! ✅
🟡 300-399 = Redirect (pindah alamat) 🔄
🔴 400-499 = Error dari client (kamu) ❌
🔴 500-599 = Error dari server 💥
```

---

## 📊 Status Codes yang Sering Muncul

### ✅ Success (200-299)

| Code | Arti | Penjelasan |
|------|------|------------|
| **200** | OK | Berhasil! Data dikirim dengan baik |
| **201** | Created | Berhasil buat data baru (POST) |
| **204** | No Content | Berhasil tapi tidak ada data (DELETE) |

### ❌ Client Error (400-499)

| Code | Arti | Penjelasan |
|------|------|------------|
| **400** | Bad Request | Request kamu salah format |
| **401** | Unauthorized | Perlu login dulu |
| **403** | Forbidden | Tidak punya akses |
| **404** | Not Found | URL tidak ditemukan |
| **429** | Too Many Requests | Terlalu banyak request |

### 💥 Server Error (500-599)

| Code | Arti | Penjelasan |
|------|------|------------|
| **500** | Internal Server Error | Server error (bukan salah kamu) |
| **502** | Bad Gateway | Gateway bermasalah |
| **503** | Service Unavailable | Server sedang maintenance |

---

## 🔍 Cara Cek Status di Fetch

### Property `response.status`

```javascript
const response = await fetch(url);

console.log(response.status);  // Angka: 200, 404, 500, dll
```

### Property `response.ok`

```javascript
const response = await fetch(url);

console.log(response.ok);  
// true jika status 200-299 ✅
// false jika status lainnya ❌
```

**`response.ok` adalah cara paling mudah!** 🎯

---

## 💻 Contoh: Cek Status Dasar

### Cara 1: Pakai `response.ok` (Recommended! ⭐)

```javascript
async function ambilData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (response.ok) {
      // ✅ Berhasil! (200-299)
      const data = await response.json();
      console.log('✅ Sukses!', data);
    } else {
      // ❌ Gagal! (400-599)
      console.log('❌ Gagal! Status:', response.status);
    }
    
  } catch (error) {
    console.error('💥 Error:', error);
  }
}

ambilData();
```

---

### Cara 2: Pakai `response.status` (Lebih Detail)

```javascript
async function ambilData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/999');
    
    // Cek status code spesifik
    if (response.status === 200) {
      console.log('✅ OK!');
      const data = await response.json();
      console.log(data);
    } else if (response.status === 404) {
      console.log('❌ Data tidak ditemukan!');
    } else if (response.status === 500) {
      console.log('💥 Server error!');
    } else {
      console.log('⚠️ Status:', response.status);
    }
    
  } catch (error) {
    console.error('💥 Network error:', error);
  }
}

ambilData();
```

---

## 🎨 Visualisasi Flow Cek Status

```
fetch(url)
    ↓
response diterima
    ↓
┌───────────────────┐
│ Cek response.ok?  │
└────────┬──────────┘
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    ↓         ↓
┌────────┐ ┌──────────┐
│ Parse  │ │  Handle  │
│  Body  │ │  Error   │
└────────┘ └──────────┘
    │         │
    ↓         ↓
 ✅ Sukses  ❌ Gagal
```

---

## 💡 Best Practice: Throw Error Kalau Gagal

```javascript
async function ambilData() {
  try {
    const response = await fetch(url);
    
    // Throw error kalau tidak OK
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    // Kalau sampai sini, pasti OK!
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error:', error.message);
    // Handle error di sini
  }
}
```

**Ini cara paling rapi!** 👍

---

## 🎯 Contoh Praktis: Handle Berbagai Status

```javascript
async function ambilUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    // Handle berbagai status
    switch(response.status) {
      case 200:
        const user = await response.json();
        console.log('✅ User ditemukan:', user.name);
        return user;
        
      case 404:
        console.log('❌ User tidak ada');
        return null;
        
      case 500:
        console.log('💥 Server error, coba lagi nanti');
        return null;
        
      default:
        console.log('⚠️ Status tidak dikenal:', response.status);
        return null;
    }
    
  } catch (error) {
    console.error('💥 Network error:', error.message);
    return null;
  }
}

// Test
ambilUser(1);    // ✅ Ada
ambilUser(999);  // ❌ Tidak ada
```

---

## 🎭 Contoh: Tampilkan Pesan Error ke User

```javascript
async function ambilDataDenganUI() {
  const resultDiv = document.getElementById('result');
  
  try {
    // Show loading
    resultDiv.innerHTML = '⏳ Loading...';
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (response.ok) {
      // ✅ Sukses
      const post = await response.json();
      resultDiv.innerHTML = `
        <div style="color: green;">
          ✅ Berhasil!
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `;
    } else {
      // ❌ Gagal
      resultDiv.innerHTML = `
        <div style="color: red;">
          ❌ Gagal memuat data!<br>
          Status: ${response.status} ${response.statusText}
        </div>
      `;
    }
    
  } catch (error) {
    // 💥 Network error
    resultDiv.innerHTML = `
      <div style="color: orange;">
        💥 Error: ${error.message}<br>
        Cek koneksi internet Anda!
      </div>
    `;
  }
}
```

---

## 🔥 Property Response Lainnya

Selain `status` dan `ok`, ada property lain yang berguna:

```javascript
const response = await fetch(url);

console.log(response.status);       // 200
console.log(response.statusText);   // "OK"
console.log(response.ok);           // true
console.log(response.url);          // URL lengkap
console.log(response.headers);      // Headers object
console.log(response.type);         // "cors", "basic", dll
console.log(response.redirected);   // true jika ada redirect
```

---

## 🎯 Pattern: Reusable Fetch Function

Buat function yang bisa dipakai berulang:

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    // Cek status
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Parse JSON
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    console.error('Fetch error:', error.message);
    return { success: false, error: error.message };
  }
}

// Pakai function
const result = await fetchData('https://api.example.com/data');

if (result.success) {
  console.log('Data:', result.data);
} else {
  console.log('Error:', result.error);
}
```

**Simpan pattern ini, sangat berguna!** 💎

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Mikir Fetch Throw Error Kalau Status 404/500
```javascript
// ❌ SALAH! Fetch TIDAK throw error untuk status 404/500
try {
  const response = await fetch(url);
  const data = await response.json();  // Bisa parse error page!
} catch (error) {
  // Ini hanya catch network error, bukan status error!
}

// ✅ BENAR - Harus cek manual
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Status: ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  // Sekarang catch semua error
}
```

**PENTING:** Fetch hanya throw error kalau **network error**, tidak untuk status error! 🚨

---

### 2️⃣ Tidak Cek Status Sebelum Parse
```javascript
// ❌ SALAH! Langsung parse
const response = await fetch(url);
const data = await response.json();  // Error kalau status 404/500!

// ✅ BENAR - Cek dulu
const response = await fetch(url);
if (response.ok) {
  const data = await response.json();
}
```

---

### 3️⃣ Cuma Pakai try-catch Tanpa Cek Status
```javascript
// ❌ SALAH! try-catch tidak catch status error
try {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);  // Bisa jadi error page HTML!
} catch (error) {
  console.log('Error');  // Tidak akan jalan kalau status 404!
}

// ✅ BENAR - Kombinasi status check + try-catch
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Request failed');
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.log('Error:', error);  // Sekarang catch semua!
}
```

---

### 4️⃣ Lupa Handle Network Error
```javascript
// ❌ SALAH! Tidak ada try-catch
const response = await fetch(url);  // Crash kalau offline!

// ✅ BENAR
try {
  const response = await fetch(url);
  // ...
} catch (error) {
  console.log('Network error atau offline!');
}
```

---

## 🎯 Latihan Mini

**Challenge:** Buat function yang:
1. Fetch data dari API
2. Kalau status 200: tampilkan "Sukses!"
3. Kalau status 404: tampilkan "Data tidak ditemukan"
4. Kalau status lain: tampilkan status code-nya
5. Handle network error

Test dengan URL ini:
```
Sukses: https://jsonplaceholder.typicode.com/posts/1
404: https://jsonplaceholder.typicode.com/posts/99999
```

<details>
<summary>💡 Lihat Solusi</summary>

```javascript
async function testStatus(url) {
  try {
    console.log('🔍 Fetching:', url);
    
    const response = await fetch(url);
    
    // Cek berbagai status
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ Sukses!');
      console.log('Data:', data);
    } else if (response.status === 404) {
      console.log('❌ Data tidak ditemukan (404)');
    } else {
      console.log(`⚠️ Status: ${response.status} - ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('💥 Network error:', error.message);
  }
  
  console.log('---');
}

// Test
testStatus('https://jsonplaceholder.typicode.com/posts/1');      // Sukses
testStatus('https://jsonplaceholder.typicode.com/posts/99999');  // 404
```
</details>

---

## 🏆 Kesimpulan

✅ **Status codes** memberitahu hasil request (200, 404, 500, dll)

✅ Gunakan `response.ok` untuk cek berhasil/gagal dengan mudah

✅ **Fetch TIDAK throw error** untuk status 404/500!

✅ Harus **manual cek status** dengan `if (!response.ok)`

✅ Kombinasikan **status check** + **try-catch** untuk error handling lengkap

✅ **Pattern:** Cek status → Throw error → Catch di try-catch

---

## 🎓 Selanjutnya

Di file berikutnya (**06-response-headers.md**), kita akan belajar:
- 📋 Apa itu headers?
- 🔍 Cara membaca headers dari response
- 🎯 Headers yang sering digunakan
- 💡 Kapan perlu cek headers

**Siap lanjut?** 🚀

---

### 📌 Template Error Handling

```javascript
// Template Lengkap dengan Error Handling:
async function fetchSafe(url) {
  try {
    const response = await fetch(url);
    
    // Cek status
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Parse body
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error:', error.message);
    throw error;  // Re-throw untuk caller
  }
}
```

**Gunakan template ini untuk fetch yang aman!** 🛡️
