import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

interface HandleSaveParams {
    setLoading: (value: boolean) => void;
    id: string;
   
}

export default async function handleSave({
    setLoading,
    id,
  
}: HandleSaveParams): Promise<void> {
    setLoading(true); 

    const token = localStorage.getItem('token');
   

    try {
       await axios.post(`${base_url}/api/v1/saveblog`, {
            id: id,
        }, {
            headers: {
                "authorization": token,
            },
        });

       

    } catch (e) {
        console.error("Error while saving blog from frontend", e); 
    } finally {
        setLoading(false);
    }
}
