const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on('message', async message => {
  //------------ linha da manutenção meu pau na tua mão ------------------
  if (message.channel.id !== '552934092514263050') return
  
  //ranni num pode usa kkkkkkk
  //if(message.author.id === '332918506930831362') return
  
  //comando do ranni
  if (message.content.toLowerCase().startsWith('!ranni')) {
    const messages = ['burro']
    
    message.channel.send(messages[Math.floor(Math.random()*messages.length)])
  }
  
  //emoji comunismo
  if (message.content.toLowerCase().startsWith('!comunismo')) {    
    message.channel.send('<a:comunismo:537643379673137152>')
    message.delete()
  }
  
  //comando falar
  if (message.content.toLowerCase().startsWith('!say')) {
    const allowed = ['418209589738209280', '536776502461595652']
    if (!allowed.some(id => message.member.roles.get(id))) return
    const args = message.content.split(' ')
    args.shift()
    message.channel.send(args.join(' '))
    message.delete()
  }

  // Se o usuário executar o comando !apagar
  const erasecommands = ['!tempmute', '!apagar', '!tempban']
  if (erasecommands.some(command => message.content.toLowerCase().startsWith(command))) {
    // !apagar (id)
    
    //if(message.member.roles.has(gayrole.id))
    
    // Se o usuário tiver permissão de gerenciar mensagens
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      const args = message.content.split(' ') //divide a mensagem em espaços
      let id = args[1]
      
      if (!id) return //verifica se tem algum id no comando, caso contrário não executa
      
      
      // Cria um "regex" que é usado pra verificar se o "id" é uma menção (no formato "<@!id>")
      const mentionRegex = /<@!?([0-9]+)>/g
      
      // Verifica se o id se aplica a regra e remove tudo que não é o id
      if (id.match(mentionRegex)) id = mentionRegex.exec(id)[1]
      
      //verifica se o usuario tem o mesmo cargo ou um cargo acima do 
      //usuario que precisa apagar as mensagems
      const role = message.member.highestRole
      const target = await message.guild.fetchMember(id)
      if (target) {
        const targetrole = target.highestRole
        if (targetrole.comparePositionTo(role) >= 0) return
      }
      
      var msgDel = 100; //quantidade de mensagens para serem apagadas
      let numberMessages = parseInt(msgDel);
      
      // Pega as ultimas 100 mensagens do chat
      const messages = await message.channel.fetchMessages({ limit: numberMessages })
      //Filtra as mensagens de acordo com o usuário
      const filtered = messages.filter(msg => msg.author.id === id) 
      
      // Deleta todas as mensagens filtradas
      const deleted = await message.channel.bulkDelete(filtered)
      
      //Apaga o comando que foi utilizado para apagar as mensagens
      message.delete()
      
      //verifica se tem algum conteudo depois do comando, caso contrario não mostra nenhum embed
      if (filtered.size === 0) return
      
      // mensagem de resposta a ser enviada ao servidor
      message.channel.send('', {
        "embed": {
          "author": {
            "name": message.author.username,
            "icon_url": message.author.displayAvatarURL
          },
          "thumbnail": {
            "url": "https://i.bee.fail/lSy.png" // foto do ariel barbeiro
          },
          "title": `${filtered.size} ${filtered.size === 1 ? 'mensagem apagada' : 'mensagens apagadas'}.`,
          "description": `Nada aconteceu aqui.\n*sssshhhhh*`,
          "color": 7019695
        }
      })
    }

  }

});