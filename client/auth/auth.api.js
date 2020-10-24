import Axios from "axios";

const signIn = async (user) => {
  let data;
  await Axios.post("/auth/signin", user)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      if (err.response) data = err.response;
      else data = err;
    });

  return data;
};

const signOut = async () => {
  Axios.get("/auth/signout")
    .then((res) => res)
    .catch((err) => console.log(err));
};

export { signIn, signOut };
