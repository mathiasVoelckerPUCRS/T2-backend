
var app = require('./app');

// definir porta na qual aplicação irá rodar
const port = 3000;
app.listen(port, () => {
    console.info(`server started on port ${port}`);
});