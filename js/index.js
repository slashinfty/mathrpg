function typeset(code) {
  MathJax.typesetClear(); //temp solution
  MathJax.startup.promise = MathJax.startup.promise
    .then(() => {code(); return MathJax.typesetPromise()})
    .catch((err) => console.log('Typeset failed: ' + err.message));
  return MathJax.startup.promise;
}

function reduce(num, den, lcm = false) {
  let gcd = (a, b) => b ? gcd(b, a % b) : a;
  gcd = gcd(num, den);
  if (lcm) return [num / gcd, den / gcd, gcd];
  else return [num / gcd, den / gcd];
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
  switch (document.getElementById("eq-lines-type").value) {
    case "1":
      let p, q;
      let a = Math.floor(Math.random() * 41) - 20;
      let b = Math.floor(Math.random() * 41) - 20;
      do {
        p = Math.floor(Math.random() * 21) - 10;
      } while (p === 0);
      do {
        q = Math.floor(Math.random() * 21) - 10;
      } while (q === 0);
      let slope, int;
      slope = reduce(p, q);
      if (slope[0] > 0) {
        slope[0] = -slope[0];
        slope[1] = -slope[1];
      }
      int = reduce((b * q) - (p * a), q);
      let slopeNeg = negative(slope) ? "-" : "";
      let intNeg = negative(int) ? "-" : "+";
      let ytermNeg = slope[1] < 0 ? "-" : "+";
      let slopePrint = Math.abs(slope[1]) === 1 ? slopeNeg + Math.abs(slope[0]).toString() : slopeNeg + "\\dfrac{" + Math.abs(slope[0]) + "}{" + Math.abs(slope[1]) + "}";
      let answerSlope = slopePrint === "1" ? "" : slopePrint === "-1" ? "-" : slopePrint;
      let intPrint = Math.abs(int[1]) === 1 ? intNeg + Math.abs(int[0]).toString() : intNeg + "\\dfrac{" + Math.abs(int[0]) + "}{" + Math.abs(int[1]) + "}";
      intPrint = int[0] === 0 ? "" : intPrint;
      let xtermPrint = slope[0] === -1 ? "" : (-slope[0]).toString();
      let ytermPrint = Math.abs(slope[1]) === 1 ? "" : Math.abs(slope[1]).toString();
      await typeset(() => {
        let question = document.getElementById("eq-lines-q");
        question.innerHTML = "$$\\text{Point: } \\left(" + a.toString() + "," + b.toString() + "\\right)\\ \\text{Slope: }" + slopePrint + "$$";
        return question;
      });
      await typeset(() => {
        let answer = document.getElementById("eq-lines-a");
        answer.innerHTML = "$$\\text{Slope-Intercept: } y=" + answerSlope + "x" + intPrint + "$$ $$\\text{Standard: } " + xtermPrint + "x" + ytermNeg + ytermPrint + "y=" + ((b * slope[1]) - (slope[0] * a)).toString() + "$$";
      });
      document.getElementById("eq-lines-body").style.display = "block";
      document.getElementById("eq-lines-a").style.display = "none";
      break;
    case "2":
      let c, d;
      let e = Math.floor(Math.random() * 41) - 20;
      let f = Math.floor(Math.random() * 41) - 20;
      do {
        c = Math.floor(Math.random() * 41) - 20;
      } while (c === e);
      do {
        d = Math.floor(Math.random() * 41) - 20;
      } while (d === f);
      let slope2, int2;
      slope2 = reduce(d - f, c - e);
      if (slope2[0] > 0) {
        slope2[0] = -slope2[0];
        slope2[1] = -slope2[1];
      }
      int2 = reduce((f * c) - (e * d), (c - e));
      let slope2Neg, constSwitch, int2Neg, constNeg;
      if (negative(slope2)) {
        slope2Neg = "-";
        constSwitch = false;
      } else {
        slope2Neg = "";
        constSwitch = true;
      }
      if (negative(int2)) {
        int2Neg = "-";
        constNeg = constSwitch ? "" : "-";
      } else {
        int2Neg = "+";
        constNeg = constSwitch ? "-" : "";
      }
      let yterm2Neg = slope2[1] < 0 ? "-" : "+";
      let slope2Print;
      if (Math.abs(slope2[1]) === 1) {
        if (Math.abs(slope2[0]) === 1) slope2Print = slope2Neg;
        else slope2Print = slope2Neg + Math.abs(slope2[0]).toString();
      } else slope2Print = slope2Neg + "\\dfrac{" + Math.abs(slope2[0]) + "}{" + Math.abs(slope2[1]) + "}";
      let int2Print = Math.abs(int2[1]) === 1 ? int2Neg + Math.abs(int2[0]).toString() : int2Neg + "\\dfrac{" + Math.abs(int2[0]) + "}{" + Math.abs(int2[1]) + "}";
      int2Print = int2[0] === 0 ? "" : int2Print;
      let xterm2Print = slope2[0] === -1 ? "" : (-slope2[0]).toString();
      let yterm2Print = Math.abs(slope2[1]) === 1 ? "" : Math.abs(slope2[1]).toString();
      let constPrint = constNeg + Math.abs((f * slope2[1]) - (e * slope2[0])).toString();
      await typeset(() => {
        let question = document.getElementById("eq-lines-q");
        question.innerHTML = "$$\\text{Points: } \\left(" + e.toString() + "," + f.toString() + "\\right) \\left(" + c.toString() + "," + d.toString() + "\\right)$$";
        return question;
      });
      await typeset(() => {
        let answer = document.getElementById("eq-lines-a");
        answer.innerHTML = "$$\\text{Slope-Intercept: } y=" + slope2Print + "x" + int2Print + "$$ $$\\text{Standard: } " + xterm2Print + "x" + yterm2Neg + yterm2Print + "y=" + constPrint + "$$";
        return answer;
      });
      document.getElementById("eq-lines-body").style.display = "block";
      document.getElementById("eq-lines-a").style.display = "none";
      break;
    case "3":
      let h;
      let i = Math.floor(Math.random() * 201) - 100;
      let j = Math.floor(Math.random() * 41) - 20;
      let k = Math.floor(Math.random() * 41) - 20;
      let g = Math.floor(Math.random() * 15) + 1;
      do {
        h = Math.floor(Math.random() * 31) - 15;
      } while (h === 0);
      let slope3, int3;
      slope3 = reduce(h, g);
      if (slope3[0] > 0) {
        slope3[0] = -slope3[0];
        slope3[1] = -slope3[1];
      }
      int3 = reduce((k * g) - (j * h), g);
      let slope3Neg = negative(slope3) ? "-" : "";
      let int3Neg = negative(int3) ? "-" : "+";
      let yterm3Neg = slope3[1] < 0 ? "-" : "+";
      let xterm3Neg = slope3[0] < 0 ? "" : "-";
      let gtermNeg = g < 0 ? "-" : "";
      let htermNeg = h < 0 ? "-" : "+";
      let gPrint = Math.abs(g) === 1 ? gtermNeg : gtermNeg + Math.abs(g).toString();
      let hPrint = Math.abs(h) === 1 ? htermNeg : htermNeg + Math.abs(h).toString();
      let slope3Print;
      if (Math.abs(slope3[1]) === 1) {
        if (Math.abs(slope3[0]) === 1) slope3Print = slope3Neg;
        else slope3Print = slope3Neg + Math.abs(slope3[0]).toString();
      } else slope3Print = slope3Neg + "\\dfrac{" + Math.abs(slope3[0]) + "}{" + Math.abs(slope3[1]) + "}";
      let int3Print = Math.abs(int3[1]) === 1 ? int3Neg + Math.abs(int3[0]).toString() : int3Neg + "\\dfrac{" + Math.abs(int3[0]) + "}{" + Math.abs(int3[1]) + "}";
      int3Print = int3[0] === 0 ? "" : int3Print;
      let xterm3Print = Math.abs(slope3[0]) === 1 ? "" : Math.abs(slope3[0]).toString();
      let yterm3Print = Math.abs(slope3[1]) === 1 ? "" : Math.abs(slope3[1]).toString();
      await typeset(() => {
        let question = document.getElementById("eq-lines-q");
        question.innerHTML = "$$\\text{Point: } \\left(" + j.toString() + "," + k.toString() + "\\right)\\ \\text{Line: }" + gPrint + "x" + hPrint + "y=" + i.toString() + "$$";
        return question;
      });
      await typeset(() => {
        let answer = document.getElementById("eq-lines-a");
        answer.innerHTML = "$$\\text{Slope-Intercept: } y=" + slope3Print + "x" + int3Print + "$$ $$\\text{Standard: } " + xterm3Neg + xterm3Print + "x" + yterm3Neg + yterm3Print + "y=" + ((k * slope3[1]) - (j * slope3[0])).toString() + "$$";
        return answer;
      });
      document.getElementById("eq-lines-body").style.display = "block";
      document.getElementById("eq-lines-a").style.display = "none";
      break;
    case "4":
      let m;
      let n = Math.floor(Math.random() * 201) - 100;
      let o = Math.floor(Math.random() * 41) - 20;
      let r = Math.floor(Math.random() * 41) - 20;
      let l = Math.floor(Math.random() * 15) + 1;
      do {
        m = Math.floor(Math.random() * 31) - 15;
      } while (m === 0);
      let slope4, int4;
      slope4 = reduce(l, m);
      if (slope4[0] < 0) {
        slope4[0] = -slope4[0];
        slope4[1] = -slope4[1];
      }
      int4 = reduce((r * m) + (o * l), m);
      let slope4Neg = negative(slope4) ? "" : "-";
      let int4Neg = negative(int4) ? "-" : "+";
      let yterm4Neg = slope4[1] < 0 ? "-" : "+";
      let xterm4Neg = slope4[0] < 0 ? "-" : "";
      let mtermNeg = m < 0 ? "-" : "+";
      let ltermNeg = l < 0 ? "-" : "";
      let mPrint = Math.abs(m) === 1 ? mtermNeg : mtermNeg + Math.abs(m).toString();
      let lPrint = Math.abs(l) === 1 ? ltermNeg : ltermNeg + Math.abs(l).toString();
      let slope4Print;
      if (Math.abs(slope4[1]) === 1) {
        if (Math.abs(slope4[0]) === 1) slope4Print = slope4Neg;
        else slope4Print = slope4Neg + Math.abs(slope4[0]).toString();
      } else slope4Print = slope4Neg + "\\dfrac{" + Math.abs(slope4[0]) + "}{" + Math.abs(slope4[1]) + "}";
      let int4Print = Math.abs(int4[1]) === 1 ? int4Neg + Math.abs(int4[0]).toString() : int4Neg + "\\dfrac{" + Math.abs(int4[0]) + "}{" + Math.abs(int4[1]) + "}";
      int4Print = int4[0] === 0 ? "" : int4Print;
      let xterm4Print = Math.abs(slope4[0]) === 1 ? "" : Math.abs(slope4[0]).toString();
      let yterm4Print = Math.abs(slope4[1]) === 1 ? "" : Math.abs(slope4[1]).toString();
      await typeset(() => {
        let question = document.getElementById("eq-lines-q");
        question.innerHTML = "$$\\text{Point: } \\left(" + o.toString() + "," + r.toString() + "\\right)\\ \\text{Line: }" + lPrint + "x" + mPrint + "y=" + n.toString() + "$$";
        return question;
      });
      await typeset(() => {
        let answer = document.getElementById("eq-lines-a");
        answer.innerHTML = "$$\\text{Slope-Intercept: } y=" + slope4Print + "x" + int4Print + "$$ $$\\text{Standard: } " + xterm4Neg + xterm4Print + "x" + yterm4Neg + yterm4Print + "y=" + ((r * slope4[1]) + (o * slope4[0])).toString() + "$$";
        return answer;
      });
      document.getElementById("eq-lines-body").style.display = "block";
      document.getElementById("eq-lines-a").style.display = "none";
      break;
  }
}

