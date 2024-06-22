import React, { useState } from "react";
import close from "../../../assets/icon/close.svg";
import styles from "./FormConverter.module.css";
import Select, { StylesConfig } from "react-select";
import products from "../../../data/products.json";
import expendMoreIcon from '../../../assets/icon/expand_more.svg'

export const FormConverter: React.FC = () => {
  const option_products = Object.entries(products).map(([value, label]) => ({
    value,
    label,
  }));

  const option_weight = [
    {
     "gram":"грамма",
     "kilogram": "килограмм",
     "ounce": "унция",
     "lb": "фунт"
    }
  ]

  const DropdownIndicator = null;

  const baseStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "15px",
      color: "#9f9f9f",
      border: "1px solid #779d77",
      borderRadius: "6px",
      padding: "10px",
      margin: "20px 0 30px",
      background:
        `transparent url(${expendMoreIcon}) no-repeat`,
      backgroundPosition: "466px 18px",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #779d77" : "none",
      "&:hover": {
        borderColor: "#0c340c",
        opacity: "0.9",
        cursor: "pointer"
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 5,
    })
  };

  const formGroup: StylesConfig = {
    control: (provided) => ({
      ...provided,
      width: "500px",
      height: "52px",
    })
  }

  const mergedBasedFormGroup: StylesConfig = {
    ...baseStyles,
    control: (provided, state) => ({
      ...baseStyles.control?.(provided, state),
      ...formGroup.control?.(provided, state),
    }),
  };

  const [someState, setSomeState] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSomeState(Number(e.target.value));
  };
  return (
    <div className={styles.fields_input}>
      <form action="" method="GET">
        {/* Продукт */}
        <label htmlFor="product">
          <p>Продукт</p>
        </label>
        <Select
          options={option_products}
          styles={mergedBasedFormGroup}
          placeholder="Введите или выберите из списка"
          components={{ DropdownIndicator }}
          id="product"
        />
        {/* ------------------------------------------------- */}
        {/* Параметр измерения */}
        <label htmlFor="parameter">
          <p>Параметр измерения</p>
        </label>
        {/* Вес */}
        <div className={styles.radio__group}>
          <div className={styles.form__radio__btn}>
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
          <div className={styles.form__radio__btn}>
            <input id="radio-2" type="radio" name="parameter" value="2" />
            <label htmlFor="radio-2">Объем</label>
          </div>
        </div>
        {/* ------------------------------------------------- */}
        {/* Количество */}
        <label htmlFor="count">
          <p>Количество</p>
        </label>
        <div className={styles.input__count__parametr}>
          <input
            type="number"
            // min="0"
            id="count"
            value={someState}
            onChange={handleChange}
            name="count"
          />
           <Select
          options={option_weight}
          styles={formGroup}
          placeholder="Введите или выберите из списка"
          components={{ DropdownIndicator }}
          id="parameter_select"
        />
          {/* <select id="parameter_select">
            <option disabled selected value="">
              Мера
            </option>
            <option value="parameter_gram">Грамм</option>
            <option value="parameter_kilogram">Килограмм</option>
            <option value="parameter_ounce">Унция</option>
            <option value="parameter_lb">Фунт</option>
          </select> */}
        </div>
        {/* ------------------------------------------------- */}
        {/* Во что конвертировать */}
        <label htmlFor="conversion">
          <p>Во что пересчитать</p>
        </label>
        <select id="conversion" className={styles.form__group}>
          <option disabled selected value="">
            Мера или мерный продукт
          </option>
          <option value="gram">Грамм</option>
          <option value="glass">Стакан</option>
          <option value="milliliter">Миллилитр</option>
        </select>
        {/* ------------------------------------------------- */}
        {/* Сбросить / Отправить */}
        <div className={styles.reset__and__calculate}>
          <div className="reset__btn">
            <img src={close} alt="" />
            <input type="reset" value="Очистить поля" id="reset" />
          </div>
          <input
            type="submit"
            className={styles.btn}
            value="Рассчитать"
            id="calculate"
          />
        </div>
      </form>
    </div>
  );
};
