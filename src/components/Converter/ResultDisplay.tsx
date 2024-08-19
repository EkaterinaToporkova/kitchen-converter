import React from 'react';
import styles from "./Converter.module.css";
import classnames from "classnames";

interface ResultDisplayProps {
  outputAmount: number | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ outputAmount }) => {
    return (
      <div className={classnames(styles.result, "shadow_content")}>
        <p>{outputAmount}</p>
      </div>
    );
  };
  
  export default ResultDisplay;