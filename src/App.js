import "./App.css";
import Content from "./components/Content/Content";
import SideBar from "./components/SideBar/SideBar";
import Box from '@material-ui/core/Box';

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex"}}>
        <SideBar />
        <Content />
      </Box>
    </div>
  );
}

export default App;
