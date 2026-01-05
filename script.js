// script.js
const STORAGE_KEY = "cm_news_user_v1";

const newsData = [
  {
    id: "n1",
    tab: "todas",
    category: "brasil",
    date: "Sáb 21 Ago TAR",
    title: "Brasil toma conhecimento de candidatura a lugar",
    body: "O Brasil recebeu a sua candidatura ao cargo de treinador.\n\nA escolha será anunciada em breve."
  },
  {
    id: "n2",
    tab: "todas",
    category: "brasil",
    date: "Sáb 21 Ago TAR",
    title: "Brasil escolhe o seu para treinador",
    body: "A federação anunciou o novo treinador.\n\nA equipa técnica deverá apresentar-se nos próximos dias."
  },
  {
    id: "n3",
    tab: "todas",
    category: "competicoes",
    date: "Sex 20 Ago TAR",
    title: "Reservas do Baré: empate",
    body: "A equipa de reservas empatou num jogo equilibrado.\n\nDestaques: organização defensiva e boa posse de bola."
  },
  {
    id: "n4",
    tab: "todas",
    category: "transferencias",
    date: "Sex 20 Ago MNNH",
    title: "Nonato transfere-se para o Parma",
    body: "O jogador foi apresentado e assinou contrato.\n\nO clube espera integração imediata no plantel."
  },
  {
    id: "n5",
    tab: "todas",
    category: "transferencias",
    date: "Qui 19 Ago NTE",
    title: "Aldrovani elogiado",
    body: "O atleta recebeu elogios pela consistência.\n\nO staff destaca evolução física e disciplina tática."
  }
];

// ---------- UI refs ----------
const els = {
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
  badgeInlineFirst: document.getElementById("badgeInlineFirst"),
  badgeInlineLast: document.getElementById("badgeInlineLast"),
  editUserBtn: document.getElementById("editUserBtn"),

  // Modal
  modal: document.getElementById("userModal"),
  form: document.getElementById("userForm"),
  firstNameInput: document.getElementById("firstNameInput"),
  lastNameInput: document.getElementById("lastNameInput"),

  // Toolbar dropdowns
  verDD: document.querySelector('[data-tool-dd="ver"]'),
  critDD: document.querySelector('[data-tool-dd="criterio"]'),
  verLabel: document.getElementById("verLabel"),
  critLabel: document.getElementById("critLabel"),
};

const sddRoots = Array.from(document.querySelectorAll(".sdd"));

let state = {
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
  if (els.badgeInlineFirst) els.badgeInlineFirst.textContent = state.user.firstName || "—";
  if (els.badgeInlineLast) els.badgeInlineLast.textContent = state.user.lastName || "—";
}

// ---------- News logic ----------
function getFiltered(){
  if (state.filter === "all") return newsData;
  return newsData.filter(n => n.category === state.filter);
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
    els.body.textContent = "Altere o filtro para ver resultados.";
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

// ---------- Modal (editar usuário) ----------
function openModal(){
  els.firstNameInput.value = state.user.firstName;
  els.lastNameInput.value = state.user.lastName;
  els.modal.classList.add("is-open");
  els.modal.setAttribute("aria-hidden", "false");
  setTimeout(() => els.firstNameInput.focus(), 0);
}

function closeModal(){
  els.modal.classList.remove("is-open");
  els.modal.setAttribute("aria-hidden", "true");
}

function isCloseTarget(target){
  return target && target.getAttribute && target.getAttribute("data-close") === "1";
}

/* ---------- SIDE DROPDOWNS ---------- */
function closeAllSideDropdowns(){
  sddRoots.forEach(dd => dd.classList.remove("is-open"));
}

function toggleSideDropdown(dd){
  const willOpen = !dd.classList.contains("is-open");
  closeAllSideDropdowns();
  if (willOpen) dd.classList.add("is-open");
}

function isInsideSideDropdown(node){
  return sddRoots.some(dd => dd.contains(node));
}

sddRoots.forEach(dd => {
  const btn = dd.querySelector(".side-btn--dd");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSideDropdown(dd);
  });

  dd.querySelectorAll(".sdd-item").forEach(item => {
    item.addEventListener("click", () => {
      if (item.classList.contains("has-sub")) return;
      closeAllSideDropdowns();
    });
  });

  // Requirement: Open 'ver' dropdown by default
  const dataset = dd.dataset.sdd;
  if (dataset === "ver") {
    dd.classList.add("is-open");
  }
});

// clique fora fecha dropdown
document.addEventListener("click", (e) => {
  if (!isInsideSideDropdown(e.target)) closeAllSideDropdowns();
});

/* ---------- TOOLBAR DROPDOWNS (Ver / Critério) ---------- */
function initToolDropdown(root, labelEl){
  if (!root) return;

  const btn = root.querySelector(".tool-btn--dd");
  const items = Array.from(root.querySelectorAll(".tool-item"));

  function setOpen(isOpen){
    root.classList.toggle("is-open", isOpen);
    if (btn) btn.setAttribute("aria-expanded", String(isOpen));
  }

  function close(){ setOpen(false); }

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!root.classList.contains("is-open"));
  });

  items.forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      items.forEach(i => i.classList.remove("is-active"));
      item.classList.add("is-active");

      const value = item.getAttribute("data-value") || item.textContent.trim();
      if (labelEl) labelEl.textContent = value;

      close();
    });
  });

  // fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) close();
  });

  // ESC fecha
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

initToolDropdown(els.verDD, els.verLabel);
initToolDropdown(els.critDD, els.critLabel);

// ESC fecha tudo (dropdown + modal)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){
    closeAllSideDropdowns();
    if (els.modal.classList.contains("is-open")) closeModal();
  }
});

// ---------- Events ----------
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
render();