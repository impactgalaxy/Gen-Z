import { Button } from "@chakra-ui/react";
import { IoMdRemove } from "react-icons/io";
import Swal from "sweetalert2";

export default function DeleteMember() {

    const handleMemberDelete = ()=> {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });

    }

    
  return (
    <div>
      <Button onClick = {handleMemberDelete} colorPalette="red" variant="solid">
                 <IoMdRemove /> Add member
             </Button> 
    </div>
  )
}
