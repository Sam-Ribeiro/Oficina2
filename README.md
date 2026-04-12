## 📌 Controle de Oficinas

Sistema web desenvolvido para a disciplina de Oficina de Integração II, com o objetivo de gerenciar oficinas acadêmicas, incluindo professores/tutores, alunos, aulas e emissão de certificados.

---
## ⚙️ Requisitos Funcionais
| ID   | Descrição                                                                             |
| ---- | ------------------------------------------------------------------------------------- |
| RF01 | O sistema deve permitir cadastro de usuários (Administrador, Professor/Tutor e Aluno) |
| RF02 | O sistema deve permitir login com autenticação por usuário e senha                    |
| RF03 | O administrador deve gerenciar acessos de usuários                                    |
| RF04 | O professor/tutor deve criar e gerenciar oficinas                                     |
| RF05 | O professor/tutor deve definir temas das oficinas                                     |
| RF06 | O professor/tutor deve cadastrar aulas com data e hora                                |
| RF07 | O professor/tutor deve registrar presença dos alunos                                  |
| RF08 | O sistema deve permitir matrícula de alunos em oficinas                               |
| RF09 | O aluno deve visualizar oficinas e aulas matriculadas                                 |
| RF10 | O sistema deve gerar certificados ao final da oficina                                 |
| RF11 | O aluno deve poder baixar o certificado                                               |
|      |                                                                                       |

---
## 🧩Arquitetura em alto nível do sistema

O sistema segue o modelo de arquitetura cliente-servidor, composto pelos seguintes componentes principais:

- Frontend: Desenvolvido em React, responsável pela interface do usuário e pela interação com o sistema. Realiza requisições HTTP para o backend e exibe os dados ao usuário.
- Backend: Implementado em C# com ASP.NET Core (API REST), responsável pelas regras de negócio, validações, controle de acesso e exposição de endpoints.
- Autenticação: Utiliza autenticação baseada em JSON Web Token (JWT), garantindo que apenas usuários autenticados possam acessar determinados recursos do sistema.
- Banco de Dados: Utiliza SQL Server para armazenamento persistente dos dados, garantindo integridade e consistência das informações.
- Comunicação: A comunicação entre frontend e backend é realizada via protocolo HTTP, utilizando APIs REST e troca de dados no formato JSON.

### 🔄 Fluxo de Funcionamento
- O usuário acessa o sistema através do frontend.
- O frontend envia requisições HTTP para a API backend.
- O backend valida a requisição e, quando necessário, autentica o usuário utilizando JWT.
- O backend processa a lógica de negócio.
- O backend realiza operações no banco de dados (SQL Server).
- O backend retorna a resposta ao frontend em formato JSON.
- O frontend atualiza a interface com base nos dados recebidos.

### 🔐 Fluxo de Autenticação (JWT)
- O usuário realiza login informando suas credenciais.
- O backend valida os dados e gera um token JWT.
- O token é retornado ao frontend.
- O frontend armazena o token (ex: localStorage).
- A cada requisição protegida, o token é enviado no header HTTP.
- O backend valida o token antes de permitir o acesso aos recursos.

---- 
## Estratégia de automação de testes do sistema 

### 🧪 Testes de Backend (xUnit)

Os testes de backend serão implementados utilizando **xUnit**, com foco em:

- Testes unitários de regras de negócio
- Validação de serviços e controllers
- Testes de integração com banco de dados
- Validação de autenticação e permissões

**Objetivo:** garantir que a lógica do sistema funcione corretamente de forma isolada e integrada.


### 🌐 Testes de API (Robot Framework)

Os testes de API serão realizados com **Robot Framework**, validando:

- Endpoints (GET, POST, PUT, DELETE)
- Respostas da API
- Autenticação e autorização

**Objetivo:** garantir se o backend funciona em no todo.

### 🖥️ Testes End-to-End (E2E) (Robot Framework)


Os testes E2E serão implementados com **Robot Framework**, simulando o comportamento real do usuário:

- Fluxo de login
- Criação e gerenciamento de oficinas
- Matrícula de alunos
- Registro de presença
- Geração e download de certificados

**Objetivo:** validar os fluxos completos do sistema em ambiente real.

----
## 🛠️ Tecnologias Utilizadas

Frontend: React

Backend: C#

Banco de Dados: SQL Server

Testes unitários: xUnit

Testes Front E2E e API: Robot Framework

----

## Cronograma


----
