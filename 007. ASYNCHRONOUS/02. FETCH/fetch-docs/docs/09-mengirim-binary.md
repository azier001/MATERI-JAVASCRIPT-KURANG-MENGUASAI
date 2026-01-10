# 09 - Mengirim Binary Data 📁

> **Tujuan Pembelajaran**: Memahami cara upload file, gambar, dan binary data

---

## 🤔 Apa itu Binary Data?

**Binary data** adalah data dalam bentuk **bytes** (0 dan 1), bukan text.

### 📦 Contoh Binary Data:

- 🖼️ **Gambar** (PNG, JPG, GIF)
- 📄 **File** (PDF, DOCX, ZIP)
- 🎵 **Audio** (MP3, WAV)
- 🎬 **Video** (MP4, AVI)

**Tidak bisa kirim dengan JSON!** Harus cara khusus 🎯

---

## 🎭 Analogi: Kirim Paket

```
JSON (Text):
"Halo, ini pesan text!"
📝 Bisa dibaca langsung

Binary (File):
01001000 01101001
📦 Harus dibuka dulu (decode)
```

**Binary = Data mentah yang butuh special handling!**

---

## 📤 Cara Upload File dengan FormData

### 1️⃣ HTML Input File

```html
<input type="file" id="fileInput" accept="image/*">
<button onclick="uploadFile()">Upload</button>
```

### 2️⃣ JavaScript Upload

```javascript
async function uploadFile() {
  // Ambil file dari input
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Pilih file dulu!');
    return;
  }
  
  // Buat FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', 'Upload dari web');
  
  try {
    console.log('📤 Uploading:', file.name);
    
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      // JANGAN set Content-Type! Browser set otomatis
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Upload berhasil!', result);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}
```

**PENTING:** Jangan set Content-Type saat pakai FormData! Browser akan set otomatis dengan boundary. 🚨

---

## 🖼️ Upload Gambar dengan Preview

### HTML

```html
<input type="file" id="imageInput" accept="image/*">
<img id="preview" style="max-width: 300px; display: none;">
<button onclick="uploadImage()">Upload</button>
<div id="status"></div>
```

### JavaScript

```javascript
// Preview gambar sebelum upload
document.getElementById('imageInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Cek apakah gambar
  if (!file.type.startsWith('image/')) {
    alert('File harus gambar!');
    return;
  }
  
  // Preview
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('preview');
    preview.src = e.target.result;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// Upload gambar
async function uploadImage() {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];
  const statusDiv = document.getElementById('status');
  
  if (!file) {
    alert('Pilih gambar dulu!');
    return;
  }
  
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', 'Gambar dari web');
  
  try {
    statusDiv.innerHTML = '⏳ Uploading...';
    
    const response = await fetch('https://api.example.com/upload-image', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    statusDiv.innerHTML = `
      <div style="color: green;">
        ✅ Upload berhasil!<br>
        URL: ${result.url}
      </div>
    `;
    
  } catch (error) {
    statusDiv.innerHTML = `
      <div style="color: red;">
        ❌ Error: ${error.message}
      </div>
    `;
  }
}
```

**Dengan preview dan validasi!** 🎨

---

## 📊 Upload Multiple Files

```html
<input type="file" id="filesInput" multiple>
<button onclick="uploadMultiple()">Upload All</button>
<div id="progress"></div>
```

```javascript
async function uploadMultiple() {
  const filesInput = document.getElementById('filesInput');
  const files = filesInput.files;
  const progressDiv = document.getElementById('progress');
  
  if (files.length === 0) {
    alert('Pilih file dulu!');
    return;
  }
  
  const formData = new FormData();
  
  // Append semua file
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  
  try {
    progressDiv.innerHTML = `⏳ Uploading ${files.length} files...`;
    
    const response = await fetch('https://api.example.com/upload-multiple', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    progressDiv.innerHTML = `
      <div style="color: green;">
        ✅ ${files.length} files uploaded!<br>
        ${result.files.map(f => `- ${f.name}`).join('<br>')}
      </div>
    `;
    
  } catch (error) {
    progressDiv.innerHTML = `
      <div style="color: red;">
        ❌ Error: ${error.message}
      </div>
    `;
  }
}
```

**Upload banyak file sekaligus!** 📦

---

## 🎨 Upload dari Canvas (Drawing)

```html
<canvas id="canvas" width="400" height="300" style="border: 1px solid black;"></canvas>
<br>
<button onclick="clearCanvas()">Clear</button>
<button onclick="uploadCanvas()">Upload Drawing</button>
```

