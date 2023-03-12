module.exports = class Validate {
  name(text) {
    const validName = new RegExp(/^[а-яА-Я-]+\s[а-яА-Я-]+\s[а-яА-Я-]+$/);
    return validName.test(text);
  }

  passwords(firstPass, secondPass) {
    return firstPass === secondPass;
  }

  login(login) {
    // eslint-disable-next-line
    const validLogin = new RegExp(/^[a-zA-Z0-9\.\-\_]+$/);
    return validLogin.test(login);
  }
};
