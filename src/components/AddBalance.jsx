import { Button, Input, Popover, Portal, Text,  } from "@chakra-ui/react"
import { FaDollarSign } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'; // ES6
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";

export default function AddBalance({name, id}) {
  const queryClient = useQueryClient()


    const {register, handleSubmit, reset, formState:{isSubmitting}} = useForm();

    const handleAddBalance = async(value)=>{
        value.date = moment().format("LL");
        value.memberId = id;
        try {
            const response = await axios.post(`http://localhost:5000/balance`, value);
            if(response.data.insertedId){
              toast.success("Balance added successfully");
              reset();
              queryClient.invalidateQueries({ queryKey: ['allMember']});
            }
          } catch (error) {
            console.error('Operation failed:', error);
            toast.error(error?.message + ", please try again");
            reset();
          }
    }
  return (      
          <Popover.Root >
            <Popover.Trigger asChild>
            <FaDollarSign  title="Add Balance" className="text-3xl! p-1! cursor-pointer text-green-600! bg-slate-100! hover:bg-slate-300! rounded-full transition-all" />
      
            </Popover.Trigger >
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body  >
                    <Popover.Title fontSize="xl" fontWeight="medium">{name}</Popover.Title>
                    <Text my="4">
                      Enter balance
                    </Text>
                    <form onSubmit={handleSubmit(handleAddBalance)}>
      
                    <Input placeholder="Amount" size="sm" {...register("balance")} required/>
                    <Button marginTop="20px" loading={isSubmitting} float="right" type="submit" variant="surface" colorPalette="green">Add</Button>
          </form>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
           
    
  )
}

AddBalance.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string 
}