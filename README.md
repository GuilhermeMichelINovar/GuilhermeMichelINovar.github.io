# Site Pessoal — Guilherme Michel

Site institucional de página única (*onepage*) de **Guilherme Michel**, especialista em
comércio exterior na **Inovar Comércio Exterior & Logística**. Apresenta o profissional,
os serviços de agenciamento de cargas e desembaraço aduaneiro, e explica o processo
logístico **door to door** completo.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-e1251b?style=flat-square)

---

## Sobre o projeto

Um site estático, sem framework, sem build e sem banco de dados. Abre direto no
navegador e pode ser hospedado de graça no GitHub Pages.

O tema visual é inspirado no universo do comércio exterior — rotas aéreas e marítimas
animadas, cartão em formato de passaporte, containers e uma linha do tempo *door to door*
— sempre dentro de um tom sério e profissional. A paleta (vermelho e branco) foi tirada
do logotipo da Inovar.

### Destaques técnicos

- **Zero dependências** — HTML, CSS e JavaScript puros (*vanilla*).
- **Design tokens em CSS** — trocar a identidade visual inteira mexendo em um único arquivo.
- **Mobile-first** e totalmente responsivo (breakpoints em 600px, 768px e 1024px).
- **Acessível** — HTML semântico, navegação por teclado, foco visível, `aria-*` no menu,
  link "pular para o conteúdo" e respeito a `prefers-reduced-motion`.
- **Animações performáticas** — `IntersectionObserver` e `requestAnimationFrame`,
  sem bibliotecas e sem travar a rolagem.
- **Pronto para SEO** — meta tags, Open Graph e dados estruturados JSON-LD.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica e dados estruturados (JSON-LD) |
| CSS3 | Custom properties, Grid, Flexbox, animações e `clamp()` |
| JavaScript (ES5+) | Menu mobile, scroll spy, reveal e contadores |
| SVG inline | Ícones, rotas animadas e favicon |
| Google Fonts | Tipografia Inter |

---

## Estrutura de pastas

```
Site_Pessoal/
├── index.html                # Página única com todas as seções
├── README.md                 # Este arquivo
├── LICENSE                   # Licença MIT (código)
├── .gitignore                # Arquivos que não vão para o repositório
└── assets/
    ├── css/
    │   ├── variables.css     # Design tokens: cores, fontes, espaçamentos
    │   ├── reset.css         # Normalização entre navegadores
    │   └── style.css         # Layout e componentes
    ├── js/
    │   ├── main.js           # Menu mobile, header, scroll spy, ano do rodapé
    │   └── animations.js     # Reveal on scroll e contadores animados
    └── img/
        ├── logo-inovar.png   # Logotipo da Inovar
        └── favicon.svg       # Ícone da aba do navegador
```

> A ordem de carregamento do CSS importa: `variables.css` → `reset.css` → `style.css`.
> Os tokens precisam existir antes de serem usados pelos outros arquivos.

---

## Como rodar localmente

### Opção 1 — o jeito mais simples

Dê duplo clique em `index.html`. Pronto, o site abre no navegador.

### Opção 2 — com Live Server (recarrega sozinho ao salvar)

No VS Code, instale a extensão **Live Server**, clique com o botão direito em
`index.html` e escolha **Open with Live Server**.

### Opção 3 — servidor local via terminal

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

---

## Como personalizar

Tudo que você provavelmente vai querer trocar está listado abaixo.

### Cores

Abra `assets/css/variables.css`. Todas as cores do site saem de lá:

```css
--vermelho: #e1251b;         /* cor principal da marca */
--vermelho-escuro: #a81812;  /* hover dos botões */
--grafite: #1b1f27;          /* hero, rodapé e textos */
```

Mudar `--vermelho` altera botões, ícones, destaques e detalhes do site inteiro de uma vez.

### Número do WhatsApp

O número aparece em **5 lugares** no `index.html`. Busque por `5511968307967`
(Ctrl+F no editor) e substitua em todas as ocorrências.

O formato do link é `https://wa.me/55DDNUMERO?text=mensagem-codificada` — sem espaços,
sem parênteses e sem traço.

### Números da seção "Em números"

Em `index.html`, procure a seção `id="numeros"`. Cada card tem:

```html
<span class="numero__valor contador" data-alvo="500" data-sufixo="+">0</span>
```

- `data-alvo` — o número final da contagem
- `data-sufixo` — o que aparece depois do número (`+`, `%`, ou vazio)

Os valores atuais são estimativas — troque pelos reais.

### Sua foto no cartão de perfil

1. Coloque a foto em `assets/img/guilherme.jpg` (de preferência quadrada, 400×400px).
2. Em `index.html`, procure por `cartao-perfil__iniciais`.
3. Apague a `<div>` das iniciais e descomente a `<img>` que está logo acima dela.

### Logotipo

Substitua `assets/img/logo-inovar.png`. Se o nome do arquivo mudar, atualize as
referências no `index.html` (aparece no header, no rodapé e na meta tag Open Graph).

### Textos

Todo o conteúdo está no `index.html`, dentro das seções marcadas por comentários
em maiúsculas (`HERO`, `SOBRE`, `SERVIÇOS`, `DOOR TO DOOR`, `NÚMEROS`, `CONTATO`).

### Adicionar endereço ou LinkedIn

Na seção `id="contato"` há um comentário `TODO` indicando exatamente onde copiar
um bloco `<a class="canal">` e ajustar.

---

## Publicando no GitHub Pages

Com o repositório já criado no GitHub:

```bash
git init
git add .
git commit -m "Primeira versão do site pessoal"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Depois, no GitHub:

1. Abra o repositório → **Settings** → **Pages**
2. Em **Source**, escolha **Deploy from a branch**
3. Selecione a branch `main` e a pasta `/ (root)`
4. Clique em **Save**

Em um ou dois minutos o site estará no ar em
`https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

> **Dica:** depois de publicar, troque a meta tag `og:image` no `index.html` pela URL
> completa da imagem (ex.: `https://seu-usuario.github.io/repo/assets/img/logo-inovar.png`).
> O WhatsApp e o LinkedIn só exibem a prévia com URL absoluta.

---

## Checklist antes de publicar

- [ ] Número do WhatsApp conferido nos 5 pontos do HTML
- [ ] Números da seção "Em números" atualizados com valores reais
- [ ] Foto de perfil adicionada (ou iniciais mantidas de propósito)
- [ ] `og:image` apontando para uma URL absoluta
- [ ] Testado em celular, tablet e desktop
- [ ] Console do navegador sem erros (F12 → Console)

---

## Roadmap

- [ ] Formulário de cotação (via Formspree ou similar, sem backend)
- [ ] Versão em inglês com alternador de idioma
- [ ] Seção de depoimentos de clientes
- [ ] Página de blog com conteúdo sobre comércio exterior
- [ ] Domínio próprio

---

## Licença

O **código** deste projeto está sob a licença [MIT](LICENSE) — sinta-se livre para
estudar e reaproveitar.

O **logotipo**, a marca *Inovar* e os textos institucionais não estão cobertos pela
licença e permanecem de propriedade de seus titulares.

---

## Contato

**Guilherme Michel** — Comércio Exterior & Logística Internacional
Inovar Comércio Exterior & Logística · Agente IATA acreditado

- WhatsApp: [+55 11 96830-7967](https://wa.me/5511968307967)
- E-mail: [guilherme@inovar-comex.com.br](mailto:guilherme@inovar-comex.com.br)
