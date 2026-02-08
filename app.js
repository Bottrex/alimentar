// ============================================================
//  NutriPlan - Planejador de Refeições Semanal
//  Dados nutricionais baseados na TACO (por 100g cozido/pronto)
// ============================================================

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const MEAL_KEYS = ['cafe', 'almoco', 'lanche', 'jantar'];
const MEAL_NAMES = { cafe: 'Café da Manhã', almoco: 'Almoço', lanche: 'Lanche', jantar: 'Jantar' };
const CATEGORY_NAMES = {
  proteina: 'Proteínas', carbo: 'Carboidratos', leguminosa: 'Leguminosas',
  vegetal: 'Vegetais', fruta: 'Frutas', gordura: 'Gorduras',
  lacteo: 'Laticínios', suplemento: 'Suplementos'
};

const PREP_METHODS = {
  frango_peito: 'grelhar', patinho: 'cozinhar', carne_moida: 'refogar',
  tilapia: 'grelhar', ovo: 'cozinhar', atum_lata: 'pronto',
  lombo_suino: 'assar', sardinha: 'pronto', frango_coxa: 'assar',
  carne_seca: 'cozinhar',
  arroz_branco: 'cozinhar', arroz_integral: 'cozinhar', batata_doce: 'cozinhar',
  macarrao: 'cozinhar', pao_integral: 'pronto', aveia: 'pronto',
  tapioca: 'frigir', mandioca: 'cozinhar', batata_inglesa: 'cozinhar',
  cuscuz: 'cozinhar', pao_frances: 'pronto', crepioca: 'frigir',
  feijao_carioca: 'cozinhar', feijao_preto: 'cozinhar', lentilha: 'cozinhar',
  grao_bico: 'cozinhar', ervilha: 'cozinhar',
  brocolis: 'cozinhar', alface: 'pronto', tomate: 'pronto',
  cenoura: 'cozinhar', abobrinha: 'refogar', espinafre: 'refogar',
  pepino: 'pronto', couve_flor: 'cozinhar', couve: 'refogar', chuchu: 'cozinhar'
};

const PREP_METHOD_NAMES = {
  cozinhar: 'Cozinhar', grelhar: 'Grelhar', assar: 'Assar',
  refogar: 'Refogar', frigir: 'Frigir', pronto: 'Prontos para Uso'
};
const PREP_METHOD_ICONS = {
  cozinhar: '🍲', grelhar: '🔥', assar: '🍖',
  refogar: '🥘', frigir: '🍳', pronto: '✅'
};
const PREP_METHOD_ORDER = ['cozinhar', 'grelhar', 'assar', 'refogar', 'frigir', 'pronto'];


