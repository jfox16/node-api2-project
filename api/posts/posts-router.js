// implement your posts router here=
const Post = require('./posts-model');
const express = require('express');
const router = express.Router();

// 1 [GET] /api/posts

//     If there's an error in retrieving the posts from the database:
//         respond with HTTP status code 500.
//         return the following JSON: { message: "The posts information could not be retrieved" }.

router.get('/', (req, res) => {
  Post.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: "The posts information could not be retrieved" });
    });
});

// 2 [GET] /api/posts/:id

//     If the post with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON: { message: "The post with the specified ID does not exist" }.

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      }
      else {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// 3 [POST] /api/posts

//     If the request body is missing the title or contents property:
//         respond with HTTP status code 400 (Bad Request).
//         return the following JSON: { message: "Please provide title and contents for the post" }.

//     If the information about the post is valid:
//         save the new post the the database.
//         return HTTP status code 201 (Created).
//         return the newly created post.

//     If there's an error while saving the post:
//         respond with HTTP status code 500 (Server Error).
//         return the following JSON: { message: "There was an error while saving the post to the database" }.

router.post('/', (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({ message: "Please provide title and contents for the post" });
  }
  Post.insert(post)
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch(() => {
      res.status(500).json({ message: "There was an error while saving the post to the database" });
    });
})

// 4 [PUT] /api/posts/:id

//     If the post with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON: { message: "The post with the specified ID does not exist" }.

//     If the request body is missing the title or contents property:
//         respond with HTTP status code 400 (Bad Request).
//         return the following JSON: { message: "Please provide title and contents for the post" }.

//     If there's an error when updating the post:
//         respond with HTTP status code 500.
//         return the following JSON: { message: "The post information could not be modified" }.

//     If the post is found and the new information is valid:
//         update the post document in the database using the new information sent in the request body.
//         return HTTP status code 200 (OK).
//         return the newly updated post.

router.put('/:id', (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({ message: "Please provide title and contents for the post" });
  }
  Post.update(req.params.id, post)
    .then(editedPost => {
      if (editedPost) {
        res.status(201).json(editedPost);
      }
      else {
        res.status(400).json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The post information could not be modified" });
    });
})

//         5 [DELETE] /api/posts/:id

//         If the post with the specified id is not found:
//             return HTTP status code 404 (Not Found).
//             return the following JSON: { message: "The post with the specified ID does not exist" }.
    
//         If there's an error in removing the post from the database:
//             respond with HTTP status code 500.
//             return the following JSON: { message: "The post could not be removed" }.

router.delete('/:id', (req, res) => {
  Post.remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      }
      else {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The post could not be removed" });
    })
});
    
//     6 [GET] /api/posts/:id/comments
    
//         If the post with the specified id is not found:
//             return HTTP status code 404 (Not Found).
//             return the following JSON: { message: "The post with the specified ID does not exist" }.
    
//         If there's an error in retrieving the comments from the database:
//             respond with HTTP status code 500.
//             return the following JSON: { message: "The comments information could not be retrieved" }.

router.get(':id/comments', (req, res) => {
  Post.findPostComments(req.params.id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      }
      else {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The comments information could not be retrieved" });
    });
});
    


module.exports = router;
