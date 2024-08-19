import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowDownIcon, RadioButtinIcon } from "../../icons";
import styles from "./FormConverter.module.css";
import { InputCountParametr, outlinedInputStyles } from "./FormConverterStyle";
import { FormControlStyles } from "./FormConverterStyle";
import { IoMdClose } from "react-icons/io";
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
import densityTable from "../../../data/densityTable.json";
import units from "../../../data/units.json";

interface FormData {
  products_value: string;
  products: string;
  radio_buttons: string;
  number: string;
  measure_input: string;
  measure_input_value: string;
  measure: string;
  measure_value: string;
}

interface FormConverterProps {
  onConversion: (value: number | null) => void;
}

interface ProductOption {
  value: string;
  label: string;
}

interface MeasureNumberOption {
  value: string;
  label: string;
}

interface MeasureOption {
  value: string;
  label: string;
}
export const FormConverter: React.FC<FormConverterProps> = ({
  onConversion,
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    products_value: "",
    products: "",
    radio_buttons: "",
    number: "",
    measure_input: "",
    measure_input_value: "",
    measure: "",
    measure_value: "",
  });

  // ПОЛЕ «ПРОДУКТ»

  // 1. Получение списка продуктов для поля «Продукт»
  const option_products: ProductOption[] = Object.entries(products).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  // 2. Обработчик

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: ProductOption | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: newValue ? newValue.label : "",
      products_value: newValue ? newValue.value : "Ошибка расчета",
    }));
  };

  //  ПОЛЕ «ПАРАМЕТР ИЗМЕРЕНИЯ»
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      radio_buttons: event.target.value,
    }));
  };

  // ПОЛЕ «ВВЕДИТЕ ЧИСЛО»
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      number: event.target.value,
    }));
  };

  // ПОЛЕ «МЕРА»

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

  const handleMeasureNumberChange = (
    event: React.SyntheticEvent,
    newValue: MeasureNumberOption | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      measure_input: newValue ? newValue.label : "",
      measure_input_value: newValue ? newValue.value : "",
    }));
  };

  // ПОЛЕ «МЕРА ИЛИ МЕРНЫЙ ПРЕДМЕТ
  const option_measure = Object.entries(measure).map(([value, label]) => ({
    value,
    label,
  }));

  const handleMeasureChange = (
    event: React.SyntheticEvent,
    newValue: MeasureOption | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      measure: newValue ? newValue.label : "",
      measure_value: newValue ? newValue.value : "",
    }));
  };

  // Состояние для вывода расчета

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Плотность продукта
    const density =
      densityTable[formData.products_value as keyof typeof densityTable];

    // Ввод числа
    const amount = parseFloat(formData.number);

    const conversionType =
      // 1 условие: если значение поля «Параметр измерения» == объем (formData.radio_buttons == «Объем») и значение поля «Мера или мерный продукт» входит в массив option_volume_label,
      // то base_value = quantity * conversion_table[from_unit]  # Преобразуем в миллилитры
      // return base_value / conversion_table[to_unit]  # Преобразуем из миллилитров в целевую единицу
      formData.radio_buttons === "Объем" &&
      option_volume.some((e) => e.value === formData.measure_value)
        ? (amount * units[formData.measure_input_value as keyof typeof units]) /
          units[formData.measure_value as keyof typeof units]
        : 6;

    onConversion(conversionType);
  };

  const handleReset = () => {
    setFormData({
      products_value: "",
      products: "",
      radio_buttons: "",
      number: "",
      measure_input: "",
      measure_input_value: "",
      measure: "",
      measure_value: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={styles.fields_input}
      id="form"
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
              inputProps={{ min: 0.01, step: 0.01 }}
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
                  (option) => option.label === formData.measure_input
                ) || null
              }
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              disablePortal
              id="measure_input"
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          startIcon={<IoMdClose color="#779D77" />}
          type="reset"
          onClick={handleReset}
          sx={{
            color: "#779D77",
            padding: 0,
            ":hover": { borderColor: "#8BB88B", backgroundColor: "#0000" },
          }}
        >
          Сбросить
        </Button>
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
      {/* <div className={styles.result}>
        <p>{outputAmount}</p>
      </div> */}
    </Box>
  );
};
