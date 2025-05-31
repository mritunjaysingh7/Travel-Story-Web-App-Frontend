import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/Cards/EmptyCard";
import EmptyImage from '../../assets/images/add.svg'
import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle";
import { getEmptyCardMessage } from "../../utils/helper";

function Home() {
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: ""
    })
    const [allStories, setAllStories] = useState([])
    const [openAddEditModel, setOpenAddEditModel] = useState({
        isShown: false,
        type: 'add',
        data: null
    })
    const [openViewModal, setOpenViewModal] = useState({
        isShown: false,
        data: null
    })
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState('')
    const [dateRange,setDateRange]=useState({from:null, to:null})

    const navigate = useNavigate()
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user')
            if (response.data && response.data.user) {
                setUserInfo({
                    fullName: response.data.user.fullName,
                    email: response.data.user.email,
                    password: response.data.user.password
                })

                //  console.log(response.data.user)
            }
        }
        catch (err) {
            if (err.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    }
    const getAllTravelStories = async () => {
        try {
            const response = await axiosInstance.get('/get-all-stories')
            if (response.data && response.data.stories) {

                setAllStories(response.data.stories)
                // console.log(allStories)
            }
        } catch (err) {
            console.log(err.response.message)

        }
    }

    const handleEdit = (data) => {
        setOpenAddEditModel({
            isShown: true,
            type: 'edit',
            data: data
        })
    }
    const handleViewStory = (data) => {
        setOpenViewModal({ isShown: true, data })

    }
    const updateIsFavourite = async (storyData) => {
        const storyId = storyData._id;
        try {
            const response = await axiosInstance.put('/update-is-favourite/' + storyId, {
                isFavorite: !storyData.isFavourite
            })
            if (response.data && response.data.story) {
                if(filterType ==="search" && searchQuery){
                    onSearchStory(searchQuery);
                }
                else if(filterType ==="date"){
                    filterStoriesByDate(dateRange)
                }
                else{
                    getAllTravelStories()
                }
            }
        } catch (err) {
            console.log(err.response.message)
        }
    }

    const deleteTravelStory = async (data) => {
        const storyId = data._id
        try {
            const response = await axiosInstance.delete("/delete-story/" + storyId)
            if (response.data && !response.data.error) {
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
                toast.success('Story deleted successfully')
                getAllTravelStories()
            }
        } catch (error) {

            console.log("Failed to add story, please try again.")

        }
    }

    const onLogout = async () => {
        localStorage.clear();
        navigate('/login');
    }

    const onSearchStory = async (query) => {
        try {
            const response = await axiosInstance.post(`/search?query=${query}`, {
                // params: {
                //     query:query
                // }
            }
            )
            if (response.data && response.data.stories) {
                setFilterType("searxh")
                setAllStories(response.data.stories)
            }

        } catch (error) {

            console.log("Failed to add story, please try again.")

        }

    }
    const handleClearSearch = () => {
        setFilterType('')
        getAllTravelStories()
    }
     //Handle Filter travel story by date range
      const filterStoriesByDate= async(day)=>{
        try{
            const startDate= dateRange.from ? moment(day.from).valueOf():null
            const endDate= dateRange.to? moment(day.to).valueOf():null
            if(startDate && endDate){
                const response= await axiosInstance.get('/travel-stories/filter',{
                    params:{
                        startDate:startDate,
                        endDate:endDate
                    }
                })
                if(response.data && response.data.stories){
                    setFilterType('date')
                    setAllStories(response.data.stories)
                }


            }
        }catch(error){
          console.log("Failed to filter stories by date range, please try again.")
        }
      }
    //Handle Date Range Select
    const handleDayClick=(day)=>{
        setDateRange(day)
        filterStoriesByDate(day)
    }
    const resetFilter=()=>{
        setFilterType('')
        setDateRange({from:null, to:null})
        getAllTravelStories()
    }

    useEffect(() => {
        getUserInfo(),
            getAllTravelStories()
    }, [])




    return (
        <>
            <Navbar userInfo={userInfo} onLogout={onLogout}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchNote={onSearchStory}
                handleClearSearch={handleClearSearch}
            />
            <div className='container mx-auto py-10'>
            <FilterInfoTitle
                filterType={filterType}
                filterDates={dateRange}
                onClear={()=>{
                    resetFilter();
                }}
            />
                <div className='flex gap-7'>
                    <div className='flex-1'>
                        {allStories.length > 0 ?
                            <div className='grid grid-cols-2 gap-12 pl-4'>
                                {allStories.map((item) => {
                                    return (
                                        <TravelStoryCard
                                            key={item._id}
                                            imgUrl={item.imageUrl}
                                            title={item.title}
                                            story={item.story}
                                            date={item.visitedDate}
                                            visitedLocation={item.visitedLocation}
                                            isFavourite={item.isFavourite}

                                            onClick={() => handleViewStory(item)}
                                            onFavouriteClick={() => updateIsFavourite(item)}

                                        />
                                    )

                                })}
                            </div> :
                            <EmptyCard imgSrc={EmptyImage}

                             message={getEmptyCardMessage(filterType)} />
                        }
                    </div>
                    <div className='w-[350px]'>
                        <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
                            <div className="p-3">
                            <DayPicker 
                            captionLayout="dropdown-buttons"
                            mode="range"
                            selected={dateRange}
                            onSelect={handleDayClick}
                            pagedNavigation/> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal
                isOpen={openAddEditModel.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        zIndex: 999
                    }
                }}
                appElement={document.getElementById('root')}
                className='model-box'
            >
                <AddEditTravelStory
                    type={openAddEditModel.type}
                    storyInfo={openAddEditModel.data}
                    onClose={() => {
                        setOpenAddEditModel({
                            isShown: false,
                            type: 'add',
                            data: null
                        })
                    }}
                    getAllTravelStories={getAllTravelStories}

                />
            </Modal>
            <Modal
                isOpen={openViewModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        zIndex: 999
                    }
                }}
                appElement={document.getElementById('root')}
                className='model-box'
            >
                <ViewTravelStory
                    storyInfo={openViewModal.data || null}
                    onClose={() => {
                        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
                    }}
                    onEditClick={() => {
                        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
                        handleEdit(openViewModal.data || null)
                    }}
                    onDeleteClick={() => {
                        deleteTravelStory(openViewModal.data || null)
                    }}
                />
            </Modal>
            <button
                className='w-16 h-16 flex items-center justify-center rounded-full bg-cyan-900 hover:bg-cyan-400 fixed right-10 bottom-10'
                onClick={() => {
                    setOpenAddEditModel({
                        isShown: true,
                        type: 'add',
                        data: null
                    })
                }}


            >
                <MdAdd className='test-[32px] text-white' />
            </button>

            <ToastContainer />
        </>
    )
}

export default Home;