import useDocumentTitle from './useDocumentTitle'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
// import html from 'remark-html'
import rehypeRaw from 'rehype-raw'

import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";

export default function Tutorial(props) {
	const { id } = useParams()
	const [markdown, setMarkdown] = useState("");

	// Set title to contents of first h1
	useDocumentTitle(markdown.split("\n")[0].replace("# ", ""))

	useEffect(() => {
		fetch(`/tutorials/${id}/index.md`) 
		.then((res) => res.text())
		.then((text) => {
			setMarkdown(text);
			console.log("markdown fetch")
		});
	}, []);
		
	useEffect(() => {
		hljs.highlightAll();
		console.log("highlighted")
	});



	return (
		<div className="tutorial">
			<br/>
			<br/>
			<br/>
			
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>

			{/* <hr/>

			<p>Have any questions? Join the <a className="cta" href="https://discord.gg/Pswb8khdgQ">Discord server</a></p> */}
		</div>
	)
}