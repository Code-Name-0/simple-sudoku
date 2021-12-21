console.log("hello from JS");

const cells = document.querySelectorAll(".cell");   
const blocks = generate_blocks(cells);
const board = document.querySelector(".container");
const lines = generate_lines();
const columns = generate_columns();
const testingCell = document.querySelector("#target");


function generate_blocks(cells){
    let j = 0;
    let blk=[];
    for(let i = 0; i<9; i++){
        blk.push([]);
        blk[i].push(cells[j++]);
        while(j%9!=0){
            blk[i].push(cells[j++]);
        }
    }
    return blk;
}



function generate_lines(){
    let arr = [[],[],[],[],[],[],[],[],[]];
    let j;
    let blk_n = 0;
        blocks.forEach(blk =>{
            let i=0;
            blk.forEach(cell => {
                j = blk.indexOf(cell)+ (9*blk_n)
                if(j === 27 || j === 36 || j === 45){
                    i = 3;
                }
                if(j === 54 || j === 63 || j === 72){
                    i = 6;
                }
                arr[i].push(j);
                if((j+1)%3===0 && i+1 != 9){
                    i++;
                }
            })
            blk_n += (blk_n++<9)?1:0;
        })
        return arr
    }

function generate_columns(){
    let i= 0, j;
    let blk_n = 0;
    let arr=[[], [], [], [], [], [], [], [], []];
    blocks.forEach(blk =>{
        if(blk_n === 3 || blk_n === 6){
            i = 0;
        }
        blk.forEach(cell=>{
            j = blk.indexOf(cell) + (9*blk_n)
            arr[i].push(j);
            i++;
            if(i === 3 && blk.indexOf(cell)!=8) {
                i = 0;
            }else if(i === 6 && blk.indexOf(cell)!=8) {
                i = 3;
            }else if(i === 9 && blk.indexOf(cell)!=8) {
                i = 6;
            }
        })
        blk_n++;
    })
    return arr;
}

function show_index(){
let i = 0;
blocks.forEach(blk =>{
    blk.forEach(cell =>{
        cell.innerText = i++;
    })
})  
}

function randomInt(n){
    let i ;
    do
        i = Math.floor(Math.random()  * n);
    while(i === 0);

    return i;

}

function find_Cell_Index(cell){
    var bi = -1, ci = -1, celli,done = false;
    blocks.forEach(blk => {
        if(ci=-1){
            blk.forEach(c => {
                if(c === cell){
                    ci = blk.indexOf(c);
                }
            })
        }
        if(ci!=-1 && !done){
            celli = ci;
            done = true;
            bi = blocks.indexOf(blk);
        }
    })
    celli += (bi * 9) ;
    return celli;
}

function get_cell_line_index(cell){
    let index = find_Cell_Index(cell), line_index;
    lines.forEach(line => {
        if(line.includes(index)){
            line_index = lines.indexOf(line);
        }
    })
    return line_index;
}

function get_cell_column_index(cell){
    let index = find_Cell_Index(cell), column_index;
    columns.forEach(column => {
        if(column.includes(index)){
            column_index = columns.indexOf(column);
        }
    })
    return column_index;
}

function check_if_valid(line_nums, column_nums, block_nums, number){
    console.log(line_nums+" number : "+number+" line_check : "+line_nums.includes(number));
    return (!line_nums.includes(number) && !column_nums.includes(number) && !block_nums.includes(number))
}

function get_line_nums(line){
    let line_nums = [];
    let i = 0;
    line.forEach(index =>{
        if(cells[index].innerText !="undefined" && cells[index].innerText !=""){
            line_nums.push(parseInt(cells[index].innerText));
        }  
    })

    return line_nums;
}

function get_column_nums(column){
    let column_nums = [];
    column.forEach(index => {
        if(cells[index].innerText !="undefined" && cells[index].innerText !=""){
            column_nums.push(parseInt(cells[index].innerText));
        }
    })

    return column_nums;
}

function get_block_nums(block){
    let block_nums = [];
    block.forEach( c =>{
        if(c.innerText != "" && c.innerText != "undefined"){
            block_nums.push(parseInt(c.innerText));
        }
    });
    return block_nums;
}

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

function fill_board(sol){
    /*
    cells.forEach(cell => {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //if(cell.innerText = "undefined"){
            let valid
            let cell_index = [...cells].indexOf(cell), block_index;
            let j;
            let cell_coor = [get_cell_line_index(cell), get_cell_column_index(cell)];
            let line_nums = get_line_nums(lines[cell_coor[0]]);
            let column_nums = get_column_nums(columns[cell_coor[1]]);
            let block_nums = get_block_nums(blocks[parseInt(cell_index / 9)]);
            //console.log("line: "+line_nums+"\ncolumn: "+ column_nums+"\nblock: "+block_nums);
            
            let i;
            i=randomInt(9);
                while(!check_if_valid(line_nums, column_nums, block_nums, numbers[i]) ){
                    //console.log(numbers[i]);
                    console.log(numbers[i]);
                    if(i+1>=9){
                        i = 0;
                    }
                    else{
                        i++;
                    }
            }

            cell.innerText = numbers[i];
        //}
        
    })
    */



    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
        numbers.forEach(n => {
            
            blocks.forEach(block => {
                let j = randomInt(9);
                let cell = blocks[j];
                let cell_coor = [get_cell_line_index(cell), get_cell_column_index(cell)];
                let line_nums = get_line_nums(lines[cell_coor[0]]);
                let column_nums = get_column_nums(columns[cell_coor[1]]);
                while(!check_if_valid(line_nums, column_nums, block_nums, numbers[n])){
                    j = ( j+1 >= 9)? 0 : j+1;
                    cell = blocks[j];
                    cell_coor = [get_cell_line_index(cell), get_cell_column_index(cell)];
                    line_nums = get_line_nums(lines[cell_coor[0]]);
                    column_nums = get_column_nums(columns[cell_coor[1]]);
                }
                cell.innerText = n;
            })
            
        })
    
}

fill_board(false);