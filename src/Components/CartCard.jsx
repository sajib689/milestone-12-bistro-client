import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";

const CartCard = ({item}) => {
    const {_id} = item;
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()
    const handleDelete = _id => {
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
                axiosSecure.delete(`/carts/${_id}`)
                .then( res => {
                   if(res.data) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Deleted Success.",
                        icon: "success"
                      });
                   }
                   refetch()
                })
            }
          });
        
    }
  return (
    <tr>
     
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={item.image}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          
        </div>
      </td>
      <td>
       {item.foodName}
      </td>
      <td>$ {item.price}</td>
      <th>
        <button onClick={() => handleDelete(_id)} className="btn btn-ghost btn-xs">
            <FaTrash className="text-xl text-red-400"/>
        </button>
      </th>
    </tr>
  );
};

export default CartCard;
