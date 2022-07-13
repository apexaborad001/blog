const Blog = require("../model/blog.model");
const responseGenerator = require("../utils/responseGenrate");
const BlogCategory = require("../model/toDoCategory.model");
let ObjectId = require("mongoose").Types.ObjectId;

const createBlog = async (req, res) => {
  try {
    if (req.user.permissions.blog[0] == 1) {
      const newBlog = new Blog({
        blogName: req.body.blogName,
        blogDescription: req.body.blogDescription,
        createdByuser: req.user,
        category: req.category,
        createdDate: Date.now(),
        updatedDate: "",
      });

      const blog = await newBlog.save();

      await Blog.findOne({ _id: req.user._id }).populate("createdByuser");
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            false,
            req.message.CREATE_BLOG.SUCCESS,
            blog
          )
        );
    } else {
      console.log("esle");
      res
        .status(req.constants.HTTP_FORBIDDEN)
        .send(
          responseGenerator(
            req.constants.HTTP_FORBIDDEN,
            true,
            req.message.CREATE_BLOG.NOT_PERMITED,
            null
          )
        );
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.CREATE_BLOG.ERROR,
          error.message
        )
      );
  }
};

const createBlogCategories = async (req, res) => {
  try {
    if (req.user.permissions.blog[0] == 1) {
      const newBlog = new BlogCategory({
        categoryName: req.body.categoryName,
      });

      const blog = await newBlog.save();

      await Blog.findOne({ _id: req.user._id }).populate("createdByuser");
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            false,
            req.message.CREATE_BLOG.SUCCESS,
            blog
          )
        );
    } else {
      console.log("esle");
      res
        .status(req.constants.HTTP_FORBIDDEN)
        .send(
          responseGenerator(
            req.constants.HTTP_FORBIDDEN,
            true,
            req.message.CREATE_BLOG.NOT_PERMITED,
            null
          )
        );
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(req.constants.HTTP_BAD_REQUEST)
      .send(
        responseGenerator(
          req.constants.HTTP_BAD_REQUEST,
          true,
          req.message.CREATE_BLOG.ERROR,
          error.message
        )
      );
  }
};
const updateBlogDetails = async (req, res) => {
  try {
    if (req.user.permissions.blog[2] == 1) {
      const updateBlog = await Blog.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: req.body,
          updatedDate: Date.now(),
        },
        { new: true }
      );
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            false,
            req.message.UPDATE_BLOG.SUCCESS,
            updateBlog
          )
        );
    } else {
      res
        .status(req.constants.HTTP_FORBIDDEN)
        .send(
          responseGenerator(
            req.constants.HTTP_FORBIDDEN,
            true,
            req.message.UPDATE_BLOG.NOT_PERMITED,
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
          req.message.UPDATE_BLOG.ERROR,
          error.message
        )
      );
  }
};

const deleteBlog = async (req, res) => {
  try {
    if (req.user.permissions.blog[3] == 1) {
      const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            false,
            req.message.DELETE_BLOG.SUCCESS,
            deleteBlog
          )
        );
    } else {
      res
        .status(req.constants.HTTP_FORBIDDEN)
        .send(
          responseGenerator(
            req.constants.HTTP_FORBIDDEN,
            true,
            req.message.DELETE_BLOG.NOT_PERMITED,
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
          req.message.DELETE_BLOG.ERROR,
          error.message
        )
      );
  }
};

const getBolg = async (req, res) => {
  try {
    if (req.user.permissions.blog[1] == 1) {
      const viewBlog = await Blog.findById(req.params.id);
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            false,
            req.message.VIEW_BLOG.SUCCESS,
            viewBlog
          )
        );
    } else {
      res
        .status(req.constants.HTTP_SUCCESSS)
        .send(
          responseGenerator(
            req.constants.HTTP_SUCCESSS,
            true,
            req.message.VIEW_BLOG.NOT_PERMITED,
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
          req.message.VIEW_BLOG.ERROR,
          error.message
        )
      );
  }
};

const blogCount = async (req, res) => {
  try {
    // const  count = await Blog.find(
    // {
    //   "createdByuser._id":new ObjectId(req.params.id)
    // }
    // )
    const count = await Blog.aggregate([
      {
        $match: {
          createdDate: {
            $gte: new Date(req.body.from_date),
            $lt: new Date(req.body.to_date),
          },
        },
      },
      {
        $group: {
          _id: "$createdByuser",
          count: {
            $count: {},
          },
        },
      },
    ]);
    var responseData;
    let empty=[]

    for (let i in count) {
       responseData = {
        userid: count[i]._id,
        blogCount: count[i].count,
      };
      empty.push(responseData)
    }

    

    res
      .status(req.constants.HTTP_SUCCESSS)
      .send(
        responseGenerator(
          req.constants.HTTP_SUCCESSS,
          false,
          req.message.BLOG_COUNT.SUCCESS,
          { TotalBlogCreatedByThisDate: empty }
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
          req.message.BLOG_COUNT.ERROR,
          error.message
        )
      );
  }
};

module.exports = {
  getBolg,
  deleteBlog,
  updateBlogDetails,
  createBlog,
  blogCount,
  createBlogCategories,
};
