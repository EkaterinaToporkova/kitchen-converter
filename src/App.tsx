import "./App.css";
import { Header } from "./components/Header/Header";
import { Converter } from "./components/Converter/Converter";
import { History } from "./components/History/History";
import * as React from "react";
import classnames from "classnames";

//dispatch({ type: "delete", id: history.id })

const DELETE_HISTORY_ITEM = "DELETE_HISTORY_ITEM";

interface HistoryItem {
  id: number;
  // Добавьте другие свойства, если они есть
  type?: string; // Например, если action имеет свойство type
}

interface Action {
  type: string;
  id?: number;
  // Добавьте другие свойства, если они есть
}

// Состояние для отображения в истории

const reducer = (state: HistoryItem[], action: Action) => {
  switch (action.type) {
    case "add": {
      console.log(action)
      return [{ ...action, id: Date.now() }, ...state];
    }
    case DELETE_HISTORY_ITEM: {
      return state.filter((history) => history.id !== action.id);
    }
    default:
      return [];
  }
};

const App: React.FC = () => {
  const [histories, dispatch] = React.useReducer(reducer, []);

  const boundDeleteHistoryItem = (id: number) => {
    const action = { type: DELETE_HISTORY_ITEM, id };
    dispatch(action);
  };

  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="page">
          <div className={classnames("page__main-block", "main-block")}>
            <div className={classnames("main-block__container", "_container")}>
              <div className="main-block__body">
                <div className="main-block__converter">
                  <Converter dispatch={dispatch} />
                  <History
                    histories={histories}
                    boundDeleteHistoryItem={boundDeleteHistoryItem}
                  />
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
