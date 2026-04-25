# 🎭 Costinha Soundboard

> Um soundboard interativo em homenagem ao grande comediante brasileiro **Costinha**, feito com HTML, CSS e JavaScript puro — sem frameworks, sem dependências!

---

## 📁 Estrutura do Projeto

```
costinha-soundboard/
│
├── index.html        ← Arquivo principal (renomeie o costinha.html para este)
├── README.md         ← Este arquivo
│
└── audio/            ← Pasta com os arquivos de áudio
    ├── piada01.mp3
    ├── piada02.mp3
    ├── piada03.mp3
    └── ... (até piada30.mp3)
```

---

## 🚀 Como usar

1. **Clone ou baixe** os arquivos do projeto
2. Crie a pasta `audio/` dentro do projeto
3. Coloque seus arquivos `.mp3` dentro dela, nomeados como `piada01.mp3`, `piada02.mp3`, etc.
4. Abra o `index.html` no navegador

Pronto! Nenhuma instalação necessária. 🎉

---

## 🎨 Funcionalidades

- 30 botões circulares, cada um representando uma piada
- Cores vibrantes que variam entre os botões
- Animação de pulso enquanto o áudio está tocando
- Confetes coloridos ao clicar em um botão
- Barra de status na base da tela mostrando o áudio atual
- Botão para parar a reprodução
- Responsivo para celular e desktop

---

## ✏️ Como personalizar

### Trocar o nome ou emoji de uma piada

No arquivo `index.html`, localize o array `const piadas` e edite os campos:

```javascript
{ id: 1, emoji: "😂", label: "Meu texto aqui", src: "audio/piada01.mp3" },
```

| Campo   | Descrição                          |
| ------- | ---------------------------------- |
| `id`    | Número identificador (não alterar) |
| `emoji` | Ícone exibido no botão             |
| `label` | Legenda exibida abaixo do botão    |
| `src`   | Caminho para o arquivo de áudio    |

### Adicionar mais piadas

Basta adicionar uma nova linha no array `piadas` e colocar o arquivo `.mp3` correspondente na pasta `audio/`.

### Trocar as cores dos botões

No CSS, edite as classes `.cor-0` até `.cor-9`:

```css
.cor-0 {
  background: linear-gradient(135deg, #e53935, #b71c1c);
}
```

---

## 🔊 Formatos de áudio suportados

| Formato | Suporte nos navegadores    |
| ------- | -------------------------- |
| `.mp3`  | ✅ Excelente (recomendado) |
| `.ogg`  | ✅ Bom (Firefox/Chrome)    |
| `.wav`  | ✅ Bom (arquivos maiores)  |

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da página e API de áudio (`<audio>`)
- **CSS3** — animações, grid layout, variáveis CSS, efeitos visuais
- **JavaScript** — lógica de reprodução, confetes, interações
- **Google Fonts** — fontes _Bangers_ e _Patrick Hand_
