import { Avatar, Box, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';

const Chat = () => {
  const auth = useAuth();

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
        ></Box>
      </Box>
    </Box>
  );
};

export default Chat;
