// script.js
const STORAGE_KEY = "cm_news_user_v1";

const newsData = [
  {
    id: "n1",
    tab: "todas",
    category: "brasil",
    date: "Sáb 21 Ago TAR",
    title: "Brasil toma conhecimento de candidatura a lugar",
    body:
      "O Brasil recebeu a sua candidatura ao cargo de treinador.\n\nA escolha será anunciada em breve."
  },
  {
    id: "n2",
    tab: "todas",
    category: "brasil",
    date: "Sáb 21 Ago TAR",
    title: "Brasil escolhe o seu para treinador",
    body:
      "A federação anunciou o novo treinador.\n\nA equipa técnica deverá apresentar-se nos próximos dias."
  },
  {
    id: "n3",
    tab: "todas",
    category: "competicoes",
    date: "Sex 20 Ago TAR",
    title: "Reservas do Baré: empate",
    body:
      "A equipa de reservas empatou num jogo equilibrado.\n\nDestaques: organização defensiva e boa posse de bola."
  },
  {
    id: "n4",
    tab: "todas",
    category: "transferencias",
    date: "Sex 20 Ago MNNH",
    title: "Nonato transfere-se para o Parma",
    body:
      "O jogador foi apresentado e assinou contrato.\n\nO clube espera integração imediata no plantel."
  },
  {
    id: "n5",
    tab: "todas",
    category: "transferencias",
    date: "Qui 19 Ago NTE",
    title: "Aldrovani elogiado",
    body:
      "O atleta recebeu elogios pela consistência.\n\nO staff destaca evolução física e disciplina tática."
  },

  // Exemplos por aba
  {
    id: "m1",
    tab: "mensagens",
    category: "all",
    date: "Sáb 21 Ago TAR",
    title: "Mensagem: reunião marcada",
    body:
      "Foi agendada uma reunião para discutir próximos jogos.\n\nVerifique a sua caixa de mensagens."
  },
  {
    id: "c1",
    tab: "competicoes",
    category: "competicoes",
    date: "Sex 20 Ago TAR",
    title: "Competição: calendário atualizado",
    body:
      "O calendário da competição foi atualizado.\n\nAlguns horários podem ter sido ajustados."
  },
  {
    id: "l1",
    tab: "lesoes",
    category: "lesoes",
    date: "Qui 19 Ago TAR",
    title: "Lesão: jogador em observação",
    body:
      "O departamento médico avaliou o atleta.\n\nPrevisão de retorno será confirmada após exames."
  }
];

// ---------- UI refs ----------
const els = {
  tabs: Array.from(document.querySelectorAll(".tab")),
  list: document.getElementById("newsList"),
  filter: document.getElementById("filterSelect"),
  title: document.getElementById("newsTitle"),
  body: document.getElementById("newsBody"),
  readNext: document.getElementById("readNextBtn"),
  back: document.getElementById("backBtn"),
  next: document.getElementById("nextBtn"),

  // User name UI
  headerFullName: document.getElementById("headerFullName"),
  sideFirstName: document.getElementById("sideFirstName"),
  sideLastName: document.getElementById("sideLastName"),
  badgeFirstName: document.getElementById("badgeFirstName"),
  badgeLastName: document.getElementById("badgeLastName"),
  editUserBtn: document.getElementById("editUserBtn"),

  // Modal
  modal: document.getElementById("userModal"),
  form: document.getElementById("userForm"),
  firstNameInput: document.getElementById("firstNameInput"),
  lastNameInput: document.getElementById("lastNameInput")
};

let state = {
  activeTab: "todas",
  filter: "all",
  visible: [],
  selectedIndex: -1,
  user: loadUser()
};

// ---------- User helpers ----------
function sanitizeName(value){
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 24);
}

function loadUser(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { firstName: "Michel", lastName: "Duek" };
    const parsed = JSON.parse(raw);
    const firstName = sanitizeName(parsed.firstName) || "Michel";
    const lastName = sanitizeName(parsed.lastName) || "Duek";
    return { firstName, lastName };
  }catch{
    return { firstName: "Michel", lastName: "Duek" };
  }
}

