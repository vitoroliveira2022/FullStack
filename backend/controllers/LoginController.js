const bcrypt = require('bcrypt');
const prisma = require('../src/Client/PrismaClient');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = class LoginController {
    static async login(req, res) {

        
        const { email, password } = req.body;

        if(!email || email === ""){
            res.status(400).json({message: "O email é obrigatorio!"})
            return;
        }

        if(!password || password === ""){
            res.status(400).json({message: "A senha é obrigatória!"})
            return;
        }




        // Procurar usuário no banco de dados pelo e-mail
        try{

            const user = await prisma.user.findFirst({
               
                where: {
                    email: email,
                    
                },
            });


            const busca = await prisma.user.findMany({
               select: {
                id: true
               }
            });

            const secret = process.env.SECRET;

            const token = jwt.sign({
                id: busca.id,
            },

            secret,
            
            )

            

              // Verificar se o usuário existe e se a senha está correta
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: "Autenticado com sucesso!", tk: token, success: true});
        } else {
            res.status(401).json({ message: "Credenciais inválidas!", success: false});
            return;
        }

        }catch(err){
            console.log(err)
            res.status(500).json("Aconteceu um erro no servidor, tente novamente!")
            return
        }
     

      
    }
};
