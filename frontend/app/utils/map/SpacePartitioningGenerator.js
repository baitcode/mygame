const WALL=0
const SPACE=1
const MIN_ROOM_WIDTH = 10
const MIN_ROOM_HEIGHT = 10

const VERTICAL = 'x';
const HORIZONTAL = 'y';

class Rect {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.width = x2 - x1;
    this.height = y2 - y1;
  }
}

class Partition extends Rect {

  static sequence = 0;
  static index = {};


  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
    this.isSplitted = false;
    this.id = Partition.sequence++;
    Partition.index[this.id] = this;
    this.children = [];
  }

  splitVertical = () => {
    const cutLine = this.x1 + Math.floor(
      Math.random() * (this.width - MIN_ROOM_WIDTH * 2)
    ) + MIN_ROOM_WIDTH;

    // wrong coordinates

    this.children = [
      new Partition(
        this.x1,
        this.y1,
        cutLine,
        this.y2,
      ),
      new Partition(
        cutLine,
        this.y1,
        this.x2,
        this.y2,
      )
    ];

    return this.children
  };

  splitHorizontal = () => {
    const cutLine = this.y1 + Math.floor(
      Math.random() * (this.height - MIN_ROOM_HEIGHT * 2)
    ) + MIN_ROOM_HEIGHT;

    // wrong coordinates

    this.children = [
      new Partition(
        this.x1,
        this.y1,
        this.x2,
        cutLine,
      ),
      new Partition(
        this.x1,
        cutLine,
        this.x2,
        this.y2,
      )
    ];

    return this.children
  };

  isSplittableVertically = () => {
    return !this.isSplitted && this.width > MIN_ROOM_WIDTH * 2
  };

  isSplittableHorizontally = () => {
    return !this.isSplitted && this.height > MIN_ROOM_HEIGHT * 2
  };

  isSplittable = () => {
    return this.isSplittableVertically() || this.isSplittableHorizontally()
  };

  split = () => {
    if (!this.isSplittable()) {
      return this.children
    }

    var splitType = null
    if (this.isSplittableVertically() && this.isSplittableHorizontally()) {
      splitType = Math.random() <= 0.5 ? VERTICAL : HORIZONTAL;
    } else if (this.isSplittableVertically()) {
      splitType = VERTICAL
    } else {
      splitType = HORIZONTAL
    }

    this.isSplitted = true;

    return splitType == VERTICAL
      ? this.splitVertical()
      : this.splitHorizontal()
  }
}

var roomBuildingQueue = [];

const getRooms = (partition) => {
  if (!partition.children) {
    roomBuildingQueue.push(partition);
    return true;
  }
}

export default (width, height) => {
  var partition = new Partition(0, 0, width - 1, height - 1)

  var initialPartitions = [partition]
  var partitions = [partition]
  var newPartitions = null;

  var i = 0;

  while (newPartitions === null || newPartitions.length != 0) {
    i++;
    if (i > 100) {
      return
    }
    newPartitions = []
    partitions.forEach((element, index) => {
      if (element.isSplittable()) {
        var tmp = element.split()
        newPartitions = newPartitions.concat(tmp)
      }
    })
    partitions = newPartitions
    initialPartitions = initialPartitions.concat(newPartitions)
  }

  getRooms(initialPartitions[0])

  return [
    [1, 1],
    [1, 2],
  ]
}
