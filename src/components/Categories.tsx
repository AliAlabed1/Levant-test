import { useEffect, useState } from "react"
import { userApi } from "../api/axios"
import { Category } from "../types/types"
import CategoryCard from "./CategoryCard"

const Categories = ({resturantId:id}:{resturantId:string}) => {
    const [categories,setCategories] = useState([])
    const fetchCategories = async () =>{
        try {
            const res = await userApi.get(`show_restaurant_categories?restaurant_id=${id}`)
            const data = res.data.data
            setCategories(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchCategories()
    },[])
    return (
        <div className="flex flex-col md:flex-row md:flex-wrap w-full gap-10 mb-[50px] mx-auto">
          {
            categories?.map((cat:Category)=>(
                <CategoryCard category={cat} key={cat.id} />
            ))
          }  
        </div>
    )
}

export default Categories
