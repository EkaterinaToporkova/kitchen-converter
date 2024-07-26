// import React, { useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowDownIcon, RadioButtinIcon } from "../../icons";
import styles from "./FormConverter.module.css";
import { outlinedInputStyles } from "./FormConverterStyle";
import { FormControlStyles } from "./FormConverterStyle";
import products from "../../../data/products.json";
import measure from "../../../data/measure.json";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

export const FormConverter: React.FC = () => {
  // const [someState, setSomeState] = useState<number>(0);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSomeState(Number(e.target.value));
  // };

  const option_products = Object.entries(products).map(([value, label]) => ({
    value,
    label,
  }));

  const option_measure = Object.entries(measure).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <Box className={styles.fields_input}>
      {/* Продукт */}
      <FormControl fullWidth sx={FormControlStyles}>
        <FormLabel
          component="legend"
          sx={{
            color: "#303030",
            "&.Mui-focused": {
              color: "#779d77",
            },
            // fontSize:"20px",
            // fontWeight: 500,
            // marginBlock: 0
          }}
        >
          <p>Продукт</p>
        </FormLabel>
        <Autocomplete
          disablePortal
          id="product"
          options={option_products}
          sx={outlinedInputStyles}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label="Введите или выберите из списка"
                InputLabelProps={{
                  sx: {
                    "&.MuiInputLabel-shrink": {
                      color: "#779d77 !important",
                      "&.Mui-focused": {
                        color: "#779d77 !important",
                      },
                    },
                  },
                }}
              />
            );
          }}
          closeText="Close"
          popupIcon={<ArrowDownIcon color="#779D77" />}
        />
      </FormControl>
      {/* Параметр измерения */}
      <FormControl fullWidth sx={FormControlStyles}>
        <FormLabel
          component="legend"
          sx={{
            marginBottom: "20px",
            color: "#303030",
          }}
        >
          <p>Параметр измерения</p>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{
            height: "20px",
            "& .MuiFormControlLabel-root": {
              height: "100%",
              alignItems: "center",
            },
            fontSize: "12px",
          }}
        >
          <FormControlLabel
            value="Объем"
            control={
              <Radio
                sx={{
                  color: "#779D77",
                  "& .MuiSvgIcon-root": { fontSize: "20px" },
                }}
                checkedIcon={<RadioButtinIcon color="#779D77" size={20} />}
              />
            }
            label="Объем"
          />
          <FormControlLabel
            value="Вес"
            control={
              <Radio
                sx={{
                  color: "#779D77",
                  "& .MuiSvgIcon-root": { fontSize: "20px" },
                }}
                checkedIcon={<RadioButtinIcon color="#779D77" size={20} />}
              />
            }
            label="Вес"
          />
        </RadioGroup>
      </FormControl>
      {/* Количество */}
      <FormControl
        sx={FormControlStyles}
        className={styles.input__count__parametr}
      >
        <FormLabel
          component="legend"
          sx={{
            color: "#303030",
            "&.Mui-focused": {
              color: "#779d77 !important",
            },
          }}
        >
          <p>Количество</p>
        </FormLabel>
        <TextField
          id="outlined-number"
          label="Введите число"
          type="number"
          sx={outlinedInputStyles}
          InputLabelProps={{
            sx: {
              "&.MuiInputLabel-shrink": {
                color: "#779d77 !important",
                "&.Mui-focused": {
                  color: "#779d77 !important",
                },
              },
            },
          }}
        />
      </FormControl>

      {/* Во что пересчитать */}
      <FormControl fullWidth sx={FormControlStyles}>
        <FormLabel
          component="legend"
          sx={{
            color: "#303030",
          }}
        >
          <p>Во что пересчитать</p>
        </FormLabel>
        <Autocomplete
          disablePortal
          id="measure"
          options={option_measure}
          sx={outlinedInputStyles}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label="Мера или мерный предмет"
                InputLabelProps={{
                  sx: {
                    "&.MuiInputLabel-shrink": {
                      color: "#779d77 !important",
                      "&.Mui-focused": {
                        color: "#779d77 !important",
                      },
                    },
                  },
                }}
              />
            );
          }}
          closeText="Close"
          popupIcon={<ArrowDownIcon color="#779D77" />}
        />
      </FormControl>
    </Box>
  );
};
