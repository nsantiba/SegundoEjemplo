const app = require('./app');
const port = app.get('port');

app.listen(port, () => {
   console.log("Iniciar pagnina web con http://localhost:%d",port);
})