function timeInMinutes(t1, t2) {
	return (t2.hour - t1.hour) * 60 + (t2.minute - t1.minute);
}

export default function givePercentageComplete(type, time, logs) {
	let percentageComplete = 0;

	logs.forEach((log) => {
		if (log.type === type) {
			percentageComplete += timeInMinutes(log.startTime, log.endTime);
		}
	});

	percentageComplete = Number((percentageComplete / time) * 100);
	percentageComplete = Math.min(100, percentageComplete);

	return percentageComplete;
}
