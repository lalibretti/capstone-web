import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { useEffect, useState } from 'react';

function Category() {

    const [category, setCategory] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [question, setQuestion] = useState();


    const fetchQuestions = async (category) => {
        console.log(category)
        // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
        let res = await fetch(`http://localhost:3000/api/v1/category/${category.id}/questions`)
        let data = await res.json()
        console.log(data)
        setQuestion(data)
    
      };

    const fetchCategories = async () => {
        let res = await fetch('http://localhost:3000/api/v1/category')
        let json = await res.json()
        console.log(json)
        setCategory(json)
    };

    useEffect(() => {
        console.log('run this only once when the page loads up')
        fetchCategories()
    }, [])


    const switchCategory = async (category) => {
        console.log('the selcted category is', category)
        setSelectedCategory(category)
        // write code here to fetch the questions for the selected category
        fetchQuestions(category)

    };

    return (
        <div className={'grid grid-cols-12'}>
            <div className={'col-span-12 md:col-span-2'}>

                <h1>Category Listing</h1>
                {/* <Button type="danger" ghost>Primary Button</Button> */}
                <ul className={'border'}>
                    {category && category.map((category) => {
                        return <li key={category.id}
                            onClick={() => switchCategory(category)}
                            className={(selectedCategory && (selectedCategory.id === category.id)) ? 'p-10 border-b text-1xl bg-gray-200' : 'p-8 border-b text-2xl'}>{category.name}</li>
                    })}
                </ul>
            </div>
        </div>
    );
}


export default Category;