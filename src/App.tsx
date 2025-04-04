import { useEffect, useState } from "react";

type ItemType = {
  icon: string,
  cookiePerSec: number,
  price: number,
}

const App = () => {
  const [cookie, setCookie] = useState(0)
  const [items, setItems] = useState<ItemType[]>([
    {icon: "👵", cookiePerSec: 10, price: 5},
    {icon: "🏭", cookiePerSec: 100, price: 10},
  ])

  const [pocket, setPocket] = useState<ItemType[]>([])

  const click = () => {
    setCookie(cookie + 1)
    localStorage.setItem("cookie", `${cookie + 1}`)
  }

  useEffect(()=>{
    if(localStorage.getItem("cookie")){
      setCookie(Number(localStorage.getItem("cookie")))
    }
  }, [])
  
  const buyItem = (item: ItemType) =>{
    setCookie(prev => prev - item.price)
    setPocket(prev => [...prev, item])
  }

  useEffect(() =>{
    const intervalId = setInterval(()=>{
      pocket.forEach(item => {
        setCookie(prev => {
          localStorage.setItem("cookie", `${prev}`)
          return prev + item.cookiePerSec / 10})
      })

    },100)

    return () => clearInterval(intervalId)
  }, [pocket])

  return (
    <div>
      <p>{cookie}</p>
      <button onClick={click}>🍪</button>
      {
        items.map(item =>
        <button disabled={cookie < item.price} onClick={() => buyItem(item)}>
          {item.icon}
        </button>) 
      }
      <p>Zseb: {pocket.map(item => <span>{item.icon}</span>)}</p>

    </div>
   )
}

export default App