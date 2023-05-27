const jwt = require("jsonwebtoken");
const { Token } = require("../models/models.js");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: "14d",
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      return userData;
    } catch (e) {
      throw e;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
      return userData;
    } catch (e) {
      return e;
    }
  }

  async saveToken(userId, token) {
    const tokenData = await Token.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refresh = token;
      return tokenData.save();
    }
    const newToken = await Token.create({ userId, refresh: token });
    return newToken;
  }

  async removeToken(token) {
    const tokenData = await Token.destroy({ where: { refresh: token } });
    return tokenData;
  }

  async findToken(token) {
    const tokenData = await Token.findOne({ where: { refresh: token } });
    return tokenData;
  }
}

module.exports = new TokenService();
