// format date message sending
const d = new Date()

var date = d.getDate();
var hours = d.getHours();
var minute = d.getMinutes();

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatDate = `${days[d.getDay()]} ${month[d.getMonth()]} ${date <= 10 ? `0${date}` : date} ${d.getFullYear()} ${hours <= 10 ? `0${hours}` : hours}:${minute <= 10 ? `0${minute}` : minute} ${hours >= 12 ? 'PM' : 'AM'}`;

// stroge url PhotoProdfile
const storagePhotoProfil = "http://localhost:5000/images/profileUser/"

const strogeImageMessage = "http://localhost:5000/images/ImageMessage/"

module.exports = { formatDate, storagePhotoProfil, strogeImageMessage }