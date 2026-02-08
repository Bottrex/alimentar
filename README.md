# NutriPlan

Planejador de refeicoes semanal inteligente baseado na Tabela TACO (Tabela Brasileira de Composicao de Alimentos).

## Funcionalidades

- Planejamento semanal automatico com 4 refeicoes por dia
- Suporte a multiplas pessoas com metas individuais de macros
- Base de dados TACO com valores nutricionais reais (por 100g cozido)
- Alimentos personalizados
- Lista de compras consolidada com estimativa de custos
- Modo preparo com marmitas agrupadas
- Resumo semanal com graficos
- Dark mode
- Compartilhamento via WhatsApp e impressao PDF
- Salvar/carregar multiplos planos
- PWA instalavel com suporte offline

## Como rodar em modo dev

### Opcao 1: npx serve (recomendado)

```bash
npx serve .
```

Acesse `http://localhost:3000`

### Opcao 2: Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Acesse `http://localhost:8000`

### Opcao 3: PHP

```bash
php -S localhost:8000
```

### Opcao 4: VS Code

Instale a extensao [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique em "Go Live" no canto inferior direito.

> **Nota:** Abrir o `index.html` diretamente no navegador (`file://`) funciona para a maioria das funcionalidades, mas o Service Worker (PWA/offline) requer um servidor HTTP.

## Estrutura

```
├── index.html        # Estrutura HTML e modais
├── style.css         # Estilos com dark mode (CSS variables)
├── app.js            # Logica: algoritmo, UI, estado, graficos
├── manifest.json     # PWA manifest
├── sw.js             # Service Worker (offline)
├── CLAUDE.md         # Memoria tecnica do projeto
└── README.md
```

## Stack

- HTML / CSS / JavaScript (vanilla, sem frameworks)
- localStorage para persistencia
- Canvas API para graficos
- PWA com Service Worker

## Licenca

MIT
