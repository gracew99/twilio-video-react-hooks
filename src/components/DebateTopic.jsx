import React from 'react'
import { useHistory } from "react-router-dom";

function DebateTopic(props) {
    let history = useHistory();

    // const [posts, setPosts] = useState([]);

    async function getDebates() {
        // const response = await axios.get('/v2/posts');
        // setPosts(response.data);
        history.push("/topics/"+props.topic);
        // return response;
    }

    return (
        <div className="debateTopic" onClick={getDebates} style={{backgroundColor:props.color}}>
            <h2>{props.topic}</h2>
        </div>
    )
}

export default DebateTopic
