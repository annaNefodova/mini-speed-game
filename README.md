# MiniSpeedGame

## Installation
- angular v14.2.0

## Description
**Given**:
- a 10x10 square field (blue)
- a "Start" button
- an input field (N - time in milliseconds) 
- a score line (player/computer).

**After clicking on the "Start" button**:
1. A random cell of the field (blue) is highlighted in colour (turns yellow).
2. If the player manages to click on the highlighted cell (yellow) within N milliseconds,
then the cell becomes (and remains) green and the player gets one point.
3. If the player does not have time to click on the cell (yellow) within this time, the cell becomes (and remains) red and the point is awarded to the computer.
4. If either the player or the computer scores 10 points, the game is over and the player should see a message about the game results in a pop-up modal window. Otherwise, the game continues from the first step.