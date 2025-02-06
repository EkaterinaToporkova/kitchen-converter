import React from "react";
import styles from "./Header.module.css";
import classnames from "classnames";



export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={classnames(styles.header__container, "_container")}>
          <a href="#" className={styles.header__logo}>Kitchen Converter</a> 
          <nav className={classnames(styles.header__menu, styles.menu)}>
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <a href="#!" className={styles.menu__link}>
                  Конвертер
                </a>
              </li>
              <li className={styles.menu__item}>
                <a href="#!" className={styles.menu__link}>Для чего</a>
              </li>
              <li className={styles.menu__item}>
                <a href="#!" className={styles.menu__link}>Контакты</a>
              </li>
              <li className={styles.menu__item}>
                <a href="#!" className={styles.menu__link}>FAQ</a>
              </li>
            </ul>
          </nav>
        </div>
    </header>
  );
};
