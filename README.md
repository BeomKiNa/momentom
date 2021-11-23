# Momentom

Cloning Momentum with Vanilla JS, HTML and CSS

## How to use

1. Shows the current time.
2. When you refresh, the background picture changes.
3. Please enter your name. The site remembers your name.
4. Write down your to-do list and complete or delete it.
5. If you allow location permission, it will notify you of the weather.

## Github Pages Link

[Visit NOW!](https://nabeomki.github.io/momentom/)

## Changelog

---

### v1.0

- 노마드코더의 Momentum clone

### v2.0

- http-server 추가
- 기존의 함수로 구현한 내용을 class로 변경
- HTML도 class내에서 생성해 추가하도록 변경

#### 문제 상황과 해결 방법

1. class의 메서드가 함수선언문일 때와 화살표함수일 때의 차이 그리고 `this`

   문제 상황: `TasksList`를 상속하는 `Pending`과 `Finished`에서 메서드의 확장을 위해 `super`를 사용하려했으나, 화살표함수였기 때문에 `super`가 동작하지 않음.

   - 참고
     - [클래스 상속](https://ko.javascript.info/class-inheritance)
     - [[번역] 클래스 프로퍼티로 화살표 함수 사용하는 것은 생각만큼 좋지않다](https://hoilzz.github.io/javascript/arrow-functions-in-class-properties/)

   1. 함수선언문
      - prototype에 메서드 추가
      - 부모 메서드를 `super.method(...)`로 호출해 확장 가능
   2. 화살표함수
      - prototype이 아닌 새로 생성된 인스턴스 객체에 메서드 추가
      - 부모 메서드를 `super.method(...)`로 호출 불가능, 따라서 확장 불가능
   3. `this`
      - 일반적인 경우에 차이가 없으나 비동기 _(`setInterval`, `addEventListener`...)_ 나 내부 함수일 경우에 함수선언문으로 작성된 메서드의 this는 전역 객체를 가리킴. 화살표함수의 경우 여전히 생성된 인스턴스 객체를 가리킴
      - 함수선언문의 경우 이를 방지하기 위해서 `bind` _(또는 `apply`, `call`)_ 메서드를 사용해 `this`를 인스턴스 객체에 바인딩 시키는 작업이 필요함.

   해결 방법: 함수선언문을 사용하고, `this`를 바인딩 해서 해결

2. `this`가 `undefined`

   문제 상황: `Weather` 클래스의 `loadCoords` 메서드에서 다른 메서드를 사용하기 위해 구조 분해 할당을 사용했고, 해당 함수를 호출

   ```js
      loadCoords() {
         const { askForCoords, setState } = this
         const getCoords = JSON.parse(localStorage.getItem(COORDS)) || null;
         if (getCoords === null) {
            askForCoords();
         } else {
            setState(getCoords);
         }
      }
   ```

   이 때 `askForCoords`와 `setState`, 두 메서드내에서 `this`를 상실해 `undefined`가 되어 오류가 발생

   - 참고

     - [함수 바인딩](https://ko.javascript.info/bind)
     - ['this' is undefined in JavaScript class methods](https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods)

   - 함수를 인자로 전달할 경우, 함수를 호출하게 되면 `this`를 상실하게 됨. 함수를 호출하는 객체가 없기 때문.
   - 구조 분해 할당(또는 변수에 할당)도 마찬가지. 호출 당시에는 호출하는 객체없이 함수만 실행하고 있기 때문에, `this`를 상실한다.

   해결 방법: 따라서, 이 경우에도 `this`를 바인딩 시켜줘야함
