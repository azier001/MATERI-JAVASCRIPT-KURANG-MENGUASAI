# 08 - POST Request 📤

> **Tujuan Pembelajaran**: Memahami cara mengirim data ke server dengan berbagai HTTP method

---

## 🤔 Apa itu POST Request?

**POST** adalah method HTTP untuk **mengirim data** ke server.

### 🎭 Analogi: Kirim Paket

```
GET  = Minta barang (ambil data) 📥
POST = Kirim paket (kirim data baru) 📤
PUT  = Ganti isi paket (update semua data) 🔄
DELETE = Buang paket (hapus data) 🗑️
```

**GET** sudah kita pelajari, sekarang waktunya **POST**! 🚀

---

## 📊 HTTP Methods yang Umum

| Method | Fungsi | Analogi |
|--------|--------|---------|
| **GET** | Ambil data | Baca buku di perpustakaan 📖 |
| **POST** | Buat data baru | Tambah buku baru ke perpustakaan ➕ |
| **PUT** | Update semua data | Ganti isi buku sepenuhnya 🔄 |
| **PATCH** | Update sebagian data | Edit halaman tertentu 📝 |
| **DELETE** | Hapus data | Buang buku dari perpustakaan 🗑️ |

---

## 💻 Syntax Dasar POST Request

### Tanpa Data (GET - Default)

```javascript
fetch(url)  // Default = GET
```

### Dengan Data (POST)

```javascript
fetch(url, {
  method: 'POST',           // Harus di-set!
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)  // Data yang dikirim
})
```

**3 Hal Penting:**
1. Set `method: 'POST'`
2. Set `Content-Type` header
3. Kirim data di `body` (harus string!)

---

## 🎯 Contoh Sederhana: POST JSON

```javascript
async function createPost() {
  try {
    // Data yang mau dikirim
    const postData = {
      title: 'Post Pertama Saya',
      body: 'Ini adalah isi post',
      userId: 1
    };
    
    console.log('📤 Mengirim data...');
    
    // POST request
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Berhasil dibuat!');
    console.log('ID:', result.id);
    console.log('Data:', result);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Test
createPost();
```

**Output:**
```
📤 Mengirim data...
✅ Berhasil dibuat!
ID: 101
Data: { title: "Post Pertama Saya", body: "...", userId: 1, id: 101 }
```

---

## 🎨 Visualisasi POST Request

```
Client (Browser)
      │
      │ Data Object
      │ { name: "John", age: 30 }
      │
      ↓
JSON.stringify()
      │
      │ String
      │ '{"name":"John","age":30}'
      │
      ↓
┌─────────────────────┐
│ POST Request 📤     │
│ ──────────────────  │
│ Method: POST        │
│ Headers:            │
│   Content-Type      │
│ Body:               │
│   '{"name":...}'    │
└──────────┬──────────┘
           │
           ↓
        Server
           │
           ↓
      Proses Data
           │
           ↓
┌─────────────────────┐
│ Response 📥         │
│ ──────────────────  │
│ Status: 201 Created │
│ Body:               │
│   {id: 123, ...}    │
└─────────────────────┘
```

---

## 🔧 Method PUT: Update Data

**PUT** untuk update **seluruh** data:

```javascript
async function updatePost(id) {
  try {
    const updatedData = {
      id: id,
      title: 'Judul Diupdate',
      body: 'Isi juga diupdate',
      userId: 1
    };
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',  // 👈 Pakai PUT
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Berhasil diupdate!');
    console.log(result);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Test
updatePost(1);
```

---

## 📝 Method PATCH: Update Sebagian

**PATCH** untuk update **sebagian** data:

```javascript
async function patchPost(id) {
  try {
    // Hanya update title saja
    const partialData = {
      title: 'Hanya Judul yang Berubah'
    };
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',  // 👈 Pakai PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partialData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Berhasil di-patch!');
    console.log(result);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Test
patchPost(1);
```

**Perbedaan PUT vs PATCH:**
- **PUT** = Ganti semua property (harus kirim lengkap)
- **PATCH** = Ganti beberapa property saja (kirim yang berubah aja)

---

## 🗑️ Method DELETE: Hapus Data

