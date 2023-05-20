const Bot = require("../models/models.js");

class BotController {
  async create(req, res, next) {
    try {
      //TODO: реализовать создание бота посредством отправки HTTP запроса и получения его данных
      const bot = await Bot.create({});
      const resources = await Resources.create({});

      return res.json(bot);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { group, level, limit, page } = req.query;
    page = page || 1;
    limit = limit || 12;
    let offset = page * limit - limit;
    let bots;
    if (!group && !level) {
      bots = await Bot.findAndCountAll({ limit, offset });
    }
    if (group && !level) {
      bots = await Bot.findAndCountAll({
        where: { group },
        limit,
        offset,
      });
    }
    if (!group && level) {
      bots = await Bot.findAndCountAll({
        where: { level },
        limit,
        offset,
      });
    }
    if (group && level) {
      bots = await Bot.findAndCountAll({
        where: { level, group },
        limit,
        offset,
      });
    }
    return res.json(bots);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const bot = await Bot.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(bot);
  }
}

module.exports = new BotController();
