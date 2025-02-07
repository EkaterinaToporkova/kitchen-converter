import "./App.css";
import { Header } from "./components/Header/Header";
import { Converter } from "./components/Converter/Converter";
import { History } from "./components/History/History";
import * as React from "react";
import classnames from "classnames";

const App: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="page">
          <div className={classnames("page__main-block", "main-block")}>
            <div className={classnames("main-block__container", "_container")}>
              <div className="main-block__body">
                <div className="main-block__converter">
                  <Converter />
                  <History />
                </div>
              </div>
            </div>
            <div className={classnames("main-block__image", "_ibg")}>
              <img src="src/assets/images/food.png" alt="food" />
            </div>
          </div>
        </main>
        <footer className="footer">Подвал</footer>
      </div>
    </>
  );
};
export default App;
