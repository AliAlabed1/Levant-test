import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi,userApi } from "../api/axios";
import { Advertisement } from "../types/types";
import { Button } from "./ui/button";

const ViewAd = ({userType}:{userType:string}) => {
  const { id } = useParams();
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const api = userType ==='admin'? adminApi : userApi
        const res = await api.get(`/show_advertisement?id=${id}`);
        setAd(res.data.data);
      } catch (err) {
        console.error("Failed to fetch advertisement", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAd();
  }, [id]);
  const navigate = useNavigate()
  if (loading) return <div className="p-6">Loading...</div>;
  if (!ad) return <div className="p-6 text-red-500">Advertisement not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold mb-2">{ad.title}</h2>

      <div className="space-y-2">
        <p><strong>From:</strong> {ad.from_date}</p>
        <p><strong>To:</strong> {ad.to_date}</p>
        <p><strong>Restaurant:</strong> {ad.restaurant}</p>
        <p><strong>Is Panorama:</strong> {ad.is_panorama === 1 ? "Yes" : "No"}</p>
        <p><strong>Hide Date:</strong> {ad.hide_date === 1 ? "Yes" : "No"}</p>
      </div>

      <div>
        <strong>Image:</strong>
        <img
          src={ad.image}
          alt={ad.title}
          className="mt-2 max-w-full rounded border w-full h-[280px]"
        />
      </div>
      <Button onClick={()=>{
        userType === 'admin' ?
        navigate('/admin/dashboard'):
        navigate('/')
      }}>Home</Button>
    </div>
  );
};

export default ViewAd;
