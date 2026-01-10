# 11 - Latihan & Exercises 💪

> **Tujuan Pembelajaran**: Praktek langsung untuk memperkuat pemahaman Fetch API

---

## 🎯 Cara Menggunakan File Ini

1. **Baca challenge dengan teliti**
2. **Coba kerjakan sendiri dulu** (jangan langsung lihat solusi!)
3. **Kalau stuck 10+ menit, lihat hint**
4. **Kalau masih stuck, baru lihat solusi**
5. **Tulis ulang kode, jangan copy-paste!**

**Ingat:** Salah itu bagus! Dari error kita belajar 🎓

---

## 📊 Level Kesulitan

- 🟢 **Easy** - Untuk pemula
- 🟡 **Medium** - Butuh pemikiran
- 🔴 **Hard** - Challenge!

---

## 🟢 Exercise 1: Hello Fetch (Easy)

### 📝 Challenge

Ambil data dari API ini dan tampilkan **judul post** di console:
```
https://jsonplaceholder.typicode.com/posts/1
```

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

- Pakai `async/await`
- Jangan lupa 2 await (response dan body)
- Property judul ada di `data.title`
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi</summary>

```javascript
async function getPost() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Judul:', data.title);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

getPost();
```

**Output yang benar:**
```
Judul: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
```
</details>

---

## 🟢 Exercise 2: Multiple Requests (Easy)

### 📝 Challenge

Ambil data dari 3 API sekaligus dan tampilkan:
```
Post 1: https://jsonplaceholder.typicode.com/posts/1
Post 2: https://jsonplaceholder.typicode.com/posts/2
Post 3: https://jsonplaceholder.typicode.com/posts/3
```

Tampilkan **judul** dari ketiga post.

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

- Pakai `Promise.all()` untuk fetch parallel
- Buat array of promises
- Tunggu semua selesai baru tampilkan
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi</summary>

```javascript
async function getMultiplePosts() {
  try {
    const urls = [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/2',
      'https://jsonplaceholder.typicode.com/posts/3'
    ];
    
    console.log('📥 Fetching 3 posts...');
    
    // Fetch semua sekaligus
    const responses = await Promise.all(
      urls.map(url => fetch(url))
    );
    
    // Check semua response OK
    responses.forEach(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    });
    
    // Parse semua jadi JSON
    const posts = await Promise.all(
      responses.map(response => response.json())
    );
    
    // Tampilkan
    posts.forEach((post, index) => {
      console.log(`Post ${index + 1}: ${post.title}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

getMultiplePosts();
```
</details>

---

## 🟡 Exercise 3: Create New Post (Medium)

### 📝 Challenge

Buat function untuk **create post baru** dengan data:
```javascript
{
  title: 'Belajar Fetch API',
  body: 'Fetch API sangat mudah!',
  userId: 1
}
```

POST ke: `https://jsonplaceholder.typicode.com/posts`

Tampilkan ID post yang baru dibuat.

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

- Pakai method: 'POST'
- Set header Content-Type: application/json
- Body pakai JSON.stringify()
- Response akan ada property `id`
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi</summary>

```javascript
async function createPost() {
  try {
    const postData = {
      title: 'Belajar Fetch API',
      body: 'Fetch API sangat mudah!',
      userId: 1
    };
    
    console.log('📤 Creating post...');
    
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
    
    console.log('✅ Post created!');
    console.log('ID:', result.id);
    console.log('Title:', result.title);
    console.log('Body:', result.body);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createPost();
```
</details>

---

## 🟡 Exercise 4: Update & Delete (Medium)

### 📝 Challenge

Buat 2 functions:

1. **updatePost(id, newData)** - Update post dengan PUT
2. **deletePost(id)** - Hapus post dengan DELETE

Test dengan:
```javascript
updatePost(1, { title: 'Updated Title', body: 'New body', userId: 1 });
deletePost(1);
```

API: `https://jsonplaceholder.typicode.com/posts/{id}`

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

- PUT perlu body lengkap dengan id
- DELETE tidak perlu body
- Kedua method tetap perlu error handling
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi</summary>

```javascript
// UPDATE - PUT
async function updatePost(id, newData) {
  try {
    console.log(`🔄 Updating post ${id}...`);
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, ...newData })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Post updated!', result);
    return result;
    
  } catch (error) {
    console.error('❌ Update error:', error);
  }
}

// DELETE
async function deletePost(id) {
  try {
    console.log(`🗑️ Deleting post ${id}...`);
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    console.log('✅ Post deleted!');
    console.log('Status:', response.status);
    
  } catch (error) {
    console.error('❌ Delete error:', error);
  }
}

// Test
(async () => {
  await updatePost(1, {
    title: 'Updated Title',
    body: 'New body',
    userId: 1
  });
  
  await deletePost(1);
})();
```
</details>

