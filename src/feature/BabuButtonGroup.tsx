import BabuButton from "@/component/BabuButton";
import { EventType, UserType } from "@/model/BabuModel";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface Props {
  user: UserType;
}

const BabuButtonGroup: React.VFC<Props> = (props) => {
  const { user } = props;

  return (
    <>
      {/*  */}
      <Typography variant="h2" fontSize="1.2rem">
        {user.name}
      </Typography>
      <Box display="flex" flexDirection="row" pl="0.5rem" pt="0.5rem" pb="1rem">
        <Box borderRadius={"0.5rem"} border={2} borderColor={grey["300"]} display="flex" flexDirection="column"
             p="0.75rem">
          <BabuButton
            // key={EventType.pee.id}
            title={`${EventType.pee.name}`}
            babu={{ user, event: EventType.pee }}
            sx={{ mb: "0.75rem", p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
          />
          <BabuButton
            // key={EventType.poop.id}
            title={`${EventType.poop.name}`}
            babu={{ user, event: EventType.poop }}
            sx={{ p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
          />
        </Box>
        <Box borderRadius={"0.5rem"} border={2} borderColor={grey["300"]} display="flex" flexDirection="column"
             p="0.75rem" ml="1rem">
          <BabuButton
            // key={EventType.pee.id}
            title={`${EventType.sleep.name}`}
            babu={{ user, event: EventType.sleep }}
            sx={{ mb: "0.75rem", p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
          />
          <BabuButton
            // key={EventType.poop.id}
            title={`${EventType.wake_up.name}`}
            babu={{ user, event: EventType.wake_up }}
            sx={{ p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
          />
        </Box>
        {/* Milk */}
        <Box borderRadius={"0.5rem"} border={2} borderColor={grey["300"]} display="flex" flexDirection="column"
             p="0.75rem" ml="1rem">
          <BabuButton
            // key={EventType.pee.id}
            title={`${EventType.milk.name}`}
            babu={{ user, event: EventType.milk }}
            sx={{ mb: "0.75rem", p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
          />
        </Box>
        {/* Mother Milk */}
        {props.user.id == "mother" ? (
          <Box borderRadius={"0.5rem"} border={2} borderColor={grey["300"]} display="flex" flexDirection="column"
               p="0.75rem" ml="1rem">
            <BabuButton
              // key={EventType.poop.id}
              title={`${EventType.mother_milk_left.name}`}
              babu={{ user, event: EventType.mother_milk_left }}
              sx={{ mb: "0.75rem", width: "8rem", backgroundColor: user.bgColor }}
            />
            <BabuButton
              // key={EventType.poop.id}
              title={`${EventType.mother_milk_right.name}`}
              babu={{ user, event: EventType.mother_milk_right }}
              sx={{ p: "0.5rem", width: "8rem", backgroundColor: user.bgColor }}
            />
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default BabuButtonGroup;
