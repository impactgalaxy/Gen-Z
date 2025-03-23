import { Button, CloseButton, Dialog, Input, Portal, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { Field } from "../ui/field";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";



 const AddMarketCost = () => {
    const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm();
    
    const queryClient = useQueryClient()

    

    const handleAddCosts = async (doc) =>{
                doc.date = moment().format("LL");
        
        console.log(doc)
         try {
                    const response = await axios.post(`http://localhost:5000/messCosts`, doc);
                    if(response.data.insertedId){
                      toast.success("Costs added successfully");
                      reset();
                      queryClient.invalidateQueries({ queryKey: ['mess-costs'] });

                    }
                  } catch (error) {
                    console.error('Operation failed:', error);
                    toast.error(error?.message + ", please try again");
                    reset();
                  }
    }


  return (
    <Dialog.Root  size="sm" >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Add cost
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Market Costs</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(handleAddCosts)}>
                      
                      <Stack gap="5">
                        
                      <Field label="Select date"  >
                    <Input type="date" {...register("date")} />
                    
                      </Field>
                      
                      <Field label="cost">
                    
                    <Input placeholder="Amount" required {...register("amount")}/>
                    
                    
                      </Field>
                      </Stack>
                      
                      <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
              <Button variant="outline" onClick={()=>reset()}>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button type="submit" loading={isSubmitting} colorPalette="cyan">Add</Button>
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
  )
}
export default AddMarketCost;