/*!
 * Original work Copyright 2019 SmugMug, Inc.
 * Modified work Copyright 2025 Nico Kaiser
 * Licensed under the terms of the MIT license.
 */

export interface LayoutOptions {
  rowHeight: number;
  rowWidth: number;
  spacing: number;
  heightTolerance: number;
}

interface LayoutBox {
  aspectRatio: number;
  top?: number;
  width?: number;
  height?: number;
  left?: number;
}

/**
 * Row
 * Wrapper for each row in a justified layout.
 * Stores relevant values and provides methods for calculating layout of individual rows.
 */
class Row {
  top: number;
  rowWidth: number;
  spacing: number;
  rowHeight: number;
  heightTolerance: number;
  minAspectRatio: number;
  maxAspectRatio: number;
  items: LayoutBox[] = [];
  height = 0;

  constructor(params: LayoutOptions & { top: number }) {
    this.top = params.top;

    this.rowWidth = params.rowWidth;
    this.spacing = params.spacing;
    this.rowHeight = params.rowHeight;
    this.heightTolerance = params.heightTolerance;

    this.minAspectRatio =
      (this.rowWidth / params.rowHeight) * (1 - params.heightTolerance);
    this.maxAspectRatio =
      (this.rowWidth / params.rowHeight) * (1 + params.heightTolerance);
  }

  /**
   * Attempt to add a single item to the row.
   */
  addItem(aspectRatio: number): boolean {
    const itemData: LayoutBox = { aspectRatio };
    const newItems = this.items.concat(itemData);

    const rowWidthWithoutSpacing =
      this.rowWidth - (newItems.length - 1) * this.spacing;

    const newAspectRatio = newItems.reduce(
      (sum, item) => sum + item.aspectRatio,
      0,
    );

    const targetAspectRatio = rowWidthWithoutSpacing / this.rowHeight;

    if (newAspectRatio < this.minAspectRatio) {
      this.items.push(itemData);
      return true;
    }

    if (newAspectRatio > this.maxAspectRatio) {
      if (this.items.length === 0) {
        this.items.push(itemData);
        this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
        return true;
      }

      const previousRowWidthWithoutSpacing =
        this.rowWidth - (this.items.length - 1) * this.spacing;

      const previousAspectRatio = this.items.reduce(
        (sum, item) => sum + item.aspectRatio,
        0,
      );

      const previousTargetAspectRatio =
        previousRowWidthWithoutSpacing / this.rowHeight;

      if (
        Math.abs(newAspectRatio - targetAspectRatio) >
        Math.abs(previousAspectRatio - previousTargetAspectRatio)
      ) {
        this.completeLayout(
          previousRowWidthWithoutSpacing / previousAspectRatio,
        );
        return false;
      }

      this.items.push(itemData);
      this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
      return true;
    }

    this.items.push(itemData);
    this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
    return true;
  }

  /**
   * Set row height and compute item geometry from that height.
   */
  completeLayout(newHeight: number) {
    const rowWidthWithoutSpacing =
      this.rowWidth - (this.items.length - 1) * this.spacing;

    let clampedToNativeRatio: number;

    const clampedHeight = Math.max(
      0.5 * this.rowHeight,
      Math.min(newHeight, 2 * this.rowHeight),
    );

    if (newHeight !== clampedHeight) {
      this.height = clampedHeight;
      clampedToNativeRatio =
        rowWidthWithoutSpacing /
        clampedHeight /
        (rowWidthWithoutSpacing / newHeight);
    } else {
      this.height = newHeight;
      clampedToNativeRatio = 1;
    }

    let itemWidthSum = 0;

    for (const item of this.items) {
      item.top = this.top;
      item.width = item.aspectRatio * this.height * clampedToNativeRatio;
      item.height = this.height;
      item.left = itemWidthSum;
      itemWidthSum += item.width + this.spacing;
    }
  }
}

/**
 * Takes in a list of aspect ratios and layout options.
 * Returns the geometry needed for a justified gallery.
 */
export default function (
  aspectRatios: number[],
  layoutOptions: LayoutOptions,
) {
  let containerHeight = 0;
  let boxes: LayoutBox[] = [];
  let currentRow: Row | undefined;
  let lastRowHeight = 0;

  for (const aspectRatio of aspectRatios) {
    if (!currentRow) {
      currentRow = new Row({
        top: containerHeight,
        ...layoutOptions,
      });
    }

    let itemAdded = currentRow.addItem(aspectRatio);

    if (currentRow.height > 0) {
      lastRowHeight = currentRow.height;
      boxes = boxes.concat(currentRow.items);
      containerHeight += currentRow.height + layoutOptions.spacing;
      currentRow = new Row({
        top: containerHeight,
        ...layoutOptions,
      });

      if (!itemAdded) {
        itemAdded = currentRow.addItem(aspectRatio);

        if (currentRow.height > 0) {
          lastRowHeight = currentRow.height;
          boxes = boxes.concat(currentRow.items);
          containerHeight += currentRow.height + layoutOptions.spacing;
          currentRow = new Row({
            top: containerHeight,
            ...layoutOptions,
          });
        }
      }
    }
  }

  if (currentRow && currentRow.items.length) {
    currentRow.completeLayout(lastRowHeight || layoutOptions.rowHeight);
    boxes = boxes.concat(currentRow.items);
    containerHeight += currentRow.height + layoutOptions.spacing;
  }

  containerHeight -= layoutOptions.spacing;

  return {
    containerHeight: Math.max(0, containerHeight),
    boxes,
  };
}
