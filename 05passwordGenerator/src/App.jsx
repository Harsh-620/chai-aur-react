import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)           //Here we stored all the variables in state because if they are changed re rendering should occure
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)  

  const passwordGenerator = useCallback(() => {     //we used a optimised approach by using call back to genefrate password.We could have used normal function also.
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"      //If numberallowed box is ticked then 
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`" //if character allowed box is ticked then

    for (let i = 1; i <= length; i++) {   //it generates the password.
      let char = Math.floor(Math.random() * str.length + 1)  
      pass += str.charAt(char)
      
    }

    setPassword(pass)   //Here password gets updated
 }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {   //we could have used normal function here but again for optimisation that if password remains same then it will store the function
    passwordRef.current?.select(); //it helps in selecting the copied password
    passwordRef.current?.setSelectionRange(0, 999);//It gives the range of selection 
    window.navigator.clipboard.writeText(password) //It helps in coying password to clipboard
  }, [password])

  useEffect(() => {   //It helps in calling the passwordgenerator function.If we will call it normally it will not work
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}  //here we used the created varibale with help of useRef hook so that the password get stored in the current value of that reference. 
        />
        <button
        onClick={copyPasswordToClipboard}  //here eventlistener got added and a reference of copyPasswordToClipboard is passed.Note that it is not called here.
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}  /** This is commonly used in React.js to handle changes in an input field, such as a text input or a textarea. Here's a breakdown of the code:

onChange: This is an event handler attribute in React that specifies a function to be called when the value of an input element changes.

(e) => {...}: This is an arrow function that takes an event object (e) as its parameter. The event object contains information about the event, such as the target element (in this case, the input field).

{setLength(e.target.value)}: Inside the arrow function, it calls the setLength function, presumably a state-setting function. It sets the value of the length state (or variable) to the new value of the input field, which is accessed through e.target.value.

So, in summary, whenever the content of the input field changes, the setLength function will be called with the new value of the input field. This is a common pattern in React for handling user input and updating state accordingly.**/
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App
