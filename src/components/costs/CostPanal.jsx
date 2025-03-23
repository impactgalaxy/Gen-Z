import { Box,  Flex, Heading } from "@chakra-ui/react";
import AddMarketCost from "./AddMarketCost";
import Calculation from "@/helperComponent/Calculation";



export default function CostPanal() {

    const {tm, neetAmount, mealRate} = Calculation();


  return (
    <Flex alignItems="center" justifyContent="space-between" className="p-4! lg:p-10!">
        <Box className="p-4! lg:p-10!">
      
        <Heading>Total mess costs: {neetAmount}</Heading>
            <Heading>Meal rate: {mealRate}</Heading>
            <Heading>Neet meal: {tm}</Heading>
    </Box>
    <AddMarketCost/>
    </Flex>
  )
}
