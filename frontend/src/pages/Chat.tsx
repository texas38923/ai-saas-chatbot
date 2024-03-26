import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

//type def for message:
type Message = {
  role: string;
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: 'User',
      content: 'Hi there! How can I assist you today?',
    },
    {
      role: 'Assistant',
      content: "Hello! I'm here to help. What do you need assistance with?",
    },
    {
      role: 'User',
      content:
        "I'm having trouble setting up my email account. Can you guide me through the process?",
    },
    {
      role: 'Assistant',
      content:
        "Of course! Could you please provide me with the email service provider you're using?",
    },
    {
      role: 'User',
      content: "I'm using Gmail.",
    },
    {
      role: 'Assistant',
      content:
        "Great! Let's start by opening your web browser and navigating to the Gmail website.",
    },
    {
      role: 'Assistant',
      content: "Once you're there, click on the 'Sign in' button.",
    },
    {
      role: 'User',
      content: "Got it. I'm signed in now.",
    },
    {
      role: 'Assistant',
      content:
        "Perfect! Now let's go to Settings by clicking on the gear icon located in the top right corner.",
    },
    {
      role: 'Assistant',
      content: "From the Settings menu, select 'See all settings'.",
    },
    {
      role: 'User',
      content: "Okay, I'm on the Settings page.",
    },
    {
      role: 'Assistant',
      content: "Now, navigate to the 'Accounts and Import' tab.",
    },
    {
      role: 'Assistant',
      content:
        "Under 'Check mail from other accounts', click on 'Add a mail account'.",
    },
    {
      role: 'User',
      content: 'I see it. What do I do next?',
    },
    {
      role: 'Assistant',
      content:
        "Enter the email address you want to add and click 'Next'. Follow the prompts to complete the setup.",
    },
    {
      role: 'User',
      content: 'Thank you so much for your help!',
    },
    {
      role: 'Assistant',
      content:
        "You're welcome! If you have any more questions, feel free to ask.",
    },
  ]);

  //to get the input message on clicking the send btn:
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: Message = { role: 'User', content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  //clear chats functionality:
  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting chats...', { id: 'deletechats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Deleted Chats Successfully!', { id: 'deletechats' });
    } catch (error) {
      console.log(error);
      toast.error('Chat Deletion Failed..', { id: 'deletechats' });
    }
  };

  //renders only on the loading on ui:
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Loading Chats..', { id: 'loadchats' });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success('Successfully loaded chats!', { id: 'loadchats' });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Loading Chats Failed..', { id: 'loadchats' });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate('/login');
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', sm: 'none', xs: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17,29,39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to a Chat-Bot!
          </Typography>
          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'work sans',
              my: 4,
              p: 3,
              textAlign: 'center',
            }}
          >
            You can ask some questions related to Knowledge, Business, Education
            , etc:- , But avoid sharing any Personal or Confidential
            information..
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: '200px',
              my: 'auto',
              color: 'white',
              fontWeight: 700,
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation..
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: 600,
          }}
        >
          Model - GPT - 3.5 - Turbo
        </Typography>

        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            overflowY: 'auto',
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17,27,39)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          {' '}
          <input
            ref={inputRef}
            type='text'
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ mx: 1, color: 'white' }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
