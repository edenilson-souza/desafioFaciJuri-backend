# Desafio Facilita Juridico

Este é o repositório do projeto "Desafio Facilita Juridico" versão 1.0.0.

Este projeto foi desenvolvido com base em boas práticas de engenharia de software, como Clean Code, Clean Architecture, Semantic commits, SOLID, DDD e TDD, visando oferecer uma solução robusta e de qualidade.

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

## Variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto utilizando como exemplo o arquivo `.env.example`.

## Migrando o banco de dados

Para executar o DDL da tabela do banco de dados utilize o comando:

```bash
psql -h localhost -U postgres -d app -a -f create.sql
```

Insira a senha do banco de dados quando solicitado.

## Rodando a aplicação

###Compilação

Para compilar o código TypeScript, utilize o seguinte comando:

```bash
npm run build
```

###Iniciar o servidor

Para iniciar o servidor em ambiente de produção, execute:

```bash
npm start
```

####Iniciar o servidor em modo de desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com suporte para reinicialização automática após alterações no código, execute:

```bash
npm run dev
```

##Testes

Para executar os testes, utilize um dos seguintes comandos:

```bash
npm test
```

ou

```bash
npm run test:watch
```

Para gerar relatórios de cobertura de testes, execute:

```bash
npm run test:coverage
```

OBS: Para os testes de integração, é necessário que o banco de dados e a aplicação estejam em execução.

##Dependências

```json
"@types/express": "^4.17.17",
"@types/jest": "^29.5.4",
"axios": "^1.5.0",
"dotenv": "^16.4.5",
"express": "^4.18.2",
"jest": "^29.6.4",
"nodemon": "^3.0.1",
"pg-promise": "^11.5.4",
"ts-jest": "^29.1.1",
"ts-node": "^10.9.1",
"typescript": "^5.2.2"
```

Isso deve funcionar corretamente. Se precisar de mais alguma coisa, estou por aqui.