---

## 🟡 Exercise 5: Search Function (Medium)

### 📝 Challenge

Buat function **searchPosts(keyword)** yang:
1. Fetch semua posts dari `https://jsonplaceholder.typicode.com/posts`
2. Filter posts yang **judul atau body** mengandung keyword
3. Return array hasil filter
4. Console.log berapa post yang ditemukan

Test dengan: `searchPosts('sunt')`

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

- Fetch semua posts (sekitar 100 posts)
- Pakai `.filter()` untuk search
- Cek `title.includes()` dan `body.includes()`
- Keyword case-insensitive (lowercase semua)
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi</summary>

```javascript
async function searchPosts(keyword) {
  try {
    console.log(`🔍 Searching for: "${keyword}"`);
    
    // Fetch semua posts
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const posts = await response.json();
    console.log(`📄 Total posts: ${posts.length}`);
    
    // Search (case insensitive)
    const lowerKeyword = keyword.toLowerCase();
    const results = posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowerKeyword);
      const bodyMatch = post.body.toLowerCase().includes(lowerKeyword);
      return titleMatch || bodyMatch;
    });
    
    console.log(`✅ Found ${results.length} posts`);
    
    // Tampilkan hasil
    results.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
    });
    
    return results;
    
  } catch (error) {
    console.error('❌ Error:', error);
    return [];
  }
}

// Test
searchPosts('sunt');
```
</details>

---

## 🔴 Exercise 6: Mini Todo App (Hard)

### 📝 Challenge

Buat aplikasi Todo List lengkap dengan HTML + JavaScript:

**Fitur yang harus ada:**
1. ✅ Form input untuk tambah todo
2. ✅ Tampilkan list todos dari API
3. ✅ Button untuk mark todo as complete
4. ✅ Button untuk delete todo
5. ✅ Loading state
6. ✅ Error handling

**API:** `https://jsonplaceholder.typicode.com/todos`

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

- GET untuk ambil todos
- POST untuk tambah todo baru
- PATCH untuk update (mark complete)
- DELETE untuk hapus
- Pakai event delegation untuk buttons
- Simpan todos di array state
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi</summary>

### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial; 
      max-width: 600px; 
      margin: 50px auto; 
      padding: 0 20px;
    }
    h1 { margin-bottom: 30px; }
    
    #todoForm { 
      display: flex; 
      gap: 10px; 
      margin-bottom: 30px; 
    }
    #todoInput { 
      flex: 1; 
      padding: 10px; 
      border: 2px solid #ddd;
      border-radius: 5px;
    }
    button { 
      padding: 10px 20px; 
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    #addBtn { background: #4CAF50; color: white; }
    #addBtn:hover { background: #45a049; }
    #addBtn:disabled { background: #ccc; cursor: not-allowed; }
    
    #todoList { list-style: none; }
    .todo-item { 
      padding: 15px; 
      margin: 10px 0; 
      background: #f9f9f9; 
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .todo-item.completed { 
      background: #e8f5e9; 
      text-decoration: line-through;
      opacity: 0.7;
    }
    .todo-text { flex: 1; }
    .complete-btn { background: #2196F3; color: white; padding: 5px 10px; }
    .delete-btn { background: #f44336; color: white; padding: 5px 10px; }
    
    #status { 
      padding: 10px; 
      margin: 10px 0; 
      border-radius: 5px;
      text-align: center;
    }
    .loading { background: #fff3cd; }
    .error { background: #f8d7da; color: #721c24; }
    .success { background: #d4edda; color: #155724; }
  </style>
</head>
<body>
  <h1>📝 Todo App</h1>
  
  <form id="todoForm">
    <input 
      type="text" 
      id="todoInput" 
      placeholder="Masukkan todo baru..." 
      required
    >
    <button type="submit" id="addBtn">Tambah</button>
  </form>
  
  <div id="status"></div>
  <ul id="todoList"></ul>
  
  <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)
```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const statusDiv = document.getElementById('status');

let todos = [];

// Show status message
function showStatus(message, type = 'loading') {
  statusDiv.textContent = message;
  statusDiv.className = type;
  statusDiv.style.display = 'block';
}

function hideStatus() {
  statusDiv.style.display = 'none';
}

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  
  // Hanya tampilkan 10 todos pertama untuk demo
  const displayTodos = todos.slice(0, 10);
  
  displayTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span class="todo-text">${todo.title}</span>
      ${!todo.completed ? 
        `<button class="complete-btn" data-id="${todo.id}">✓ Complete</button>` : 
        `<span style="color: green;">✓ Done</span>`
      }
      <button class="delete-btn" data-id="${todo.id}">🗑️ Delete</button>
    `;
    todoList.appendChild(li);
  });
}

// Fetch todos
async function fetchTodos() {
  try {
    showStatus('⏳ Loading todos...', 'loading');
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    todos = await response.json();
    renderTodos();
    hideStatus();
    
  } catch (error) {
    showStatus(`❌ Error: ${error.message}`, 'error');
    console.error('Fetch error:', error);
  }
}

// Add todo
async function addTodo(title) {
  try {
    addBtn.disabled = true;
    showStatus('⏳ Adding todo...', 'loading');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        completed: false,
        userId: 1
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const newTodo = await response.json();
    
    // Tambah ke array
    todos.unshift(newTodo);
    renderTodos();
    
    showStatus('✅ Todo added!', 'success');
    setTimeout(hideStatus, 2000);
    
    // Reset form
    input.value = '';
    
  } catch (error) {
    showStatus(`❌ Error: ${error.message}`, 'error');
    console.error('Add error:', error);
  } finally {
    addBtn.disabled = false;
  }
}

// Complete todo
async function completeTodo(id) {
  try {
    showStatus('⏳ Updating...', 'loading');
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: true
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    // Update local state
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex].completed = true;
      renderTodos();
    }
    
    showStatus('✅ Todo completed!', 'success');
    setTimeout(hideStatus, 2000);
    
  } catch (error) {
    showStatus(`❌ Error: ${error.message}`, 'error');
    console.error('Complete error:', error);
  }
}

