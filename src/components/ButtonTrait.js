import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonTrait({ handleClick, value }) {
	return (
		<button className="button--trait" onClick={handleClick}>
			{value}
		</button>
	)
}

ButtonTrait.propTypes = {
	value: PropTypes.string.isRequired,
};
