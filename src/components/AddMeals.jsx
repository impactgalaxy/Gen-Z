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
import { Field } from "./ui/field";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { FaMediumM } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

export default function AddMeals({name, occupation, id, }) {
  const queryClient = useQueryClient()

    const {register, handleSubmit, formState: {isSubmitting}, reset,}= useForm();

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
            queryClient.invalidateQueries({ queryKey: ['allMember']});
          }
        } catch (error) {
          console.error('Operation failed:', error);
          toast.error(error?.message + ", please try later");
          reset();
        }
      }
  return (
    <div>
      <DialogRoot size="sm">
      <DialogTrigger asChild>
      
      <FaMediumM title="Add Meals" className="text-3xl! p-1! cursor-pointer text-green-600! bg-slate-100! hover:bg-slate-300! rounded-full transition-all" />

      </DialogTrigger >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name} </DialogTitle>
          <Heading fontSize="sm" color="fg.muted">{occupation}</Heading>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)}>
        <DialogBody>
        <Stack gap="5">
          <p className="text-[10px]! text-red-700">If you don&apos;t select any data it will automatecaly provided date of today and meal of zero*</p>
        <Field label="Select date"  >
      <Input type="date" {...register("date")} />
        </Field>
        
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
          <Button type="submit" loading={isSubmitting} colorPalette="cyan">Add</Button>
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