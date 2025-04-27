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
    const [response, setResponse] = useState("")

    function clearState() {
        setName("")
        setPass("")
        setResponse("")
    }

    function handleLogin() {
        fetch("http://localhost:8000/api/user/login", 
            {
                "method": "POST",
                "body": JSON.stringify({"name": name, "password": pass}),
                "headers": {"Content-type": "application/json"}
            }
        ).then(async (e) => {
            const response = await e.json()
            
            if (e.status != 200) {
                clearState()
                setResponse("Erro ao realizar o login.")
            }
            else {
                setCookie("session", response)
                window.location.reload()
            }
        })
    }

    function handleRegister() {
        fetch("http://localhost:8000/api/user/", 
            {
                "method": "POST",
                "body": JSON.stringify({"name": name, "password": pass}),
                "headers": {"Content-type": "application/json"}
            }
        ).then((e) => {
            if (e.status != 200) setResponse("Erro ao registrar.")
            else setResponse("Registrado com sucesso. Agore efetue o Login.")
        }).catch((e) => {
            setResponse("Erro ao registrar.")
        })
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-6 p-6">
            <Input className="mb-2" onChangeCapture={(e) => setName(e.currentTarget.value)} placeholder="Name"></Input>
            <Input className="mb-2" type="password" onChangeCapture={(e) => setPass(e.currentTarget.value)} placeholder="Password"></Input>
            
            <p className="text-black-100 text-sm">
                {response}
            </p>
            
            <div className="mt-2 flex justify-between">
                <Button onClick={handleLogin}>Login</Button>
                <Button variant="outline" onClick={handleRegister}>Register</Button>
            </div>
        </div>
    )
}
  