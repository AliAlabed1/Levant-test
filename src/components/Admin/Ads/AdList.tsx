import { useEffect, useState } from "react";
import {adminApi, userApi} from "../../../api/axios";
import { Advertisement } from "../../../types/types";
import AdCard from "../../AdCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import Loader from "../../Loader";


const AdList = ({userType}:{userType:string}) => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading,setLoading] = useState<boolean>(false)
  const fetchAds = async () => {
    try {
      setLoading(true)
      const api = userType ==='admin' ? adminApi : userApi
      const link = userType === 'admin'? 'show_advertisements' : `show_advertisements?restaurant_id=34`
      const { data:{data} } = await api.get(link,
        {
          headers:{
            Accept:'application/json',
            Authorization:`Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      setAds(data);
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    fetchAds();
  }, []);

  if(loading) return <Loader/>
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full">
      {
        userType==='admin'? ads.map((ad:Advertisement)=>(
          <AdCard userType="admin" ad={ad} key={ad.id} onDeleteSuccess={fetchAds}/>
        )):(
          <Carousel 
            className=" max-w-[85%] md:max-w-[80%]  mx-auto"
            
          >
            <CarouselContent>
              {ads.map((ad:Advertisement) => (
                <CarouselItem className="md:basis-1/2 hover:cursor-pointer" key={ad.id}>
                  <AdCard ad={ad} userType="guest"/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )
      }
      
    </div>
  );
};

export default AdList;
