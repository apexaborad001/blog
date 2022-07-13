const ToDo = require("../model/todolist.model");
const responseGenerator = require("../utils/responseGenrate");
const ToDoCategory = require("../model/toDoCategory.model");
const jwt = require("jsonwebtoken");

const createToDoList = async (req, res) => {
  try {
    const idExist = await ToDoCategory.find({
      categoryName: req.body.category,
    });
    console.log(idExist);
    if (idExist[0].categoryName == req.body.category) {
      if (req.user.permissions.toDoList[0] == 1) {
        const createToDo = new ToDo({
          taskTitle: req.body.taskTitle,
          taskDescription: req.body.taskDescription,
          category: idExist[0]._id,
          createdByuser: req.user,
          startDate: req.body.startDate,
          dueDate: req.body.dueDate,
        });

        const result = await createToDo.save();
        // await ToDo.findOne({ _id: req.user._id }).populate("category");

        res
          .status(req.constants.HTTP_SUCCESSS)
          .send(
            responseGenerator(
              req.constants.HTTP_SUCCESSS,
              false,
              req.message.CREATE_TO_DO_LIST.SUCCESS,
              result
            )
          );
      } else {
        res
          .status(req.constants.HTTP_FORBIDDEN)
          .send(
            responseGenerator(
              req.constants.HTTP_FORBIDDEN,
              true,
              req.message.CREATE_TO_DO_LIST.NOT_PERMITED,
              null
            )
          );
      }
    } else {
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            true,
            req.message.CREATE_TO_DO_LIST.NOT_EXIST_CATEGORY,
            null
          )
        );
    }
  } catch (e) {
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.CREATE_TO_DO_LIST.ERROR,
          e.message
        )
      );
  }
};

const updateToDoList = async (req, res) => {
  try {
    if (req.user.permissions.toDoList[2] == 1) {
      const updateToDo = await ToDo.findOneAndUpdate(
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
            req.message.UPDATE_TO_DO_LIST.SUCCESS,
            updateToDo
          )
        );
    } else {
      res
        .status(req.constants.HTTP_FORBIDDEN)
        .send(
          responseGenerator(
            req.constants.HTTP_FORBIDDEN,
            true,
            req.message.UPDATE_TO_DO_LIST.NOT_PERMITED,
            null
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
          req.message.UPDATE_TO_DO_LIST.ERROR,
          error.message
        )
      );
  }
};

const viewToDoList = async (req, res) => {
  try {
    if (req.user.permissions.toDoList[1] == 1) {
      const viewToDo = await ToDo.findOne({ _id: req.params.id })
      // .populate({path:'category',select:'categoryName -_id'})
      // .populate({path:'createdByuser',select:'userName -_id'})
      .populate('category createdByuser','categoryName userName -_id')
        // .populate({
        //   path: 'category',
        //   model: 'to_do_categories',
        //   select: { 'categoryName':1},
        //   populate: {
        //     path: 'userid',
        //     model: 'User'
        //   }

        // })
        // .project({

        //   categoryName: 1,
        //   username: 1,
        // })
        // .populate({ path: "category createdByuser", select: "categoryName" })
        // .select({ "category._id": 0 });
      // const idExist=await ToDoCategory.find({_id:viewToDo.Data.category})
      // viewToDo.populate('idExist')

      console.log(viewToDo);

      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            false,
            req.message.VIEW_TO_DO_LIST.SUCCESS,
            viewToDo
          )
        );
    } else {
      res
        .status(req.constants.HTTP_FORBIDDEN)
        .send(
          responseGenerator(
            req.constants.HTTP_FORBIDDEN,
            true,
            req.message.VIEW_TO_DO_LIST.NOT_PERMITED,
            null
          )
        );
    }
  } catch (error) {
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.VIEW_TO_DO_LIST.ERROR,
          error.message
        )
      );
  }
};

const deleteToDoList = async (req, res) => {
  try {
    if (req.user.permissions.toDoList[3] == 1) {
      const deleteToDo = await ToDo.findOneAndDelete({ _id: req.params.id });
      res
        .status(constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            constants.HTTP_SUCCESSS,
            false,
            message.DELETE_TO_DO_LIST.SUCCESS,
            deleteToDo
          )
        );
    } else {
      res
        .status(constants.HTTP_FORBIDDEN)
        .send(
          responseGenerator(
            constants.HTTP_FORBIDDEN,
            true,
            message.DELETE_TO_DO_LIST.NOT_PERMITED,
            null
          )
        );
    }
  } catch (error) {
    res
      .status(constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          constants.HTTP_BAD_REQUEST,
          true,
          message.DELETE_TO_DO_LIST.ERROR,
          error.message
        )
      );
  }
};

const viewToDoListGroup = async (req, res) => {
  try {
    const view = await ToDo.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
          },
          createdByuser: {
            $push: "$createdByuser",
          },
        },
      },
      {
        $lookup: {
          from: "user_details",
          localField: "createdByuser",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $lookup: {
          from: "to_do_categories",
          localField: "_id.category",
          foreignField: "_id",
          as: "result1",
        },
      },
    ]);

    console.log(view);
    let empty = [];
    var responseData;
    for (let i in view) {
      responseData = {
        category: view[i].result1[0].categoryName,
        userName: view[i].result[0].userName,
        count: view[i].createdByuser.length,
      };
      empty.push(responseData);
    }
    res
      .status(req.constants.HTTP_SUCCESSS)
      .send(
        responseGenerator(
          req.constants.HTTP_SUCCESSS,
          false,
          req.message.GROUP_TO_DO.SUCCESS,
          empty
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
          req.message.GROUP_TO_DO.ERROR,
          error.message
        )
      );
  }
};

module.exports = {
  createToDoList,
  updateToDoList,
  viewToDoList,
  deleteToDoList,
  viewToDoListGroup,
};
