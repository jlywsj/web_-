if(document.querySelector('canvas') != null){

}else{

let canvas = document.createElement("canvas");
// let canvas = document.querySelector('.box').createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");
let hue = 120;
let particles = [];
let fireworks = [];

// context.lineWidth = 2;

function creatRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// 分段画直线，创建对象
function Particle(x, y) {
    this.x = x;
    this.y = y;
    //速度
    this.speed = creatRandom(1, 10);
    // 角度
    this.angle = creatRandom(0, Math.PI * 2);
    // 摩擦力
    this.friction = 0.95;
    // 重力
    this.gravity = 2;
    // hue是hsl模式颜色中的灰度值
    this.hue = creatRandom(hue - 20, hue + 20);
    // 亮度
    this.brightness = creatRandom(50, 80);
    // 透明度
    this.alpha = 1;
    //衰变
    this.decay = creatRandom(0.015, 0.03);
    // 分五段画 (片段)
    this.fragments = [];
    let count = 5;
    while (count--) {
        this.fragments.push([this.x, this.y]);
    }
}


Particle.prototype.draw = function () {
    context.beginPath();
    // 从坐标数组的最后 画到 坐标数组的最前面
    context.moveTo(this.fragments[this.fragments.length - 1][0], this.fragments[this.fragments.length - 1][1]);
    context.lineTo(this.x, this.y);
    context.strokeStyle = 'hsla(' + this.hue + ',100%,' + this.brightness + '%,' + this.alpha + ")";
    // context.strokeStyle = "#fff";
    context.stroke();
}

Particle.prototype.update = function (index) {
    // 更新粒子位置数据
    // 先移除坐标数组中最后一个坐标，然后把上一个位置插入到数组最前面
    this.fragments.pop();
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.fragments.unshift([this.x, this.y]);
    this.alpha -= this.decay;

    if (this.alpha <= this.decay) {
        particles.splice(index, 1);
    }
}


function createParticle(x, y) {
    let particleCount = 100;
    while (particleCount--) {
        particles.push(new Particle(x, y));
    }

}


// 创建烟花对象，通过烟花对象再创建爆炸颗粒效果
function Firework(nx, ny, tx, ty) {
    // 定义起始点的坐标
    this.sx = nx;
    this.sy = ny;

    this.nx = nx;
    this.ny = ny;
    this.tx = tx;
    this.ty = ty;
    // 角度
    this.angle = Math.atan2(ty - ny, tx - nx);
    // 初始速度
    this.speed = 2;
    // 加速度
    this.acceleration = 1.05;
    // 到目的地距离
    this.distance = calculateDistance(nx, ny, tx, ty);

    // 已经走过的距离
    this.distanceTraveled = 0;

    // 小球半径
    this.targetRadius = 1;

    // hue是hsl模式颜色中的灰度值
    this.hue = creatRandom(hue - 20, hue + 20);
    // 亮度
    this.brightness = creatRandom(50, 80);
    // 透明度
    this.alpha = 1;
    //衰变
    this.decay = creatRandom(0.015, 0.03);
    // 分五段画 (片段)
    this.fragments = [];
    let count = 3;
    while (count--) {
        this.fragments.push([nx, ny]);
    }
}

// 画烟花
Firework.prototype.draw = function () {
    context.beginPath();
    context.moveTo(this.fragments[this.fragments.length - 1][0], this.fragments[this.fragments.length - 1][1]);
    context.lineTo(this.nx, this.ny);
    context.strokeStyle = 'hsl(' + hue + ',100%,' + this.brightness + '%)';
    context.stroke();

    // 画上小圆圈
    context.beginPath();
    context.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2, false);
    context.stroke();
}

// 更新烟花
Firework.prototype.update = function (index) {
    this.fragments.pop();
    this.fragments.unshift([this.nx, this.ny]);
    let vx = Math.cos(this.angle) * this.speed;
    let vy = Math.sin(this.angle) * this.speed;
    this.distanceTraveled = calculateDistance(this.sx, this.sy, this.nx + vx, this.ny + vy);

    // 更新小圆圈数据
    if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
    } else {
        this.targetRadius = 1;
    }

    // 判断烟花是否到爆炸点
    if (this.distanceTraveled >= this.distance) {
        // 在数组中删除当前烟花对象
        fireworks.splice(index, 1);
        // 创建爆炸颗粒
        createParticle(this.tx, this.ty);
    } else {
        this.speed *= this.acceleration;
        this.nx += vx;
        this.ny += vy;
    }


}


let max = 10;
let count = 0;

function run() {
    hue++;
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    let i = fireworks.length;
    while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
    }

    let k = particles.length;
    while (k--) {
        particles[k].draw();
        particles[k].update(k);
    }

    // 定义计时，隔一定时间随机生成烟花
    if (count >= max) {
        fireworks.push(new Firework(canvas.width / 2, canvas.height, creatRandom(0, canvas.width), creatRandom(0, canvas.height)));
        count = 0;
    } else {
        count++;
    }
}

function calculateDistance(nx, ny, tx, ty) {
    return Math.sqrt(Math.pow(tx - nx, 2) + Math.pow(ty - tx, 2));
}


window.addEventListener("mousedown", function (e) {
    fireworks.push(new Firework(canvas.width / 2, canvas.height, e.pageX, e.pageY));
})

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

setInterval(run, 23);
}