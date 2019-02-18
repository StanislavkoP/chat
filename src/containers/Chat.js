import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';

import settings from '../defaultSettigs';

import * as actions from '../state/action/index';

import MessageList from '../components/Chat/MassageList/MessageList';
import OnlineUserList from '../components/Chat/OnlineUserList/OnlineUserList';

import './Chat.css';

class Chat extends React.Component {

    constructor(props) {
        super(props)

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
        this.userIsTyping = this.userIsTyping.bind(this);
    }

    static propTypes = {
        user : PropTypes.object,
        messages: PropTypes.array,

        getLastMessages: PropTypes.func,
        addNewMessage: PropTypes.func
    }

    componentDidMount () {
        this.socket = openSocket.connect(settings.serverURI);

        this.socket.on('connect', () => {
            this.props.getLastMessages();
            
            const logginedUser = {
                id: this.props.user.id,
                name: this.props.user.name,
                avatar: this.props.user.avatar

            }

            this.socket.emit('logInNewUser', logginedUser);

        });

        this.socket.on('onlineUsers', onlineUsers => {
            this.setState({onlineUsers})
        
        });



        this.socket.on('message', (message) => {
            console.log(message);
            this.props.addNewMessage(message);

            if (this.messageListRef) {
                this.messageListRef.scrollTop = this.messageListRef.scrollHeight;
    
            }

        });

        this.socket.on('typing', (nameWhoIsTyping) => {
            this.setState({
                anotherUser: {
                    name: nameWhoIsTyping,
                    isTypingMessage: true,
                }
            });

            const userIsTypingMessageNow = this.state.anotherUser.isTypingMessage
            if (userIsTypingMessageNow) {
                return

            } else {
                setTimeout(()=> {
                    this.setState({
                        anotherUser: {
                            name: '',
                            isTypingMessage: false,
                        }
                    });
                }, 2000)
            
            }

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

    componentWillUnmount () {
        console.log('unmount');
/*         this.socket.off('message')
        this.socket.disconnect(s => {
            console.log(s);
        }) */
    }

    sendMessage (e) {
        e.preventDefault();
        
        const newMessage = {
            authorId: this.props.user.id,
            author : this.props.user.name,
            text: this.state.userMessage,
            avatar: this.props.user.avatar,
        };

        console.log(newMessage);

        this.socket.emit('message', newMessage);
        
        this.setState({userMessage: ''})
    }

    onChangeInput (e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        this.setState({[inputName]: inputValue});

    }

    userIsTyping (e) {
        this.socket.emit('typing', this.props.user.name);
    }

    render () {

        const { userMessage, onlineUsers, anotherUser } = this.state;
        const { user, messages } = this.props;

        let countOnlineUsers = 0;
        if (this.state.onlineUsers.length > 0) {
            countOnlineUsers = this.state.onlineUsers.length - 1;
        
        }
        
        return (
            <div className="ui container messanger">
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