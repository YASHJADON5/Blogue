import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;



export default async function handleUnSave({
    setLoading,
    id,  
}: {
    setLoading: (value: boolean) => void;
    id: string;
}): Promise<void> {
    setLoading(true);

    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${base_url}/api/v1/unsaveblog`, {
            data: { id: id },
            headers: {
                "authorization": token,
            },
        });

        console.log(response);
    } catch (e) {
        console.log("error while saving blog from frontend", e);
    } finally {
        setLoading(false);
    }
}
