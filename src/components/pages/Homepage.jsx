import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import axios from "axios";
import { Search } from "lucide-react";
import { getRandomColor } from "../../lib/utils";
import RecipeCard from "../RecipeCard";

const APP_ID = "d14f42d5";
const APP_KEY = "d662af0dcaeb937c5d3c9dc45cf928aa";

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);
  
  
  useEffect(() => {
    
    fetchRecipes("pasta");
  }, []);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await axios.get("https://api.edamam.com/api/recipes/v2", {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          q: searchQuery,
          type: "public",
        },
      });
      setRecipes(res.data.hits);
      console.log(res.data.hits);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    const query = searchInputRef.current.value.trim();
    if (query) {
      fetchRecipes(query);
    }
  };

  const theme = useSelector((state) => state.themeMode.theme);
  const dispatch = useDispatch();


  return (
    <div className={`p-10 flex-1 min-h-screen ${theme === "dark" ? "bg-gray-900 " : "bg-[#faf9fb] text-black"}`}>
      <div className="max-w-screen-lg mx-auto">
        {/* Dark mode switch */}
        <div className="flex items-center justify-end mb-6 gap-2 md:gap-3 lg:gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={() => dispatch(toggleTheme())}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
          </label>
          <span className={`text-sm font-medium gap-3 ${theme ===  "dark" ? "text-white" : "text-black"} `}>
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={24} />
            <input
              ref={searchInputRef}
              type="text"
              className="text-sm md:text-md grow bg-transparent"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        {/* Recipes Section */}
        <h1 className={`font-bold text-3xl md:text-5xl mt-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
          Recommended Recipes
        </h1>
        <p className={`mt-2 mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
          Popular Choices
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            recipes.map(({ recipe }, index) => {
              const randomColor = getRandomColor();
              return (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  bg={randomColor.bg}
                  badge={randomColor.badge}
                />
              );
            })}

          {loading &&
            [...Array(12)].map((_, index) => (  // 12 elemanlı boş array.loading devam ettiği için map'leyerek 12 skeleton gösterdik.
              <div key={index} className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
