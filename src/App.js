import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=d44619de';

const App = ()=>{
    const [movies, setMovies] = useState([]);
    const [search,setSearch]= useState("");
    const searchMovies=async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search);
    }
    
    useEffect(()=>{
        searchMovies('Spiderman');
    },[]);
    
    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input placeholder="Search movie name" 
                value ={search} 
                onChange={(e)=>setSearch(e.target.value)} />
                
                <img src={searchIcon} 
                alt="search"
                onClick={()=> searchMovies(search)}/>    
            </div>
            {
                movies.length>0?(
                    <div className="container">
                        {movies.map((movie)=>(
                        <MovieCard props={movie} />
                        ))}           
                    </div>
                ):(
                    <div className='empty'>
                    <h2>No Movies Found!</h2>
                    </div>
                )
            }
            
        </div>
    );
}

export default App;