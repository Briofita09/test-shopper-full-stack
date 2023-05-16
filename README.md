# test-shopper-full-stack

## 📋 Sobre o projeto

O projeto é uma plataforma para gerenciar preços de produtos do mercado. O usuário envia um CSV com o código e o novo preço do produto e esses são validados e alterados

## 🏁 Usando

Clone o projeto e entre na pasta front

``` bash
$ git clone https://github.com/Briofita09/test-shopper-full-stack.git
$ cd front
```
Instale as dependencias

```bash
$ npm i
```

Repita o processo para a pasta server
Crie um arquivo .env com base no `.env.example`
Ainda na pasta server rode os seguintes comandos para configurar o prisma e o banco de dados

```bash
npx prisma generate
npx prisma migrate dev
```

E por fim, rode o seguinte comando na pasta server e na pasta front para rodar a aplicação

```bash
npm run dev
```
## 🧠 Desenvolvedor

[Felipe Osório dos Santos](https://www.linkedin.com/in/felipe-osorio/)
