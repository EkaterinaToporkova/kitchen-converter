import "./App.css";
import { Header } from "./components/Header/Header";
import { Converter } from "./components/Converter/Converter";
import { History } from "./components/History/History";
import * as React from "react";

const App: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="_container">
          <Converter />
          <History />
        </div>
      </div>
    </>
  );
};

export default App;
