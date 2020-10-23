import Axios from "axios";

const signIn = async (user) => {
  Axios.post("/auth/signin", user)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const signOut = async () => {
  Axios.get("/auth/signout")
    .then((res) => res)
    .catch((err) => console.log(err));
};

export { signIn, signOut };
