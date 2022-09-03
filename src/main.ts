import kaboom from "kaboom";
import "./style.css";
import { Grid } from "./Util/gridPort";

window.K = kaboom({
  width: 320,
  height: 180,
  crisp: true,
  stretch: true,
  letterbox: true,
  background: [255, 255, 255],
});

const gridTest = new Grid(32, 18, 10);
// component();
const initialize = () => {
  onDraw(() => {
    gridTest.draw();

    drawRect({
      width: 10,
      height: 10,
      pos: gridTest.getGridVec(
        gridTest.checkCursorOnGrid().x,
        gridTest.checkCursorOnGrid().y
      ),
      color: YELLOW,
    });

    if (
      testRectPoint(
        new Rect(gridTest.getGridRect(0, 2).p1, gridTest.getGridRect(0, 2).p2),
        toWorld(mousePos())
      )
    ) {
      console.log(true);
    }

    drawCircle({
      pos: vec2(0, 0),
      radius: 1,
      color: rgb(0, 0, 0),
    });
  });
};

onwheel = (ev) => {
  // console.log(ev.deltaY * 0.1);
  const prevScale = camScale();
  camScale(
    vec2(
      Math.fround(camScale().x + ev.deltaY * -0.001),
      Math.fround(camScale().y + ev.deltaY * -0.001)
    )
  );
  if (camScale().y < 0) {
    // camScale(vec2(1, 1))
    camScale(prevScale);
    return;
  }
  console.log(camScale());
};

onKeyPress("1", () => {
  camScale(vec2(camScale().x + 1, camScale().y + 1));
});

let pressed = vec2(0);
let released = vec2(0);

onMousePress(() => {
  move = true;
  pressed = mousePos();
  // camPos(vec2(camPos().x + (pressed.x - toWorld(mousePos()).x), camPos().y + (pressed.y - toWorld(mousePos()).y)))
});

onMouseRelease(() => {
  move = false;
  released = mousePos();
  console.log(
    `Delta X: ${pressed.x - released.x} Y: ${pressed.y - released.y}`
  );
  // camPos(vec2(camPos().x + (pressed.x - released.x), camPos().y + (pressed.y - released.y)))
});

let move = false;

onUpdate(() => {
  // if (!move) pressed = mousePos()
  // if (move) {
  //   camPos(
  //     vec2(
  //       camPos().x + (pressed.x - toWorld(mousePos()).x),
  //       camPos().y + (pressed.y - toWorld(mousePos()).y)
  //     )
  //   );
  // }
});
onMouseMove((pos) => {
  if (move) {
    camPos(
      vec2(
        camPos().x + (pressed.x - toWorld(pos).x),
        camPos().y + (pressed.y - toWorld(pos).y)
      )
    );
  }
});

initialize();
onresize = () => {
  const currentCanvas = K.canvas;
  window.K = kaboom({
    width: 320,
    height: 180,
    crisp: true,
    stretch: true,
    letterbox: true,
    canvas: currentCanvas,
    background: [255, 255, 255],
  });
  initialize();
};

console.log(gridTest.grid);

onKeyDown("left", () => {
  camPos(vec2(camPos().x - 1, camPos().y));
});

onKeyDown("right", () => {
  camPos(vec2(camPos().x + 1, camPos().y));
});

onKeyDown("up", () => {
  camPos(vec2(camPos().x, camPos().y - 1));
});

onKeyDown("down", () => {
  camPos(vec2(camPos().x, camPos().y + 1));
});
