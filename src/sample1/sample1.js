var canvas = document.getElementById('canvas');

var gl = webglUtils.getWebglContext(canvas);

var vertexShaderSource = `#version 300 es

// attribute用来定义顶点着色器的输入
// 它用来从buffer中接受数据
in vec4 a_position;

// 所有的着色器都有main函数
void main() {
    // gl_Position是顶点着色器的特定变量
    // 专门用来设置position
    gl_Position = a_position;
}
`;

var fragmentShaderSource = `#version 300 es

// 片元着色器没有默认精度,因此我们需要选择一个
// mediump是一个很好的默认值,它意味着"medium precision"
precision mediump float;

// 我们需要声明一个片元着色器的输出
out vec4 outColor;

void main() {
	// 设置输出为固定颜色
	outColor = vec4(1, 0, 0.5, 1);
}
`;

var vertexShader = webglUtils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = webglUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = webglUtils.createProgram(gl, vertexShader, fragmentShader);

// 告诉WebGL我们要使用的程序(一对着色器)
gl.useProgram(program);

var positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

var positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 3个2d点
var positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
    0.7, 0.5,
];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

var vao = gl.createVertexArray();

gl.bindVertexArray(vao);

gl.enableVertexAttribArray(positionAttributeLocation);

var size = 2;          // 每次迭代size
var type = gl.FLOAT;   // 数据是32位浮点数
var normalize = false; // 不需要单位化数据
var stride = 0;        // 0 = 向前移动size * sizeof(type),每次迭代获取下一个位置
var offset = 0;        // 在buffer中的起始位置
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

webglUtils.resizeCanvasToDisplaySize(gl.canvas);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// 清空canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 绑定我们想要的属性和buffer
gl.bindVertexArray(vao);

var primitiveType = gl.LINES;
var offset = 0;
var count = 4;
gl.drawArrays(primitiveType, offset, count);