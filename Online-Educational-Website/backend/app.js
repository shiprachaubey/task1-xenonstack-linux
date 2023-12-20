const app = require('./index');
const { connectToDb } = require('./config/db');

connectToDb();


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})

