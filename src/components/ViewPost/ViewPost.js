import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Account from "@material-ui/icons/AccountCircle";

import APP_CONSTANTS from "../constants";
import AXIOS from "axios";

export default function ViewPost({ open, handleClose, postTitle, postId }) {
  const [comments, setComments] = useState([]);
  const BootstrapDialogTitle = (props) => {
    const { children, onClose } = props;

    return (
      <DialogTitle>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            style={{
              position: "absolute",
              right: "10px",
              top: "8px",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  useEffect(() => {
    AXIOS.get(`${APP_CONSTANTS.POSTS}/${postId}/comments`).then((res) => {
      setComments(res.data);
    });
  }, [postId]);

  const renderComments = () => {
    return comments.slice(0, 2).map((comment) => {
      return (
        <ListItem button key={comment.id}>
          <ListItemAvatar>
            <Avatar>
              <Account />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={comment.email.split('@')[0]} secondary={comment.body} />
        </ListItem>
      );
    });
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          View Post
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1562043236-559c3b65a6e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  component="div"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ width: "80%" }}>{postTitle}</div>
                  <div>{`${comments.length} comments`}</div>
                </Typography>
                <List>{renderComments()}</List>
              </CardContent>
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
