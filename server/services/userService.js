const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const ApiError = require("../error/apiError.js");
const tokenService = require("./tokenService");

class UserService {
  async register(email, password, role) {
    if (!email || !password) {
      throw ApiError.badRequest("Некорректный email или password");
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest("Пользователь с таким email уже существует");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashPassword });
    const tokens = tokenService.generateTokens({ id: user.id, email: user.email, role: user.role });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.internal("Пользователь не найден");
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw ApiError.internal("Указан неверный пароль");
    }
    const tokens = tokenService.generateTokens({ id: user.id, email: user.email, role: user.role });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(token) {
    if (!token) {
      throw ApiError.unauthorized("Пользователь не авторизован");
    }

    try {
      const userData = tokenService.validateRefreshToken(token);
      //console.log("userData")
      //console.log(userData)
      const tokenFromDb = await tokenService.findToken(token);
      //console.log("tokenFromDb")
      //console.log(tokenFromDb)
      if (!userData || !tokenFromDb) {
        throw ApiError.unauthorized("Пользователь не авторизован");
      }

      const user = await User.findOne({ where: { id: userData.id } });
      const newTokens = tokenService.generateTokens({ id: user.id, email: user.email, role: user.role });
      await tokenService.saveToken(user.id, newTokens.refreshToken);
      return newTokens;
    } catch (e) {
      throw ApiError.unauthorized("Пользователь не авторизован");
    }
  }

  async check(token) {
    try {
      if (!token) {
        throw ApiError.unauthorized("Пользователь не авторизован");
      }
      const decoded = tokenService.validateAccessToken(token);
      return decoded;
    } catch (e) {
      console.log(e);
      throw ApiError.unauthorized("Пользователь не авторизован");
    }
  }
}

module.exports = new UserService();
