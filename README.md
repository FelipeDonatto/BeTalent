# Documentação da API

<details>
<summary>📦 Observações e Plano de melhoria 📦 </summary>

---

##### Como essa API é apenas uma demonstração, a segurança não foi um ponto de procupação extremo. Ela é apenas para demonstrar minhas habilidades e conhecimento sobre a estrutura usada.

---

1. Melhorar a segurança, ceritificar que apenas usuarios e clientes relacionados consigam modificar os dados.

2. Adicionar testes unitarios para cada rota

3. Realizar possiveis mudanças de acordo com as necessidades do Front-End

---

</details>

## Visão Geral

Esta API permite gerenciar usuários, clientes e produtos, com rotas organizadas por prefixos. Todas as rotas protegidas exigem autenticação JWT por meio de middleware.
O token é gerado ao realizar o login, sendo no padrão:

```
Authorization: Bearer {token}
```

### Antes de começar será necessário:

##### instalar as dependências na raiz do projeto

```bash
npm run install
```

##### criar um arquivo .env

```bash
touch .env
```

##### O seu .env deve seguir um padrão parecido com este:

```.env
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=xxxxxxxxxx
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=BeTalent
```

#### Certifique-se de que exista um database MySql com o nome de BeTalent antes de prosseguir.

#### Agora vamos rodar as migrations

```bash
node ace migration:run
```

<details>

<summary>
<b><u>Clique aqui para ver o diagrama do banco de dados</u></b>
</summary>

![ScreenShot](/Diagrama.png)

 </details>

#### Se tudo ocorreu como esperado agora poderemos iniciar a nossa API, para isso usaremos o comando:

```bash
npm run dev
```

---

## Endpoints

### **Usuário**

#### **Registrar Usuário**

- **Endpoint:** `POST /usuario/registrar`
- **Descrição:** Cria um novo usuário.
- **Controller:** `AuthController.register`
- **Requisição:**
  ```json
  {
    "nome": "felipe donatto",
    "email": "fe.donatto@outlook.com",
    "senha": "felipedonatto"
  }
  ```
- **Resposta:** `201 Created`
  ```json
  {
    "nome": "felipe donatto",
    "email": "fe.donatto@outlook.com",
    "criadoEm": "2024-11-18T20:53:55.840+00:00",
    "atualizadoEm": "2024-11-18T20:53:55.840+00:00",
    "id": 1
  }
  ```

#### **Login do Usuário**

- **Endpoint:** `POST /usuario/login`
- **Descrição:** Autentica um usuário e retorna um token de acesso.
- **Controller:** `AuthController.login`
- **Requisição:**
  ```json
  {
    "email": "fe.donatto@outlook.com",
    "senha": "felipedonatto" // A senha será criptografada usando bcrypt no backend
  }
  ```
- **Resposta:** `200 OK`
  ```json
  {
    "token": {
      "type": "bearer",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZmUuZG9uYXR0b0BvdXRsb29rLmNvbSIsImlhdCI6MTczMjA0MTY2NiwiZXhwIjoxNzMyMDQ1MjY2fQ.ujML7ithOP4GHcRK85t4d2dPXygzViUqgfAWTjMFyL0",
      "expiresIn": "1h"
    },
    "id": 1,
    "nome": "felipe donatto",
    "email": "fe.donatto@outlook.com",
    "criadoEm": "2024-11-18T20:53:55.000+00:00",
    "atualizadoEm": "2024-11-18T20:53:55.000+00:00"
  }
  ```

---

### **Clientes**

#### **Registrar Cliente**

- **Endpoint:** `POST /clientes/registrar`
- **Descrição:** Cria um novo cliente.
- **Controller:** `ClientesController.createClient`
- **Middleware:** `middleware.auth()`
- **Requisição:**

  ```json
  {
    "nome": "felipe donatto",
    "cpf": "10020030040",
    "numero": "55997173796",
    "rua": "Rua andorinha",
    "numeroRua": "200",
    "bairro": "Sulina",
    "cidade": "Santa Rosa",
    "estado": "RS",
    "cep": "98900200"
  }
  ```

