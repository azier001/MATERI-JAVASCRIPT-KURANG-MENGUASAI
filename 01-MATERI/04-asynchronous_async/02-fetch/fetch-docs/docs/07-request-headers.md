# 07 - Request Headers 📤

> **Tujuan Pembelajaran**: Memahami cara mengirim custom headers ke server

---

## 🤔 Apa itu Request Headers?

**Request Headers** adalah **informasi tambahan** yang kamu kirim ke server saat melakukan request.

### 🎭 Analogi: Surat Lamaran Kerja

```
📬 Amplop (Headers):
   - Dari: Nama kamu
   - Bahasa: Indonesia
   - Token: ABC123 (ID kamu)
   - Format yang diminta: JSON

📄 Isi Surat (Body):
   - Data yang kamu kirim
```

Headers memberitahu server **siapa kamu** dan **apa yang kamu mau**!

---

## 📤 Cara Mengirim Custom Headers

Gunakan option `headers` di Fetch:

```javascript
fetch(url, {
  headers: {
    'Header-Name': 'nilai',
    'Header-Lain': 'nilai lain'
  }
})
```

**Sederhana!** 🎯

---

## 💻 Contoh Dasar: Kirim Custom Header

```javascript
async function fetchWithHeaders() {
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Custom-Header': 'Hello dari Client!',
      'User-Agent': 'MyApp/1.0'
    }
  });
  
  const data = await response.json();
  console.log(data);
}

fetchWithHeaders();
```

---

## 🔑 Headers untuk Authentication

### 1️⃣ **Authorization Header** (Paling Umum!)

```javascript
async function fetchWithAuth() {
  const token = 'your-secret-token-123';
  
  const response = await fetch('https://api.example.com/protected', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.ok) {
    const data = await response.json();
    console.log('✅ Berhasil login:', data);
  } else {
    console.log('❌ Token salah atau expired');
  }
}

fetchWithAuth();
```

**Format umum:**
- `Bearer token123` → JWT/OAuth token
- `Basic username:password` → Basic auth (encoded)
- `API-Key abc123` → API key

---

### 2️⃣ **API Key Header**

```javascript
async function fetchWithAPIKey() {
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'X-API-Key': 'your-api-key-here',
      'X-API-Secret': 'your-secret-here'
    }
  });
  
  const data = await response.json();
  console.log(data);
}

fetchWithAPIKey();
```

**Note:** Nama header bisa berbeda-beda per API (cek dokumentasi API!)

---

## 📄 Content-Type Header

Memberitahu server **format data** yang kamu kirim:

### Kirim JSON (Paling Umum!)

```javascript
async function kirimJSON() {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com'
  };
  
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  const result = await response.json();
  console.log('✅ User dibuat:', result);
}

kirimJSON();
```

**PENTING:** Kalau kirim JSON, **WAJIB** set Content-Type! 🚨

---

### Format Content-Type Umum

| Format | Content-Type | Kapan Dipakai |
|--------|--------------|---------------|
| JSON | `application/json` | Kirim object/array |
| Text | `text/plain` | Kirim text biasa |
| HTML | `text/html` | Kirim HTML |
| Form | `application/x-www-form-urlencoded` | Form data |
| Multipart | `multipart/form-data` | Upload file |

---

## 🌐 Headers Lain yang Sering Dipakai

### 1️⃣ **Accept** - Format yang Diminta

```javascript
const response = await fetch(url, {
  headers: {
    'Accept': 'application/json'  // Minta response JSON
  }
});
```

Memberitahu server "saya maunya dapat data format JSON ya!"

---

### 2️⃣ **Accept-Language** - Bahasa yang Diminta

```javascript
const response = await fetch(url, {
  headers: {
    'Accept-Language': 'id-ID'  // Minta bahasa Indonesia
  }
});
```

Server bisa kirim response dalam bahasa yang diminta.

---

### 3️⃣ **User-Agent** - Info Browser/App

```javascript
const response = await fetch(url, {
  headers: {
    'User-Agent': 'MyApp/1.0 (Windows)'
  }
});
```

Memberitahu server aplikasi/browser apa yang dipakai.

---

