const app = new Vue({
    el: '#app',
    data: {
        title: 'IQ180',
        name: '',
        specificName:'',
        text: '',
        messages: [],
        users:[],
        readyUsers:[],
        answers:0,
        checkAnswer:'',
        correctAnswer:false,
        timer:'',
        roundWinner:'',
        gameWinner:{},
        orderUsers:[],
        round: 0,
        allPlayers:[],
        waitText:'',
        warn:'',
        gameWarn:'',
        chatText:'',
        chatMessages:[],
        socket: null,
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
            this.gameWinner={}
            this.allPlayers=[]
        },
        answer(){
            //console.log('answer work')
            
            this.socket.emit('answer',{checkAns: this.checkAnswer, time: this.timer});
        },
        gameEnd(){
            //console.log('gameEnd')
            this.socket.emit('checkWinner')
        },

        nextRound(){
            //console.log('nextRound work ka')
            this.round=0
            this.roundWinner=''
            this.socket.emit('nextRound')
            this.orderUsers =[]
            this.warn=""
            this.gameWarn=""
        },
        sendMessage(){
            this.socket.emit('chatMessage',{text: this.chatText})
            this.chatText='';
        },
        skip(){
            this.socket.emit('skip');
            console.log('skippy')
        }

    },
    created(){
        this.socket = io('http://localhost:3000')
        this.socket.on('msgToClient', (message)=>{
            this.recievedMessage(message)
        })
        this.socket.on('WelcomeUser',(message)=>{
            this.specificName = message.name;
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
            //console.log('hi')
            //console.log(this.readyUsers[0].round)
        })
        this.socket.on('readyToPlay',(message)=>{
            //console.log('readytoplay')
            this.orderUsers=[];
            // this.orderMessage(message)
            this.orderUsers=message.Player;
        }) 
        this.socket.on('notReadyToPlay', (message)=>{
            this.waitText=message
        })
        this.socket.on('answerToClient',(message)=>{
            //console.log('reciveed answer')
            this.answers = message
        })
        this.socket.on('correctAnswer',(message)=>{
            this.correctAnswer=message
        })
        this.socket.on('roundWinner', (message)=>{
            this.warn = message.text;
            this.roundWinner = message.name;
            this.round = message.round;
        })
        this.socket.on('gameWinner', (message)=>{
            this.orderUsers=[]
            this.roundWinner=''
            this.round=0
            
            //console.log('this is winner')
            this.gameWarn = message.text;
            this.gameWinner = message.Player;
            this.allPlayers = message.allPlayers;

        })
        this.socket.on('messageToClient',(message)=>{
            this.chatMessages.push(message)
            //this.chatMessages = message
            console.log(message)
        })
    
    }
})