const Direction = Object.freeze({
  UP: 0, UP_RIGHT: 1, RIGHT: 2, DOWN_RIGHT: 3,
  DOWN: 4, DOWN_LEFT: 5, LEFT: 6, UP_LEFT: 7
});

class TilePosError extends Error {}

class Tile {
  constructor(charData = " ") {
    this.charData = charData;
    this.adjacencies = Array(8).fill(null);
  }

  getAdjacent(direction) {
    const tile = this.adjacencies[direction];
    if (!tile) throw new TilePosError("No adjacent tile");
    return tile;
  }
}

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this._tiles = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => new Tile())
    );
    this._wireAll();
  }

  _wireAll() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this._wireTile(x, y);
      }
    }
  }

  _wireTile(x, y) {
    const offsets = [
      [0,-1],[1,-1],[1,0],[1,1],
      [0,1],[-1,1],[-1,0],[-1,-1]
    ];
    const tile = this._tiles[y][x];
    for (let dir = 0; dir < 8; dir++) {
      const [dx, dy] = offsets[dir];
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
        tile.adjacencies[dir] = this._tiles[ny][nx];
        const opposite = (dir + 4) % 8;
        this._tiles[ny][nx].adjacencies[opposite] = tile;
      } else {
        tile.adjacencies[dir] = null;
      }
    }
  }

  getTile(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new TilePosError("Out of bounds");
    }
    return this._tiles[y][x];
  }

  render() {
    return this._tiles
      .map(row => row.map(t => t.charData).join(""))
      .join("\n");
  }

  // Step 2: extend board in any direction
  extend(direction, amount = 1) {
    const diagonalMap = {
      [Direction.UP_RIGHT]:   [Direction.UP,   Direction.RIGHT],
      [Direction.DOWN_RIGHT]: [Direction.DOWN,  Direction.RIGHT],
      [Direction.DOWN_LEFT]:  [Direction.DOWN,  Direction.LEFT],
      [Direction.UP_LEFT]:    [Direction.UP,    Direction.LEFT],
    };

    if (diagonalMap[direction]) {
      for (const d of diagonalMap[direction]) {
        this.extend(d, amount);
      }
      return;
    }

    for (let i = 0; i < amount; i++) {
      this._extendOne(direction);
    }
  }

  _extendOne(direction) {
    if (direction === Direction.RIGHT) {
      for (let y = 0; y < this.height; y++) {
        this._tiles[y].push(new Tile());
      }
      this.width++;
      for (let y = 0; y < this.height; y++) {
        this._wireTile(this.width - 1, y);
      }

    } else if (direction === Direction.LEFT) {
      for (let y = 0; y < this.height; y++) {
        this._tiles[y].unshift(new Tile());
      }
      this.width++;
      for (let y = 0; y < this.height; y++) {
        this._wireTile(0, y);
      }

    } else if (direction === Direction.DOWN) {
      const newRow = Array.from({ length: this.width }, () => new Tile());
      this._tiles.push(newRow);
      this.height++;
      for (let x = 0; x < this.width; x++) {
        this._wireTile(x, this.height - 1);
      }

    } else if (direction === Direction.UP) {
      const newRow = Array.from({ length: this.width }, () => new Tile());
      this._tiles.unshift(newRow);
      this.height++;
      for (let x = 0; x < this.width; x++) {
        this._wireTile(x, 0);
      }
    }
  }

  // Step 3: compose multiple sub-boards into one big board
  static compose(subBoards) {
    // find total dimensions needed
    let maxWidth = 0;
    let maxHeight = 0;
    for (const { board, x, y } of subBoards) {
      maxWidth = Math.max(maxWidth, x + board.width);
      maxHeight = Math.max(maxHeight, y + board.height);
    }

    // create empty big board
    const bigBoard = new Board(maxWidth, maxHeight);

    // copy tiles from subboards into correct positions
    for (const { board, x: bx, y: by } of subBoards) {
      for (let y = 0; y < board.height; y++) {
        for (let x = 0; x < board.width; x++) {
          bigBoard._tiles[by + y][bx + x] = board._tiles[y][x];
        }
      }
    }

    // rewire all adjacencies across the full big board
    bigBoard._wireAll();

    return bigBoard;
  }
}

// ─── Tests ───────────────────────────────────────────────

// Step 1: basic board
const chessBoard = new Board(8, 8);
chessBoard.getTile(3, 4).charData = "♛";
chessBoard.getTile(7, 2).charData = "♖";
const arrows = "↑↗→↘↓↙←↖";
for (const [i, arrow] of arrows.split('').entries()) {
  let tile = chessBoard.getTile(3, 4);
  try {
    while (true) {
      tile = tile.getAdjacent(i);
      tile.charData = arrow;
    }
  } catch(e) {
    if (!(e instanceof TilePosError)) throw e;
  }
}
console.log("Step 1:");
console.log(chessBoard.render());
console.log("---");

// Step 2: extend
const board2 = new Board(3, 3);
board2.getTile(1, 1).charData = "X";
board2.extend(Direction.RIGHT, 2);
board2.extend(Direction.DOWN, 1);
board2.getTile(4, 3).charData = "Y";
console.log("Step 2:");
console.log(board2.render());
console.log("adjacency check:", board2.getTile(1,1).getAdjacent(Direction.RIGHT).charData);
console.log("---");

// Step 3: compose
const b1 = new Board(3, 3);
b1.getTile(1, 1).charData = "A";

const b2 = new Board(2, 2);
b2.getTile(0, 0).charData = "B";

const big = Board.compose([
  { board: b1, x: 0, y: 0 },
  { board: b2, x: 4, y: 1 },
]);
console.log("Step 3:");
console.log(big.render());
