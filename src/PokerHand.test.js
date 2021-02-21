import PokerHand, { Result } from './PokerHand.js';
import * as pokerScores from './utils/pokerHandScores';

describe('PokerHand', () => {
	describe('compareWith(): no combination clashes', () => {
		it(`ties`, () => {
			const hand1 = new PokerHand('AC 4S 5S 8C AH');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.compareWith(hand2)).toBe(Result.TIE);
		});
		it(`Player 1 wins with a royal flush`, () => {
			const hand1 = new PokerHand('AC TC KC JC QC');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.handScore).toEqual(pokerScores.ROYAL_FLUSH);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 2 wins with a straight flush`, () => {
			const hand1 = new PokerHand('AC 4S 5S 8C AH');
			const hand2 = new PokerHand('2C 3C 4C 5C 6C');
			expect(hand2.handScore).toEqual(pokerScores.STRAIGHT_FLUSH);
			expect(hand1.compareWith(hand2)).toBe(Result.LOSS);
		});
		it(`Player 1 wins with a four of a kind`, () => {
			const hand1 = new PokerHand('KC KS KH KD 6C');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.handScore).toEqual(pokerScores.FOUR_OF_A_KIND);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 1 wins with a full house`, () => {
			const hand1 = new PokerHand('KC KS KH AD AC');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.handScore).toEqual(pokerScores.FULL_HOUSE);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 1 wins with a flush`, () => {
			const hand1 = new PokerHand('2C TC JC 5C 6C');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.handScore).toEqual(pokerScores.FLUSH);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 2 wins with a straight`, () => {
			const hand1 = new PokerHand('KC KS KH AD 6C');
			const hand2 = new PokerHand('2C 3C 4C 5D 6D');
			expect(hand2.handScore).toEqual(pokerScores.STRAIGHT);
			expect(hand1.compareWith(hand2)).toBe(Result.LOSS);
		});
		it(`Player 1 wins with a three of a kind`, () => {
			const hand1 = new PokerHand('KC KS KH AD 6C');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.handScore).toEqual(pokerScores.THREE_OF_A_KIND);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 1 wins with a two pair`, () => {
			const hand1 = new PokerHand('2C 2D 4C 4H 6D');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.handScore).toEqual(pokerScores.TWO_PAIR);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 1 wins with a one pair`, () => {
			const hand1 = new PokerHand('2C 2D AC KH 6D');
			const hand2 = new PokerHand('JC 2D AC KH 6D');
			expect(hand1.handScore).toEqual(pokerScores.PAIR);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
	});
});
