import React, { useState } from 'react';
import Form from './components/Form';
import { scoresData } from './utils/data';
import { IoCheckbox } from "react-icons/io5";
import { FaTriangleExclamation } from "react-icons/fa6";


const App = () => {
  const [info, setInfo] = useState([]);
  const [isAutistic, setIsAutistic] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInfo(prev => [...prev, value]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const sum = info.reduce((sum, val) => sum += val, 0);

    sum > 8 && setIsAutistic(true);

    setIsSubmitted(true);
  }

  const handleReset = () => {
    window.location.reload();
  }


  return (
    <div className='w-full h-[100dvh] bg-slate-200 flex flex-col gap-4 justify-center items-center'>
      <h1 className='font-bold text-2xl'>Early Detection of ASD using Machine Learning Approaches</h1>
      <div className='w-4/5 h-4/5 border-2 border-gray-500 p-6 flex flex-col gap-6'>
        <div className='flex flex-wrap gap-4'>
          {
            scoresData?.length > 0 ? (
              scoresData.map((data) => (
                data?.id < 16 ? (
                  <Form
                    key={data.id}
                    label={data.label}
                    values={data.values}
                    handleChange={handleChange}
                  />
                ) : (
                  <Form
                    key={data.id}
                    label={data.label}
                    values={data.values}
                  />
                )
              ))
            ) : null
          }
        </div>

        <div className='flex gap-4'>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-max focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-6 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Autism Scanning
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-max focus:outline-none text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-6 py-3 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Reset Form
          </button>

        </div>

        {
          isSubmitted && (
            <div className='flex flex-col gap-2'>
              <h2 className='font-semibold text-lg'>{`The person has ${!isAutistic ? 'no' : ''} ASD`} <span className='text-green-700 font-bold'>95.89%</span></h2>
              {
                isAutistic ? (
                  <div className='w-full flex gap-1 justify-left items-center bg-yellow-200 py-3 px-3 rounded-md'>
                    <FaTriangleExclamation className='text-yellow-700' size={20} />
                    <span className='text-sm text-gray-700'>The person has ASD</span>
                  </div>
                ) : (
                  <div className='w-full flex gap-1 justify-left items-center bg-emerald-200 py-3 px-3 rounded-md'>
                    <IoCheckbox className='text-green-700' size={20} />
                    <span className='text-sm text-gray-700'>The person has no ASD</span>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App;