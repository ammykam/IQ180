import { Identifier } from "@babel/types";

export interface NameMessage{
    event: 'name'
    payload: string
}
export interface AvatarMessage{
    event: 'avatar'
    payload: string
}
export interface TimerMessage{
    event: 'time'
    payload: string;
}
export interface ResetMessage{
    event: 'reset'
    payload: boolean
}
export interface ProblemMessage{
    event: 'problem'
    payload: number[]
}
export interface AnswerMessage {
    event: 'answer'
    payload: string
}
export interface ScoreMessage{
    event: 'score'
    payload: number
}
export interface RoundMessage{
    event: 'round'
    payload: number
}

export interface Player{
    name: string;
    avatar: string;
    timer: number;
    reset: boolean;
    problem: number[];
    answer: string;
    score: number;
    round: number;
    ready: boolean;
    clientID: string;
}

// export interface msg{
//     name: string;
//     avatar: string;
//     timer: number;
//     reset: boolean;
//     problem: number[];
//     answer: string;
//     score: number;
//     round: number;
// }



