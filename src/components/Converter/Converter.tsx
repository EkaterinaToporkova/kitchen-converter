import styles from "./Converter.module.css";
import classnames from "classnames";
import React from "react";
import { FormConverter } from "./FormConverter/FormConverter";

interface ResultDisplayProps {
  outputAmount: number | null;
}

export const Converter: React.FC<ResultDisplayProps>  = () => {
  const [outputAmount, setOutputAmount] = React.useState<number | null>(null);
  const handleConversion = (value: number | null) => {
    setOutputAmount(value);
  };

  return (
    <div className={styles.calculator}>
      <h3 className={styles.wrapper_title}>Расчет</h3>
      <div className={classnames(styles.form_calculator, "shadow_content")}>
        <FormConverter onConversion={handleConversion}/>
      </div>
      <div className={classnames(styles.result, "shadow_content")}>
        <p>{outputAmount}</p>
      </div>
    </div>
  );
};