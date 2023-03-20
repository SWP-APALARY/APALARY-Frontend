'use strict';

function getSpamEmails(subjects, spam_words) {
	subjects = subjects.map((x) => x.toLowerCase());
	spam_words = spam_words.map((x) => x.toLowerCase());
	let result = [];
	for (let i = 0; i < subjects.length; i++) {
		let j = 0;
		let count = 0;
		while (j < spam_words.length) {
			let word = subjects[i].split(' ');
			if (word.filter((x) => x.includes(spam_words[j])).length >= 2) {
				result.push('rule 1');
				break;
			}
			for (let x of word) {
				if (x.includes(spam_words[j])) {
					count++;
				}
				if (count == 2) {
					break;
				}
			}
			if (count >= 2) {
				result.push('rule 2');
				break;
			}
			j++;
		}
		if (j === spam_words.length) {
			result.push('not_spam');
		}
	}
	// for (let i = 0; i < subjects.length; i++) {
	// 	if (!spam.includes(subjects[i])) {
	// 		notSpam.push(subjects[i]);
	// 	}
	// }
	return result;
}
function demo2(subjects, spam_words) {}
const subjects = [
	'gwnpnzijd gwnpnzijd gwnpnzijd gwnpnzijd gwnpnzijd gwnpnzijd gwnpnzijd gwnpnzijd gwnpnzijd',
];
const spam_word = [
	'gpuamkxkszhkbpph',
	'kinkezplvfjaq',
	'opodo',
	'krjz',
	'imlvumuare',
	'excfyc',
	'beurg',
	'jyos',
	'dhvuyfvtvn',
	'dyluacvray',
	'Gwnpnzijd',
];

console.log(getSpamEmails(subjects, spam_word));