- **Resposta:** `200 OK`
  ```json
  {
    "nome": "felipe donatto",
    "cpf": "10020030040",
    "usuarioId": 1,
    "criadoEm": "2024-11-19T18:54:17.178+00:00",
    "atualizadoEm": "2024-11-19T18:54:17.178+00:00",
    "id": 4,
    "endereco": {
      "rua": "Rua andorinha",
      "numero": "200",
      "bairro": "Sulina",
      "cidade": "Santa Rosa",
      "estado": "RS",
      "cep": "98900200",
      "clienteId": 4,
      "id": 4
    },
    "telefones": {
      "numero": "55997173796",
      "clienteId": 4,
      "id": 4
    }
  }
  ```

#### **Editar Cliente**

- **Endpoint:** `PUT /clientes/editar`
- **Descrição:** Atualiza informações de um cliente existente.
- **Controller:** `ClientesController.editClient`
- **Middleware:** `middleware.auth()`
- **Requisição:**
  ```json
  {
    "id": "3",
    "nome": "Donatto Felipe",
    "cpf": "12312312333",
    "numero": "11997173796",
    "rua": "Rua pó",
    "numeroRua": "222",
    "bairro": "Timbauva",
    "cidade": "Santa Rosa",
    "estado": "RS",
    "cep": "98900200"
  }
  ```
- **Resposta:** `200 OK`
  ```json
  {
    "id": 3,
    "usuarioId": 1,
    "nome": "Donatto Felipe",
    "cpf": "12312312333",
    "criadoEm": "2024-11-18T13:01:41.000+00:00",
    "atualizadoEm": "2024-11-18T17:07:25.000+00:00",
    "endereco": {
      "id": 2,
      "clienteId": 3,
      "rua": "Rua pó",
      "numero": "222",
      "bairro": "Timbauva",
      "cidade": "Santa Rosa",
      "estado": "RS",
      "cep": "98900200"
    },
    "telefones": {
      "id": 2,
      "clienteId": 3,
      "numero": "11997173796"
    }
  }
  ```

#### **Listar Todos os Clientes**

- **Endpoint:** `GET /clientes/listar`
- **Descrição:** Retorna uma lista de todos os clientes.
- **Controller:** `ClientesController.listAllClients`
- **Middleware:** `middleware.auth()`
- **Resposta:** `200 OK`
  ```json
  [
    {
      "id": 1,
      "usuarioId": 1,
      "nome": "felipe donatto",
      "cpf": "03707830033",
      "criadoEm": "2024-11-18T20:54:15.000+00:00",
      "atualizadoEm": "2024-11-18T20:54:15.000+00:00",
      "endereco": {
        "rua": "Rua Andorinhas",
        "numero": "200",
        "bairro": "Timbauva",
        "cidade": "Santa Rosa",
        "estado": "RS",
        "cep": "12312322",
        "clienteId": 1
      },
      "telefones": {
        "numero": "55997173796",
        "clienteId": 1
      }
    },
    {
      "id": 4,
      "usuarioId": 1,
      "nome": "felipe donatto",
      "cpf": "03707810033",
      "criadoEm": "2024-11-19T18:54:17.000+00:00",
      "atualizadoEm": "2024-11-19T18:54:17.000+00:00",
      "endereco": {
        "rua": "Rua Andorinhas",
        "numero": "200",
        "bairro": "Timbauva",
        "cidade": "Santa Rosa",
        "estado": "RS",
        "cep": "12312322",
        "clienteId": 4
      },
      "telefones": {
        "numero": "55997173796",
        "clienteId": 4
      }
    }
  ]
  ```

#### **Buscar Cliente por ID**

- **Endpoint:** `GET /clientes/buscar/:id`
- **Descrição:** Retorna informações de um cliente específico.
- **Controller:** `ClientesController.getClient`
- **Parâmetros na URL:**
  - `id`: ID do cliente (obrigatório).
