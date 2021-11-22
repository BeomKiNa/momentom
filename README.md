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

1. class의 메서드가 함수선언문일 때와 화살표함수일 때의 차이 그리고 this

   문제 상황: TasksList를 상속하는 Pending과 Finished에서 메서드의 확장을 위해 super를 사용하려했으나, 화살표함수였기 때문에 super가 동작하지 않음. 참고: [클래스 상속](https://ko.javascript.info/class-inheritance)

   1. 함수선언문
      - prototype에 메서드 추가
      - 부모 메서드를 super.method(...)로 호출해 확장 가능
   2. 화살표함수
      - prototype이 아닌 새로 생성된 인스턴스 객체에 메서드 추가
      - 부모 메서드를 super.method(...)로 호출 불가능, 따라서 확장 불가능
   3. this
      - 일반적인 경우에 차이가 없으나 비동기 _(setInterval, addEventListener...)_ 나 내부 함수일 경우에 함수선언문으로 작성된 메서드의 this는 전역 객체를 가리킴. 화살표함수의 경우 여전히 생성된 인스턴스 객체를 가리킴
      - 함수선언문의 경우 이를 방지하기 위해 bind _(또는 apply, call)_ 메서드를 사용해 this가 인스턴스 객체에 바인딩 시키는 작업이 필요함.
