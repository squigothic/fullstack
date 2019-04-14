
const showNotification = (setNotificationMessage, message) => {    
    console.log(message)
    
    setNotificationMessage(message)
    setTimeout(() => {
    setNotificationMessage(null)
    }, 1500)
}

export default showNotification