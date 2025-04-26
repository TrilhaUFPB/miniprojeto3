"use client"

import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

import Post from "@/components/post";
import Register from "@/components/register";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [data, setData] = useState([])
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(
    () => {
      const cookie = getCookie("session")

      if (cookie) {
        fetch("http://localhost:8000/api/post/").then(async (e) => {
          const res = await e.json()
          setData(res)
          console.log(res)
        }).catch(() => {
          setLogin(false)
        })

        setLogin(true)
        setLoading(false)
      } else { 
        setLogin(false) 
        setLoading(false)
      }
    }, 
    []
  )  

  return (
    <div>
      { 
        loading == true ? <Skeleton/> : 
          (
            login == false ? <Register/> : null 
          )
      }
      <Post post_data={data} id_user={1}/>
    </div>
  );
}
