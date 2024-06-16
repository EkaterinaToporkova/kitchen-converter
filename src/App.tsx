import { useState } from "react";
import "./App.css";

function App() {
  const [someState, setSomeState] = useState<number>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSomeState(Number(e.target.value));
  };

  // const [value, setValue] = useState<number>();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(Number(event.target.value));
  // };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <div className="header__logo">
              <img src="icons/logo.svg" alt="Логотип" loading="lazy" />
            </div>
            <p>Перевод мер и весов для кулинарных рецептов</p>
          </div>
          <nav className="header__nav">
            <ul className="header__list">
              <li>
                <a className="active" href="#!">
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
      </header>
      <main className="content">
        <section className="converter">
          <div className="container">
            <div className="wrapper">
              <div className="calculator">
                <h3 className="wrapper_title">Расчет</h3>
                <div className="form_calculator shadow_content">
                  <div className="fields_input">
                    <form action="" method="GET">
                      {/* Продукт */}
                      <label htmlFor="product">
                        <p>Продукт</p>
                      </label>
                      <select id="product" className="form__group">
                        <option disabled selected value>
                          Введите или выберите из списка
                        </option>
                        <option value="peanut">Арахис</option>
                        <option value="cherry">Вишня</option>
                        <option value="water">Вода</option>
                      </select>
                      {/* ------------------------------------------------- */}
                      {/* Параметр измерения */}
                      <label htmlFor="parameter">
                        <p>Параметр измерения</p>
                      </label>
                      {/* Вес */}
                      <div className="radio__group">
                        <div className="form__radio__btn">
                          <input
                            id="radio-1"
                            type="radio"
                            name="parameter"
                            value="1"
                            checked
                          />
                          <label htmlFor="radio-1">Вес</label>
                        </div>
                        {/* Объем */}
                        <div className="form__radio__btn">
                          <input
                            id="radio-2"
                            type="radio"
                            name="parameter"
                            value="2"
                          />
                          <label htmlFor="radio-2">Объем</label>
                        </div>
                      </div>
                      {/* ------------------------------------------------- */}
                      {/* Количество */}
                      <label htmlFor="count">
                        <p>Количество</p>
                      </label>
                      <div className="input__count__parametr">
                        <input
                          type='number'
                          // min="0"
                          id="count"
                          value={someState}
                          onChange={handleChange}
                          name="count"
                        />
                        <select id="parameter_select">
                          <option disabled selected value>
                            Мера
                          </option>
                          <option value="parameter_gram">Грамм</option>
                          <option value="parameter_kilogram">Килограмм</option>
                          <option value="parameter_ounce">Унция</option>
                          <option value="parameter_lb">Фунт</option>
                        </select>
                      </div>
                      {/* ------------------------------------------------- */}
                      {/* Во что конвертировать */}
                      <label htmlFor="conversion">
                        <p>Во что пересчитать</p>
                      </label>
                      <select id="conversion" className="form__group">
                        <option disabled selected value>
                          Мера или мерный продукт
                        </option>
                        <option value="gram">Грамм</option>
                        <option value="glass">Стакан</option>
                        <option value="milliliter">Миллилитр</option>
                      </select>
                      {/* ------------------------------------------------- */}
                      {/* Сбросить / Отправить */}
                      <div className="reset__and__calculate">
                        <div className="reset__btn">
                          <img src="./icons/close.svg" alt="" />
                          <input
                            type="reset"
                            value="Очистить поля"
                            id="reset"
                          />
                        </div>
                        <input
                          type="submit"
                          className="btn"
                          value="Рассчитать"
                          id="calculate"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="result shadow_content">
                  <p>{someState}</p>
                </div>
              </div>
              <div className="history_content">
                <div className="history">
                  <h4>История</h4>
                  <ul className="history__items">
                    <li className="history__item">
                      2.5 грамм меда = 7,41 ст. л.
                    </li>
                    <li className="history__item">200 грамм воды = 1 стакан</li>
                  </ul>
                  <div className="reset__btn">
                    <img src="./icons/close.svg" alt="" />
                    <input
                      type="reset"
                      value="Очистить историю"
                      id="reset-history"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
