
let initialStates = [];
let finalStates = [];

//Randomize initial states of cells
for (i = 0; i < 10; i++)
{
    initialStates[i] = [];
    finalStates[i] = [];
    for (j = 0; j < 10; j++)
    {
        if (i == 0 || i == 9 || j == 0 || j == 9)
        {
            initialStates[i][j] = 0;
        }
        else
        {
            initialStates[i][j] = Math.round(Math.random());
        }
        finalStates[i][j] = 0;
    }
}

////store each cell's object in array
//let cells = [];
//
//for (i = 0; i < 10; i++)
//{
//    cells[i] = [];
//    for (j = 0; j < 10; j++)
//    {
//        let cellId = "cell-" + i + "-" + j;
//        cells[i][j] = document.getElementById('game').rows[i].cells[j];
//    }
//}
//console.log(cells);

//display states

//color cells based on state of each cell input
const colorCells = (states) => {
    for (i = 0; i < 10; i++)
    {
        for (j = 0; j < 10; j++)
        {
            let cell = document.getElementById("game").rows[i].cells[j];
            if (states[i][j] == 1)
            {               
                cell.style.background = "linear-gradient(to bottom right, #000, #222)";
            }
            else if (states[i][j] == 0)
            {
                cell.style.background = "linear-gradient(to bottom right, #fff, #ccc)";
            }
        }
    }
}

colorCells(initialStates);

//repeat this section on a 1s interval
//iterate through cells not on edges

const gameMove = () => {
    for (i = 1; i < 9; i++)
    {
        for (j = 1; j < 9; j++)
        {
            //count living neighbors of cell (including cell itself)
            let neighbors = 0;
            for (k = i - 1; k <= i + 1; k++)
            {
                for (l = j - 1; l <= j + 1; l++)
                {
                    if (initialStates[k][l] == 1)
                    {
                        neighbors++;
                    }
                }
            }

            //if current cell is alive
            if (initialStates[i][j] == 1)
            {
                neighbors--;
                if (neighbors <= 1 || neighbors > 3)
                {
                    finalStates[i][j] = 0;
                }
                else
                {
                    finalStates[i][j] = 1;
                }
            }
            //if current cell is dead
            else if (initialStates[i][j] == 0)
            {
                if (neighbors == 3)
                {
                    finalStates[i][j] = 1;
                }
                else 
                {
                    finalStates[i][j] = 0;
                }
            }
        }
    }
    
    console.log(finalStates);
    colorCells(finalStates);
    
    //make current finalStates next initialStates
    
    for (i = 0; i < 10; i++)
    {
        for (j = 0; j < 10; j++)
        {
            initialStates[i][j] = finalStates[i][j];
        }
    }
    console.log(initialStates);
}

let run = setInterval(gameMove, 1500);



    