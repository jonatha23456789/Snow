const path = require("path");
const axios = require("axios");
const fs = require("fs");

module.exports = {
config: {
  name: "video",
  version: "1.0.1",
  credits: "Kaizenji",//fixed by kaizenji
  longDescription: { en: "Search video from YouTube"},
  category: "media",
  role: 0,
  },

onStart: async function ({ api, args, event }) {
  try {
    const searchQ = args.join(" ");
    if (!searchQ) {
      api.sendMessage("❌ | Error! use *video [search query]", event.threadID);
      return;
    }

    const kaiz = api.sendMessage(`⏱️ | Searching, for '${searchQ}' please wait...`, event.threadID);

    api.setMessageReaction("🕥", event.messageID, (err) => {}, true);

    const response = await axios.get(`https://kaizenji-rest-api.onrender.com/video?q=${encodeURIComponent(searchQ)}&apikey=kaiz`);

    const data = response.data.datas;
    const videoUrl = data.url;
    const title = data.title;
    const thumbnail = data.thumb;
    const channel = data.channel;
    const published = data.published;
    const views = data.views;

    const videoPath = path.join(__dirname, "cache", "video.mp4");

    const videoResponse = await axios.get(videoUrl, { responseType: "arraybuffer" });

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data));

    api.setMessageReaction("✅", event.messageID, (err) => {}, true);

    await api.sendMessage(
      {
        body: `Here's your video, enjoy!\n\nTitle: ${title}\nChannel: ${channel}\nPublished: ${published}\nViews: ${views}`,
        attachment: fs.createReadStream(videoPath),
      },
      event.threadID,
      event.messageID
    );
    fs.unlinkSync(videoPath);
    api.unsendMessage(ugh.messageID);
  } catch (error) {
    api.sendMessage(`error: ${error.message}`, event.threadID, event.messageID);
    console.log(error);
  }
}
};
