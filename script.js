window.addEventListener('DOMContentLoaded', () => {
// Visitor Counter
let count = localStorage.getItem('visitCount') || 0;
count++;
localStorage.setItem('visitCount', count);
document.getElementById('visit-counter').textContent = `Visitor #${count}`;

// Dream Journal
const dreams = [
  "Dreamt of flying over neon cities",
  "A code editor that writes code itself",
  "A cat pirate sailing space seas",
  "Building castles from HTML tags",
  "Dancing with robots in the rain"
];
const list = document.getElementById('dream-list');
dreams.forEach(d => { let li = document.createElement('li'); li.textContent = d; list.append(li); });
document.getElementById('new-dream').addEventListener('click', () => {
  let rand = dreams[Math.floor(Math.random()*dreams.length)];
  let li = document.createElement('li'); li.textContent = rand; list.append(li);
});

// Logo Hidden Animation (click 3 times)
const logo = document.getElementById('main-logo');
let clicks = 0;
logo.addEventListener('click', () => {
  clicks++;
  if(clicks === 3) {
    logo.classList.add('spin');
    setTimeout(() => { logo.classList.remove('spin'); clicks = 0; }, 1000);
  }
});

// Fake Terminal
const term = document.getElementById('terminal');
const output = document.getElementById('term-output');
const input = document.getElementById('term-input');
let ctrlPressed = false;
document.addEventListener('keydown', e => {
  if(e.key === 'Control') ctrlPressed = true;
  if(e.key.toLowerCase() === 'k' && ctrlPressed) {
    term.classList.toggle('hidden'); input.focus();
  }
  if(e.key === 'Escape') term.classList.add('hidden');
});
document.addEventListener('keyup', e => { if(e.key === 'Control') ctrlPressed = false; });
input.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    const cmd = input.value.trim().toLowerCase();
    let res = '';
    if(cmd === 'help') res = "Commands: help, meow, dream, code, catfacts";
    else if(cmd === 'meow') res = "Meow! 🐱";
    else if(cmd === 'dream') res = "Dream big, code bigger.";
    else if(cmd === 'code') res = "Code is poetry in logic.";
    else if(cmd === 'catfacts') window.location.href = 'cat-facts.html';
    else res = `Command not found: ${cmd}`;
    output.innerHTML += `<div>$ ${cmd}</div><div>${res}</div>`;
    input.value = '';
    output.scrollTop = output.scrollHeight;
  }
});
});