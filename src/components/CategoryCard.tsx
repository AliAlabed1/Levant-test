import { Link } from 'react-router-dom'
import { Category } from '../types/types'

const CategoryCard = ({category}:{category:Category}) => {
  return (
    <Link to={`/guest/cat_item/${category.id}`}>
        <div className='flex flex-col items-center  bg-white w-full md:w-[400px]  rounded-md border-2 shadow  p-12'>
            <img src={category.image} alt="cat_img" className='w-[300px] h-[200px]'  />
            <h3 className='text-2xl font-bold'>{category.name}</h3>
        </div>
    </Link>
  )
}

export default CategoryCard
