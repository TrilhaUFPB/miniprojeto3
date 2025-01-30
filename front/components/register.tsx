"use client"

import { useState } from "react"
import { setCookie } from 'cookies-next/client';

import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Register = {
    name: string
    password: string
}

export default function Register() {
    const [name, setName] = useState("")
    const [pass, setPass] = useState("") 

    function handleLogin() {
        fetch("http://localhost:8000/api/user/login", {
            "method": "POST",
            "body": JSON.stringify({"name": name, "password": pass}),
            "headers": {"Content-type": "application/json"}
        }).then((e) => {setCookie("session", {"name": name, "password": pass})})
    }

    return (
        <div>
            <Input onChangeCapture={(e) => setName(e.currentTarget.value)} placeholder="name"></Input>
            <Input onChangeCapture={(e) => setPass(e.currentTarget.value)} placeholder="password"></Input>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    )
}
  