function typeset(code) {
  MathJax.typesetClear(); //temp solution
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
  switch (document.getElementById("eq-lines-type").value) {
    case "1":
      let p, q;
      let a = Math.floor(Math.random() * 21) - 10;
      let b = Math.floor(Math.random() * 21) - 10;
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
      let e = Math.floor(Math.random() * 21) - 10;
      let f = Math.floor(Math.random() * 21) - 10;
      do {
        c = Math.floor(Math.random() * 21) - 10;
      } while (c === e);
      do {
        d = Math.floor(Math.random() * 21) - 10;
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
      let g, h;
      let i = Math.floor(Math.random() * 201) - 100;
      let j = Math.floor(Math.random() * 21) - 10;
      let k = Math.floor(Math.random() * 21) - 10;
      do {
        g = Math.floor(Math.random() * 31) - 15;
      } while (g === 0);
      do {
        h = Math.floor(Math.random() * 31) - 15;
      } while (h === 0);
      let slope3, int3;
      slope3 = reduce(h, g);
      if (slope3[0] > 0) {
        slope3[0] = -slope3[0];
        slope3[1] = -slope3[1];
      }
      int3 = reduce((k * g) + (j * h), g);
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
        answer.innerHTML = "$$\\text{Slope-Intercept: } y=" + slope3Print + "x" + int3Print + "$$ $$\\text{Standard: } " + xterm3Neg + xterm3Print + "x" + yterm3Neg + yterm3Print + "y=" + ((k * slope3[1]) + (j * slope3[0])).toString() + "$$";
        return answer;
      });
      document.getElementById("eq-lines-body").style.display = "block";
      document.getElementById("eq-lines-a").style.display = "none";
      break;
    case "4":
      let l, m;
      let n = Math.floor(Math.random() * 201) - 100;
      let o = Math.floor(Math.random() * 21) - 10;
      let r = Math.floor(Math.random() * 21) - 10;
      do {
        l = Math.floor(Math.random() * 31) - 15;
      } while (l === 0);
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