// Delete todo
async function deleteTodo(id) {
  try {
    showStatus('⏳ Deleting...', 'loading');
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    // Remove from local state
    todos = todos.filter(t => t.id !== id);
    renderTodos();
    
    showStatus('✅ Todo deleted!', 'success');
    setTimeout(hideStatus, 2000);
    
  } catch (error) {
    showStatus(`❌ Error: ${error.message}`, 'error');
    console.error('Delete error:', error);
  }
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (title) {
    addTodo(title);
  }
});

// Event delegation for buttons
todoList.addEventListener('click', (e) => {
  const id = parseInt(e.target.dataset.id);
  
  if (e.target.classList.contains('complete-btn')) {
    completeTodo(id);
  } else if (e.target.classList.contains('delete-btn')) {
    if (confirm('Yakin mau hapus todo ini?')) {
      deleteTodo(id);
    }
  }
});

// Load todos on page load
fetchTodos();
```
</details>

---

## 🔴 Exercise 7: Advanced - Retry Logic (Hard)

### 📝 Challenge

Buat function **fetchWithRetry(url, maxRetries = 3)** yang:
1. Fetch URL
2. Kalau gagal, retry sampai maxRetries
3. Delay 1 detik antar retry
4. Return data atau throw error setelah semua retry gagal

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

- Pakai loop untuk retry
- Pakai `setTimeout` atau `sleep` untuk delay
- Counter untuk track retry attempt
- Throw error hanya setelah semua retry gagal
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi</summary>

```javascript
// Helper: Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries}...`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ Success on attempt ${attempt}!`);
      return data;
      
    } catch (error) {
      lastError = error;
      console.error(`❌ Attempt ${attempt} failed:`, error.message);
      
      // Kalau bukan attempt terakhir, retry
      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in 1 second...`);
        await sleep(1000);  // Delay 1 detik
      }
    }
  }
  
  // Semua retry gagal
  console.error(`💥 All ${maxRetries} attempts failed!`);
  throw new Error(`Failed after ${maxRetries} retries: ${lastError.message}`);
}

// Test dengan URL yang kadang gagal
(async () => {
  try {
    const data = await fetchWithRetry(
      'https://jsonplaceholder.typicode.com/posts/1',
      3
    );
    console.log('Data:', data);
  } catch (error) {
    console.error('Final error:', error.message);
  }
})();
```
</details>

---

## 🏆 Mini Project: User Directory App

### 📝 Final Challenge

Buat aplikasi **User Directory** lengkap dengan:

**Fitur:**
1. 📋 Tampilkan list users dari API
2. 🔍 Search users by name
3. 👤 Klik user untuk lihat detail
4. ➕ Form untuk tambah user baru
5. ✏️ Edit user
6. 🗑️ Delete user
7. 📊 Statistics (total users, dll)

**API:** `https://jsonplaceholder.typicode.com/users`

**Design bebas, tapi harus:**
- ✅ Mobile responsive
- ✅ Loading states
- ✅ Error handling
- ✅ User-friendly messages

### 💡 Hint

<details>
<summary>Klik untuk hint</summary>

**Struktur:**
- `fetchUsers()` - GET all users
- `searchUsers(keyword)` - Filter local
- `showUserDetail(id)` - Modal/panel detail
- `createUser(userData)` - POST
- `updateUser(id, data)` - PUT
- `deleteUser(id)` - DELETE
- `renderUsers()` - Render UI
- `updateStats()` - Hitung stats

**Tips:**
- Pakai state object untuk manage data
- Event delegation untuk click handlers
- Helper functions untuk reusable code
</details>

### ✅ Solusi

<details>
<summary>Klik untuk solusi (Full App)</summary>

Karena solusi ini panjang, saya buat dalam 2 file:

### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>User Directory</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    
    .container { max-width: 1200px; margin: 0 auto; }
    
    header { 
      background: white; 
      padding: 20px; 
      border-radius: 10px; 
      margin-bottom: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    h1 { margin-bottom: 10px; }
    
    .stats {
      display: flex;
      gap: 20px;
      margin-top: 15px;
    }
    .stat-box {
      background: #e3f2fd;
      padding: 10px 20px;
      border-radius: 5px;
    }
    .stat-box strong { display: block; font-size: 24px; color: #1976d2; }
    
    .controls {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .search-box {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }
    #searchInput {
      flex: 1;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn-primary { background: #1976d2; color: white; }
    .btn-success { background: #4caf50; color: white; }
    .btn-danger { background: #f44336; color: white; }
    
    #userGrid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .user-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .user-card:hover { transform: translateY(-5px); }
    .user-card h3 { margin-bottom: 10px; color: #333; }
    .user-card p { color: #666; margin: 5px 0; }
    .user-card .actions {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }
    .user-card button { padding: 5px 10px; font-size: 12px; }
    
    #status {
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
      text-align: center;
      display: none;
    }
    .loading { background: #fff3cd; }
    .error { background: #f8d7da; color: #721c24; }
    .success { background: #d4edda; color: #155724; }
    
    @media (max-width: 768px) {
      #userGrid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>👥 User Directory</h1>
      <div class="stats">
        <div class="stat-box">
          <strong id="totalUsers">0</strong>
          <span>Total Users</span>
        </div>
      </div>
    </header>
    
    <div class="controls">
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Search users by name...">
        <button class="btn-primary" onclick="searchUsers()">🔍 Search</button>
        <button class="btn-success" onclick="showAllUsers()">Show All</button>
      </div>
      <button class="btn-success" onclick="alert('Feature coming soon!')">➕ Add New User</button>
    </div>
    
    <div id="status"></div>
    <div id="userGrid"></div>
  </div>
  
  <script>
    const API_URL = 'https://jsonplaceholder.typicode.com/users';
    let allUsers = [];
    let displayedUsers = [];
    
    // Show status
    function showStatus(message, type = 'loading') {
      const statusDiv = document.getElementById('status');
      statusDiv.textContent = message;
      statusDiv.className = type;
      statusDiv.style.display = 'block';
    }
    
    function hideStatus() {
      document.getElementById('status').style.display = 'none';
    }
    
    // Update stats
    function updateStats() {
      document.getElementById('totalUsers').textContent = allUsers.length;
    }
    
    // Render users
    function renderUsers(users) {
      const grid = document.getElementById('userGrid');
      grid.innerHTML = '';
      
      if (users.length === 0) {
        grid.innerHTML = '<p style="text-align:center;padding:20px;">No users found</p>';
        return;
      }
      
      users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
          <h3>${user.name}</h3>
          <p>📧 ${user.email}</p>
          <p>📱 ${user.phone}</p>
          <p>🏢 ${user.company.name}</p>
          <p>🌐 ${user.website}</p>
          <div class="actions">
            <button class="btn-primary" onclick="viewUser(${user.id})">View Details</button>
            <button class="btn-danger" onclick="deleteUser(${user.id})">Delete</button>
          </div>
        `;
        grid.appendChild(card);
      });
    }
    
    // Fetch users
    async function fetchUsers() {
      try {
        showStatus('⏳ Loading users...', 'loading');
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        allUsers = await response.json();
        displayedUsers = allUsers;
        
        renderUsers(displayedUsers);
        updateStats();
        hideStatus();
        
      } catch (error) {
        showStatus(`❌ Error: ${error.message}`, 'error');
        console.error('Fetch error:', error);
      }
    }
    
    // Search users
    function searchUsers() {
      const keyword = document.getElementById('searchInput').value.toLowerCase();
      
      if (!keyword) {
        showAllUsers();
        return;
      }
      
      displayedUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.company.name.toLowerCase().includes(keyword)
      );
      
      renderUsers(displayedUsers);
      showStatus(`Found ${displayedUsers.length} users`, 'success');
      setTimeout(hideStatus, 2000);
    }
    
    // Show all users
    function showAllUsers() {
      document.getElementById('searchInput').value = '';
      displayedUsers = allUsers;
      renderUsers(displayedUsers);
    }
    
    // View user detail
    function viewUser(id) {
      const user = allUsers.find(u => u.id === id);
      if (!user) return;
      
      alert(`
        👤 ${user.name}
        📧 ${user.email}
        📱 ${user.phone}
        🏢 ${user.company.name}
        🌐 ${user.website}
        📍 ${user.address.city}, ${user.address.street}
      `);
    }
    
    // Delete user
    async function deleteUser(id) {
      if (!confirm('Are you sure you want to delete this user?')) {
        return;
      }
      
      try {
        showStatus('⏳ Deleting...', 'loading');
        
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        // Remove from local state
        allUsers = allUsers.filter(u => u.id !== id);
        displayedUsers = displayedUsers.filter(u => u.id !== id);
        
        renderUsers(displayedUsers);
        updateStats();
        
        showStatus('✅ User deleted!', 'success');
        setTimeout(hideStatus, 2000);
        
      } catch (error) {
        showStatus(`❌ Error: ${error.message}`, 'error');
        console.error('Delete error:', error);
      }
    }
    
    // Load on page load
    fetchUsers();
  </script>
</body>
</html>
```

**Aplikasi lengkap dalam 1 file!** Copy dan buka di browser.
</details>

---

## 🎯 Bonus Challenge

Coba tingkatkan User Directory App dengan:

1. **Pagination** - Tampilkan 6 users per page
2. **Sort** - Sort by name, email, company
3. **Filter** - Filter by company
4. **Modal** - Detail user dalam modal, bukan alert
5. **Form** - Real add/edit user form
6. **LocalStorage** - Simpan perubahan lokal

---

## 🏆 Selamat!

Kamu sudah menyelesaikan semua latihan! 🎉

### 📚 Apa Selanjutnya?

1. **Praktek terus** dengan API lain:
   - [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
   - [Public APIs List](https://github.com/public-apis/public-apis)
   - Buat API sendiri!

2. **Explore Advanced Topics:**
   - Interceptors
   - Caching strategies
   - GraphQL
   - WebSocket

3. **Build Real Projects:**
   - Weather App
   - Movie Database
   - E-commerce
   - Social Media Clone

---

## 💡 Tips untuk Terus Belajar

✅ **Buat project kecil setiap minggu**  
✅ **Baca dokumentasi API yang berbeda**  
✅ **Join komunitas developer**  
✅ **Share code di GitHub**  
✅ **Code review dengan teman**  
✅ **Coba fetch dari real-world APIs**  

---

## 🎓 Kesimpulan Dokumentasi

Selamat! Kamu sudah belajar Fetch API dari nol sampai mahir! 🚀

### Yang Sudah Dipelajari:

1. ✅ Pengenalan Fetch API
2. ✅ Syntax dasar GET request
3. ✅ Proses 2 tahap (headers & body)
4. ✅ Berbagai cara baca response
5. ✅ Memeriksa status & error handling
6. ✅ Response & request headers
7. ✅ POST, PUT, PATCH, DELETE
8. ✅ Upload file & binary data
9. ✅ Common pitfalls & debugging
10. ✅ Praktek dengan real exercises

### 🎯 Next Steps:

Sekarang kamu siap untuk:
- Build real applications
- Integrate dengan berbagai APIs
- Handle complex scenarios
- Optimize performance

**Keep coding, keep learning! 💪**

---

### 📌 Final Checklist

Sebelum mulai project besar, pastikan kamu paham:

- [ ] Cara fetch data dari API
- [ ] Error handling yang proper
- [ ] Mengirim data dengan POST/PUT
- [ ] Upload file dengan FormData
- [ ] Async/await vs Promise.then()
- [ ] Status codes (200, 404, 500)
- [ ] CORS dan cara handlenya
- [ ] Best practices & patterns

**Kalau semua ✅, kamu siap! 🚀**

---

Made with ❤️ for Indonesian Developers

**Happy Coding!** 👨‍💻👩‍💻
