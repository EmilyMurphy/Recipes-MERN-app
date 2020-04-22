import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import GridCards from '../../commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';
import RecipeInfo from './Sections/RecipeInfo';
import Favorite from './Sections/Favorite';
function RecipeDetailPage(props) {

    const RecipeId = props.match.params.RecipeId
    const [Recipe, setRecipe] = useState([])
    const [Infors, setInfors] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForRecipe, setLoadingForRecipe] = useState(true)
    const [LoadingForInfo, setLoadingForInfo] = useState(true)
    const [IngredientsToggle, setIngredientsToggle] = useState(false)
    const recipeVariable = {
        RecipeId: RecipeId //recipeid
    }

    useEffect(() => {
        //chnage to specific recipe infor for that id {apiurl}recipes/{id}/information
        let endpointForRecipeInfo = `${API_URL}${RecipeId}/information?apiKey=${API_KEY}&includeNutrition=false`;
        fetchDetailInfo(endpointForRecipeInfo)

        axios.post('/api/comment/getComments', recipeVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

    const toggleIngredientsView = () => {
        setIngredientsToggle(!IngredientsToggle)
    }

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setRecipe(result)
                setLoadingForRecipe(false)
                setInfors(result.infor)
                console.log(result.recipe)
                console.log(result.title)
                console.log(result.infor)
                setLoadingForInfo(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
            {/* Header */}
            {!LoadingForRecipe ?
                <MainImage //changed to recipe image path and recipe title and summary maybe
                    image={`${Recipe.image}`}
                    title={Recipe.title}
                    text={Recipe.readyInMinutes}
                />
                :
                <div>loading...</div>
            }


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite RecipeInfo={Recipe} RecipeId={RecipeId} userFrom={localStorage.getItem('userId')} />
                </div>


                {/* Recipe Info */}
                {!LoadingForRecipe ?
                    <RecipeInfo recipe={Recipe} />
                    :
                    <div>loading...</div>
                }

                <br />
                {/* Ingredients Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleIngredientsView}>Toggle Ingredients View </Button>
                </div>

                {IngredientsToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForInfo ? Infors.map((infor, index) => (
                                infor.image &&
                                <GridCards inform image={infor.image} RecipeName={infor.title} />
                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                }
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={RecipeId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments RecipeTitle={Recipe.title} CommentLists={CommentLists} postId={RecipeId} refreshFunction={updateComment} />

            </div>

        </div>
    )
}

export default RecipeDetailPage

