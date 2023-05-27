const ApiError = require("../error/apiError.js");
const userService = require("../services/userService.js");

class UserController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Некорректный email или password"));
      }

      const tokens = await userService.register(email, password);

      return res.json(tokens);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const tokens = await userService.login(email, password);

      return res.json(tokens);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const refresh = req.headers.authorization;
      const token = await userService.logout(refresh);
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const refresh = req.headers.authorization;

      if (!refresh) {
        return next(ApiError.unauthorized("Пользователь не авторизован"));
      }

      const tokens = await userService.refresh(refresh);

      return res.json(tokens);
    } catch (e) {
      next(e);
    }
  }

  async check(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
      }
      const tokenInfo = await userService.check(token);
      return res.json(tokenInfo);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
