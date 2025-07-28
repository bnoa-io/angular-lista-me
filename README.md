# 📋 CRUD de Usuários - Angular + Node.js

Este projeto é uma aplicação completa de gerenciamento de usuários (CRUD), com backend em Node.js utilizando SQLite como banco de dados, e frontend em Angular. A aplicação permite cadastrar, visualizar, editar e excluir usuários, além de aplicar filtros dinâmicos com formulário reativo e visualização detalhada em sidebar.

---

## 🚀 Tecnologias Utilizadas

### 📦 Backend (Node.js)
- Node.js
- Express.js
- SQLite (banco de dados local)
- SQLite3 (driver)
- Cors
- Body-parser

### 🌐 Frontend (Angular)
- Angular 16+
- Angular Material
- Tailwindcss
- Estrutura modularizada
- Reactive Forms
- RxJS com gerenciamento de estado via `BehaviorSubject`
- Angular Router (lazy loading)
- Consumo de API REST via `HttpClient`

---

## 📌 Funcionalidades

- [x] **Listagem de usuários** com exibição em tabela paginada
- [x] **Filtro dinâmico**
- [x] **Criação de novos usuários** com formulário reativo
- [x] **Edição** dos dados do usuário
- [x] **Exclusão** do usuário
- [x] **Visualização em sidebar** com detalhes completos
- [x] **Validações de formulário** com mensagens de erro amigáveis
- [ ] Exportação para CSV/Excel *(em desenvolvimento)*

---

## 📮 API

### `GET /usuarios`
Retorna todos os usuários.  

### `GET /usuarios/:id`
Retorna um único usuário com base no ID

### `GET /usuarios/cargos`
Retorna as profissões de cada usuário

### `POST /usuarios`
Cria um novo usuário  
**Body:**
```json
{
  "nome": "João Silva",
  "cargo": "Desenvolvedor",
  "contratacao": "2024-10-01",
  "status": true,
  "salario": 4500.00
}
```

### `PUT /usuarios/:id`
Atualiza um usuário existente  
**Body:** (mesmo do POST)

### `DELETE /usuarios/:id`
Remove um usuário com base no ID

🐙 [Projeto no GitHub](https://github.com/bnoa-io/nodejs-lista-me-api)

---

## 📬 Contato

**Brayan Apeles**  
📧 brayanapeles.dev@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/brayan-apeles-2814872a2/)  
🐙 [GitHub](https://github.com/bnoa-io)

---
