import React, { useState } from 'react'
import Image1 from "../../public/1.jpg"
import { Heart, HeartPulse, Soup } from 'lucide-react'

const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1] ,arr[2]]
}
function RecipeCard({recipe, bg}) {
  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);
  
  const [isFavorite, setIsFavorite] = useState(localStorage.getItem("favorites")?.includes(recipe.label));

  const addRecipeToFavorites = () => {
    let favorites  = JSON.parse(localStorage.getItem("favorites")) || []; //localstoregeden eleman gelmezse boş [] döndür
    const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label); //some =>dizideki en az bir eleman,verilen koşulu sağlıyor mu?
    if(isRecipeAlreadyInFavorites){
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    }else{
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative` }>
                <a href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} target="_blank" rel="noopener noreferrer" className='relative h-32'>
                  <img src={recipe.image} alt="recipe img" className='rounded-md w-full h-full object-cover cursor-pointer' />
                  <div className='absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm '>
                    <Soup size={"16"} className='relative bottom-[1px]' /> {recipe.yield} Servings
                  </div>
                  <div className='absolute top-2 right-2 bg-gray-300 rounded-full p-1 cursor-pointer'
                  onClick={(e) => {
                    e.preventDefault();
                    addRecipeToFavorites();
                  }}>

                    {!isFavorite && <Heart size={"20"} className='hover:fill-red-500 hover:text-red-500'/>}
                    {isFavorite && <Heart size={"20"} className='fill-red-500 text-red-500'/>}
                    
                  </div>
                </a>
                <div className='flex mt-1 '>
                  <p className='font-bold tracking-wide'>{recipe.label}</p>
                </div>
                <p className='my-2'>{recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Kitchen</p>


                <div className='flex gap-2 mt-auto'>
                  {healthLabels.map((label, indx)=>
                    <div key={indx} className={`flex gap-1 ${bg} items-center p-1 rounded-md`}>
                      <HeartPulse size={16} />
                      <span className='text-sm tracking-wide font-semibold' >{label}</span>
                    </div>
                  )}
    
                </div>
              </div>
  )
}

export default RecipeCard
