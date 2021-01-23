import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import axios from '../axios'
import Alert from 'react-bootstrap/Alert'
import isTodayFn from '../isToday';



function DebateDetails(props) {
    // WARNING: must assign to exact param name from Route path 
    let { topicid, id } = useParams();
    const [post, setPost] = useState({});
    const [attendees, setAttendees] = useState(0);
    const [isToday, setIsToday] = useState(0);

    async function handleSignUp() {
        const url = '/v2/debates/signUp/'+id;
        const response = await axios.post(url);
        setAttendees(attendees+1);
        return response;
    }

    useEffect(() => {
        async function getDebate() {
            const url = '/v2/debates/'+id;
            const response = await axios.get(url);
            setPost(response.data[0]);
            const attendees = response.data[0].attendees ? response.data[0].attendees : 0;
            setAttendees(attendees);
            setIsToday(isTodayFn(response.data[0].date));
            return response;
        }
        getDebate();

    }, [])
 

    return (
        <div className={'debateDetailContainer'}>
       
            {Object.keys(post).length !== 0  && <div className={"debateDetail"} style={{backgroundColor:props.colors[0]}}>
                {isToday && <Alert className="alert" variant={"success"}> Happening today! </Alert>}
                <h1>{"Title: " + post.title}</h1>
                <h1>{post.person1 + " vs. " + post.person2} <br/></h1>
                <h4> {(new Date(Date.parse(post.date))).toLocaleDateString()} <br/><br/><br/></h4>
                <img src={post.person1img} className="profilepic" alt="person1"></img>
                <img src={post.person2img} className="profilepic" alt="person2"></img><br/><br/><br/>
                <h4> | {post.topics.map(topic => topic + " | ")}</h4><br/>
                <h1 className={"meet"}>{"Meet " + post.person1.split(" ")[0]}</h1>
                <h4 className={"bio"}>{post.person1description}</h4> <br/>
                <h1 className={"meet"}>{"Meet " + post.person2.split(" ")[0]}</h1>
                <h4 className={"bio"}>{post.person2description}</h4>
                {!isToday && attendees === 0 && <h4 className="attendees"> Be the first to sign up! </h4>}
                {!isToday && attendees !== 0 && <h4 className="attendees"> {attendees} attending </h4>}
                {!isToday && <a href="signup" onClick={handleSignUp} className="signUp"> Sign Up </a>}
                {isToday && <a href="debateStream" className="signUp"> <br/><br/> <br/>  Enter Debate Room </a>}

            </div>}
     
        </div>
        
    )
}

export default DebateDetails
