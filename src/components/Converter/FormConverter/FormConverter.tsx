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

  // useState для заполнения поля «Мера»
  // const [selectedValue, setSelectedValue] = React.useState("Объем");
  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };
  interface ProductOption {
    value: string;
    label: string;
  }

  const option_products: ProductOption[] = Object.entries(products).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  interface FormData {
    products: string; // Значение автодополнения может быть объектом или null
    radio_buttons: string; // Значение радиокнопок
    message: string; // Сообщение или другое поле
  }

  const option_measure = Object.entries(measure).map(([value, label]) => ({
    value,
    label,
  }));

  const option_weight = Object.entries(weight).map(([value, label]) => ({
    value,
    label,
  }));

  const option_volume = Object.entries(volume).map(([value, label]) => ({
    value,
    label,
  }));

  const [formData, setFormData] = React.useState<FormData>({
    products: "",
    radio_buttons: "",
    message: "",
  });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: ProductOption | null
  ) => {
    setFormData({
      ...formData,
      products: newValue ? newValue.label : "",
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      radio_buttons: event.target.value,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  const options_weight_volume =
    formData.radio_buttons === "Объем" ? option_volume : option_weight;

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
        {/* Ввод меры */}
        <Box component="div" display={"flex"}>
          <FormControl sx={{ flex: 1 }}>
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
          <FormControl
            sx={{ flex: 1, marginLeft: "20px", ...FormControlStyles }}
          >
            <Autocomplete
              disablePortal
              id="product"
              options={options_weight_volume}
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
