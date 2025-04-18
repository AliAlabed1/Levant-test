import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const AddToggeler = () => {
    const navigate = useNavigate()
  return <Button onClick={()=>navigate('/admin/dashboard/add_ad')}>Add Ads</Button>
}

export default AddToggeler
