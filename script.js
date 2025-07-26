// ← Поставьте сюда ваш реальный BOT_TOKEN и CHAT_ID
const BOT_TOKEN = '8326426486:AAFVYDx3kSw1ppCq1Ftb-G1CstG-uUDMX-Q';
const CHAT_ID  = '284036840';

const app = document.getElementById('app');
let answers = {};

function clearScreen() {
  app.innerHTML = '';
}

// Шаг 1: две кнопки «я девушка» / «я курьер»
function showStep1() {
  clearScreen();
  const btnGirl    = document.createElement('button');
  const btnCourier = document.createElement('button');
  btnGirl.textContent    = 'Я та сама';
  btnCourier.textContent = "Я кур'єр";
  app.append(btnGirl, btnCourier);

  btnCourier.onclick = () => {
    answers.role = "Кур'єр";
    showCourierImage();
  };
  btnGirl.onclick = () => {
    answers.role = 'Дівчина';
    showGirlText();
  };
}

// Путь «курьер» — просто картинка
function showCourierImage() {
  clearScreen();
  const img = document.createElement('img');
  img.src = 'hehe.jpg';
  img.alt = "Кур'єр";
  const caption = document.createElement('p');
  caption.textContent = 'А шо ми тут забули?)';
  
  app.append(img, caption);
}

// Путь «девушка» — текст и далее
function showGirlText() {
  clearScreen();
  const p   = document.createElement('p');
  const btn = document.createElement('button');
  p.textContent = 'Вітаю! Ми не знайомі, однак я дуже хочу познайомитись з такою дуже чарівною дівчиною. Нажаль, я не знаю навіть як Вас звати, тому вирішив піти таким шляхом)';
  btn.textContent = 'Далі';
  app.append(p, btn);
  btn.onclick = showStep2;
}

// Шаг 2: выбор «полигон» / «ресторан» / «свое»
function showStep2() {
  clearScreen();
  ['Поїдемо в тир', 'Поїдемо в ресторан', 'Вислухаю інші пропозиції'].forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      answers.locationType = option;
      showDatePicker();
    };
    app.append(btn);
  });
}

// Шаг 3: календарь + далее
function showDatePicker() {
  clearScreen();
  const input = document.createElement('input');
  input.type = 'date';
  input.required = true;
  const btn = document.createElement('button');
  btn.textContent = 'Далі';
  const caption = document.createElement('p');
  caption.textContent = 'Оберіть комфортну дату для зустрічі)';
  app.append(caption, input, btn);
  btn.onclick = () => {
    answers.date = input.value;
    showNicknameInput();
  };
}

// Шаг 4: ввод Telegram-ника + далее
function showNicknameInput() {
  clearScreen();
  const input = document.createElement('input');
  const caption = document.createElement('p');
  caption.textContent = 'Напишіть свій Telegram-нікнейм, щоб я міг зв’язатися з вами)';
  input.type = 'text';
  input.placeholder = 'Telegram для зв’язку';
  input.required = true;
  const btn = document.createElement('button');
  btn.textContent = 'Далі';
  app.append(caption, input, btn);
  btn.onclick = () => {
    answers.nickname = input.value.trim();
    showSummary();
  };
}

// Шаг 5: итог и кнопка «отправить»
function showSummary() {
  clearScreen();
  const ul = document.createElement('ul');
  for (const [key, val] of Object.entries(answers)) {
    const li = document.createElement('li');
    li.textContent = `${key}: ${val}`;
    ul.append(li);
  }
  const btn = document.createElement('button');
  btn.textContent = 'Відправити';
  app.append(ul, btn);
  btn.onclick = sendToTelegram;
}

// Отправка в Telegram Bot API и показ картинки-заглушки
async function sendToTelegram() {
  const message = Object.entries(answers)
    .map(([k,v]) => `<b>${k}</b>: ${v}`)
    .join('\n');
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        chat_id:   CHAT_ID,
        parse_mode:'HTML',
        text:      message
      })
    });
    // После успешной отправки — заглушка
    clearScreen();
    const caption = document.createElement('p');
    caption.textContent = 'Вже спішу Вам писати)';
    const img = document.createElement('img');
    img.src = 'corgi.jpg';
    img.alt = 'Є';
    app.append(caption, img);
  } catch (err) {
    alert('Щось пішло не так, спробуйте ще раз');
    console.error(err);
  }
}

// Запуск
showStep1();