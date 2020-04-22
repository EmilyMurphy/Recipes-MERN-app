import React from 'react'


function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> Recipes from Spoonacular API. Users and favourites saved to MongoDB </p>
        </div>
    )
}

export default Footer
