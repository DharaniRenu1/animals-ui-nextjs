import Head from 'next/head'
import CommonForm from './form'

export default function HomePage() {
 
  return (
    <>
      <Head>
        <title>Register your animal</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome, register your animals</h1>
        
      </main>
     <CommonForm
     isEditForm= {false} 
     />
    </>
  )
}
