function typeset(code) {
  MathJax.startup.promise = MathJax.startup.promise
    .then(() => {code(); return MathJax.typesetPromise()})
    .catch((err) => console.log('Typeset failed: ' + err.message));
  return MathJax.startup.promise;
}

function reduce(num, den) {
  let gcd = (a, b) => b ? gcd(b, a % b) : a;
  gcd = gcd(num, den);
  return [num / gcd, den / gcd];
}

function negative(frac) {
  if (frac[0] < 0 || frac[1] < 0) {
    if (frac[0] < 0 && frac[1] < 0) return false;
    else return true;
  } else return false;
}

function distMid() {
  if (document.getElementById("dist-mid").style.display === "none") document.getElementById("dist-mid").style.display = "block";
  else document.getElementById("dist-mid").style.display = "none";
}

async function distMidQ() {
  let a = Math.floor(Math.random() * 41) - 20;
  let b = Math.floor(Math.random() * 41) - 20;
  let c, d;
  do {
    c = Math.floor(Math.random() * 41) - 20;
  } while (c === a);
  do {
    d = Math.floor(Math.random() * 41) - 20;
  } while (d === b);
  let xmid, ymid, rad, dec;
  xmid = reduce(a + c, 2);
  ymid = reduce(b + d, 2);
  rad = Math.pow(d - b, 2) + Math.pow(c - a, 2);
  dec = Math.sqrt(rad);
  let xmidNeg = negative(xmid) ? "-" : "";
  let ymidNeg = negative(ymid) ? "-" : "";
  let xmidPrint = xmid[1] === 1 || xmid[1] === -1 ? xmidNeg + Math.abs(xmid[0]).toString() : xmidNeg +  "\\dfrac{" + Math.abs(xmid[0]) + "}{" + Math.abs(xmid[1]) + "}";
  let ymidPrint = ymid[1] === 1 || ymid[1] === -1 ? ymidNeg + Math.abs(ymid[0]).toString() : ymidNeg + "\\dfrac{" + Math.abs(ymid[0]) + "}{" + Math.abs(ymid[1]) + "}";
  let decPrint = dec.toFixed(4);
  await typeset(() => {
    let question = document.getElementById("dist-mid-q");
    question.innerHTML = "$$(" + a.toString() + "," + b.toString() + ") (" + c.toString() + "," + d.toString() + ")$$";
    return question;
  });
  await typeset(() => {
    let answer = document.getElementById("dist-mid-a");
    answer.innerHTML = "$$\\text{Midpoint: } \\left(" + xmidPrint + "," + ymidPrint + "\\right)$$ $$\\text{Distance: }\\sqrt{" + rad.toString() + "}\\approx" + decPrint + "$$";
    return answer;
  });
  document.getElementById("dist-mid-body").style.display = "block";
  document.getElementById("dist-mid-a").style.display = "none";
}

function distMidA() {
  if (document.getElementById("dist-mid-a").style.display === "none") document.getElementById("dist-mid-a").style.display = "block";
  else document.getElementById("dist-mid-a").style.display = "none";
}

function eqLines() {
  if (document.getElementById("eq-lines").style.display === "none") document.getElementById("eq-lines").style.display = "block";
  else document.getElementById("eq-lines").style.display = "none";
}

async function eqLinesQ() {
  
}

function eqLinesA() {
  if (document.getElementById("eq-lines-a").style.display === "none") document.getElementById("eq-lines-a").style.display = "block";
  else document.getElementById("eq-lines-a").style.display = "none";
}