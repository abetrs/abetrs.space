// Published data journalism for The Flat Hat, William & Mary's student newspaper.
// Charts are embedded live from Datawrapper — each iframe renders its own
// headline, description and source line, so nothing is restated here.

export const articles = [
	{
		id: 'construction',
		title: 'Construction disruptions are now part of daily life for many students',
		kicker: 'How much of campus is a building site, and who has to walk around it.',
		href: 'https://flathatnews.com/construction-disruptions-are-now-part-of-daily-life-for-many-students/'
	},
	{
		id: 'coffee',
		title: 'Students reflect on best Williamsburg coffeehouses, Aromas to win most visited',
		kicker: 'Where the campus actually drinks its coffee, as opposed to where it says it does.',
		href: 'https://flathatnews.com/students-reflect-on-best-williamsburg-coffeehouses-aromas-to-win-most-visited/'
	},
	{
		id: 'wrapped',
		title: "The Tribe's 2024 Listening Wrapped",
		kicker: 'A year of campus listening, surveyed and counted rather than guessed at.',
		href: 'https://flathatnews.com/the-tribes-2024-listening-wrapped/'
	},
	{
		id: 'yikyak',
		title: 'Yik Yak: open discussion forum or anonymous hub of gossip?',
		kicker: 'What an anonymous feed is for, according to the people posting on it.',
		href: 'https://flathatnews.com/yik-yak-open-discussion-forum-or-anonymous-hub-of-gossip/'
	}
];

// `id` is the Datawrapper chart ID; the embed lives at datawrapper.dwcdn.net/<id>/.
// `height` is only the starting height — each chart posts its real height back
// to the parent window on load and DatawrapperChart resizes to match.
export const charts = [
	{ kind: 'chart', id: 'qGMVv', height: 420 },
	{ kind: 'chart', id: 'hKfKl', height: 420 },
	{
		kind: 'image',
		id: 'cloud',
		src: 'https://flathatnews.com/wp-content/uploads/2024/10/cloud-696x395.png',
		alt: 'Word cloud built from open-ended survey responses, The Flat Hat, October 2024.',
		caption: 'Word cloud — The Flat Hat, October 2024',
		href: 'https://flathatnews.com/wp-content/uploads/2024/10/cloud-696x395.png'
	},
	{ kind: 'chart', id: '7hUlb', height: 420 },
	{ kind: 'chart', id: 'NSeTt', height: 420 },
	{ kind: 'chart', id: 'X5zz8', height: 420 },
	{ kind: 'chart', id: '4A5TP', height: 420 }
];
