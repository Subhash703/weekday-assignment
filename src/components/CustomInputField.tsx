import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react'

interface CustomInputFieldProps {
  data?: string | null;
  handleOnChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({data, handleOnChange, placeholder}) => {
  return (
    <TextField
      size='small'
      onChange={handleOnChange}
      margin="dense"
      placeholder={placeholder}
      className="w-full"
      value={data}
      sx={{
        borderColor: 'darkslategray',
      }}
    />
  )
}

export default CustomInputField;