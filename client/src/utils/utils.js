import { io } from "socket.io-client"

export const userID = localStorage.getItem('userID');

export const socket = io('http://localhost:3500', {
    query: {
        user: userID
    },
    autoConnect: false,
    transports: ["polling", "websocket"]
})

export const groupNamesPicker = {
    smileys_people: '',
    animals_nature: '',
    food_drink: '',
    travel_places: '',
    activities: '',
    objects: '',
    symbols: '',
    flags: '',
    recently_used: ''
}

export const PickStyle = ({ width, height, y }) => {
    const styleTree = {
        backgroundColor: "#29204D", 
        border: "none", 
        outline: 'none', 
        boxShadow: "none", 
    }

    const style = {
        transform: `translateY(${y})`,
        width: width,
        height: height, 
        ...styleTree
    }

    return style
}

export const formatSendMessage = (timeStamp) => {
    const d = new Date();

    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var date = d.getDate();
    var hours = d.getHours();
    var minute = d.getMinutes();
    
    let dateNow = `${days[d.getDay()]} ${month[d.getMonth()]} ${date <= 10 ? `0${date}` : date} ${d.getFullYear()} ${hours <= 10 ? `0${hours}` : hours}:${minute <= 10 ? `0${minute}` : minute} ${hours >= 12 ? 'PM' : 'AM'}`.split(' ');
    let dateSend = timeStamp.split(' ');

    const dateSub = ((parseInt(dateNow[2])) - (parseInt(dateSend[2])))

    if(dateSend[1] ===  dateNow[1] && dateSend[2] === dateNow[2] && dateSend[3] === dateNow[3]){
        return dateSend[4] // hours send
    }else if(dateSend[1] ===  dateNow[1] && dateSend[3] === dateNow[3] && dateSub <= 7 && dateSub >= 2){
        return dateSend[0] // name days send
    }else if(dateSend[1] ===  dateNow[1] && dateSend[3] === dateNow[3] && dateSub == 1){
        return 'kemaren'
    }else{
        return `${dateSend[2]}/${d.getMonth()}/${dateSend[3]}` // dd/mm/yy
    }
}
