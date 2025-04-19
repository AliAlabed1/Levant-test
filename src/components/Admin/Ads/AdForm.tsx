import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { adminApi } from "../../../api/axios";
import { Advertisement } from "../../../types/types";
import Loader from "../../Loader";
import { useAuth } from "../../../context/AuthContext";

const AdvertisementForm = ({ mode }: { mode: "add" | "edit" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {token} = useAuth()
  const [form, setForm] = useState<Advertisement>({
    id: 0,
    title: "",
    from_date: "",
    to_date: "",
    image: "" as any,
    restaurant: "",
    is_panorama: 0,
    hide_date: 0,
  });
  const [fetchedAd,setFetcedAd]=useState<any>()

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchAd = async () => {
        setLoading(true);
        try {
          const response = await adminApi.get(`/show_advertisement?id=${id}`,{
            headers:{
              Accept:'application/json',
              Authorization:`Bearer ${token}`
            }
          });
          const data = response.data.data;
          setForm({
            ...data,
            image:null
          });
          setFetcedAd(data)
        } catch (err) {
          console.error("Failed to load advertisement", err);
          toast.error("Failed to load advertisement");
        } finally {
          setLoading(false);
        }
      };
      fetchAd();
    }
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("from_date", form.from_date);
    fd.append("to_date", form.to_date);
    if (form.image && typeof form.image !== "string") {
      fd.append("image", form.image);
    }
    fd.append("hide_date", form.hide_date.toString());
    fd.append("is_panorama", form.is_panorama.toString());
    if (mode === 'edit' && id) fd.append("id",id)
    try {
      const url =
        mode === "edit" && id
          ? `/update_advertisement`
          : "/add_advertisement";

      const response = await adminApi.post(url, fd, {
        headers:{
          Accept:'application/json',
          Authorization:`Bearer ${token}`
        },
      });

      toast.success(
        mode === "edit"
          ? "Advertisement updated successfully!"
          : "Advertisement created successfully!"
      );
      navigate("/admin/dashboard");
    } catch (err: any) {
      if (err.response) {
        toast.error(
          `Failed to submit: ${err.response.data?.message || "Server error"}`
        );
        console.log(err.response)
      } else {
        toast.error("Network error or request failed.");
      }
    } finally {
      setLoading(false);
    }
  };
  if(loading)return <Loader/>
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow w-full md:w-[50%] mx-auto mt-6"
    >
      <h2 className="text-xl font-bold">
        {mode === "edit" ? "Edit Advertisement" : "Add Advertisement"}
      </h2>
      {
        mode === 'edit' &&
        <img src={fetchedAd?.image} className="w-full h-[200px]" />
      }

      <div>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="from_date">From Date</label>
          <Input
            id="from_date"
            type="date"
            value={form.from_date}
            onChange={(e) => setForm({ ...form, from_date: e.target.value })}
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="to_date">To Date</label>
          <Input
            id="to_date"
            type="date"
            value={form.to_date}
            onChange={(e) => setForm({ ...form, to_date: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] as any ?? "" })
          }
          {...(mode === "add" ? { required: true } : {})}
        />
      </div>

      <div>
        <label className="block mb-2">Hide Date</label>
        <RadioGroup
          value={form.hide_date.toString()}
          onValueChange={(val: string) =>
            setForm({ ...form, hide_date: parseInt(val) })
          }
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="hide1" />
            <label htmlFor="hide1">Yes</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="hide0" />
            <label htmlFor="hide0">No</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <label className="block mb-2">Is Panorama</label>
        <RadioGroup
          value={form.is_panorama.toString()}
          onValueChange={(val: string) =>
            setForm({ ...form, is_panorama: parseInt(val) })
          }
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="pan1" />
            <label htmlFor="pan1">Yes</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="pan0" />
            <label htmlFor="pan0">No</label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" disabled={loading}>
        {loading
          ? mode === "edit"
            ? "Updating..."
            : "Creating..."
          : mode === "edit"
          ? "Update"
          : "Submit"}
      </Button>
    </form>
  );
};

export default AdvertisementForm;
