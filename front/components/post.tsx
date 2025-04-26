import { Button } from "./ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
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

export default function Post({ post_data, id_user }: Data) {
    return (
        <div>
          {
            post_data.map((post) => (
                <div key={post.id_post}>
                    <h1>{post.user.name}</h1>
                    <p>{post.content}</p>

                    {
                        post.id_user == id_user ? (
                            <div>
                                <Button variant="secondary">Editar</Button>
                                <Button variant="destructive">Excluir</Button>
                            </div>
                        ):  
                        <div>
                            <Button  variant="secondary">Like</Button>
                            <Button variant="destructive">Dislike</Button>
                        </div>
                    }

                    <Popover>
                      <PopoverTrigger>...</PopoverTrigger>
                        <PopoverContent>
                            {
                                post.interaction.map((e) => (
                                    <div key={post.id_post}>
                                        {e.user.name}, {e.is_like == true ? <p>oi</p> : <p>tchau</p>}
                                    </div>
                                ))
                            }
                        </PopoverContent>
                    </Popover>
                </div>
            ))
          }
      </div>
    )
}
  