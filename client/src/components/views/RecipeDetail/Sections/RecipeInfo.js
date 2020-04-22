import React from 'react'
import { Descriptions, Badge } from 'antd';

function RecipeInfo(props) {

    const { recipe } = props;

    return (
        <Descriptions title="Recipe Info" bordered>
        <Descriptions.Item label="Title">{recipe.title}</Descriptions.Item>
        <Descriptions.Item label="summary">{recipe.summary}</Descriptions.Item>
        <Descriptions.Item label="readyInMinutes">{recipe.readyInMinutes}</Descriptions.Item>
        <Descriptions.Item label="extendedIngredientsName">{recipe.extendedIngredients.name}</Descriptions.Item>
        <Descriptions.Item label="extendedIngredientsOriginal">{recipe.extendedIngredients.original}
        </Descriptions.Item>
        <Descriptions.Item label="weightWatcherSmartPoints">{recipe.weightWatcherSmartPoints}</Descriptions.Item>
        <Descriptions.Item label="instructions">{recipe.instructions}</Descriptions.Item>
        <Descriptions.Item label="veryPopular">{recipe.veryPopular}</Descriptions.Item>
      </Descriptions>
    )
}

export default RecipeInfo
