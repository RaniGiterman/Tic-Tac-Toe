# My depth=1 search algorithm

*The following takes place after the user played their move.*

Loop over each square. If the square is taken, continue to the next iteration.
Else, insert a circle inside the square.

Check if this move leads to a win for circle.
If it does, that's it. We're done, PC won.
Else, continue to next iteration.

If reached the code after the loop, we know none of the squares lead to an immediate win for circle.

Instead, we will now try to block the player from winning.

Loop over each square. If the square is taken, continue to the next iteration.
Else, insert a "X" inside the square.

Check if this move leads to a win for X.
If it does, replace the X with a circle, thus blocking the player from a win in their next move.
Else, continue to next iteration.

If reached the code after both the loops, we know that there is no move that leads to a win for X, nor a move that leads to win for circle.

So insert a circle at a random position on the board.
