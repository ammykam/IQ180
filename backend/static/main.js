const app = new Vue({
    el: '#app',
    data: {
        socket:null,
        numberOnlineUser:0,
        numberReadyUser:0,
        onlineUser:[],
        readyUser:[],
        problem:'',
    },
    methods: {
        reset(){
            this.socket.emit("reset",true)
            console.log('game has been reset')
        }

    },
    created(){
        this.socket = io('http://localhost:3000')

        this.socket.emit("serverClient")
        this.socket.emit("askInformation")

        this.socket.on('OnlineUser', (message)=>{
            this.numberOnlineUser = message.length
            this.onlineUser = message
            //console.log(message)
        })
        this.socket.on('ReadyUser', (message)=>{
            this.numberReadyUser = message.length
            this.readyUser = message
        })
        this.socket.on("problemToServer", (message)=>{
            this.problem = message
        })
    }
})