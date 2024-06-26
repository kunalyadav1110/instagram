const express = require("express");
const router = express.Router();
const UserDetail = require("../models/UserDetail");

router.get("/", async (req, res) => {
  try {
    const userdetail = await UserDetail.find();
    res.status(200).json({
      data: userdetail,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userdetail = await UserDetail.findById(req.params.id);

    res.status(200).json({
      data: userdetail,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userdetail = new UserDetail(req.body);
    const newuserdetail = await userdetail.save();

    res.status(200).json({
      data: newuserdetail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});



router.put("/:id", async (req, res) => {
  try {
    const userdetail = await UserDetail.findById(req.params.id);

    if (!userdetail) {
      return res.status(400).json({ message: "UserDetail does not exist" });
    }
    userdetail.username = req.body.username || userdetail.username;
    userdetail.password = req.body.password || userdetail.password;
    userdetail.fullName = req.body.fullName || userdetail.fullName;
    userdetail.mobile = req.body.mobile || userdetail.mobile;
    userdetail.post = req.body.post || userdetail.post;
    userdetail.dp = req.body.dp || userdetail.dp;
    userdetail.follower = req.body.follower || userdetail.follower;
    userdetail.following = req.body.following || userdetail.following;
    userdetail.messages = req.body.messages || userdetail.messages;

    const updatedUserDetail = await userdetail.save();

    res.status(200).json({
      data: updatedUserDetail,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UserDetail.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "UserDetail is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
