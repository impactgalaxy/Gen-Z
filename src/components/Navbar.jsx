
import { IoMdPersonAdd } from "react-icons/io";
import { Button, Input, Stack } from "@chakra-ui/react"
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
export default function Navbar() {
    const {register, handleSubmit, formState: {isSubmitting}}= useForm();
  
    const handleRegister =(values)=>{
console.log(values)
  }
  return (
<>
    <div className='flex items-center justify-between p-10 bg-amber-600 '>
        <h1 className='font-bold text-lg'>Profile</h1>
        <h1 className='font-black text-lg'>Gen-Z mess (Mirpur Branch)</h1>
      
        <DialogRoot closeOnInteractOutside={false}>
       <DialogTrigger asChild>
        <Button colorPalette="teal" variant="solid" >
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
              <Input placeholder="First Name" {...register("fullName")}/>
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
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button type="submit" loading={isSubmitting}>Save</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
      
      
    </div>
    
</>
    
  )
}
