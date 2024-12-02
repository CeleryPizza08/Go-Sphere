const Post = require('../models/modelPost');
const User = require('../models/modelUser');

exports.getPost = async (req, res, next) => {
  try {
    const postID = req.params.postID;
    const dataFromDB = await Post.findOne({ postID: postID });
    if (dataFromDB) {
      res.status(202).json(dataFromDB);
    } else {
      res.status(404).json({ error: 'Document not found!' });
    }
  } catch (err) {
    throw err;
  }
};

exports.getAllPost = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const role = req.query.role;
  let query = {};
  try {
    if (role) {
      query = { role: role };
    }
    const dataFromDB = await Post.find(query)
      .populate('creator')
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const totalCount = await Post.countDocuments(query);

    res.json({
      dataFromDB: dataFromDB,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createPost = (req, res, next) => {
  const postID = req.body.postID;
  const dest = req.body.location;
  const date = req.body.date;
  const duration = req.body.duration;
  const guests = req.body.guest;
  const language = req.body.language;
  const price = req.body.price;
  const descriptions = req.body.descriptions;
  const role = req.body.role;
  let creator;
  const post = new Post({
    postID: postID,
    destination: dest,
    date: date,
    duration: duration,
    guests: guests,
    language: language,
    price: price,
    descriptions: descriptions,
    creator: req.userID,
    role: role,
  });
  post
    .save()
    .then((res) => {
      return User.findById(req.userID);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'Posted successfully',
        post: post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatePost = async (req, res, next) => {
  const postID = req.params.postID;
  const day = req.params.day;
  const formData = req.body;
  const filter = { postID: postID };
  const update = {
    [`plan.${day - 1}`]: JSON.stringify(formData),
  };
  const option = { upsert: true };
  try {
    const updateData = await Post.updateOne(filter, { $set: update }, option);
    console.log(formData);
    if (updateData) {
      res.status(202).json({ message: 'Update successfully' });
    } else {
      res.status(404).json({ error: 'Document not found!' });
    }
  } catch (err) {
    throw err;
  }
};
