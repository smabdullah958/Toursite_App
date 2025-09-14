//this is specially used to add a am and a pm bro
function to12Hour(time24) {
  const [hh, mm] = time24.split(":").map(Number);
  const ampm = hh >= 12 ? "PM" : "AM";
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${hour12}:${mm.toString().padStart(2, "0")} ${ampm}`;
}


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let PostImageThunck=createAsyncThunk(
        "postDestination",
async(Data)=>{
    try{
            let formData=new FormData()
            formData.append("Title",Data.Title);
            formData.append("BasePrice",Data.BasePrice);
            formData.append("Description",Data.Description);
            formData.append("Slots",Data.Slots);
            formData.append("Image",Data.Image[0]);
                        
//this is specially used to add a am and a pm bro
    (Data.TravelTimes || []).forEach((t, index) => {
  const raw = typeof t === "string" ? t : (t.time ?? "");
  const timeWithAmPm = to12Hour(raw);

  if (timeWithAmPm) {
    // send as object with "time" field
    formData.append(`TravelTimes[${index}][time]`, timeWithAmPm);
  }
});


     let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/Post`,formData,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true
     })
     console.log(response.data)
     return response.data   
    }
    catch(error){
        console.log(error)
    }
}
)
export default PostImageThunck