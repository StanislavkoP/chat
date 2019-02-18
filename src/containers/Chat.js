import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
import debounce from 'lodash.debounce';
import settings from '../defaultSettigs';

import * as actions from '../state/action/index';

import MessageList from '../components/Chat/MassageList/MessageList';
import OnlineUserList from '../components/Chat/OnlineUserList/OnlineUserList';

import './Chat.css';

export const socket = openSocket.connect(settings.serverURI);
class Chat extends React.Component {

    constructor(props) {
        super(props)

        let a1 = function(){
            console.log('typingStart from front')
            socket.emit('typingStart')
        };
        this.debounce1 = debounce(a1, 100, { 'maxWait': 1000 });

        let a2 = function(){
            console.log('typingEnd from front')
            socket.emit('typingEnd')
        };
        this.debounce2 = debounce(a2, 2000, { 'maxWait': 5000 });

        this.state = {
            userMessage : '',
            onlineUsers: [],
            anotherUser: {
                userName: '',
                isTypingMessage: false,
            }
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    static propTypes = {
        user : PropTypes.object,
        messages: PropTypes.array,

        getLastMessages: PropTypes.func,
        addNewMessage: PropTypes.func
    }

    componentDidMount () {
        const logginedUser = {
            id: this.props.user.id,
            name: this.props.user.name,
            avatar: this.props.user.avatar

        }
        socket.emit('logInNewUser', logginedUser);

        this.props.getLastMessages();
            

        socket.on('onlineUsers', onlineUsers => {
            this.setState({onlineUsers})
        
        });

        socket.on('message', (message) => {
            this.props.addNewMessage(message);

            if (this.messageListRef) {
                this.messageListRef.scrollTop = this.messageListRef.scrollHeight;
    
            }

        });

        socket.on('typingEnd', () => {
            console.log('typingEnd from server');

            this.setState(prevState => {
                return {
                    ...prevState,
                    anotherUser: {
                        userName: '',
                        isTypingMessage: false,
                    }
                }
            });

        })

        socket.on('typingStart', (nameWhoIsTyping) => {
            console.log('typingStart from server');

            this.setState(prevState => {
                return {
                    ...prevState,
                    anotherUser: {
                        userName: nameWhoIsTyping,
                        isTypingMessage: true,
                    }
                }
            });

        });

        if (this.props.messages.length > 0) {
                this.messageListRef.scrollTop = this.messageListRef.scrollHeight;
        }

    }

    componentDidUpdate (prevProps, prevState) {

        const isContainMessageList = this.props.messages.length > 0;
        const isContainNewMessages = prevProps.messages.length !== this.props.messages.length;

        if (this.messageListRef && isContainMessageList && isContainNewMessages ) {
            this.messageListRef.scrollTop = this.messageListRef.scrollHeight;

        }
    }

    sendMessage (e) {
        e.preventDefault();
        
        const newMessage = {
            authorId: this.props.user.id,
            author : this.props.user.name,
            text: this.state.userMessage,
            avatar: this.props.user.avatar,
        };

        socket.emit('message', newMessage);
        
        this.setState({userMessage: ''})
    }

    onChangeInput (e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        this.setState({[inputName]: inputValue});
        this.debounce1();
        this.debounce2();
    }

    render () {

        const { userMessage, onlineUsers, anotherUser } = this.state;
        const { user, messages } = this.props;

        let countOnlineUsers = 0;
        if (this.state.onlineUsers.length > 0) {
            countOnlineUsers = this.state.onlineUsers.length - 1;
        
        }
        
        return (
            <div className="messanger">
            
                <div className="ui container">
                    <div className="ui two column centered grid">
                        <div className="column">
                            <h2 style={{textAlign: 'center'}}>Chat</h2>

                            <div className="messageList-container">
                                
                                <MessageList
                                    messageListRef={ el => this.messageListRef = el }
                                    messages={ messages }
                                    idCurrentUser={ user.id }
                                />


                                <div className="messageList-container__typing">
                                    {
                                        anotherUser.isTypingMessage
                                        ? <span>{ this.state.anotherUser.name } is typing`</span>
                                        : null
                                    }
                                </div>


                                <form className="messageControls form ui">
                                    <div className="field messageControls__text">
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

                                    <button className="ui button primary messageControls__btn" type="sent" onClick={this.sendMessage} >Send</button>
                                </form>
                            </div>
                        </div>

                        <div className="column">
                            <h2 style={{textAlign: 'center'}}>
                                {countOnlineUsers} online { countOnlineUsers.length === 1 ? 'user' : 'users'}
                            </h2>
                            
                            <OnlineUserList
                                onlineUsers={ onlineUsers }
                                idCurrentUser={ user.id }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
};

const mapStateToProps = state => ({
    user: state.authReducer.user,
    messages: state.chatReducer.messages,
});

const mapDispatchToProps = dispatch => ({
    getLastMessages: () => dispatch( actions.getLastMessages() ),
    addNewMessage: (message) => dispatch( actions.addNewMessage(message) )
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat)