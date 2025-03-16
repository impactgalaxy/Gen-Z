import Calculation from "@/helperComponent/Calculation"
import MealChart from "@/helperComponent/MealChart"
import { Box, Heading, Stack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

export default function MemberProfileDetails() {
    const {id} = useParams()
    const { isPending, error, data } = useQuery({
        queryKey: ['detailsData'],
        queryFn: () =>
          fetch(`http://localhost:5000/member/${id}`).then((res) =>
            res.json(),
          ),
        
      })
    
      if (isPending) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">Loading....</Heading>
    
      if (error) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">An error has occurred: {error.message}</Heading>
      const {fullName, totalBalance, registrationDate, totalMeals} = data;
      const meals = Calculation(totalMeals);
      
  return (
    <Box padding="5" textAlign="center">
    <Stack padding="10">
        <Heading size="md">{fullName}</Heading>
        <Heading size="md">Avaiable balance: {totalBalance}</Heading>
        <Heading size="md">Total meal: {meals}</Heading>
        <Heading size="md">Registration Date: {registrationDate}</Heading>
    </Stack>

    <MealChart meals = {totalMeals}/>
    </Box>
  )
}
