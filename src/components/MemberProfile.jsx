import {   Box,  Card, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
// import { Link } from "react-router";
import AddBalance from "./AddBalance";
import AddMeals from "./AddMeals"
import { useQuery } from "@tanstack/react-query";
import TotalMeal from "@/helperComponent/TotalMeal";
import Calculation from "@/helperComponent/Calculation";

// import { FaDollarSign } from "react-icons/fa";

const MemberProfile = () => {
  const {mealRate} = Calculation();
  
  const { isPending, error, data } = useQuery({
    queryKey: ['allMember'],
    queryFn: () =>
      fetch('http://localhost:5000/allMembers').then((res) =>
        res.json(),
      ),
    
  })

  if (isPending) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">Loading....</Heading>

  if (error) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">An error has occurred: {error.message}</Heading> 
  
  
const mealCount = (a)=> a.morning + a.noon + a.night;
console.log(data)

  
  return (
    <Flex wrap="wrap" justify="center" align="center" gap="4">
    {
        data.map(({_id, fullName, occupation, totalBalance, totalMeals })=>         
        <Card.Root key={_id} width="320px">
        <Card.Body>
        
        <Flex justifyContent="space-between" >
        <HStack mb="2" gap="3">
         <Avatar
        src="https://images.unsplash.com/photo-1511806754518-53bada35f930"
        name="Nate Foss"
      />
      <Stack gap="0">
        <Text fontWeight="semibold" textStyle="md">
          {fullName}
        </Text>
        <Text color="fg.muted" textStyle="sm">
          {occupation}
        </Text>
      </Stack>      
    </HStack>
    <Flex gap="15px">
    <AddBalance name={fullName} id={_id}/>
    <AddMeals name={fullName} occupation={occupation} id={_id}/>
    </Flex>
        </Flex>
  <Box paddingY="5px">
    <p>Total deposit: {totalBalance}</p>
    <p>Total Meal: {mealCount(TotalMeal(totalMeals))}</p>
    <p>Cost: {(mealCount(TotalMeal(totalMeals)) * mealRate).toFixed(2)}</p>
    <p>Available balance: {(totalBalance - mealCount(TotalMeal(totalMeals)) * mealRate).toFixed(2)}</p>
  </Box>
  </Card.Body>
  <Card.Footer>
    {/* <Link to={`/member/${_id}`}><Button variant="subtle" colorPalette="blue" flex="1">
      <LuCheck />
      Details
    </Button></Link> */}
  </Card.Footer>
</Card.Root>)
    }
    </Flex>
  )
}
export default MemberProfile;

