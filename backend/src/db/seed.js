/* =============================================
   COSTINHA API — src/db/seed.js
   Popula o banco com as 30 piadas iniciais
   Execute com: npm run db:seed
   ============================================= */

require("dotenv").config();
const db = require("./database");

const piadas = [
  { titulo: "Não é possível!",            emoji: "😂", arquivo: "piada01.mp3" },
  { titulo: "Vou te contar uma coisa...", emoji: "🤣", arquivo: "piada02.mp3" },
  { titulo: "Que situação!",              emoji: "😹", arquivo: "piada03.mp3" },
  { titulo: "Isso é demais!",             emoji: "🎉", arquivo: "piada04.mp3" },
  { titulo: "Minha nossa senhora!",       emoji: "😆", arquivo: "piada05.mp3" },
  { titulo: "Que negócio danado!",        emoji: "🤦", arquivo: "piada06.mp3" },
  { titulo: "Tô rindo à toa!",            emoji: "😜", arquivo: "piada07.mp3" },
  { titulo: "Misericórdia!",              emoji: "🥴", arquivo: "piada08.mp3" },
  { titulo: "Que vergonha alheia!",       emoji: "🙈", arquivo: "piada09.mp3" },
  { titulo: "Tá brincando comigo!",       emoji: "😅", arquivo: "piada10.mp3" },
  { titulo: "Pior que é verdade!",        emoji: "😝", arquivo: "piada11.mp3" },
  { titulo: "Palhaçada pura!",            emoji: "🤪", arquivo: "piada12.mp3" },
  { titulo: "Isso só comigo!",            emoji: "😂", arquivo: "piada13.mp3" },
  { titulo: "Que confusão!",              emoji: "🤣", arquivo: "piada14.mp3" },
  { titulo: "Sou craque nisso!",          emoji: "😎", arquivo: "piada15.mp3" },
  { titulo: "Tudo ao contrário!",         emoji: "🙃", arquivo: "piada16.mp3" },
  { titulo: "Que aperto!",               emoji: "😩", arquivo: "piada17.mp3" },
  { titulo: "Sou um palhaço!",            emoji: "🤡", arquivo: "piada18.mp3" },
  { titulo: "Sabia que ia dar errado!",   emoji: "😏", arquivo: "piada19.mp3" },
  { titulo: "Tá na hora da festa!",       emoji: "🥳", arquivo: "piada20.mp3" },
  { titulo: "Que susto danado!",          emoji: "😱", arquivo: "piada21.mp3" },
  { titulo: "Até dormindo erro!",         emoji: "😴", arquivo: "piada22.mp3" },
  { titulo: "Com certeza absoluta!",      emoji: "🤓", arquivo: "piada23.mp3" },
  { titulo: "Apertei o botão errado!",    emoji: "😬", arquivo: "piada24.mp3" },
  { titulo: "Que saudade disso!",         emoji: "🤗", arquivo: "piada25.mp3" },
  { titulo: "Não aguento mais!",          emoji: "😤", arquivo: "piada26.mp3" },
  { titulo: "Derreti de rir!",            emoji: "🫠", arquivo: "piada27.mp3" },
  { titulo: "Puro teatro!",              emoji: "🎭", arquivo: "piada28.mp3" },
  { titulo: "Carta na manga!",            emoji: "🃏", arquivo: "piada29.mp3" },
  { titulo: "O melhor de todos!",         emoji: "🏆", arquivo: "piada30.mp3" },
];

// Limpa a tabela antes de reinserir (evita duplicatas no re-seed)
db.prepare("DELETE FROM piadas").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name = 'piadas'").run();

const inserir = db.prepare(
  "INSERT INTO piadas (titulo, emoji, arquivo) VALUES (@titulo, @emoji, @arquivo)"
);

const inserirTodos = db.transaction((lista) => {
  for (const p of lista) inserir.run(p);
});

inserirTodos(piadas);

const total = db.prepare("SELECT COUNT(*) as total FROM piadas").get();
console.log(`✅ Banco populado com ${total.total} piadas!`);

db.close();
