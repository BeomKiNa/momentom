interface Component {
  attachTo($parent: HTMLElement, position?: InsertPosition): void;
  removeFrom($parent: HTMLElement): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly $element: T;

  constructor(htmlStr: string) {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = htmlStr;
    this.$element = template.content.firstElementChild! as T;
  }

  attachTo($parent: HTMLElement, position: InsertPosition = "afterbegin") {
    $parent.insertAdjacentElement(position, this.$element);
  }

  removeFrom($parent: HTMLElement) {
    if ($parent === this.$element.parentElement) {
      throw new Error("Parent mismatch!");
    }
    $parent.removeChild(this.$element);
  }
}
