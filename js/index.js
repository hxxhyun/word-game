const answer = "APPLE";

let attempts = 0;
let index = 0;
let timer;

const appStart = () => {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; position:absolute; top: 40vh; left: 38%; background-color: white; width: 200px; height: 150px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterkey = () => {
    let correct = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index = '${attempts}${i}']`
      );
      const typeWord = block.innerText;
      const answerWord = answer[i];
      if (typeWord === answerWord) {
        block.style.background = "#6AAA64";
        correct++;
      } else if (answer.includes(typeWord)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (correct === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    const setTime = () => {
      const now = new Date();
      const pass = new Date(now - startTime);
      const minute = pass.getMinutes().toString().padStart(2, "0");
      const second = pass.getSeconds().toString().padStart(2, "0");
      const time1 = document.querySelector(".time");
      time1.innerText = `${minute} : ${second}`;
    };

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
};

appStart();
