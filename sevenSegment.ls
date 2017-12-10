function rectangle(x, y, width, height)
{
	move(x, y);
	line(x+width, y);
	line(x+width, y+height);
	line(x, y+height);
	line(x, y);
}

function segmentLine(x1, y1, x2, y2)
{
    move(x1, y1);
    line(x2, y2);
}

function segment7draw (x,y,w,h,values)
{
    var xw = x+w;
    var yh = y+h;
    var yh2 = y+h/2;

    if (values[0] === 1) //A
    {
        segmentLine(x, y, xw, y);
    }
    if (values[1] === 1) //B
    {
       segmentLine(xw, y, xw, yh2);
    }
    if (values[2] === 1) //C
    {
        segmentLine(xw, yh2, xw, yh);
    }
    if (values[3] === 1) //D
    {
        segmentLine(xw, yh, x, yh);
    }
    if (values[4] === 1) //E
    {
        segmentLine(x, yh, x, yh2);
    }
    if (values[6] === 1) //G
    {
        segmentLine(x, yh2, xw, yh2);
    }
    if (values[5] === 1) //F
    {
        segmentLine(x, yh2, x, y);
    }
}


function segment7write (x,y,w,string)
{
    var characterMap =
    {
        '0': [1, 1, 1, 1, 1, 1, 0],
        '1': [0, 1, 1, 0, 0, 0, 0],
        '2': [1, 1, 0, 1, 1, 0, 1],
        '3': [1, 1, 1, 1, 0, 0, 1],
        '4': [0, 1, 1, 0, 0, 1, 1],
        '5': [1, 0, 1, 1, 0, 1, 1],
        '6': [1, 0, 1, 1, 1, 1, 1],
        '7': [1, 1, 1, 0, 0, 0, 0],
        '8': [1, 1, 1, 1, 1, 1, 1],
        '9': [1, 1, 1, 1, 0, 1, 1],

        'A': [1, 1, 1, 0, 1, 1, 1],
        'B': [0, 0, 1, 1, 1, 1, 1],
        'C': [1, 0, 0, 1, 1, 1, 0],
        'D': [0, 1, 1, 1, 1, 0, 1],
        'E': [1, 0, 0, 1, 1, 1, 1],
        'F': [1, 0, 0, 0, 1, 1, 1],
        'G': [1, 1, 1, 1, 0, 1, 1],
        'H': [0, 1, 1, 0, 1, 1, 1],
        'I': [0, 0, 0, 0, 1, 1, 0],
        'J': [0, 1, 1, 1, 1, 0, 0],
        'K': [0, 1, 1, 0, 1, 1, 1],
        'L': [0, 0, 0, 1, 1, 1, 0],
        'M': [1, 0, 1, 0, 1, 0, 0],
        'N': [0, 0, 1, 0, 1, 0, 1],
        'O': [1, 1, 1, 1, 1, 1, 0],
        'P': [1, 1, 0, 0, 1, 1, 1],
        'Q': [1, 1, 1, 0, 0, 1, 1],
        'R': [0, 0, 0, 0, 1, 0, 1],
        'S': [1, 0, 1, 1, 0, 1, 1],
        'T': [0, 0, 0, 1, 1, 1, 1],
        'U': [0, 1, 1, 1, 1, 1, 0],
        'V': [0, 0, 1, 1, 1, 0, 0],
        'W': [0, 1, 0, 1, 0, 1, 0],
        'X': [0, 1, 1, 0, 1, 1, 1],
        'Y': [0, 1, 1, 1, 0, 1, 1],
        'Z': [1, 1, 0, 1, 1, 0, 1],
        ' ': [0, 0, 0, 0, 0, 0, 0],
        '_': [0, 0, 0, 1, 0, 0, 0],
        '-': [0, 0, 0, 0, 0, 0, 1],
        ',': [0, 0, 1, 0, 0, 0, 0]

    };

    for (var i = 0; i < string.length; i++)
    {
        segment7draw(x, y, w, 2*w, characterMap[string[i]]);
        x += 1.5*w;
    }
}
