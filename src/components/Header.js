import React from "react";
import { Link } from "react-router-dom";
import CurDate from "./CurDate";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";

export default function Header(props) {
	const location = useLocation();

	let pages = ["", "Logger", "Scheduler"];
	let pageElements = pages.map(page => {
		return (
			<Link
				to={`/${page}`}
				key={nanoid()}
				className={`${location.pathname === `/${page}` ? "selected" : ""}`}
			>
				{page === "" ? "Home" : page}
			</Link>
		);
	});

	return (
		<header>
			<div className="link-container-1">{pageElements[0]}</div>
			<div className="link-container-2">{pageElements.slice(1)}</div>
			<CurDate />
		</header>
	);
}
