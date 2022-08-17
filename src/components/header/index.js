import React from "react";
import "./index.css";

function Header() {
	return (
		<div data-cy="header-background" className="header bg-theme d-flex text-white align-items-center">
			<div className="container">
				<h2 data-cy="header-title">TO DO LIST APP</h2>
			</div>
		</div>
	);
}

export default Header;
