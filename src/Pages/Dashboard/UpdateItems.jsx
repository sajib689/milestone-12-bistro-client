import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItems = () => {
    const axiosPublic = useAxiosSecure()
    const menuUpdate = useLoaderData()
    console.log(menuUpdate)
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      
    } = useForm();
    const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      const res = await axiosPublic.post(image_hosting_api,formData)
      if(res.data.success) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url
        }
        axiosPublic.put(`/menu`,menuItem)
        .then(res => {
          console.log(res.data)
          if(res.data) {
            reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    };
    return (
        <div>
      <h1 className="text-3xl text-center mt-12 mb-12">Update Item</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="ms-12 me-12">
        <input
          type="text"
          {...register("name",{ required: true })}
          placeholder="Recipe Name"
          className="input input-bordered input-md w-full max-w-[650px] mb-3"
        />
        <select defaultValue='default'
          {...register("category", { required: true })}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled value='default'>
            Select Category
          </option>
          <option value="salad">Salad</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="dessert">Dessert</option>
          <option value="drinks">Drinks</option>
        </select>
        {errors.category && <span>This field is required</span>}
        <input
          type="text"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered input-md w-full max-w-xs mb-3 ms-3"
        />
        <textarea
         {...register("recipe", { required: true })}
          placeholder="Recipe Details"
          className="textarea textarea-bordered textarea-lg w-full max-w-[650px]"
        ></textarea>
        <input {...register("image", { required: true })} type="file" placeholder="You can't touch this" className="file-input file-input-bordered w-full max-w-xs" />
        <div>
        <button className="btn btn-success text-white mt-3">Update Item
        <FaUtensils/>
        </button>
        </div>

      </form>
    </div>
    );
};

export default UpdateItems;