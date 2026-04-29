# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Categorize New Member — Codewars](https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa)

---

## 📝 Deskripsi Soal

> *The Western Suburbs Croquet Club has two categories of membership, Senior and Open. They would like your help with an application form that will tell prospective members which category they will be placed.*
> 
> *To be a senior, a member must be at least 55 years old and have a handicap greater than 7. In this croquet club, handicaps range from -2 to +26; the better the player the lower the handicap.*

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `data` | `Array` | List of pairs. Each pair contains information for a single potential member: `[age, handicap]` |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `Array` | List of string values (`"Open"` or `"Senior"`) stating whether the respective member is to be placed in the senior or open category. |

---

## 🧪 Contoh

```javascript
// Contoh 1
openOrSenior([[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]) 
// → ["Open", "Open", "Senior", "Open", "Open", "Senior"]
```

---

## ⚠️ Catatan Khusus

- [x] Syarat "Senior": `age >= 55` DAN `handicap > 7`
- [x] Selain syarat di atas, member masuk kategori "Open"
- [ ] Output berupa array string yang sejajar dengan index array input.

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
