import './Chat.css';

import React from 'react';
import { createMessageItemUI } from '../utils';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
const socket = openSocket.connect('http://2642c350.ngrok.io');



class Chat extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userMessage : '',
            userName : '',
        }
        this.messageListRef = React.createRef();
        this.refTyping = React.createRef();

        this.sendMessage = this.sendMessage.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.userIsTyping = this.userIsTyping.bind(this);
    }

    static getDerivedStateFromProps (props, state) {
        if (state.userName === '') {
            return {
                ...state,
                userName: props.user.name
            } 
        } else {
            return null
        }
    }

    componentDidMount () {

        socket.on('message', (data) => {
            console.log('message', data)
            this.refTyping.current.innerHTML = ``
            const messsageItem = createMessageItemUI(data);
            
            this.messageListRef.current.appendChild(messsageItem);
        });

        socket.on('typing', (data) => {

            const userNameWhoIsTyping = data;
            this.refTyping.current.innerHTML = `${userNameWhoIsTyping} is typing`

            setTimeout(()=> {
                this.refTyping.current.innerHTML = ``
            }, 1500)
        })
    }

    componentWillUnmount () {
        socket.off('message')
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

        this.setState({[inputName]: inputValue});
    
    }

    userIsTyping (e) {
        socket.emit('typing', this.state.userName);
    }

    render () {

        const { userName, userMessage } = this.state;
        return (
            <div className="container">
                <h1 style={{textAlign: 'center'}}>Chat</h1>
                <div className="ui comments messageList" ref={this.messageListRef}> 
                </div>
                <div ref={this.refTyping}></div>

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
                            onKeyPress= { this.userIsTyping }
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Chat)