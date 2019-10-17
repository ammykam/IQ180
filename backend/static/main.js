

const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        users:[],
        readyUsers:[],
        orderUsers:[],
        socket: null
    },
    methods: {
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
                name: this.name, 
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
            //console.log('start work')
            this.socket.emit('start',true)
        },
        orderMessage(message){
            this.orderUsers.push(message)
        }
    },
    created(){
        this.socket = io('http://localhost:3000')
        this.socket.on('msgToClient', (message)=>{
            this.recievedMessage(message)
        })
        this.socket.on('OnlineUser',(message)=>{
            //console.log('new messages conming..')
            // for(let i=0;i<message.length;i++){
            //     this.users[i]=message.name[i];
            // }
            this.user=[]
            this.users=message
        })
        this.socket.on('ReadyUser',(message)=>{
            this.readyUsers=message
        })
        this.socket.on('readyToPlay',(message)=>{
            //console.log('readytoplay')
            // this.orderUsers=[];
            this.orderMessage(message)
        })  
    
    }
})