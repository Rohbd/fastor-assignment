import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const OTPVerification = () => {
  const navigate = useNavigate();
  const inputRefs = useRef(Array(6).fill(""));

  const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState(Array(6).fill(""));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 5 && value !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpEvent = () => {
    const reqBody = {
      phone: searchParams.get("number"),
      otp: otp.join(""),
      dial_code: ".91",
    };
    axios
      .post("https://staging.fastor.in/v1/pwa/user/login", reqBody)
      .then((res) => {
        if (res.data.status === "Success") {
          toast.success("Successfully logged in");
          localStorage.setItem("token", res.data.data.token);
          navigate(`/restaurant`, { state: { data: res.data.data } });
        } else {
          toast.error("Invalid OTP");
        }
      });
  };

  return (
    <div className="flex flex-col px-5 justify-center items-center w-full h-full">
      <div className="mb-5 w-full">
        <h1 className="text-dark-gray text-[26px] font-bold tracking-tight leading-8">
          OTP Verification
        </h1>

        <p className="text-light-gray text-base leading-6">
          Enter the verification code we just sent on your Mobile Number.
        </p>
      </div>

      <div className="w-full h-15 mb-10 grid grid-cols-6 gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            max={9}
            min={0}
            type="number"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className="w-full h-full rounded-lg border border-gray-300 bg-dim-gray text-lg font-semibold text-center"
          />
        ))}
      </div>

      <button
        className="bg-light-red text-white rounded-lg w-full py-5 mb-5"
        onClick={handleOtpEvent}
      >
        Verify
      </button>

      <div className="text-[15px] leading-[21px]">
        <span className="text-dark-gray">Didn’t received code? </span>
        <span className="text-[#5574C6] font-bold cursor-pointer">Resend</span>
      </div>
    </div>
  );
};

export default OTPVerification;
