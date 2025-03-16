import {
    DialogActionTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button, DialogBody, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { Field } from "./ui/field";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export default function AddMeals({name, occupation, id, }) {

    const {register, handleSubmit, formState: {isSubmitting}, reset}= useForm();

    const handleSave = async (data)=>{
        const dd = (data?.date === "" ? moment().format("LL") : moment(data?.date).format("LL"));
        const obj = {
          date: dd,
          morning: data?.morning,
          noon: data?.noon,
          night: data?.night
        }
        try {
          const response = await axios.patch(`http://localhost:5000/mealUpdate/${id}`, obj);
          if(response.data.modifiedCount){
            toast.success("Meals added successfully");
            reset();
          }
        } catch (error) {
          console.error('Operation failed:', error);
          toast.error(error?.message + ", please try later");
          reset();
        }
      }
  return (
    <div>
      <DialogRoot>
      <DialogTrigger asChild>
      
      <Button variant="subtle" colorPalette="green" flex="1">
      <IoIosAddCircle />
      Add meal
    </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name} </DialogTitle>
          <Heading fontSize="sm" color="fg.muted">{occupation}</Heading>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)}>
        <DialogBody>
        <Stack gap="5">
        <Field label="Select date"  >
      <Input type="date" {...register("date")} />
        </Field>
        {/* <Field label="Deposit"  >
      <Input placeholder="Amount" {...register("amount")}/>
        </Field> */}
        <Field label="Meal">
      <Flex justify="space-between" align="center" gap="2">
      <Input placeholder="Morning" {...register("morning")}/>
      <Input placeholder="Noon" {...register("noon")}/>
      <Input placeholder="Night" {...register("night")}/>
      </Flex>
        </Field>
        </Stack>
        
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={()=>reset()}>Cancel</Button>
          </DialogActionTrigger>
          <Button type="submit" loading={isSubmitting}>Save</Button>
        </DialogFooter>
          </form>
        
        
      </DialogContent>
    </DialogRoot>
    </div>
  )
}

AddMeals.propTypes = {
    name: PropTypes.string,
    occupation: PropTypes.string,
    id: PropTypes.string
}