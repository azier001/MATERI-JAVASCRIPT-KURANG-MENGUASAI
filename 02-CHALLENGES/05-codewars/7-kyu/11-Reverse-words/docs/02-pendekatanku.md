# 🧠 02 — Pendekatan & Problem Solving

## 💡 Ide Awal

Pendekatan untuk memecahkan masalah ini adalah dengan memecah string menjadi bagian-bagian yang lebih kecil yang bisa kita manipulasi.
Karena string di JavaScript sifatnya *immutable* (tidak bisa diubah secara langsung) dan tidak memiliki *method* `reverse()`, kita harus mengubah string tersebut menjadi Array.

Berikut adalah alur berpikir yang kita bangun:
1. Kita perlu memecah kalimat menjadi array berdasarkan kata (dipisahkan oleh spasi). Spasi harus tetap dijaga.
2. Setiap kata dalam array tersebut kemudian kita proses satu per satu menggunakan `.map()`.
3. Di dalam `.map()`, kita mengubah setiap kata tunggal menjadi array per huruf.
4. Setelah menjadi array per huruf, kita bisa membalikkan urutannya menggunakan `.reverse()`.
5. Kemudian, array huruf yang sudah terbalik tersebut kita gabungkan kembali menjadi string (satu kata) menggunakan `.join('')`.
6. Terakhir, array kumpulan kata yang sudah terbalik kita gabungkan kembali menjadi satu kalimat utuh dengan pemisah spasi `.join(' ')`.

## 💻 Versi Solusi (Final)

Pendekatan menggunakan *Method Chaining* dan *Spread Operator* yang sangat elegan dan modern.

```javascript
function reverseWords(str) {
  return str
    .split(' ')
    .map((word) => [...word].reverse().join(''))
    .join(' ');
}
```

## 🔍 Penjelasan Baris per Baris

- `function reverseWords(str) {`: Deklarasi fungsi yang menerima parameter `str` (sebuah string).
- `return str`: Kita akan langsung mengembalikan hasil transformasi dari string yang diberikan.
- `.split(' ')`: Memecah kalimat `str` menjadi array yang berisi kata-kata, dengan spasi tunggal `" "` sebagai pemisah. Method ini otomatis menjaga spasi ganda (menjadi *empty string* `""` di dalam array).
- `.map((word) => ...)`: Melakukan iterasi dan transformasi pada setiap `word` di dalam array, mengembalikan array baru berisi kata yang sudah terbalik.
- `[...word]`: Ini adalah syntax *Spread Operator*. Fungsinya memecah string `word` menjadi array karakter per huruf (mirip dengan `word.split('')` tetapi lebih aman jika karakter mengandung emoji/Unicode ganda).
- `.reverse()`: Membalikkan urutan array huruf per huruf tersebut.
- `.join('')`: Menggabungkan kembali array berisi huruf-huruf (yang sudah dibalikkan) menjadi sebuah string kata tunggal tanpa pemisah tambahan.
- `.join(' ')`: Setelah semua kata di dalam array berhasil dibalik, gabungkan seluruh array kata tersebut menjadi satu string kalimat utuh, dihubungkan kembali dengan spasi `" "`.
- `}`: Menutup fungsi.

---

*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
