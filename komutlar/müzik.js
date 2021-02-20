
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
let destek = "https://discord.gg/q8HfsYsMDu"
let sunucu = "https://discord.com/api/oauth2/authorize?client_id=743094743591813150&permissions=8&scope=bot"
let bicon = client.user.displayAvatarURL;
let member = message.mentions.members.first();
if(!member) member = message.member;
let name = member.nickname;
if(!name) name = member.user.username; 
  
  let sayfalar = [`
**Merhaba <@${message.author.id}>
Kesintisiz Müzik Dinlemek İçin Hazırmısın ?
Bir Problemin Mı Var  [Destek Sunucumuza](${destek}) Katılabilirsin.
Beni Sunucuna Alabilirsin  [Sunucuna Al](${sunucu})**

<a:rtx:783781887948226620> ・ \`xx\`**çal**   =  __Belirlediğiniz Şarkıyı Çalar.__

<a:rtx:783781887948226620> ・ \`xx\`**kapat**   =  __Çalan Şarkıyı Kapatır.__

<a:rtx:783781887948226620> ・ \`xx\`**duraklat**  =  __Çalan Şarkıyı Durdurur.__

<a:rtx:783781887948226620> ・ \`xx\`**devam**  =  __Duran Şarkıya Devam Eder..__

<a:rtx:783781887948226620> ・ \`xx\`**ses**  =  __Botun Sesini Ayarlar.__

<a:rtx:783781887948226620> ・ \`xx\`**sıra**  =  __Kuyruğa Eklenen Şarıkları Gösterir..__

<a:rtx:783781887948226620> ・ \`xx\`**çalan**  =  __Çalan Şarkıyı Gösterir.__

<a:rtx:783781887948226620> ・ \`xx\`**geç**  =  __Çalan Şarkıyı Geçer.__

<a:rtx:783781887948226620> ・ \`istatistik paneli için > xxistatistik\`




`]
  
  let sayfa = 1;

  const embed = new Discord.RichEmbed()
    .setColor(" 9ac0cd")
    .setAuthor(`${name}`, message.author.displayAvatarURL)
    .setThumbnail(client.user.avatarURL)
    .setImage('')
    .setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`)
    .setTimestamp()
    .setDescription(sayfalar[sayfa-1])

  message.channel.send(embed).then(msg => {
    msg.delete(120000)
    msg.react('')
    msg.react(``).then( r => { 
    msg.react('')

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '' && user.id === message.author.id;
      const delFilter = (reaction, user) => reaction.emoji.name === `` && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time:120000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time:120000 });
      const dels = msg.createReactionCollector(delFilter, { time:120000 });

      backwards.on('collect', async function(reaction) {
        await reaction.remove(message.author);
        if (sayfa === 1) return;
        sayfa--;
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed)
      })

      forwards.on('collect', async function(reaction) {
        await reaction.remove(message.author);
        if (sayfa === sayfalar.length) return;
        sayfa++;
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed)
      })
      
      dels.on('collect', r => {
          msg.delete(1000)
        })
    })

  })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help", "yardim"],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
};