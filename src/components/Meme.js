import React from "react";

export default function Meme() {
    const [allMemeImages, setAllMemeImages] = React.useState([])
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        imageURL: ""
    });

    // Fetch 100 most popular meme images from an API
    React.useEffect(() => {
        async function fetchMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemeImages(data.data.memes);
        }

        fetchMemes();
    }, [])

    // Change displayed meme image
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length);
        const url = allMemeImages[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            imageURL: url
        }));
    }

    // Change displayed text
    function handleTextChange(event) {
        setMeme(prevMeme => ({
            ...prevMeme,
            [event.target.id]: event.target.value
        }));
    }

    return (
        <main>
            <div className="form">
                <input
                    className="form-input"
                    id="topText"
                    onChange={handleTextChange}
                    type="text"
                    placeholder="Top Text"
                    name="topText"
                    value={meme.topText}
                />
                <input
                    className="form-input"
                    id="bottomText"
                    onChange={handleTextChange}
                    type="text"
                    placeholder="Bottom Text"
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button className="form-submit" type="Submit" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img className="meme-image" src={meme.imageURL} alt="A meme should be shown here" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}