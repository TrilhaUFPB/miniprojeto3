# Mini-Projeto 3

Encerraremos nossa etapa de aulas com um último projeto prático: uma rede social.

O objetivo dessa aplicação, é que vocês desenvolvam habilidades práticas no mundo fullstack. Dessa forma, utilizaremos todo o conteúdo aprendido nessa trilha prática de fullstack para modelar a rede social em um banco de dados e implementar um backend e um frontend.

## Requisitos

Não há um "gabarito" para esse projeto. Entretanto, há certas funcionalidades que são **obrigatórias**.

Logo, a sua implementação não precisa estar igual à minha ou à de terceiros. O que importa, e será avaliado é: a entrega de todas as funcionalidades abaixo e a qualidade com que elas foram implementadas.

| Funcionalidade | Ambiente | Obrigatório |
| --- | --- | --- |
| Modelagem do problema em um banco de dados estruturado | Banco de Dados | :white_check_mark: |
| Login de usuário | Todos | :white_check_mark: |
| Registro de usuário | Todos | :white_check_mark: |
| Autenticação e autorização de usuário | Todos | :white_check_mark: |
| CRUD de postagens | Todos | :white_check_mark: |
| Like ou dislike por usuário nas postagens | Todos | :white_check_mark: |
| Listagem de likes e dislikes por postagem | Todos | :white_check_mark: |
| Imagens ou videos nas postagens | Todos | :x: | 

## Exemplo

Este repositório é apenas um exemplo de implementação e, em caso de plágio, seu trabalho será descartado. Logo, utilize-o apenas para consulta e ideias.

### Para executar

#### Frontend

Necessário ter Node.js instalado:

```bash
cd front

npm install
npm run dev
```

#### Backend

Necessário ter Python instalado:

```bash
pip install sqlmodel fastapi[standard]

cd back/src
python -m fastapi dev
```

## Referências

- https://fastapi.tiangolo.com/tutorial/sql-databases/
- https://marketplace.visualstudio.com/items?itemName=humao.rest-client
