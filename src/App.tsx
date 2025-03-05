import "./App.css";
import { Header } from "./components/Header/Header";
import { Converter } from "./components/Converter/Converter";
import { History } from "./components/History/History";
import * as React from "react";
import classnames from "classnames";

const ADD_HISTORY_ITEM = "ADD_HISTORY_ITEM" as const;
const DELETE_HISTORY_ITEM = "DELETE_HISTORY_ITEM" as const;
const RESET_HISTORY = "RESET_HISTORY" as const;

export interface HistoryItem {
  id: number;
  measure: string;
  measure_input: string;
  measure_input_value: string;
  measure_value: string;
  number: string;
  products_ru: string;
  products_value: string;
  radio_buttons: string;
  resultConversetion: number;
  type?: string;
}

interface AddHistoryItemAction {
  type: typeof ADD_HISTORY_ITEM;
  payload: BoundAddHistoryItemParams;
}

interface DeleteHistoryItemAction {
  type: typeof DELETE_HISTORY_ITEM;
  payload: { id: number };
}

interface ResetHistoryAction {
  type: typeof RESET_HISTORY;
}
export type Action =
  | AddHistoryItemAction
  | DeleteHistoryItemAction
  | ResetHistoryAction;

export interface BoundAddHistoryItemParams {
  id: number;
  measure: string;
  measure_input: string;
  measure_input_value: string;
  measure_value: string;
  number: string;
  products_ru: string;
  products_value: string;
  radio_buttons: string;
  resultConversetion: number;
}

// Состояние для отображения в истории

const reducer = (state: HistoryItem[], action: Action) => {
  switch (action.type) {
    case ADD_HISTORY_ITEM: {
      const newState = [{ ...action.payload, id: Date.now() }, ...state];
      return newState.slice(0, 10);
    }

    case RESET_HISTORY: {
      return [];
    }
    case DELETE_HISTORY_ITEM: {
      return state.filter((history) => history.id !== action.payload.id);
    }
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [histories, dispatch] = React.useReducer(
    reducer,
    JSON.parse(localStorage.getItem("historylist") || "[]") ||
      ([] as HistoryItem[])
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
    const action = {
      type: ADD_HISTORY_ITEM,
      payload: { ...params, id: Date.now() },
    };
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
                    boundResetHistory={boundResetHistory}
                    boundAddHistoryItem={boundAddHistoryItem}
                  />
                </div>
              </div>
            </div>
            <div className={classnames("main-block__image", "_ibg")}>
              <img src="./assets/images/food.png" alt="food" />
 
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className={classnames("footer__container", "_container")}>
            <div className="footer__title">Над проектом работали</div>
            <ul className="footer__list">
              <li className="footer__item">Разработчик: Екатерина Топоркова</li>
              <li className="footer__item">Дизайнер: Татьяна Гурина</li>
              <li className="footer__item">Ментор: Павел Фофанов</li>
            </ul>
          </div>
          <div className="footer__copy">
            ©2025 Made with Love By Katya Toporkova All right reserved
          </div>
        </footer>
      </div>
    </>
  );
};
export default App;
