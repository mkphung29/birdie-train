import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Progress() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const rankings = [data.rank1, data.rank2, data.rank3, data.rank4];

    const uniqueRankings = new Set(rankings);
    if (uniqueRankings.size !== rankings.length) {
      alert("Each ranking must be unique!");
      return;
    }

    // Set a mock user ID (the same as in your backend middleware)
    const mockUserId = "64c5e5c18f293dfed5a4d620"; 

    try {
      const response = await fetch('http://localhost:8080/api/rankings', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rankings, userId: mockUserId, }),
      });

      if (response.ok) {
        alert("Rankings saved successfully!");
        navigate("/");
      } else {
        const error = await response.json();
        alert(`Error saving rankings: ${error.message}`);
      }
    } catch (err) {
      console.error("Error saving rankings:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-[#c0d0b0] font-poppins min-h-screen p-6">
      <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-[#c0d0b0]">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full" />
      </div>

      <h2 className="mt-11 text-4xl font-bold text-teal-900 text-center">
        Rank Your Golf Skills
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-amber-100 border-4 border-green-800 rounded-xl"
      >
        {["1st Most Confident", "2nd Most Confident", "3rd Most Confident", "Least Confident"].map(
          (label, index) => (
            <div key={index}>
              <label className="block text-lg font-semibold text-green-800">
                {label}
              </label>
              <select
                {...register(`rank${index + 1}`, { required: true })}
                className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
              >
                <option value="">Select</option>
                <option value="tee shots">Tee Shots</option>
                <option value="approach shots">Approach Shots</option>
                <option value="chipping">Chipping</option>
                <option value="putting">Putting</option>
              </select>
            </div>
          )
        )}

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-green-800 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 mx-auto block"
        >
          Save Rankings
        </button>
      </form>
    </div>
  );
}
