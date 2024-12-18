const canvas = document.getElementById("bouncingBalls");
const ctx = canvas.getContext("2d");

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 공 속성 정의
class Ball {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x; // 공의 x 위치
    this.y = y; // 공의 y 위치
    this.radius = radius; // 공의 반지름
    this.dx = dx; // x 축 이동 속도
    this.dy = dy; // y 축 이동 속도
    this.color = color; // 공 색상
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // 벽에 부딪혔을 때 튕기기
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // 공 위치 업데이트
    this.x += this.dx;
    this.y += this.dy;

    // 공 그리기
    this.draw();
  }
}

// 랜덤 색상 생성 함수
function randomColor() {
  const colors = ["#FF6B6B", "#FFE66D", "#4ECDC4", "#1A535C", "#FFA500"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 랜덤한 공 생성 함수
function createBalls(numBalls) {
  const balls = [];
  for (let i = 0; i < numBalls; i++) {
    const radius = Math.random() * 20 + 10; // 10~30px 반지름
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 4; // x 속도 (-2~2)
    const dy = (Math.random() - 0.5) * 4; // y 속도 (-2~2)
    const color = randomColor();
    balls.push(new Ball(x, y, radius, dx, dy, color));
  }
  return balls;
}

// 공 배열 생성
const balls = createBalls(20); // 20개의 공 생성

// 애니메이션 실행 함수
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => ball.update());
}

// 애니메이션 시작
animate();

// 창 크기 변경 시 캔버스 크기 업데이트
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  balls.forEach((ball) => {
    ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
    ball.y = Math.random() * (canvas.height - ball.radius * 2) + ball.radius;
  });
});