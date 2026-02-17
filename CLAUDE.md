# NutriPlan - Memoria do Projeto

## Repositorio
- **GitHub:** https://github.com/Bottrex/alimentar
- **Pasta local:** `C:\Users\Usuário\Desktop\Alimentos`
- **Branch:** `master`
- **Git user:** welington teixeira <welington.t.silva@gmail.com>

## Stack
- **Vanilla HTML/CSS/JS** (sem frameworks)
- **PWA** com Service Worker + manifest.json
- **Persistencia:** localStorage + Supabase (sync remoto)
- **Supabase:** projeto `ubhnqnuoradajiykiiws` (Plano Alimentar)
- **Dados nutricionais:** Tabela TACO (brasileira, por 100g cozido)

## Arquivos

| Arquivo | Linhas | Descricao |
|---------|--------|-----------|
| `index.html` | ~360 | Estrutura HTML, modais (custom food, planos, sync), navegacao |
| `style.css` | ~1870 | Estilos completos com dark mode via CSS variables |
| `app.js` | ~1880 | Logica completa: algoritmo, UI, estado, graficos, Supabase sync |
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
1. **Metas** - Cadastro com nome e metas de macros
2. **Alimentos** - Lista TACO com busca + alimentos personalizados
3. **Plano** - Plano semanal gerado com dias colapsaveis
4. **Marmitas** - Montagem agrupada por fingerprint
5. **Preparar** - Modo preparo em lotes por metodo
6. **Compras** - Lista de compras consolidada com estimativa de custos
7. **Resumo** - Dashboard semanal com graficos (barras + donut)

## Melhorias Sessao 1-2 (2026-02-07)

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

## Melhorias Sessao 3 (2026-02-16)

### 1. Adicionar Item a Refeicao
- Botao `+ Adicionar item` no final de cada meal-card em `renderPlan()`
- Seletor inline (igual swap) com alimentos agrupados por categoria
- Filtra alimentos ja presentes na refeicao
- Quantidade padrao: 100g solidos, 100ml liquidos, `unitWeight` para unitarios
- **Estado:** `addItemTarget` (como `swapTarget`)
- **Funcoes:** `startAddItem()`, `executeAddItem()`, `cancelAddItem()`
- **CSS:** `.btn-add-item` (borda dashed, hover accent)

### 2. Liquidos em ml
- Propriedade `liquid: true` em: `leite_desnatado`, `azeite`, `oleo_coco`
- `formatGrams(item)`: mostra `ml` se `item.food.liquid === true`
- `formatWeight(g, liquid)`: mostra `ml/L` se `liquid === true` (2o parametro)
- `renderShoppingList()` e `renderPreparar()` passam `item.food.liquid` para `formatWeight()`
- Checkbox "Liquido (medir em ml)" no modal de alimento customizado (`#cf-liquid`)
- `saveCustomFood()` salva `food.liquid = true` se marcado

### 3. Supabase Sync
- **Projeto:** `ubhnqnuoradajiykiiws` (Plano Alimentar)
- **Tabela:** `nutriplan_data` (id UUID, sync_code TEXT UNIQUE, state_data JSONB, updated_at)
- **RLS:** Policies publicas (anyone_can_read/insert/update)
- **CDN:** `@supabase/supabase-js@2` via jsDelivr no `<head>`
- **Codigo sync:** 6 chars alfanumericos, salvo em `localStorage('nutriplan_sync_code')`
- **`saveToSupabase()`:** upsert debounced 2s, chamado automaticamente por `saveState()`
- **`loadFromSupabase(code)`:** carrega state pelo sync_code, restaura todo o estado
- **Init:** compara `nutriplan_save_ts` local vs `updated_at` remoto, carrega o mais recente
- **UI:** Botao "Sync" na sidebar (abaixo da nav), modal com codigo e campo para carregar
- **Mobile:** `.sync-btn-sidebar` hidden (`display: none`) no breakpoint 900px

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
- `saveState()` tambem chama `saveToSupabase()` (debounce 2s)
- Planos salvos serializam food objects para food IDs (economia de espaco)
- `deserializePlan()` reconstroi objetos via `getFoodById()`
- Timestamp local: `nutriplan_save_ts` (para comparar com remoto)

### Alimentos
- IDs customizados no formato `custom_` + timestamp
- `getAllFoods()` retorna `[...FOODS, ...state.customFoods]`
- Propriedade `liquid: true` para alimentos medidos em ml
- Integrados em todas as funcoes que usavam `FOODS` diretamente

### Dark Mode
- CSS variables em `html.dark` sobrescrevem todas as cores
- Canvas (graficos) verificam `state.darkMode` para cores de texto
- Meta theme-color atualizada dinamicamente

### Graficos
- Canvas API puro (sem bibliotecas)
- `drawDonut()` - grafico de rosca para macros por pessoa
- `drawWeeklyChart()` - barras semanais com linha de meta
- `drawMacroDonut()` - distribuicao media de macros (canvas 320x320)

### UI Mobile
- Bottom nav com `backdrop-filter: blur`
- Touch targets minimo 44px
- `100dvh` para altura total
- `safe-area-inset` para notch
- Sidebar colapsa em tela pequena

## Historico de Desenvolvimento

### Sessao 1 (2026-02-07)
- Criacao inicial do NutriPlan completo
- Todas as abas base: Metas, Alimentos, Plano, Compras, Preparar, Marmitas
- Algoritmo de planejamento com tabela TACO
- UI mobile-first com icones tematicos

### Sessao 2 (2026-02-07)
- Implementacao das 11 melhorias
- Reescrita completa dos 3 arquivos principais
- Criacao de manifest.json e sw.js
- Repositorio GitHub criado: Bottrex/alimentar

### Sessao 3 (2026-02-16)
- Adicionar item a refeicao (botao "+" com seletor inline)
- Liquidos em ml (leite, azeite, oleo de coco + checkbox no custom food)
- Supabase sync com codigo de 6 caracteres (tabela nutriplan_data)
- Layout do Resumo rebalanceado (charts 1.4fr:1fr, align-items start)
- Commit: `98a8519`
