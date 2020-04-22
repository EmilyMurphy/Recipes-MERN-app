import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';


const { Title } = Typography;

function GridCards(props) {

    let { inform, key, image, RecipeId, RecipeName, RecipeMins } = props
    const POSTER_SIZE = "w154";

    if (inform) {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '320px' }} alt={RecipeName} src={`${image}`} />
                    <div>
                            <div style={{ position: 'absolute', bottom: '2rem', marginLeft: '2rem' }} >
                            <Title style={{ color: 'black' }} level={2} > {RecipeName} </Title>
                            <p style={{ color: 'black', fontSize: '1rem' }}  >{RecipeMins} </p>
                    </div>s
            </div>
                </div>
            </Col>
        )
    } else {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/recipe/${RecipeId}`} >
                        <img style={{ width: '100%', height: '320px' }} alt={RecipeName} src={image} />     
                        <Title style={{ color: 'black' }} level={1} > {RecipeName} </Title>
                        <p style={{ color: 'black', fontSize: '1rem' }}  >{RecipeMins} </p>                  
                    </a>
                </div>
            </Col>
        )
    }

}

export default GridCards
