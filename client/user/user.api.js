import Axios from "axios";

const createUser = async (user) => {
  let data;
  await Axios.post("/api/users", user)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      if (err.response) {
        data = err.response;
      }
    });
  return data;
};

export { createUser };
