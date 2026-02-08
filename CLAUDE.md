# NutriPlan - Memoria do Projeto

## Repositorio
- **GitHub:** https://github.com/Bottrex/alimentar
- **Pasta local:** `C:\Users\Usuário\Desktop\Alimentos`
- **Branch:** `master`
- **Git user:** welington teixeira <welington.t.silva@gmail.com>

## Stack
- **Vanilla HTML/CSS/JS** (sem frameworks)
- **PWA** com Service Worker + manifest.json
- **Persistencia:** localStorage (sem backend/banco de dados)
- **Dados nutricionais:** Tabela TACO (brasileira, por 100g cozido)

## Arquivos

| Arquivo | Linhas | Descricao |
|---------|--------|-----------|
| `index.html` | ~280 | Estrutura HTML, modais, navegacao bottom-nav |
| `style.css` | ~1100 | Estilos completos com dark mode via CSS variables |
| `app.js` | ~1560 | Logica completa: algoritmo, UI, estado, graficos |
| `manifest.json` | ~12 | PWA manifest (instalavel, standalone) |
| `sw.js` | ~45 | Service Worker (network-first com cache fallback) |

## Funcionalidades Principais

### Algoritmo de Planejamento
- Gera plano semanal (7 dias) com 4 refeicoes: cafe, almoco, lanche, jantar
- Algoritmo sequencial com 60 iteracoes de fine-tuning por refeicao
- Metas diarias configuraveis: calorias, proteina, carboidrato, gordura
- Calorias derivadas: `P*4 + C*4 + F*9`
- `rawFactor` para conversao peso cru/cozido
- `unitWeight` para alimentos em unidades (ex: 1 ovo = 50g)
- Regras de incompatibilidade entre alimentos (ex: 2 carnes no mesmo prato)
- Distribuicao de macros por refeicao: cafe 20%, almoco 35%, lanche 15%, jantar 30%

### Multi-Pessoa
- Suporte a multiplas pessoas com metas individuais
- Cada pessoa tem seu plano semanal independente
- Fingerprint de marmita para agrupar containers identicos

### Abas do App
1. **Pessoas** - Cadastro com nome e metas de macros
2. **Alimentos** - Lista TACO com busca + alimentos personalizados
3. **Plano** - Plano semanal gerado com dias colapsaveis
4. **Compras** - Lista de compras consolidada com estimativa de custos
5. **Preparar** - Modo preparo com marmitas agrupadas por fingerprint
6. **Receitas** - Receitas sugeridas baseadas nos alimentos do plano
7. **Resumo** - Dashboard semanal com graficos (barras + donut)

## 11 Melhorias Implementadas (2026-02-07)

| # | Melhoria | Funcoes principais |
|---|----------|--------------------|
| 1 | Busca nos alimentos | `onFoodSearch()`, filtro em `renderFoods()` |
| 2 | Barras de progresso macros | Renderizadas em `renderPlan()` com cores por macro |
| 3 | Copiar dia | `copyDay(personId, fromIdx, toIdx)` |
| 4 | Alimentos personalizados | `saveCustomFood()`, `removeCustomFood()`, `getAllFoods()` |
| 5 | Colapsar/expandir dias | `toggleDay()`, `state.collapsedDays` |
| 6 | Dark mode | `toggleDarkMode()`, `applyDarkMode()`, `html.dark` class |
| 7 | WhatsApp + PDF | `shareWhatsApp()` via wa.me, `window.print()` |
| 8 | Salvar/carregar planos | `savePlanAs()`, `serializePlan()`, `deserializePlan()` |
| 9 | Estimativa de custos | `updateFoodPrice()`, `state.foodPrices` |
| 10 | Resumo semanal | `renderResumo()`, `drawWeeklyChart()`, `drawMacroDonut()` |
| 11 | PWA offline | `sw.js`, `manifest.json`, registro em `init()` |

## Padroes Tecnicos

### Estado Global (`state`)
```javascript
{
  people: [],           // Array de pessoas com metas
  weekPlan: {},         // Plano semanal por pessoa (personId -> 7 dias)
  shoppingList: [],     // Lista de compras consolidada
  customFoods: [],      // Alimentos criados pelo usuario
  savedPlans: [],       // Planos salvos com nome
  collapsedDays: {},    // Dias colapsados por pessoa
  darkMode: false,      // Preferencia de tema
  searchQuery: '',      // Busca atual na aba Alimentos
  foodPrices: {}        // Precos por foodId
}
```

### Persistencia
- `saveState()` / `loadState()` usam `localStorage` com key `nutriplan_state`
- Planos salvos serializam food objects para food IDs (economia de espaco)
- `deserializePlan()` reconstroi objetos via `getFoodById()`

### Alimentos Personalizados
- IDs no formato `custom_` + timestamp
- `getAllFoods()` retorna `[...FOODS, ...state.customFoods]`
- Integrados em todas as funcoes que usavam `FOODS` diretamente

### Dark Mode
- CSS variables em `html.dark` sobrescrevem todas as cores
- Canvas (graficos) verificam `state.darkMode` para cores de texto
- Meta theme-color atualizada dinamicamente

### Graficos
- Canvas API puro (sem bibliotecas)
- `drawDonut()` - grafico de rosca para macros nas marmitas
- `drawWeeklyChart()` - barras semanais com linha de meta
- `drawMacroDonut()` - distribuicao media de macros

### UI Mobile
- Bottom nav com `backdrop-filter: blur`
- Touch targets minimo 44px
- `100dvh` para altura total
- `safe-area-inset` para notch
- Sidebar colapsa em tela pequena

## Historico de Desenvolvimento

### Sessao 1 (2026-02-07)
- Criacao inicial do NutriPlan completo
- Todas as abas base: Pessoas, Alimentos, Plano, Compras, Preparar, Receitas
- Algoritmo de planejamento com tabela TACO
- UI mobile-first com icones tematicos

### Sessao 2 (2026-02-07)
- Implementacao das 11 melhorias
- Reescrita completa dos 3 arquivos principais
- Criacao de manifest.json e sw.js
- Repositorio GitHub criado: Bottrex/alimentar
