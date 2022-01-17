var gl;
var points;

var u_color;
var vOffset;
var vSize;
var vColor;

var theta = 0.0;
var theta2 = 0.0;
var thetaLoc;
var thetaLoc2;

var btn_cnt = 0;
var ploygon = [];

var ground_x=1.0;
var ground_y=1.0;
var ground_z=0.0;

var animation1;
var animation2;

var gradation;



window.onload = function init() {

    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);

	
    gl.clearColor(ground_x, ground_y, ground_z, 1.0);// define background's initial color(yellow)


    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

	// Count the user click the button.
    document.getElementById("Button").onclick = function(){
        btn_cnt += 1;
    }
    // uniform variable offset, size, color, rotation, theta
    vOffset = gl.getUniformLocation(program, "vOffset");
    vSize = gl.getUniformLocation(program, "vSize");
	u_color = gl.getUniformLocation(program, "u_color");

    animation1 = gl.getUniformLocation(program, "rotation");
    animation2 = gl.getUniformLocation(program, "rotation2");
	gradation = gl.getUniformLocation(program, "grad");

    thetaLoc = gl.getUniformLocation(program, "theta");
	thetaLoc2 = gl.getUniformLocation(program, "theta2");


	// attribute variable color
	vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vColor);

	//click event
    canvas.addEventListener("mousedown", function (e) {

        var click = vec2(2 * e.clientX / canvas.width - 1,
		2 * (canvas.height - e.clientY) / canvas.height - 1);
        var ploygonVertices = [
            vec2(click[0],click[1]),
            vec2(click[0]+0.05,click[1]+0.05),
            vec2(click[0]-0.05,click[1]+0.05),
        ];
        ploygon.push(ploygonVertices[0]);
        ploygon.push(ploygonVertices[1]);
        ploygon.push(ploygonVertices[2]);

    });
	

    render();

};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

	var sun_vertices = [
		vec2(-0.3,  0.6), //v0
        vec2(-0.4,  0.8), //v1
        vec2(-0.6,  0.8), //v2
        vec2(-0.7,  0.6), //v3
        vec2(-0.6,  0.4), //v4
        vec2(-0.4,  0.4), //v5
        vec2(-0.3,  0.6), //v6
];

    // Apply a clockwise animation to the sun.
    gl.uniform1i(animation1, true);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sun_vertices), gl.STATIC_DRAW);
	gl.uniform4f(u_color, 0.8, 0, 0, 0.8); // Set the sun's color(Bright red).
    gl.uniform4f(vSize, 1.3, 1.3, 1, 1); // Set the sun's size.
    gl.uniform4f(vOffset, -0.15, -0.275, 0, 0); // Set the sun's offset.

	//Coordinate setting.
    if(btn_cnt%2 == 0){
        theta += 0.05;
    }
    else{
        theta -= 0.05;
	}

    console.log(theta)
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);//draw the sun
    gl.uniform1i(animation1, false);//End of animation effect (to apply only to the sun)


	// mountain vertices
    var mountainVertices = [
        vec2(0.1,  -0.4), //v0
        vec2(0.8,  -0.4), //v1
        vec2(0.45,  0.8), //v2
    ];
	
	// draw five big mountain
	gl.uniform4f(vSize, 1, 1, 1, 1);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(mountainVertices), gl.STATIC_DRAW);
    gl.uniform4f(vOffset, 0, 0, 0, 0); // mountain offset
    gl.uniform4f(u_color, 0, 0.2, 0, 0.8); // mountain color(Dark green)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3); // draw the mountain
	
	gl.uniform4f(vOffset, 0.5, 0, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

	gl.uniform4f(vOffset, -0.5, 0, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

	gl.uniform4f(vOffset, -1, 0, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

	gl.uniform4f(vOffset, -1.5, 0, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

	// tree vertices
  	var trees = new Float32Array([
	0, 0.2, -0.1, 0.1, 0.1, 0.1,
	0, 0.1, -0.1, 0, 0.1, 0,
	0, 0, -0.1, -0.1, 0.1, -0.1,
	-0.03, -0.1, 0.03, -0.1, -0.03, -0.2,
	0.03, -0.1, -0.03, -0.2, 0.03, -0.2]);

	//draw the two trees.
    gl.bufferData(gl.ARRAY_BUFFER, flatten(trees), gl.STATIC_DRAW);    
    gl.uniform4f(vSize, 2, 2, 2, 1)//Set the tree's size.
    gl.uniform4f(vOffset, -0.75, 0, 0, 0);//Set the tree's offset(left).
    gl.uniform4f(u_color, 0, 1, 0, 1); // Set the tree's leaves color(green).
    gl.drawArrays(gl.TRIANGLES, 0, 9);// 
    gl.uniform4f(u_color, 0.5, 0.25, 0, 1); // Set the tree's trunk color(Brown).
    gl.drawArrays(gl.TRIANGLE_STRIP, 9, 6); //STRIP으로 삼각형 2개 그림
  
	gl.uniform4f(vSize, 2, 2, 2, 1)
    gl.uniform4f(vOffset, 0.75, 0, 0, 0);//Set the tree's offset(right).
    gl.uniform4f(u_color, 0, 1, 0, 1); 
    gl.drawArrays(gl.TRIANGLES, 0, 9);
    gl.uniform4f(u_color, 0.5, 0.25, 0, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 9, 6);


	// background vertices
    var background = [
        vec2(-1.0, -1.0),
		vec2(-1.0, -0.4), 
		vec2(1.0, -1.0), 
		vec2(1.0, -0.4)
    ];

    gl.bufferData(gl.ARRAY_BUFFER, flatten(background), gl.STATIC_DRAW);

	// draw the background
    gl.uniform4f(vSize, 1, 1, 1, 1)//Set the background's size.
    gl.uniform4f(vOffset, 0, 0, 0, 0)//Set the background's offset.     
    gl.uniform4f(u_color, 0.0, 0.5, 0.0, 0.8);// Set the background's color(yellow).
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 
    




    // house vertices
    var roof = [ 
        vec2(0.0, 0.6), vec2(-0.5, 0.3), vec2(0.5, 0.3)
    ];//roof vertices
    var wall = [
        vec2(-0.4, 0.3), vec2(-0.4, -0.4), vec2(0.4, 0.3), vec2(0.4, -0.4)
    ];//wall vertices
    var door = [
        vec2(-0.1, 0.1), vec2(-0.1, -0.4), vec2(0.1, 0.1), vec2(0.1, -0.4)
    ];//door vertices
	
 
    //draw the roof
    gl.bufferData(gl.ARRAY_BUFFER, flatten(roof), gl.STATIC_DRAW);
    gl.uniform4f(u_color, 0.1, 0.8, 0.8, 1); // Set the house's roof color(sky).
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    //draw the wall
    gl.bufferData(gl.ARRAY_BUFFER, flatten(wall), gl.STATIC_DRAW);
    gl.uniform4f(u_color, 0.2, 0.5, 0.5, 0.5); // Set the house's wall color(bright sky).
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //draw the door
    gl.bufferData(gl.ARRAY_BUFFER, flatten(door), gl.STATIC_DRAW);
    gl.uniform4f(u_color, 0.5, 0.2, 0, 0.8); // Set the house's door color(bright brown).
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

	//car car_vertices
	var car_vertices = [
		vec2(-0.3,  -0.7), //v0
        vec2(-0.3,  -0.9), //v1
        vec2(0.3,  -0.7), //v2
        vec2(0.3,  -0.9), //v3
];//Car body(under)

	var car_vertices2 = [
		vec2(-0.15,  -0.55), //v0
        vec2(-0.15,  -0.7), //v1
        vec2(0.15,  -0.55), //v2
        vec2(0.15,  -0.7), //v3
];//Car body(top)

	var car_vertices3 = [
        vec2(-0.2,  -0.9), //v0
        vec2(-0.2,  -1.0), //v1
        vec2(-0.1,  -0.9), //v2
        vec2(-0.1,  -1.0), //v3
];//Car wheels 1

	var car_vertices4 = [
        vec2(0.1,  -0.9), //v0
        vec2(0.1,  -1.0), //v1
        vec2(0.2,  -0.9), //v2
        vec2(0.2,  -1.0), //v3
];//Car wheels 2

	
	
	var colors = [
        vec4(1.0, 0.0, 0.0, 1.0), //v0
        vec4(0.0, 1.0, 0.0, 1.0), //v1
        vec4(0.0, 0.0, 1.0, 1.0)  //v2
    ];

	
	gl.uniform1i(gradation, true);//Apply color gradation effect.
    gl.uniform1i(animation2, true);//Application of animation that moves to the left.
	gl.uniform4f(u_color, 0.0, 0, 0.8, 1);// Set the Car's body color(blue).
    gl.uniform4f(vSize, 1, 1, 1, 1);// Set the Car's body size.
    gl.uniform4f(vOffset, 1, 0, 0, 0);// Set the Car's body offset.

	//Coordinate setting.
    if(btn_cnt%2 == 0){
        theta2 += 0.005;
    }
    else
        theta2 -= 0.005;
    console.log(theta2)
    gl.uniform1f(thetaLoc2, theta2);

	gl.bufferData(gl.ARRAY_BUFFER, flatten(car_vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);//draw Car body(under)
	
	gl.bufferData(gl.ARRAY_BUFFER, flatten(car_vertices2), gl.STATIC_DRAW);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);//draw Car body(top)
	
	gl.bufferData(gl.ARRAY_BUFFER, flatten(car_vertices3), gl.STATIC_DRAW);
	gl.uniform4f(u_color, 0.0, 0, 0, 0.8);// Set the Car's wheels color(black).
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);//draw Car wheels 1

	gl.bufferData(gl.ARRAY_BUFFER, flatten(car_vertices4), gl.STATIC_DRAW); 
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);//draw Car wheels 2
	gl.uniform1i(gradation, false);//End of color gradation effect (to apply only to the car)
    gl.uniform1i(animation2, false);//End of animation effect (to apply only to the car)
   

	// draw click event ploygon
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ploygon), gl.STATIC_DRAW);
    gl.uniform4f(vOffset, 0, 0, 0, 0)// Set the ploygon's offset.
    gl.uniform4f(u_color, 0, 1, 1, 0.5); // Set the ploygon's  color(bright sky).
    gl.drawArrays(gl.TRIANGLES, 0, ploygon.length); // draw the ploygon


	// The effect of darkening the background color.
    for(i=0;i<100000;i++){
        if (ground_x<1.0){
            gl.uniform4f(u_color, ground_x, ground_y, ground_z, 1);
			ground_x+=0.00025;
            ground_y+=0.00025;
        }else if(ground_y>0.1 && ground_x>0.1){
            ground_z=0.1;
            ground_y=0;
            ground_x=0;
        }
		gl.clearColor(ground_x, ground_y, ground_z, 1.0);
    }


    setTimeout(
        function () {
		requestAnimFrame(render); 
		}, 100
    );

}
