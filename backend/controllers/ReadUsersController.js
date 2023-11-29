const prisma = require('../src/Client/PrismaClient');
const redis = require('redis');

const client = redis.createClient();
client.connect();

module.exports = class ReadUsersController {
  static async readUsers(req, res) {
    const userName = req.params.userName;

    try {
      if (!userName) {
        return res.status(400).json({ message: 'O parâmetro userName é obrigatório.', success: false });
      }

      const usersCad = await client.get(`readUsers:${userName}`);
      const dadosCache = JSON.parse(usersCad);

      if (dadosCache) {
        return res.status(200).json({ message: "Listagem de Usuários", success: true, qtd: dadosCache.length, dadosCache});
      } else {
        const read = await prisma.user.findMany({
          where: {
            name: {
              contains: userName
            }
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: false
          }
        });

        // Armazena no cache usando o nome do usuário na chave
        await client.set(`readUsers:${userName}`, JSON.stringify(read));

        res.status(200).json({ message: "Listagem de usuários", success: true, qtd: read.length, read });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
    }
  }
};
