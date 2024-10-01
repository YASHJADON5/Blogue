import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

interface ChildProps {
    setsavedState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default async function handleUnSave({
    setLoading,
    id,
    setsavedState,
}: {
    setLoading: (value: boolean) => void;
    setsavedState: React.Dispatch<React.SetStateAction<boolean>>; 
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

        setsavedState(prev => !prev); 
        console.log(response);
    } catch (e) {
        console.log("error while saving blog from frontend", e);
    } finally {
        setLoading(false);
    }
}
