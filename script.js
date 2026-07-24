function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}

const LOWER='abcdefghijklmnopqrstuvwxyz'
const UPPER=LOWER.toUpperCase()
const NUMS='0123456789'
const SYMS='!@#$%^&*()_+[]{}|;:,.<>?~'

function generatePassword(length, {lower, upper, numbers, symbols}){
  const pools=[]
  if(lower) pools.push(LOWER)
  if(upper) pools.push(UPPER)
  if(numbers) pools.push(NUMS)
  if(symbols) pools.push(SYMS)
  if(pools.length===0) return ''

  // Ensure at least one char from each selected pool
  let passwordChars=[]
  pools.forEach(pool=>{
    passwordChars.push(pool[getRandomInt(0,pool.length-1)])
  })

  // Fill remaining
  while(passwordChars.length<length){
    const pool = pools[getRandomInt(0,pools.length-1)]
    passwordChars.push(pool[getRandomInt(0,pool.length-1)])
  }

  // Shuffle
  for(let i=passwordChars.length-1;i>0;i--){
    const j=getRandomInt(0,i)
    const tmp=passwordChars[i]
    passwordChars[i]=passwordChars[j]
    passwordChars[j]=tmp
  }

  return passwordChars.slice(0,length).join('')
}

// UI wiring
const lengthEl=document.getElementById('length')
const lengthValue=document.getElementById('lengthValue')
const lowerEl=document.getElementById('lower')
const upperEl=document.getElementById('upper')
const numbersEl=document.getElementById('numbers')
const symbolsEl=document.getElementById('symbols')
const generateBtn=document.getElementById('generate')
const copyBtn=document.getElementById('copy')
const resultEl=document.getElementById('result')

lengthEl.addEventListener('input',()=>{lengthValue.textContent=lengthEl.value})

generateBtn.addEventListener('click',()=>{
  const length=parseInt(lengthEl.value,10)
  const pwd=generatePassword(length,{lower:lowerEl.checked,upper:upperEl.checked,numbers:numbersEl.checked,symbols:symbolsEl.checked})
  resultEl.textContent = pwd || 'Select at least one character type.'
})

copyBtn.addEventListener('click',async()=>{
  const text=resultEl.textContent
  if(!text) return
  try{
    await navigator.clipboard.writeText(text)
    copyBtn.textContent='Copied'
    setTimeout(()=>copyBtn.textContent='Copy',1200)
  }catch(e){
    alert('Could not copy automatically. Select the password and press Ctrl+C.')
  }
})

// Generate initial
generateBtn.click()