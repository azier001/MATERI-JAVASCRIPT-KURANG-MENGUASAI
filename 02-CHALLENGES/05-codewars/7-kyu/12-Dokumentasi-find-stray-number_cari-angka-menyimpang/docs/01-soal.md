# 📝 Analisis Soal: Find the stray number

## 🎯 Ringkasan

Diberikan sebuah array dengan panjang ganjil yang berisi integer, di mana semua elemen **sama kecuali satu angka yang berbeda**. Tugas kita adalah menemukan angka yang berbeda tersebut.

## 📥 Input

- **Parameter:** `numbers` (array of integers)
- **Karakteristik:**
  - Panjang array **selalu ganjil** (odd-length)
  - Panjang array **minimal 3** (>= 3)
  - Array **selalu valid**
  - Semua elemen sama kecuali **satu angka berbeda**

## 📤 Output

- **Return:** Integer (angka yang berbeda/stray)

## 📊 Contoh

### Contoh 1
```javascript
Input:  [1, 1, 2]
Output: 2
Penjelasan: Angka 1 muncul 2x, angka 2 hanya 1x → angka 2 adalah stray
```

### Contoh 2
```javascript
Input:  [17, 17, 3, 17, 17, 17, 17]
Output: 3
Penjelasan: Angka 17 muncul 6x, angka 3 hanya 1x → angka 3 adalah stray
```

### Contoh 3
```javascript
Input:  [8, 1, 1, 1, 1, 1, 1]
Output: 8
Penjelasan: Angka 1 muncul 6x, angka 8 hanya 1x → angka 8 adalah stray
```

## 🔍 Analisis Pattern

### Karakteristik Utama:
1. **Hanya ada 2 angka unik** dalam array
2. Salah satu angka muncul **hanya 1 kali** (stray number)
3. Angka lainnya muncul **berkali-kali** (majority number)
4. Stray number bisa di **posisi mana saja** (awal, tengah, akhir)
5. Angka bisa **negatif atau positif**

### Edge Cases:
- Array minimal: `[a, b, b]` → stray = a
- Stray di awal: `[stray, x, x]`
- Stray di tengah: `[x, stray, x]`
- Stray di akhir: `[x, x, stray]`
- Angka negatif: `[-21, -21, -6]`
- Angka 0: `[0, 0, 7]` atau `[1, 1, 0]`
- Array besar: 15273 elemen

## 💡 Pendekatan yang Mungkin

1. **Counting/Frequency:** Hitung kemunculan tiap angka, return yang frekuensinya = 1
2. **Set + Filter:** Ambil unique values, filter mana yang hanya muncul 1x
3. **Sorting:** Sort dulu, lalu cek ujung-ujung array
4. **XOR Operation:** Teknik bitwise (advanced)
5. **Compare first 3 elements:** Optimasi untuk array kecil

## ⚙️ Kompleksitas yang Diharapkan

- **Time:** O(n) - single pass ideal
- **Space:** O(1) atau O(n) tergantung pendekatan

---

**Status:** ✅ Analisis selesai  
**Next Step:** Lanjut ke problem solving (`02-pendekatanku.md`)

---

## 🗺️ Navigasi

**📍 Kamu di sini:** 01-soal.md

| ⬅️ Sebelumnya | 🏠 Home | Selanjutnya ➡️ |
|:---|:---:|---:|
| [⬅️ README](../README.md) | [🏠 README](../README.md) | [02-pendekatanku.md ➡️](02-pendekatanku.md) |

---

*💡 Tip: Gunakan navigasi di atas untuk berpindah antar dokumen*
