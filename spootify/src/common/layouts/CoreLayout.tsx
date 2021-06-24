import { FC } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Player from "../components/Player";

const CoreLayout: FC = ({ children }) => (
  <div className="main">
    <SideBar />
    <div className="main__content">
      <Header />
      <div className="main__content__child">{children}</div>
    </div>
    <Player />
  </div>
);

export default CoreLayout;
