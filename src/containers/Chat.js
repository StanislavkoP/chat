import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
import debounce from 'lodash.debounce';
import settings from '../defaultSettigs';

import * as actions from '../state/action/index';

import Headline from '../components/UI/Headline/Headline';
import Messanger from '../components/Chat/MessageContainer/MessageContainer';
import OnlineUserList from '../components/Chat/OnlineUserList/OnlineUserList';

import './Chat.css';

export let socket;
class Chat extends React.Component {

    constructor(props) {
        super(props)

        this.startTyping = debounce((name) => socket.emit('typingStart', name), 100, { 'maxWait': 1000 });

        this.endTyping = debounce(() => socket.emit('typingEnd'), 2000, { 'maxWait': 5000 });

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
        socket = openSocket.connect(settings.serverURI);

        const logginedUser = {
            id: this.props.user.id,
            name: this.props.user.name,
            avatar: this.props.user.avatar,
        }

        socket.emit('logInNewUser', logginedUser);
        
        socket.on('connect' , () => {
            
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
        })
        

        this.props.getLastMessages();
            



        if (this.props.messages.length > 0) {
                this.messageListRef.scrollTop = this.messageListRef.scrollHeight;
        }

    }

    componentWillUnmount () {
        socket.on('disconnected')
    }

    componentDidUpdate (prevProps, prevState) {

        const isContainMessageList = this.props.messages.length > 0;
        const isContainNewMessages = prevProps.messages.length !== this.props.messages.length;

        if (this.messageListRef && isContainMessageList && isContainNewMessages ) {
            this.messageListRef.scrollTop = this.messageListRef.scrollHeight;

        }

        return null
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
        this.startTyping(this.props.user.name);
        this.endTyping();
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
                            <Headline
                                typeHeadline='h2'
                                className='center'
                            >
                                Chat
                            </Headline>

                            <Messanger
                                messageListRef={ el => this.messageListRef = el }
                                messages={ messages }
                                idCurrentUser={ user.id }
                                anotherUser={ anotherUser }
                                userMessage={ userMessage }

                                onChangeInput={ this.onChangeInput }
                                sendMessage={ this.sendMessage }
                            />

                        </div>

                        <div className="column">

                            <Headline
                                typeHeadline='h2'
                                className='center'
                            >
                                { countOnlineUsers } online { countOnlineUsers.length === 1 ? 'user' : 'users' }
                            </Headline>
                            
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