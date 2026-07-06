// import react, { createContext } from "react";
// import { useState } from "react";
// import api from "../apis/axiosconfigs";

// export const Otpcontext = createContext();
// export const OtpProvider = async ({ Children }) => {
//   const [otp, setOtp] = useState();
//   try {
//     // const getotp = await api.get("/user/verifyotp");
//     // setOtp(getotp.data);
//   } catch (err) {
//     console.log("not getting otp", err);
//   }

//   return <Otpcontext.Provider value={otp}>{Children}</Otpcontext.Provider>;
// };
