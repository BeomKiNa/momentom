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
- 접속 때마다 랜덤한 배경 이미지
- 현재 시간 확인
- 사용자 이름을 저장 (localStorage 사용)
- To Do List 추가, 저장 및 삭제 (localStorage 사용)
- 현재 위치에 따라 현재 날씨 조회 (OpenWeatherMap API 사용)

### v2.0

- ~~http-server 추가~~ Webpack dev server 추가
- 기존의 함수로 구현한 내용을 class로 변경
- HTML도 class내에서 생성해 추가하도록 변경
- CSS를 SCSS로 변경
- Webpack으로 빌드
- Babel을 사용해 크로스 브라우징 해결

## 문제 상황과 해결 방법

---

### v2.0

1. class의 메서드가 함수선언문일 때와 화살표함수일 때의 차이 그리고 `this`

   #### 문제 상황

   `TasksList`를 상속하는 `Pending`과 `Finished`에서 메서드의 확장을 위해 `super`를 사용하려했으나, 화살표함수였기 때문에 `super`가 동작하지 않음.

   #### 원인

   1. 함수선언문
      - prototype에 메서드 추가
      - 부모 메서드를 `super.method(...)`로 호출해 확장 가능
   2. 화살표함수
      - prototype이 아닌 새로 생성된 인스턴스 객체에 메서드 추가
      - 부모 메서드를 `super.method(...)`로 호출 불가능, 따라서 확장 불가능
   3. `this`
      - 일반적인 경우에 차이가 없으나 비동기 _(`setInterval`, `addEventListener`...)_ 나 내부 함수일 경우에 함수선언문으로 작성된 메서드의 this는 전역 객체를 가리킴. 화살표함수의 경우 여전히 생성된 인스턴스 객체를 가리킴
      - 함수선언문의 경우 이를 방지하기 위해서 `bind` _(또는 `apply`, `call`)_ 메서드를 사용해 `this`를 인스턴스 객체에 바인딩 시키는 작업이 필요함.

   #### 해결 방법

   - 함수선언문을 사용하고, `this`를 바인딩 해서 해결

   #### 참고

   - [클래스 상속](https://ko.javascript.info/class-inheritance)
   - [[번역] 클래스 프로퍼티로 화살표 함수 사용하는 것은 생각만큼 좋지않다](https://hoilzz.github.io/javascript/arrow-functions-in-class-properties/)

2. `this`가 `undefined`

   #### 문제 상황

   `Weather` 클래스의 `loadCoords` 메서드에서 다른 메서드를 사용하기 위해 구조 분해 할당을 사용했고, 해당 함수를 호출

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

   #### 원인

   - 함수를 인자로 전달할 경우, 함수를 호출하게 되면 `this`를 상실하게 됨. 함수를 호출하는 객체가 없기 때문.
   - 구조 분해 할당(또는 변수에 할당)도 마찬가지. 호출 당시에는 호출하는 객체없이 함수만 실행하고 있기 때문에, `this`를 상실한다.

   #### 해결 방법

   1. 이 경우에도 `this`를 바인딩 시켜줘야 함.
   2. 그게 아니라면, 구조 분해 할당(또는 변수에 할당)을 사용하지 않아야 함.
   3. 또는 메서드를 화살표함수로 사용해 `this`가 상위 `this`로 바인딩되도록 만든다.

   #### 참고

   - [함수 바인딩](https://ko.javascript.info/bind)
   - ['this' is undefined in JavaScript class methods](https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods)

3. 환경 변수 사용

   #### 문제 상황

   weather 정보를 가져오기 위해 필요한 api key를 .env 파일로 분리시켜 은닉을 하고 싶었다. (요청이 있을때 노출되므로 완벽한 의미의 은닉은 아니다.) 하지만, `process is not defined` 에러가 발생

   #### 원인

   process는 Node에서 존재하고 브라우저에서는 존재하지 않기 때문에 not defined 에러가 발생

   #### 해결 방법

   이를 해결하기 위한 목적으로 웹팩을 사용한건 아니지만, 웹팩을 사용해 해결한 방법으로 기록한다. 이런 번들러나 테스크 러너를 사용하지 않고 해결하는 방법은 아직 잘 모르겠다. 하지만 이런 번들러를 사용하는 경우가 대다수라고 생각되고, gulp의 경우에도 [`gulp-dotenv`](https://www.npmjs.com/package/gulp-dotenv) 패키지가 존재한다.

   1. [`dotenv`](https://www.npmjs.com/package/dotenv)를 설치하고, 웹팩 플러그인인 `EnvironmentPlugin`을 사용한다.

      ```js
      const webpack = require("webpack");
      const dotenv = require("dotenv").config();

      module.exports = {
        // ...
        plugins: [
          new webpack.EnvironmentPlugin(Object.keys(dotenv.parsed || {})),
        ],
        // ...
      };
      ```

      > 🧐 `EnvironmetnPlugin`?
      >
      > 웹팩에서 제공하는 `EnvironmentPlugin`은 노드 런타임(Node runtime)에서 `process.env`에 저장되는 환경 변수를 전역 변수로 등록하기 위한 플러그인이다.

   2. [`dotenv-webpack`](https://www.npmjs.com/package/dotenv-webpack)을 설치하고, 웹팩 플러그인에 추가한다.

      ```js
      const Dotenv = require("dotenv-webpack");

      module.exports = {
        // ...
        plugins: [new Dotenv()],
        //...
      };
      ```

   #### 참고

   - [dotenv로 환경 변수 관리하기](https://www.daleseo.com/js-dotenv/)
   - [프론트엔드에서 API Key를 숨기는 법](https://velog.io/@0307kwon/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-API-Key%EB%A5%BC-%EC%88%A8%EA%B8%B0%EB%8A%94-%EB%B2%95)
   - [자바스크립트 환경변수 설정하기](https://hjuu.tistory.com/24)
   - [Webpack 러닝 가이드 - Webpack 플러그인 - 환경 변수 등록](https://yamoo9.gitbook.io/webpack/webpack/webpack-plugins/manage-env-variables)
   - [How to access environment variables from the front-end](https://stackoverflow.com/questions/57663555/how-to-access-environment-variables-from-the-front-end)
   - [dotenv](https://www.npmjs.com/package/dotenv)
   - [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack)
   - [gulp-dotenv](https://www.npmjs.com/package/gulp-dotenv)
