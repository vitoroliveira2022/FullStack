
const prisma = require('../src/Client/PrismaClient')



module.exports = class LogController {
      
   

    static async logSearch(req, res){

        const {busca, user_busca} = req.body;
      
             // registrar o log de pesquisa!
             const logs = await prisma.log.createMany({
                data: {
                    busca: busca,
                    user_busca: 'teste'
                }
            })

    }
}