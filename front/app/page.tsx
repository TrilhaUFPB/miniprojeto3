"use client"

import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

import Post from "@/components/post";
import Register from "@/components/register";

export default function Home() {
  const [data, setData] = useState([])
  const [loggin, setLoggin] = useState(false)

  useEffect(
    () => {
      const a = getCookie("session")

      if (a) {
        fetch("http://localhost:8000/api/post/").then(async (e) => {
          const res = await e.json()
          setData(res)
          console.log(res)
        })

        setLoggin(true)
      }
    }, []
  )  

  return (
    <div>
      <Register/>
      <Post post_data={data} id_user={1}/>
    </div>
  );
}
