import { useState, useCallback, useEffect } from 'react'


function App() {
  let [length, setLength] = useState(8);
  let [numsAllowed, setNumsAllowed] = useState(false);
  let [charsAllowed, setCharsAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numsAllowed) str += "0123456789"
    if (charsAllowed) str += "!@#$%^&*{}"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numsAllowed, length, charsAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [charsAllowed, numsAllowed, passwordGenerator, length])


  return (
    <>
      <div className=' flex-col w-full mx-auto max-w-md shadow-lg rounded-md px-4 bg-gray-700 text-orange-400  pb-3 my-8'>
        <h1 className='text-white text-centre font-medium text-2xl pb-2 pt-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outinle-none w-full px-1 py-3'
            placeholder='Password'
            readOnly />
          <button className=' bg-blue-600 px-3 py-0.5 outline-none text-white font-medium shrink-0'>Copy</button>
        </div>
        <div className='flex gap-x-2 text-sm'>
          <div className=' flex items-centre gap-x-1'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              className=' cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label >Length: {length}</label>
          </div>
          <div className='flex gap-x-2 text-sm'>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" className='cursor-pointer' onClick={() => setCharsAllowed((prev) => !prev)} defaultChecked={charsAllowed} />
              <label>Characters</label>
            </div>
          </div>
          <div className='flex gap-x-2 text-sm'>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" className='cursor-pointer' onClick={() => setNumsAllowed((prev) => !prev)} defaultChecked={numsAllowed} />
              <label>Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
