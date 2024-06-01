import { useContext } from "react";
import { AuthContext } from './../Provider/AuthProvider';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from './../Hooks/useAxiosSecure';
import useCart from "../Hooks/useCart";

const FoodCard = ({ item }) => {
  const useAxios = useAxiosSecure()
  
  const {user} = useContext(AuthContext)
  const { name, recipe, price, image,_id } = item;
  const [, refetch] = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const handleAddToCart = food => {
    if(user && user?.email) {
      const foods = {
        foodId: _id,
        email: user?.email,
        userName: user?.displayName,
        foodName: name,
        recipe: recipe,
        price: price,
        image: image,
      }
      useAxios.post('/carts',foods)
      .then( res => {
        if(res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
        }
       
      })
    } else {
      Swal.fire({
        title: "You are not Logged in",
        text: "Please login to login the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(location?.state ? location?.state : "/login")
        }
      });
    }
  }
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 bg-slate-900 text-white rounded mt-4 mr-4 px-4">
        {price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>

        <div className="card-actions justify-start">
          <button onClick={() => handleAddToCart(item)} className="btn text-white bg-orange-500 hover:bg-orange-400">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
