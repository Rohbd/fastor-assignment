import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    const [number, setNumber] = useState('')

    const handleLoginEvent = () => {
        if (number.length < 10) {
            toast.error('Enter 10 digit number!')
            return
        }

        const reqBody = {
            phone: number,
            dial_code: '.91'
        }

        axios
            .post('https://staging.fastor.in/v1/pwa/user/register', reqBody)
            .then(() => {
                toast.success('OTP successfully sent')
                navigate(`./otp-form?number=${number}`)
            })
            .catch(err => {
                toast.error(err)
            })
    }

    return (
        <div className="flex flex-col px-5 justify-center items-center w-full h-full">
            <div className="mb-10 w-full">
                <h1 className="text-dark-gray text-[26px] font-bold tracking-tight leading-8">
                    Enter Your Mobile Number
                </h1>

                <p className="text-light-gray text-base leading-6">
                    We will send you the 4-digit verification code
                </p>
            </div>

            <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full rounded-lg border border-gray-300 bg-dim-gray p-5 mb-5"
                onChange={event => setNumber(event.target.value)}
            />

            <button
                className="bg-light-red text-white rounded-lg w-full py-5"
                onClick={handleLoginEvent}
            >
                Send Code
            </button>
        </div>
    )
}

export default Login
