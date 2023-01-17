import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()


//primero obtiene datos del local storage 
const cartLocalStorage = JSON.parse(localStorage.getItem('cart') || "[]")
const totalCartLocalStorage = JSON.parse(localStorage.getItem('totalCart') || "[]")

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState(cartLocalStorage)
    const [contadorProductos, setContadorProductos] =useState(cartLocalStorage.length)
    const [totalCart, setTotalCart] =useState(totalCartLocalStorage)

   

    const agregarAlCarrito  = (item) => {
      console.log('agregar al carrito')
      console.log(item)
     
      if(cart.find(prod => prod._id === item._id)){
        
        const products = cart.map(prod => prod._id === item._id? {...prod, cantidad: prod.cantidad + 1 }
            :prod
            );
            setTotalCart(totalCart + item.precio * item.cantidad)
            setContadorProductos(contadorProductos + item.cantidad)
            return setCart([... products])
            
    }
    setTotalCart(totalCart + item.precio * item.cantidad)
    setContadorProductos(contadorProductos + item.cantidad)
    setCart([...cart, item]);
    
    }
   

   
    


    const vaciarCart = () => {
       setCart([])
       setTotalCart(0)
       setContadorProductos(0)
       localStorage.clear()
    }
    const onDeleteProduct = (prod) => {
      setTotalCart(totalCart - prod.precio * prod.cantidad)
      setContadorProductos(contadorProductos - prod.cantidad)
      return setCart(cart.filter((item) => item._id !== prod._id))

     
    }

    // //Insertar items en el localstorage 
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('totalCart', JSON.stringify(totalCart));
    },[cart, totalCart])

    return (
        <CartContext.Provider value={{cart, agregarAlCarrito,vaciarCart, totalCart, contadorProductos, onDeleteProduct}}>
            {children}
        </CartContext.Provider>
    )
}