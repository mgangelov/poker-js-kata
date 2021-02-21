import { parsePokerHand } from "./utils/calculatePokerHandScore";

export class PokerHand {
	constructor(pokerHandString) {
		const parsedPokerHand = parsePokerHand(pokerHandString);
		this.cards = parsePokerHand.cards;
		this.values = parsePokerHand.values;
		this.suits = parsePokerHand.suits;
		this.handScore = 0;
	}


	compareWith(pokerHand) {
		// if (this.handScore > pokerHand.handScore) {
		// 	return Result.WIN;
		// } else if (this.handScore < pokerHand.handScore) {
		// 	return Result.LOSS;
		// }
		return Result.TIE;
	}

}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export default PokerHand;
