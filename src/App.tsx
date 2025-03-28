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

  const click = () => {
    setCookie(cookie + 1)
    localStorage.setItem("cookie", `${cookie + 1}`)
  }

  useEffect(()=>{
    if(localStorage.getItem("cookie")){
      setCookie(Number(localStorage.getItem("cookie")))
    }
  }, [])

  return (
    <div>
      <p>{cookie}</p>
      <button onClick={click}>🍪</button>

      {
        items.map(item =>
        <button disabled={cookie < item.price}>
          {item.icon}
        </button>) 
      }
    </div>
   )
}

export default App