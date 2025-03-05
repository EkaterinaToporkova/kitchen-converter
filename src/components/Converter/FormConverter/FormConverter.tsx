import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowDownIcon, RadioButtonIcon } from "../../icons";
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
import Button from "@mui/material/Button";
import { Action } from "../../../App";
import { useForm, Controller } from "react-hook-form";

// Export data
import products from "../../../data/products.json";
import measure from "../../../data/measure.json";
import weight from "../../../data/weight.json";
import volume from "../../../data/volume.json";
import densityTable from "../../../data/densityTable.json";
import units from "../../../data/units.json";

interface FormData {
  id: number;
  products_value: string;
  products_ru: string;
  radio_buttons: string;
  number: string;
  measure_input: string;
  measure_input_value: string;
  measure: string;
  measure_value: string;
  resultConversetion: number;
}

interface FormConverterProps {
  onConversion: (value: number | 0) => void;
  onReset: () => void;
  dispatch: React.Dispatch<Action>;
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

const defaultValues: FormData = {
  id: 0,
  products_value: "",
  products_ru: "",
  radio_buttons: "Объем",
  number: "",
  measure_input: "",
  measure_input_value: "",
  measure: "",
  measure_value: "",
  resultConversetion: 0,
};

// Обработчик изменения поля «Продукт»
const option_products: ProductOption[] = Object.entries(products).map(
  ([value, label]) => ({
    value,
    label,
  })
);

// Обработчик изменения поля «Мера»
const option_weight = Object.entries(weight).map(([value, label]) => ({
  value,
  label,
}));

const option_volume = Object.entries(volume).map(([value, label]) => ({
  value,
  label,
}));

// Обработчик изменения поля «Мера или мерный предмет»
const option_measure = Object.entries(measure).map(([value, label]) => ({
  value,
  label,
}));

export const FormConverter: React.FC<FormConverterProps> = ({
  onConversion,
  onReset,
  dispatch,
}) => {
  const { handleSubmit, watch, setValue, reset, control } = useForm<FormData>({
    defaultValues,
    mode: "onSubmit",
  });

  // ПОЛЕ «ПРОДУКТ»

  // Обработчик изменения поля «Продукт»
  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: ProductOption | null
  ) => {
    setValue("products_ru", newValue ? newValue.label : "");
    setValue("products_value", newValue ? newValue.value : "Ошибка расчета");
  };