function saveUser(user){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function renderUser(){
  const full = `${state.user.firstName} ${state.user.lastName}`.trim();

  els.headerFullName.textContent = full || "Usuário";
  els.sideFirstName.textContent = state.user.firstName || "—";
  els.sideLastName.textContent = state.user.lastName || "—";

  els.badgeFirstName.textContent = state.user.firstName || "—";
  els.badgeLastName.textContent = state.user.lastName || "—";
}

// ---------- News logic ----------
function setActiveTab(tabId){
  state.activeTab = tabId;
  state.selectedIndex = -1;

  els.tabs.forEach(btn => {
    const isOn = btn.dataset.tab === tabId;
    btn.classList.toggle("is-active", isOn);
    btn.setAttribute("aria-selected", String(isOn));
  });

  render();
}

function getFiltered(){
  const byTab = newsData.filter(n => n.tab === state.activeTab);
  if (state.filter === "all") return byTab;
  return byTab.filter(n => n.category === state.filter);
}

function render(){
  state.visible = getFiltered();
  els.list.innerHTML = "";

  state.visible.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "news-item";
    row.setAttribute("role", "option");
    row.setAttribute("aria-selected", "false");
    row.dataset.index = String(idx);

    const date = document.createElement("div");
    date.className = "news-date";
    date.textContent = item.date;

    const title = document.createElement("div");
    title.className = "news-title";
    title.textContent = item.title;

    row.appendChild(date);
    row.appendChild(title);

    row.addEventListener("click", () => selectIndex(idx));

    els.list.appendChild(row);
  });

  if (state.visible.length > 0 && state.selectedIndex === -1){
    selectIndex(0, { scroll:false });
  } else if (state.visible.length === 0){
    els.title.textContent = "Sem notícias neste filtro";
    els.body.textContent = "Altere o filtro ou selecione outra aba.";
  }
}

function selectIndex(idx, opts = { scroll:true }){
  const max = state.visible.length - 1;
  if (max < 0) return;

  state.selectedIndex = Math.max(0, Math.min(idx, max));

  const rows = Array.from(els.list.querySelectorAll(".news-item"));
  rows.forEach((r, i) => {
    const sel = i === state.selectedIndex;
    r.classList.toggle("is-selected", sel);
    r.setAttribute("aria-selected", String(sel));
    if (sel && opts.scroll) r.scrollIntoView({ block:"nearest" });
  });

  const item = state.visible[state.selectedIndex];
  if (!item) return;

  els.title.textContent = item.title;
  els.body.textContent = item.body;
}

function readNext(){
  if (state.visible.length === 0) return;
  const next = (state.selectedIndex + 1) % state.visible.length;
  selectIndex(next);
}

function goBack(){
  if (state.visible.length === 0) return;
  selectIndex(state.selectedIndex - 1);
}

function goNext(){
  if (state.visible.length === 0) return;
  selectIndex(state.selectedIndex + 1);
}

// ---------- Modal helpers ----------
function openModal(){
  els.firstNameInput.value = state.user.firstName;
  els.lastNameInput.value = state.user.lastName;

  els.modal.classList.add("is-open");
  els.modal.setAttribute("aria-hidden", "false");

  // foco no primeiro campo
  setTimeout(() => els.firstNameInput.focus(), 0);
}

function closeModal(){
  els.modal.classList.remove("is-open");
  els.modal.setAttribute("aria-hidden", "true");
}

function isCloseTarget(target){
  return target && target.getAttribute && target.getAttribute("data-close") === "1";
}

// ---------- Events ----------
els.tabs.forEach(btn => btn.addEventListener("click", () => setActiveTab(btn.dataset.tab)));

els.filter.addEventListener("change", (e) => {
  state.filter = e.target.value;
  state.selectedIndex = -1;
  render();
});

els.readNext.addEventListener("click", readNext);
els.back.addEventListener("click", goBack);
els.next.addEventListener("click", goNext);

// Open modal
els.editUserBtn.addEventListener("click", openModal);

// Close modal by backdrop / close buttons
els.modal.addEventListener("click", (e) => {
  const t = e.target;
  if (isCloseTarget(t)) closeModal();
});

// ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && els.modal.classList.contains("is-open")) closeModal();
});

// Save user
els.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = sanitizeName(els.firstNameInput.value);
  const lastName = sanitizeName(els.lastNameInput.value);

  state.user = {
    firstName: firstName || "Michel",
    lastName: lastName || "Duek"
  };

  saveUser(state.user);
  renderUser();
  closeModal();
});

// ---------- Init ----------
renderUser();
setActiveTab("todas");