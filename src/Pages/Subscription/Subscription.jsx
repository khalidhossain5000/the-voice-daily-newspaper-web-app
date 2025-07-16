import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
const subscriptionOptions = [
  { duration: "1 minitue", price: 49 },
  { duration: "5 days", price: 99 },
  { duration: "10 days", price: 149 },
];

const Subscription = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const selectedDuration = watch("duration");
  const selectedPlan = subscriptionOptions.find(
    (p) => p.duration === selectedDuration
  );
  //   console.log("this is duration",selectedDuration,'selectd plsn',selectedPlan);
  const onSubmit = () => {
    navigate("/payment", {
      state: {
        amount: selectedPlan?.price,
        duration: selectedPlan?.duration,
      },
    });
  };
  return (
    <div className="">
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-tr from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-4">
          <h1 className="text-[#211F54] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Stay Informed. Stay Ahead.
          </h1>
          <p className="text-[#211F54] text-lg md:text-xl mb-6">
            Go Premium and Get Access to Unlimited Articles, Unlimited Voice —
            Start Your Journey.
          </p>
          <button className="bg-[#211F54] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300">
            Subscribe Now
          </button>
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* 2. Subscription Form */}

      <div className="px-3 md:px-0">
        <div className="my-14 lg:my-24 w-full max-w-xl mx-auto bg-gradient-to-br from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] shadow-2xl p-10 rounded-2xl border-t-4 border-b-4 border-[#211F54]">
        <h3 className="text-3xl font-serif text-[#211F54] mb-8 text-center tracking-wide">
          Choose Your Plan
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-8">
            <select
              {...register("duration")}
              defaultValue=""
              className="w-full appearance-none px-5 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-lg font-medium focus:outline-none focus:border-[#211F54] transition"
            >
              <option value="" disabled>
                Select duration (Days)
              </option>
              {subscriptionOptions.map((opt, i) => (
                <option key={i} value={opt.duration}>
                  {opt.duration} Days
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <p className="text-center text-xl font-semibold text-[#211F54] mb-8">
            Price:&nbsp;
            <span className="text-green-600">
              ${selectedPlan ? selectedPlan.price : 0}
            </span>
          </p>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#211F54] to-[#433D7E] text-white font-semibold rounded-full shadow-lg hover:opacity-95 transition cursor-pointer"
          >
            Subscribe Now
          </button>
        </form>
      </div>
      </div>

      {/* BELOW OLD CODE */}

      {/* <div className="max-w-6xl mx-auto p-6">
        

       
        <section className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select
              {...register("duration")}
              className="select w-full mb-4"
              defaultValue=""
            >
              <option value="" disabled>
                Select a duration in Days
              </option>
              {subscriptionOptions.map((options, i) => (
                <option key={i} value={options.duration}>
                  {options.duration}
                </option>
              ))}
            </select>
            <p className="mb-4 font-bold">
              Price:{" "}
              <span className="font-bold text-green-700">
                ${selectedPlan ? selectedPlan.price : 0}
              </span>
            </p>
            <button type="submit" className="btn btn-primary w-full">
              Subscribe Now
            </button>
          </form>
        </section>
      </div> */}
    </div>
  );
};

export default Subscription;
