var readline = require('readline-sync');

module.exports = {
  prompt: function(question) {
    return readline.question(question);
  }
};