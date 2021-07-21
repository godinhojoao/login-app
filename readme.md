# Sobre o projeto:

- Um back-end feito em express, utilizando knex.js como query builder, jwt para autenticação e jest nos testes.
- Um front-end que consome a Api rest, feito em ReactJS, utilizando componentes funcionais com hooks.

# Qual propósito do projeto e o que foi usado para resolver cada problema ?

### back-end
- Aprender sobre testes integrados e unitários no nodejs, utilizando TDD e a lib jest.
- Aprender sobre autenticação com token jwt utilizando a lib jsonwebtoken.
- Utilizar JOI nas validações.
- Utilizar http-errors para tratar erros.
- Utilizar Knexjs como querybuilder.
- Utilizar postgreSQL para persistir os dados.

### front-end
- Aprender mais sobre ReactJS
- Utilizar Axios para consumir a api back-end
- Aprender Formik para criar formulários
- Aprender Yup para validações de formulários
# O que o projeto "tem" no servidor ?
- Rotas para gerenciar usuários ( CRUD );
- Rotas com autenticação;
- Cobertura de testes, tanto unitários quanto integrados;
- Persiste dados num banco postgreSQL;
- Knexjs para criar as queries no banco de dados;
- Bcrypt para encriptar senhas;

# O que o projeto usa no front-end ?
- ReactJS
- Axios
- Formik: lib para criar forms com reactjs
- Yup: lib para validações de forms com reactjs
# Primeiro rode o server e depois o client
 - Para rodar o server entre no readme.md da pasta /server e siga os passos
 - Para rodar o client entre no readme.md da pasta /client e siga os passos