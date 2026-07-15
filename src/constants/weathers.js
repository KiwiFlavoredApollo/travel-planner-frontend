export class Weathers {
  static #emojiMap = {
    "맑음": "☀️",
    "흐림": "☁️",
    "비": "🌧️",
    "눈": "❄️",
    "안개": "🌫️",
  };

  static getEmoji(weather) {
    return this.#emojiMap[weather] ?? "🌤️";
  }
}