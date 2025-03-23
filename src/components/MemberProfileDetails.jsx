import BalanceTransection from "@/helperComponent/BalanceTransection";
import MealChart from "@/helperComponent/MealChart"
import TotalMeal from "@/helperComponent/TotalMeal"
import { Box, Flex, Heading,  } from "@chakra-ui/react"
import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router";
import { Tabs } from "@chakra-ui/react"

export default function MemberProfileDetails() {
    const {id} = useParams();


    const findMember = async () => {
      const res = await fetch(`http://localhost:5000/member/${id}`);
      return res.json();
    };
    
    const balanceTransection = async () =>{
      const res = await fetch (`http://localhost:5000/balanceQuery/${id}`);
      return res.json();
    }


    const results = useQueries({
      queries: [
        {
          queryKey: ['data1'],
          queryFn: findMember,
        },
        {
          queryKey: ['data2'],
          queryFn: balanceTransection,
        },
      ],
    });
  
    // Extracting the status and data of each query
    const [query1, query2, ] = results;
    
  
    if (query1.isLoading || query2.isLoading) {
      return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">Loading....</Heading>;
    }
  
    if (query1.isError || query2.isError ) {
      return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">An error has occurred</Heading>;
    }

    
      const {fullName, totalBalance, registrationDate, totalMeals} = query1.data;
      const meals = TotalMeal(totalMeals);
      const totalM = meals.morning + meals.noon + meals.night;
      console.log(meals, totalM)
      
      
  return (
    <Box padding="5" textAlign="center">
    <Flex padding="5" justifyContent="space-evenly">
        <Heading size="md">{fullName}</Heading>
        <Heading size="md">Avaiable balance: {totalBalance}</Heading>
        <Heading size="md">Total meal: {totalM}</Heading>
        <Heading size="md">Registration Date: {registrationDate}</Heading>
    </Flex>
   
  <Tabs.Root defaultValue="mealChart">
      <Tabs.List>
        <Tabs.Trigger value="mealChart">
          
          Meal Chart
        </Tabs.Trigger>
        <Tabs.Trigger value="transections">
          
          Balance History
        </Tabs.Trigger>
      
      </Tabs.List>
      <Tabs.Content value="mealChart"><MealChart meals = {totalMeals} mealCount = {meals}/></Tabs.Content>
      <Tabs.Content value="transections"><BalanceTransection transection = {query2.data}/></Tabs.Content>
    
    </Tabs.Root>

    
    
    </Box>
    
  )
}
