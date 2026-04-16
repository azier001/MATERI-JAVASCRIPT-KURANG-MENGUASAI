# 🧩 Object Composition in JavaScript / Komposisi Objek dalam JavaScript

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Object%20Composition-blue?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)

> 🗒️ **Catatan Pribadi:** Dokumentasi ini dibuat setelah belajar OOP — khususnya untuk memahami kenapa inheritance saja tidak selalu cukup, dan bagaimana Object Composition bisa jadi solusi yang lebih fleksibel.

---

## 📚 Daftar Isi

- 🤔 [Masalah dengan Inheritance](#masalah-dengan-inheritance)
- 💡 [Apa itu Object Composition?](#apa-itu-object-composition)
- 📦 [Membuat Kotak Kemampuan](#membuat-kotak-kemampuan)
- 🔧 [Object.assign() — Si Penempel Stiker](#objectassign)
- 🏗️ [Membuat Karakter dengan Object Creator](#membuat-karakter-dengan-object-creator)
- ⚔️ [Studi Kasus: Warrior](#studi-kasus-warrior)
- ▶️ [Kode Lengkap & Output](#kode-lengkap--output)
- 🆚 [Perbandingan: Inheritance vs Composition](#perbandingan-inheritance-vs-composition)
- ❌ [Jebakan yang Perlu Dihindari](#jebakan-yang-perlu-dihindari)

---

<a name="masalah-dengan-inheritance"></a>
## 🤔 Masalah dengan Inheritance

Bayangin kita lagi bikin video game. Ada karakter **Monster**, **Guardian**, dan **Wizard**. Dengan inheritance, strukturnya seperti ini:

```js
class Character {
  constructor(name, health, position) {
    this.name = name;
    this.health = health;
    this.position = position;
  }

  canMove() {
    console.log(`${this.name} moves to another position!`);
  }
}

class Monster extends Character {
  canAttack() {
    console.log(`${this.name} attacks with a weapon!`);
  }
}

class Guardian extends Character {
  canDefend() {
    console.log(`${this.name} defends with a shield!`);
  }
}

class Wizard extends Character {
  canCastSpell() {
    console.log(`${this.name} casts a magic spell!`);
  }
}
```

Sampai di sini masih oke. Tapi tiba-tiba kita perlu karakter baru — **Warrior** — yang bisa **menyerang DAN bertahan** sekaligus.

```js
// Terpaksa nulis ulang canAttack dan canDefend lagi 😩
class Warrior extends Character {
  canAttack() {
    console.log(`${this.name} attacks with a weapon!`);
  }

  canDefend() {
    console.log(`${this.name} defends with a shield!`);
  }
}
```

### ❌ Masalahnya apa?

Sekarang `canAttack()` ada di **dua tempat** — di `Monster` dan di `Warrior`. Kalau kita mau mengubah cara menyerang, kita harus **ubah di dua tempat sekaligus**. Kalau karakternya ada 10 yang bisa menyerang? Ubah di **10 tempat**. Ini tidak efektif!

---

<a name="apa-itu-object-composition"></a>
## 💡 Apa itu Object Composition?

Object Composition adalah pendekatan di mana kita **menyusun karakter berdasarkan kemampuan**, bukan berdasarkan identitas/peran.

| Pendekatan | Fokus | Contoh |
|---|---|---|
| 🏛️ Inheritance | Identitas / Peran | "Dia adalah Monster" |
| 🧩 Composition | Kemampuan | "Dia bisa menyerang" |

### Analogi Stiker 🗡️🛡️✨

Bayangin setiap kemampuan adalah **stiker terpisah**:

```
📦 Stiker Serang   → bisa attack
📦 Stiker Tahan    → bisa defend
📦 Stiker Sihir    → bisa castSpell
```

Mau bikin karakter baru? Tinggal **pilih stiker** yang dibutuhkan:

```
Monster  → tempel Stiker Serang
Guardian → tempel Stiker Tahan
Wizard   → tempel Stiker Sihir
Warrior  → tempel Stiker Serang + Stiker Tahan
```

Kalau cara menyerang berubah? Cukup ubah **satu Stiker Serang** — semua karakter yang pakai stiker itu otomatis ikut berubah. ✅

---

<a name="membuat-kotak-kemampuan"></a>
## 📦 Membuat Kotak Kemampuan

Dalam kode JavaScript, "kotak kemampuan" ditulis sebagai **function yang mengembalikan object**:

```js
// 🗡️ Kotak kemampuan menyerang
function canAttack(character) {
  return {
    attack: () => {
      console.log(`${character.name} attacks with a weapon!`);
    }
  };
}
```

```js
// 🛡️ Kotak kemampuan bertahan
function canDefend(character) {
  return {
    defend: () => {
      console.log(`${character.name} defends with a shield!`);
    }
  };
}
```

```js
// ✨ Kotak kemampuan sihir
function canCastSpell(character) {
  return {
    castSpell: () => {
      console.log(`${character.name} casts a spell!`);
    }
  };
}
```

### 🔍 Kenapa perlu parameter `character`?

Function ini butuh tahu **"stiker ini untuk siapa"** — supaya bisa menulis nama yang benar di dalam pesan `console.log`.

```
canAttack(monster)
      ↓
character = monster
      ↓
character.name = "Monster"
      ↓
menghasilkan: { attack: () => { "Monster attacks with a weapon!" } }
```

---

<a name="objectassign"></a>
## 🔧 Object.assign() — Si Penempel Stiker

`Object.assign()` adalah method bawaan JavaScript yang tugasnya **menggabungkan dua object atau lebih** menjadi satu.

```js
Object.assign(target, source)
// target → object yang mau ditambahkan kemampuan
// source → object yang kemampuannya mau dipindahkan
```

### Contoh Sederhana

```js
const monster = { name: "Monster", health: 100 };

const stikerSerang = canAttack(monster);
// stikerSerang = { attack: () => { ... } }

Object.assign(monster, stikerSerang);
```

Setelah `Object.assign`, `monster` sekarang punya:

```js
{
  name: "Monster",
  health: 100,
  attack: () => { ... }  // ← kemampuan baru nempel! ✅
}
```

### Menempel Beberapa Stiker Sekaligus

`Object.assign()` bisa menerima **lebih dari satu source**:

```js
Object.assign(target, source1, source2, source3)
```

---

<a name="membuat-karakter-dengan-object-creator"></a>
## 🏗️ Membuat Karakter dengan Object Creator

Daripada pakai `class` untuk setiap karakter, kita pakai **function creator** yang menggabungkan `Character` dengan kemampuan yang dibutuhkan:

```js
// Fondasi semua karakter tetap pakai class
class Character {
  constructor(name, health, position) {
    this.name = name;
    this.health = health;
    this.position = position;
  }

  canMove() {
    console.log(`${this.name} moves to another position!`);
  }
}
```

```js
// 👹 Monster — hanya bisa menyerang
function createMonster(name) {
  const character = new Character(name, 100, 0);

  return Object.assign(character, canAttack(character));
}
```

```js
// 🛡️ Guardian — hanya bisa bertahan
function createGuardian(name) {
  const character = new Character(name, 100, 0);

  return Object.assign(character, canDefend(character));
}
```

```js
// 🧙 Wizard — hanya bisa sihir
function createWizard(name) {
  const character = new Character(name, 100, 0);

  return Object.assign(character, canCastSpell(character));
}
```

---

<a name="studi-kasus-warrior"></a>
## ⚔️ Studi Kasus: Warrior

Warrior butuh **dua kemampuan sekaligus** — menyerang dan bertahan. Dengan Object Composition, ini sangat mudah:

```js
// ⚔️ Warrior — bisa menyerang DAN bertahan
const createWarrior = (name) => {
  const character = new Character(name, 100, 0);

  return Object.assign(character, canAttack(character), canDefend(character));
};
```

Hanya perlu satu baris `Object.assign` dengan dua source! Tidak perlu duplikasi kode sama sekali. ✅

---

<a name="kode-lengkap--output"></a>
## ▶️ Kode Lengkap & Output

```js
class Character {
  constructor(name, health, position) {
    this.name = name;
    this.health = health;
    this.position = position;
  }

  canMove() {
    console.log(`${this.name} moves to another position!`);
  }
}

function canAttack(character) {
  return {
    attack: () => {
      console.log(`${character.name} attacks with a weapon!`);
    }
  };
}

function canDefend(character) {
  return {
    defend: () => {
      console.log(`${character.name} defends with a shield!`);
    }
  };
}

function canCastSpell(character) {
  return {
    castSpell: () => {
      console.log(`${character.name} casts a spell!`);
    }
  };
}

function createMonster(name) {
  const character = new Character(name, 100, 0);
  return Object.assign(character, canAttack(character));
}

function createGuardian(name) {
  const character = new Character(name, 100, 0);
  return Object.assign(character, canDefend(character));
}

function createWizard(name) {
  const character = new Character(name, 100, 0);
  return Object.assign(character, canCastSpell(character));
}

const createWarrior = (name) => {
  const character = new Character(name, 100, 0);
  return Object.assign(character, canAttack(character), canDefend(character));
};
```

```js
// Membuat dan menjalankan semua karakter
const monster = createMonster('Monster');
monster.canMove();
monster.attack();

const guardian = createGuardian('Guardian');
guardian.canMove();
guardian.defend();

const wizard = createWizard('Wizard');
wizard.canMove();
wizard.castSpell();

const warrior = createWarrior('Warrior');
warrior.canMove();
warrior.attack();
warrior.defend();
```

**Output:**

```
Monster moves to another position!
Monster attacks with a weapon!
Guardian moves to another position!
Guardian defends with a shield!
Wizard moves to another position!
Wizard casts a spell!
Warrior moves to another position!
Warrior attacks with a weapon!
Warrior defends with a shield!
```

---

<a name="perbandingan-inheritance-vs-composition"></a>
## 🆚 Perbandingan: Inheritance vs Composition

| | 🏛️ Inheritance | 🧩 Composition |
|---|---|---|
| **Pendekatan** | Berdasarkan identitas | Berdasarkan kemampuan |
| **Duplikasi kode** | ❌ Bisa terjadi | ✅ Tidak ada |
| **Fleksibilitas** | ❌ Kurang fleksibel | ✅ Sangat fleksibel |
| **Karakter baru** | Perlu class baru | Cukup kombinasikan function |
| **Ubah satu kemampuan** | ❌ Ubah di banyak tempat | ✅ Cukup ubah satu tempat |

---

<a name="jebakan-yang-perlu-dihindari"></a>
## ❌ Jebakan yang Perlu Dihindari

**❌ Salah — memanggil nama function bukan method:**

```js
warrior.canAttack(); // ❌ Error! canAttack adalah nama function-nya
```

```js
warrior.attack();    // ✅ Benar! attack adalah nama method di dalam object
```

**Ingat:**
- `canAttack` → nama **function** pembuat stiker
- `attack` → nama **method** yang ditempel ke karakter

---

> 💬 **Kesimpulan:** Object Composition memungkinkan kita menyusun karakter dari kemampuan-kemampuan terpisah yang bisa digunakan ulang. Kalau ada perubahan pada satu kemampuan, cukup ubah di satu tempat — semua karakter yang punya kemampuan itu otomatis ikut berubah!
