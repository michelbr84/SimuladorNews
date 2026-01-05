\# Layout “Notícias” (Replica) — HTML/CSS/JS



Replica visual (inspirada no layout da imagem) de uma tela de “Notícias” estilo jogo/manager, com:

\- Sidebar esquerda (menu + cartão do usuário)

\- Barra de título vermelha

\- Abas (Todas / Mensagens / Competições / Lesões e Suspensões)

\- Lista de notícias com seleção

\- Área de detalhes da notícia

\- Filtro por categoria

\- Botão \*\*Ler Próxima\*\*

\- Barra inferior com atalhos

\- Navegação \*\*Atrás / Seguinte\*\*

\- \*\*Edição do Nome e Sobrenome do usuário\*\* (modal) + persistência no \*\*localStorage\*\*



> ✅ Sem frameworks. Apenas \*\*HTML + CSS + JavaScript\*\*.



---



\## 📁 Estrutura de arquivos



Crie uma pasta (ex.: `news-layout/`) com estes arquivos:



```



news-layout/

├─ index.html

├─ styles.css

└─ script.js



````



---



\## ▶️ Como rodar



\### Opção 1 — Abrir direto

1\. Dê duplo clique no `index.html`.



> Funciona localmente. O nome/sobrenome salva no navegador (localStorage).



\### Opção 2 — Servidor local (recomendado)

Se quiser evitar qualquer restrição do navegador ao trabalhar com arquivos locais:



\*\*Python\*\*

```bash

python -m http.server 5500

````



Acesse:



\* \[http://localhost:5500](http://localhost:5500)



\*\*Node (http-server)\*\*



```bash

npx http-server -p 5500

```



---



\## 👤 Alterar nome e sobrenome (usuário)



\* Clique no ícone \*\*✎\*\* no cartão do usuário (sidebar).

\* Preencha \*\*Nome\*\* e \*\*Sobrenome\*\*.

\* Clique em \*\*Salvar\*\*.



\### Persistência



O nome fica salvo em:



\* `localStorage` (chave: `cm\_news\_user\_v1`)



Para resetar:



\* Abra o DevTools do navegador → \*\*Application\*\* → \*\*Local Storage\*\* → delete a chave `cm\_news\_user\_v1`

&nbsp; ou rode no console:



```js

localStorage.removeItem("cm\_news\_user\_v1")

```



---



\## 📰 Como editar / adicionar notícias



As notícias estão em `script.js`, no array:



```js

const newsData = \[

&nbsp; {

&nbsp;   id: "n1",

&nbsp;   tab: "todas",

&nbsp;   category: "brasil",

&nbsp;   date: "Sáb 21 Ago TAR",

&nbsp;   title: "Título",

&nbsp;   body: "Texto..."

&nbsp; }

];

```



\### Campos



\* \*\*id\*\*: identificador único

\* \*\*tab\*\*: em qual aba aparece

&nbsp; Valores usados: `todas`, `mensagens`, `competicoes`, `lesoes`

\* \*\*category\*\*: categoria usada no filtro

&nbsp; Valores usados: `brasil`, `transferencias`, `competicoes`, `lesoes` (ou `all`)

\* \*\*date\*\*: string exibida na coluna de data

\* \*\*title\*\*: título na lista e no detalhe

\* \*\*body\*\*: conteúdo (suporta quebras de linha com `\\n\\n`)



\### Exemplo (nova notícia)



```js

newsData.push({

&nbsp; id: "n6",

&nbsp; tab: "todas",

&nbsp; category: "transferencias",

&nbsp; date: "Seg 23 Ago TAR",

&nbsp; title: "Novo reforço chega ao clube",

&nbsp; body: "O jogador foi anunciado oficialmente.\\n\\nDetalhes serão divulgados em breve."

});

```



---



\## 🔎 Filtro



O filtro fica em `index.html`:



```html

<select id="filterSelect">

&nbsp; <option value="all">Todos</option>

&nbsp; <option value="brasil">Brasil</option>

&nbsp; <option value="transferencias">Transferências</option>

&nbsp; <option value="competicoes">Competições</option>

&nbsp; <option value="lesoes">Lesões</option>

</select>

```



Para criar nova categoria:



1\. Adicione um `<option value="novaCategoria">Nova Categoria</option>`

2\. Use `category: "novaCategoria"` nas notícias.



---



\## ⌨️ Controles principais (comportamento)



\* Clique numa notícia → abre no painel da direita

\* \*\*Ler Próxima\*\* → avança para a próxima notícia visível (respeita filtro/aba)

\* \*\*Atrás / Seguinte\*\* → muda a seleção da lista (respeita filtro/aba)

\* Abas → alteram o conjunto de notícias exibidas

\* Modal de edição:



&nbsp; \* Clique fora (overlay) ou no \*\*X\*\* → fecha

&nbsp; \* \*\*ESC\*\* → fecha



---



\## 🎨 Estilo / Personalização rápida



Tudo é controlado por variáveis CSS em `styles.css`:



```css

:root{

&nbsp; --red:#b20000;

&nbsp; --tab:#2a0f6a;

&nbsp; --yellow:#ffd300;

}

```



Sugestões:



\* Ajuste o tamanho do layout alterando `padding` em `.app`

\* Ajuste o “look” geral mexendo nos gradients do `body`, `.panel`, `.detail-wrap`

\* Ajuste tamanhos:



&nbsp; \* Título: `.titlebar h1`

&nbsp; \* Texto da notícia: `.detail-text`



---



\## ✅ Compatibilidade



\* Chrome / Edge / Firefox modernos

\* Funciona offline

\* Não depende de bibliotecas externas



---



\## 📌 Próximos upgrades (opcional)



Se você quiser deixar ainda mais “jogo”:



\* Adicionar sons de clique (opcional)

\* Atalhos de teclado:



&nbsp; \* ↑/↓ para navegar na lista

&nbsp; \* Enter para “Ler Próxima”

\* Paginação real na lista

\* “Mensagens” com ícones/estado (lida/não lida)

\* Dados dinâmicos vindos de JSON externo



---



\## Licença



Uso livre para projetos pessoais e protótipos.