function eqLinesA() {
  if (document.getElementById("eq-lines-a").style.display === "none") document.getElementById("eq-lines-a").style.display = "block";
  else document.getElementById("eq-lines-a").style.display = "none";
}

function factorQuads() {
  if (document.getElementById("factor-quads").style.display === "none") document.getElementById("factor-quads").style.display = "block";
  else document.getElementById("factor-quads").style.display = "none";
}

async function factorQuadsQ() {
  let g, a, b, p, q;
  if (document.getElementById("gcf-factor-quads").checked) {
    do {
      g = Math.floor(Math.random() * 13) - 6;
    } while (g === 0);
  } else g = 1;
  if (document.getElementById("a-factor-quads").checked) {
    a = Math.floor(Math.random() * 4) + 1;
    b = Math.floor(Math.random() * 4) + 1;
  } else {
    a = 1;
    b = 1;
  }
  do {
    p = Math.floor(Math.random() * 31) - 15;
  } while (p === 0);
  do {
    q = Math.floor(Math.random() * 31) - 15;
  } while (q === 0);
  let firstFactor = reduce(a, p, true);
  if (firstFactor[2] < 0) firstFactor.forEach((e, i) => firstFactor[i] = -e);
  let secondFactor = reduce(b, q, true);
  if (secondFactor[2] < 0) secondFactor.forEach((e, i) => secondFactor[i] = -e);
  g *= firstFactor[2] * secondFactor[2];
  if (!document.getElementById("gcf-factor-quads").checked) g = 1;
  let aTerm = g * firstFactor[0] * secondFactor[0];
  let aNeg = aTerm < 0 ? "-" : "";
  let aPrint = Math.abs(aTerm) === 1 ? aNeg + "x^{2}" : aNeg + Math.abs(aTerm) + "x^{2}";
  let bTerm = g * ((firstFactor[0] * secondFactor[1]) + (secondFactor[0] * firstFactor[1]));
  let bNeg = bTerm < 0 ? "-" : "+";
  let bPrint;
  if (bTerm === 0) bPrint = "";
  else if (Math.abs(bTerm) === 1) bPrint = bNeg + "x";
  else bPrint = bNeg + Math.abs(bTerm) + "x";
  let cTerm = g * firstFactor[1] * secondFactor[1];
  let cNeg = cTerm < 0 ? "-" : "+";
  let cPrint = cTerm === 0 ? "" : cNeg + Math.abs(cTerm);
  let gNeg = g * firstFactor[2] * secondFactor[2] < 0 ? "-" : "";
  let gTerm = Math.abs(g) === 1 ? gNeg : gNeg + Math.abs(g).toString();
  gTerm = document.getElementById("gcf-factor-quads").checked ? gTerm : "";
  let pNeg = firstFactor[1] < 0 ? "-" : "+";
  let pTerm = firstFactor[1] === 0 ? "" : pNeg + Math.abs(firstFactor[1]);
  let qNeg = secondFactor[1] < 0 ? "-" : "+";
  let qTerm = secondFactor[1] === 0 ? "" : qNeg + Math.abs(secondFactor[1]);
  let rTerm = firstFactor[0] === 1 ? "" : firstFactor[0].toString();
  let sTerm = secondFactor[0] === 1 ? "" : secondFactor[0].toString();
  await typeset(() => {
    let question = document.getElementById("factor-quads-q");
    question.innerHTML = "$$" + aPrint + bPrint + cPrint + "$$";
    return question;
  });
  await typeset(() => {
    let answer = document.getElementById("factor-quads-a");
    answer.innerHTML = "$$" + gTerm + "\\left(" + rTerm + "x" + pTerm + "\\right)\\left(" + sTerm + "x" + qTerm + "\\right)$$";
    return answer;
  });
  document.getElementById("factor-quads-body").style.display = "block";
  document.getElementById("factor-quads-a").style.display = "none";
}

