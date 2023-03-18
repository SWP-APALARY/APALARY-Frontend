import styled, { keyframes } from 'styled-components';

import BG from '../../assets/login/background3.jpg';

const animateFaded = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, calc(-50% + 25px));
  }
  30% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 35px));
  }
`;

export const ErrorPageComponent = styled.div`
	width: 100%;
	height: calc(100vh - 64px);
	background-image: url(${BG});
	background-size: cover;
	background-position: center;
	img {
		width: 500px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(-50% + 30px));
	}
	.screen {
		animation: ${animateFaded} 2s linear infinite alternate;
	}
`;
