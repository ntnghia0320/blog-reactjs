interface UserRegister{
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

interface UserLogin{
    email: string,
    password: string
}

interface UserInfo{
    userId: number,
    token: string,
    type: string,
    email: string,
    role: string
}

interface User{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: Role
}

interface Role{
    id: number,
    name: string
}

interface Category{
    id: number,
    name: string
}

interface Post{
    id?: number;
    title: string,
    content: string,
    createAt: string,
    updateAt?: string,
    tags: Tag[],
    user?: User,
    category?: Category,
    active?: boolean
}

interface Tag{
    id?: number,
    name: string
}

type AddTag = (tag: Tag) => void;