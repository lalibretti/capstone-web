import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import { Collapse } from 'antd';
import {useEffect, useState} from 'react';

const {Panel} = Collapse; 

function Callback(key) {

  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  //const [selectedQuestion, setQuestion] = useState();

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
const fetchQuestions = async () => {
  console.log(category)
  // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
  let res = await fetch('http://localhost:3000/api/v1/category:id')
  let json = await res.json
  console.log(json)
  //setQuestion(category.id)
  // once fetched, write code to display it on the UI
};

const switchCategory = async (category) => {
  console.log('the selcted category is', category)
  setSelectedCategory(category)
  // write code here to fetch the questions for the selected category
  // fetchQuestions(category)

};

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
     <div>
      <div className={'flex justify-center p-6 border-b-4 border-gray-300'}>
        <h1 className={'text-4xl uppercase font-bold tracking-wider'}>Capstone App</h1>

      </div>

      <div className={'grid grid-cols-12'}>
        <div className={'col-span-12 md:col-span-2'}>
          {/* <h1>Category Listing</h1> */}
          {/* <Button type="danger" ghost>Primary Button</Button> */}
          <ul className={'border'}>
            {category && category.map((category) => {
              return <li key={category.id}
                onClick={() => switchCategory(category)}
                className={(selectedCategory && (selectedCategory.id === category.id)) ? 'p-10 border-b text-1xl bg-gray-200' : 'p-8 border-b text-2xl'}>{category.name}</li>
            })}
          </ul>
        </div>

        <div className={'col-span-12 border md:col-span-10 h-96 bg-gray-300'}>
          <h1>Question/Answer Listing</h1>
          <Collapse defaultActiveKey={['1']} onChange={Callback}>
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 4" key="4">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 5" key="5">
              <p>{text}</p>
            </Panel>
          </Collapse>,
          mountNode,
          );
        </div>
      </div>
    </div>
        
  );
}

export default Callback;
