import React from "react";
import Button from 'react-bootstrap/Button';

function Home() {

    
    return (
        <div className="homePage">
            <h1 className="pageTitle"> Welcome to the Bowl!</h1>
            <h2 className="pageSubtitle"> Let the debates begin! <br/><br/></h2>
            <img className="homeImg" src="/fishbowl.png" alt="fishbowl"></img> <br/><br/>
            <Button variant="info" className="homeLink" href="topics">View Upcoming Debates</Button> <br/><br/>
            <Button variant="info" className="homeLink" href="newDebate">Register New Debate</Button>
        </div>
    )
}

export default Home
