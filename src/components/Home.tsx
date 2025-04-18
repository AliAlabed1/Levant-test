import { useEffect, useState } from "react"
import { userApi } from "../api/axios"
import Loader from "./Loader"
import { toast } from "sonner"
import AdList from "./Admin/Ads/AdList"
import Categories from "./Categories"

const Home = () => {
  const [loading,setLoading] = useState<boolean>(false)
  const [restuarandData,setRestaurantData] = useState<any>()
  const fetchRestaurant = async()=>{
    try {
      setLoading(true)
      const res = await userApi.get('show_restaurant_by_name_or_id?restaurant_name=AhmedLink',{
        headers:{
          Accept:'application/json'
        }
      })
      setRestaurantData(res.data.data)
      setLoading(false)
    } catch (error) {
      toast.error('Unexpected Error')
    }
  }
  useEffect(()=>{
    fetchRestaurant();
  },[])
  if(loading) return <Loader/>
  return (
    <div className='flex p-10 w-full flex-col gap-10 pb-20 min-h-dvh'>
      <div className='flex gap-3 items-center'>
        <h1 className='text-lg md:text-3xl font-bold'>Welcome to {restuarandData?.name_en} Resturant</h1>
        <img src={restuarandData?.logo} alt="" className="w-[50px] h-[50px]  rounded-full" />
      </div>
      <AdList userType="guest"/>
      <Categories resturantId={restuarandData?.id} />
    </div>
  )
}

export default Home
