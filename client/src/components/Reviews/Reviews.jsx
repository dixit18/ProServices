/* eslint-disable react/prop-types */
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
// import requests from "../../libs/request";
// import Review from "./Review/Review";
import loader from "../../assets/icons/loader.svg";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { toast } from "react-toastify";
// import useAuthStore from "../../stores";

// const Reviews = ({ serviceId }) => {
//   const { authUser } = useAuthStore();

//   let currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const [loading, setLoading] = useState(false);
//   const { isLoading, error, data, refetch } = useQuery({
//     queryKey: ["reviews"],
//     queryFn: () =>
//       Axios.get(`${requests.reviews}/${serviceId}`).then((res) => {
//         return res.data;
//       }),
//   });

//   const initialValues = {
//     desc: "",
//     star: "",
//     serviceId: serviceId,
//   };

//   const validationSchema = yup.object({
//     desc: yup.string().required("Required"),
//     star: yup.string().required("Required"),
//   });

//   const onSubmit = async (payload, actions) => {
//     setLoading(true);
//     try {
//       const res = await Axios.post(requests.reviews, payload);
//       toast.success("Thanks for your Review!😊", {
//         position: "bottom-right",
//         toastId: 1,
//         autoClose: 1500,
//       });
//       setLoading(false);
//       refetch();
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       actions.resetForm();
//       return res.data;
//     } catch (error) {
//       setLoading(false);
//       if (error?.response?.data) {
//         toast.error(error?.response?.data, {
//           position: "bottom-right",
//           toastId: 1,
//           autoClose: 1500,
//         });
//       } else {
//         toast.error(error?.response?.message, {
//           position: "bottom-right",
//           toastId: 1,
//           autoClose: 1500,
//         });
//       }
//     }
//   };

//   const { handleChange, values, handleBlur, handleSubmit, errors, touched } =
//     useFormik({
//       initialValues,
//       validationSchema,
//       onSubmit,
//     });

//   return (
//     <div className="w-full flex items-start justify-start flex-col gap-4">
//       {isLoading ? (
//         <div className="flex items-center justify-center w-full">
//           <img src={loader} alt="/" className="w-[40px]" />
//         </div>
//       ) : error ? (
//         <p className="text-2xl text-red-400 font-normal">
//           Error : Something went wrong
//         </p>
//       ) : (
//         <>
//           {data?.length === 0 ? (
//             <div className="flex items-center justify-center mt-5 flex-col w-full">
//               <img
//                 src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png"
//                 alt="/"
//                 className="w-[350px]"
//               />
//               <h2 className="text-xl md:text-4xl text-active font-medium">
//                 Ooops! No Reviews
//               </h2>
//             </div>
//           ) : (
//             data.map((item) => <Review key={item?._id} item={item} />)
//           )}
//         </>
//       )}
//       { (
//         <div className="w-full flex flex-col items-start justify-start gap-4 mt-4 border-t pt-3">
//           <h3 className="text-active text-xl font-semibold">Add a review</h3>
//           <form
//             action=""
//             className="flex items-start flex-col gap-2 justify-start w-full"
//             onSubmit={handleSubmit}
//           >
//             <div className="flex items-end w-full justify-between gap-4 md:flex-row flex-col">
//               <textarea
//                 placeholder="Send your review"
//                 className={`w-full border px-4 py-2 outline-none rounded-md h-[120px] resize-none focus:border-primary ${
//                   errors.desc && touched.desc ? "border-red-500" : ""
//                 }`}
//                 name="desc"
//                 value={values.desc}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 id=""
//                 cols="30"
//                 rows="10"
//               ></textarea>
//               <div className="flex items-start justify-start flex-col">
//                 <label
//                   htmlFor="star"
//                   className="text-sm font-medium cursor-pointer"
//                 >
//                   Rate
//                 </label>
//                 <select
//                   name="star"
//                   id="star"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.star}
//                   className={`border outline-none cursor-pointer px-4 rounded focus:border-primary text-gray-400  h-10 ${
//                     errors.star && touched.star ? "border-red-500" : ""
//                   }`}
//                 >
//                   {["star", 1, 2, 3, 4, 5].map((item, i) => (
//                     <option value={item} key={i}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="outline-none bg-primary/80 hover:bg-primary w-fit px-5 py-2 rounded cursor-pointer text-white transition-all duration-300"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <img src={loader} alt="/" className="w-[40px]" />
//                 </div>
//               ) : (
//                 "Send"
//               )}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reviews;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
// import newRequest from "../../utils/Request";
import { toast } from "react-toastify";

import Review from "./Review/Review";

const Reviews = ({ serviceId }) => {

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
    Axios.get(`/reviews/${serviceId}`).then((res) => {
        return res.data.reviews;
      }),
  });


  const mutation = useMutation({
    mutationFn: async (review) => {
      try {
        const response = await Axios.post("/reviews", review);
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    }
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ serviceId:serviceId, star, desc:desc, });
  };

  return (
    <div className="w-full flex items-start justify-start flex-col gap-4">
    
    
      <h2 className="text-active text-xl font-semibold">Reviews</h2>
      {isLoading
        ? (
                  <div className="flex items-center justify-center w-full">
                    <img src={loader} alt="/" className="w-[40px]" />
                  </div>
                )
        : error
        ? (
                  <p className="text-2xl text-red-400 font-normal">
                    Error : Something went wrong
                  </p>
                )
        :  (
                      data.map((item) => <Review key={item?._id} item={item} />)
                    )}
                 
                
      <div className="w-full flex flex-col items-start justify-start gap-4 mt-4 border-t pt-3">
        <h3 className="text-active text-xl font-semibold">Add a review</h3>
        <form action=""  className="flex items-start flex-col gap-2 justify-start w-full" onSubmit={handleSubmit}>
          <input type="textarea" cols="30"   rows="10" className="flex items-end w-full justify-between gap-4 md:flex-row flex-col" placeholder="write your opinion" />
          <label
                  htmlFor="star"
                  className="text-sm font-medium cursor-pointer"
                >
                  Rate
                </label>
          <select name="star" id="" className={`border outline-none cursor-pointer px-4 rounded focus:border-primary text-gray-400  h-10 `}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button   type="submit" className="outline-none bg-primary/80 hover:bg-primary w-fit px-5 py-2 rounded cursor-pointer text-white transition-all duration-300">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;