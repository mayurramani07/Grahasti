import React from 'react'
import Filter from '../components/Filter.jsx';
import Card from '../components/Card.jsx';
import Map from '../components/Map.jsx';
import { useLoaderData } from 'react-router-dom';

const ListPage = () => {
  const posts = useLoaderData();

  return (
    <div className='flex justify-center w-full flex-1 h-[91vh]'>

      <div className='flex justify-center w-full max-w-[1280px] h-full p-4 lg:p-8'>
        <div className='lg:w-[60%] h-full lg:overflow-y-scroll'>
          <Filter />
          {posts.map(item => (
            <Card key={item._id} item={item}/>
        ))}
        </div>

        <div className='h-full w-[40%] ml-4 hidden lg:inline'>
          <Map items={posts}/>
        </div>
      </div>
    </div>
  )
}

export default ListPage