const botService = require("../services/botService.js");

class BotController {
  async getAll(req, res, next) {
    try {
      const { group, level, limit, page } = req.query;
      const access = req.headers.authorization;
      await botService.check(access);

      const bots = await botService.getAll(group, level, limit, page);

      return res.json(bots.bots);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const access = req.headers.authorization;
      await botService.check(access);

      const bot = await botService.getOne(id);

      return res.json(bot);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { id } = req.params;
      console.log("ID IS");
      console.log(id);
      console.log(req);
      const access = req.body.headers.authorization;
      const userInfo = await botService.check(access);
      const bot = await botService.create(userInfo);

      return res.json(bot);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      console.log("ID IS");
      console.log(id);
      const access = req.body.headers.authorization;
      await botService.check(access);

      const bot = await botService.deleteOne(id);

      return res.json(bot);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BotController();
