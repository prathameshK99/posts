import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Equalizer, KeyboardArrowDown } from "@material-ui/icons";

export default function SideBar() {
  return (
    <div style={{ backgroundColor: "gray" }}>
      <Drawer variant="permanent" anchor="left">
        <Toolbar />
        <List>
          <ListItem
            button
            key={"content"}
            style={{
              background: "gray",
              color: "white",
              borderLeft: "4px solid red",
            }}
          >
            <ListItemIcon>
              <Equalizer style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Content"} />
            <ListItemIcon>
              <KeyboardArrowDown
                style={{ marginLeft: "80px", color: "white" }}
              />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
