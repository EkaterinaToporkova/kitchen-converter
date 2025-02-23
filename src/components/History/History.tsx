import styles from "./History.module.css";
import close from "../../assets/icon/close.svg";
import { BoundAddHistoryItemParams } from "../../App";
// import tape from "../../assets/icon/tape.svg"
// import { Converter } from "../Converter/Converter";

// Продукт (который переводят) handleAutocompleteChange
// Количество handleNumberChange
// Мера (из которой переводят) handleMeasureNumberChange
// Ответ outputAmount
// Мера или мерный предмет handleMeasureChange
// Добавление списка продуктов должно быть с помощью кнопки Рассчитать



interface HistoryProps {
  histories: any[];
  boundDeleteHistoryItem: (id: number) => void;
  boundResetHistory: () => void;
  boundAddHistoryItem: (params: BoundAddHistoryItemParams) => void;
}


const measureAbbreviations: Record<string, string> = {
  "Стакан 200 мл": "ст. 200 мл.",
  Миллилитр: "мл.",
  Грамм: "гр.",
  Килограмм: "кг.",
  Литр: "л.",
  "Столовая ложка": "ст. л.",
  Унция: "унц.",
  Фунт: "ф.",
  "Чайная ложка": "ч. л.",
};

const abbreviateMeasureFrom = (measure_input: string): string => {
  return measureAbbreviations[measure_input] || measure_input;
};

const abbreviateMeasureTo = (measure: string): string => {
  return measureAbbreviations[measure] || measure;
};

export const History: React.FC<HistoryProps> = ({
  histories,
  boundDeleteHistoryItem,
  boundResetHistory,
  boundAddHistoryItem
}) => {
  console.log(histories)
  return (
    <div className={styles.history}>
      <div className={styles.history__panel}>
        <h4 className={styles.history__title}>История</h4>
        <ul className={styles.history__list}>
          {histories.map((history) => {
            const abbreviatedMeasureInput = abbreviateMeasureFrom(
              history.measure_input
            );
            const abbreviatedMeasure = abbreviateMeasureTo(
              history.measure
            );
            return (
              <li className={styles.history__item}>
                <span className={styles.history__text}>
                  {" "}
                  {history.products} {history.number} {abbreviatedMeasureInput}{" "}
                  = {history.resultConversetion} {abbreviatedMeasure}
                </span>
                <img
                  className={styles.history__deleteBtn}
                  key={history.id}
                  onClick={() => boundDeleteHistoryItem(history.id)}
                  src={close}
                  alt="Удалить"
                />
              </li>
            );
          })}
        </ul>
        {histories.length > 0 &&
        <div onClick={()=> boundResetHistory()} className={styles.history__reset}>
          <img src={close} alt="Удалить" className={styles.history__resetIcn} />
          <input  type="reset" value="Очистить историю" id="reset-history" className={styles.history__resetBtn}/>
        </div>}
      </div>
    </div>
  );
};
