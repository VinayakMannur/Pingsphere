import io from 'socket.io-client'

let socket

const connectSocket = (user_id)=>{
    socket = io("http://3.84.228.149",{
        query: `user_id=${user_id}`
    })
}

export {socket, connectSocket}

// "https://pingsphere-server-gkfs.onrender.com"