# **Poker Hand Comparison** 🃏

## Usage

1. `npm install`
2. Run `npm test` to run the Jest tests outlining supported scenarios

## Description

The program evaluates poker hands based on a ranking of the different combinations. It also supports the case when both players have the same combination in their hands (eg. they both have a straight flush) and then picks a winner based on the highest card for that particular hand.

An assumption is made that all poker hands consist of 5 cards. Also the poker hands could be generated from multiple decks, therefore in the tests it is possible that both players have 4H, for example.

Apart from the original Wikipedia link with the rules I also used:
* https://www.pokerlistings.com/poker-hand-ranking
* https://en.wikipedia.org/wiki/List_of_poker_hands

The only additional libraries used are lodash and babel-node (for hot reload development using `nodemon`).

## Possible improvements

* It's possible that there are additional poker rules, which determine who the winner is in the case of clashing combinations with the same high card. That logic probably needs to be added
* Currently getting the high card value for each combination involves re-running the check function. This is not very efficient, probably there is a refactor to determine whether a hand is available and what its high card is in one pass. I wanted to implement the base case with no clashing hands/combinations and then add the high card and therefore ran into that situation


## Original README

Poker Hand Comparison is a little program that will compare two hands of poker according to the rules of [Texas Hold'em rules](https://en.wikipedia.org/wiki/Texas_hold_%27em#Hand_values).

## Requirements

The characteristics of the string of cards are:
* A space is used as card seperator
* Each card consists of two characters (not case sensitive)
* The first character is the value of the card, valid characters are: `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing), `A`(ce)
* The second character represents the suit, valid characters are: `S`(pades), `H`(earts), `D`(iamonds), `C`(lubs)

The result of your poker hand compare can be one of these 3 options:
* WIN should return the integer `1`
* LOSS should return the integer `2`
* TIE should return the integer `3`

You are free to use any libraries you want but please do not anything that already evaluates poker hands ;)

Good luck!
