const mongoose=require('mongoose');


export function connectDb(){
mongoose.connect("mongodb://localhost:27017").then(()=>console.log('database connected')
).catch((err)=>console.error(err))

}


