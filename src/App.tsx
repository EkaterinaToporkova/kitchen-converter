import "./App.css";
import { Header } from "./components/Header/Header";
import { Converter } from "./components/Converter/Converter";
import { History } from "./components/History/History";
import * as React from "react";
import classnames from "classnames";

//dispatch({ type: "delete", id: history.id })

const DELETE_HISTORY_ITEM = "DELETE_HISTORY_ITEM";
const RESET_HISTORY = "RESET_HISTORY";
const ADD_HISTORY_ITEM = "ADD_HISTORY_ITEM";

interface HistoryItem {
  id: number;
  // Добавьте другие свойства, если они есть
  type?: string; // Например, если action имеет свойство type
}

interface Action {
  type: string;
  payload?: any;
  // Добавьте другие свойства, если они есть
}

export interface BoundAddHistoryItemParams {
  id: number;
  measure: string;
  measure_input: string;
  measure_input_value: string;
  measure_value: string;
  number: string;
  products: string;
  products_value: string;
  radio_buttons: string;
  resultConversetion: number;
}

// Состояние для отображения в истории

const reducer = (state: HistoryItem[], action: Action) => {
  switch (action.type) {
    case ADD_HISTORY_ITEM: {
      return [{ ...action.payload, id: Date.now() }, ...state];
    }

    case RESET_HISTORY: {
      return [];
    }
    case DELETE_HISTORY_ITEM: {
      return state.filter((history) => history.id !== action.payload.id);
    }
    default:
      return [];
  }
};

const App: React.FC = () => {
  const [histories, dispatch] = React.useReducer(
    reducer,
    [] as { id: number }[]
  );

  const boundDeleteHistoryItem = (id: number) => {
    const action = { type: DELETE_HISTORY_ITEM, payload: { id } };
    dispatch(action);
  };

  const boundResetHistory = () => {
    const action = { type: RESET_HISTORY };
    dispatch(action);
  };

  const boundAddHistoryItem = (params: BoundAddHistoryItemParams) => {
    const action = { type: ADD_HISTORY_ITEM, payload: { ...params, id: Date.now() } };
    dispatch(action)
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
                    boundResetHistory={boundResetHistory}
                    boundAddHistoryItem = {boundAddHistoryItem}
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
