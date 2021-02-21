import { calculateScore, parsePokerHand } from "./utils/calculatePokerHandScore";

export class PokerHand {
	constructor(pokerHandString) {
		const parsedPokerHand = parsePokerHand(pokerHandString);
		this.cards = parsedPokerHand.cards;
		this.values = parsedPokerHand.values;
		this.suits = parsedPokerHand.suits;
		const score = calculateScore(
			this.values,
			this.suits
		);
		this.handScore = score;
	}


	compareWith(pokerHand) {
		if (this.handScore > pokerHand.handScore) {
			return Result.WIN;
		} else if (this.handScore < pokerHand.handScore) {
			return Result.LOSS;
		}
		return Result.TIE;
	}

}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export default PokerHand;
