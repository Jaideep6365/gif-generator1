import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './Spinner';

const API_KEY= process.env.REACT_APP_GIPHY_API_KEY;

const Random = () => {

    const[gif,setGif]=useState('')
    const [loading,setLoading]=useState(false);

    async function fetchData(){
        setLoading(true);
        const url=`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
        const output=await axios.get(url);
        const imageSource=output.data.data.images.downsized_large.url;
        setGif(imageSource);
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    function clickHandler(){
        fetchData();
    }

  return (

    <div className='w-1/2 bg-green-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] p-4'>
        <hi className="text-2xl underline uppercase font-bold">A Random Gif</hi>

        {
            loading ? (<Spinner/>):(<img src={gif} width="450"/>)
        }

        

        <button onClick={clickHandler}
        className='w-10/12 bg-emerald-300 text-lg py-2 rounded-lg transition duration-300 ease-in-out hover:bg-teal-400'>
            Generate
        </button>
    </div>
  )
}

export default Random
