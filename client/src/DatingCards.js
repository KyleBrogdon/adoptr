import React, {useState} from 'react';
import TinderCard from "react-tinder-card";
import './DatingCards.css';

function DatingCards() {
    const [pet, setPet] = useState([
        {
            name: 'test pet',
            url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
        },
        {
            name: 'pet 2',
            url: 'https://cdn.britannica.com/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg?q=60'
        },
    ]);

const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
}

const outOfFrame = (name) => {
    console.log(name + " left the screen");
}

  return (
    <div className = 'DatingCards'>
        <div className = 'DatingCards_cardContainer'>
        {pet.map((pet) => (
            <TinderCard 
            className = "swipe"
            key = {pet.name}
            preventSwipe = {["up", "down"]}
            onSwipe = {(dir) => swiped(dir, pet.name)}
            onCardLeftScreen={() => outOfFrame(pet.name)}
            >
                <div 
                style = {{backgroundImage: `url(${pet.url})`}}
                className = 'card'
                >
                   <h3>{pet.name}</h3>
                </div>
            </TinderCard>
        ))}
        </div>
    </div>
  );
}

export default DatingCards