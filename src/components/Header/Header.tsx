import React from 'react';
import styles from './Header.module.css'
import logo from  '../../assets/icon/logo.svg'

export const Header : React.FC = () => {
    return (
        <header className={styles.header}>
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              <div className={styles.header__logo}>
                <img src={logo} alt="Логотип" loading="lazy" />
              </div>
              <p>Перевод мер и весов для кулинарных рецептов</p>
            </div>
            <nav className={styles.header__nav}>
              <ul className={styles.header__list}>
                <li>
                  <a className={styles.active} href="#!">
                    Конвертер
                  </a>
                </li>
                <li>
                  <a href="#!">Для чего</a>
                </li>
                <li>
                  <a href="#!">Контакты</a>
                </li>
                <li>
                  <a href="#!">FAQ</a>
                </li>
              </ul>
            </nav>
          </div>
          </div>  
      </header>
    )
}
