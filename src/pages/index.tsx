import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'
import NewUserForm from '../components/NewUserForm'

const inter = Inter({ subsets: ['latin'] })

type User = {
  id: number
  name: string
  email: string
}

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export default function Home() {
  const { data } = useQuery<{users: User[]}>(GET_USERS)

  return (
    <div>
      <ul>
        {data?.users.map(user => <li key={user.id}>{user.name} | {user.email}</li>)}
      </ul>
      <NewUserForm />
    </div>
  )
}
