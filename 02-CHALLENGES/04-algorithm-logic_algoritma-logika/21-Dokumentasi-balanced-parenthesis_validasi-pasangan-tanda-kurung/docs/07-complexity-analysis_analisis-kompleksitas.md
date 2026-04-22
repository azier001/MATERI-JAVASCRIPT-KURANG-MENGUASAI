# 📊 Complexity Analysis — Analisis Kompleksitas

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Big--O%20|%20Time%20|%20Space-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📚 Daftar Isi

- 🤔 [Apa itu Big-O?](#big-o)
- 🕒 [Time Complexity — Seberapa Cepat?](#time)
- 📦 [Space Complexity — Seberapa Boros Memori?](#space)
- ⚙️ [Kenapa push() dan pop() itu O(1)?](#push-pop)
- 📋 [Tabel Perbandingan Akhir](#perbandingan)

---

<a name="big-o"></a>
## 🤔 Apa itu Big-O?

Big-O adalah **"bahasa gaul" para Engineer** untuk mengukur seberapa efisien sebuah algoritma. Kita mengukur dua hal:

| Ukuran | Pertanyaan | Satuan |
|--------|-----------|--------|
| **Time Complexity** | Seberapa **cepat** kodenya? | Jumlah operasi |
| **Space Complexity** | Seberapa **boros memori** kodenya? | Jumlah memori terpakai |

### Notasi yang Sering Muncul

```
O(1)     → Konstan     → Selalu sama, tidak peduli input sebesar apapun
O(n)     → Linear      → Berbanding lurus dengan ukuran input
O(n²)    → Kuadratik   → Berlipat ganda, biasanya nested loop
```

> 💡 **Analogi:** Big-O itu seperti menanyakan *"Kalau antriannya 10x lebih panjang, seberapa lama lagi saya harus menunggu?"*
> - O(1): *"Sama aja, langsung masuk."* (VIP pass)
> - O(n): *"10x lebih lama."* (antri biasa)
> - O(n²): *"100x lebih lama."* (birokrasi)

---

<a name="time"></a>
## 🕒 Time Complexity — Seberapa Cepat?

### Kedua Versi: O(n)

Baik versi **Stack** maupun **Counter**, keduanya punya Time Complexity yang sama: **O(n)**.

**Kenapa?** Karena kita hanya melewati string **satu kali** dengan satu loop.

> 💡 **Analogi Jalan Tol:** Bayangkan string adalah jalan tol dengan `n` gerbang. Kamu lewat setiap gerbang **tepat satu kali**, tidak pernah mundur.

```
Input: "(()())"   →   n = 6 karakter   →   6 operasi
Input: "()()()()"  →   n = 8 karakter   →   8 operasi
Input: 1 juta char →   n = 1.000.000   →   1.000.000 operasi
```

### Visualisasi: Jumlah Operasi vs Ukuran Input

```
Operasi
  │
  │                                    ╱  O(n) — Linear
  │                                 ╱     (Stack & Counter)
  │                              ╱
  │                           ╱
  │                        ╱
  │                     ╱
  │                  ╱
  │               ╱
  │            ╱
  │         ╱
  │      ╱
  │   ╱
  │╱─────────────────────────────────  O(1) — Konstan
  └─────────────────────────────────── Input (n)
```

### Apa yang terjadi di dalam loop?

Setiap iterasi hanya melakukan operasi **O(1)** (konstan):

```
Satu iterasi loop:
  ├── Cek: paren === '(' ?        → O(1) (perbandingan sederhana)
  ├── push() atau pop()           → O(1) (lihat penjelasan di bawah)
  └── Cek: count < 0 ?            → O(1) (perbandingan sederhana)

Total per iterasi: O(1)
Total keseluruhan: n × O(1) = O(n)
```

---

<a name="space"></a>
## 📦 Space Complexity — Seberapa Boros Memori?

Di sinilah perbedaan besar antara Stack dan Counter!

### Versi Stack: O(n) Space

Stack (Array) menyimpan **setiap kurung buka** yang belum ditutup. Dalam kasus terburuk, semua karakter adalah `(`:

```
Input: "((((("   (5 karakter, semua kurung buka)

Memori Stack: [ '(', '(', '(', '(', '(' ]
                ↑     ↑     ↑     ↑     ↑
                5 slot memori terpakai
```

> 💡 **Analogi Gudang:** Jika ada 1 juta kardus masuk tapi tidak ada yang keluar, gudangmu harus bisa menampung 1 juta kardus. Ukuran gudang **mengikuti** jumlah input.

```
Input 10 char  → Stack max 10 elemen   → Memori: ████
Input 100 char → Stack max 100 elemen  → Memori: ████████████
Input 1M char  → Stack max 1M elemen   → Memori: ████████████████████████████
```

---

### Versi Counter: O(1) Space ✨

Counter hanya menyimpan **satu variabel angka**, tidak peduli seberapa besar inputnya:

```
Input: "((((("   (5 karakter)
Memori Counter: count = 5              → 1 slot memori

Input: "(((((((((("   (10 karakter)
Memori Counter: count = 10             → 1 slot memori (SAMA!)

Input: 1 juta karakter
Memori Counter: count = 1000000        → 1 slot memori (TETAP SAMA!)
```

> 💡 **Analogi:** Stack itu seperti gudang yang harus menyimpan setiap kardus fisik. Counter itu seperti papan tulis yang cuma menulis angka *"Kardus tersisa: 1.000.000"* — satu papan tulis cukup!

```
Input 10 char  → Counter: satu angka → Memori: ██
Input 100 char → Counter: satu angka → Memori: ██
Input 1M char  → Counter: satu angka → Memori: ██ (KONSTAN!)
```

---

<a name="push-pop"></a>
## ⚙️ Kenapa `push()` dan `pop()` itu O(1)?

Ini pertanyaan bagus yang sering muncul di interview!

### `push()` — Menambah di Akhir Array

```
Sebelum push:
  Index:  0    1    2
  Array: ['(', '(', '(']
                         ↑
                         push('(') di sini (langsung di ujung)

Sesudah push:
  Index:  0    1    2    3
  Array: ['(', '(', '(', '(']
```

JavaScript tahu **persis** di mana ujung array berada. Tidak perlu menggeser elemen lain. Langsung taruh → **O(1)**.

---

### `pop()` — Mengambil dari Akhir Array

```
Sebelum pop:
  Index:  0    1    2    3
  Array: ['(', '(', '(', '(']
                              ↑
                              pop() ambil yang ini

Sesudah pop:
  Index:  0    1    2
  Array: ['(', '(', '(']

Nilai yang dikembalikan: '('
```

JavaScript langsung tahu elemen terakhir. Tidak perlu mencari atau menggeser → **O(1)**.

---

### Perbandingan dengan Operasi Lain

| Operasi | Complexity | Kenapa? |
|---------|-----------|---------|
| `push()` | **O(1)** | Langsung tambah di ujung |
| `pop()` | **O(1)** | Langsung ambil dari ujung |
| `unshift()` | O(n) | Harus **geser semua** elemen ke kanan |
| `shift()` | O(n) | Harus **geser semua** elemen ke kiri |

```
unshift('X') pada ['A', 'B', 'C']:

  Langkah 1: Geser 'C' ke index 3   ['A', 'B', _ , 'C']
  Langkah 2: Geser 'B' ke index 2   ['A', _ , 'B', 'C']
  Langkah 3: Geser 'A' ke index 1   [ _ , 'A', 'B', 'C']
  Langkah 4: Taruh 'X' di index 0   ['X', 'A', 'B', 'C']

  → 3 geser + 1 taruh = n operasi = O(n) 🐢
```

> 💡 **Inilah kenapa Stack menggunakan `push/pop` (ujung), bukan `unshift/shift` (depan).** Operasi di ujung array selalu **O(1)** — jauh lebih cepat!

---

<a name="perbandingan"></a>
## 📋 Tabel Perbandingan Akhir

| Aspek | V1 — Stack | V2 — Counter |
|-------|-----------|-------------|
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | **O(n)** | **O(1)** ✨ |
| **Operasi utama** | `push()` O(1), `pop()` O(1) | `++` O(1), `--` O(1) |
| **Memori terpakai (worst case)** | Sebesar input | Selalu 1 variabel |
| **Support multi-kurung** | ✅ Ya | ❌ Tidak |
| **Cocok untuk** | Kasus umum / interview | Optimasi / 1 jenis kurung |

### Rangkuman dalam Satu Kalimat

> **Waktu** kedua versi **sama cepat** (O(n)). Perbedaannya ada di **memori**: Stack menyimpan data sebanyak input (O(n)), sedangkan Counter hanya butuh satu angka (O(1)).

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 6 — Edge Cases](./06-edge-cases_kasus-pojok.md)**
- **📖 [Lanjut ke Part 8 — Test Cases →](./08-test-cases_kasus-pengujian.md)**
