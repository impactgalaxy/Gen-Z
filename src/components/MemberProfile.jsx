import { Button, Card, Heading, HStack,  Stack, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { LuCheck } from "react-icons/lu"
import { IoIosAddCircle } from "react-icons/io"

import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router";

const MemberProfile = () => {
        const { isPending, error, data } = useQuery({
          queryKey: ['repoData'],
          queryFn: () =>
            fetch('http://localhost:5000/allMembers').then((res) =>
              res.json(),
            ),
          
        })
      
        if (isPending) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">Loading....</Heading>
      
        if (error) return <Heading textAlign="center" paddingTop="10px" fontSize="2xl">An error has occurred: {error.message}</Heading>
   
  return (
    <div className="flex flex-wrap justify-center gap-4">
    {
        data.map((man)=>         
        <Card.Root key={man?._id} width="320px">
        <Card.Body>
        <HStack mb="6" gap="3">
         <Avatar
        src="https://images.unsplash.com/photo-1511806754518-53bada35f930"
        name="Nate Foss"
      />
      <Stack gap="0">
        <Text fontWeight="semibold" textStyle="md">
          {man?.fullName}
        </Text>
        <Text color="fg.muted" textStyle="sm">
          {man.occupation}
        </Text>
      </Stack>
    </HStack>
    <Stack>
      <Heading fontSize="md" color="fg.muted">Available balance: 500/=</Heading>
      <Heading fontSize="md" color="fg.muted">Total meal: 0</Heading>
      <Heading fontSize="md" color="fg.muted">Deposit amount: 2000/=</Heading>
    </Stack>
  </Card.Body>
  <Card.Footer>
  <DialogRoot>
      <DialogTrigger asChild>
      <Button variant="subtle" colorPalette="green" flex="1">
      <IoIosAddCircle />
      Add
    </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{man?.fullName} </DialogTitle>
          <Heading fontSize="sm" color="fg.muted">{man?.occupation}</Heading>
        </DialogHeader>
        <div style={{padding: "20px"}}>
          <form action="">
          <div>
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="number" id="amount" style={{paddingLeft: "10px"}} className="h-10 px-2  block w-full" placeholder="Enter amount"  />
        </div>
        <div style={{marginTop: "20px", marginBottom: "20px"}}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meal</label>
        <div className="flex items-center justify-between gap-2">
        <input type="text" id="amount" style={{paddingLeft: "10px"}} className="h-10 px-2  block w-full" placeholder="Morning"/>
        <input type="text" id="amount" style={{paddingLeft: "10px"}} className="h-10 px-2  block w-full" placeholder="Noon"/>
        <input type="text" id="amount" style={{paddingLeft: "10px"}} className="h-10 px-2  block w-full" placeholder="Night"/>
        </div>
        </div>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button type="submit">Save</Button>
        </DialogFooter>
          </form>
        </div>
        
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
    
    <Link to={`/member/${man._id}`}><Button variant="subtle" colorPalette="blue" flex="1">
      <LuCheck />
      Details
    </Button></Link>
  </Card.Footer>
</Card.Root>)
    }
    </div>
  )
}
export default MemberProfile;