
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ItemsCard = ({ item, len, refetch }) => {
  let count = len + 1;
  const axiosSecure = useAxiosSecure();
  const { name, price, _id } = item;
  const handleDeleteUser = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${_id}`).then((res) => {
          refetch();
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
 
  return (
    <>
      <tr>
        <th>{count}</th>
        <td>{name}</td>
        <td>$ {price}</td>
        <td>
          <Link to={`/dashboard/updateItems/${item._id}`}>
            <FaEdit className="text-2xl text-orange-400" />
          </Link>
        </td>
        <td>
          <button onClick={() => handleDeleteUser(_id)}>
            <FaTrash className="text-2xl text-red-400" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ItemsCard;
