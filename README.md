###1. Instale as dependências do projeto utilizando o comando:

```bash
npm install
```

###2. Variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto utilizando como exemplo o arquivo `.env.example`.

###3. Migrando o banco de dados

Para executar o DDL da tabela do banco de dados utilize o comando:

```bash
psql -h localhost -U postgres -d app -a -f create.sql
```

Insira a senha do banco de dados quando solicitado.

###4. Rodando a aplicação

Para executar a aplicação, utilize o comando:

```bash
npm run build && npm start
```

###5. Testando a aplicação

Para testar a aplicação, utilize o comando:

```bash
npm run test
```

OBS: Para os testes de integração, é necessário que o banco de dados e a aplicação estejam em execução.
