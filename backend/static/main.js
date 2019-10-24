const app = new Vue({
    el: '#app',
    data: {
        socket:null,
        numberOnlineUser:0,
        numberReadyUser:0,
        onlineUser:[],
        readyUser:[],
        problem:'',
        singlePlayer:[],
        numberSinglePlayer:0,
    },
    methods: {
        reset(){
            this.problem=''
            this.socket.emit("reset",true)
            console.log('game has been reset')
        }

    },
    created(){
        this.socket = io(window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""))

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
        this.socket.on("allSinglePlayer",(message)=>{
            this.numberSinglePlayer = message.length
            this.singlePlayer = message
        })
    }
})