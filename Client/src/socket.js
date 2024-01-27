import io from 'socket.io-client'

let socket

const connectSocket = (user_id)=>{
    // socket = io("http://localhost:5000",{
    socket = io("https://pingsphere-production.up.railway.app",{
        query: `user_id=${user_id}`
    })
}

export {socket, connectSocket}

// "https://pingsphere-server-gkfs.onrender.com"