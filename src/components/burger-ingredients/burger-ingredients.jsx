import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';

import CustomTab from './custom-tab/custom-tab';
import Card from './card/card';

export default function BurgerIngredients(props) {

  const [currentTab, setCurrentTab] = React.useState('one');
  const bun = props.ingredients.filter((ingr) => ingr.type === "bun");
  const sauce = props.ingredients.filter((ingr) => ingr.type === "sauce");
  const main = props.ingredients.filter((ingr) => ingr.type === "main");

  React.useEffect(()=>{
    return()=>{
        console.log("tab switched");
    }
  }, [currentTab]);

  return (
    <section className={ingredientsStyles.window}>
        <p className={`text text_type_main-large ${ingredientsStyles.heading}`}>
            Соберите бургер
        </p>

        <CustomTab switch={currentTab} setSwitch={setCurrentTab}/>
        <div className={ingredientsStyles.custom_scroll}>
            <div className={ingredientsStyles.buns_cont}>
                <p className={`text text_type_main-medium ${ingredientsStyles.type_bun_heading}`}>
                    Булки
                </p>
                <div className={ingredientsStyles.cards}>
                    {bun.map((a)=>(
                        <Card type={a} key={a._id}/>
                    ))}    
                </div> 
            </div>
            <p className={`text text_type_main-medium ${ingredientsStyles.type_sauce}`}>
                    Соусы
            </p>
            <div className={ingredientsStyles.cards}>
                {sauce.map((a)=>(
                    <Card type={a} key={a._id}/>
                ))}    
            </div> 
            <p className={`text text_type_main-medium ${ingredientsStyles.type_sauce}`}>
                    Начинки
            </p>
            <div className={ingredientsStyles.cards}>
                {main.map((a)=>(
                    <Card type={a} key={a._id}/>
                ))}    
            </div> 
        </div>


    </section>
  )
}
