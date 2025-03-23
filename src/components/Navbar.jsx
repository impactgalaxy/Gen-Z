
import { Button, Flex } from '@chakra-ui/react'
import AddMember from './AddMember'
import { Link } from 'react-router'


export default function Navbar() {
  return (
    
    <div className='flex items-center justify-between p-4!'>
      <h1 className='hidden md:block'>Welcome</h1>
      <h1 className='hidden md:block'>Gen-Z mess</h1>
      <Flex gap="10px">
      <AddMember/>
      <Link to="/admin"><Button variant="outline">Admin</Button></Link>
      </Flex>
      
    </div>
  )
}
