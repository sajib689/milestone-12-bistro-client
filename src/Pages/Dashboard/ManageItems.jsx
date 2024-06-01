import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ItemsCard from "../../Components/ItemsCard";


const ManageItems = () => {
    const axiosPublic = useAxiosPublic()
    const {data: items =[],refetch} =  useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu')
            return res.data
        }
    })

    return (
        <div className="mt-12 ms-24">
      <div className="flex justify-evenly items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
        <h1 className="text-2xl font-bold">Total Items: {items.length}</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                items.map((item,index) => <ItemsCard len={index} refetch={refetch} key={item._id} item={item}/>)
              }
              
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default ManageItems;