```javascript
// Setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Drawing functionality
let isDrawing = false;

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.lineTo(x, y);
  ctx.stroke();
});

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

// Upload canvas as image
async function uploadCanvas() {
  try {
    console.log('📤 Converting canvas to blob...');
    
    // Convert canvas to blob
    const blob = await new Promise(resolve => 
      canvas.toBlob(resolve, 'image/png')
    );
    
    console.log('Blob size:', blob.size, 'bytes');
    
    // Upload blob
    const formData = new FormData();
    formData.append('image', blob, 'drawing.png');
    
    const response = await fetch('https://api.example.com/upload-drawing', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Upload berhasil!', result);
    alert('Drawing uploaded!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    alert('Upload gagal: ' + error.message);
  }
}
```

**Upload gambar dari drawing!** 🎨

---

## 🎯 Upload dengan Blob Langsung

### Kirim Blob Tanpa FormData

```javascript
async function uploadBlob() {
  const response = await fetch('https://via.placeholder.com/150');
  const blob = await response.blob();
  
  console.log('Uploading blob...');
  
  const uploadResponse = await fetch('https://api.example.com/upload-blob', {
    method: 'POST',
    headers: {
      'Content-Type': blob.type  // image/png, image/jpeg, dll
    },
    body: blob  // Kirim blob langsung!
  });
  
  if (!uploadResponse.ok) {
    throw new Error(`HTTP ${uploadResponse.status}`);
  }
  
  const result = await uploadResponse.json();
  console.log('✅ Uploaded!', result);
}
```

**Blob bisa dikirim langsung tanpa FormData!** 📦

---

## 📏 Validasi File Sebelum Upload

```javascript
async function uploadWithValidation() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Pilih file dulu!');
    return;
  }
  
  // ✅ Validasi 1: Tipe file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    alert('Hanya boleh JPG, PNG, atau GIF!');
    return;
  }
  
  // ✅ Validasi 2: Ukuran file (max 2MB)
  const maxSize = 2 * 1024 * 1024;  // 2MB in bytes
  if (file.size > maxSize) {
    alert('File terlalu besar! Max 2MB');
    return;
  }
  
  // ✅ Validasi 3: Dimensi gambar
  const img = new Image();
  img.src = URL.createObjectURL(file);
  
  await new Promise(resolve => img.onload = resolve);
  
  if (img.width > 1920 || img.height > 1080) {
    alert('Resolusi terlalu besar! Max 1920x1080');
    return;
  }
  
  // Semua validasi passed! Upload
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Upload berhasil!', result);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}
```

**Validasi lengkap: tipe, ukuran, dimensi!** ✅

---

## 🎨 Visualisasi Upload Process

```
User pilih file
      │
      ↓
┌─────────────────┐
│  File Object    │
│  - name         │
│  - size         │
│  - type         │
└────────┬────────┘
         │
         ↓
  Validasi File
  ✅ Type OK?
  ✅ Size OK?
         │
         ↓
┌─────────────────┐
│  FormData       │
│  .append(file)  │
└────────┬────────┘
         │
         ↓
   fetch(url, {
     method: 'POST',
     body: formData
   })
         │
         ↓
      Server
         │
         ↓
   Response
   {url: "..."}
```

---

## 📊 Info File yang Tersedia

```javascript
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

if (file) {
  console.log('Nama:', file.name);                    // "photo.jpg"
  console.log('Ukuran:', file.size, 'bytes');         // 1234567
  console.log('Ukuran (KB):', (file.size/1024).toFixed(2), 'KB');
  console.log('Ukuran (MB):', (file.size/1024/1024).toFixed(2), 'MB');
  console.log('Tipe:', file.type);                    // "image/jpeg"
  console.log('Last Modified:', new Date(file.lastModified));
}
```

**Info lengkap tentang file!** 📋

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Set Content-Type Saat Pakai FormData
```javascript
// ❌ SALAH! Jangan set Content-Type
const formData = new FormData();
formData.append('file', file);

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'  // ❌ JANGAN!
  },
  body: formData
});

// ✅ BENAR - Biarkan browser set otomatis
fetch(url, {
  method: 'POST',
  // Tidak ada headers!
  body: formData
});
```

**Browser akan set Content-Type + boundary otomatis!** 🎯

---

### 2️⃣ Lupa Cek File Ada atau Tidak
```javascript
// ❌ SALAH! Bisa null/undefined
const file = fileInput.files[0];
const formData = new FormData();
formData.append('file', file);  // Error kalau file null!

// ✅ BENAR - Cek dulu
const file = fileInput.files[0];
if (!file) {
  alert('Pilih file dulu!');
  return;
}
const formData = new FormData();
formData.append('file', file);
```

---

### 3️⃣ Tidak Validasi Tipe File
```javascript
// ❌ BURUK! User bisa upload apapun
const file = fileInput.files[0];
// Langsung upload tanpa cek

// ✅ BAIK - Validasi dulu
const file = fileInput.files[0];
if (!file.type.startsWith('image/')) {
  alert('Harus gambar!');
  return;
}
```

---

