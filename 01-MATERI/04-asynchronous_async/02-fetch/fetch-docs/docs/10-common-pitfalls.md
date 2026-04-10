# 10 - Common Pitfalls & Kesalahan Umum ⚠️

> **Tujuan Pembelajaran**: Menghindari kesalahan-kesalahan umum yang sering dilakukan pemula

---

## 🎯 Mengapa File Ini Penting?

Belajar dari kesalahan orang lain lebih cepat daripada belajar dari kesalahan sendiri! 

File ini berisi **kesalahan paling sering** yang dilakukan pemula (bahkan yang sudah mahir!) saat pakai Fetch API.

---

## 🚨 Pitfall #1: Fetch Tidak Throw Error untuk Status 404/500

### ❌ Kesalahan Paling Fatal!

```javascript
// ❌ SALAH! Ini tidak akan catch error 404/500
try {
  const response = await fetch('https://api.example.com/notfound');
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.log('Ini tidak akan jalan untuk 404!');
}
```

### 🐛 Kenapa Ini Bug?

Fetch **HANYA throw error** kalau:
- ❌ Network error (offline, timeout)
- ❌ CORS error
- ❌ Invalid URL

Fetch **TIDAK throw error** kalau:
- ✅ Status 404 (Not Found)
- ✅ Status 500 (Server Error)
- ✅ Status 403 (Forbidden)

### ✅ Solusi

```javascript
try {
  const response = await fetch('https://api.example.com/notfound');
  
  // CEK STATUS DULU!
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.log('Sekarang baru catch semua error!');
}
```

### 💡 Best Practice

```javascript
async function safeFetch(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  return response.json();
}
```

**SELALU cek `response.ok` atau `response.status`!** 🎯

---

## 🚨 Pitfall #2: Lupa Await di Tahap Kedua

### ❌ Bug yang Sering Muncul

```javascript
// ❌ SALAH! Lupa await
const response = await fetch(url);
const data = response.json();  // ❌ Ini Promise, bukan data!

console.log(data.name);  // undefined atau error!
console.log(data);  // [object Promise]
```

### ✅ Solusi

```javascript
// ✅ BENAR - Dua await
const response = await fetch(url);
const data = await response.json();  // ✅ Pakai await!

console.log(data.name);  // ✅ Dapat data yang benar
```

### 🔍 Cara Deteksi Bug Ini

```javascript
// Kalau console.log menunjukkan ini:
console.log(data);
// Output: Promise { <pending> }
// atau
// Output: [object Promise]

// Berarti kamu LUPA AWAIT!
```

---

## 🚨 Pitfall #3: Baca Body Dua Kali

### ❌ Error yang Membingungkan

```javascript
// ❌ SALAH!
const response = await fetch(url);
const data1 = await response.json();
const data2 = await response.json();  // ❌ ERROR!

// Error: Failed to execute 'json' on 'Response': body stream already read
```

### 🐛 Kenapa Error?

Response body adalah **stream** yang hanya bisa dibaca **SATU KALI**!

Bayangkan seperti air di gelas:
```
🥤 Response body (full)
   ↓ .json() pertama
🥛 Response body (empty)
   ↓ .json() kedua ❌
💥 ERROR! Gelas sudah kosong!
```

### ✅ Solusi

```javascript
// ✅ BENAR - Simpan di variable
const response = await fetch(url);
const data = await response.json();

// Pakai variable berkali-kali
console.log(data);
console.log(data);  // ✅ OK!
console.log(data.name);  // ✅ OK!
```

---

## 🚨 Pitfall #4: Kirim Object Langsung di Body

### ❌ Data Tidak Sampai ke Server

```javascript
// ❌ SALAH! Body harus string
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { name: 'John', age: 30 }  // ❌ Object!
});

// Server terima: "[object Object]"  💥
```

### ✅ Solusi

```javascript
// ✅ BENAR - JSON.stringify()
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', age: 30 })  // ✅ String!
});
```

### 💡 Ingat Rumus Ini

```
POST/PUT/PATCH + JSON = Butuh JSON.stringify()
```

---

## 🚨 Pitfall #5: Set Content-Type Saat Pakai FormData

### ❌ Upload File Gagal

