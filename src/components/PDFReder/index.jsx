import { useState } from 'react';

import { Button, Col, Row, Spin, Typography } from 'antd';

import Box from '../Box';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';

const { Text } = Typography;
const PDFReader = (props) => {
	const { onAccept, onReject, isWaiting, file, id } = props;
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}
	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}
	return (
		<Box direction='vertical'>
			<Document file={file} onLoadSuccess={onDocumentLoadSuccess} renderMode={<Spin />}>
				<Page pageNumber={pageNumber} />
			</Document>
			<Text style={{ marginBottom: '10px' }}>
				Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
			</Text>
			<Row style={{ width: '100%' }} justify={'space-between'}>
				<Col>
					<Button
						type='primary'
						style={{ marginRight: '10px' }}
						disabled={pageNumber <= 1}
						onClick={previousPage}
					>
						Previous
					</Button>
					<Button type='primary' disabled={pageNumber - numPages >= 0} onClick={nextPage}>
						Next
					</Button>
				</Col>
				{isWaiting && (
					<Col>
						<Button type='primary' style={{ marginRight: '10px' }} onClick={onAccept}>
							Accept
						</Button>
						<Button type='primary' onClick={onReject} danger>
							Reject
						</Button>
					</Col>
				)}
			</Row>
		</Box>
	);
};
export default PDFReader;
