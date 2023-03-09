import styled from 'styled-components';

export const DashboardComponent = styled.div`
	.ant-list-item-meta-title,
	.ant-list-item-meta {
		margin: 0 !important;
		p {
			margin: 0 !important;
		}
	}
	.title {
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		margin: 0.5rem 0;
	}
	.ant-list-item {
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
			0px 1px 5px rgba(0, 0, 0, 0.2);
		margin-bottom: 1rem;
		border-radius: 5px;
	}
	.col-left {
		.title {
			margin-top: 0;
			margin-bottom: 1.5rem;
		}
		.content-item {
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			display: -webkit-box;
		}
	}
	.col-right {
		.content {
			margin: 0;
		}
	}
`;
