import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderBlock({ children }) {
	return (
		<div>
			<h1>
				{children}
			</h1>
		</div>
	);
}

HeaderBlock.propTypes = {
	children: PropTypes.string.isRequired,
};
