import styles from "./Converter.module.css";
import classnames from "classnames";
import React from "react";
import { FormConverter } from "./FormConverter/FormConverter";
import ResultDisplay from "./ResultDisplay";

export const Converter: React.FC = () => {
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
      <ResultDisplay outputAmount={outputAmount} />
    </div>
  );
};