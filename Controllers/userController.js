//user route hanlder
const fs  = require("fs")
const Users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
exports.GetUsers = (req, res) => {
    res.send(Users);
  };
exports.GetUserById = (req, res) => {
    const id = req.params.id;
    const user = Users.find((e) => e._id === id);
    console.log(id, user);
    res.send(user);
  };
exports.DeleteUser = (req, res) => {
    const id = req.params.id;
    const UserToDelete = Users.find((e) => {
      e._id === id;
    });
  
    res.json({ status: "deleted", data: UserToDelete });
  };
  
exports.UpateUser = (req, res) => {
    res.status(200).send("ok");
  };