// ===== BANCO DE DADOS =====
const FOODS = [
  // ---- PROTEÍNAS ----
  { id: 'frango_peito', name: 'Peito de Frango Grelhado', category: 'proteina',
    calories: 159, protein: 32, carbs: 0, fat: 2.5,
    rawFactor: 1.30, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'patinho', name: 'Patinho Bovino Cozido', category: 'proteina',
    calories: 219, protein: 35.9, carbs: 0, fat: 7.3,
    rawFactor: 1.40, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'carne_moida', name: 'Carne Moída (Acém)', category: 'proteina',
    calories: 212, protein: 26.7, carbs: 0, fat: 10.9,
    rawFactor: 1.35, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'tilapia', name: 'Tilápia Grelhada', category: 'proteina',
    calories: 128, protein: 26, carbs: 0, fat: 2.5,
    rawFactor: 1.25, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'ovo', name: 'Ovo Inteiro Cozido', category: 'proteina',
    calories: 146, protein: 13.3, carbs: 0.6, fat: 9.5,
    rawFactor: 1.0, meals: ['cafe', 'almoco', 'lanche', 'jantar'], unit: 'unid', unitWeight: 50 },
  { id: 'atum_lata', name: 'Atum em Lata (drenado)', category: 'proteina',
    calories: 116, protein: 26, carbs: 0, fat: 0.9,
    rawFactor: 1.0, meals: ['almoco', 'lanche', 'jantar'], unit: 'lata' },
  { id: 'lombo_suino', name: 'Lombo Suíno Assado', category: 'proteina',
    calories: 210, protein: 35.7, carbs: 0, fat: 6.4,
    rawFactor: 1.35, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'sardinha', name: 'Sardinha em Lata', category: 'proteina',
    calories: 214, protein: 24.6, carbs: 0, fat: 12.2,
    rawFactor: 1.0, meals: ['almoco', 'lanche', 'jantar'], unit: 'lata' },
  { id: 'frango_coxa', name: 'Coxa de Frango Assada (s/ pele)', category: 'proteina',
    calories: 167, protein: 26.2, carbs: 0, fat: 5.8,
    rawFactor: 1.30, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'carne_seca', name: 'Carne Seca Desfiada', category: 'proteina',
    calories: 263, protein: 35.8, carbs: 0, fat: 11.9,
    rawFactor: 1.0, meals: ['almoco', 'jantar'], unit: 'kg' },

  // ---- CARBOIDRATOS ----
  { id: 'arroz_branco', name: 'Arroz Branco Cozido', category: 'carbo',
    calories: 128, protein: 2.5, carbs: 28.1, fat: 0.2,
    rawFactor: 0.40, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'arroz_integral', name: 'Arroz Integral Cozido', category: 'carbo',
    calories: 124, protein: 2.6, carbs: 25.8, fat: 1.0,
    rawFactor: 0.42, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'batata_doce', name: 'Batata Doce Cozida', category: 'carbo',
    calories: 77, protein: 0.6, carbs: 18.4, fat: 0.1,
    rawFactor: 1.15, meals: ['almoco', 'lanche', 'jantar'], unit: 'kg' },
  { id: 'macarrao', name: 'Macarrão Cozido', category: 'carbo',
    calories: 131, protein: 4.7, carbs: 25.0, fat: 1.6,
    rawFactor: 0.45, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'pao_integral', name: 'Pão Integral (fatia)', category: 'carbo',
    calories: 253, protein: 9.4, carbs: 49.9, fat: 2.8,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pacote', unitWeight: 30 },
  { id: 'aveia', name: 'Aveia em Flocos', category: 'carbo',
    calories: 394, protein: 13.9, carbs: 66.6, fat: 8.5,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'kg' },
  { id: 'tapioca', name: 'Tapioca (goma hidratada)', category: 'carbo',
    calories: 342, protein: 0.5, carbs: 83.3, fat: 0.3,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'kg' },
  { id: 'mandioca', name: 'Mandioca Cozida', category: 'carbo',
    calories: 125, protein: 0.6, carbs: 30.1, fat: 0.3,
    rawFactor: 1.20, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'batata_inglesa', name: 'Batata Inglesa Cozida', category: 'carbo',
    calories: 52, protein: 1.2, carbs: 11.9, fat: 0.1,
    rawFactor: 1.15, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'cuscuz', name: 'Cuscuz de Milho', category: 'carbo',
    calories: 113, protein: 2.6, carbs: 24.6, fat: 0.5,
    rawFactor: 0.50, meals: ['cafe', 'almoco', 'jantar'], unit: 'kg' },
  { id: 'pao_frances', name: 'Pão Francês', category: 'carbo',
    calories: 300, protein: 8, carbs: 58.6, fat: 3.1,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid', unitWeight: 50 },
  { id: 'crepioca', name: 'Crepioca (tapioca+ovo)', category: 'carbo',
    calories: 200, protein: 9, carbs: 28, fat: 6,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid', unitWeight: 80 },

  // ---- LEGUMINOSAS ----
  { id: 'feijao_carioca', name: 'Feijão Carioca Cozido', category: 'leguminosa',
    calories: 76, protein: 4.8, carbs: 13.6, fat: 0.5,
    rawFactor: 0.38, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'feijao_preto', name: 'Feijão Preto Cozido', category: 'leguminosa',
    calories: 77, protein: 4.5, carbs: 14, fat: 0.5,
    rawFactor: 0.38, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'lentilha', name: 'Lentilha Cozida', category: 'leguminosa',
    calories: 93, protein: 6.3, carbs: 16.3, fat: 0.3,
    rawFactor: 0.40, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'grao_bico', name: 'Grão de Bico Cozido', category: 'leguminosa',
    calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6,
    rawFactor: 0.45, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'ervilha', name: 'Ervilha Cozida', category: 'leguminosa',
    calories: 74, protein: 4.8, carbs: 13.4, fat: 0.4,
    rawFactor: 0.42, meals: ['almoco', 'jantar'], unit: 'kg' },

  // ---- VEGETAIS ----
  { id: 'brocolis', name: 'Brócolis Cozido', category: 'vegetal',
    calories: 25, protein: 2.1, carbs: 4.4, fat: 0.3,
    rawFactor: 1.10, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'alface', name: 'Alface', category: 'vegetal',
    calories: 11, protein: 0.5, carbs: 1.8, fat: 0.2,
    rawFactor: 1.0, meals: ['almoco', 'jantar'], unit: 'unid' },
  { id: 'tomate', name: 'Tomate', category: 'vegetal',
    calories: 15, protein: 1.1, carbs: 3.1, fat: 0.2,
    rawFactor: 1.0, meals: ['almoco', 'jantar', 'cafe'], unit: 'kg' },
  { id: 'cenoura', name: 'Cenoura Cozida', category: 'vegetal',
    calories: 34, protein: 1.3, carbs: 7.7, fat: 0.2,
    rawFactor: 1.15, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'abobrinha', name: 'Abobrinha Refogada', category: 'vegetal',
    calories: 19, protein: 1.1, carbs: 4.3, fat: 0.1,
    rawFactor: 1.10, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'espinafre', name: 'Espinafre Refogado', category: 'vegetal',
    calories: 17, protein: 2.0, carbs: 1.6, fat: 0.3,
    rawFactor: 1.10, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'pepino', name: 'Pepino', category: 'vegetal',
    calories: 10, protein: 0.7, carbs: 2.0, fat: 0.1,
    rawFactor: 1.0, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'couve_flor', name: 'Couve-flor Cozida', category: 'vegetal',
    calories: 19, protein: 1.2, carbs: 3.5, fat: 0.2,
    rawFactor: 1.10, meals: ['almoco', 'jantar'], unit: 'kg' },
  { id: 'couve', name: 'Couve Refogada', category: 'vegetal',
    calories: 29, protein: 2.9, carbs: 4.3, fat: 0.5,
    rawFactor: 1.15, meals: ['almoco', 'jantar'], unit: 'maço' },
  { id: 'chuchu', name: 'Chuchu Cozido', category: 'vegetal',
    calories: 17, protein: 0.4, carbs: 3.8, fat: 0.1,
    rawFactor: 1.10, meals: ['almoco', 'jantar'], unit: 'kg' },

  // ---- FRUTAS ----
  { id: 'banana', name: 'Banana Prata', category: 'fruta',
    calories: 98, protein: 1.3, carbs: 26.0, fat: 0.1,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid', unitWeight: 100 },
  { id: 'maca', name: 'Maçã', category: 'fruta',
    calories: 52, protein: 0.3, carbs: 14, fat: 0.2,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid', unitWeight: 130 },
  { id: 'morango', name: 'Morango', category: 'fruta',
    calories: 30, protein: 0.9, carbs: 6.8, fat: 0.3,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'bandeja' },
  { id: 'laranja', name: 'Laranja', category: 'fruta',
    calories: 37, protein: 0.9, carbs: 8.9, fat: 0.2,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid', unitWeight: 150 },
  { id: 'mamao', name: 'Mamão Papaia', category: 'fruta',
    calories: 39, protein: 0.5, carbs: 9.8, fat: 0.1,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid', unitWeight: 300 },
  { id: 'melancia', name: 'Melancia', category: 'fruta',
    calories: 33, protein: 0.9, carbs: 8.1, fat: 0.0,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'kg' },
  { id: 'uva', name: 'Uva', category: 'fruta',
    calories: 49, protein: 0.7, carbs: 11.5, fat: 0.2,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'kg' },
  { id: 'manga', name: 'Manga', category: 'fruta',
    calories: 72, protein: 0.9, carbs: 19.4, fat: 0.2,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid', unitWeight: 200 },

  // ---- GORDURAS ----
  { id: 'azeite', name: 'Azeite de Oliva', category: 'gordura',
    calories: 884, protein: 0, carbs: 0, fat: 100,
    rawFactor: 1.0, meals: ['almoco', 'jantar'], unit: 'garrafa' },
  { id: 'pasta_amendoim', name: 'Pasta de Amendoim', category: 'gordura',
    calories: 589, protein: 25.1, carbs: 20, fat: 50,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pote' },
  { id: 'castanha_para', name: 'Castanha do Pará', category: 'gordura',
    calories: 643, protein: 14.3, carbs: 12.3, fat: 63.5,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pacote' },
  { id: 'abacate', name: 'Abacate', category: 'gordura',
    calories: 96, protein: 1.2, carbs: 6.0, fat: 8.4,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'unid' },
  { id: 'castanha_caju', name: 'Castanha de Caju', category: 'gordura',
    calories: 574, protein: 18.2, carbs: 30.2, fat: 46.4,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pacote' },
  { id: 'amendoim', name: 'Amendoim Torrado', category: 'gordura',
    calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2,
    rawFactor: 1.0, meals: ['lanche'], unit: 'pacote' },
  { id: 'oleo_coco', name: 'Óleo de Coco', category: 'gordura',
    calories: 862, protein: 0, carbs: 0, fat: 100,
    rawFactor: 1.0, meals: ['cafe', 'almoco', 'jantar'], unit: 'pote' },

  // ---- LATICÍNIOS ----
  { id: 'queijo_cottage', name: 'Queijo Cottage', category: 'lacteo',
    calories: 98, protein: 11.1, carbs: 3.4, fat: 4.3,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pote' },
  { id: 'iogurte_natural', name: 'Iogurte Natural Integral', category: 'lacteo',
    calories: 51, protein: 4.1, carbs: 1.9, fat: 3.0,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pote' },
  { id: 'iogurte_grego', name: 'Iogurte Grego', category: 'lacteo',
    calories: 97, protein: 9, carbs: 4, fat: 5,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pote' },
  { id: 'queijo_minas', name: 'Queijo Minas Frescal', category: 'lacteo',
    calories: 264, protein: 17.4, carbs: 3.2, fat: 20.2,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'peça' },
  { id: 'leite_desnatado', name: 'Leite Desnatado', category: 'lacteo',
    calories: 35, protein: 3.4, carbs: 5, fat: 0.1,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'litro' },
  { id: 'requeijao_light', name: 'Requeijão Light', category: 'lacteo',
    calories: 150, protein: 7, carbs: 6, fat: 11,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pote' },

  // ---- SUPLEMENTOS ----
  { id: 'whey', name: 'Whey Protein (dose 30g)', category: 'suplemento',
    calories: 120, protein: 24, carbs: 2.4, fat: 1.2,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pote' },
  { id: 'albumina', name: 'Albumina (dose 30g)', category: 'suplemento',
    calories: 108, protein: 24, carbs: 1.5, fat: 0.3,
    rawFactor: 1.0, meals: ['cafe', 'lanche'], unit: 'pacote' }
];


// ===== TODOS OS ALIMENTOS (FOODS + custom) =====
function getAllFoods() {
  return [...FOODS, ...state.customFoods];
}


// ===== ESTADO =====
let state = {
  people: [{ id: 1, name: 'Pessoa 1', protein: 150, carbs: 200, fat: 67 }],
  nextPersonId: 2,
  distribution: { cafe: 25, almoco: 35, lanche: 10, jantar: 30 },
  selectedFoods: [],
  incompatiblePairs: [],
  weekPlan: {},
  shoppingList: [],
  currentFilter: 'all',
  activePlanPerson: null,
  planGenerated: false,
  // Novas features
  customFoods: [],
  savedPlans: [],
  collapsedDays: {},
  darkMode: false,
  searchQuery: '',
  foodPrices: {}
};

let swapTarget = null;


// ===== REATIVIDADE =====
function onPlanChanged() {
  if (!hasPlan()) return;
  generateShoppingList();
  renderPlan();
  renderShoppingList();
  if (document.getElementById('tab-montagem').classList.contains('active')) renderMontagem();
  if (document.getElementById('tab-preparar').classList.contains('active')) renderPreparar();
  if (document.getElementById('tab-resumo').classList.contains('active')) renderResumo();
}

function hasPlan() {
  return Object.keys(state.weekPlan).length > 0;
}


// ===== LOCAL STORAGE =====
function saveState() {
  try {
    localStorage.setItem('nutriplan_state', JSON.stringify({
      people: state.people,
      nextPersonId: state.nextPersonId,
      distribution: state.distribution,
      selectedFoods: state.selectedFoods,
      incompatiblePairs: state.incompatiblePairs,
      customFoods: state.customFoods,
      savedPlans: state.savedPlans,
      darkMode: state.darkMode,
      foodPrices: state.foodPrices
    }));
  } catch (e) { /* ignorar */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem('nutriplan_state');
    if (!raw) return;
    const d = JSON.parse(raw);
    if (d.macros && !d.people) {
      state.people = [{ id: 1, name: 'Pessoa 1', ...d.macros }];
      state.nextPersonId = 2;
    } else if (d.people) {
      state.people = d.people;
      state.nextPersonId = d.nextPersonId || (Math.max(...d.people.map(p => p.id)) + 1);
    }
    if (d.distribution) state.distribution = d.distribution;
    if (d.selectedFoods) state.selectedFoods = d.selectedFoods;
    if (d.incompatiblePairs) state.incompatiblePairs = d.incompatiblePairs;
    if (d.customFoods) state.customFoods = d.customFoods;
    if (d.savedPlans) state.savedPlans = d.savedPlans;
    if (typeof d.darkMode === 'boolean') state.darkMode = d.darkMode;
    if (d.foodPrices) state.foodPrices = d.foodPrices;
  } catch (e) { /* ignorar */ }
}


// ===== NAVEGAÇÃO =====
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  const navBtn = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (navBtn) navBtn.classList.add('active');
  if (tabId === 'alimentos') renderIncompatSelects();
  if (tabId === 'compras') renderShoppingList();
  if (tabId === 'montagem') { renderMontagemConfig(); renderMontagem(); }
  if (tabId === 'preparar') renderPreparar();
  if (tabId === 'plano') renderPlan();
  if (tabId === 'macros') renderPeople();
  if (tabId === 'resumo') renderResumo();
}


// ===== PESSOAS =====
function personCalories(p) {
  return (p.protein * 4) + (p.carbs * 4) + (p.fat * 9);
}

function renderPeople() {
  const container = document.getElementById('people-container');
  container.innerHTML = state.people.map(p => {
    const cal = personCalories(p);
    const canvasId = `donut-${p.id}`;
    return `
      <div class="person-card">
        <div class="person-header">
          <input type="text" class="person-name-input" value="${p.name}"
                 onchange="updatePerson(${p.id},'name',this.value)" placeholder="Nome">
          ${state.people.length > 1
            ? `<button class="person-remove-btn" onclick="removePerson(${p.id})">Remover</button>`
            : ''}
        </div>
        <div class="person-inner">
          <div class="balance-card">
            <div class="balance-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="14" x2="9" y2="21"/><line x1="15" y1="10" x2="15" y2="21"/></svg>
              Balanço de Nutrientes
            </div>
            <div class="balance-macros">
              <div class="balance-macro-box"><div class="balance-macro-label">Total Diário</div><div class="balance-macro-value cal">${cal} kcal</div></div>
              <div class="balance-macro-box"><div class="balance-macro-label">Proteínas</div><div class="balance-macro-value prot">${p.protein}g</div></div>
              <div class="balance-macro-box"><div class="balance-macro-label">Carboidratos</div><div class="balance-macro-value carb">${p.carbs}g</div></div>
              <div class="balance-macro-box"><div class="balance-macro-label">Gorduras</div><div class="balance-macro-value fat">${p.fat}g</div></div>
            </div>
            <div class="donut-wrap"><canvas id="${canvasId}" width="160" height="160"></canvas></div>
          </div>
          <div class="goals-card">
            <div class="goals-card-title">Ajustar Metas</div>
            <div class="goal-row"><span class="goal-label">Proteínas (g)</span><input type="number" class="goal-input" value="${p.protein}" min="30" max="400" step="5" onchange="updatePerson(${p.id},'protein',parseInt(this.value)||150)"></div>
            <div class="goal-row"><span class="goal-label">Carboidratos (g)</span><input type="number" class="goal-input" value="${p.carbs}" min="20" max="600" step="5" onchange="updatePerson(${p.id},'carbs',parseInt(this.value)||200)"></div>
            <div class="goal-row"><span class="goal-label">Gorduras (g)</span><input type="number" class="goal-input" value="${p.fat}" min="10" max="250" step="1" onchange="updatePerson(${p.id},'fat',parseInt(this.value)||67)"></div>
          </div>
        </div>
      </div>`;
  }).join('');
  for (const p of state.people) drawDonut(`donut-${p.id}`, p);
}

function drawDonut(canvasId, person) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2;
  const outerR = 68, innerR = 46;
  ctx.clearRect(0, 0, w, h);

  const protCal = person.protein * 4;
  const carbCal = person.carbs * 4;
  const fatCal = person.fat * 9;
  const total = protCal + carbCal + fatCal;
  if (total === 0) return;

  const segments = [
    { value: protCal, color: '#ef4444' },
    { value: carbCal, color: '#3b82f6' },
    { value: fatCal, color: '#f59e0b' }
  ];

  let startAngle = -Math.PI / 2;
  for (const seg of segments) {
    const sliceAngle = (seg.value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    startAngle += sliceAngle;
  }

  ctx.fillStyle = state.darkMode ? '#e8eaf0' : '#1e2132';
  ctx.font = '700 14px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${total}`, cx, cy - 6);
  ctx.fillStyle = state.darkMode ? '#5c6188' : '#9ba1bf';
  ctx.font = '500 10px Inter, sans-serif';
  ctx.fillText('kcal', cx, cy + 10);
}

function addPerson() {
  state.people.push({ id: state.nextPersonId++, name: `Pessoa ${state.people.length + 1}`, protein: 150, carbs: 200, fat: 67 });
  saveState(); renderPeople(); renderMontagemConfig();
}

function removePerson(id) {
  state.people = state.people.filter(p => p.id !== id);
  saveState(); renderPeople(); renderMontagemConfig();
}

function updatePerson(id, field, value) {
  const p = state.people.find(x => x.id === id);
  if (p) { p[field] = value; saveState(); renderPeople(); renderMontagemConfig(); }
}


// ===== DISTRIBUIÇÃO =====
function renderDistribution() {
  document.getElementById('dist-cafe').value = state.distribution.cafe;
  document.getElementById('dist-almoco').value = state.distribution.almoco;
  document.getElementById('dist-lanche').value = state.distribution.lanche;
  document.getElementById('dist-jantar').value = state.distribution.jantar;
  updateDistributionTotal();
}

function updateDistribution() {
  state.distribution.cafe = parseInt(document.getElementById('dist-cafe').value) || 0;
  state.distribution.almoco = parseInt(document.getElementById('dist-almoco').value) || 0;
  state.distribution.lanche = parseInt(document.getElementById('dist-lanche').value) || 0;
  state.distribution.jantar = parseInt(document.getElementById('dist-jantar').value) || 0;
  saveState(); updateDistributionTotal();
}

function updateDistributionTotal() {
  const total = state.distribution.cafe + state.distribution.almoco + state.distribution.lanche + state.distribution.jantar;
  const el = document.getElementById('dist-total');
  el.className = 'dist-total ' + (total === 100 ? 'ok' : 'warn');
  el.textContent = total === 100 ? `Total: ${total}%` : `Total: ${total}% — deve somar 100%`;
}


// ===== ALIMENTOS (busca + filtro + render) =====
function onFoodSearch(query) {
  state.searchQuery = query;
  renderFoods();
}

function renderFoods() {
  const grid = document.getElementById('foods-grid');
  const filter = state.currentFilter;
  const search = (state.searchQuery || '').toLowerCase().trim();
  let filtered = getAllFoods();
  if (filter !== 'all') filtered = filtered.filter(f => f.category === filter);
  if (search) filtered = filtered.filter(f => f.name.toLowerCase().includes(search));

  grid.innerHTML = filtered.map(food => {
    const selected = state.selectedFoods.includes(food.id);
    return `
      <div class="food-card ${selected ? 'selected' : ''}" onclick="toggleFood('${food.id}')">
        ${food.custom ? `<button class="food-delete-btn" onclick="event.stopPropagation();removeCustomFood('${food.id}')" title="Excluir">&#x2715;</button>` : ''}
        <div class="food-name">${food.name}</div>
        ${food.custom ? '<span class="custom-badge">Customizado</span>' : ''}
        <span class="food-category-tag ${food.category}">${CATEGORY_NAMES[food.category]}</span>
        <div class="food-macros">
          <div class="food-macro"><span class="val">${food.calories}</span><span class="lbl">kcal</span></div>
          <div class="food-macro"><span class="val">${food.protein}g</span><span class="lbl">prot</span></div>
          <div class="food-macro"><span class="val">${food.carbs}g</span><span class="lbl">carb</span></div>
          <div class="food-macro"><span class="val">${food.fat}g</span><span class="lbl">gord</span></div>
        </div>
        <div class="food-meals-tags">${food.meals.map(m => `<span class="meal-tag">${MEAL_NAMES[m]}</span>`).join('')}</div>
      </div>`;
  }).join('');
  updateSelectedCount();
}

function toggleFood(foodId) {
  const idx = state.selectedFoods.indexOf(foodId);
  if (idx >= 0) state.selectedFoods.splice(idx, 1);
  else state.selectedFoods.push(foodId);
  saveState(); renderFoods(); renderIncompatSelects();
}

function filterFoods(category) {
  state.currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderFoods();
}

function updateSelectedCount() {
  const c = state.selectedFoods.length;
  document.getElementById('selected-count').textContent =
    c === 0 ? 'Nenhum alimento selecionado' : c === 1 ? '1 alimento selecionado' : `${c} alimentos selecionados`;
}


// ===== ALIMENTOS CUSTOMIZADOS =====
function openCustomFoodModal() {
  document.getElementById('custom-food-modal').style.display = 'flex';
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-calories').value = '';
  document.getElementById('cf-protein').value = '';
  document.getElementById('cf-carbs').value = '';
  document.getElementById('cf-fat').value = '';
  document.getElementById('cf-rawFactor').value = '1.0';
  document.getElementById('cf-unitWeight').value = '0';
}

function closeCustomFoodModal() {
  document.getElementById('custom-food-modal').style.display = 'none';
}

function saveCustomFood() {
  const name = document.getElementById('cf-name').value.trim();
  if (!name) { showMessage('Preencha o nome do alimento.', 'warn'); return; }
  const meals = [];
  if (document.getElementById('cf-meal-cafe').checked) meals.push('cafe');
  if (document.getElementById('cf-meal-almoco').checked) meals.push('almoco');
  if (document.getElementById('cf-meal-lanche').checked) meals.push('lanche');
  if (document.getElementById('cf-meal-jantar').checked) meals.push('jantar');
  if (meals.length === 0) { showMessage('Selecione ao menos uma refeição.', 'warn'); return; }

  const food = {
    id: 'custom_' + Date.now(),
    name,
    category: document.getElementById('cf-category').value,
    calories: parseFloat(document.getElementById('cf-calories').value) || 0,
    protein: parseFloat(document.getElementById('cf-protein').value) || 0,
    carbs: parseFloat(document.getElementById('cf-carbs').value) || 0,
    fat: parseFloat(document.getElementById('cf-fat').value) || 0,
    rawFactor: parseFloat(document.getElementById('cf-rawFactor').value) || 1.0,
    meals,
    unit: document.getElementById('cf-unit').value,
    custom: true
  };
  const uw = parseInt(document.getElementById('cf-unitWeight').value) || 0;
  if (uw > 0) food.unitWeight = uw;

  state.customFoods.push(food);
  saveState();
  closeCustomFoodModal();
  renderFoods();
  showMessage(`"${name}" adicionado!`, 'ok');
}

function removeCustomFood(foodId) {
  state.customFoods = state.customFoods.filter(f => f.id !== foodId);
  state.selectedFoods = state.selectedFoods.filter(id => id !== foodId);
  saveState();
  renderFoods();
}


// ===== INCOMPATIBILIDADES =====
function renderIncompatSelects() {
  const selectedList = state.selectedFoods.map(id => getFoodById(id)).filter(Boolean);
  const list = selectedList.length > 0 ? selectedList : getAllFoods();
  const options = list.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
  const s1 = document.getElementById('incompat-food1');
  const s2 = document.getElementById('incompat-food2');
  if (s1) s1.innerHTML = options;
  if (s2) s2.innerHTML = options;
}

function addIncompatible() {
  const f1 = document.getElementById('incompat-food1').value;
  const f2 = document.getElementById('incompat-food2').value;
  if (f1 === f2) { showMessage('Selecione dois alimentos diferentes.', 'warn'); return; }
  const exists = state.incompatiblePairs.some(p => (p[0] === f1 && p[1] === f2) || (p[0] === f2 && p[1] === f1));
  if (exists) { showMessage('Essa combinação já está bloqueada.', 'warn'); return; }
  state.incompatiblePairs.push([f1, f2]);
  saveState(); renderIncompatList();
}

function removeIncompatible(idx) {
  state.incompatiblePairs.splice(idx, 1);
  saveState(); renderIncompatList();
}

function renderIncompatList() {
  const container = document.getElementById('incompat-list');
  if (state.incompatiblePairs.length === 0) {
    container.innerHTML = '<p class="incompat-empty">Nenhuma combinação bloqueada.</p>';
    return;
  }
  container.innerHTML = state.incompatiblePairs.map((pair, idx) => {
    const f1 = getFoodById(pair[0]);
    const f2 = getFoodById(pair[1]);
    return `<div class="incompat-item">
      <span>${f1 ? f1.name : pair[0]} <strong>&times;</strong> ${f2 ? f2.name : pair[1]}</span>
      <button class="incompat-remove" onclick="removeIncompatible(${idx})">Remover</button>
    </div>`;
  }).join('');
}

function isIncompatibleWith(foodId, alreadyPicked) {
  for (const pair of state.incompatiblePairs) {
    if (pair.includes(foodId)) {
      const other = pair[0] === foodId ? pair[1] : pair[0];
      if (alreadyPicked.some(f => f.id === other)) return true;
    }
  }
  return false;
}


// ===== HELPERS =====
function getFoodById(id) { return getAllFoods().find(f => f.id === id); }

function getSelectedByCategory(cat) {
  return state.selectedFoods.map(id => getFoodById(id)).filter(f => f && f.category === cat);
}

function getSelectedForMeal(mealKey) {
  return state.selectedFoods.map(id => getFoodById(id)).filter(f => f && f.meals.includes(mealKey));
}

function rotateSelectCompat(pool, dayIdx, offset, pickedFoods) {
  if (pool.length === 0) return null;
  for (let i = 0; i < pool.length; i++) {
    const food = pool[(dayIdx + offset + i) % pool.length];
    if (!isIncompatibleWith(food.id, pickedFoods)) return food;
  }
  return null;
}

function calcItemsTotals(items) {
  const t = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  for (const it of items) {
    const f = it.grams / 100;
    t.calories += it.food.calories * f;
    t.protein += it.food.protein * f;
    t.carbs += it.food.carbs * f;
    t.fat += it.food.fat * f;
  }
  return { calories: parseFloat(t.calories.toFixed(1)), protein: parseFloat(t.protein.toFixed(1)),
           carbs: parseFloat(t.carbs.toFixed(1)), fat: parseFloat(t.fat.toFixed(1)) };
}

function formatWeight(g) { return g >= 1000 ? (g / 1000).toFixed(2) + ' kg' : g + 'g'; }

function formatGrams(item) {
  if (item.food.category === 'suplemento') return `${item.grams}g (dose)`;
  if (item.food.unitWeight) {
    const units = Math.round(item.grams / item.food.unitWeight);
    return `${units} un. (${item.grams}g)`;
  }
  return `${item.grams}g`;
}

function itemStep(food) { return food.unitWeight || 5; }


// ===== ALGORITMO DE PLANEJAMENTO =====
function generateWeekPlan() {
  if (state.selectedFoods.length === 0) { showMessage('Selecione alimentos na aba "Alimentos" antes de gerar o plano.', 'warn'); return; }
  const total = state.distribution.cafe + state.distribution.almoco + state.distribution.lanche + state.distribution.jantar;
  if (total !== 100) { showMessage('A distribuição das refeições deve somar 100%.', 'warn'); return; }
  if (getSelectedByCategory('proteina').length === 0 && getSelectedByCategory('suplemento').length === 0) { showMessage('Selecione pelo menos uma fonte de proteína.', 'warn'); return; }
  if (getSelectedByCategory('carbo').length === 0) { showMessage('Selecione pelo menos uma fonte de carboidrato.', 'warn'); return; }

  state.weekPlan = {};
  state.planGenerated = true;
  state.collapsedDays = {};
  swapTarget = null;

  for (const person of state.people) {
    const personPlan = [];
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      const dayPlan = { day: DAYS[dayIdx], meals: {} };
      for (const mealKey of MEAL_KEYS) {
        const pct = state.distribution[mealKey];
        if (pct === 0) {
          dayPlan.meals[mealKey] = { items: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
          continue;
        }
        const pCal = personCalories(person);
        const targets = {
          calories: pCal * (pct / 100), protein: person.protein * (pct / 100),
          carbs: person.carbs * (pct / 100), fat: person.fat * (pct / 100)
        };
        const items = planMeal(mealKey, targets, dayIdx);
        dayPlan.meals[mealKey] = { items, totals: calcItemsTotals(items) };
      }
      personPlan.push(dayPlan);
    }
    state.weekPlan[person.id] = personPlan;
  }

  state.activePlanPerson = state.people[0].id;
  generateShoppingList();
  renderPlanPersonTabs();
  renderPlan();
  renderShoppingList();
  renderMontagemConfig();

  document.getElementById('btn-generate').style.display = 'none';
  document.getElementById('btn-regenerate').style.display = 'inline-flex';
  document.getElementById('btn-save-plan').style.display = 'inline-flex';
  document.getElementById('btn-share').style.display = 'inline-flex';
}

function planMeal(mealKey, targets, dayIdx) {
  const available = getSelectedForMeal(mealKey);
  const proteins = available.filter(f => f.category === 'proteina');
  const suplementos = available.filter(f => f.category === 'suplemento');
  const carbs = available.filter(f => f.category === 'carbo');
  const leguminosas = available.filter(f => f.category === 'leguminosa');
  const vegetais = available.filter(f => f.category === 'vegetal');
  const frutas = available.filter(f => f.category === 'fruta');
  const gorduras = available.filter(f => f.category === 'gordura');
  const lacteos = available.filter(f => f.category === 'lacteo');

  const picked = [];
  let mainProtein = null, mainCarb = null, leguminosaFood = null;
  let vegetalFood = null, frutaFood = null, gorduraFood = null;
  let lacteoFood = null, suplementoFood = null;

  if (mealKey === 'cafe' || mealKey === 'lanche') {
    suplementoFood = rotateSelectCompat(suplementos, dayIdx, 0, picked);
    if (suplementoFood) picked.push(suplementoFood);
    lacteoFood = rotateSelectCompat(lacteos, dayIdx, 0, picked);
    if (lacteoFood) picked.push(lacteoFood);
    const protPool = rotateSelectCompat(proteins, dayIdx, 0, picked);
    if (protPool) picked.push(protPool);
    mainProtein = suplementoFood || protPool || lacteoFood;
    if (mainProtein === lacteoFood) lacteoFood = null;
    mainCarb = rotateSelectCompat(carbs, dayIdx, mealKey === 'lanche' ? 1 : 0, picked);
    if (mainCarb) picked.push(mainCarb);
    frutaFood = rotateSelectCompat(frutas, dayIdx, mealKey === 'lanche' ? 1 : 0, picked);
    if (frutaFood) picked.push(frutaFood);
    gorduraFood = rotateSelectCompat(gorduras, dayIdx, mealKey === 'lanche' ? 1 : 0, picked);
  } else {
    const protOffset = mealKey === 'jantar' ? Math.floor(proteins.length / 2) : 0;
    mainProtein = rotateSelectCompat(proteins, dayIdx, protOffset, picked);
    if (mainProtein) picked.push(mainProtein);
    leguminosaFood = rotateSelectCompat(leguminosas, dayIdx, mealKey === 'jantar' ? 1 : 0, picked);
    if (leguminosaFood) picked.push(leguminosaFood);
    mainCarb = rotateSelectCompat(carbs, dayIdx, mealKey === 'jantar' ? 1 : 0, picked);
    if (mainCarb) picked.push(mainCarb);
    vegetalFood = rotateSelectCompat(vegetais, dayIdx, mealKey === 'jantar' ? 2 : 0, picked);
    if (vegetalFood) picked.push(vegetalFood);
    gorduraFood = rotateSelectCompat(gorduras, dayIdx, 0, picked);
  }

  let remP = targets.protein, remC = targets.carbs, remF = targets.fat;
  const fixedItems = [], variableItems = [];

  function addFixed(food, g) {
    fixedItems.push({ food, grams: g });
    remP -= food.protein * g / 100; remC -= food.carbs * g / 100; remF -= food.fat * g / 100;
  }

  if (vegetalFood) addFixed(vegetalFood, 100);
  if (frutaFood) addFixed(frutaFood, 100);
  if (lacteoFood) addFixed(lacteoFood, 100);
  if (suplementoFood && mainProtein !== suplementoFood) addFixed(suplementoFood, 30);
  remP = Math.max(0, remP); remC = Math.max(0, remC); remF = Math.max(0, remF);

  if (mainProtein && mainProtein.protein > 0) {
    let g = mainProtein.category === 'suplemento' ? 30 : Math.max(0, Math.round(remP / mainProtein.protein * 100));
    variableItems.push({ food: mainProtein, grams: g });
    remP -= mainProtein.protein * g / 100; remC -= mainProtein.carbs * g / 100; remF -= mainProtein.fat * g / 100;
    remC = Math.max(0, remC); remF = Math.max(0, remF);
  }

  if (leguminosaFood && leguminosaFood.carbs > 0 && remC > 0) {
    let g = Math.max(0, Math.round((remC * 0.25) / leguminosaFood.carbs * 100));
    variableItems.push({ food: leguminosaFood, grams: g });
    remP -= leguminosaFood.protein * g / 100; remC -= leguminosaFood.carbs * g / 100; remF -= leguminosaFood.fat * g / 100;
    remC = Math.max(0, remC); remF = Math.max(0, remF);
  }

  if (mainCarb && mainCarb.carbs > 0 && remC > 0) {
    let g = Math.max(0, Math.round(remC / mainCarb.carbs * 100));
    variableItems.push({ food: mainCarb, grams: g });
    remC -= mainCarb.carbs * g / 100; remF -= mainCarb.fat * g / 100; remF = Math.max(0, remF);
  }

  if (gorduraFood && gorduraFood.fat > 0 && remF > 1) {
    let g = Math.max(0, Math.round(remF / gorduraFood.fat * 100));
    variableItems.push({ food: gorduraFood, grams: g });
  }

  const allItems = [...fixedItems, ...variableItems].filter(i => i.grams > 0);

  for (const it of allItems) {
    if (it.food.category === 'suplemento') continue;
    const step = itemStep(it.food);
    it.grams = Math.round(it.grams / step) * step;
    if (it.grams < step) it.grams = step;
  }

  const targetP = targets.protein, targetC = targets.carbs, targetF = targets.fat;
  function macroScore() {
    let p = 0, c = 0, f = 0;
    for (const it of allItems) { const g = it.grams / 100; p += it.food.protein * g; c += it.food.carbs * g; f += it.food.fat * g; }
    return Math.abs(p - targetP) * 2 + Math.abs(c - targetC) + Math.abs(f - targetF) * 2;
  }

  for (let iter = 0; iter < 60; iter++) {
    const currentScore = macroScore();
    if (currentScore < 3) break;
    let bestDelta = 0, bestRef = null, bestNewScore = currentScore;
    for (const it of variableItems) {
      if (it.food.category === 'suplemento') continue;
      if (!allItems.includes(it)) continue;
      const step = itemStep(it.food);
      it.grams += step; let s = macroScore(); if (s < bestNewScore) { bestNewScore = s; bestRef = it; bestDelta = step; } it.grams -= step;
      if (it.grams > step) { it.grams -= step; s = macroScore(); if (s < bestNewScore) { bestNewScore = s; bestRef = it; bestDelta = -step; } it.grams += step; }
    }
    if (!bestRef || bestNewScore >= currentScore) break;
    bestRef.grams += bestDelta;
  }

  return allItems.filter(i => i.grams > 0);
}


// ===== EDIÇÃO DO PLANO =====
function adjustPlanItem(personId, dayIdx, mealKey, itemIdx, delta) {
  const meal = state.weekPlan[personId][dayIdx].meals[mealKey];
  const item = meal.items[itemIdx];
  if (!item) return;
  const step = itemStep(item.food);
  const newGrams = item.grams + (delta * step);
  if (newGrams < step) return;
  item.grams = newGrams;
  meal.totals = calcItemsTotals(meal.items);
  onPlanChanged();
}

function removePlanItem(personId, dayIdx, mealKey, itemIdx) {
  const meal = state.weekPlan[personId][dayIdx].meals[mealKey];
  meal.items.splice(itemIdx, 1);
  meal.totals = calcItemsTotals(meal.items);
  onPlanChanged();
}


// ===== SUBSTITUIÇÃO =====
function startSwap(personId, dayIdx, mealKey, itemIdx) { swapTarget = { personId, dayIdx, mealKey, itemIdx }; renderPlan(); }
function cancelSwap() { swapTarget = null; renderPlan(); }

function executeSwap(newFoodId) {
  if (!swapTarget || !newFoodId) return;
  const { personId, dayIdx, mealKey, itemIdx } = swapTarget;
  const meal = state.weekPlan[personId][dayIdx].meals[mealKey];
  const oldItem = meal.items[itemIdx];
  const newFood = getFoodById(newFoodId);
  if (!newFood) return;

  let newGrams = oldItem.grams;
  const cat = oldItem.food.category;
  if ((cat === 'proteina' || cat === 'suplemento') && newFood.protein > 0) {
    newGrams = Math.round(oldItem.food.protein * oldItem.grams / 100 / newFood.protein * 100);
  } else if ((cat === 'carbo' || cat === 'leguminosa') && newFood.carbs > 0) {
    newGrams = Math.round(oldItem.food.carbs * oldItem.grams / 100 / newFood.carbs * 100);
  } else if (cat === 'gordura' && newFood.fat > 0) {
    newGrams = Math.round(oldItem.food.fat * oldItem.grams / 100 / newFood.fat * 100);
  }

  const step = itemStep(newFood);
  newGrams = Math.max(step, Math.round(newGrams / step) * step);
  meal.items[itemIdx] = { food: newFood, grams: newGrams };
  meal.totals = calcItemsTotals(meal.items);
  swapTarget = null;
  onPlanChanged();
}

function getSwapAlternatives(mealKey, currentFoodId, mealItems, itemIdx) {
  const available = getSelectedForMeal(mealKey);
  const otherFoods = mealItems.filter((_, i) => i !== itemIdx).map(it => it.food);
  return available.filter(f => f.id !== currentFoodId && !isIncompatibleWith(f.id, otherFoods));
}


// ===== COLAPSAR/EXPANDIR DIAS =====
function toggleDay(personId, dayIdx) {
  if (!state.collapsedDays[personId]) state.collapsedDays[personId] = {};
  state.collapsedDays[personId][dayIdx] = !state.collapsedDays[personId][dayIdx];
  renderPlan();
}


// ===== COPIAR DIA =====
function copyDay(personId, fromIdx, toIdx) {
  const plan = state.weekPlan[personId];
  if (!plan) return;
  const source = plan[fromIdx];
  plan[toIdx].meals = {};
  for (const mk of MEAL_KEYS) {
    plan[toIdx].meals[mk] = {
      items: source.meals[mk].items.map(it => ({ food: it.food, grams: it.grams })),
      totals: { ...source.meals[mk].totals }
    };
  }
  onPlanChanged();
  showMessage(`${DAYS[fromIdx]} copiado para ${DAYS[toIdx]}.`, 'ok');
}


// ===== LISTA DE COMPRAS =====
function generateShoppingList() {
  const agg = {};
  for (const personId of Object.keys(state.weekPlan)) {
    for (const day of state.weekPlan[personId]) {
      for (const mealKey of MEAL_KEYS) {
        const meal = day.meals[mealKey];
        if (!meal || !meal.items) continue;
        for (const item of meal.items) {
          if (!agg[item.food.id]) agg[item.food.id] = { food: item.food, totalCooked: 0 };
          agg[item.food.id].totalCooked += item.grams;
        }
      }
    }
  }
  state.shoppingList = Object.values(agg).map(e => ({
    food: e.food, cookedGrams: Math.round(e.totalCooked),
    rawGrams: Math.round(e.totalCooked * e.food.rawFactor), unit: e.food.unit
  })).sort((a, b) => {
    const order = ['proteina','carbo','leguminosa','vegetal','fruta','gordura','lacteo','suplemento'];
    return order.indexOf(a.food.category) - order.indexOf(b.food.category);
  });
}


// ===== RENDERIZAÇÃO: PLANO =====
function renderPlanPersonTabs() {
  const container = document.getElementById('plan-person-tabs');
  if (state.people.length <= 1) { container.innerHTML = ''; return; }
  container.innerHTML = state.people.map(p =>
    `<button class="person-tab ${state.activePlanPerson === p.id ? 'active' : ''}" onclick="switchPlanPerson(${p.id})">${p.name}</button>`
  ).join('');
}

function switchPlanPerson(personId) {
  state.activePlanPerson = personId;
  swapTarget = null;
  renderPlanPersonTabs(); renderPlan();
}

function renderPlan() {
  const container = document.getElementById('plan-container');
  const personId = state.activePlanPerson;
  const plan = state.weekPlan[personId];

  if (!plan || plan.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Clique em "Gerar Plano Semanal" para criar seu plano.</p></div>';
    return;
  }

  const person = state.people.find(p => p.id === personId);
  const metaCal = personCalories(person);
  let html = '';

  html += `<div class="adjust-banner confirmed">
    <div class="adjust-banner-text">
      Use <strong>+/-</strong> para ajustar, <strong>&#8644;</strong> substituir, <strong>&times;</strong> remover.
      Clique no <strong>dia</strong> para colapsar. Use <strong>Copiar para</strong> para duplicar um dia.
    </div>
  </div>`;

  for (let dayIdx = 0; dayIdx < plan.length; dayIdx++) {
    const day = plan[dayIdx];
    const collapsed = state.collapsedDays[personId]?.[dayIdx];
    const dayRaw = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (const mk of MEAL_KEYS) {
      for (const it of (day.meals[mk].items || [])) {
        const f = it.grams / 100;
        dayRaw.calories += it.food.calories * f;
        dayRaw.protein += it.food.protein * f;
        dayRaw.carbs += it.food.carbs * f;
        dayRaw.fat += it.food.fat * f;
      }
    }

    html += `<div class="day-section ${collapsed ? 'collapsed' : ''}">`;

    // Day header
    html += `<div class="day-header" onclick="toggleDay(${personId},${dayIdx})">
      <span class="day-collapse-icon">${collapsed ? '&#9654;' : '&#9660;'}</span>
      <span>${day.day}-feira</span>
      <div class="day-header-actions" onclick="event.stopPropagation()">
        <select class="copy-day-select" onchange="if(this.value!=='')copyDay(${personId},${dayIdx},parseInt(this.value));this.value=''">
          <option value="">Copiar para...</option>
          ${DAYS.map((d, i) => i !== dayIdx ? `<option value="${i}">${d}</option>` : '').join('')}
        </select>
      </div>
    </div>`;

    // Meals (hidden when collapsed)
    if (!collapsed) {
      html += `<div class="day-meals">`;
      for (const mk of MEAL_KEYS) {
        const meal = day.meals[mk];
        if (!meal.items || meal.items.length === 0) continue;

        html += `<div class="meal-card"><div class="meal-card-header ${mk}">${MEAL_NAMES[mk]}</div><div class="meal-card-body">`;

        for (let itemIdx = 0; itemIdx < meal.items.length; itemIdx++) {
          const item = meal.items[itemIdx];
          const isSwapping = swapTarget && swapTarget.personId === personId && swapTarget.dayIdx === dayIdx && swapTarget.mealKey === mk && swapTarget.itemIdx === itemIdx;

          if (isSwapping) {
            const alts = getSwapAlternatives(mk, item.food.id, meal.items, itemIdx);
            const catOrder = ['proteina','carbo','leguminosa','vegetal','fruta','gordura','lacteo','suplemento'];
            const grouped = {};
            for (const f of alts) { if (!grouped[f.category]) grouped[f.category] = []; grouped[f.category].push(f); }
            let selectHtml = `<select class="swap-select" onchange="executeSwap(this.value)"><option value="">-- Escolha o substituto --</option>`;
            for (const cat of catOrder) { if (!grouped[cat]) continue; selectHtml += `<optgroup label="${CATEGORY_NAMES[cat]}">`; for (const f of grouped[cat]) { selectHtml += `<option value="${f.id}">${f.name} (${f.calories}kcal/100g)</option>`; } selectHtml += `</optgroup>`; }
            selectHtml += `</select>`;
            html += `<div class="meal-item swapping"><div class="swap-row"><span class="swap-old-name">Substituir: ${item.food.name}</span><button class="item-adj-btn remove" onclick="cancelSwap()" title="Cancelar">&times;</button></div>${selectHtml}</div>`;
          } else {
            html += `<div class="meal-item">
              <span class="meal-item-name">${item.food.name}</span>
              <div class="meal-item-controls">
                <button class="item-adj-btn swap" onclick="startSwap(${personId},${dayIdx},'${mk}',${itemIdx})" title="Substituir">&#8644;</button>
                <button class="item-adj-btn minus" onclick="adjustPlanItem(${personId},${dayIdx},'${mk}',${itemIdx},-1)" title="Diminuir">&minus;</button>
                <span class="meal-item-grams">${formatGrams(item)}</span>
                <button class="item-adj-btn plus" onclick="adjustPlanItem(${personId},${dayIdx},'${mk}',${itemIdx},1)" title="Aumentar">+</button>
                <button class="item-adj-btn remove" onclick="removePlanItem(${personId},${dayIdx},'${mk}',${itemIdx})" title="Remover">&times;</button>
              </div>
            </div>`;
          }
        }

        html += `<div class="meal-totals">
          <div class="meal-total-item"><span class="val">${meal.totals.calories}</span><span class="lbl">kcal</span></div>
          <div class="meal-total-item"><span class="val">${meal.totals.protein}g</span><span class="lbl">prot</span></div>
          <div class="meal-total-item"><span class="val">${meal.totals.carbs}g</span><span class="lbl">carb</span></div>
          <div class="meal-total-item"><span class="val">${meal.totals.fat}g</span><span class="lbl">gord</span></div>
        </div></div></div>`;
      }
      html += `</div>`;
    }

    // Day totals
    const calDiff = Math.abs(dayRaw.calories - metaCal);
    const calClass = calDiff <= 20 ? 'on-target' : calDiff <= 50 ? 'close' : 'off-target';

    html += `<div class="day-totals ${calClass}">
      <div class="day-total-item cal"><div class="val">${dayRaw.calories.toFixed(1)} / ${metaCal}</div><div class="lbl">kcal</div></div>
      <div class="day-total-item prot"><div class="val">${dayRaw.protein.toFixed(1)} / ${person.protein}g</div><div class="lbl">Prot</div></div>
      <div class="day-total-item carb"><div class="val">${dayRaw.carbs.toFixed(1)} / ${person.carbs}g</div><div class="lbl">Carb</div></div>
      <div class="day-total-item fat"><div class="val">${dayRaw.fat.toFixed(1)} / ${person.fat}g</div><div class="lbl">Gord</div></div>
    </div>`;

    // Progress bars
    const pctCal = metaCal > 0 ? (dayRaw.calories / metaCal * 100) : 0;
    const pctP = person.protein > 0 ? (dayRaw.protein / person.protein * 100) : 0;
    const pctC = person.carbs > 0 ? (dayRaw.carbs / person.carbs * 100) : 0;
    const pctF = person.fat > 0 ? (dayRaw.fat / person.fat * 100) : 0;

    html += `<div class="day-progress-bars">
      <div class="progress-row"><span class="progress-label">Cal</span><div class="progress-bar"><div class="progress-fill cal" style="width:${Math.min(100,pctCal).toFixed(1)}%"></div></div><span class="progress-pct">${pctCal.toFixed(0)}%</span></div>
      <div class="progress-row"><span class="progress-label">Prot</span><div class="progress-bar"><div class="progress-fill prot" style="width:${Math.min(100,pctP).toFixed(1)}%"></div></div><span class="progress-pct">${pctP.toFixed(0)}%</span></div>
      <div class="progress-row"><span class="progress-label">Carb</span><div class="progress-bar"><div class="progress-fill carb" style="width:${Math.min(100,pctC).toFixed(1)}%"></div></div><span class="progress-pct">${pctC.toFixed(0)}%</span></div>
      <div class="progress-row"><span class="progress-label">Gord</span><div class="progress-bar"><div class="progress-fill fat" style="width:${Math.min(100,pctF).toFixed(1)}%"></div></div><span class="progress-pct">${pctF.toFixed(0)}%</span></div>
    </div>`;

    html += `</div>`; // day-section
  }

  container.innerHTML = html;
}


// ===== RENDERIZAÇÃO: LISTA DE COMPRAS (com custo) =====
function renderShoppingList() {
  const container = document.getElementById('shopping-container');
  if (!hasPlan()) { container.innerHTML = '<div class="empty-state"><p>Gere um plano semanal primeiro.</p></div>'; return; }
  if (state.shoppingList.length === 0) { container.innerHTML = '<div class="empty-state"><p>Nenhum item.</p></div>'; return; }

  const groups = {};
  for (const item of state.shoppingList) {
    const cat = item.food.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  }

  let html = '';
  let totalRaw = 0, totalCost = 0;
  const numPeople = state.people.length;

  for (const cat of Object.keys(groups)) {
    html += `<div class="shopping-category">`;
    html += `<div class="shopping-category-header">${CATEGORY_NAMES[cat]}</div>`;
    html += `<table class="shopping-table"><thead><tr>
      <th>Alimento</th><th>Peso Cru</th><th>Comprar</th><th>R$/kg</th><th>Custo</th>
    </tr></thead><tbody>`;

    let catTotal = 0;
    for (const item of groups[cat]) {
      const raw = formatWeight(item.rawGrams);
      catTotal += item.rawGrams;
      totalRaw += item.rawGrams;
      let buyCol = raw;
      if (item.food.unitWeight) {
        const units = Math.round(item.rawGrams / item.food.unitWeight);
        buyCol = `${units} un.`;
      }
      const price = state.foodPrices[item.food.id] || 0;
      const cost = price > 0 ? (item.rawGrams / 1000 * price) : 0;
      totalCost += cost;

      html += `<tr>
        <td>${item.food.name}</td>
        <td>${raw}</td>
        <td>${buyCol}</td>
        <td><input type="number" class="price-input" value="${price || ''}" placeholder="0" min="0" step="0.5"
            onchange="updateFoodPrice('${item.food.id}',this.value)"></td>
        <td>${cost > 0 ? 'R$ ' + cost.toFixed(2) : '-'}</td>
      </tr>`;
    }

    html += `<tr class="shopping-total-row">
      <td>Subtotal</td><td></td><td>${formatWeight(catTotal)}</td><td></td><td></td>
    </tr></tbody></table></div>`;
  }

  if (totalCost > 0) {
    html += `<div class="shopping-cost-total">
      <div class="cost-label">Custo Estimado Total</div>
      <div class="cost-value">R$ ${totalCost.toFixed(2)}</div>
    </div>`;
  }

  html += `<div class="shopping-note">
    <strong>Como ler esta lista:</strong><br>
    ${numPeople > 1 ? `<strong>Inclui ${numPeople} pessoas</strong> — quantidades somadas.<br>` : ''}
    <strong>Peso Cru</strong> = Quantidade para comprar (ajustado para perda/ganho no preparo).<br>
    Preencha o campo <strong>R$/kg</strong> para ver o custo estimado.<br>
    <strong>Peso total:</strong> ${formatWeight(totalRaw)}
  </div>`;

  container.innerHTML = html;
}

function updateFoodPrice(foodId, value) {
  state.foodPrices[foodId] = parseFloat(value) || 0;
  saveState();
  renderShoppingList();
}


// ===== RENDERIZAÇÃO: MONTAGEM =====
function renderMontagem() {
  const container = document.getElementById('montagem-container');
  if (!hasPlan()) { container.innerHTML = '<div class="empty-state"><p>Gere um plano semanal primeiro.</p></div>'; return; }

  const selectedMeals = [];
  for (const mk of MEAL_KEYS) { const cb = document.getElementById('mont-' + mk); if (cb && cb.checked) selectedMeals.push(mk); }
  if (selectedMeals.length === 0) { container.innerHTML = '<div class="empty-state"><p>Selecione pelo menos uma refeição.</p></div>'; return; }

  const selectedPeople = [];
  for (const person of state.people) { const cb = document.getElementById('mont-person-' + person.id); if (cb && cb.checked) selectedPeople.push(person); }
  if (selectedPeople.length === 0) { container.innerHTML = '<div class="empty-state"><p>Selecione pelo menos uma pessoa.</p></div>'; return; }

  const allContainers = [];
  for (const person of selectedPeople) {
    const plan = state.weekPlan[person.id];
    if (!plan) continue;
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      for (const mk of selectedMeals) {
        const meal = plan[dayIdx].meals[mk];
        if (!meal || !meal.items || meal.items.length === 0) continue;
        const fingerprint = meal.items.map(it => `${it.food.id}:${it.grams}`).sort().join('|');
        allContainers.push({ person: person.name, personId: person.id, day: DAYS[dayIdx], dayIdx, mealKey: mk, meal: MEAL_NAMES[mk], items: meal.items, totals: meal.totals, fingerprint });
      }
    }
  }

  if (allContainers.length === 0) { container.innerHTML = '<div class="empty-state"><p>Nenhuma marmita para montar.</p></div>'; return; }

  const groups = {};
  for (const c of allContainers) { if (!groups[c.fingerprint]) groups[c.fingerprint] = { items: c.items, totals: c.totals, instances: [] }; groups[c.fingerprint].instances.push(c); }

  const groupList = Object.values(groups);
  let html = `<div class="montagem-summary"><span class="montagem-total">${allContainers.length} marmitas</span> para montar <span class="montagem-types">(${groupList.length} tipo${groupList.length > 1 ? 's' : ''})</span></div>`;

  for (let gi = 0; gi < groupList.length; gi++) {
    const group = groupList[gi];
    html += `<div class="marmita-group"><div class="marmita-group-header"><span class="marmita-count">${group.instances.length}x</span><span class="marmita-title">Tipo ${gi + 1}</span></div>`;
    html += `<div class="marmita-items">`;
    for (const item of group.items) html += `<div class="marmita-item"><span class="marmita-item-name">${item.food.name}</span><span class="marmita-item-grams">${formatGrams(item)}</span></div>`;
    html += `</div>`;
    html += `<div class="marmita-macros"><span>${group.totals.calories} kcal</span><span>${group.totals.protein}g prot</span><span>${group.totals.carbs}g carb</span><span>${group.totals.fat}g gord</span></div>`;
    html += `<div class="marmita-labels">`;
    for (const inst of group.instances) html += `<span class="marmita-label">${inst.person} &mdash; ${inst.day} ${inst.meal}</span>`;
    html += `</div></div>`;
  }

  container.innerHTML = html;
}

function updateMontagemConfig() { renderMontagem(); }


// ===== RENDERIZAÇÃO: PREPARAR =====
function renderPreparar() {
  const container = document.getElementById('preparar-container');
  if (!hasPlan()) { container.innerHTML = '<div class="empty-state"><p>Gere um plano semanal primeiro.</p></div>'; return; }
  if (state.shoppingList.length === 0) { container.innerHTML = '<div class="empty-state"><p>Nenhum item.</p></div>'; return; }

  const groups = {};
  for (const item of state.shoppingList) { const method = PREP_METHODS[item.food.id] || 'pronto'; if (!groups[method]) groups[method] = []; groups[method].push(item); }

  let html = '', totalItems = 0, totalRawKg = 0;
  for (const method of PREP_METHOD_ORDER) { if (!groups[method] || method === 'pronto') continue; for (const item of groups[method]) { totalItems++; totalRawKg += item.rawGrams; } }

  html += `<div class="prep-summary"><span class="prep-summary-total">${totalItems} itens para preparar</span><span class="prep-summary-sub"> — ${formatWeight(totalRawKg)} (peso cru)</span></div>`;

  for (const method of PREP_METHOD_ORDER) {
    if (!groups[method]) continue;
    const items = groups[method];
    let loteRawTotal = 0;
    for (const item of items) loteRawTotal += item.rawGrams;

    html += `<div class="prep-lote"><div class="prep-lote-header"><div class="prep-lote-icon ${method}">${PREP_METHOD_ICONS[method] || '📦'}</div><div><div class="prep-lote-title">${PREP_METHOD_NAMES[method] || method}</div><div class="prep-lote-count">${items.length} ite${items.length === 1 ? 'm' : 'ns'}</div></div></div>`;
    html += `<div class="prep-lote-body">`;
    for (const item of items) {
      let rawDisplay = formatWeight(item.rawGrams);
      if (item.food.unitWeight) { rawDisplay = `${Math.round(item.rawGrams / item.food.unitWeight)} un. (${rawDisplay})`; }
      html += `<div class="prep-item"><span class="prep-item-name">${item.food.name}</span><span class="prep-item-raw">${rawDisplay}</span></div>`;
    }
    html += `</div><div class="prep-lote-footer"><span class="prep-lote-footer-label">Total ${method !== 'pronto' ? 'cru' : ''}</span><span class="prep-lote-footer-value">${formatWeight(loteRawTotal)}</span></div></div>`;
  }

  html += `<div class="prep-tip"><strong>Dica:</strong> Cozinhe tudo em sequência na panela de pressão. Asse tudo junto no forno. Refogue os vegetais por último. Porcione usando a aba <strong>Montagem</strong>.</div>`;
  container.innerHTML = html;
}


// ===== RENDERIZAÇÃO: RESUMO SEMANAL =====
function renderResumo() {
  const container = document.getElementById('resumo-container');
  if (!hasPlan()) { container.innerHTML = '<div class="empty-state"><p>Gere um plano semanal primeiro.</p></div>'; return; }

  const personId = state.activePlanPerson || state.people[0]?.id;
  const plan = state.weekPlan[personId];
  const person = state.people.find(p => p.id === personId);
  if (!plan || !person) return;

  const dailyData = [];
  let weekTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  for (let d = 0; d < 7; d++) {
    const dt = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (const mk of MEAL_KEYS) {
      for (const it of (plan[d].meals[mk]?.items || [])) {
        const f = it.grams / 100;
        dt.calories += it.food.calories * f; dt.protein += it.food.protein * f;
        dt.carbs += it.food.carbs * f; dt.fat += it.food.fat * f;
      }
    }
    dailyData.push(dt);
    weekTotals.calories += dt.calories; weekTotals.protein += dt.protein;
    weekTotals.carbs += dt.carbs; weekTotals.fat += dt.fat;
  }

  const avg = { cal: weekTotals.calories / 7, p: weekTotals.protein / 7, c: weekTotals.carbs / 7, f: weekTotals.fat / 7 };
  const targetCal = personCalories(person);

  let html = '';

  if (state.people.length > 1) {
    html += '<div class="resumo-person-tabs">';
    for (const p of state.people) html += `<button class="person-tab ${personId === p.id ? 'active' : ''}" onclick="state.activePlanPerson=${p.id};renderResumo()">${p.name}</button>`;
    html += '</div>';
  }

  html += '<div class="resumo-averages">';
  html += `<div class="resumo-avg-card"><div class="resumo-avg-label">Média Diária</div><div class="resumo-avg-value cal">${avg.cal.toFixed(0)} kcal</div><div class="resumo-avg-target">Meta: ${targetCal} kcal</div><div class="resumo-avg-bar"><div class="resumo-avg-bar-fill cal" style="width:${Math.min(100, avg.cal/targetCal*100)}%"></div></div></div>`;
  html += `<div class="resumo-avg-card"><div class="resumo-avg-label">Proteína</div><div class="resumo-avg-value prot">${avg.p.toFixed(1)}g</div><div class="resumo-avg-target">Meta: ${person.protein}g</div><div class="resumo-avg-bar"><div class="resumo-avg-bar-fill prot" style="width:${Math.min(100, avg.p/person.protein*100)}%"></div></div></div>`;
  html += `<div class="resumo-avg-card"><div class="resumo-avg-label">Carboidratos</div><div class="resumo-avg-value carb">${avg.c.toFixed(1)}g</div><div class="resumo-avg-target">Meta: ${person.carbs}g</div><div class="resumo-avg-bar"><div class="resumo-avg-bar-fill carb" style="width:${Math.min(100, avg.c/person.carbs*100)}%"></div></div></div>`;
  html += `<div class="resumo-avg-card"><div class="resumo-avg-label">Gorduras</div><div class="resumo-avg-value fat">${avg.f.toFixed(1)}g</div><div class="resumo-avg-target">Meta: ${person.fat}g</div><div class="resumo-avg-bar"><div class="resumo-avg-bar-fill fat" style="width:${Math.min(100, avg.f/person.fat*100)}%"></div></div></div>`;
  html += '</div>';

  // Charts
  html += '<div class="resumo-charts-row">';
  html += '<div class="resumo-chart-card"><div class="resumo-chart-title">Calorias por Dia</div><canvas id="chart-weekly-cal" width="600" height="260"></canvas></div>';
  html += '<div class="resumo-chart-card"><div class="resumo-chart-title">Distribuição de Macros</div><canvas id="chart-macro-donut" width="280" height="280"></canvas></div>';
  html += '</div>';

  container.innerHTML = html;

  // Draw charts after DOM is ready
  setTimeout(() => {
    drawWeeklyChart(dailyData, targetCal);
    drawMacroDonut(avg.p, avg.c, avg.f);
  }, 10);
}

function drawWeeklyChart(dailyData, targetCal) {
  const canvas = document.getElementById('chart-weekly-cal');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const pad = { top: 20, right: 20, bottom: 40, left: 55 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const maxVal = Math.max(targetCal * 1.15, ...dailyData.map(d => d.calories)) || 1;

  // Grid lines
  ctx.strokeStyle = state.darkMode ? '#2a2d42' : '#edf0f7';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + chartH - (chartH * i / 4);
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    ctx.fillStyle = state.darkMode ? '#5c6188' : '#9ba1bf';
    ctx.font = '500 10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxVal * i / 4), pad.left - 8, y + 4);
  }

  // Target line
  const targetY = pad.top + chartH - (targetCal / maxVal * chartH);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath(); ctx.moveTo(pad.left, targetY); ctx.lineTo(w - pad.right, targetY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#ef4444';
  ctx.font = '600 10px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Meta', w - pad.right + 4, targetY + 4);

  // Bars
  const barW = chartW / 7 * 0.6;
  const gap = chartW / 7;

  for (let i = 0; i < 7; i++) {
    const val = dailyData[i].calories;
    const barH = (val / maxVal) * chartH;
    const x = pad.left + gap * i + (gap - barW) / 2;
    const y = pad.top + chartH - barH;

    const diff = Math.abs(val - targetCal);
    let color = '#22c55e';
    if (diff > 50) color = '#f59e0b';
    if (diff > 100) color = '#ef4444';

    ctx.fillStyle = color;
    ctx.beginPath();
    const r = 4;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barW - r, y);
    ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
    ctx.lineTo(x + barW, pad.top + chartH);
    ctx.lineTo(x, pad.top + chartH);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();

    // Value on top
    ctx.fillStyle = state.darkMode ? '#e8eaf0' : '#1e2132';
    ctx.font = '600 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(val), x + barW / 2, y - 6);

    // Day label
    ctx.fillStyle = state.darkMode ? '#8a90b0' : '#6b7194';
    ctx.font = '500 10px Inter, sans-serif';
    ctx.fillText(DAYS[i].substring(0, 3), x + barW / 2, h - pad.bottom + 16);
  }
}

function drawMacroDonut(avgP, avgC, avgF) {
  const canvas = document.getElementById('chart-macro-donut');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2, cy = h / 2;
  const outerR = 100, innerR = 65;
  const pCal = avgP * 4, cCal = avgC * 4, fCal = avgF * 9;
  const total = pCal + cCal + fCal;
  if (total === 0) return;

  const segments = [
    { value: pCal, color: '#ef4444', label: `Prot ${(pCal/total*100).toFixed(0)}%` },
    { value: cCal, color: '#3b82f6', label: `Carb ${(cCal/total*100).toFixed(0)}%` },
    { value: fCal, color: '#f59e0b', label: `Gord ${(fCal/total*100).toFixed(0)}%` }
  ];

  let startAngle = -Math.PI / 2;
  for (const seg of segments) {
    const sliceAngle = (seg.value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    startAngle += sliceAngle;
  }

  ctx.fillStyle = state.darkMode ? '#e8eaf0' : '#1e2132';
  ctx.font = '700 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${total.toFixed(0)}`, cx, cy - 8);
  ctx.fillStyle = state.darkMode ? '#5c6188' : '#9ba1bf';
  ctx.font = '500 11px Inter, sans-serif';
  ctx.fillText('kcal/dia', cx, cy + 10);

  // Legend
  const legendY = cy + outerR + 20;
  const legendGap = 90;
  for (let i = 0; i < segments.length; i++) {
    const lx = cx - legendGap + i * legendGap;
    ctx.fillStyle = segments[i].color;
    ctx.beginPath();
    ctx.arc(lx - 18, legendY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = state.darkMode ? '#e8eaf0' : '#1e2132';
    ctx.font = '600 10px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(segments[i].label, lx - 10, legendY + 4);
  }
}


// ===== DARK MODE =====
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  applyDarkMode();
  saveState();
  // Re-render donuts with correct colors
  if (document.getElementById('tab-macros').classList.contains('active')) renderPeople();
  if (document.getElementById('tab-resumo').classList.contains('active')) renderResumo();
}

function applyDarkMode() {
  document.documentElement.classList.toggle('dark', state.darkMode);
  const metaTheme = document.getElementById('meta-theme-color');
  if (metaTheme) metaTheme.content = state.darkMode ? '#0f1117' : '#5b5fc7';
}


// ===== SALVAR/CARREGAR PLANOS =====
function openSavePlanPrompt() {
  const name = prompt('Nome para este plano:');
  if (!name || !name.trim()) return;
  savePlanAs(name.trim());
}

function savePlanAs(name) {
  const serialized = serializePlan(state.weekPlan);
  state.savedPlans.push({
    name,
    timestamp: Date.now(),
    data: serialized,
    people: JSON.parse(JSON.stringify(state.people))
  });
  saveState();
  showMessage(`Plano "${name}" salvo!`, 'ok');
}

function serializePlan(weekPlan) {
  const result = {};
  for (const personId of Object.keys(weekPlan)) {
    result[personId] = weekPlan[personId].map(day => ({
      day: day.day,
      meals: Object.fromEntries(MEAL_KEYS.map(mk => [mk, {
        items: (day.meals[mk]?.items || []).map(it => ({ foodId: it.food.id, grams: it.grams })),
        totals: day.meals[mk]?.totals || { calories: 0, protein: 0, carbs: 0, fat: 0 }
      }]))
    }));
  }
  return result;
}

function deserializePlan(serialized) {
  const result = {};
  for (const personId of Object.keys(serialized)) {
    result[personId] = serialized[personId].map(day => ({
      day: day.day,
      meals: Object.fromEntries(MEAL_KEYS.map(mk => [mk, {
        items: (day.meals[mk]?.items || []).map(it => {
          const food = getFoodById(it.foodId);
          return food ? { food, grams: it.grams } : null;
        }).filter(Boolean),
        totals: day.meals[mk]?.totals || { calories: 0, protein: 0, carbs: 0, fat: 0 }
      }]))
    }));
  }
  return result;
}

function openSavedPlansModal() {
  const list = document.getElementById('saved-plans-list');
  if (state.savedPlans.length === 0) {
    list.innerHTML = '<div class="saved-plans-empty">Nenhum plano salvo ainda.</div>';
  } else {
    list.innerHTML = state.savedPlans.map((sp, idx) => {
      const date = new Date(sp.timestamp).toLocaleDateString('pt-BR');
      return `<div class="saved-plan-item">
        <div class="saved-plan-info"><div class="saved-plan-name">${sp.name}</div><div class="saved-plan-date">${date}</div></div>
        <div class="saved-plan-actions">
          <button class="saved-plan-load" onclick="loadSavedPlan(${idx})">Carregar</button>
          <button class="saved-plan-delete" onclick="deleteSavedPlan(${idx})">Excluir</button>
        </div>
      </div>`;
    }).join('');
  }
  document.getElementById('saved-plans-modal').style.display = 'flex';
}

function closeSavedPlansModal() {
  document.getElementById('saved-plans-modal').style.display = 'none';
}

function loadSavedPlan(idx) {
  const sp = state.savedPlans[idx];
  if (!sp) return;
  if (sp.people) state.people = JSON.parse(JSON.stringify(sp.people));
  state.weekPlan = deserializePlan(sp.data);
  state.planGenerated = true;
  state.activePlanPerson = state.people[0].id;
  state.collapsedDays = {};
  generateShoppingList();
  renderPlanPersonTabs();
  renderPlan();
  renderShoppingList();
  renderMontagemConfig();
  renderPeople();
  closeSavedPlansModal();
  document.getElementById('btn-generate').style.display = 'none';
  document.getElementById('btn-regenerate').style.display = 'inline-flex';
  document.getElementById('btn-save-plan').style.display = 'inline-flex';
  document.getElementById('btn-share').style.display = 'inline-flex';
  showMessage(`Plano "${sp.name}" carregado!`, 'ok');
}

function deleteSavedPlan(idx) {
  state.savedPlans.splice(idx, 1);
  saveState();
  openSavedPlansModal(); // refresh list
}


// ===== WHATSAPP SHARE =====
function shareWhatsApp() {
  if (!hasPlan()) return;
  let text = '*NutriPlan - Plano Semanal*\n\n';
  for (const person of state.people) {
    const plan = state.weekPlan[person.id];
    if (!plan) continue;
    if (state.people.length > 1) text += `*${person.name}*\n\n`;
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      const day = plan[dayIdx];
      text += `📅 *${day.day}*\n`;
      for (const mk of MEAL_KEYS) {
        const meal = day.meals[mk];
        if (!meal.items || meal.items.length === 0) continue;
        text += `  ${MEAL_NAMES[mk]}:\n`;
        for (const item of meal.items) text += `    • ${item.food.name} - ${formatGrams(item)}\n`;
      }
      text += '\n';
    }
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}


// ===== UTILITÁRIOS =====
function showMessage(msg, type) {
  const existing = document.querySelector('.msg-banner');
  if (existing) existing.remove();
  const banner = document.createElement('div');
  banner.className = 'msg-banner';
  const bg = type === 'warn' ? '#c93550' : '#16a07a';
  const shadow = type === 'warn' ? 'rgba(201,53,80,0.4)' : 'rgba(22,160,122,0.4)';
  banner.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%);background:${bg};color:white;padding:1rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:600;z-index:9999;box-shadow:0 4px 20px ${shadow};max-width:90vw;text-align:center;animation:slideDown 0.3s ease;`;
  banner.textContent = msg;
  document.body.appendChild(banner);
  setTimeout(() => { banner.style.opacity = '0'; banner.style.transition = 'opacity 0.3s'; setTimeout(() => banner.remove(), 300); }, 3000);
}


// ===== MONTAGEM CONFIG =====
function renderMontagemConfig() {
  const cfg = document.getElementById('montagem-config');
  if (!cfg) return;
  const mealState = {};
  for (const mk of MEAL_KEYS) { const existing = document.getElementById('mont-' + mk); mealState[mk] = existing ? existing.checked : (mk === 'almoco' || mk === 'jantar'); }
  const personState = {};
  for (const person of state.people) { const existing = document.getElementById('mont-person-' + person.id); personState[person.id] = existing ? existing.checked : true; }

  let html = '<div class="montagem-meals-config"><label class="config-label">Refeições:</label>';
  for (const mk of MEAL_KEYS) { html += `<label class="montagem-checkbox"><input type="checkbox" id="mont-${mk}" ${mealState[mk] ? 'checked' : ''} onchange="updateMontagemConfig()"><span>${MEAL_NAMES[mk]}</span></label>`; }
  html += '</div><div class="montagem-people-config"><label class="config-label">Pessoas:</label>';
  for (const person of state.people) { html += `<label class="montagem-checkbox"><input type="checkbox" id="mont-person-${person.id}" ${personState[person.id] ? 'checked' : ''} onchange="updateMontagemConfig()"><span>${person.name}</span></label>`; }
  html += '</div>';
  cfg.innerHTML = html;
}


// ===== INIT =====
function init() {
  loadState();
  applyDarkMode();
  renderPeople();
  renderDistribution();
  renderFoods();
  renderIncompatSelects();
  renderIncompatList();
  renderMontagemConfig();
  document.getElementById('plan-container').innerHTML = '<div class="empty-state"><p>Clique em "Gerar Plano Semanal" para criar seu plano.</p></div>';

  // slideDown animation
  const style = document.createElement('style');
  style.textContent = `@keyframes slideDown { from { transform: translateX(-50%) translateY(-20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }`;
  document.head.appendChild(style);

  // Register Service Worker (PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

window.addEventListener('DOMContentLoaded', init);
