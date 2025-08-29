import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('conectando a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión a MongoDB', err));


    const frutasSchema = new mongoose.Schema({
        "name": {type:String,required:true},
        "precio": {type:Number,required:true},
        "estado": {type:Boolean,required:true}
    });

    const Fruta = mongoose.model('Fruta', frutasSchema);
   app.get("/Frutas/", async (req, res) => {
        const Frutas = await Fruta.find();
        res.json(Frutas);
    });

    app.get("/Frutas/:id", async (req, res) => {
        const Frutas = await Fruta.findById(req.params.id);
        res.json(Frutas);
    });

    app.post("/Frutas/",async (req,res)=>{
        const nuevaFruta = new Fruta(req.body);
         await nuevaFruta.save();
        res.status(201).json(nuevaFruta);
    });
    
    app.put("/Frutas/:id",async (req,res)=>{
        const frutasModificada =await Fruta.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(frutasModificada);

    });

    app.delete("/Frutas/:id",async (req,res)=>{
        await Fruta.findByIdAndDelete(req.params.id);
        res.status(204).end();
    });

    app.listen(process.env.PORT, () => {
        console.log(`Servidor en ejecucion http://localhost:${process.env.PORT}`);
    });
