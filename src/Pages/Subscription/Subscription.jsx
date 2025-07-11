import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
const subscriptionOptions = [
  { duration: "1 Minute",  price: 49 },
  { duration: "5 Days",  price: 99 },
  { duration: "10 Days",  price: 149 },
  
];

const Subscription = () => {
  const { register, handleSubmit,watch } = useForm();
  const navigate = useNavigate();
  const selectedDuration = watch("duration");
  const selectedPlan = subscriptionOptions.find((p) => p.duration === selectedDuration);
//   console.log("this is duration",selectedDuration,'selectd plsn',selectedPlan);
  const onSubmit = (data) => {
    console.log("this is data of the plan form",data,selectedPlan?.price);
    navigate('/payment',{
      state:{
        amount:selectedPlan?.price,
        duration:selectedPlan?.duration
      }
    })
  };
  return (
    <div>
      <h1 className="text-center font-bold text-5xl py-12">
        WELCOME TO SUBSCRIPTION PAGE OF NEWSPAPER
      </h1>

      <div className="max-w-6xl mx-auto p-6">
        {/* 1. Banner */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-10 mb-10 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold mb-3">
              Go Premium, Unlock Everything!
            </h2>
            <p>Get ad-free access, exclusive articles, and more.</p>
          </div>
          <img src="/your/banner/image.svg" className="w-48" alt="premium" />
        </section>

        {/* 2. Subscription Form */}
        <section className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("duration")} className="select w-full mb-4">
              <option value="Select a duration" disabled defaultValue='Select a duration'>Select a duration</option>
              {
                subscriptionOptions.map((options,i)=><option 
                key={i}
                value={options.duration}>{options.duration}</option>)
              }
              
            </select>
            <p className="mb-4 font-bold">
             Price: <span className="font-bold text-green-700">${
                selectedPlan ? selectedPlan.price : 0
                }</span>
            </p>
            <button type="submit" className="btn btn-primary w-full">
              Subscribe Now
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Subscription;
