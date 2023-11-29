
const prisma = require('../src/Client/PrismaClient')
const bcrypt = require('bcrypt')


module.exports = class CreateUserController {
      
    

    static async createUser(req, res){
        const {name, email, password} = req.body


        if(!name || name === ""){
            res.status(404).json({message: "O nome é obrigátorio!",  success: false});
            return;
        }

        if(!email || email === ""){
            res.status(404).json({message: "O email é obrigátorio!",  success: false});
            return;
        }

        if(!password || password === ""){
            res.status(404).json({message: "A senha é obrigátoria!",  success: false});
            return;
        }

         // realizando a criptografia da senha

         const salt =  10;
         const passwrodCriptografada = await bcrypt.hash(password, salt)

        try{
            // verificar se o usuário já existe no sistema

            const verify = await prisma.user.findMany({
                where: {
                    email: email
                }
            })

            if(verify.length > 0){
                res.status(404).json({message: "Usuário já cadastrado no sistema!", success: false});
                return;
            }


             // Realiza a criação do usuário no banco de dados
            const create = await prisma.user.createMany({
                data: {
                    name: name,
                    email: email,
                    password: passwrodCriptografada
                }
            })
              
            // Faz a validação se o usuario foi criado com sucesso!
            if(create){
                res.status(200).json({message: 'Mais um usuário foi criado com sucesso!', success: true})
                return;
            }


        }catch(err){
            console.log(err);
        }
    }
}