- **Middleware:** `middleware.auth()`
- **Resposta:** `200 OK`
  ```json
  {
    "id": 1,
    "usuarioId": 1,
    "nome": "felipe donatto",
    "cpf": "03707830033",
    "criadoEm": "2024-11-18T20:54:15.000+00:00",
    "atualizadoEm": "2024-11-18T20:54:15.000+00:00",
    "vendas": [
      {
        "id": 2,
        "clienteId": 1,
        "produtoId": 4,
        "quantidade": 5,
        "precoUnitario": "2323.50",
        "precoTotal": "127.50",
        "criadoEm": "2024-11-19T13:27:00.000+00:00",
        "atualizadoEm": "2024-11-19T13:27:00.000+00:00",
        "produto": {
          "id": 4,
          "nome": "c",
          "preco": "5.00"
        }
      }
    ]
  }
  ```

#### **Buscar Cliente por ID e Data**

- **Endpoint:** `GET /clientes/buscar/:id/:ano/:mes?`
- **Descrição:** Retorna informações de um cliente com base no ID e data especificados.
- **Controller:** `ClientesController.getClientWithDate`
- **Parâmetros na URL:**
  - `id`: ID do cliente (obrigatório).
  - `ano`: Ano (obrigatório).
  - `mes`: Mês (opcional).
- **Middleware:** `middleware.auth()`

#### **Deletar Cliente**

- **Endpoint:** `DELETE /clientes/deletar`
- **Descrição:** Remove um cliente do sistema.
- **Controller:** `ClientesController.deleteClient`
- **Middleware:** `middleware.auth()`
- **Requisição:**
  ```json
  {
    "id": "3"
  }
  ```
- **Resposta:** `202 Accepted`
  ```json
  {
    "message": "Cliente e suas vendas deletado com sucesso"
  }
  ```

---

### **Produtos**

#### **Registrar Produto**

- **Endpoint:** `POST /produtos/registrar`
- **Descrição:** Adiciona um novo produto.
- **Controller:** `ProdutosController.createProduct`
- **Middleware:** `middleware.auth()`
- **Requisição:**
  ```json
  {
    "nome": "produto 5",
    "descricao": "um produto comum",
    "preco": 25
  }
  ```
- **Resposta:** `201 CREATED`
  ```json
  {
    "nome": "produto 5",
    "descricao": "um produto comum",
    "preco": 25,
    "criadoEm": "2024-11-18T22:49:00.023+00:00",
    "atualizadoEm": "2024-11-18T22:49:00.023+00:00",
    "id": 5
  }
  ```

#### **Editar Produto**

- **Endpoint:** `PUT /produtos/editar`
- **Descrição:** Atualiza os dados de um produto.
- **Controller:** `ProdutosController.editProduct`
- **Middleware:** `middleware.auth()`
- **Requisição:**
  ```json
  {
    "id": 3,
    "nome": "produto 3",
    "descricao": "um produto extremamente raro",
    "preco": 25
  }
  ```
- **Resposta:** `200 OK`
  ```json
  {
    "id": 3,
    "nome": "produto 3",
    "descricao": "um produto extremamente raro",
    "preco": 25,
    "ativo": 1,
    "criadoEm": "2024-11-18T22:48:52.000+00:00",
    "atualizadoEm": "2024-11-19T13:07:08.127+00:00"
  }
  ```

#### **Listar Todos os Produtos**

- **Endpoint:** `GET /produtos/listar`
- **Descrição:** Retorna uma lista de todos os produtos.
- **Controller:** `ProdutosController.listAllProducts`
- **Middleware:** `middleware.auth()`
- **Resposta:** `200 OK`
  ```json
  [
    {
      "id": 5,
      "nome": "a",
      "preco": "25.00",
      "descricao": "um produto comum",
      "ativo": 1
    },
    {
      "id": 2,
      "nome": "b",
      "preco": "11.25",
      "descricao": "um produto comum",
      "ativo": 1
    },
    {
      "id": 4,
      "nome": "c",
      "preco": "5.00",
      "descricao": "um produto comum",
      "ativo": 1
    },
    {
      "id": 1,
      "nome": "produto 1",
      "preco": "11.50",
      "descricao": "um produto comum",
      "ativo": 1
    },
    {
      "id": 3,
      "nome": "produto 3",
      "preco": "25.00",
      "descricao": "um produto extremamente raro",
      "ativo": 1
    }
  ]
  ```

