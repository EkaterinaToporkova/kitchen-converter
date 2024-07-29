import { alignProperty } from "@mui/material/styles/cssUtils";

// Cтиль для ширины между текстом и полем + стиль для поля
export const outlinedInputStyles = {
  marginTop: "20px",

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #779d77",
      borderRadius: "6px",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#779d77 !important", // Цвет для обводки
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#779d77 !important", // Цвет обводки при наведении
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#779d77 !important", // Цвет обводки при фокусе
  },
};

// Стиль для текста + поля (отступ снизу 30px)
export const FormControlStyles = {
  color: "#303030",
  marginBottom: "30px",
  "& .Mui-focused": {
    color: "inherit !important",
  },
};

export const InputCountParametr = {
  color: "#303030",
  marginBottom: "30px",
  "& .Mui-focused": {
    color: "inherit !important",
  },
}

