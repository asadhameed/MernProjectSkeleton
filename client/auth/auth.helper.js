const { json } = require("body-parser");
const auth = {
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },

  isAuthenticated() {
    if (typeof window !== "undefined") return false;
    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    return false;
  },

  clearJwt(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
    signout().then((data) => {
      document.cookie = "t";
    });
  },
};

export default auth;
