import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom"
import axios from '../axios'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'

const isToday = (someDateString) => {
    const someDate = new Date(Date.parse(someDateString));
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
}

function DebateDetails(props) {
    // WARNING: must assign to exact param name from Route path 
    let { topicid, id } = useParams();
    const [posts, setPosts] = useState([]);
    const [attendees, setAttendees] = useState(0);


    async function handleSignUp() {
        const url = '/v2/debates/signUp/'+id;
        const response = await axios.post(url);
        setAttendees(attendees+1);
        return response;
    }

    useEffect(() => {
        async function getDebates() {
            const url = '/v2/debates/'+id;
            const response = await axios.get(url);
            setPosts(response.data);
            return response;
        }
        getDebates();
    }, [])
    
    useEffect(() => {
        async function getAttendees() {
            const url = '/v2/debates/signUp/'+id;
            const response = await axios.get(url);
            setAttendees(response.data);
            return response;
        }
        getAttendees();
    }, [])

    return (
        <div className={'debateDetailContainer'}>
        {posts.map(post => 
            <div className={"debateDetail"} style={{backgroundColor:props.colors[0]}}>
                {isToday(post.date) && <Alert className="alert" variant={"success"}> Happening today! </Alert>}
                <h1>{"Title: " + post.title}</h1>
                <h1>{post.person1 + " vs. " + post.person2} <br/></h1>
                <h4> {(new Date(Date.parse(post.date))).toLocaleDateString()} <br/><br/><br/></h4>
                <img src={post.person1img} class="profilepic" alt="person1"></img>
                <img src={post.person2img} class="profilepic" alt="person2"></img><br/><br/><br/>
                <h4> | {post.topics.map(topic => topic + " | ")}</h4><br/>
                <h1 className={"meet"}>{"Meet " + post.person1.split(" ")[0]}</h1>
                <h4 className={"bio"}>{post.person1description}</h4> <br/>
                <h1 className={"meet"}>{"Meet " + post.person2.split(" ")[0]}</h1>
                <h4 className={"bio"}>{post.person2description}</h4>
                {attendees === 0 && <h4 className="attendees"> Be the first to sign up! </h4>}
                {attendees !== 0 && <h4 className="attendees"> {attendees} attending </h4>}
                <a href="signup" onClick={handleSignUp} className="signUp"> Sign Up </a>
            </div>
        )}
        </div>
        
    )
}

export default DebateDetails
