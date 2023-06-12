import Link from "next/link";
import LoginSVG from 'public/assets/login.svg';

export default function Login() {
    return (
        <div className="flex flex-row pt-20 justify-center">
             <div className='hidden md:block justify-center'>
                <LoginSVG width='20rem' height='20rem' />
            </div>
            <div className="flex flex-col justify-center items-center">
            <div className="text-4xl font-semibold">Welcome back, <span className="text-primary font-bold">friend!</span></div>
            <input type="text" placeholder="Username" className="border border-gray rounded-lg px-2 py-1 mt-4 w-96" />
            <input type="password" placeholder="Password" className="border border-gray rounded-lg px-2 py-1 mt-4 w-96" />
            <button className="rounded-full text-center text-white text-2xl font-semibold inline hover:bg-secondaryDark bg-secondary px-5 py-2 mt-4">Login</button>
            <div className="text-sm font-medium text-grayDark">New here? <Link href="/signup" className="inline underline hover:no-underline">Sign up!</Link></div>
            </div>
        </div>
    )
}