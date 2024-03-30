# Escopo do Projeto

## Objetivo:

Desenvolver uma API RESTful em Node.js para gerenciar cursos, estudantes, tarefas e atividades, incluindo funcionalidades específicas de agendamento de atividades, seguindo regras de negócio precisas.

## Tecnologias:

- **Backend**: Node.js com Express ou NestJS.
- **Banco de Dados**: PostgreSQL.
- **ORM/Query Builder**: Sequelize, TypeORM (para NestJS) ou outra biblioteca de preferência do candidato.
- **Migrations**: Ferramenta de migrations do ORM escolhido.

# Requisitos Funcionais

1. **CRUD de Cursos**:

   - Atributos: \`id\` (UUID), \`nome\` (string).
   - Rotas: Criar, listar, atualizar e deletar cursos.

2. **CRUD de Estudantes**:

   - Atributos: \`cpf\` (string, único), \`nome\` (string), \`curso\` (relacionado a Cursos), \`matrícula\` (string, único).
   - Rotas: Criar, listar, atualizar e deletar estudantes.

3. **CRUD de Tarefas**:

   - Atributos: \`id\` (UUID), \`nome\` (string).
   - Rotas: Criar, listar, atualizar e deletar tarefas.

4. **CRUD de Atividades**:

   - Atributos: \`id\` (UUID), \`tarefa\` (relacionado a Tarefas), \`estudante\` (relacionado a Estudantes), \`data\` (date), \`hora agendamento inicio\` (time), \`hora agendamento término\` (time), \`hora início\` (time, opcional), \`hora término\` (time, opcional).
   - Rotas: Criar, listar, atualizar e deletar atividades. Incluir rotas para iniciar e finalizar uma atividade (modificar \`hora início\` e \`hora término\`).

5. **Regras de Agendamento**:
   - A duração da atividade não pode ultrapassar 6 horas.
   - Data e hora de término não podem ser anteriores à data e hora de início.
   - Uma atividade só pode ser iniciada com uma tolerância de 15 minutos para mais ou para menos.
   - Uma atividade pode ser encerrada a qualquer momento após o início.

# Requisitos Não Funcionais

1. **Segurança**: Implementar medidas básicas de segurança, como validação de entradas para prevenir injeção SQL.
2. **Documentação**: Documentar as rotas da API com Postman ou similar.
3. **Código e Estrutura do Projeto**: Código limpo, bem organizado e seguindo as melhores práticas de desenvolvimento em Node.js.

# Entrega

- Código-fonte em um repositório Git (privado ou público, conforme preferência da organização).
- Instruções de configuração e execução do projeto, incluindo como rodar as migrations e os testes.

## Prazo de Entrega Inicial:

O prazo de entrega para o projeto é de 7 dias a partir da data de recebimento deste teste. Acreditamos que esse prazo é suficiente para concluir as tarefas propostas, considerando um planejamento e gestão de tempo eficazes.

## Solicitação de Extensão de Prazo:

Entendemos que imprevistos podem ocorrer e que cada desenvolvedor tem um ritmo de trabalho. Caso precise de mais tempo para concluir o projeto, é possível solicitar uma extensão do prazo. No entanto, pedimos que nos informe até o 6º dia do prazo inicial, incluindo um argumento sólido que justifique a necessidade de mais tempo.

# Documentação com Postman

https://documenter.getpostman.com/view/27334134/2sA35G2MHh

## Recursos

- Node.js
- Express
- PostgreSQL
- TypeORM
- Migrations

## Instalação

1. Faça o clone do repositório: `git clone https://github.com/ArthurCosta15/selecao-node-adasi.git`
2. Instale as dependências: `npm i`
3. Configure as variáveis de ambiente (veja a seção "Configuração" abaixo)
4. Inicie o servidor: `npm run dev`

## Configuração

Para que o sistema seja executado, minimamente tem que ser ajustado as seguintes variáveis de ambiente antes de iniciar o servidor:

- `DB_NAME`: Nome do banco de dados.
- `DB_USER`: Nome do usuário para se conectar com o banco de dados.
- `DB_PASS`: Senha para se conectar com o banco de dados.
- `DB_HOST`: Host onde o banco de dados está rodando.
- `DB_PORT`: Porta onde o banco de dados está rodando.
