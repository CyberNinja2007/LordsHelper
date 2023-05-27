const axios = require("axios");
const crypto = require("crypto");
const ApiError = require("../error/apiError.js");
const tokenService = require("./tokenService.js");
const { Bot, Resources } = require("../models/models.js");

class BotService {
  async create(userInfo) {
    try {
      const iggId = "uuid=" + crypto.randomUUID();
      const keepTime = 2595000;
      const secretKey = "f6239975b2faae941ec24695e4db5bba";
      const currentDate = Date.now();
      const gameId = 1051019902;

      let dataToHash = [];
      dataToHash.push(iggId);
      dataToHash.push(secretKey);
      dataToHash.push(currentDate);
      const md5Hash = crypto
        .createHash("md5")
        .update(dataToHash.join(""))
        .digest("hex");
      let botURL = [];
      botURL.push("https://cgi.igg.com/public/guest_user_login_igg");
      botURL.push("?m_guest=");
      botURL.push(iggId);
      botURL.push("&m_key=");
      botURL.push(currentDate);
      botURL.push("&m_data=");
      botURL.push(md5Hash);
      botURL.push("&m_device_type=");
      botURL.push("&keep_time=");
      botURL.push(keepTime);
      botURL.push("&m_game_id=");
      botURL.push(gameId);
      botURL.push("&version=2.6");

      const res = await axios.post(botURL.join(""));
      const botData = JSON.parse(res.data.substring(0, res.data.length - 32))
        .result[0];

      const bot = await Bot.create({
        id: botData.iggid,
        accessKey: botData.access_key,
        ssoToken: botData.sso_token.token,
        userId: userInfo.id,
      });

      await Resources.create({ botId: bot.dataValues.id });

      return { bot: bot.dataValues };
    } catch (e) {
      throw ApiError.badRequest(e.message);
    }
  }

  async getAll(group, level, limit, page) {
    page = page || 1;
    limit = limit || 12;
    let offset = page * limit - limit;
    let bots;
    if (!group && !level) {
      bots = await Bot.findAndCountAll({
        include: Resources,
        limit,
        offset,
      });
    }
    if (group && !level) {
      bots = await Bot.findAndCountAll({
        where: { group },
        include: Resources,
        limit,
        offset,
      });
    }
    if (!group && level) {
      bots = await Bot.findAndCountAll({
        where: { level },
        include: Resources,
        limit,
        offset,
      });
    }
    if (group && level) {
      bots = await Bot.findAndCountAll({
        where: { level, group },
        include: Resources,
        limit,
        offset,
      });
    }
    return { bots: bots.rows };
  }

  async getOne(id) {
    const bot = await Bot.findOne({
      where: { id: id },
      include: [{ resource: Resources, as: "resources" }],
    });
    return { bot };
  }

  async deleteOne(id) {
    const bot = await Bot.destroy({
      where: { id: Number(id) }
    });
    console.log(bot);
    return { bot };
  }

  async check(token) {
    try {
      if (!token) {
        throw ApiError.unauthorized("Пользователь не авторизован");
      }
      const decoded = tokenService.validateAccessToken(token);
      return decoded;
    } catch (e) {
      throw ApiError.unauthorized("Пользователь не авторизован");
    }
  }
}

module.exports = new BotService();
