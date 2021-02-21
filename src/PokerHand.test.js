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
		it(`Player 1 wins with a high card`, () => {
			const hand1 = new PokerHand('2C 3D AC KH 6D');
			const hand2 = new PokerHand('JC 2D QC KH 6D');
			expect(hand1.handScore).toEqual(pokerScores.HIGH_CARD);
			expect(hand2.handScore).toEqual(pokerScores.HIGH_CARD);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
	});
	describe('compareWith(): with combination clashes', () => {
		it('Player 1 wins with a higher straight flush', () => {
			const hand1 = new PokerHand('3D 4D 5D 6D 7D');
			const hand2 = new PokerHand('2C 3C 4C 5C 6C');
			expect(hand1.handScore).toEqual(pokerScores.STRAIGHT_FLUSH);
			expect(hand2.handScore).toEqual(pokerScores.STRAIGHT_FLUSH);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it('Player 2 wins with a higher four of a kind', () => {
			const hand1 = new PokerHand('KC KS KH KD 6C');
			const hand2 = new PokerHand('AC AS AH AD 7C');
			expect(hand1.handScore).toEqual(pokerScores.FOUR_OF_A_KIND);
			expect(hand2.handScore).toEqual(pokerScores.FOUR_OF_A_KIND);
			expect(hand1.compareWith(hand2)).toBe(Result.LOSS);
		});
		it('Player 2 wins with a higher full house', () => {
			const hand1 = new PokerHand('TC TS TH AD AC');
			const hand2 = new PokerHand('JC JS JH 2D 2C');
			expect(hand1.handScore).toEqual(pokerScores.FULL_HOUSE);
			expect(hand2.handScore).toEqual(pokerScores.FULL_HOUSE);
			expect(hand1.compareWith(hand2)).toBe(Result.LOSS);
		});
		it('Player 1 wins with a higher flush', () => {
			const hand1 = new PokerHand('2C TC JC 5C 6C');
			const hand2 = new PokerHand('2D TD 4D 5D 6D');
			expect(hand1.handScore).toEqual(pokerScores.FLUSH);
			expect(hand2.handScore).toEqual(pokerScores.FLUSH);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it('Player 1 wins with a higher straight', () => {
			const hand1 = new PokerHand('3C 4C 5C 6D 7D');
			const hand2 = new PokerHand('2H 3D 4C 5D 6D');
			expect(hand1.handScore).toEqual(pokerScores.STRAIGHT);
			expect(hand2.handScore).toEqual(pokerScores.STRAIGHT);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 1 wins with a higher three of a kind`, () => {
			const hand1 = new PokerHand('KC KS KH AD 6C');
			const hand2 = new PokerHand('4S 4C 4H KS AD');
			expect(hand1.handScore).toEqual(pokerScores.THREE_OF_A_KIND);
			expect(hand2.handScore).toEqual(pokerScores.THREE_OF_A_KIND);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 1 wins with a higher two pair`, () => {
			const hand1 = new PokerHand('KC KS AH AD 6C');
			const hand2 = new PokerHand('4S 4S 5C 5S AD');
			expect(hand1.handScore).toEqual(pokerScores.TWO_PAIR);
			expect(hand2.handScore).toEqual(pokerScores.TWO_PAIR);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
		it(`Player 1 wins with a higher pair`, () => {
			const hand1 = new PokerHand('TC KS AH AD 6C');
			const hand2 = new PokerHand('4S 4S 6C 7S AD');
			expect(hand1.handScore).toEqual(pokerScores.PAIR);
			expect(hand2.handScore).toEqual(pokerScores.PAIR);
			expect(hand1.compareWith(hand2)).toBe(Result.WIN);
		});
	})
});
