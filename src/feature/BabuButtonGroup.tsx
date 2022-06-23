import BabuButton from "@/component/BabuButton";
import { EventType, PostType, UserType } from "@/model/BabuModel";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import MilkAmountSelector from "@/component/MilkAmountSelector";
import React, { useState } from "react";

interface Props {
  user: UserType;
}

const BabuButtonGroup: React.FC<Props> = (props) => {
  const { user } = props;

  const [milkAmount, setMilkAmount] = useState<number>(40);

  return (
    <>
      {/*  */}
      <Typography variant="h2" fontSize="1.2rem">
        {user.name}
      </Typography>
      <Box display="flex" flexDirection="row" pl="0.5rem" pt="0.5rem" pb="1rem">
        <Box
          borderRadius={"0.5rem"}
          border={2}
          borderColor={grey["300"]}
          display="flex"
          flexDirection="column"
          p="0.75rem"
          pb={0}
        >
          <BabuButton
            key={EventType.pee.id}
            title={`${EventType.pee.name}`}
            babu={{
              user,
              event: EventType.pee,
              type: PostType.record,
              opt: undefined,
            }}
            sx={{
              mb: "0.75rem",
              p: "0.5rem",
              width: "8rem",
              backgroundColor: user.bgColor,
            }}
          />
          <BabuButton
            key={EventType.poop.id}
            title={`${EventType.poop.name}`}
            babu={{
              user,
              event: EventType.poop,
              type: PostType.record,
              opt: undefined,
            }}
            sx={{ p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
          />
        </Box>
        {/* Mother Milk */}
        {props.user.id == "mother" ? (
          <Box
            borderRadius={"0.5rem"}
            border={2}
            borderColor={grey["300"]}
            display="flex"
            flexDirection="column"
            p="0.75rem"
            pb={0}
            ml="1rem"
          >
            <BabuButton
              key={EventType.mother_milk_left.id}
              title={`${EventType.mother_milk_left.name}`}
              babu={{
                user,
                event: EventType.mother_milk_left,
                type: PostType.record,
                opt: undefined,
              }}
              sx={{
                mb: "0.75rem",
                width: "8rem",
                backgroundColor: user.bgColor,
              }}
            />
            <BabuButton
              key={EventType.mother_milk_right.id}
              title={`${EventType.mother_milk_right.name}`}
              babu={{
                user,
                event: EventType.mother_milk_right,
                type: PostType.record,
                opt: undefined,
              }}
              sx={{ p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
            />
          </Box>
        ) : null}
        {/* Milk */}
        <Box
          borderRadius={"0.5rem"}
          border={2}
          borderColor={grey["300"]}
          display="flex"
          flexDirection="column"
          p="0.75rem"
          pb={0}
          ml="1rem"
        >
          <MilkAmountSelector
            key={EventType.milk.id + "_selector"}
            milkAmount={milkAmount}
            setMilkAmount={setMilkAmount}
          />
          <BabuButton
            key={EventType.milk.id}
            title={`${EventType.milk.name}`}
            babu={{
              user,
              event: EventType.milk,
              type: PostType.record,
              opt: `${milkAmount}ml`,
            }}
            sx={{
              mb: "0.75rem",
              p: "0.5rem",
              width: "8rem",
              backgroundColor: user.bgColor,
            }}
          />
        </Box>

        {/* Sleep Awake */}
        <Box
          borderRadius={"0.5rem"}
          border={2}
          borderColor={grey["300"]}
          display="flex"
          flexDirection="column"
          p="0.75rem"
          pb={0}
          ml="1rem"
        >
          <BabuButton
            key={EventType.sleep.id}
            title={`${EventType.sleep.name}`}
            babu={{
              user,
              event: EventType.sleep,
              type: PostType.record,
              opt: undefined,
            }}
            sx={{
              mb: "0.75rem",
              p: "0.5rem",
              width: "8rem",
              backgroundColor: user.bgColor,
            }}
          />
          <BabuButton
            key={EventType.wake_up.id}
            title={`${EventType.wake_up.name}`}
            babu={{
              user,
              event: EventType.wake_up,
              type: PostType.record,
              opt: undefined,
            }}
            sx={{ p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
          />
        </Box>
      </Box>
    </>
  );
};

export default BabuButtonGroup;
