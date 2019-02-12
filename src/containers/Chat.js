import './Chat.css';

import React from 'react';
import { createMessageItemUI } from '../utils';
import openSocket from 'socket.io-client';
const socket = openSocket.connect('https://0d72acff.ngrok.io');



class Chat extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userMessage : '',
            userName : '',
        }
        this.messageListRef = React.createRef();

        this.sendMessage = this.sendMessage.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentDidMount () {

            socket.on('message', (data) => {
                console.log(data)
                const messsageItem = createMessageItemUI(data);
    
                this.messageListRef.current.appendChild(messsageItem);
            });

    }

    sendMessage (e) {
        e.preventDefault();
        
        const newMessage = {
            author : this.state.userName,
            text: this.state.userMessage,
            createTime: new Date(),
        }
        socket.emit('message', newMessage);

        this.setState({userMessage: ''})
        
    }

    onChangeInput (e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        this.setState({[inputName]: inputValue})
    }

    

    render () {

        const { userName, userMessage } = this.state;
        return (
            <div className="container"> 
                <h1 style={{textAlign: 'center'}}>Chat</h1>
                <ul className="messageList" ref={this.messageListRef}>
                </ul>

                <form className="messageControls form ui">
                    <div className="field">
                        <label>Name:</label>
                         <input  type="text" 
                            name="userName" 
                            value={userName}
                            onChange={this.onChangeInput} placeholder="First Name" 
                        />
                    </div>

                    <div className="field">
                        <label>Text message:</label>
                        <textarea
                            className="messageControls__text-field messageControls__text-field--area"
                            type="text" 
                            name="userMessage" 
                            value={userMessage}
                            placeholder="Message"
                            onChange={this.onChangeInput}
                        ></textarea>
                    </div>

                    <div>
                        <button className="messageControls__btn" type="sent" onClick={this.sendMessage} >Send</button>
                    </div>
                </form>
            </div>

            
        )
        
    }
};

export default Chat