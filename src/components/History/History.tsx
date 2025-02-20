import styles from "./History.module.css";
import close from "../../assets/icon/close.svg";
import RussianNouns from "russian-nouns-js";
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

const rne = new RussianNouns.Engine();
const Gender = RussianNouns.Gender;
const Case = RussianNouns.Case;

export const History: React.FC<HistoryProps> = ({
  histories,
  boundDeleteHistoryItem,
}) => {
  const declineWord = (word: string, gender: string, number: number) => {
    const lemma = RussianNouns.createLemma({ text: word, gender });

    // Если число 1, то именительный падеж
    if (number === 1) return word;

    // Если число 2, 3, 4 – родительный падеж единственного числа
    if (number >= 2 && number <= 4) return rne.decline(lemma, Case.GENITIVE)[0];

    // Если число 5 и больше – родительный падеж множественного числа
    return rne.pluralize(lemma)[0];
  };
  return (
    <div className={styles.history_content}>
      <div className={styles.history}>
        <h4>История</h4>
        <ul className={styles.history__items}>
          {histories.map((history) => {
            const measure = declineWord(
              history.measure_input,
              Gender.NEUTER,
              history.number
            );
            const product = declineWord(
              history.products,
              Gender.MASCULINE,
              history.number
            );

            return (
              <li
                key={history.id}
                className={styles.history__item}
                onClick={() => boundDeleteHistoryItem(history.id)}
              >
                {history.number} {measure} {product}
              </li>
            );
          })}
        </ul>
        <div className="reset__btn">
          <img src={close} alt="" />
          <input type="reset" value="Очистить историю" id="reset-history" />
        </div>
      </div>
    </div>
  );
};
