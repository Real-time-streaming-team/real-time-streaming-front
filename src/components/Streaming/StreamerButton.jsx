// import styled, { css } from 'styled-components';

// const Button = styled.button`
//   padding: 0.5rem 1.25rem;
//   border-radius: 0.125rem;
//   align-items: center;
//   display: flex;

//   ${props =>
//     props.subscribed
//       ? css`
//           border: 1.5px solid transparent;
//           border-image-source: linear-gradient(
//             180deg,
//             #4abeff 0%,
//             #001aff 100%
//           );
//           border-image-slice: 1;
//         `
//       : css`
//           background: linear-gradient(
//             153.5deg,
//             #4abeff -63.68%,
//             #001aff 75.59%
//           );
//           transition: 1s;
//           &:hover {
//             background: linear-gradient(
//               153.5deg,
//               #2c94d0 -63.68%,
//               #000f97 75.59%
//             );
//             color: #bbbdca; /* 글자 색 변경 */
//           }
//         `}
// `;

// const ButtonText = styled.div`
//   display: flex;
//   ${props =>
//     props.subscribed &&
//     css`
//       background: linear-gradient(120deg, #4abeff 0%, #001aff 100%);
//       -webkit-background-clip: text;
//       background-clip: text;
//       color: transparent;
//       font-weight: bold;
//     `}
// `;

// const StreamerButton = ({ subscribed, followHandler }) => {
//   return (
//     <Button onClick={followHandler} subscribed={subscribed}>
//       <ButtonText subscribed={subscribed}>
//         <div className="mr-1">+</div>
//         <div className="">Follow</div>
//       </ButtonText>
//     </Button>
//   );
// };

const StreamerButton = ({ subscribed, followHandler }) => {
  return (
    <button onClick={followHandler} subscribed={subscribed}>
      {/* <ButtonText subscribed={subscribed}>
        <div className="mr-1">+</div>
        <div className="">Follow</div>
      </ButtonText> */}
    </button>
  );
};

export default StreamerButton;
