import React, { useEffect, useState } from 'react'
import { Typography, Popover, Button } from 'antd';
import axios from 'axios';
import './favorite.css';
import { useSelector } from 'react-redux';


const { Title } = Typography;

function FavoritePage() {
    const user = useSelector(state => state.user)

    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredRecipe()
    }, [])

    const fetchFavoredRecipe = () => {
        axios.post('/api/favorite/getFavoredRecipe', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get favourites')
                }
            })
    }

    const onClickDelete = (RecipeId, userFrom) => {

        const variables = {
            RecipeId: RecipeId, //recipe id
            userFrom: userFrom,
        }

        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredRecipe()
                } else {
                    alert('Failed to Remove From Favorites')
                }
            })
    }


    const renderCards = Favorites.map((favorite, index) => {


        const content = (
            <div>
                {favorite.recipePoster ?
                    <img src={`${favorite.recipePoster}`} />
                    : "no image"}
            </div>
        );

        return <tr key={index}>

            <Popover content={content} title={`${favorite.recipeTitle}`}>
                <td>{favorite.recipeTitle}</td>
            </Popover>

            <td>{favorite.recipereadyInMinutes} mins</td>
            <td><button onClick={() => onClickDelete(favorite.RecipeId, favorite.userFrom)}> Remove </button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Favorite Recipes By Me </Title>
            <hr />
            {user.userData && !user.userData.isAuth ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Please Log in first...</p>
                    <a href="/login">Go to Login page</a>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Recipe Title</th>
                            <th>Recipe Ready In Minutes</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default FavoritePage
