//This is a Lee's Algorithm implementation and visualization with javascript
//This is an important algorithm because it returns the minimum path distance between 2 given points
//Feel free to play with it and use it

let canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = 500;
let ctx = canvas.getContext("2d");

//function which executes at the click of button "Run"
function main() {
    //Get input
    n = parseInt(document.getElementById("n").value);
    start = document.getElementById("start").value.split(" ");
    start[0] = parseInt(start[0]);
    start[1] = parseInt(start[1]);
    end = document.getElementById("end").value.split(" ");
    end[0] = parseInt(end[0]);
    end[1] = parseInt(end[1]);
    console.log(start);
    console.log(end);
    //Enter the walls and create matrix
    matrix = Create_Matrix();
    //console.log(matrix);
    Algorithm_Lee(n,start,end,matrix);
}

function Algorithm_Lee(n,start,end,matrix) {
    //initialize queue of elements
    //as a matrix with 2 columns 
    //column #0 - 
    queue = [];
    queue.push( [start[0],start[1]] );
    //mark the first element with the distance of 1
    matrix[start[0]][start[1]] = 1;
    //queue index
    begining = 0;
    ending = 1;
    //direction arrays
    di = [-1,0,+1,0];//for line
    dj = [0,+1,0,-1];//for col
    //matrix[start[0],start[1]] = 1;
    while (begining < ending)//while the queue is not empty 
    {
        line = queue[begining][0];
        column = queue[begining][1];
        //erase the element from queue
        begining++;
        for(let direction = 0; direction < 4; direction++)
        {
            let new_i = line + di[direction];
            let new_j = column + dj[direction];

            if(IsOk(new_i,new_j,n,matrix))
            {
                //add the new element to the queue
                queue.push( [new_i , new_j] );
                ending++;
                //mark that the shortest path from start to this element is matrix[line][column] + 1
                //matrix[i][j] contains the shortest path from start to element from line i and column j
                matrix[new_i][new_j] = matrix[line][column] + 1;
            }
                    
        }
        //Draw the matrix updated on the canvas
       Draw_Matrix(start,end);
    }
    console.log(matrix[end[0]][end[1]]);
}

function Draw_Matrix(start,end) {

    //clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if(i == start[1] && j == start[0])//draw it green
                Draw_Square(i*60+30,j*40+30,String(matrix[j][i]),"#39ab17");
            else if(i == end[1] && j == end[0])//make it purple
                 Draw_Square(i*60+30,j*40+30,String(matrix[j][i]),"#7712c6");
            else if(matrix[j][i] == -1)//wall
                 Draw_Square(i*60+30,j*40+30,String(matrix[j][i]),"#6c3618");
            else Draw_Square(i*60+30,j*40+30,String(matrix[j][i]),"#08afc9");
        }
    }
}

function Draw_Square(line , column , value,color)
{
    ctx.fillStyle = color;
    ctx.fillRect(line, column, 25, 25);  
   //draw text
    ctx.font = "12px Georgia";
    ctx.fillStyle = "#fff";
    ctx.fillText(value, line+10, column+14);
}

function Create_Matrix() {
    //initialize the matrix
    matrix = []
    for (let i = 0; i < n; i++) {
        matrix[i] = []
        for(let j = 0; j < n; j++){
            matrix[i][j] = 0;
        }
    }
    //mark the elements that are walls
    number_walls = parseInt(document.getElementById("m").value);
    walls = document.getElementById("walls").value.split(" ");
    for (let i = 0; i < 2*number_walls; i = i+2) {
        x = parseInt(walls[i]); y = parseInt(walls[i+1]);
        matrix[x][y] = -1;
    }
    return matrix;
}

function IsOk(line,column,n,matrix)
{
    //check if the element is between the bounds
    if(line < 0 || line > (n-1) || column < 0 || column > (n-1) )
        return false;
    //check if the element is not a wall or if is not already visited
    if(matrix[line][column] == -1 || matrix[line][column] > 0)
        return false;
    return true;
}



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }



