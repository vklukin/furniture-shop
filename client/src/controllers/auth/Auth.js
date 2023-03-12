import axios from "axios";

export default class Auth {
  Registration = async (obj) => {
    let echo;

    await axios
      .post("http://localhost:2000/auth/register", obj, {
        withCredentials: true,
      })
      .then((data) => {
        echo = data.data;
        console.log(echo);
      })
      .catch((e) => {
        echo = {
          error: e,
        };
      });

    return echo;
  };

  RefreshToken = async (token) => {
    let echo;

    await axios
      .post("http://localhost:2000/api/refreshToken", token)
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
        echo = e;
      });

    return echo;
  };
}
