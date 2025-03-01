
import { IoMdPersonAdd } from "react-icons/io";
import { Button, Heading, Input, Stack } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";


export default function Navbar() {
    const {register, handleSubmit, formState: {isSubmitting}, reset}= useForm();  
    const date = moment().format('LL');
    const handleRegister = async (data) => {
      data.registrationDate = date;
      try {
        const response = await axios.post('http://localhost:5000/members', data);
        if(response.data.insertedId){
          toast.success("Member added successfully");
          reset();
        }
      } catch (error) {
        console.error('Registration failed:', error);
        toast.error(error?.message + ", please try again");
        reset();
      }
    };
  return (
    <div className='flex bg-amber-600 items-center justify-between'>
        <Heading fontSize="xl" color="fg">Welcome</Heading>
        <Heading fontSize="xl" color="fg">Gen-Z mess (mirpur branch)</Heading>
      
        <DialogRoot>
       <DialogTrigger asChild>
        <Button colorPalette="teal" variant="solid">
            <IoMdPersonAdd /> Add member
        </Button>
      </DialogTrigger>
      <DialogContent>
        
        <DialogHeader>
          <DialogTitle>Add member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleRegister)}>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Full name">
              <Input placeholder="Full Name" required {...register("fullName")}/>
            </Field>
            
            <Field label="Phone number">
              <Input placeholder="Phone number" {...register("phoneNumber")}/>
            </Field>
            <Field label="Occupation">
              <Input placeholder="Occupation" {...register("occupation")}/>
            </Field>
          </Stack> 
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DialogActionTrigger>
          <Button type="submit" loading={isSubmitting}>Add</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>      
    </div>
  )
}
