import React from "react";
import LOGO from '../assets/images/logo.svg'
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Input/SearchBar";

function Navbar({userInfo,onLogout,
    searchQuery,
    setSearchQuery, 
    onSearchNote,
    handleClearSearch}) {
    
  const handleSearch=()=>{
    
    if(searchQuery){
        onSearchNote(searchQuery)
        
    }
  }
  const onClearSearch=()=>{
    handleClearSearch()
    setSearchQuery('')
  }
//   console.log(searchQuery)
    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
           <img src={LOGO} alt="Travel Story"/>
           <SearchBar 
           value={searchQuery}
           onChange={({target})=>{
             setSearchQuery(target.value)
             
           }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
           />
           <ProfileInfo userInfo={userInfo}  onLogout={ onLogout}/>
        </div>
    )
}

export default Navbar;