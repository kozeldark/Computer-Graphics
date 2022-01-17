
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    // sun vertices
	var sunVertices = [
        vec2(-0.3,  0.6), //v0
        vec2(-0.4,  0.8), //v1
        vec2(-0.6,  0.8), //v2
        vec2(-0.7,  0.6), //v3
        vec2(-0.6,  0.4), //v4
        vec2(-0.4,  0.4), //v5
        vec2(-0.3,  0.6), //v6
    ];

	// water vertices
	var waterVertices = [
        vec2(1.0,  -0.9), //v0
        vec2(0.9,  -1), //v1
        vec2(0.4,  -1), //v2
        vec2(0.3,  -0.9), //v3
        vec2(0.4,  -0.8), //v4
        vec2(0.9,  -0.8), //v5
        vec2(1.0,  -0.9), //v6
    ];



	// mountain vertices
    var mountainVertices = [
        vec2(0.1,  0.4), //v0
        vec2(0.8,  0.4), //v1
        vec2(0.45,  0.8), //v2
    ];

	//big mountain vertices
    var mountainVertices2 = [
        vec2(0.7,  0.8), //v0
        vec2(0.2,  -0.2), //v1
        vec2(1.2,  -0.2), //v2
    ];

	//house vertices
	var houseVertices = new Float32Array([

	0, 0, -0.25, -0.5, 0.25, -0.5,
	-0.2, -0.5, 0.2, -0.5, -0.2, -1,
	0.2, -0.5, -0.2, -1, 0.2, -1
]);
	//window vertices
	var windowVertices = new Float32Array([

	-0.1, -0.75, 0.1, -0.75, -0.1, -0.5,
	0.1, -0.75, -0.1, -0.75, 0.1, -0.5
]);

	// glass vertices
	var glassVertices = [
        vec2(-0.5, -0.8), //v1
        vec2(-0.4, -1), //v2
        vec2(-0.3, -0.8), //v3
        vec2(-0.2, -1), //v4
        vec2(-0.1, -0.8), //v5
        vec2(0.0, -1), //v6
        vec2(0.1, -0.8), //v7
        vec2(0.2, -1), //v8
        vec2(0.3, -0.8), //v9
        vec2(0.4, -1), //v10
        vec2(0.5, -8)  //v11
    ];

	//tree(on the house) vertices
	var treeVertices = new Float32Array([
	0, 0.2, -0.1, 0.1, 0.1, 0.1,
	0, 0.1, -0.1, 0, 0.1, 0,
	0, 0, -0.1, -0.1, 0.1, -0.1,
	-0.03, -0.1, 0.03, -0.1, -0.03, -0.2,
	0.03, -0.1, -0.03, -0.2, 0.03, -0.2
]);
	//tree(side by house) vertices
	var treeVertices2 = new Float32Array([
	-0.5, -0.3, -0.6, -0.4, -0.4, -0.4,
	-0.5, -0.4, -0.6, -0.5, -0.4, -0.5,
	-0.5, -0.5, -0.6, -0.6, -0.4, -0.6,
	-0.53, -0.6, -0.47, -0.6, -0.53, -0.7,
	-0.47, -0.6, -0.53, -0.7, -0.47, -0.7
]);
	//tree(on the mountain) vertices
	var treeVertices3 = new Float32Array([
	0.5, 0.7, 0.4, 0.6, 0.6, 0.6,
	0.5, 0.6, 0.4, 0.5, 0.6, 0.5,
	0.5, 0.5, 0.4, 0.4, 0.6, 0.4,
	0.47, 0.4, 0.53, 0.4, 0.47, 0.3,
	0.53, 0.4, 0.47, 0.3, 0.53, 0.3
]);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.25, 0.5, 0.25 );//background
	gl.clear(gl.COLOR_BUFFER_BIT);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
    var vColor = gl.getAttribLocation(program, "vColor");
	var offsetLoc = gl.getUniformLocation(program, "uOffset");

    // Load the data into the GPU
	// sun vertex buffer
    var sunBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sunBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(sunVertices), gl.STATIC_DRAW );
	gl.vertexAttribPointer( vColor, 2, gl.FLOAT, false, 0, 0 );
	// Draw the sun
	gl.uniform4fv(offsetLoc, [-0.25, 0, 0, 0]); // move left 0.25
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	gl.vertexAttrib4f(vColor, 1.0, 0.0, 0.0, 1.0); // set the sun color
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);


	// water vertex buffer
    var waterBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, waterBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(waterVertices), gl.STATIC_DRAW );
	gl.vertexAttribPointer( vColor, 2, gl.FLOAT, false, 0, 0 );
	// Draw the water
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	gl.vertexAttrib4f(vColor, 0.0, 0.0, 1.0, 1.0); // set the water color
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);


	// mountain vertex buffer
	var mountainBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountainBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mountainVertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, mountainBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

	// Draw the mountain
    gl.enableVertexAttribArray( vPosition );
	gl.vertexAttrib4f(vColor, 0.0, 1.0, 0.25, 1.0); // set the mountain color
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	// big mountain vertex buffer
	var mountainBufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountainBufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mountainVertices2), gl.STATIC_DRAW );

	
	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, mountainBufferId2);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	// Draw the big mountain
    gl.enableVertexAttribArray( vPosition );
	gl.vertexAttrib4f(vColor, 0.0, 1.0, 0.5, 1.0); // set the big mountain color
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	// house vertex buffer
	var houseBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, houseBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(houseVertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, houseBufferId);
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.disableVertexAttribArray( vColor );

	//set the house roop color
	gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);
	// Draw the house roop
	gl.drawArrays( gl.TRIANGLES, 0, 3);
	//set the house wall color
	gl.vertexAttrib4f(vColor, 0.5, 0.1, 0.0, 1.0);
	// Draw the house wall
	gl.drawArrays( gl.TRIANGLES, 3, 12);

	// window vertex buffer 
	var windowBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, windowBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(windowVertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, windowBufferId);
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.disableVertexAttribArray( vColor );

	// Draw the window
	gl.vertexAttrib4f(vColor, 0.0, 1.0, 1.0, 1.0); // set the window color
	gl.drawArrays( gl.TRIANGLES, 0, 6);


	// glass vertex buffer 
	var glassBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glassBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(glassVertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, glassBufferId);
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.disableVertexAttribArray( vColor );

	// draw the glass
	gl.vertexAttrib4f(vColor, 0.0, 1.0, 0.0, 1.0); // set the glass color
	gl.drawArrays(gl.LINE_STRIP, 0, 11);
    

	// tree(on the house) vertex buffer 
	var treeBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, treeBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(treeVertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, treeBufferId);
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.disableVertexAttribArray( vColor );

	// set the tree(leaves) color
	gl.vertexAttrib4f(vColor, 0.0, 1.0, 0.0, 1.0);
	// draw the tree(leaves)
	gl.drawArrays( gl.TRIANGLES, 0, 9);
	// set the tree(trunk) color
	gl.vertexAttrib4f(vColor, 0.5, 0.25, 0.0, 1.0);
	// draw the tree(trunk)
	gl.drawArrays( gl.TRIANGLES, 9, 6);

	// tree(side by house) vertex buffer 
	var treeBufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, treeBufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(treeVertices2), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, treeBufferId2);
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.disableVertexAttribArray( vColor );

	// set the tree(leaves) color
	gl.vertexAttrib4f(vColor, 0.5, 0.5, 0.0, 1.0);
	// draw the tree(leaves)
	gl.drawArrays( gl.TRIANGLES, 0, 9);
	// set the tree(trunk) color
	gl.vertexAttrib4f(vColor, 0.5, 0.25, 0.0, 1.0);
	// draw the tree(trunk)
	gl.drawArrays( gl.TRIANGLES, 9, 6);

	// tree(on the mountain) vertex buffer 
	var treeBufferId3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, treeBufferId3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(treeVertices3), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, treeBufferId3);
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.disableVertexAttribArray( vColor ); 
	
	// set the tree(leaves) color
	gl.vertexAttrib4f(vColor, 1.0, 1.0, 0.0, 1.0);
	// draw the tree(leaves)
	gl.drawArrays( gl.TRIANGLES, 0, 9);
	// set the tree(trunk) color
	gl.vertexAttrib4f(vColor, 0.5, 0.25, 0.0, 1.0);
	// draw the tree(trunk)
	gl.drawArrays( gl.TRIANGLES, 9, 6);


	
};

