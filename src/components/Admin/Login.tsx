import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ user_name: "", password: "" });
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      
      const res = await fetch("https://medical-clinic.serv00.net/admin_api/login?model=Admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if(!res.ok){
        throw new Error('failed')
      }
      const {data} = await res.json();
      login(data.token,data.name);
      setLoading(false)
      toast.success('Logged in successfully!')
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error('Failed!')
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex flex-1 flex-col space-y-2 items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-full max-w-sm flex-col space-y-2">
        <h2 className="text-xl mb-4 font-semibold text-center">Admin Login</h2>
        <Input
          placeholder="Username"
          value={form.user_name}
          onChange={(e) => setForm({ ...form, user_name: e.target.value })}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <Button disabled={loading}  type="submit" >{loading?'Logging..':'Login'}</Button>
      </form>
      <Link className="text-blue-500 underline" to={'/guest'}>Continue as a Guest</Link>
    </div>
  );
};

export default Login;
