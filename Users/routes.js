import * as dao from "./dao.js";

export default function UserRoutes(app) {
  app.get("/api/users", async (req, res) => {
    // res.send(db.users);
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }

    const wer = await dao.findAllUsers();
    res.json(wer);
  });
  app.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.send(user);
  });

  app.get("/api/users/?role=:role", async (req, res) => {
    console.log("Role type api");
    const roletype = req.params.role;
    console.log(roletype);
    const user = await dao.findUsersByRole(roletype);
    res.send(user);
  });

  app.post("/api/users/signup", async (req, res) => {
    console.log("[1] register");
    const { username, password } = req.body;
    console.log("[2] username, password", username, password);

    const existingUser = await dao.findUserByCredentials(username, password);
    console.log("[3] existingUser", existingUser);
    if (existingUser) {
      res.status(400).send("Username already exists");
      return;
    }
    try {
      const newUser = await dao.createUser({ username, password }); //{ username, password, _id: Date.now().toString() };
      console.log("[4] newUser", newUser);
      // db.users.push(newUser);
      req.session["currentUser"] = newUser;
      console.log("[5] req.session", req.session);
      res.send(newUser);
    } catch (e) {
      console.log("Error Creating User");
      res.status(400).send("Username already exists");
    }
  });
  app.post("/api/users/profile", async (req, res) => {
    console.log("[6] profile");
    console.log("[7] req.session", req.session);
    if (!req.session.currentUser) {
      console.log("[8] Not logged in");
      res.status(401).send("Not logged in");
      return;
    }
    console.log("[9] req.session.currentUser", req.session.currentUser);
    res.send(req.session.currentUser);
  });
  app.post("/api/users/logout", async (req, res) => {
    req.session.destroy();
    res.send("Logged out");
  });
  app.post("/api/users", async (req, res) => {
    const user = req.body;
    delete user._id;
    const newUser = await dao.createUser(user);
    res.json(newUser);
  });
  app.post("/api/users/signin", async (req, res) => {
    const { username, password } = req.body;
    const currUsr = await dao.findUserByCredentials(username, password);
    if (currUsr) {
      req.session.currentUser = currUsr;
      res.send(currUsr);
    } else {
      res.status(401).send("Invalid credentials");
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    delete user._id;
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      req.session["currentUser"] = user;
    }
    const status = await dao.updateUser(id, user);
    res.json(status);
  });
  app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUser(id);
    res.send(status);
  });
}