import { useNavigate } from "react-router";

export function Landing() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/new-story")}>Create</button>
    );
}