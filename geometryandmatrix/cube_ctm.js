var canvas;
var gl;

var NumVertices  = 36;

var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var program;
var condition = true;
var theta = [ 0, 0, 0 ];
var thetaLoc;

var vertices = [
    vec3(-0.1,-0.1,0.1),
    vec3(-0.1,0.1,0.1),
    vec3(0.1,0.1,0.1),
    vec3(0.1,-0.1,0.1),
    vec3(-0.1,-0.1,-0.1),
    vec3(-0.1,0.1,-0.1),
    vec3(0.1,0.1,-0.1),
    vec3(0.1,-0.1,-0.1)
    
];

var vertices2 = [
    vec3(-0.1,-0.1,0.1),
    vec3(-0.1,0.1,0.1),
    vec3(0.1,0.1,0.1),
    vec3(0.1,-0.1,0.1),
    vec3(-0.1,-0.1,-0.1),
    vec3(-0.1,0.1,-0.1),
    vec3(0.1,0.1,-0.1),
    vec3(0.1,-0.1,-0.1)
    
];

var vertexColors = [
    [ 0.0, 0.0, 0.0, 1.0 ],  // black
    [ 1.0, 0.0, 0.0, 1.0 ],  // red
    [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
    [ 0.0, 1.0, 0.0, 1.0 ],  // green
    [ 0.0, 0.0, 1.0, 1.0 ],  // blue
    [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
    [ 1.0, 1.0, 1.0, 1.0 ],  // white
    [ 0.0, 1.0, 1.0, 1.0 ]   // cyan
];


var vertexColors2 = [
    [ 1.0, 0.0, 1.0, 1.0 ],  // black
    [ 1.0, 0.0, 1.0, 1.0 ],  // red
    [ 1.0, 1.0, 1.0, 1.0 ],  // yellow
    [ 1.0, 1.0, 1.0, 1.0 ],  // green
    [ 1.0, 0.0, 1.0, 1.0 ],  // blue
    [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
    [ 1.0, 1.0, 1.0, 1.0 ],  // white
    [ 1.0, 1.0, 1.0, 1.0 ]   // cyan
];

var indices = [
    1,0,3,
    3,2,1,
    2,3,7,
    7,6,2,
    3,0,4,
    4,7,3,
    6,5,1,
    1,2,6,
    4,5,6,
    6,7,4,
    5,4,0,
    0,1,5
]

var indices2 = [
    1,0,3,
    3,2,1,
    2,3,7,
    7,6,2,
    3,0,4,
    4,7,3,
    6,5,1,
    1,2,6,
    4,5,6,
    6,7,4,
    5,4,0,
    0,1,5
]

var intervalId;

var v_count =1;

var points = new Array(8);
var colors = [];
var index = [];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
	thetaLoc = gl.getUniformLocation(program,"theta");
    
    //event listeners for buttons
    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
    
    


    window.addEventListener("keydown",c2);


    points = vertices;
    console.log("js",points);
    colors = vertexColors;
    index = indices;
    console.log(index);
    intervalId = setInterval(render,10);
}

function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    console.log(points);
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(index), gl.STATIC_DRAW)
    console.log(index);

    // theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc,theta);
    gl.drawElements(gl.TRIANGLES,NumVertices,gl.UNSIGNED_BYTE,0);

}

function c2(){        

        
    if(event.keyCode == '13'){
        console.log("enter");
        points.push(vertices2[0]);
        points.push(vertices2[1]);
        points.push(vertices2[2]);
        points.push(vertices2[3]);
        points.push(vertices2[4]);
        points.push(vertices2[5]);
        points.push(vertices2[6]);
        points.push(vertices2[7]);
        
        colors.push(vertexColors2[0]);
        colors.push(vertexColors2[1]);
        colors.push(vertexColors2[2]);
        colors.push(vertexColors2[3]);
        colors.push(vertexColors2[4]);
        colors.push(vertexColors2[5]);
        colors.push(vertexColors2[6]);
        colors.push(vertexColors2[7]);
        
        for(var i=0;i<indices2.length;i++){
            indices2[i] = indices2[i]+8;
            console.log(indices2[i]);
            index.push(indices2[i]);
        }
        console.log(index);
        console.log(points);
        NumVertices = NumVertices+36;
        clearInterval(intervalId);
        intervalId = setInterval(render,10);
        
       
    }
    if(condition){
        if(event.keyCode == '37'){
            console.log("left");
            for (var i=0; i<points.length; i++){
                points[i][0] = points[i][0]-0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
            console.log(vertices)
        }
        if(event.keyCode == '38'){
            console.log("top");
            for (var i=0; i<points.length; i++){
                points[i][1] = points[i][1]+0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
        }
        if(event.keyCode == '39'){
            console.log("right");
            for (var i=0; i<points.length; i++){
                points[i][0] = points[i][0]+0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
        }
        if(event.keyCode == '40'){
            console.log("bottom");
            for (var i=0; i<points.length; i++){
                points[i][1] = points[i][1]-0.1;
            }
            clearInterval(intervalId);
            intervalId = setInterval(render,10);
        }
    }
    


};