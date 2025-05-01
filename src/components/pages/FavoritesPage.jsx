import React from 'react'
import Img404 from "../../../public/404.svg"
import RecipeCard from '../RecipeCard';
import { getRandomColor } from '../../lib/utils';
import { useSelector } from 'react-redux';

function FavoritesPage() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const theme = useSelector((state) => state.themeMode.theme);
  return (
    <div className={`flex-1 p-10 min-h-screen ${theme === "dark" ? "bg-gray-900 " : "bg-[#faf9fb] "}`}>
      <div className='max-w-screen-lg mx-auto'>
        <p className={`font-bold text-3xl md:text-5xl my-4 ${theme === "dark" ? "text-white" : "text-black"}` }>My Favorites</p>

        
          {favorites.length === 0 && (<div className='h-[80vh] flex flex-col items-center gap-4'>
            <img src={Img404} className='h-3/4' alt="404 svg" />
          </div>)
          }
        

        
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {favorites.map((recipe) => (
              <RecipeCard className={`${theme === "dark" ? "text-white" : "text-black"}`} key={recipe.label} recipe={recipe} {...getRandomColor()} />
            ))}
          </div>
        

      </div>
    </div>
  )
}

export default FavoritesPage
