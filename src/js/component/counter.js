import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

import "bootstrap";

export function Counter() {
	const [hours, setHours] = useState(parseInt("00"));
	const [minutes, setMinutes] = useState(parseInt("58"));
	const [seconds, setSeconds] = useState(parseInt("50"));
	const [isActive, setIsActive] = useState(false);

	const startButton = () => {
		isActive ? setIsActive(false) : setIsActive(true);
	};

	const pauseTime = () => {
		setIsActive(!isActive);
	};

	const resetButton = () => {
		setHours(parseInt("00"));
		setMinutes(parseInt("00"));
		setSeconds(parseInt("00"));
		setIsActive(false);
	};

	const secondsValue = seconds < 10 ? "0" + seconds : seconds;
	const minutesValue = minutes < 10 ? "0" + minutes : minutes;
	const hoursValue = hours < 10 ? "0" + hours : hours;

	useEffect(
		() => {
			let interval = null;
			if (isActive) {
				if (seconds <= 59) {
					interval = setInterval(() => {
						setSeconds(seconds => seconds + 1);
					}, 1000);
				} else {
					setSeconds(parseInt("00"));
					if (minutes > 58) {
						setMinutes(parseInt("00"));
						setHours(hours => hours + 1);
					} else {
						setMinutes(minutes => minutes + 1);
					}
				}
			}

			return () => clearInterval(interval);
		},
		[isActive, seconds]
	);

	return (
		<>
			<div className="appclock">
				<input type="checkbox" id="start" hidden />
				<input type="checkbox" id="stop" hidden />
				<input type="checkbox" id="reset" hidden />
				<div className="timer">
					<div className="time-card" data-type="hours" data-max="24">
						<div className="time-card-count" value={hours}>
							{hoursValue}
						</div>
						<div className="time-card-label">Hours</div>
					</div>
					<span className="colon">:</span>
					<div
						className="time-card"
						data-type="minutes"
						data-max="60">
						<div className="time-card-count" value={seconds}>
							{minutesValue}
						</div>
						<div className="time-card-label">Minutes</div>
					</div>
					<span className="colon">:</span>
					<div
						className="time-card"
						data-type="seconds"
						data-max="60">
						<div className="time-card-count" value={seconds}>
							{secondsValue}
						</div>
						<div className="time-card-label">Seconds</div>
					</div>
				</div>
				<div className="actions">
					<button
						className="btn btn-reset"
						htmlFor="reset"
						onClick={() => {
							resetButton();
						}}>
						Reset
					</button>
					{!isActive ? (
						<button
							className="btn btn-success"
							htmlFor="start"
							onClick={() => {
								setIsActive(true);
							}}>
							Start
						</button>
					) : (
						<button
							className="btn btn-danger"
							htmlFor="stop"
							onClick={() => {
								setIsActive(false);
							}}>
							Pause
						</button>
					)}
				</div>
			</div>
		</>
	);
}
