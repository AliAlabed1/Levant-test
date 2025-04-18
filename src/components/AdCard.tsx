import { Link, useNavigate } from 'react-router-dom';
import { Advertisement } from '../types/types'
import { Button } from './ui/button'
import { adminApi } from '../api/axios';
import { useState } from 'react';

const AdCard = ({ad,userType,onDeleteSuccess}:{ad:Advertisement,userType:string,onDeleteSuccess?:()=>void}) => {
    const navigate = useNavigate()
    const [loading,setIsLoading] = useState<boolean>(false)
    const handleDelete = async (id: number) => {
        setIsLoading(true)
        const res = await adminApi.delete(`delete_advertisement?id=${id}`,{
            headers:{
                Accept:'application/json'
            }
        })
        navigate('/admin/dashboard')
        
        if (onDeleteSuccess) onDeleteSuccess();
        setIsLoading(false)
    };
    return (
        
        <div key={ad.id} className="border w-full m-2 md:w-[500px] h-[400px] p-4 rounded shadow">
            <Link to={ userType === 'admin' ? `/admin/dashboard/view_ad/${ad.id}`:''}>
                <img src={ad.image} alt={ad.title} className="w-full h-[300px] object-cover" />
                <h3 className="text-lg font-semibold mt-2">{ad.title}</h3>
            </Link>
            {
                ad.hide_date === 1 && userType !=='admin' &&
                <div>
                    <p className='font-light'>From:{ad.from_date}</p>
                    <p className='font-light'>To:{ad.to_date}</p>
                </div>
            }
            {
            userType ==='admin'&&
            <div className="flex gap-2">
                <Button
                    onClick={() => handleDelete(ad.id)}
                    disabled={loading}
                >
                    {loading?"Deleting...":"Delete"}
                </Button>
                <Button
                    onClick={() => navigate(`/admin/dashboard/edit_ad/${ad.id}`)}
                >
                    Edit
                </Button>
            </div>  
            }
        </div>
  )
}

export default AdCard
