# 📚 Ringkasan Algoritma Semua Versi – Balanced Parenthesis

## 📦 Versi 1 – Stack (LIFO)
```js
function isBalancedStack(str) {
  // Guard clause: jika panjang ganjil, pasti tidak seimbang
  if (str.length % 2 !== 0) return false;

  const stack = [];

  for (const ch of str) {
    if (ch === '(') {
      stack.push(ch);
    } else if (ch === ')') {
      // Early‑exit bila tidak ada yang dapat dipop
      if (stack.pop() === undefined) return false;
    }
  }
  
  return stack.length === 0;
}
```

**Kelebihan**
- Menangani **kurung campuran** (jika nanti ditambah `{}` atau `[]`).
- Visualisasi yang intuitif: tumpukan barang di gudang.

**Kekurangan**
- **Space O(n)** – menyimpan semua kurung buka yang belum ditutup.
- Sedikit lebih lambat karena operasi `push/pop`.

---
## 🎈 Versi 2 – Counter (O(1) Space)
```js
function isBalancedCounter(str) {
  // Guard clause: panjang ganjil -> pasti tidak seimbang
  if (str.length % 2 !== 0) return false;

  let count = 0;

  for (const ch of str) {
    if (ch === '(') {
      count++;
    } else if (ch === ')') {
      count--;
      // Jika hitungan menjadi negatif, ada tutup sebelum buka
      if (count < 0) return false;
    }
  }

  return count === 0;
}
```

**Kelebihan**
- **Space O(1)** – hanya satu variabel integer.
- Lebih cepat pada input yang sangat panjang.

**Kekurangan**
- Hanya cocok **untuk satu jenis kurung**. Jika nanti ada `{}` atau `[]` tidak dapat mendeteksi urutan yang salah.

---
## ⚖️ Perbandingan Ringkas
| Faktor | Stack | Counter |
|--------|-------|---------|
| **Space** | O(n) – menampung semua `(` yang belum ditutup | O(1) – satu counter |
| **Time** | O(n) – satu scan | O(n) – satu scan |
| **Kebolehan** | Bisa diperluas ke banyak tipe kurung | Hanya satu tipe kurung `()` |
| **Implementasi** | Lebih panjang (push/pop, guard clause) | Lebih singkat (++)/`--` |
| **Risiko** | Lupa `pop` atau `stack.length` | Lupa kondisi `count < 0` |

---
## 🚀 Kapan Pakai yang Mana?
- **Jika tantangan hanya `()`** → gunakan **Counter** untuk efisiensi memori.
- **Jika ada kemungkinan menambah tipe kurung lain** (mis. `{}`, `[]`) → gunakan **Stack**.
- **Jika ingin demonstrasi konsep data‑struktur** pada pembelajaran → **Stack** lebih edukatif.

---
## 🧪 Contoh Penggunaan Bersamaan
```js
const tests = [
  "()",
  "()()",
  "(()())",
  "(()",
  ")(",
  "",
];

tests.forEach(t => {
  console.log(t, "=>", isBalancedStack(t), "/", isBalancedCounter(t));
});
```

Output yang diharapkan:
```
() => true / true
()() => true / true
(()()) => true / true
(() => false / false
)( => false / false
 => true / true
```

---
## 📚 Referensi Tambahan
- Algoritma Stack pada **Data‑Structure** klasik.
- Optimasi **O(1) space** dengan counter – teknik yang sering muncul di interview.
- Visualisasi ASCII di dokumen `03‑v1-stack-implementation_stack.md` & `04‑v2-counter-implementation_counter.md`.

---
*Dokumentasi ini disusun untuk membantu pemula memahami logika di balik pengecekan keseimbangan kurung, sekaligus memberi wawasan tentang trade‑off algoritma.*
