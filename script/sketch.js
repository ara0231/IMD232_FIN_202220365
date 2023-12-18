//@ricky_o_369의 Dynamic Cube Art코드를 사용하여 수정한 작품입니다.
// 각도와 구의 간격, 기울기및 최대거리, 카메라위치등을 설정한다.
let angle = 0;
let w = 30;
let ma;
let maxD;
let camZ = 600;
let zoomSpeed = 50;

function setup() {
  //캔버스생성코드
  //화면의 중앙에 위치할 수 있게 설정
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  //초기화
  ma = atan(1 / sqrt(2));
  maxD = dist(0, 0, 300, 300);
}

function draw() {
  background(0);

  //색상설정
  let from = color(128, 0, 255);
  let to = color(0, 128, 255);
  let lerpAmt = (sin(angle / 2) + 1) / 2;
  let bgColor = lerpColor(from, to, lerpAmt);
  ambientLight(bgColor);

  //원근법설정코드
  perspective();

  //회전
  rotateX(-QUARTER_PI);
  rotateY(ma);

  //초반 위치 중앙으로 설정
  translate(0, 0);

  //구의 패턴
  for (let z = -300; z < 300; z += w) {
    for (let x = -300; x < 300; x += w) {
      push();

      //거리
      let d = dist(x, z, 0, 0);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let r = floor(map(sin(a), -1, 1, 50, 150));

      //위치
      translate(x, 0, z);

      //색상
      let col = color(
        map(sin(angle), -1, 1, 300, 255),
        map(cos(angle * 0.6), -1, 1, 100, 255),
        map(sin(angle * 0.3), -1, 1, 100, 255),
        60
      );

      //도형을 그리는 코드
      fill(col);
      stroke(255);
      strokeWeight(1);
      sphere(r);

      pop();
    }
  }

  //각도
  angle += 0.05;
}

//창 크기를 변경할 때도 중앙으로 움직일 수 있게
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

//마우스를 통한 움직임을 넣어주고 싶어서 클릭했을 때 확대와 축소하는 기능을 넣음
function mousePressed() {
  if (mouseY < height / 2) {
    camZ -= zoomSpeed;
  } else {
    camZ += zoomSpeed;
  }
  camera(0, 0, camZ, 0, 0, 0, 0, 1, 0);
}