#### **Buscar Produto por ID**

- **Endpoint:** `GET /produtos/buscar/:id`
- **Descrição:** Retorna informações de um produto específico.
- **Controller:** `ProdutosController.showProduct`
- **Parâmetros na URL:**
  - `id`: ID do produto (obrigatório).
- **Middleware:** `middleware.auth()`
- **Resposta:** `200 OK`
  ```json
  {
    "id": 3,
    "nome": "produto 3",
    "descricao": "um produto comum",
    "preco": "10.00",
    "ativo": 1,
    "criadoEm": "2024-11-18T22:48:52.000+00:00",
    "atualizadoEm": "2024-11-18T22:48:52.000+00:00"
  }
  ```

#### **Deletar Produto**

- **Endpoint:** `DELETE /produtos/deletar`
- **Descrição:** Remove um produto do sistema.
- **Controller:** `ProdutosController.deleteProduct`
- **Middleware:** `middleware.auth()`
- **Requisição:**
  ```json
  {
    "id": "3"
  }
  ```
- **Resposta:** `201 Accepted`
  ```json
  {
    "message": "Produto deletado com sucesso"
  }
  ```

#### **Desativar Produto**

- **Endpoint:** `PUT /produtos/desativar`
- **Descrição:** Marca um produto como desativado.
- **Controller:** `ProdutosController.softDeleteProduct`
- **Middleware:** `middleware.auth()`
- **Requisição:**
  ```json
  {
    "id": "3"
  }
  ```
- **Resposta:** `201 Accepted`

### Caso o produto esteja desativado:

```json
{
  "message": "Produto ativado com sucesso"
}
```

### Caso o produto esteja ativado:

```json
{
  "message": "Produto desativado com sucesso"
}
```

---

### **Vendas**

#### **Registrar Venda**

- **Endpoint:** `POST /vendas/registrar`
- **Descrição:** Registra uma nova venda.
- **Controller:** `VendasController.registerSale`
- **Middleware:** `middleware.auth()`
- **Requisição:**
  ```json
  {
    "clienteId": 3,
    "produtoId": 1,
    "quantidade": 10,
    "precoUnitario": 10,
    "precoTotal": 100
  }
  ```
- **Resposta:** `201 OK`
  ```json
  {
    "clienteId": 3,
    "produtoId": 1,
    "quantidade": 10,
    "precoUnitario": 10,
    "precoTotal": 10,
    "criadoEm": "2024-11-19T13:34:36.554+00:00",
    "atualizadoEm": "2024-11-19T13:34:36.554+00:00",
    "id": 4
  }
  ```

#### **Buscar Venda por ID**

- **Endpoint:** `GET /vendas/buscar/:id`
- **Descrição:** Retorna informações de uma venda específica.
- **Controller:** `VendasController.showSale`
- **Parâmetros na URL:**
  - `id`: ID da venda (obrigatório).
- **Middleware:** `middleware.auth()`
- **Resposta:** `200 OK`
  ```json
  {
    "id": 1,
    "clienteId": 2,
    "produtoId": 4,
    "quantidade": 5,
    "precoUnitario": "25.50",
    "precoTotal": "127.50",
    "criadoEm": "2024-11-19T13:26:29.000+00:00",
    "atualizadoEm": "2024-11-19T13:26:29.000+00:00",
    "produto": {
      "id": 4,
      "nome": "c",
      "descricao": "um produto comum",
      "preco": "5.00",
      "ativo": 1,
      "criadoEm": "2024-11-18T22:48:55.000+00:00",
      "atualizadoEm": "2024-11-18T22:48:55.000+00:00"
    }
  }
  ```

---

## Observações

- **Autenticação:** As rotas protegidas exigem um token válido, obtido no endpoint de login.
- **Formato de Erros:**
  - Exemplo de erro: `401 Unauthorized`
    ```json
    {
      "error": "Invalid credentials."
    }
    ```
