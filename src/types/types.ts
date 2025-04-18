export interface Advertisement {
    id: number;
    title: string;
    from_date: string; 
    to_date: string;   
    image: string;     
    restaurant: string;
    is_panorama: number; 
    hide_date: number;   
}

export interface Category {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    image: string; 
}
export interface Item {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    price: string; 
    image: string; 
}
  
  