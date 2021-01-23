import React, { useEffect, useState } from 'react'
import DebateCard from './DebateCard'
import { useParams } from "react-router-dom";
import axios from '../axios';

function DebateCardList(props) {
    let { topicName } = useParams();
    const [posts, setPosts] = useState([]);
    let i = 0;
    useEffect(() => {
        async function getDebates() {
            const response = await axios.get('/v2/topics/'+topicName);
            setPosts(response.data);
            return response;
        }
        getDebates();
    }, [])
    

    return (
        <div>
            <h2 className="pageTitle"> Upcoming debates on: {topicName}</h2>

            <h3 className="pageSubtitle"> View details for more information and to register.</h3>

            {posts.map((debate) => 
                <DebateCard 
                key={debate._id}
                id={debate._id}
                person1={debate.person1}
                person2={debate.person2}
                title={debate.title}
                imgurl={debate.imageUrl}
                date={debate.date}
                color={props.colors[(i++)%3]} 
                /> 
            )}
        </div>
    )
}

export default DebateCardList
