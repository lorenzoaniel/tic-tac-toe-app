import React from "react";

interface Props {
	type: string;
}

const DefaultBtn: React.FC<Props> = ({ type }) => {
	return <div>DefaultBtn</div>;
};

export default DefaultBtn;
