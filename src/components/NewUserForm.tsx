import { gql, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"
import { GET_USERS } from "../pages";


/* type CreateUserInput = {
    name: string
    email: string
    password: string
} */

const CREATE_USER = gql`
    mutation CreateUser ($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            name
            email
            password
        }
    }
`;

export default function NewUserForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER)
    
    async function handleCreateUser(event: FormEvent) {
        event.preventDefault()
        await createUser({
            variables: {
                "createUserInput": {
                    "name": name,
                    "email": email,
                    "password": password
                }
            },
            refetchQueries: [GET_USERS]
        })
    }

    return (
        <form onSubmit={handleCreateUser}>
            <label htmlFor="">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

            <label htmlFor="">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

            <button type="submit">Save</button>
        </form>
    )
}