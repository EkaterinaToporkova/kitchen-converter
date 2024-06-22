import styles from "./Converter.module.css";
import classnames from "classnames";
import React, { useState } from "react";
import { FormConverter } from "./FormConverter/FormConverter";

export const Converter: React.FC = () => {
  const [someState] = useState<number>(0);
  return (
    <div className={styles.calculator}>
      <h3 className={styles.wrapper_title}>Расчет</h3>
      <div className={classnames(styles.form_calculator, "shadow_content")}>
        <FormConverter />
      </div>
      <div className={classnames(styles.result, "shadow_content")}>
        <p>{someState}</p>
      </div>
    </div>
  );
};