```javascript
async function deletePost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'  // 👈 Pakai DELETE
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    console.log('✅ Berhasil dihapus!');
    console.log('Status:', response.status);  // Biasanya 200 atau 204
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Test
deletePost(1);
```

**Note:** DELETE biasanya tidak perlu body, cukup ID di URL!

---

## 💡 Contoh Lengkap: CRUD Operations

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// CREATE - POST
async function createPost(postData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });
  
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// READ - GET
async function getPost(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// UPDATE - PUT
async function updatePost(id, postData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...postData })
  });
  
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// UPDATE PARTIAL - PATCH
async function patchPost(id, partialData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partialData)
  });
  
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// DELETE - DELETE
async function deletePost(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.status;
}

// Test semua operations
(async () => {
  try {
    // CREATE
    console.log('📝 CREATE');
    const created = await createPost({
      title: 'Test Post',
      body: 'Test Body',
      userId: 1
    });
    console.log('✅ Created:', created);
    console.log('');
    
    // READ
    console.log('📖 READ');
    const post = await getPost(1);
    console.log('✅ Read:', post);
    console.log('');
    
    // UPDATE
    console.log('🔄 UPDATE (PUT)');
    const updated = await updatePost(1, {
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1
    });
    console.log('✅ Updated:', updated);
    console.log('');
    
    // PATCH
    console.log('📝 PATCH');
    const patched = await patchPost(1, {
      title: 'Only Title Changed'
    });
    console.log('✅ Patched:', patched);
    console.log('');
    
    // DELETE
    console.log('🗑️ DELETE');
    const status = await deletePost(1);
    console.log('✅ Deleted! Status:', status);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

**Lengkap! Bisa dipakai sebagai template!** 🎯

---

## 📋 Contoh Praktis: Form Submit

### HTML
```html
<form id="userForm">
  <input type="text" id="name" placeholder="Nama" required>
  <input type="email" id="email" placeholder="Email" required>
  <button type="submit">Submit</button>
</form>
<div id="result"></div>
```

### JavaScript
```javascript
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();  // Jangan reload halaman!
  
  // Ambil data dari form
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '⏳ Loading...';
  
  try {
    // POST ke server
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    // Tampilkan hasil
    resultDiv.innerHTML = `
      <div style="color: green;">
        ✅ Berhasil!<br>
        ID: ${result.id}<br>
        Nama: ${result.name}<br>
        Email: ${result.email}
      </div>
    `;
    
    // Reset form
    document.getElementById('userForm').reset();
    
  } catch (error) {
    resultDiv.innerHTML = `
      <div style="color: red;">
        ❌ Error: ${error.message}
      </div>
    `;
  }
});
```

**Real-world example!** Form submit tanpa reload 🎉

---

## 🎯 Format Body yang Berbeda

### 1️⃣ JSON (Paling Umum!)

```javascript
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John', age: 30 })
});
```

---

### 2️⃣ Form Data (untuk upload file)

```javascript
const formData = new FormData();
formData.append('name', 'John');
formData.append('file', fileInput.files[0]);

fetch(url, {
  method: 'POST',
  // Jangan set Content-Type, browser set otomatis!
  body: formData
});
```

---

### 3️⃣ URL Encoded (form klasik)

```javascript
const params = new URLSearchParams();
params.append('name', 'John');
params.append('age', '30');

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: params
});
```

---

### 4️⃣ Plain Text

```javascript
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain'
  },
  body: 'Ini text biasa'
});
```

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Lupa Set Method
```javascript
// ❌ SALAH! Default method = GET
fetch(url, {
  body: JSON.stringify(data)  // Body diabaikan!
});

// ✅ BENAR
fetch(url, {
  method: 'POST',  // Harus ada!
  body: JSON.stringify(data)
});
```

---

### 2️⃣ Lupa JSON.stringify()
```javascript
// ❌ SALAH! Kirim object langsung
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { name: 'John' }  // Error!
});

// ✅ BENAR - Stringify dulu
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })  // String!
});
```

---

### 3️⃣ Lupa Content-Type
```javascript
// ❌ SALAH! Server tidak tahu formatnya
fetch(url, {
  method: 'POST',
  body: JSON.stringify(data)  // Lupa header!
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

### 4️⃣ Tidak Handle Response
```javascript
// ❌ BURUK! Fire and forget
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
// Tidak tahu berhasil atau error!

// ✅ BAIK - Handle response
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

if (!response.ok) {
  throw new Error('Request gagal!');
}

const result = await response.json();
console.log('Berhasil:', result);
```

---

### 5️⃣ Pakai PUT untuk Partial Update
```javascript
// ❌ KURANG TEPAT - PUT untuk full update
fetch(url, {
  method: 'PUT',
  body: JSON.stringify({ title: 'New Title' })  // Cuma 1 field
});

// ✅ LEBIH BAIK - PATCH untuk partial update
fetch(url, {
  method: 'PATCH',  // Lebih semantik benar
  body: JSON.stringify({ title: 'New Title' })
});
```

---

## 🎯 Latihan Mini

**Challenge:** Buat aplikasi Todo List sederhana dengan:
1. Form input untuk tambah todo
2. POST todo baru ke API
3. Tampilkan hasilnya

API untuk test:
```
https://jsonplaceholder.typicode.com/todos
```

Format data:
```javascript
{
  title: "Belajar Fetch",
  completed: false,
  userId: 1
}
```

<details>
<summary>💡 Lihat Solusi</summary>

### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    body { font-family: Arial; max-width: 500px; margin: 50px auto; }
    input { width: 70%; padding: 10px; }
    button { padding: 10px 20px; }
    #todoList { margin-top: 20px; }
    .todo { padding: 10px; margin: 5px 0; background: #f0f0f0; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>📝 Todo List</h1>
  
  <form id="todoForm">
    <input type="text" id="todoInput" placeholder="Masukkan todo..." required>
    <button type="submit">Tambah</button>
  </form>
  
  <div id="todoList"></div>
  
  <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)
```javascript
const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const todoTitle = input.value.trim();
  if (!todoTitle) return;
  
  try {
    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'todo';
    loadingDiv.innerHTML = '⏳ Menambahkan...';
    todoList.prepend(loadingDiv);
    
    // POST request
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: todoTitle,
        completed: false,
        userId: 1
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const todo = await response.json();
    
    // Remove loading
    loadingDiv.remove();
    
    // Add todo to list
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';
    todoDiv.innerHTML = `
      <strong>✅ Todo #${todo.id}</strong><br>
      ${todo.title}<br>
      <small>Status: ${todo.completed ? 'Selesai' : 'Belum selesai'}</small>
    `;
    todoList.prepend(todoDiv);
    
    // Reset form
    input.value = '';
    
    console.log('✅ Todo ditambahkan:', todo);
    
  } catch (error) {
    // Remove loading
    loadingDiv.remove();
    
    // Show error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'todo';
    errorDiv.style.background = '#ffcccc';
    errorDiv.innerHTML = `❌ Error: ${error.message}`;
    todoList.prepend(errorDiv);
    
    console.error('❌ Error:', error);
  }
});
```
</details>

---

## 🏆 Kesimpulan

✅ **POST** untuk create data baru

✅ **PUT** untuk update seluruh data

✅ **PATCH** untuk update sebagian data

✅ **DELETE** untuk hapus data

✅ Harus set `method` dan `Content-Type`

✅ Body harus **string** (pakai `JSON.stringify()`)

✅ Selalu **handle response** dan cek `response.ok`

✅ **FormData** untuk upload file (tidak perlu JSON.stringify)

---

## 🎓 Selanjutnya

Di file berikutnya (**09-mengirim-binary.md**), kita akan belajar:
- 📁 Cara upload file/gambar
- 🖼️ Mengirim binary data (Blob)
- 📊 Progress upload
- 🎯 Preview gambar sebelum upload

**Siap lanjut?** 🚀

---

### 📌 Cheat Sheet Methods

```javascript
// CREATE - POST
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// READ - GET
fetch(url);  // Default GET

// UPDATE FULL - PUT
fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(fullData)
});

// UPDATE PARTIAL - PATCH
fetch(url, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(partialData)
});

// DELETE - DELETE
fetch(url, { method: 'DELETE' });
```

**Simpan cheat sheet ini!** 📝
