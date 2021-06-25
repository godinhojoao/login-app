# Como rodar o servidor:

1 - Rode os seguintes comandos dentro da pasta /server
- `nvm use`
- `npm install`

2 - Instale o postgreSQL na sua máquina

3 - Crie um arquivo `.env` dentro da pasta /server com as seguintes informações:

`
  SECRET_TOKEN=hash para gerar seu jwt token

  DATABASE= nome do database postgreSQL que vai utilizar
  DATABASE_USER= nome do user do postgreSQL
  PASSWORD= password do user do postgreSQL
  PORT= porta para rodar o database
`

*** É importante lembrar que você precisa ter um usuário no postgreSQL com esse nome e senha além de ter também um database com esse nome ***

# Para rodar os testes:

1 - Crie um arquivo `.env.test` contendo as seguintes informações:

`
  SECRET_TOKEN=hash para gerar seu jwt token DE TESTE

  DATABASE= nome do database postgreSQL que vai utilizar DE TESTE
  DATABASE_USER= nome do user do postgreSQL DE TESTE
  PASSWORD= password do user do postgreSQL DE TESTE
  PORT= porta para rodar o database DE TESTE
`

2 - Após isso utilize `npm run test` no seu terminal dentro da pasta /server

*** Para conferir os outros scripts do projeto entre no arquivo package.json ***