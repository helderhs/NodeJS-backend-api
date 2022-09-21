import app from './app';

const porta = 3333;
const porta2 = process.env.APP_SECRET;
//console.log = porta2;
console.log(`Server started on port ${porta2}! 🏆`);

app.listen(porta);
