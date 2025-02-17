import Head from 'next/head'
import { Cat } from '@/domain/cat'
import { Table } from 'react-bootstrap'
import { CatsService } from '@/services/api/cats-service'
import Link from 'next/link'
import Search from './search';
import { useState } from "react";

const service = new CatsService()

export default function CatsPage({ cats: initialCats }: { cats: any } ) {
   
  const [cats, setCats] = useState(initialCats)

  const handleSearch = async (search: string) => {
    if(search != '')
    {
      setCats(await service.search(search))
    }
    else
    {
      setCats(await service.all())
    }
  };

  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={'row'}>
          <div className={'col-4'}>
          <h1>View your cats</h1>

          </div>
          <div className={'col-8'}>
          <Search onSearch={handleSearch} />

          </div>
        </div>

        <Table striped bordered hover>
          <thead> 
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cats?.length > 0 &&              
              cats.map((c: Cat) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <Link href={`/cats/${c.id}`} className='btn btn-primary btn-auth0-cta btn-padded'>
                      View
                    </Link>
                  </td>
                </tr>                
              ))}
          </tbody>
        </Table>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
    try {
      const cats = await service.all()
      return { props: { cats } }
    } catch (err) {
      console.log(err)
      return { notFound: true }
    }
}