### 4️⃣ **Custom Headers** (X-*)

```javascript
const response = await fetch(url, {
  headers: {
    'X-Request-ID': 'req-123',
    'X-User-ID': 'user-456',
    'X-Device': 'mobile'
  }
});
```

Custom headers biasanya diawali dengan `X-` (tapi tidak wajib).

---

## 💡 Contoh Praktis: Login dengan Token

```javascript
async function login(email, password) {
  try {
    // 1. Login untuk dapat token
    const loginResponse = await fetch('https://api.example.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!loginResponse.ok) {
      throw new Error('Login gagal!');
    }
    
    const { token } = await loginResponse.json();
    console.log('✅ Login berhasil! Token:', token);
    
    // 2. Pakai token untuk akses data
    const dataResponse = await fetch('https://api.example.com/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const profile = await dataResponse.json();
    console.log('👤 Profile:', profile);
    
    return profile;
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Test
login('user@example.com', 'password123');
```

**Pattern umum:** Login dulu → Dapat token → Pakai token di request berikutnya 🔐

---

## 🔧 Multiple Headers Sekaligus

```javascript
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'Accept': 'application/json',
    'Accept-Language': 'id-ID',
    'X-Request-ID': 'req-001',
    'X-Client-Version': '1.0.0'
  },
  body: JSON.stringify(data)
});
```

**Bisa kirim banyak headers sekaligus!** 📋

---

## 🎨 Visualisasi Request dengan Headers

```
Client (Browser/App)
         │
         │ fetch(url, {
         │   headers: {
         │     'Authorization': 'Bearer token',
         │     'Content-Type': 'application/json'
         │   }
         │ })
         │
         ↓
┌────────────────────────┐
│  HTTP Request          │
│  ┌──────────────────┐  │
│  │ Method: POST     │  │
│  │ URL: /api/data   │  │
│  └──────────────────┘  │
│  ┌──────────────────┐  │
│  │ Headers: 📋      │  │
│  │ - Authorization  │  │
│  │ - Content-Type   │  │
│  └──────────────────┘  │
│  ┌──────────────────┐  │
│  │ Body: 📦         │  │
│  │ {...JSON...}     │  │
│  └──────────────────┘  │
└────────┬───────────────┘
         │
         ↓
      Server
```

---

## ⚠️ Forbidden Headers (Tidak Boleh Di-Set!)

Ada beberapa headers yang **TIDAK BOLEH** di-set manual karena dikontrol browser:

```javascript
// ❌ Ini TIDAK AKAN BEKERJA!
fetch(url, {
  headers: {
    'Cookie': 'session=123',        // ❌ Forbidden
    'Host': 'example.com',          // ❌ Forbidden
    'Origin': 'http://mysite.com',  // ❌ Forbidden
    'Referer': 'http://mysite.com', // ❌ Forbidden
    'Content-Length': '1024'        // ❌ Forbidden
  }
});
```

### 📋 Daftar Forbidden Headers:

- `Cookie`, `Cookie2`
- `Host`
- `Origin`
- `Referer`
- `Content-Length`
- `Connection`
- `Date`
- Headers yang diawali `Proxy-*` atau `Sec-*`

**Browser yang akan set headers ini otomatis!** 🔒

---

## 💻 Contoh Lengkap: CRUD dengan Headers

```javascript
// Base URL & Token
const API_URL = 'https://jsonplaceholder.typicode.com';
const AUTH_TOKEN = 'dummy-token-123';

// Helper function
async function apiRequest(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
    'Accept': 'application/json'
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers  // Merge dengan custom headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

// CREATE
async function createPost(postData) {
  return apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(postData)
  });
}

// READ
async function getPost(id) {
  return apiRequest(`/posts/${id}`);
}

// UPDATE
async function updatePost(id, postData) {
  return apiRequest(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData)
  });
}

// DELETE
async function deletePost(id) {
  return apiRequest(`/posts/${id}`, {
    method: 'DELETE'
  });
}

// Test
(async () => {
  try {
    // Create
    const newPost = await createPost({
      title: 'Test Post',
      body: 'Ini test',
      userId: 1
    });
    console.log('✅ Created:', newPost);
    
    // Read
    const post = await getPost(1);
    console.log('📖 Read:', post);
    
    // Update
    const updated = await updatePost(1, {
      title: 'Updated Title',
      body: 'Updated body',
      userId: 1
    });
    console.log('🔄 Updated:', updated);
    
    // Delete
    await deletePost(1);
    console.log('🗑️ Deleted!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

**Reusable helper function!** Bisa dipakai berkali-kali 🎯

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Typo Nama Header
```javascript
// ❌ SALAH! Typo
headers: {
  'Authorizaton': 'Bearer token'  // Salah ketik!
}

