import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../queries/userQueries";

export default function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [addUser, {data, loading, error}] = useMutation(ADD_USER, {
        variables: {
            name: name,
            username: username,
            email: email,
            password: password
        }
    });

    const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (name === '' || username === '' || password === '' || email === '') {
            alert("Please enter all information!")
        }
        addUser({ variables: { name: name, username: username, email: email, password: password} });
        
        loading ?? console.log("Loading...");
        error ?? console.log(error);
        data ?? console.log(data);
        setName("");
        setUsername("");
        setPassword("");
        setEmail("");
    }

    return (
        <div className="pt-20 flex flex-col justify-center items-center">
            <div className="text-4xl font-semibold">Welcome to <span className="text-primary font-bold">prescriphis</span><span className="text-secondary font-bold">+</span></div>
            <div className="text-base font-semibold">Create an account to get started.</div>
            <input type="text" placeholder="Full Name" className="border border-gray rounded-lg px-2 py-1 mt-4 w-96" value={name} onChange={(e) => (setName(e.target.value))} />
            <input type="text" placeholder="Email" className="border border-gray rounded-lg px-2 py-1 mt-4 w-96" value={email} onChange={(e) => (setEmail(e.target.value))} />
            <input type="text" placeholder="Username" className="border border-gray rounded-lg px-2 py-1 mt-4 w-96" value={username} onChange={(e) => (setUsername(e.target.value))} />
            <input type="password" placeholder="Password" className="border border-gray rounded-lg px-2 py-1 mt-4 w-96" value={password} onChange={(e) => (setPassword(e.target.value))} />
            <button className="rounded-full text-center text-white text-2xl font-semibold inline hover:bg-secondaryDark bg-secondary px-5 py-2 mt-4" onClick={onSubmit}>Sign up</button>
            <div className="text-sm font-medium text-grayDark">Already have an account? <Link href="/login" className="inline underline hover:no-underline">Log in</Link></div>
        </div>
    )
}