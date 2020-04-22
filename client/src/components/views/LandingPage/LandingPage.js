import React, { useEffect, useState, useRef } from 'react'
import { Typography, Row, Button } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCard from '../../commons/GridCards'
const { Title } = Typography;
function LandingPage() {
    const buttonRef = useRef(null);

    const [Recipes, setRecipes] = useState([])
    const [MainRecipeImage, setMainRecipeImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0)
//change URL to have the url plus a seach keyword and result limited to 10
    useEffect(() => {
        const endpoint = `${API_URL}random?apiKey=${API_KEY}&number=10`;
        fetchRecipes(endpoint)
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])


    const fetchRecipes = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                 console.log(result)
                 console.log('Recipes',...Recipes)
                 console.log('result',...result.recipes)
                setRecipes([...Recipes, ...result.recipes])
                setMainRecipeImage(MainRecipeImage || result.recipes[0])
                setCurrentPage(result.number)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }
//CHNAGE URL TO LOAD MORE RECIPES with key word and results +10 more
    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        console.log('CurrentPage', CurrentPage)
        endpoint = `${API_URL}random?apiKey=${API_KEY}&number=${CurrentPage + 10}`;
        fetchRecipes(endpoint);

    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            console.log('clicked')
            buttonRef.current.click();

        }
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainRecipeImage &&
                <MainImage
                    image={`${MainRecipeImage.image}`}
                    title={MainRecipeImage.title}
                    text={MainRecipeImage.readyInMinutes}
                />

            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > Recipes by latest </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Recipes && Recipes.map((Recipe, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={Recipe.image ? //chnage poster path to image path or something
                                    `${Recipe.image}`
                                    : null}
                                RecipeId={Recipe.id}
                                RecipeName={Recipe.title} 
                                RecipeMins={Recipe.readyInMinutes}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
