import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowDownIcon, RadioButtinIcon } from "../../icons";
import styles from "./FormConverter.module.css";
import { InputCountParametr, outlinedInputStyles } from "./FormConverterStyle";
import { FormControlStyles } from "./FormConverterStyle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Export data
import products from "../../../data/products.json";
import measure from "../../../data/measure.json";
import weight from "../../../data/weight.json";
import volume from "../../../data/volume.json";

export const FormConverter: React.FC = () => {
  // const [someState, setSomeState] = useState<number>(0);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSomeState(Number(e.target.value));
  // };

  interface FormData {
    products: string; // Значение автодополнения может быть объектом или null
    radio_buttons: string; // Значение радиокнопок
    number: string; // Ввод числа
    measure_number: string;
    measure: string;
  }

  const [formData, setFormData] = React.useState<FormData>({
    products: "",
    radio_buttons: "",
    number: "",
    measure_number: "",
    measure: "",
  });

  // ПОЛЕ «ПРОДУКТ»
  // 1. Описание интерфейса для поля «Продукт»
  interface ProductOption {
    value: string;
    label: string;
  }

  // 2. Получение списка продуктов для поля «Продукт»
  const option_products: ProductOption[] = Object.entries(products).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  // 3. Обработчик

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: ProductOption | null
  ) => {
    setFormData({
      ...formData,
      products: newValue ? newValue.label : "",
    });
  };

  //  ПОЛЕ «ПАРАМЕТР ИЗМЕРЕНИЯ»
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      radio_buttons: event.target.value,
    });
  };

  // ПОЛЕ «ВВЕДИТЕ ЧИСЛО»
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      number: event.target.value,
    });
  };

  // ПОЛЕ «МЕРА»

  // 1. Получение списка продуктов
  const option_weight = Object.entries(weight).map(([value, label]) => ({
    value,
    label,
  }));

  const option_volume = Object.entries(volume).map(([value, label]) => ({
    value,
    label,
  }));

  const options_weight_volume =
    formData.radio_buttons === "Объем" ? option_volume : option_weight;

  // 2. Описание интерфейса поля «Мера»
  interface MeasureNumberOption {
    value: string;
    label: string;
  }
  // Обработчик
  const handleMeasureNumberChange = (
    event: React.SyntheticEvent,
    newValue: MeasureNumberOption | null
  ) => {
    setFormData({
      ...formData,
      measure_number: newValue ? newValue.label : "",
    });
  };

  // ПОЛЕ «МЕРА ИЛИ МЕРНЫЙ ПРЕДМЕТ
  const option_measure = Object.entries(measure).map(([value, label]) => ({
    value,
    label,
  }));

  interface MeasureOption {
    value: string;
    label: string;
  }

  const handleMeasureChange = (
    event: React.SyntheticEvent,
    newValue: MeasureOption | null
  ) => {
    setFormData({
      ...formData,
      measure: newValue ? newValue.label : "",
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={styles.fields_input}
    >
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
          value={
            option_products.find(
              (option) => option.label === formData.products
            ) || null
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          disablePortal
          id="product"
          options={option_products}
          sx={outlinedInputStyles}
          onChange={handleAutocompleteChange}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label="Введите или выберите из списка"
                name="products"
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
          value={formData.radio_buttons}
          name="radio_buttons"
          onChange={handleRadioChange}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
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
            label="Объем"
            control={
              <Radio
                sx={{
                  color: "#779D77",
                  "& .MuiSvgIcon-root": { fontSize: "20px" },
                }}
                checkedIcon={<RadioButtinIcon color="#779D77" size={20} />}
              />
            }
          />
          <FormControlLabel
            value="Вес"
            label="Вес"
            control={
              <Radio
                sx={{
                  color: "#779D77",
                  "& .MuiSvgIcon-root": { fontSize: "20px" },
                }}
                checkedIcon={<RadioButtinIcon color="#779D77" size={20} />}
              />
            }
          />
        </RadioGroup>
      </FormControl>
      {/* Количество */}
      <Box component="div" height={"95px"} sx={InputCountParametr}>
        {/* Ввод числа */}
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
        <Box component="div" display={"flex"}>
          {/* Ввод числа */}
          <FormControl sx={{ flex: 1 }}>
            <TextField
              value={formData.number}
              name="number"
              onChange={handleNumberChange}
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
          {/* Ввод меры */}
          <FormControl
            sx={{ flex: 1, marginLeft: "20px", ...FormControlStyles }}
          >
            <Autocomplete
              value={
                options_weight_volume.find(
                  (option) => option.label === formData.measure_number
                ) || null
              }
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              disablePortal
              id="measure_number"
              options={options_weight_volume}
              onChange={handleMeasureNumberChange}
              sx={outlinedInputStyles}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Мера"
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
      </Box>
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
          value={
            option_measure.find(
              (option) => option.label === formData.measure
            ) || null
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          disablePortal
          onChange={handleMeasureChange}
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#779D77",
            borderRadius: "6px",
            ":hover": { backgroundColor: "#8BB88B" },
          }}
        >
          Рассчитать
        </Button>
      </Box>
    </Box>
  );
};
