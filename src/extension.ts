export {};

declare global {
  interface String {
    toCode(): string;
  }
  interface Number {
    toCode(): string;
  }
}

String.prototype.toCode = function () {
  return `\`${this}\``;
};

Number.prototype.toCode = function () {
  return `\`${this}\``;
};
