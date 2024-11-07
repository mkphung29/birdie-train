import React from 'react';
import { useForm } from 'react-hook-form';

export function AddRound(){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try{
            const response = await fetch('/api/rounds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if(response.ok){
                alert('Round added successfully!');
                reset();
            }else{
                alert('Failed to add round.');
            }
        }catch(error){
            console.error('Error: ', error);
            alert('Error adding round.');
        }
    }

    return(
        <div>
            <h2>Add Round</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Course Name</label>
                <input type="text" {...register("courseName")}/>
                <label>Date</label>
                <input type="date" {...register("date")}/>
                <label>Score</label>
                <input type="number" {...register("score")}/>
                <label>Yardage</label>
                <input type="number" {...register("yardage")}/>
                <label>Course Par</label>
                <input type="number" {...register("coursePar")}/>
                <label>Course Rating</label>
                <input type="number" {...register("courseRating")}/>
                <label>Slope Rating</label>
                <input type="number" {...register("slopeRating")}/>
                <label>Fairways</label>
                <input type="number" {...register("fairways")}/>
                <label>Greens in Regulation</label>
                <input type="number" {...register("GIRs")}/>
                <label>Up and Downs</label>
                <input type="number" {...register("upAndDowns")}/>
                <label>Putts</label>
                <input type="number" {...register("putts")}/>
            </form>   
            <button type="submit">Save Round</button>
        </div>
    );
}