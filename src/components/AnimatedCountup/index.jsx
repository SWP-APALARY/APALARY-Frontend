import React from 'react';

import CountUp from 'react-countup';

const AnimatedCountUp = ({ value }) => {
	return <CountUp end={value} separator=',' />;
};

export default AnimatedCountUp;
