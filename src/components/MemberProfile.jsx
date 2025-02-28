import { Button, Card, HStack, Stack, Strong, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { LuCheck, LuX } from "react-icons/lu"
import { useEffect, useState } from "react"
import axios from "axios"

const MemberProfile = () => {

    const [profile, setProfile] = useState([]);
    
    useEffect(()=> {
        allMembers();
    }, [])
    const allMembers = async()=>{

        try {
            const response = await axios.get('http://localhost:5000/allMembers', );
            console.log('Retrive successful:', response.data);
            setProfile(response.data);

          } catch (error) {
            console.error('Registration failed:', error);
          }
    }
  return (
    <div className="">
    {
        profile.map((man)=> 
        <>
        
        <Card.Root width="320px">
        <Card.Body>
        <HStack mb="6" gap="3">
         <Avatar
        src="https://images.unsplash.com/photo-1511806754518-53bada35f930"
        name="Nate Foss"
      />
      <Stack gap="0">
        <Text fontWeight="semibold" textStyle="sm">
          {man.fullName}
        </Text>
        <Text color="fg.muted" textStyle="sm">
          {man.occupation}
        </Text>
      </Stack>
    </HStack>
    <Card.Description>
      <Strong color="fg">Nate Foss </Strong>
      has requested to join your team. You can approve or decline their
      request.
    </Card.Description>
  </Card.Body>
  <Card.Footer>
    <Button variant="subtle" colorPalette="red" flex="1">
      <LuX />
      Decline
    </Button>
    <Button variant="subtle" colorPalette="blue" flex="1">
      <LuCheck />
      Approve
    </Button>
  </Card.Footer>
</Card.Root></>)
    }
    </div>
  )
}
export default MemberProfile;