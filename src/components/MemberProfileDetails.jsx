import { Heading } from "@chakra-ui/react"
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
      const {fullName, totalBalance, totalCost, registrationDate} = data;
  return (
    <div style={{border: "1px solid bold", padding: "10px"}}>
        <Heading size="2xl">{fullName}</Heading>
        <Heading size="2xl">Avaiable balance: {totalBalance}</Heading>
        <Heading size="2xl">Total meal: {totalCost}</Heading>
        <Heading size="2xl">Registration Date: {registrationDate}</Heading>
      
    </div>
  )
}