// ✅ BENAR
headers: {
  'Authorization': 'Bearer token'  // Benar
}
```

**Server tidak akan error tapi tidak akan kerja!** 🐛

---

### 2️⃣ Lupa Content-Type Saat POST JSON
```javascript
// ❌ SALAH! Server tidak tahu ini JSON
fetch(url, {
  method: 'POST',
  body: JSON.stringify(data)  // Lupa Content-Type!
});

// ✅ BENAR
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'  // Harus ada!
  },
  body: JSON.stringify(data)
});
```

---

### 3️⃣ Kirim Object Langsung di Body
```javascript
// ❌ SALAH! Body harus string
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: { name: 'John' }  // Object! Salah!
});

// ✅ BENAR - Stringify dulu
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John' })  // String! Benar!
});
```

---

### 4️⃣ Hardcode Token di Code
```javascript
// ❌ BURUK! Token kelihatan di code
const TOKEN = 'my-secret-token-123';

fetch(url, {
  headers: {
    'Authorization': `Bearer ${TOKEN}`
  }
});

// ✅ LEBIH BAIK - Simpan di environment variable atau secure storage
const TOKEN = process.env.API_TOKEN;  // Dari env
// atau
const TOKEN = localStorage.getItem('token');  // Dari storage

fetch(url, {
  headers: {
    'Authorization': `Bearer ${TOKEN}`
  }
});
```

**Jangan expose token di code!** 🔐

---

## 🎯 Latihan Mini

**Challenge:** Buat function yang:
1. POST data user baru ke API
2. Kirim headers:
   - Content-Type: application/json
   - Authorization: Bearer test-token-123
   - Accept: application/json
3. Tampilkan response

API untuk test (dummy):
```
https://jsonplaceholder.typicode.com/users
```

Data user:
```javascript
{
  name: 'Test User',
  email: 'test@example.com'
}
```

<details>
<summary>💡 Lihat Solusi</summary>

```javascript
async function createUser() {
  try {
    const userData = {
      name: 'Test User',
      email: 'test@example.com'
    };
    
    console.log('📤 Mengirim data...');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token-123',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Berhasil!');
    console.log('📋 Response:', result);
    console.log('🆔 User ID:', result.id);
    console.log('👤 Nama:', result.name);
    console.log('📧 Email:', result.email);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Test
createUser();
```
</details>

---

## 🏆 Kesimpulan

✅ **Request Headers** dikirim via option `headers` di Fetch

✅ **Authorization** header untuk authentication (Bearer token)

✅ **Content-Type** WAJIB saat kirim JSON

✅ Headers bisa dikombinasikan sebanyak yang diperlukan

✅ Ada **Forbidden Headers** yang tidak boleh di-set manual

✅ Buat **reusable helper function** untuk DRY code

✅ Jangan **hardcode sensitive data** (token, API key)

---

## 🎓 Selanjutnya

Di file berikutnya (**08-post-request.md**), kita akan belajar:
- 📤 Cara mengirim data ke server (POST, PUT, DELETE)
- 📋 Berbagai format data yang bisa dikirim
- 🎯 Contoh praktis CRUD operations
- 💡 Best practices untuk mengirim data

**Siap lanjut?** 🚀

---

### 📌 Template Request Headers

```javascript
// Template lengkap dengan headers:
async function apiCall(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      // Custom headers
      'X-Request-ID': generateID(),
      'X-Client-Version': '1.0.0'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  return response.json();
}
```

**Gunakan template ini sebagai starting point!** 🎯
