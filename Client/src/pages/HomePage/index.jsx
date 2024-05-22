import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <header>
        <div className="container">
            <img src="https://preview.colorlib.com/theme/course/images/logo.png" alt="logo" />
            <nav>
                <ul>
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/favorites" >Favorites</Link>
                    </li>
                    <li>
                        <Link to="/basket" >Basket</Link>
                    </li>
                    <li>
                        <Link to="/addproduct" >AddProduct</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default HomePage