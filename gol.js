const hideDisplay = () => {
    const splash = document.getElementById('splash-screen');
    splash.style.display = "none";
}
let initialStates = [];
let finalStates = [];

//Choose initial states of cells ourselves (also initializes final states array)
    //create a function that parses the name of the clicked element and changes the value in initialStates accordingly.
const chooseInitial = () => {
    //initialize arrays
    for (i = 0; i < 10; i++)
    {
        initialStates[i] = [];
        finalStates[i] = [];
        for (j = 0; j < 10; j++)
        {
            initialStates[i][j] = 0;
            finalStates[i][j] = 0;
        }
    }
    
    let gameSquares = document.getElementsByClassName("game-square");
    console.log(gameSquares);
    for (i = 0; i < gameSquares.length; i++)
    {
        gameSquares[i].addEventListener("click", function () {
            let row = this.id.substring(5,6);
            let col = this.id.substring(7,8);
            console.log(row, col);
            initialStates[row][col] = 1;
            colorCells(initialStates);
        });
    }
}

//Randomize initial states of cells (also initializes final states array)
const randomInitial = () => {
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
    colorCells(initialStates);
}


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
    
    colorCells(finalStates);
    
    //make current finalStates next initialStates
    
    for (i = 0; i < 10; i++)
    {
        for (j = 0; j < 10; j++)
        {
            initialStates[i][j] = finalStates[i][j];
        }
    }
}

let run;
//pick starting cells
document.getElementById("set-start").onclick = () => {
    clearInterval(run);
    chooseInitial();
}

//play
document.getElementById("play").onclick = () => {
    clearInterval(run);
    
    run = setInterval(gameMove, 1500);
}

//click Random start button
document.getElementById("random-start").onclick = () => {
    clearInterval(run);
    randomInitial();

    run = setInterval(gameMove, 1500);
}




    