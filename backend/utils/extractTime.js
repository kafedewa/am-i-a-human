import React from 'react'
import moment from 'moment';

export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

export function extractDate(dateString){
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString(); // "10/24/2022

	return formattedDate
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}