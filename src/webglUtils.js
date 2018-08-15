var webglUtils = {
    getWebglContext: function (canvas) {
        var gl = canvas.getContext('webgl2');
        if (gl) {
            return gl;
        }

        // 不支持webgl2
        console.log('不支持webgl2');

        return null;
    },
    createShader: function (gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    },
    createProgram: function (gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    },
    resizeCanvasToDisplaySize: function (canvas) {
        var cssToRealPixels = window.devicePixelRatio || 1;

        // 根据canvas的css尺寸来计算宽度和高度
        var displayWidth = Math.floor(canvas.clientWidth * cssToRealPixels);
        var displayHeight = Math.floor(canvas.clientHeight * cssToRealPixels);

        // 检查canvas宽度和高度是否于css尺寸相同
        if (canvas.width !== displayWidth ||
            canvas.height !== displayHeight) {

            // 设置canvas高度和宽度于css尺寸一样
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
    }
};