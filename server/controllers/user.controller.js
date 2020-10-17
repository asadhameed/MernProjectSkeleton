const userList = (req, res) => {
  res.send("i change the method");
};

const createUser = (req, res) => {
  res.send("Create A User");
};

export default { userList, createUser };