function factorQuadsA() {
  if (document.getElementById("factor-quads-a").style.display === "none") document.getElementById("factor-quads-a").style.display = "block";
  else document.getElementById("factor-quads-a").style.display = "none";
}

function quadForms() {
  if (document.getElementById("quad-forms").style.display === "none") document.getElementById("quad-forms").style.display = "block";
  else document.getElementById("quad-forms").style.display = "none";
}

async function quadFormsQ() {
  let a = Math.floor(Math.random() * 4) + 1;
  let b = Math.floor(Math.random() * 4) + 1;
  let p, q;
  do {
    do {
      p = Math.floor(Math.random() * 31) - 15;
    } while (p === 0);
    do {
      q = Math.floor(Math.random() * 31) - 15;
    } while (q === 0); 
  } while (document.getElementById("quad-start-form").value === "3" ? ((a * q) + (b * p)) % (2 * a * b) !== 0 : false);
  let firstFactor = reduce(a, p);
  if (firstFactor[0] < 0) firstFactor.forEach((e, i) => firstFactor[i] = -e);
  let secondFactor = reduce(b, q);
  if (secondFactor[0] < 0) secondFactor.forEach((e, i) => secondFactor[i] = -e);
  a = firstFactor[0];
  p = firstFactor[1];
  b = secondFactor[0];
  q = secondFactor[1];
  let fTerm = a === 1 ? "x" : a.toString() + "x";  
  let pNeg = p < 0 ? "-" : "+";
  let pTerm = pNeg + Math.abs(p).toString();
  let gTerm = b === 1 ? "x" : b.toString() + "x";
  let qNeg = q < 0 ? "-" : "+";
  let qTerm = qNeg + Math.abs(q).toString();
  let aNeg = a * b < 0 ? "-" : "";
  let aTerm = Math.abs(a * b) === 1 ? aNeg + "x^{2}" : aNeg + Math.abs(a * b).toString() + "x^{2}";
  let bNeg = (a * q) + (b * p) < 0 ? "-" : "+";
  let bTerm = Math.abs((a * q) + (b * p)) === 1 ? bNeg + "x" : bNeg + Math.abs((a * q) + (b * p)).toString() + "x";
  bTerm = (a * q) + (b * p) === 0 ? "" : bTerm;
  let cNeg = p * q < 0 ? "-" : "+";
  let cTerm = cNeg + Math.abs(p * q).toString();
  let vaTerm = Math.abs(a * b) === 1 ? aNeg : aNeg + Math.abs(a * b).toString();
  let hNum = (a * q) + (b * p);
  let hDen = 2 * a * b;
  let h = reduce(hNum, hDen);
  let hNeg = negative(h) ? "-" : "+";
  let hTerm = Math.abs(h[1]) === 1 ? hNeg + Math.abs(h[0]).toString() : hNeg + "\\dfrac{" + Math.abs(h[0]) + "}{" + Math.abs(h[1]) + "}";
  hTerm = h[0] === 0 ? "" : hTerm;
  let kNum = 4 * a * b * p * q - Math.pow((a * q) + (b * p), 2);
  let kDen = 4 * a * b;
  let k = reduce(kNum, kDen);
  let kNeg = negative(k) ? "-" : "+";
  let kTerm = Math.abs(k[1]) === 1 ? kNeg + Math.abs(k[0]).toString() : kNeg + "\\dfrac{" + Math.abs(k[0]) + "}{" + Math.abs(k[1]) + "}";
  kTerm = k[0] === 0 ? "" : kTerm;
  switch (document.getElementById("quad-start-form").value) {
    case "1":
      await typeset(() => {
        let question = document.getElementById("quad-forms-q");
        question.innerHTML = "$$y=" + aTerm + bTerm + cTerm + "$$";
        return question;
      });
      await typeset(() => {
        let answer = document.getElementById("quad-forms-a");
        answer.innerHTML = "$$\\text{Factored: } y=\\left(" + fTerm + pTerm + "\\right)\\left(" + gTerm + qTerm + "\\right)$$ $$\\text{Vertex: } y=" + vaTerm + "\\left(x" + hTerm + "\\right)^{2}" + kTerm + "$$";
        return answer;
      });
      break;
    case "2":
      await typeset(() => {
        let question = document.getElementById("quad-forms-q");
        question.innerHTML = "$$y=\\left(" + fTerm + pTerm + "\\right)\\left(" + gTerm + qTerm + "\\right)$$";
        return question;
      });
      await typeset(() => {
        let answer = document.getElementById("quad-forms-a");
        answer.innerHTML = "$$\\text{Standard: } y=" + aTerm + bTerm + cTerm + "$$ $$\\text{Vertex: } y=" + vaTerm + "\\left(x" + hTerm + "\\right)^{2}" + kTerm + "$$";
      });
      break;
    case "3":
      await typeset(() => {
        let question = document.getElementById("quad-forms-q");
        question.innerHTML = "$$y=" + vaTerm + "\\left(x" + hTerm + "\\right)^{2}" + kTerm + "$$";
        return question;
      });
      await typeset(() => {
        let answer = document.getElementById("quad-forms-a");
        answer.innerHTML = "$$\\text{Standard: } y=" + aTerm + bTerm + cTerm + "$$ $$\\text{Factored: } y=\\left(" + fTerm + pTerm + "\\right)\\left(" + gTerm + qTerm + "\\right)$$";
        return answer;
      });
  }
  document.getElementById("quad-forms-body").style.display = "block";
  document.getElementById("quad-forms-a").style.display = "none";
}

