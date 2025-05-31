export const validatEmail=(email)=>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
export const getInitials =(name)=>{
    if(!name) return "";

    const words = name.split(" ")
    let initials="";
    for(let i=0; i<Math.min(words.length,2); i++){
        initials += words[i][0];

    }
    return initials.toUpperCase();



}

export const getEmptyCardMessage=(filterType)=>{
    switch(filterType){
        case "search":
            return `Oops ! No stories foung matching your search`;
        case "date":
            return `No stories available within the selected date range`;
        default:
            return `Start creating new stories`;
    }
}