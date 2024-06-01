import { FaTrash, FaUser } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UsersCard = ({user,len,refetch}) => {
    let count = len + 1
    const axiosSecure = useAxiosSecure()
    const {_id, email, name} = user
    const handleDeleteUser = _id =>{
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
                axiosSecure.delete('/users', _id)
                .then( res => {
                    console.log(res.data)
                    refetch()
                    if(res.data) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            }
          });
        
    }
    const handleUpdateUser = _id => {
        axiosSecure.patch(`/users/admin/${_id}`,{
            role: 'admin',
        })
        .then( res => {
            if(res.data) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user?.name} is now Admin`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
  return (
    <>
      <tr>
        <th>{count}</th>
        <td>{email}</td>
        <td>{name}</td>
        <td>
            {
                user.role === 'admin' ? 
                <p>admin</p>
                :
                <button onClick={() => handleUpdateUser(_id)}>
                <FaUser className="text-2xl text-orange-400"/>
            </button>
            }
        
        </td>
        <td>
            <button onClick={() => handleDeleteUser(_id)}>
                <FaTrash className="text-2xl text-red-400"/>
            </button>
        </td>
      </tr>
    </>
  );
};

export default UsersCard;
