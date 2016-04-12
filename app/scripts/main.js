'use strict';

function convertTime (time) {
	console.log(time);
	var seconds = Math.floor((new Date() - time) / 1000);
	var intervals = [
		{
			amount: 31536000,
			label: ' years'
		},
		{
			amount: 2592000,
			label: ' months'
		},
		{
			amount: 86400,
			label: ' days'
		},
		{
			amount: 3600,
			label: ' hours'
		},
		{
			amount: 60,
			label: ' minutes'
		},
		{
			amount: 1,
			label: ' seconds'
		}
	];

	for (var i = 0; i < intervals.length; i++) {
		var interval = intervals[i];
		var result = Math.floor(seconds / interval.amount);
		if (result > 1) {
			return result + interval.label;
		}
	}
}

function buildPage (data) {
	console.log('building');
	// TODO Create Grid Section Item Here
	//Create each article item and append to grid
	$('body').prepend('<section class="grid"></section>');
	data.forEach(function (item) {
		console.log(item);
		var postedTime = convertTime(parseInt(item.updated));
		var boxClass = item.type === 'video' ? 'video' : 'article';
		var boxContent = '<article class="' + boxClass + '" style="background: url(' + item.thumbnail.url + ') center no-repeat; background-size: cover;">' + 
			'<h2>' + item.title + '</h2>' +
			'<time>' + postedTime + ' AGO</time>' +
			'</article>';
		$('.grid').append(boxContent);
	});
}

function LoadAssets() {
	$.ajax({
		url: 'scripts/data.json',
		success: function(data) {
			console.log(data);
			buildPage(data);
		}
	});
}

$(document).ready(function() {
	new LoadAssets();
});
