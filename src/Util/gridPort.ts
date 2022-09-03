
export class Grid {
  private width: number;
  private height: number;
  gridArray: number[][] = [];
  gridSize: number;
  constructor(width: number, height: number, gridSize: number) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;

    for (let i = 0; i < height; i++) {
      this.gridArray[i] = [];
      for (let j = 0; j < width; j++) {
        this.gridArray[i][j] = 0;
      }
    }
  }

  get grid() {
    return this.gridArray;
  }

  get size() {
    return this.gridSize;
  }

  draw() {
    for (let i = 0; i <= this.width; i++) {
      const drawPos = i === 0 ? 0 : i * this.gridSize;
      drawLine({
        p1: vec2(drawPos, 0),
        p2: vec2(drawPos, this.height * this.gridSize),
        width: 1,
        color: rgb(0, 0, 255),
      });
    }

    for (let i = 0; i <= this.height; i++) {
      const drawPos = i === 0 ? 0 : i * this.gridSize;
      drawLine({
        p1: vec2(0, drawPos),
        p2: vec2(this.width * this.gridSize, drawPos),
        width: 1,
        color: rgb(0, 0, 255),
      });
    }
  }

  checkCursorOnGrid() {
    const result = vec2();
    let mayBreak = false;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width  ; j++) {
        if (mayBreak) break;
        const gridRect = this.getGridRect(i, j);
        if (
          testRectPoint(new Rect(gridRect.p1, gridRect.p2), toWorld(mousePos()))
        ) {
          result.x = i;
          result.y = j;
          console.log(`Pos: ${result}`);
          mayBreak = true;
          break;
        }
      }
    }
    return result;
  }

  getGridPos(y: number, x: number) {
    return {
      p1: x * this.gridSize,
      p2: y * this.gridSize,
    };
  }

  getGridVec(y: number, x: number) {
    return vec2(x * this.gridSize, y * this.gridSize);
  }

  getGridRect(y: number, x: number) {
    return {
      p1: vec2(x * this.gridSize, y * this.gridSize),
      p2: vec2(
        x * this.gridSize + this.gridSize,
        y * this.gridSize + this.gridSize
      ),
    };
  }
}
