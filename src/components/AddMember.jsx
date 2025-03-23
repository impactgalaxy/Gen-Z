
import { IoMdPersonAdd } from "react-icons/io";
import { Button,  CloseButton,  Input, Portal, Stack,  } from "@chakra-ui/react"
import { Dialog } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";

// import { useQuery } from "@tanstack/react-query"


export default function AddMember() {
    const {register, handleSubmit, formState: {isSubmitting}, reset}= useForm();  
    const date = moment().format('LL');
    const queryClient = useQueryClient();
         

     const handleRegister = async (data) => {
      data.registrationDate = date;
      try {
        const response = await axios.post('http://localhost:5000/members', data);
        if(response.data.insertedId){
          toast.success("Member added successfully");
          reset();
          queryClient.invalidateQueries({ queryKey: ['allMember'] });
          
        }
      } catch (error) {
        console.error('Registration failed:', error);
        toast.error(error?.message + ", please try again");
        reset();
      }
    };
  
    return (
      <>
<Dialog.Root >
      <Dialog.Trigger asChild>
      <Button colorPalette="teal" variant="solid">
            <IoMdPersonAdd /> Add member
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add member</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            <form onSubmit={handleSubmit(handleRegister)}>
        <Dialog.Body pb="4">
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
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline" >Cancel</Button>
          </Dialog.ActionTrigger>          
          <Button type="submit" colorPalette="cyan" loading={isSubmitting}>Add</Button>
          
        </Dialog.Footer>
        </form>
            </Dialog.Body>
           
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    
    </>
  )
}
