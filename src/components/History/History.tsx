import styles from "./History.module.css";
import close from "../../assets/icon/close.svg";
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
}

const measureAbbreviations: Record<string, string> = {
  "стакан 200 мл": "ст. 200 мл.",
  миллилитр: "мл.",
  грамм: "гр.",
  килограмм: "кг.",
  литр: "л.",
  "столовая ложка": "ст. л.",
  унция: "унц.",
  фунт: "ф.",
  "чайная ложка": "ч. л.",
};

const abbreviateMeasureFrom = (measure_input: string): string => {
  return measureAbbreviations[measure_input.toLowerCase()] || measure_input;
};

const abbreviateMeasureTo = (measure: string): string => {
  return measureAbbreviations[measure.toLowerCase()] || measure;
};

export const History: React.FC<HistoryProps> = ({
  histories,
  boundDeleteHistoryItem,
}) => {
  console.log(histories);
  return (
    <div className={styles.history_content}>
      <div className={styles.history}>
        <h4>История</h4>
        <ul className={styles.history_items}>
          {histories.map((history) => {
            const abbreviatedMeasureInput = abbreviateMeasureFrom(
              history.measure_input.toLowerCase()
            );
            const abbreviatedMeasure = abbreviateMeasureTo(
              history.measure.toLowerCase()
            );
            return (
              <li className={styles.history_item}>
                <span className={styles.history_text}>
                  {" "}
                  {history.products} {history.number} {abbreviatedMeasureInput}{" "}
                  = 1,5 {abbreviatedMeasure}
                </span>
                <img
                  className={styles.history_img}
                  key={history.id}
                  onClick={() => boundDeleteHistoryItem(history.id)}
                  src={close}
                  alt="Удалить"
                />
              </li>
            );
          })}
        </ul>
        <div className={styles.reset_btn}>
          <img src={close} alt="Удалить" />
          <input type="reset" value="Очистить историю" id="reset-history" />
        </div>
      </div>
    </div>
  );
};
