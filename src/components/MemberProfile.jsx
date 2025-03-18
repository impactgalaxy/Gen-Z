import {  Button, Card, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { LuCheck } from "react-icons/lu"
import { Link } from "react-router";
import AddBalance from "./AddBalance";
import AddMeals from "./AddMeals"
import { useQuery } from "@tanstack/react-query";

// import { FaDollarSign } from "react-icons/fa";

const MemberProfile = () => {
  
  const { isPending, error, data } = useQuery({
    queryKey: ['allMember'],
    queryFn: () =>
      fetch('http://localhost:5000/allMembers').then((res) =>
        res.json(),
      ),
    
  })

  if (isPending) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">Loading....</Heading>

  if (error) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">An error has occurred: {error.message}</Heading> 
  
  

  
  return (
    <Flex wrap="wrap" justify="center" align="center" gap="4">
    {
        data.map(({_id, fullName, occupation, })=>         
        <Card.Root key={_id} width="320px">
        <Card.Body>
        <Flex justifyContent="space-between">
        <HStack mb="6" gap="3">
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
    <AddBalance name={fullName} id={_id}/>
        </Flex>

  </Card.Body>
  <Card.Footer>
  
    <AddMeals name={fullName} occupation={occupation} id={_id}/>
    <Link to={`/member/${_id}`}><Button variant="subtle" colorPalette="blue" flex="1">
      <LuCheck />
      Details
    </Button></Link>
  </Card.Footer>
</Card.Root>)
    }
    </Flex>
  )
}
export default MemberProfile;

