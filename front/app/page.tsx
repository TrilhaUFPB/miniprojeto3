"use client"

import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from 'cookies-next/client';

import Post from "@/components/post";
import Register from "@/components/register";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [data, setData] = useState([])
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [id_user, set_id_user] = useState(-1)

  useEffect(() => {
      const cookie = getCookie("session")

      if (cookie) {
        fetch("http://localhost:8000/api/post/").then(async (e) => {
          const res = await e.json()

          setData(res)

          const cookie_json = JSON.parse(cookie)

          set_id_user(cookie_json.id_user)
        }).catch(() => {
          setLogin(false)
        })

        setLogin(true)
        setLoading(false)
      } else { 
        setLogin(false) 
        setLoading(false)
      }
    }, []
  )  
  
  return (
    <div className={`${login == false ? "flex align-center items-center h-[90vh] justify-center" : ""}`}>
      { 
        loading == true ? <Spinner/> : (
            login == false ? <Register/> : (
                id_user != -1 ? 
                  <div>
                    <Button onClick={() => {
                        deleteCookie("session")

                        window.location.reload()
                      }} 
                      className="float-right m-5"
                    >
                        Logout
                    </Button>
                    <Post 
                      post_data={data} 
                      id_user={id_user}
                    /> 
                  </div> : null
            ) 
          )
      }
    </div>
  );
}
