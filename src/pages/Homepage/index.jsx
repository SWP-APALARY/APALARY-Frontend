import { useRef } from 'react';

import Footer from './Footer';
import Career from './career/index';
import Contact from './contact';
import Dashboard from './dashboard';
import Environment from './environment';

export default function Homepage() {
	const careerRef = useRef(null);

	const executeScroll = () => careerRef.current.scrollIntoView({ behavior: 'smooth' });

	return (
		<div style={{ overflow: 'hidden' }}>
			<div data-aos='fade-up' data-aos-duration='1000'>
				<Dashboard scrollFunc={executeScroll} />
			</div>

			<div data-aos='fade-left' data-aos-duration='1000' data-aos-delay='50'>
				<Environment />
			</div>
			<div ref={careerRef}>
				<Career />
			</div>
			<div data-aos='fade-right' data-aos-duration='1000' data-aos-delay='50'>
				<Contact />
			</div>

			<Footer />
		</div>
	);
}
