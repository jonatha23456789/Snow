const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: ["info"],
    author: " pharouk ", 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "Wait master🌨️🔹🔸🔹🔸";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: '࿇𝗞𝗘𝗟𝗩𝗜𝗡 𝗛𝗜𝗞𝗔𝗥𝗨࿇',
          gender: '𝗕𝗢𝗬',
          hobby: '𝗔 𝗙𝗥𝗘𝗘𝗦𝗧𝗬𝗘 𝗠𝗢𝗢𝗗 𝗖𝗥𝗘𝗔𝗧𝗢𝗥',
          relationship: '𝗡𝗢𝗡',
          facebookLink: 'https://www.facebook.com/profile.php?id=61554245590654',
          bio: '𝗟𝗢𝗩𝗘𝗟𝗬 𝗖𝗥𝗘𝗧𝗢𝗥'
        };

        const videoUrl = 
["",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",];
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          Owner informations📑:
⊰🔖_________
(◍•ᴗ•◍)𝗡𝗔𝗠𝗘 : ${ownerInfo.name}
⊰🔖__________
♀Genre♂: ${ownerInfo.gender}
⊰🔖__________
🏓Hobby⛹‍♂: ${ownerInfo.hobby}
⊰🔖__________
Relationship💞: ${ownerInfo.relationship}
⊰🔖__________
🔖 Facebook 🔗: ${ownerInfo.facebookLink}
⊰🔖__________
      ◈ Status ◈: ${ownerInfo.bio} 🇫🇷
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };
