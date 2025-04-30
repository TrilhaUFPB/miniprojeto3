import { Button } from "./ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Spinner from "./spinner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input";

import { useState } from "react";

type User = {
    id_user: number
    name: string
    password: string
}

type Interaction = {
    id_user: number
    id_post: number
    id_intc: number
    is_like: boolean
    user: User
}

type PostData = {
    id_post: number
    id_user: number
    content: string
    user: User
    interaction: Array<Interaction>
}

type Data = {
    post_data: Array<PostData>
    id_user: number
}

export default function Post(
    { post_data, id_user }: Data
) {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState("")

    function handlePost() {
        setLoading(true)

        fetch("http://localhost:8000/api/post", 
            {
                "method": "POST",
                "body": JSON.stringify(
                    {
                        "content": post, 
                        "id_user": id_user
                    }
                ),
                "headers": {"Content-type": "application/json"}
            }
        ).then(async (e) => {
            const response = await e.json()
            console.log(response)
            window.location.reload()
        }).catch(async (e) => {
            const response = await e.json()
            console.log(response)
            window.location.reload()
        })
    }

    function handleInteraction(
        is_like: boolean, 
        id_user: number, 
        id_post: number, 
    ) {
        setLoading(true)

        fetch("http://localhost:8000/api/interaction", 
            {
                "method": "POST",
                "body": JSON.stringify(
                    {
                        "is_like": is_like, 
                        "id_post": id_post,
                        "id_user": id_user
                    }
                ),
                "headers": {"Content-type": "application/json"}
            }
        ).then(async (e) => {
            const response = await e.json()
            console.log(response)
            setLoading(false)
            window.location.reload()
        })
    }

    function handleExcluir(id_post: number){
        setLoading(true)

        fetch(`http://localhost:8000/api/post/${id_post}`,{
            "method": "DELETE"
        }).then(async (e) => {
            const response = await e.json()
            console.log(response)
            setLoading(false)
            window.location.reload()
        })   
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-6 p-6">
            <div className="overflow-y-auto max-h-[75vh] pr-2">
                    {
                        post_data.map((post) => (
                            <div key={post.id_post}>
                                <div className="flex items-center justify-between items-center mb-2">
                                    <div className="font-bold text-gray-800">
                                        {post.user.name}
                                    </div>
                                    { 
                                        post.id_user == id_user ? (
                                            <div className="flex items-center justify-between space-x-2">
                                                <Button onClick={() => handleExcluir(post.id_post)}size="sm" className="bg-red-500 hover:bg-red-600 active:bg-red-700">
                                                    {loading ? <Spinner/> : <p>Excluir</p>}
                                                </Button>
                                            </div>
                                        ) : null
                                    }
                                </div>

                                <div className="text-gray-600 mb-4 ml-4">
                                    {post.content}
                                </div>

                                <div className={`flex items-center justify-between ${post.id_user == id_user ? "flex-row-reverse": ""}`}>
                                {
                                    post.id_user != id_user ? (
                                            <div>
                                                <Button onClick={() => handleInteraction(true, id_user, post.id_post)}  size="sm" className="bg-green-500 hover:bg-green-600 active:bg-green-700">
                                                    {loading ? <Spinner/> : <p>Like</p>}
                                                </Button>
                                                <Button onClick={() => handleInteraction(false, id_user, post.id_post)}  size="sm" className="bg-red-500 hover:bg-red-600 active:bg-red-700 ml-2">
                                                    {loading ? <Spinner/> : <p>Dislike</p>}
                                                </Button>
                                            </div>
                                    ): null
                                }

                                <Popover>
                                    <PopoverTrigger className="text-3xl">
                                        ...
                                    </PopoverTrigger>
                                        <PopoverContent>
                                            <p className="flex items-center justify-center">Reações</p>
                                            <hr className="mt-2 mb-2"/>
                                            {
                                                post.interaction.map((e) => (
                                                    <div key={e.id_intc} className="flex items-center justify-between mb-2">
                                                        {e.user.name || "Anônimo"}
                                                        {
                                                            e.is_like === true ? 
                                                                <Button size="sm" className="bg-green-500 hover:bg-green-600 active:bg-green-700"> 
                                                                    Like
                                                                </Button> : 
                                                                <Button size="sm" className="bg-red-500 hover:bg-red-600 active:bg-red-700"> 
                                                                    Dislike
                                                                </Button>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <hr className="mt-5 mb-5"/>
                            </div>
                        ))
                    }
        </div>
        <div className="flex justify-center">
            <Dialog>
                <DialogTrigger asChild>                
                    <Button className="rounded-full">Criar Postagem</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Postagem</DialogTitle>
                    </DialogHeader>

                    <Input onChangeCapture={(e) => {setPost(e.currentTarget.value)}} placeholder="conteúdo"/>
                    <Button onClick={handlePost}>{loading ? <Spinner/> : <p>Criar</p>}</Button>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    )
}
  