  // Обработчик изменения поля «Параметр измерения»
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("radio_buttons", event.target.value);
  };

  // Обработчик изменения поля «Введите число»
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("number", event.target.value);
  };

  const radioButtonsValue = watch("radio_buttons");

  const options_weight_volume =
    radioButtonsValue === "Объем" ? option_volume : option_weight;

  const handleMeasureNumberChange = (
    event: React.SyntheticEvent,
    newValue: MeasureNumberOption | null
  ) => {
    setValue("measure_input", newValue ? newValue.label : "");
    setValue("measure_input_value", newValue ? newValue.value : "");
  };

  const handleMeasureChange = (
    event: React.SyntheticEvent,
    newValue: MeasureOption | null
  ) => {
    setValue("measure", newValue ? newValue.label : "");
    setValue("measure_value", newValue ? newValue.value : "");
  };
  // Обработчик изменения поля «Введите число»
  const numberValue = watch("number");
  const productsValue = watch("products_value");
  const measureInputValue = watch("measure_input_value");
  const measureValue = watch("measure_value");

  const density = densityTable[productsValue as keyof typeof densityTable];
  const fromUnit = units[measureInputValue as keyof typeof units];
  const toUnit = units[measureValue as keyof typeof units];
  const amount = parseFloat(numberValue);

  const VOLUME = "Объем" as const;
  const WEIGHT = "Вес" as const;

  // Обработчик отправки формы
  const onSubmit = (data: FormData) => {
    const volumeMatch = option_volume.some((e) => e.value === measureValue);
    const weightMatch = option_weight.some((e) => e.value === measureValue);

    let conversionResult = 0;
    if (radioButtonsValue === VOLUME) {
      if (volumeMatch) {
        conversionResult = (amount * fromUnit) / toUnit;
      } else if (weightMatch) {
        conversionResult = (amount * fromUnit * density) / toUnit;
      }
    } else if (radioButtonsValue === WEIGHT) {
      if (weightMatch) {
        conversionResult = (amount * fromUnit) / toUnit;
      } else if (volumeMatch) {
        conversionResult = (amount * fromUnit) / density / toUnit;
      }
    }

    const resultConversetion = Math.round(conversionResult * 100) / 100;
    onConversion(resultConversetion);
    dispatch({
      type: "ADD_HISTORY_ITEM",
      payload: { ...data, resultConversetion },
    });
  };

  const handleReset = () => {
    onReset(); // Вызываем onReset
    reset(defaultValues); // Сбрасываем форму к defaultValues
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
          }}
        >
          <p>Продукт</p>
        </FormLabel>
        <Controller
          name="products_ru"
          control={control}
          rules={{ required: "Это поле обязательное" }}
          render={({ field, fieldState: { error } }) => {
            // Используем field.value для поиска текущего значения
            const currentValue =
              option_products.find((option) => option.label === field.value) ||
              null;
            return (
              <Autocomplete
                {...field} // Передаем field в Autocomplete
                value={currentValue}
                disablePortal
                id="product"
                options={option_products}
                sx={outlinedInputStyles}
                onChange={(event, newValue) => {
                  const productLabel = newValue ? newValue.label : "";
                  const productValue = newValue
                    ? newValue.value
                    : "Ошибка расчета";
                  field.onChange(productLabel); // Обновляем значение через field.onChange
                  handleAutocompleteChange(event, newValue); // Вызываем handleAutocompleteChange и передаем field.onChange
                  reset({
                    ...defaultValues,
                    products_ru: productLabel,
                    products_value: productValue,
                  });
                  onReset();
                }}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      name={field.name}
                      label="Введите или выберите из списка *"
                      inputRef={field.ref}
                      error={!!error}
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
                  </>
                )}
                closeText="Close"
                popupIcon={<ArrowDownIcon color="#779D77" />}
              />
            );
          }}
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
        <Controller
          name="radio_buttons"
          control={control}
          defaultValue="Объем"
          render={({ field }) => (
            <RadioGroup
              {...field} // Передаем field в RadioGroup
              value={field.value}
              onChange={(event) => {
                field.onChange(event.target.value); // Обновляем значение через field.onChange
                handleRadioChange(event); // Вызываем handleRadioChange
              }}
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
                    checkedIcon={<RadioButtonIcon color="#779D77" size={20} />}
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
                    checkedIcon={<RadioButtonIcon color="#779D77" size={20} />}
                  />
                }
              />
            </RadioGroup>
          )}
        />
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
            <Controller
              name="number"
              control={control}
              rules={{ required: "Это поле обязательное" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    name={field.name}
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                      handleNumberChange(
                        event as React.ChangeEvent<HTMLInputElement>
                      );
                    }}
                    id="outlined-number"
                    label="Введите число *"
                    inputRef={field.ref}
                    error={!!error}
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
                </>
              )}
            />
          </FormControl>
          {/* Ввод меры */}
          <FormControl
            sx={{ flex: 1, marginLeft: "20px", ...FormControlStyles }}
          >
            <Controller
              name="measure_input"
              control={control}
              rules={{ required: "Это поле обязательное" }}
              render={({ field, fieldState: { error } }) => {
                // Используем field.value для поиска текущего значения
                const currentValue =
                  options_weight_volume.find(
                    (option) => option.label === field.value
                  ) || null;
                return (
                  <Autocomplete
                    {...field}
                    value={currentValue}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    disablePortal
                    id="measure_input"
                    options={options_weight_volume}
                    onChange={(event, newValue) => {
                      field.onChange(newValue ? newValue.label : ""); // Обновляем field.value
                      setValue(
                        "measure_input_value",
                        newValue ? newValue.value : ""
                      ); // Обновляем другое поле
                      handleMeasureNumberChange(event, newValue);
                    }}
                    sx={outlinedInputStyles}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name={field.name}
                        label="Мера *"
                        inputRef={field.ref}
                        error={!!error}
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
                    )}
                    closeText="Close"
                    popupIcon={<ArrowDownIcon color="#779D77" />}
                  />
                );
              }}
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
        <Controller
          name="measure"
          control={control}
          rules={{ required: "Это поле обязательное" }}
          render={({ field, fieldState: { error } }) => {
            const currentValue =
              option_measure.find((option) => option.label === field.value) ||
              null;
            return (
              <Autocomplete
                {...field}
                value={currentValue}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                disablePortal
                onChange={(event, newValue) => {
                  field.onChange(newValue ? newValue.label : ""); // Обновляем field.value
                  handleMeasureChange(event, newValue); // Вызываем handleMeasureChange
                }}
                id="measure"
                options={option_measure}
                sx={outlinedInputStyles}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={field.name}
                    label="Мера или мерный предмет"
                    inputRef={field.ref}
                    error={!!error}
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
                )}
                closeText="Close"
                popupIcon={<ArrowDownIcon color="#779D77" />}
              />
            );
          }}
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
    </Box>
  );
};
