# 🔐 Balanced Parenthesis — `isBalanced`

![Difficulty](https://img.shields.io/badge/Difficulty-Easy--Medium-yellowgreen?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topics](https://img.shields.io/badge/Topics-Stack%20|%20Counter%20|%20LIFO-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

> 📝 *Dokumentasi pribadi ini dibuat untuk membantu saya memahami dan mengingat kembali konsep-konsep yang dipelajari saat mengerjakan challenge Balanced Parenthesis.*

---

## 🧩 Deskripsi Challenge

Diberikan sebuah fungsi `isBalanced(str)` yang menerima satu parameter berupa **string yang hanya berisi tanda kurung** `(` dan `)`. Fungsi harus mengembalikan `true` jika setiap kurung buka `(` memiliki pasangan kurung tutup `)` yang sesuai, dan `false` jika tidak.

```
str = "(()())"
  → '(' masuk   → Stack: ['(']
  → '(' masuk   → Stack: ['(', '(']
  → ')' cocok!  → Stack: ['(']
  → '(' masuk   → Stack: ['(', '(']
  → ')' cocok!  → Stack: ['(']
  → ')' cocok!  → Stack: []
  → Stack kosong ✅ → return true
```

> 💡 **Konsep kunci:** Gunakan **Stack (LIFO)** — yang terakhir masuk harus pertama keluar, seperti tumpukan kardus di gudang.

---

## 📤 Expected Output

| Input | Output | Alasan |
|-------|--------|--------|
| `"()"` | `true` | Satu pasang kurung yang cocok |
| `"()()"` | `true` | Dua pasang kurung yang cocok |
| `"(()())"` | `true` | Kurung bersarang, semua cocok |
| `"(()"` | `false` | Ada `(` yang tidak punya pasangan |
| `")("` | `false` | `)` muncul sebelum ada `(` |

---

## ▶️ Coba Langsung

```js
console.log(isBalanced('()'));
// Output: true
```

```js
console.log(isBalanced('(()())'));
// Output: true
```

```js
console.log(isBalanced('(()'));
// Output: false
```

```js
console.log(isBalanced(')('));
// Output: false
```

---

## 📊 Quick Comparison: Semua Versi

| Versi | Pendekatan | Space Complexity | Keunggulan |
|-------|-----------|------------------|------------|
| **V1 — Stack** | `push('(')` / `pop()` | O(n) | Fleksibel, bisa dikembangkan untuk `{}[]` |
| **V2 — Counter** | `count++` / `count--` | O(1) | Hemat memori, cocok untuk satu jenis kurung |

---

## 📂 Struktur Dokumentasi

| File | Topik |
|------|-------|
| 📄 [01-challenge-overview_gambaran-challenge.md](./docs/01-challenge-overview_gambaran-challenge.md) | Gambaran lengkap challenge & aturan |
| 📄 [02-problem-solving-approach_alur-berpikir.md](./docs/02-problem-solving-approach_alur-berpikir.md) | Analogi "Tukang Kardus" & alur berpikir |
| 📄 [03-v1-stack-implementation_stack.md](./docs/03-v1-stack-implementation_stack.md) | V1 — Implementasi dengan Stack + visualisasi ASCII |
| 📄 [04-v2-counter-implementation_counter.md](./docs/04-v2-counter-implementation_counter.md) | V2 — Implementasi dengan Counter + visualisasi ASCII |
| 📄 [05-refactoring_optimasi.md](./docs/05-refactoring_optimasi.md) | Guard clause, early exit, penamaan variabel |
| 📄 [06-edge-cases_kasus-pojok.md](./docs/06-edge-cases_kasus-pojok.md) | String kosong, spasi, sanitasi input |
| 📄 [07-complexity-analysis_analisis-kompleksitas.md](./docs/07-complexity-analysis_analisis-kompleksitas.md) | Analisis Big-O: time & space |
| 📄 [08-test-cases_kasus-pengujian.md](./docs/08-test-cases_kasus-pengujian.md) | Test cases lengkap & cara pengujian |

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Memahami konsep **Stack (LIFO)** — Last In First Out
- ✅ Menggunakan **`push()`** dan **`pop()`** pada Array sebagai Stack
- ✅ Membedakan pendekatan **Stack (O(n) space)** vs **Counter (O(1) space)**
- ✅ Memahami kapan masing-masing pendekatan cocok digunakan
- ✅ Menerapkan **guard clause** dan **early exit** untuk optimasi kode
- ✅ Menangani **edge cases** (string kosong, input tidak valid)
- ✅ Menganalisis **Time & Space Complexity** dari solusi

---

<div align="center">

## 🎯 Mari Mulai Belajar!

**📚 [Mulai dari Part 1 — Challenge Overview →](./docs/01-challenge-overview_gambaran-challenge.md)**

---

**Quick Links:**

[01 Overview](./docs/01-challenge-overview_gambaran-challenge.md) • [02 Alur Berpikir](./docs/02-problem-solving-approach_alur-berpikir.md) • [03 V1 Stack](./docs/03-v1-stack-implementation_stack.md) • [04 V2 Counter](./docs/04-v2-counter-implementation_counter.md) • [05 Refactoring](./docs/05-refactoring_optimasi.md) • [06 Edge Cases](./docs/06-edge-cases_kasus-pojok.md) • [07 Complexity](./docs/07-complexity-analysis_analisis-kompleksitas.md) • [08 Test Cases](./docs/08-test-cases_kasus-pengujian.md)

---

Made with ❤️ for learners — **Happy Learning! 🚀**

</div>
