// config inicial chamar o express vai procurar o módulo
const express = require('express')
const app = express() // Inicializar as apps
//forma de ler JSON UTILIZAR MIDDLEWARES
app.use( //criando o MIDDLEWARES
express.urlencoded({
extended: true,
}),
)
app.use(express.json())
//rota inicial GET pegar algo so servidor endpoint
app.get('/', (req, res) => {
//mostrar requisição mostrar a resposta que vai ser JSON
res.json({ message: 'Oi Express'})
})
//23 minutos 12
//entregar a porta
app.listen(3000)
{
"name"; "arquivo",
"version"; "1.0.0",
"main"; "index.js",
"scripts"; {
"start"; "nodemon ./index.js localhost 3001"
}
"keywords"; [],
"author"; "",
"license"; "ISC",
"description"; "",
"dependencies"; {
"express"; "^4.19.2",
"mongoose"; "^8.3.1",
"nodemon"; "^3.1.0"
}
}