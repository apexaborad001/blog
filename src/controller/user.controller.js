const User = require("../model/user.model");
const responseGenerator = require("../utils/responseGenrate");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const createUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      permissions: req.body.permissions,
    });

    const result = await createUser.save();

    res
      .status(req.constants.HTTP_SUCCESSS)
      .send(
        responseGenerator(
          req.constants.HTTP_SUCCESSS,
          false,
          req.message.SIGNUP.SUCCESS,
          result
        )
      );
  } catch (e) {
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.SIGNUP.NOT_FOUND,
          e.message
        )
      );
  }
};

const signIn = async (req, res) => {
  try {
    console.log(req.body.email);
    const userDetails = await User.findOne({ email: req.body.email });
    if (userDetails) {
      const token = jwt.sign(
        {
          _id: userDetails._id,
        },
        "this"
      );
      res.status(req.constants.HTTP_SUCCESSS).send(
        responseGenerator(
          req.constants.HTTP_SUCCESSS,
          false,
          req.message.SIGNIN.SUCCESS,
          {
            userDetails,
            token,
          }
        )
      );
    } else {
      res
        .status(req.constants.HTTP_NOT_FOUND)
        .send(
          responseGenerator(
            req.constants.HTTP_NOT_FOUND,
            true,
            req.message.SIGNIN.NOT_FOUND
          )
        );
    }
  } catch (error) {
    console.log(error);
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.SIGNIN.ERROR,
          error.message
        )
      );
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(req.constants.HTTP_SUCCESSS)
      .send(
        responseGenerator(
          req.constants.HTTP_SUCCESSS,
          false,
          req.message.UPDATE_USER_DETAILS.SUCCESS,
          updateUser
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.UPDATE_USER_DETAILS.ERROR,
          error.message
        )
      );
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res
      .status(req.constants.HTTP_SUCCESSS)
      .send(
        responseGenerator(
          req.constants.HTTP_SUCCESSS,
          false,
          req.message.DELETE_USER.SUCCESS,
          deleteUser
        )
      );
  } catch (error) {
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.DELETE_USER.ERROR,
          error.message
        )
      );
  }
};

const searchName = async (req, res) => {
  try {
    if (req.body.name.length >= 3) {
      const search = await User.find({
        userName: { $regex: req.body.name },
      });
      console.log(search);
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            false,
            req.message.USER_SEARCH.SUCCESS,
            search
          )
        );
    } else {
      res.status(req.constants.HTTP_FORBIDDEN).send(responseGenerator(req.constants.HTTP_FORBIDDEN,true,req.message.USER_SEARCH.NOT_PERMITED,null))
    }
  } catch (error) {
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.USER_SEARCH.ERROR,
          error.message
        )
      );
  }
};

module.exports = {
  signIn,
  signUp,
  updateUserDetails,
  deleteUser,
  searchName,
};
