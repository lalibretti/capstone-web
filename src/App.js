//import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import { Modal, Collapse } from 'antd';
import {useEffect, useState} from 'react';

const {Panel} = Collapse; 



function Callback(key) {

  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [questions, setQuestion] = useState();

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const [questionTxt, setQuestionTxt] = useState('');

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

const fetchQuestions = async (category) => {
  console.log(category)
  // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
  let res = await fetch(`http://localhost:3000/api/v1/category/${category.id}/questions`)
  let data = await res.json()
  console.log(data)
  setQuestion(data)
  
};

const switchCategory = async (category) => {
  console.log('the selcted category is', category)
  setSelectedCategory(category)
  // write code here to fetch the questions for the selected category
  fetchQuestions(category)

};
const createQuestion = async () => {
  console.log('questionTxt', questionTxt)
  console.log('selectedCategory', selectedCategory)
  let res = await fetch(`http://localhost:3000/api/v1/category/${selectedCategory.id}/questions`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({questionTxt: questionTxt})
  })
  let data = await res.json()
  console.log(data)
  fetchQuestions(selectedCategory)
        setQuestionTxt('')
        setShowQuestionForm(false)

};
const onPanelChange = async (questionId) => {
  console.log(questionId)
  let q
  questions.map((question) => {
      if(question.id == questionId){
          q = question
      }
  })
  console.log(q)
  setSelectedQuestion(q)
  console.log('panel was clicked')
};


  return (
     <div>
      <div className={'flex justify-center p-6 border-b-4 border-gray-300'}>
        <h1 className={'text-4xl uppercase font-bold tracking-wider'}>Capstone App</h1>

      </div>

      <Modal title="New Question" visible={showQuestionForm} closable={false} footer={null}>
            {selectedCategory && <div className={'w-full p-2'}>
                    <textarea value={questionTxt}
                              onChange={(ev) => setQuestionTxt(ev.currentTarget.value)}
                              type="text"
                              rows={4}
                              className={'border p-1 w-full mb-4'}
                              placeholder={'Enter the question text...'}/>

                <button className={'px-4 py-3 bg-blue-500 text-white rounded mr-4'} onClick={createQuestion}>Create Question</button>
                <button className={'px-4 py-3 bg-red-500 text-white rounded'} onClick={() => setShowQuestionForm(false)}>Cancel</button>
            </div>}
        </Modal>

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

        <div className={'col-span-12 border md:col-span-10 h-96 bg-gray-300'}>
          <h1>Question/Answer Listing</h1>
          
          {selectedCategory && <div className={'p-4'}>
                    <button className={'px-4 py-3 bg-blue-500 text-white rounded'} onClick={() => setShowQuestionForm(true)}>New Question</button>
                </div>} 
    
              {/* {selectedCategory && <div className={'w-1/3 p-2'}>
              <textarea value={questionTxt} onChange={(ev)=> setQuestionTxt(ev.currentTarget.value)} 
              type="text" 
              className={'border p-1 full'}
              placeholder={'Enter a Question'} />
              <button className={'border rounded-md px-4 py-3 bg-blue-500 text-white'} onClick={createQuestion}>Add a Question</button>
              </div>}
              {/* <p>{text}</p> */}
              {/* <ul>
              {question && question.map((question) => {
                        return <li key={question.id}>
                            {question.questionTxt}
                        </li>
                    })}
              </ul> */}
          
               {selectedCategory ? <h1 className={'text-center text-4xl uppercase'}>Questions</h1> : <h1 className={'text-center text-4xl mt-20 uppercase text-blue-500'}>Select a Category to continue</h1>} 

              <p>{JSON.stringify(selectedQuestion)}</p>
              {selectedCategory && questions && questions.length > 0 && <div className={'flex justify-center px-24 w-full'}>
                <Collapse accordion className={'w-full'} onChange={onPanelChange}>
                  {questions && questions.map((question) => {
                    return <Panel header={question.questionTxt} key={question.id}>

                                <p>This is where you add the answers list for this particular question</p>

                                <button className={'px-2 py-1 bg-blue-500 text-white rounded'}>New Answer</button>
                                </Panel>
                        })}
                    </Collapse>
                </div>}
        </div>
      </div>
    </div>
        
  );
}

export default Callback;
