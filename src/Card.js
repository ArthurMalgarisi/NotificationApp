import Heart from "./heart.png";
import comment from "./chat.png";
import share from "./send.png";
import info from "./info.png";
import heartfilled from "./heartfilled.png";
import { useState } from 'react'
const Card = ( {post, socket, user} ) => {
    const[liked, setLiked] = useState(false);

    const handlenotification = (type) => {
        setLiked(true);
        socket.emit("sendNotification",{
            senderName: user,
            recieverName: post.username,
            type,
        });
    };
    return(
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="image" className="userImg"></img>
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="image" className="postImg"></img>
            <div className="interactions">
                {liked? (
                <>
                <img src={heartfilled} alt="like button" className="card_icons"></img>
                <img src={comment} alt="comment button" className="card_icons"></img>
                <img src={share} alt="share button" className="card_icons"></img>
                <img src={info} alt="info button" className="card_icons"></img>
                </>
                ) : (
                    <>
                    <img src={Heart} alt="like button" className="card_icons" onClick={() => handlenotification(1)}></img>
                    <img src={comment} alt="comment button" className="card_icons" onClick={() => handlenotification(2)}></img>
                    <img src={share} alt="share button" className="card_icons" onClick={() => handlenotification(3)}></img>
                    <img src={info} alt="info button" className="card_icons"></img>
                    </>
                )}
            </div>
        </div>
    )
}

export default Card;