```javascript
// ❌ SALAH!
const formData = new FormData();
formData.append('file', file);

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'  // ❌ JANGAN!
  },
  body: formData
});
```

### 🐛 Kenapa Salah?

Browser perlu set **boundary** otomatis:
```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
```

Kalau kamu set manual, boundary hilang!

### ✅ Solusi

```javascript
// ✅ BENAR - Biarkan kosong
const formData = new FormData();
formData.append('file', file);

fetch(url, {
  method: 'POST',
  // TIDAK ADA HEADERS!
  body: formData
});
```

**Rule:** FormData = No Content-Type! 🎯

---

## 🚨 Pitfall #6: Tidak Handle CORS Error

### ❌ Console Penuh Error Merah

```javascript
// Error di console:
// Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

### 🐛 Apa itu CORS?

**CORS** = Cross-Origin Resource Sharing

Browser meblokir request ke domain lain untuk keamanan.

```
❌ http://mysite.com → https://api.other.com
   (Beda domain, diblokir!)

✅ http://mysite.com → http://mysite.com/api
   (Sama domain, OK!)
```

### ✅ Solusi

**Di sisi CLIENT:**
```javascript
// Tidak bisa fix di client!
// Tapi bisa pakai proxy untuk development
```

**Di sisi SERVER:**
```javascript
// Server harus set headers:
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

### 💡 Workaround Development

Pakai proxy seperti:
- `https://cors-anywhere.herokuapp.com/`
- Setup proxy di webpack/vite

```javascript
// Temporary workaround
const url = 'https://cors-anywhere.herokuapp.com/https://api.example.com/data';
```

**Note:** Ini hanya untuk development, production harus fix di server!

---

## 🚨 Pitfall #7: Lupa Error Handling

### ❌ App Crash Tanpa Pesan

```javascript
// ❌ BURUK!
const response = await fetch(url);
const data = await response.json();
// Kalau error, app crash!
```

### ✅ Solusi - Always Use Try-Catch

```javascript
// ✅ BAIK
try {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  const data = await response.json();
  return data;
  
} catch (error) {
  console.error('Error:', error.message);
  // Tampilkan pesan user-friendly
  alert('Gagal mengambil data. Coba lagi nanti.');
  return null;
}
```

### 💡 Pattern Error Handling Lengkap

```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data tidak ditemukan');
      } else if (response.status === 500) {
        throw new Error('Server error, coba lagi nanti');
      } else if (response.status === 401) {
        throw new Error('Unauthorized, silakan login');
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    // Handle network errors
    if (error.message === 'Failed to fetch') {
      console.error('Network error, cek koneksi internet');
    }
    
    return { success: false, error: error.message };
  }
}
```

---

## 🚨 Pitfall #8: Tidak Pakai Loading State

### ❌ UI Bingung, User Klik Berkali-kali

```javascript
// ❌ Tidak ada feedback ke user
button.onclick = async () => {
  const data = await fetch(url);
  // User tidak tahu loading atau tidak
};
```

### ✅ Solusi - Kasih Feedback

```javascript
// ✅ Dengan loading state
button.onclick = async () => {
  // Disable button
  button.disabled = true;
  button.textContent = '⏳ Loading...';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Sukses
    button.textContent = '✅ Success!';
    
  } catch (error) {
    // Error
    button.textContent = '❌ Error';
    
  } finally {
    // Enable button lagi
    setTimeout(() => {
      button.disabled = false;
      button.textContent = 'Submit';
    }, 2000);
  }
};
```

---

## 🚨 Pitfall #9: Hardcode Sensitive Data

### ❌ Security Risk!

```javascript
// ❌ SANGAT BERBAHAYA!
const API_KEY = 'sk_live_abc123xyz789';  // Kelihatan semua orang!

fetch(url, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});
```

### ✅ Solusi

```javascript
// ✅ LEBIH AMAN
// 1. Pakai environment variable
const API_KEY = process.env.REACT_APP_API_KEY;

// 2. Atau ambil dari backend
const token = localStorage.getItem('auth_token');

// 3. Atau pakai server-side proxy
fetch('/api/proxy', {  // Request ke backend kamu sendiri
  headers: {
    'X-User-Token': userToken  // Backend yang handle API key
  }
});
```

