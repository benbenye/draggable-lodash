import React, { useState }  from 'react';
import _ from 'lodash';
import './tag.css';

// const [expressionStr, setExpressionStr] = useState('');

export default function Tag (props) {
	const [expressionArr, setExpressionArr] = useState([]);
	const [input, setInput] = useState('');
	const tag = Object.keys(_).map(e => <span key={e} className="tag" draggable="true" onDragStart={dragStart} id={e}>{e}</span>)
	return (
		<div className="all">
			<div className="list">{tag}</div>
			<div className="box" onDrop={drop} onDragOver={allowDrag}></div>
			<div className="expression">
				{`return _.chain(${input}).${expressionArr.join('().')}()`}
			</div>
			<div className="output">{input} : { expressionArr.length && (new Function(`return _.chain(${input}).${expressionArr.join('().')}().value()`))()}</div>
			<input type="text" value={input} onChange={(e) => {setInput(e.target.value)}} />
		</div>
	)

	function dragStart (e) {
		e.dataTransfer.setData("text", e.target.id);
	}
	function allowDrag (e) {
		e.preventDefault();
	}
	function drop (e) {
		e.preventDefault();
		// 如果报错event.js:501 Uncaught TypeError: this._drop is not a function是因为事件冒泡的原因，所以要增加e.stopPropagation()
		e.stopPropagation();
		const id = e.dataTransfer.getData("text");
		e.target.appendChild(document.getElementById(id))
		setExpressionArr(() => [..._.pull(expressionArr, id), id])
	}

} 