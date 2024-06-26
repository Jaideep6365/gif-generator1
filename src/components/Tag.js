import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {
  const [tag, setTag] = useState('');
  const [gif, setGif] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchData(tag) {
    setLoading(true);
    try {
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
      const output = await axios.get(url);
      const imageSource = output.data.data.images.downsized_large.url;
      setGif(imageSource);
      console.log(imageSource)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData(tag);
  }, []);

  function clickHandler() {
    fetchData(tag);
  }

  function changeHandler(event) {
    setTag(event.target.value);
  }

  return (
    <div className='w-1/2 bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] p-4'>
      <h1 className="text-2xl underline uppercase font-bold">{tag} Gif</h1>

      {loading ? (
        <Spinner />
      ) : (
        <img src={gif} alt="Gif" width="450" />
      )}

      <input
        className='w-10/12 bg-stone-200 text-lg py-2 rounded-lg text-center'
        onChange={changeHandler}
        value={tag}
        placeholder="Enter a tag"
      />

        <button onClick={clickHandler}
        className='w-10/12 bg-teal-200 text-lg py-2 rounded-lg transition duration-300 ease-in-out hover:bg-emerald-400'>
        Generate
        </button>

    </div>
  );
}

export default Tag;
