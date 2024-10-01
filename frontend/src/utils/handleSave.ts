import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

interface HandleSaveParams {
    setLoading: (value: boolean) => void;
    id: string;
    setsavedState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default async function handleSave({
    setLoading,
    id,
    setsavedState,
}: HandleSaveParams): Promise<void> {
    setLoading(true); 

    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(`${base_url}/api/v1/saveblog`, {
            id: id,
        }, {
            headers: {
                "authorization": token,
            },
        });

       
        setsavedState(prev => !prev); 
        console.log(response);

    } catch (e) {
        console.error("Error while saving blog from frontend", e); 
    } finally {
        setLoading(false);
    }
}
