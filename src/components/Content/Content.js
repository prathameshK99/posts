import React, { useEffect, useState } from "react";
import { AppBar, Box, Link, Toolbar, Typography } from "@material-ui/core";
import AXIOS from "axios";
import APP_CONSTANTS from "../constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ViewPost from "../ViewPost/ViewPost";

export default function Content() {
  const [posts, setPosts] = useState([]);
  const [clickedPost, setClickedPost] = useState(1);
  const [postTitle, setPostTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id, title) => {
    setClickedPost(id);
    setPostTitle(title);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRemove = (id) => {
    const tempPosts = posts.filter( (post) => { return post.id !== id})
    setPosts(tempPosts);
  }


  useEffect(() => {
    AXIOS.get(APP_CONSTANTS.POSTS).then((res) => {
      setPosts(res.data.slice(0, 6));
    });
  }, []);

  const renderPosts = () => {
    return posts.map((post, index) => {
      return (
        <ListItem key={post.id} button>
          <ListItemText primary={post.title} />
          <ListItemSecondaryAction>
            <Link
              component="button"
              variant="body2"
              color="secondary"
              underline="hover"
              onClick={() => {
                handleClickOpen(post.id, post.title);
              }}
            >
              View
            </Link>
            <Link
              component="button"
              color="secondary"
              variant="body2"
              underline="hover"
              style={{ marginLeft: "30px" }}
              onClick={() => {
                handleClickRemove(post.id)
              }}
            >
              remove
            </Link>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return (
    <div>
      <AppBar position="fixed" style={{ maxWidth: "82%" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <List style={{ marginLeft: "20rem", width: "60vw" }}>
          {renderPosts()}
        </List>
      </Box>
      <ViewPost
        open={open}
        handleClose={handleClose}
        postTitle={postTitle}
        postId={clickedPost}
      />
    </div>
  );
}
