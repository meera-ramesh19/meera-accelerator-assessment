import { useState } from 'react'



export default function CollectName({ updateName }) {

    const [name, setName] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        // console.log(name)
        updateName(name)
    }

    // console.log(name)
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Please enter your name below:
                <input type='text' value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            {/* <input type='submit' onSubmit={(event) => handleSubmit(event)}/> */}
        </form>
    )
}


// const count = 0
// const count2 = 100

// const [count1, count2] = [0, 100]

// console.log(count1)
// const [num1, num2, num3] = [0, 100, 1000]

// console.log(`num1 is: ${num1}`, `num2 is: ${num2}`, num3)



// this line of code is doing a few things, we are using array destructuring to destructure the return of the function useState which creates a slice of state or a slice of memory for us.
// It returns two things, a getter and a setter. These allow us to see the slice of state and change the slice of state respectively. useState also takes in an optional parameter that is the default 
// value of the state
// const [count, setCount] = useState(0); 

// ===

// const count = allows us to see the state
 
// const setCount = function(value) {
//     // allows us to change the state
        // count = value
// }

// (num1, num2) => num1 + num2 

// (num1, num2) => {
//     return num1 + num2
// }