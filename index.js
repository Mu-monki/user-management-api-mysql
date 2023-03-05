const app = require('./app');
const port  = process.env.PORT || 5000;

console.log('Server is initializing...');
app.listen(port, () => {
    console.log(`Server started on port ${ port }`);
});