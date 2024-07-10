import { useState } from "react"



export default function NewAnime() {

    const API = process.env.REACT_APP_API_URL

    const [anime, setAnime] = useState({
        name: '',
        description: ''
    })

    function handleNameChange(event) {
        let currentValue = event.target.value

        setAnime({
            ...anime,
            name: currentValue,
        })
    }

    function handleDesciptionChange(event) {
        let currentValue = event.target.value

        setAnime({
            ...anime,
            description: currentValue,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        console.log(anime)
        fetch(`${API}/animes/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(anime)
        }).then((response) => response.json()).then((data) => {
            console.log(data)
            setAnime({
                name: '',
                description: ''
            })
        })
    }

    // console.log(anime)
    return (
        <form className="new-anime-form" onSubmit={handleSubmit}>
            <h1>New Anime</h1>
            <label>
                Please enter the name of your anime:
                <input type='text' value={anime.name} onChange={(event) => handleNameChange(event)}/>
            </label>
            <label>
                Please enter the description of your anime:
                {/* <input type='text'/> */}
                <textarea  value={anime.description} onChange={(event) => handleDesciptionChange(event)} />
            </label>
            <div className="form-button-container">
                {/* <input type="submit" value={'Submit'} /> */}
                <button type="submit" className="form-button">Submit</button>
            </div>
        </form>
    )
}