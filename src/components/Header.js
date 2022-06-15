import React from "react";
import { Link } from "react-router-dom";
import CurDate from "./CurDate";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";

export default function Header() {
	const location = useLocation();

	let pages = ["", "Logger", "Scheduler"];
	let pageElements = pages.map((page) => {
		return (
			<Link to={`/${page}`} key={nanoid()} className={`${location.pathname === `/${page}` ? "selected" : ""}`}>
				{page === "" ? "Home" : page}
			</Link>
		);
	});

	let home = pageElements[0];
	let others = pageElements.slice(1);

	return (
		<header>
			<div className="link-container-1">{home}</div>
			<div className="link-container-2">{others}</div>
			<CurDate />
		</header>
	);
}
