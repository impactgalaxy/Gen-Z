import { Heading } from '@chakra-ui/react'
import { useQueries,  } from '@tanstack/react-query'
import TotalMeal from './TotalMeal';


export default function Calculation() {
    
      const findMember = async () => {
        const res = await fetch(`http://localhost:5000/allMembers`);
        return res.json();
      };
      const messCosts = async () => {
        const res = await fetch(`http://localhost:5000/mess-costs`);
        return res.json();
      };

      const results = useQueries({
            queries: [
              {
                queryKey: ['members'],
                queryFn: findMember,
              },
              {
                queryKey: ['mess-costs'],
                queryFn: messCosts,
              },
            ],
          });
      const [query1, costs] = results;
      
          if (query1.isLoading || costs.isLoading) {
            return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">Loading....</Heading>;
          }
        
          if (query1.isError || costs.isError ) {
            return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">An error has occurred</Heading>;
          }
          
          
          const a = query1.data.map(meals => meals.totalMeals);
         
          function steamrollArray(arr) {
            const flattenedArray = [];

            for (let i = 0; i < arr.length; i++) {
              if (Array.isArray(arr[i])) {
               
                flattenedArray.push(...steamrollArray(arr[i]));
              } else {
                flattenedArray.push(arr[i]);
              }
            }
            return flattenedArray;
          };
          
          // test here
          let {morning, noon, night} = TotalMeal(steamrollArray(a));
          let tm = (morning + noon + night);
          
          const neetAmount = costs.data.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0).toFixed(2);
          const mealRate = parseFloat((neetAmount)/tm).toFixed(2);
      
  return {tm, neetAmount, mealRate}
}