**Jangan expose API key di frontend!** 🔐

---

## 🚨 Pitfall #10: Tidak Timeout Request

### ❌ Request Menggantung Selamanya

```javascript
// ❌ Fetch tidak punya timeout default!
const response = await fetch(url);
// Bisa tunggu selamanya kalau server lambat
```

### ✅ Solusi - Pakai AbortController

```javascript
// ✅ Dengan timeout 5 detik
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return await response.json();
    
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout!');
    }
    throw error;
  }
}

// Pakai
try {
  const data = await fetchWithTimeout('https://api.example.com/data', 5000);
  console.log(data);
} catch (error) {
  console.error('Error:', error.message);
}
```

---

## 🎯 Checklist Sebelum Fetch

Sebelum production, pastikan:

- ✅ Ada `if (!response.ok)` check
- ✅ Pakai `try-catch` untuk error handling
- ✅ Dua `await` (response dan body)
- ✅ `JSON.stringify()` kalau kirim JSON
- ✅ Tidak set Content-Type kalau pakai FormData
- ✅ Ada loading state untuk UI
- ✅ Tidak hardcode API key/token
- ✅ Ada timeout untuk request
- ✅ User-friendly error messages
- ✅ Test dengan offline mode

---

## 🐛 Debugging Tips

### 1️⃣ Console.log Response Object

```javascript
const response = await fetch(url);
console.log('Response:', response);
console.log('Status:', response.status);
console.log('OK?:', response.ok);
console.log('Headers:', response.headers);
```

### 2️⃣ Inspect Network Tab

```
Browser DevTools → Network Tab
- Lihat request headers
- Lihat response headers
- Lihat payload
- Lihat response body
```

### 3️⃣ Test dengan curl

```bash
curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
```

### 4️⃣ Pakai Postman/Insomnia

Test API dulu di Postman sebelum code!

---

## 💡 Best Practices Summary

```javascript
// ✅ Template AMAN dan LENGKAP
async function safeFetch(url, options = {}) {
  // Timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    // Fetch dengan timeout
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Cek status
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Parse body
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    // Handle errors
    if (error.name === 'AbortError') {
      return { success: false, error: 'Request timeout' };
    }
    
    return { success: false, error: error.message };
  }
}

// Pakai
const result = await safeFetch('https://api.example.com/data');

if (result.success) {
  console.log('Data:', result.data);
} else {
  console.error('Error:', result.error);
  alert('Gagal mengambil data!');
}
```

---

## 🏆 Kesimpulan

✅ **Fetch tidak throw error untuk status 404/500** - Harus cek manual!

✅ **Selalu pakai 2 await** - Untuk response dan body

✅ **Body stream cuma bisa dibaca 1x** - Simpan di variable

✅ **JSON.stringify() untuk POST JSON** - Body harus string

✅ **FormData tidak perlu Content-Type** - Browser set otomatis

✅ **CORS harus di-handle di server** - Tidak bisa fix di client

✅ **Always use try-catch** - Protect dari crash

✅ **Kasih loading feedback** - User experience penting

✅ **Jangan hardcode secrets** - Security first

✅ **Pakai timeout** - Jangan tunggu selamanya

---

## 🎓 Selanjutnya

Di file berikutnya (**11-latihan.md**), kita akan:
- 🎯 Praktek dengan exercises nyata
- 💪 Challenge dari mudah sampai sulit
- ✅ Solusi lengkap setiap exercise
- 🏆 Mini project menggunakan Fetch

**Siap praktek?** 🚀

---

### 📌 Quick Reference - Common Errors

```javascript
// Error 1: Fetch tidak throw untuk 404
if (!response.ok) throw new Error('HTTP error');

// Error 2: Lupa await kedua
const data = await response.json();  // Jangan lupa await!

// Error 3: Baca body 2x
const data = await response.json();  // Simpan di variable!

// Error 4: Object di body
body: JSON.stringify(data)  // Stringify!

// Error 5: FormData dengan Content-Type
// Jangan set Content-Type untuk FormData!

// Error 6-10: Lihat sections di atas
```

**Print reference ini dan tempel di meja!** 📝
