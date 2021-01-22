import React, { useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import isTodayFn from '../isToday';

function DebateCard(props) {
    let history = useHistory();
    let {topicName} = useParams();
    const [isToday, setIsToday] = useState(0);


    useEffect(() => {
        setIsToday(isTodayFn(props.date));   
    }, [])

    async function getDetails() {
        // note: can't access props.key so made dup props.id
        const url = topicName+'/'+props.id+'/details';
        history.push(url);
    }

    return (
        <div className="debateCard" style={{backgroundColor:props.color}}>
            {isToday &&   
            <Badge className="badge" variant="success"> Happening Today! </Badge>}

            <h2>{props.person1 + " vs. " + props.person2}</h2>
            <h2>{props.title}</h2>
            <img src={props.imgurl} alt="debate"></img>
            <p> {(new Date(Date.parse(props.date))).toLocaleDateString()}</p>
            <Button variant="info" className="viewDetails" onClick={getDetails}>View details</Button>
        </div>
    )
}

export default DebateCard