function quadFormsA() {
  if (document.getElementById("quad-forms-a").style.display === "none") document.getElementById("quad-forms-a").style.display = "block";
  else document.getElementById("quad-forms-a").style.display = "none";
}

function transform() {
  if (document.getElementById("transform").style.display === "none") document.getElementById("transform").style.display = "block";
  else document.getElementById("transform").style.display = "none";
}

async function transformQ() {
  let a, b, c, d, e, f, h, k, p, q, r;
  a = Math.floor(Math.random() * 21) - 10;
  b = Math.floor(Math.random() * 21) - 10;
  do {
    c = Math.floor(Math.random() * 21) - 10;
    d = Math.floor(Math.random() * 21) - 10;
  } while (a === c && b === d);
  do {
    e = Math.floor(Math.random() * 21) - 10;
    f = Math.floor(Math.random() * 21) - 10;
  } while ((e === a && e === c) || (f === b && f === d));
  let questionStr = "$$A(" + a + "," + b + ")\\ B(" + c + "," + d + ")\\ C(" + e + "," + f + ")$$";
  let pick = Math.random();
  if (pick < 0.25) {
    do {
      h = Math.floor(Math.random() * 19) - 9;
      k = Math.floor(Math.random() * 19) - 9;
    } while (h === 0 || k === 0);
    let hDir = h > 0 ? "right " : "left ";
    let kDir = k > 0 ? "up " : "down ";
    questionStr = "$$\\text{Translate ABC " + hDir + Math.abs(h) + " units and " + kDir + Math.abs(k) + " units}$$ " + questionStr;
    await typeset(() => {
      let question = document.getElementById("transform-q");
      question.innerHTML = questionStr;
      return question;
    });
    await typeset(() => {
      let answer = document.getElementById("transform-a");
      answer.innerHTML = "$$A'(" + (a + h).toString() + "," + (b + k).toString() + ")\\ B'(" + (c + h).toString() + "," + (d + k).toString() + ")\\ C'(" + (e + h).toString() + "," + (f + k).toString() + ")$$";
      return answer;
    });
  } else if (pick < 0.5) {
    let direction = Math.random();
    r = document.getElementById("reflect").checked ? Math.floor(Math.random() * 13) - 6 : 0;
    let newA, newB, newC, line;
    if (direction < 0.5) {
      line = r === 0 ? "y-axis" : "line x=" + r;
      newA = [2 * r - a, b];
      newB = [2 * r - c, d];
      newC = [2 * r - e, f];
    } else {
      line = r === 0 ? "x-axis" : "line y=" + r;
      newA = [a, 2 * r - b];
      newB = [c, 2 * r - d];
      newC = [e, 2 * r - f];
    }
    questionStr = "$$\\text{Reflect ABC over the " + line + "}$$ " + questionStr;
    await typeset(() => {
      let question = document.getElementById("transform-q");
      question.innerHTML = questionStr;
      return question;
    });
    await typeset(() => {
      let answer = document.getElementById("transform-a");
      answer.innerHTML = "$$A'(" + newA[0] + "," + newA[1] + ")\\ B'(" + newB[0] + "," + newB[1] + ")\\ C'(" + newC[0] + "," + newC[1] + ")$$";
      return answer;
    });
  } else if (pick < 0.75) {
    let direction = Math.random();
    p = document.getElementById("rotate-dilate").checked ? Math.floor(Math.random() * 13) - 6 : 0;
    q = document.getElementById("rotate-dilate").checked ? Math.floor(Math.random() * 13) - 6 : 0;
    let newA, newB, newC, center, point;
    if (p === 0 && q === 0) {
      center = "the origin";
      point = "";
    } else {
      center = "the point ";
      point = "(" + p + "," + q + ")";
    }
    if (direction < 0.33) {
      questionStr = "$$\\text{Rotate ABC 90}^\\circ\\text{ clockwise about " + center + "}" + point + "$$ " + questionStr;
      newA = [p + b - q, q - a + p];
      newB = [p + d - q, q - c + p];
      newC = [p + f - q, q - e + p];
    } else if (direction < 0.67) {
      questionStr = "$$\\text{Rotate ABC 90}^\\circ\\text{ counterclockwise about " + center + "}" + point + "$$ " + questionStr;
      newA = [p - b + q, q + a - p];
      newB = [p - d + q, q + c - p];
      newC = [p - f + q, q + e - p];
    } else {
      questionStr = "$$\\text{Rotate ABC 180}^\\circ\\text{ about " + center + "}" + point + "$$ " + questionStr;
      newA = [2 * p - a, 2 * q - b];
      newB = [2 * p - c, 2 * q - d];
      newC = [2 * p - e, 2 * q - f];
    }
    await typeset(() => {
      let question = document.getElementById("transform-q");
      question.innerHTML = questionStr;
      return question;
    });
    await typeset(() => {
      let answer = document.getElementById("transform-a");
      answer.innerHTML = "$$A'(" + newA[0] + "," + newA[1] + ")\\ B'(" + newB[0] + "," + newB[1] + ")\\ C'(" + newC[0] + "," + newC[1] + ")$$";
      return answer;
    });
  } else {
    p = document.getElementById("rotate-dilate").checked ? Math.floor(Math.random() * 13) - 6 : 0;
    q = document.getElementById("rotate-dilate").checked ? Math.floor(Math.random() * 13) - 6 : 0;
    let scale = [-4, -3, -2, 2, 3, 4];
    k = scale[Math.floor(Math.random() * scale.length)];
    let newA, newB, newC;
    if (p === 0 && q === 0) {
      center = "the origin";
      point = "";
    } else {
      center = "the point ";
      point = "(" + p + "," + q + ")";
    }
    if (k < 0) {
      k = Math.abs(k);
      questionStr = "$$\\text{Dilate ABC by a scale factor of }\\dfrac{1}{" + k + "}\\text{ centered at " + center + "}" + point + "$$ " + questionStr;
      function makeStrings(array) {
        let newArr = [];
        array.forEach(e => {
          if (e[1] === 1) newArr.push(e[0].toString());
          else {
            let sign = e[0] < 0 || e[1] < 0 ? "-" : "";
            newArr.push(sign + "\\dfrac{" + Math.abs(e[0]) + "}{" + Math.abs(e[1]) + "}");
          }
        });
        return newArr;
      }
      newA = makeStrings([reduce(k * p + a - p, k), reduce(k * q + b - q, k)]);
      newB = makeStrings([reduce(k * p + c - p, k), reduce(k * q + d - q, k)]);
      newC = makeStrings([reduce(k * p + e - p, k), reduce(k * q + f - q, k)]);
    } else {
      questionStr = "$$\\text{Dilate ABC by a scale factor of " + k.toString() + " centered at " + center + "}" + point + "$$ " + questionStr;
      newA = [(p + (k * a) - (k * p)).toString(), (q + (k * b) - (k * q)).toString()];
      newB = [(p + (k * c) - (k * p)).toString(), (q + (k * d) - (k * q)).toString()];
      newC = [(p + (k * e) - (k * p)).toString(), (q + (k * f) - (k * q)).toString()];
    }
    await typeset(() => {
      let question = document.getElementById("transform-q");
      question.innerHTML = questionStr;
      return question;
    });
    await typeset(() => {
      let answer = document.getElementById("transform-a");
      answer.innerHTML = "$$A'\\left(" + newA[0] + "," + newA[1] + "\\right)\\ B'\\left(" + newB[0] + "," + newB[1] + "\\right)\\ C'\\left(" + newC[0] + "," + newC[1] + "\\right)$$";
      return answer;
    });
  }
  document.getElementById("transform-body").style.display = "block";
  document.getElementById("transform-a").style.display = "none";
}

function transformA() {
  if (document.getElementById("transform-a").style.display === "none") document.getElementById("transform-a").style.display = "block";
  else document.getElementById("transform-a").style.display = "none";
}