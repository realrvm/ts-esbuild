const root = document.querySelector("#root")!;
const btn = document.createElement("button");
const count = document.createElement("p");

root.append(count);
root.append(btn);
btn.innerHTML = "Count ++";

function limit<This, T extends number>(
  _,
  context: ClassFieldDecoratorContext<This, T>,
) {
  if (context.kind === "field") {
    return function (initialValue: T): T {
      if (initialValue > 5) {
        (initialValue as number) = 0;
        return initialValue;
      }

      return initialValue;
    };
  }
}

class Count {
  private counter: number = 0;

  constructor(element: HTMLButtonElement) {
    element.addEventListener("click", () => {
      this.setCounter(this.counter + 1);
    });
  }

  setCounter(val: number) {
    this.counter = val;
    count.innerHTML = this.counter.toString();
  }
}

new Count(btn).setCounter(0);
