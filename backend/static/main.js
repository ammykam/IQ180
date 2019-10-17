

const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        socket: null
    },
    methods: {
        reset(){
            this.socket.emit('reset',true)
        },
        sendMessage() {
            if(this.validateInput()){
                // const message  = {
                //     name: this.name,
                //     text: this.text
                // }
                this.socket.emit('createUser',{name:this.name,avatar:this.text })
                this.socket.emit('msgToServer',message)
                this.text=''
            }
        },

        sendProfile() {
            this.socket.emit('createUser',{
                name: this.username, 
                avatar: this.text,
            })
            this.text=''
        },

        recievedMessage(message){
            this.messages.push(message)
        },
        validateInput(){
            return this.name.length > 0 && this.text.length > 0
        },
        readyMessage(){
            //console.log('ready work')
            this.socket.emit('readyUser',true)
        },
        startMessage(){
            console.log('start work')
            this.socket.emit('start',true)
        }
    },
    created(){
        this.socket = io('http://localhost:3000')
        this.socket.on('msgToClient', (message)=>{
            this.recievedMessage(message)
        })
    
    }
})