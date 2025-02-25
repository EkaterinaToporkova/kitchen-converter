import styles from "./Converter.module.css";
import classnames from "classnames";
import React from "react";
import { FormConverter } from "./FormConverter/FormConverter";
import { Action } from "../../App";

interface ResultDisplayProps {
  outputAmount?: number | 0;
  dispatch: React.Dispatch<Action>;
}

export const Converter: React.FC<ResultDisplayProps> = ({ dispatch }) => {
  const [outputAmount, setOutputAmount] = React.useState<number | 0>(0);
  const handleConversion = (value: number | 0) => {
    setOutputAmount(value);
  };

  const handleReset = () => {
    setOutputAmount(0); // Сброс результата
  };

  return (
    <div className={styles.calculator}>
      <div className={classnames(styles.form_calculator, "shadow_content")}>
        <FormConverter onConversion={handleConversion} onReset={handleReset} dispatch={dispatch}/>
      </div>
      <div className={classnames(styles.result, "shadow_content")}>
        <p>{outputAmount}</p>
      </div>
    </div>
  );
};
