import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useCallback } from "react";

interface Props {
  milkAmount: number;
  setMilkAmount: (n: number) => void;
}

const MilkAmountSelector: React.FC<Props> = (props) => {
  const { milkAmount, setMilkAmount } = props;

  const onChange = useCallback(
    (event: SelectChangeEvent<number>, _child: ReactNode) => {
      setMilkAmount(Number(event.target.value));
    },
    []
  );

  return (
    <FormControl sx={{ mb: "0.75rem", width: "8rem" }} size="small">
      <InputLabel id="milk_amount_id">ミルク量</InputLabel>
      <Select
        labelId="milk_amount_id"
        id="milk_amount"
        value={milkAmount}
        label="ミルク量"
        onChange={onChange}
      >
        <MenuItem value={40}>40 ml</MenuItem>
        <MenuItem value={80}>80 ml</MenuItem>
        <MenuItem value={100}>100 ml</MenuItem>
        <MenuItem value={120}>120 ml</MenuItem>
        <MenuItem value={160}>160 ml</MenuItem>
        <MenuItem value={200}>200 ml</MenuItem>
        <MenuItem value={240}>240 ml</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MilkAmountSelector;