### 4️⃣ Tidak Batasi Ukuran File
```javascript
// ❌ BURUK! Bisa upload file 1GB
const file = fileInput.files[0];
// Langsung upload

// ✅ BAIK - Cek ukuran
const file = fileInput.files[0];
const maxSize = 5 * 1024 * 1024;  // 5MB
if (file.size > maxSize) {
  alert('File terlalu besar! Max 5MB');
  return;
}
```

---

### 5️⃣ Tidak Handle Error Upload
```javascript
// ❌ BURUK! Fire and forget
const formData = new FormData();
formData.append('file', file);
fetch(url, { method: 'POST', body: formData });
// Tidak tahu berhasil atau gagal!

// ✅ BAIK - Handle response
try {
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`Upload gagal: ${response.status}`);
  }
  
  const result = await response.json();
  console.log('Berhasil:', result);
} catch (error) {
  console.error('Error:', error);
  alert('Upload gagal!');
}
```

---

## 🎯 Latihan Mini

**Challenge:** Buat form upload gambar dengan:
1. Preview gambar sebelum upload
2. Validasi: hanya JPG/PNG, max 1MB
3. Tampilkan info file (nama, ukuran)
4. Upload ke API (dummy)

<details>
<summary>💡 Lihat Solusi</summary>

### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Upload Gambar</title>
  <style>
    body { font-family: Arial; max-width: 600px; margin: 50px auto; }
    #preview { max-width: 300px; margin: 20px 0; display: none; }
    #fileInfo { background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; }
    button { padding: 10px 20px; margin: 10px 5px; }
  </style>
</head>
<body>
  <h1>🖼️ Upload Gambar</h1>
  
  <input type="file" id="imageInput" accept="image/jpeg,image/png">
  <div id="fileInfo" style="display: none;"></div>
  <img id="preview">
  
  <div>
    <button onclick="uploadImage()">Upload</button>
    <button onclick="reset()">Reset</button>
  </div>
  
  <div id="status"></div>
  
  <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)
```javascript
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const fileInfo = document.getElementById('fileInfo');
const statusDiv = document.getElementById('status');

// Handle file selection
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  
  if (!file) {
    reset();
    return;
  }
  
  // Validasi tipe
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    alert('Hanya boleh JPG atau PNG!');
    reset();
    return;
  }
  
  // Validasi ukuran (1MB)
  const maxSize = 1 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('File terlalu besar! Max 1MB');
    reset();
    return;
  }
  
  // Tampilkan info file
  fileInfo.style.display = 'block';
  fileInfo.innerHTML = `
    <strong>📄 Info File:</strong><br>
    Nama: ${file.name}<br>
    Ukuran: ${(file.size / 1024).toFixed(2)} KB<br>
    Tipe: ${file.type}
  `;
  
  // Preview gambar
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
  
  statusDiv.innerHTML = '';
});

// Upload function
async function uploadImage() {
  const file = imageInput.files[0];
  
  if (!file) {
    alert('Pilih gambar dulu!');
    return;
  }
  
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', file.name);
  
  try {
    statusDiv.innerHTML = '<div style="color: blue;">⏳ Uploading...</div>';
    
    // Dummy upload (jsonplaceholder tidak support upload, tapi kita simulasi)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    statusDiv.innerHTML = `
      <div style="color: green;">
        ✅ Upload berhasil!<br>
        ID: ${result.id}<br>
        File: ${file.name}
      </div>
    `;
    
    console.log('Upload result:', result);
    
  } catch (error) {
    statusDiv.innerHTML = `
      <div style="color: red;">
        ❌ Upload gagal: ${error.message}
      </div>
    `;
    console.error('Error:', error);
  }
}

// Reset function
function reset() {
  imageInput.value = '';
  preview.style.display = 'none';
  preview.src = '';
  fileInfo.style.display = 'none';
  statusDiv.innerHTML = '';
}
```
</details>

---

## 🏆 Kesimpulan

✅ **FormData** untuk upload file/gambar

✅ **JANGAN** set Content-Type saat pakai FormData

✅ **Validasi** file sebelum upload (tipe, ukuran)

✅ **Preview** gambar pakai FileReader

✅ **Blob** bisa dikirim langsung atau via FormData

✅ **Canvas** bisa di-convert jadi blob dengan `toBlob()`

✅ Selalu **handle error** dan beri feedback ke user

---

## 🎓 Selanjutnya

Di file berikutnya (**10-common-pitfalls.md**), kita akan belajar:
- ⚠️ Kesalahan umum yang sering dilakukan
- 🐛 Bug yang susah dideteksi
- 💡 Tips debugging Fetch
- 🎯 Best practices lengkap

**Siap lanjut?** 🚀

---

### 📌 Template Upload File

```javascript
// Template lengkap upload file:
async function uploadFile(file) {
  // Validasi
  if (!file) return alert('Pilih file!');
  if (file.size > 5*1024*1024) return alert('Max 5MB!');
  
  // FormData
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData  // JANGAN set Content-Type!
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const result = await response.json();
    console.log('✅ Uploaded:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}
```

**Copy paste template ini!** 📋
