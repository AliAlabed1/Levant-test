import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
  const { name, logout } = useAuth()
  const navigate = useNavigate()
    
  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <h1 className="text-xl font-bold">🍽️ Smile & Bite</h1>
      {
        !name ? (
          <Button onClick={()=>navigate('/login')}>Login</Button>
        ):(
          <DropdownMenu>
            <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback className="bg-primary text-white">{name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>{name}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </div>
  )
}

export default Header
