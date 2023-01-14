import java.util.ArrayList;
import java.util.HashMap;

class Solution {
    public static boolean stoneGame(int[] piles) {
        int[] window = {0,piles.length-1};
        int[] score = {0,0};
        int[] pile = piles;
        boolean A_turn = true;

        return game(pile, window, score, A_turn);

    }
    public static int[] game(int[] piles, int[] window, int[] score, boolean A_turn){
        if(window[0]==(window[1]-1)){
            int left = score[0] + piles[window[0]];
            int right = score[0] + piles[window[1]];
            if(left>=right){
                score[0]+=left;
                return score;
            }
            else {
                score[0]+=right;
                return score;
            }
        }
        if(A_turn){
            int left = score[0] + piles[window[0]];
            int right = score[0] + piles[window[1]];
            if(left>=right){
                score[0]+=left;
                window[0]+=1;
            }
            else {
                score[0]+=right;
                window[1]-=1;
            }
            A_turn = false;
        }else{
            int left = score[1] + piles[window[0]];
            int right = score[1] + piles[window[1]];
            if(left>=right){
                score[1]+=left;
                window[0]+=1;
            }
            else {
                score[1]+=right;
                window[1]-=1;
            }
            A_turn = true;
        }
        return game(piles, window, score, A_turn);
    }
    public static void main(String args[]){
        int[] in = {5,3,4,5};
        System.out.println(stoneGame(in));
    }
}