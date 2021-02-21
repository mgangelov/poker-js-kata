import { calculateScore, parsePokerHand } from "./utils/calculatePokerHandScore";
import { cardRankings } from "./utils/cardValuesSuits";

export class PokerHand {
	constructor(pokerHandString) {
		const parsedPokerHand = parsePokerHand(pokerHandString);
		this.cards = parsedPokerHand.cards;
		this.values = parsedPokerHand.values;
		this.suits = parsedPokerHand.suits;
		const { score, highCard } = calculateScore(
			this.values,
			this.suits
		);
		this.handScore = score;
		this.highCard = highCard;
	}


	compareWith(pokerHand) {
		if (this.handScore > pokerHand.handScore) {
			return Result.WIN;
		}
		if (this.handScore < pokerHand.handScore) {
			return Result.LOSS;
		}
		if (this.handScore === pokerHand.handScore) {
			// In this case both players have the same combination,
			// so we need to look in every high card in the combination
			const playerOneHighCardScore = cardRankings[this.highCard];
			const playerTwoHighCardScore = cardRankings[pokerHand.highCard];
			if (playerOneHighCardScore > playerTwoHighCardScore) {
				return Result.WIN;
			}
			if (playerOneHighCardScore < playerTwoHighCardScore) {
				return Result.LOSS;
			}
			return Result.TIE;
		}
	}

}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export default PokerHand;
