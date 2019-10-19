

const app = new Vue({
    el: '#app',
    data: {
        title: 'IQ180',
        name: '',
        text: '',
        messages: [],
        users:[],
        readyUsers:[],
        orderUsers:[],
        answers:0,
        checkAnswer:'',
        correctAnswer:false,
        timer:'',
        roundWinner:'',
        gameWinner:'',
        round: 0,
        socket: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()){
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
            this.orderUsers=[]
            this.socket.emit('start',true)
        },
        orderMessage(message){
            this.orderUsers.push(message)
        },
        reset(){
            //console.log('reset activated')
            this.socket.emit('reset',true)
            this.orderUsers=[]
            this.socket.emit('start',true)
        },
        answer(){
            //console.log('answer work')
            this.socket.emit('answer',{checkAns: this.checkAnswer, time: this.timer});
        },
        checkTime(){
            //console.log('timer work ka')
            this.socket.emit('checkTime')
        },
        gameEnd(){
            //console.log('gameEnd')
            this.socket.emit('checkWinner')
        },

        nextRound(){
            console.log('nextRound work ka')
            this.socket.emit('nextRound')
            this.orderUsers =[]
        }

    },
    created(){
        this.socket = io('http://localhost:3200')
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
            this.orderUsers=[];
            this.orderMessage(message)
        }) 
        this.socket.on('answerToClient',(message)=>{
            //console.log('reciveed answer')
            this.answers = message
        })
        this.socket.on('correctAnswer',(message)=>{
            this.correctAnswer=message
        })
        this.socket.on('roundWinner', (message)=>{
            this.roundWinner = message.name;
            this.round = message.round;
        })
        this.socket.on('gameWinner', (message)=>{
            this.gameWinner = message
        })
    
    }
})