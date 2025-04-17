import Card from './Card'
import {listData} from '../lib/dummyData.js'

function List({posts}){
  // console.log(posts)
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item._id} item={item}/>
      ))}
    </div>
  )
}

export default List