import { Link, useParams } from "react-router-dom"
import { userApi } from "../api/axios"
import { useEffect, useState } from "react"
import Loader from "./Loader"
import { Item } from "../types/types"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Button } from "./ui/button"

const Items = () => {
    const {id} = useParams()
    const [loading,setLoading] = useState<boolean>(false)
    const [items,setItems] = useState<Item[]>([])
    const fetchItems=async()=>{
        setLoading(true)
        try {
            const res = await userApi.get(`show_items?category_id=${id}`);
            setItems(res.data.data)
            if(!res.data.data.length){
                const res = await userApi.get(`show_items?category_id=309`);
                setItems(res.data.data)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchItems();
    },[])
    if(loading) return <Loader/>
    if(!items.length) return <div className="flex flex-col mt-20 justify-center items-center">
                                <p className="text-red-600 p-10">No Items Found</p>
                                <Link to={'/guest'}>
                                    <Button>Back</Button>
                                </Link>
                            </div>
    return (
        <div className="flex justify-center items-center flex-col gap-5 mt-20">
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="w-[240px] h-[320px]"
            >
                {
                    items?.map((item:Item)=>(
                        <SwiperSlide  key={item.id} className="flex flex-col bg-white text-center justify-center items-center rounded-lg border-2">
                            <img src={item.image} className="h-[80%] w-full" alt="" />
                            <p>{item.name}</p>
                            <p className="text-light">{item.price}</p>
                        </SwiperSlide>
                
                    ))
                }
                
            </Swiper>
            <Link to={'/guest'}>
                <Button>Back</Button>
            </Link>
        </div>
    )
}

export default Items
