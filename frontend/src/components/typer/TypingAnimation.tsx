import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat With Your Own AI!',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Built with OpenAi..',
        1750,
        'Your own Custom ChatGPT!',
        2000,
      ]}
      wrapper='span'
      speed={50}
      style={{
        fontSize: '60px',
        display: 'inline-block',
        color: 'white',
        textShadow: '1px 1px 20px #000',
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
