import styles from "./Converter.module.css";
import classnames from "classnames";
import React from "react";
import { FormConverter } from "./FormConverter/FormConverter";

interface ResultDisplayProps {
  outputAmount?: number | 0;
}

export const Converter: React.FC<ResultDisplayProps>  = () => {
  const [outputAmount, setOutputAmount] = React.useState<number | 0>(0);
  const handleConversion = (value: number | 0) => {
    setOutputAmount(value);
  };

  const handleReset = () => {
    setOutputAmount(0);  // Сброс результата
  };

  return (
    <div className={styles.calculator}>
      {/* <h3 className={styles.wrapper_title}>Расчет</h3> */}
      <div className={classnames(styles.form_calculator, "shadow_content")}>
        <FormConverter onConversion={handleConversion} onReset={handleReset} />
      </div>
      <div className={classnames(styles.result, "shadow_content")}>
        <p>{outputAmount}</p>
      </div>
    </div>
  );
};