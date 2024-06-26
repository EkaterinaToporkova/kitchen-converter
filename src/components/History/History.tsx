import React from 'react';
import styles from './History.module.css'
import close from "../../assets/icon/close.svg"
import tape from "../../assets/icon/tape.svg"


export const History : React.FC = () => {
    return (
        <div className={styles.history_content}>
                <div className={styles.history}>
                <img src={tape} alt="Tape" className={styles.overlay__image}/>
                  <h4>История</h4>
                  <ul className={styles.history__items}>
                    <li className={styles.history__item}>
                      2.5 грамм меда = 7,41 ст. л.
                    </li>
                    <li className={styles.history__item}>200 грамм воды = 1 стакан</li>
                  </ul>
                  <div className="reset__btn">
                    <img src={close} alt="" />
                    <input
                      type="reset"
                      value="Очистить историю"
                      id="reset-history"
                    />
                  </div>
                </div>
              </div>
    )
}