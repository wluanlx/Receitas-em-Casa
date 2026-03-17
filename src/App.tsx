/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ChefHat, 
  Clock, 
  BarChart, 
  Heart, 
  History as HistoryIcon, 
  Moon, 
  Sun, 
  ArrowLeft, 
  Share2, 
  X,
  Plus,
  Filter,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Recipe, SearchHistory } from './types';
import { INITIAL_RECIPES } from './data/recipes';
import { generateRecipesFromIngredients } from './services/gemini';

type View = 'home' | 'results' | 'recipe' | 'favorites' | 'history';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: (id: string) => boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect, onToggleFavorite, isFavorite }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="card group"
    onClick={() => onSelect(recipe)}
  >
    <div className="relative h-40 overflow-hidden">
      <img 
        src={recipe.image} 
        alt={recipe.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className="absolute top-2 right-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
          className="p-2 bg-white/95 dark:bg-slate-800/95 rounded-full shadow-md backdrop-blur-sm"
        >
          <Heart size={16} className={isFavorite(recipe.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'} />
        </button>
      </div>
      <div className="absolute bottom-2 left-2">
        <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-[10px] font-black px-2 py-1 rounded-lg shadow-sm border border-white/20">
          {recipe.difficulty}
        </span>
      </div>
    </div>
    <div className="p-3 space-y-2">
      <h3 className="font-black text-sm text-slate-800 dark:text-white leading-tight line-clamp-2 group-hover:text-primary transition-colors">
        {recipe.name}
      </h3>
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <Clock size={12} className="text-primary" />
          <span>{recipe.prepTime} min</span>
        </div>
        <div className="flex items-center gap-1">
          <ChefHat size={12} className="text-primary" />
          <span>{recipe.ingredients.length} itens</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  // State
  const [view, setView] = useState<View>('home');
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem('fav_recipes');
    const savedHistory = localStorage.getItem('search_history');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('fav_recipes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('search_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Search
  const handleGenerateRecipes = async () => {
    if (!ingredientsInput.trim()) return;

    setLoading(true);
    const inputIngredients = ingredientsInput.toLowerCase().split(',').map(i => i.trim()).filter(i => i !== '');
    
    // Add to history
    const newHistory: SearchHistory = {
      id: Date.now().toString(),
      ingredients: inputIngredients,
      timestamp: Date.now()
    };
    setHistory(prev => [newHistory, ...prev].slice(0, 20));

    // 1. Filter local recipes
    const localMatches = INITIAL_RECIPES.filter(recipe => {
      const matchCount = recipe.ingredients.filter(ing => 
        inputIngredients.some(input => ing.toLowerCase().includes(input))
      ).length;
      return matchCount > 0;
    }).sort((a, b) => {
      const matchA = a.ingredients.filter(ing => inputIngredients.some(input => ing.toLowerCase().includes(input))).length;
      const matchB = b.ingredients.filter(ing => inputIngredients.some(input => ing.toLowerCase().includes(input))).length;
      return matchB - matchA;
    });

    // 2. Try to get AI recipes if local matches are few
    let aiMatches: Recipe[] = [];
    if (localMatches.length < 5) {
      aiMatches = await generateRecipesFromIngredients(inputIngredients);
    }

    const allMatches = [...localMatches, ...aiMatches];
    // Remove duplicates by name
    const uniqueMatches = Array.from(new Map(allMatches.map(item => [item.name, item])).values());

    setFilteredRecipes(uniqueMatches);
    setLoading(false);
    setView('results');
  };

  const handleManualSearch = (query: string) => {
    setSearchQuery(query);
    const results = INITIAL_RECIPES.filter(r => 
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredRecipes(results);
    setView('results');
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === recipe.id);
      if (isFav) return prev.filter(f => f.id !== recipe.id);
      return [...prev, recipe];
    });
  };

  const isFavorite = (recipeId: string) => favorites.some(f => f.id === recipeId);

  const shareRecipe = (recipe: Recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `Confira esta receita de ${recipe.name} no app Receitas com o que Tem em Casa!`,
        url: window.location.href,
      });
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  };

  // Components
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
        <div className="bg-primary p-2 rounded-xl shadow-md shadow-green-100 dark:shadow-none">
          <ChefHat className="text-white" size={20} />
        </div>
        <h1 className="font-black text-base tracking-tight text-slate-800 dark:text-white">Receitas em Casa</h1>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
        </button>
        <button onClick={() => setView('favorites')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
          <Heart size={18} className={view === 'favorites' ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-400'} />
          {favorites.length > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">{favorites.length}</span>}
        </button>
        <button onClick={() => setView('history')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <HistoryIcon size={18} className="text-slate-600 dark:text-slate-400" />
        </button>
      </div>
    </nav>
  );



  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <Navbar />

      <main className="flex-1 px-4 py-2">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 py-4"
            >
              <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tight text-primary leading-tight">
                  O que tem na <br/>geladeira?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Digite seus ingredientes e veja a mágica.</p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <textarea 
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    placeholder="Ex: arroz, ovo, frango..."
                    className="w-full h-32 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-700 outline-none transition-all text-base resize-none shadow-inner"
                  />
                  {ingredientsInput && (
                    <button 
                      onClick={() => setIngredientsInput('')}
                      className="absolute top-4 right-4 p-1 bg-slate-200 dark:bg-slate-600 rounded-full text-slate-500 dark:text-slate-300"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sugestões rápidas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['arroz', 'ovo', 'frango', 'tomate', 'batata', 'queijo', 'macarrão'].map(ing => (
                      <button 
                        key={ing}
                        onClick={() => {
                          const current = ingredientsInput.trim();
                          if (!current.toLowerCase().includes(ing)) {
                            setIngredientsInput(prev => prev ? `${prev}, ${ing}` : ing);
                          }
                        }}
                        className="px-3 py-1.5 bg-accent dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all border border-green-100 dark:border-slate-700 active:scale-90"
                      >
                        + {ing}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleGenerateRecipes}
                  disabled={loading || !ingredientsInput.trim()}
                  className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100 py-5 text-lg"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ChefHat size={22} />
                      GERAR RECEITAS
                    </>
                  )}
                </button>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Search size={16} className="text-primary" />
                  Busca por nome
                </h3>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Ex: Omelete, Bolo..."
                    className="w-full p-4 pl-11 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-primary text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSearch((e.target as HTMLInputElement).value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
            </motion.div>
          )}

          {view === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5 py-2"
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setView('home')} className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-primary font-bold text-sm">
                  <ArrowLeft size={18} /> Voltar
                </button>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <Filter size={14} className="text-primary" />
                  <select 
                    onChange={(e) => setTimeFilter(e.target.value ? parseInt(e.target.value) : null)}
                    className="bg-transparent text-[11px] font-bold outline-none appearance-none pr-1"
                  >
                    <option value="">Tempo</option>
                    <option value="15">Até 15 min</option>
                    <option value="30">Até 30 min</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-800 dark:text-white">Sugestões para você</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Encontramos {filteredRecipes.length} opções.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filteredRecipes
                  .filter(r => !timeFilter || r.prepTime <= timeFilter)
                  .map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onSelect={(r) => { setSelectedRecipe(r); setView('recipe'); }}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                  />
                ))}
              </div>

              {filteredRecipes.length === 0 && (
                <div className="text-center py-16 space-y-4">
                  <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Search size={24} className="text-slate-300" />
                  </div>
                  <h3 className="font-bold text-lg">Nada encontrado</h3>
                  <p className="text-xs text-slate-500 px-10">Tente ingredientes mais comuns ou verifique a ortografia.</p>
                  <button onClick={() => setView('home')} className="text-primary font-bold text-sm">Tentar novamente</button>
                </div>
              )}
            </motion.div>
          )}

          {view === 'recipe' && selectedRecipe && (
            <motion.div 
              key="recipe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-5 pb-10"
            >
              <div className="relative h-60 -mx-4 -mt-2 rounded-b-[2.5rem] overflow-hidden shadow-xl">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <button onClick={() => setView('results')} className="p-3 bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-lg text-slate-800 dark:text-white">
                    <ArrowLeft size={20} />
                  </button>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => shareRecipe(selectedRecipe)} className="p-3 bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-lg text-slate-800 dark:text-white">
                    <Share2 size={20} />
                  </button>
                  <button onClick={() => toggleFavorite(selectedRecipe)} className="p-3 bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-lg">
                    <Heart size={20} className={isFavorite(selectedRecipe.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-accent dark:bg-slate-800 text-primary font-black text-[10px] uppercase tracking-widest px-2 py-1 rounded-md border border-green-100 dark:border-slate-700">
                      {selectedRecipe.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{selectedRecipe.name}</h2>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-[11px] font-bold">
                      <Clock size={14} className="text-primary" /> {selectedRecipe.prepTime} min
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-[11px] font-bold">
                      <BarChart size={14} className="text-primary" /> {selectedRecipe.difficulty}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-[11px] font-bold">
                      <Plus size={14} className="text-primary" /> {selectedRecipe.servings}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-black flex items-center gap-2 text-slate-800 dark:text-white">
                    <div className="w-1.5 h-5 bg-primary rounded-full" />
                    Ingredientes
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="capitalize text-sm font-medium text-slate-700 dark:text-slate-300">{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-black flex items-center gap-2 text-slate-800 dark:text-white">
                    <div className="w-1.5 h-5 bg-primary rounded-full" />
                    Modo de Preparo
                  </h3>
                  <div className="space-y-4">
                    {selectedRecipe.instructions.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center font-black text-xs shadow-md shadow-green-100 dark:shadow-none">
                          {i + 1}
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'favorites' && (
            <motion.div 
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5 py-2"
            >
              <div className="flex items-center gap-3">
                <button onClick={() => setView('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-black">Meus Favoritos</h2>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <Heart size={40} className="mx-auto text-slate-200" />
                  <p className="text-sm text-slate-500">Nenhuma receita salva ainda.</p>
                  <button onClick={() => setView('home')} className="text-primary font-black text-sm">Explorar receitas</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {favorites.map(recipe => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      onSelect={(r) => { setSelectedRecipe(r); setView('recipe'); }}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isFavorite}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {view === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5 py-2"
            >
              <div className="flex items-center gap-3">
                <button onClick={() => setView('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-black">Histórico</h2>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <HistoryIcon size={40} className="mx-auto text-slate-200" />
                  <p className="text-sm text-slate-500">Seu histórico está limpo.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map(item => (
                    <div 
                      key={item.id} 
                      className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-accent dark:hover:bg-slate-700 transition-all active:scale-98"
                      onClick={() => {
                        setIngredientsInput(item.ingredients.join(', '));
                        handleGenerateRecipes();
                      }}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Search size={16} className="text-slate-400 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="font-bold text-sm text-slate-700 dark:text-slate-200 truncate">{item.ingredients.join(', ')}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{new Date(item.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-primary flex-shrink-0" />
                    </div>
                  ))}
                  <button 
                    onClick={() => setHistory([])}
                    className="w-full py-3 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Limpar histórico
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="sticky bottom-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 flex justify-around py-3 pb-6">
        <button onClick={() => setView('home')} className={`p-2 flex flex-col items-center gap-1 transition-colors ${view === 'home' ? 'text-primary' : 'text-slate-400'}`}>
          <Search size={18} />
          <span className="text-[9px] font-black uppercase tracking-wider">Busca</span>
        </button>
        <button onClick={() => setView('favorites')} className={`p-2 flex flex-col items-center gap-1 transition-colors ${view === 'favorites' ? 'text-primary' : 'text-slate-400'}`}>
          <Heart size={18} />
          <span className="text-[9px] font-black uppercase tracking-wider">Favoritos</span>
        </button>
        <button onClick={() => setView('history')} className={`p-2 flex flex-col items-center gap-1 transition-colors ${view === 'history' ? 'text-primary' : 'text-slate-400'}`}>
          <HistoryIcon size={18} />
          <span className="text-[9px] font-black uppercase tracking-wider">Histórico</span>
        </button>
      </div>
    </div>
  );
}
