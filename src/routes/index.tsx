import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      },
    ],
    meta: [
      { title: "Qizlar bazmi — Taklifnoma" },
      { name: "description", content: "Qizlar bazmi taklifnomasi — 24 iyun 2026, soat 19:00." },
      { property: "og:title", content: "Qizlar bazmi — Taklifnoma" },
      { property: "og:description", content: "Qizlar bazmi taklifnomasi — 24 iyun 2026, soat 19:00." },
    ],
  }),
  component: Index,
});

const CSS = `
  .inv{
    --gold:#C9A96E;--gold-deep:#a8884f;--ivory:#FEFCF8;--rose:#D4667A;--ink:#4a4036;
    --shadow:0 18px 50px -18px rgba(120,95,55,.45);
    font-family:'Montserrat',sans-serif;
    background:radial-gradient(circle at 20% 10%, #fff7ec 0%, transparent 45%),radial-gradient(circle at 80% 90%, #fdeef0 0%, transparent 45%),var(--ivory);
    color:var(--ink);min-height:100vh;overflow-x:hidden;position:relative;
  }
  .inv *{margin:0;padding:0;box-sizing:border-box}
  .inv .wrap{max-width:500px;margin:0 auto;position:relative;min-height:100vh}
  .inv .petals{position:fixed;inset:0;pointer-events:none;z-index:5;overflow:hidden}
  .inv .petal{position:absolute;top:-40px;font-size:18px;color:var(--rose);opacity:.75;animation:fall linear infinite}
  @keyframes fall{0%{transform:translateY(-40px) rotate(0deg);opacity:0}10%{opacity:.8}100%{transform:translateY(105vh) rotate(360deg);opacity:.2}}
  .inv .lang{position:fixed;top:14px;right:14px;z-index:30;display:flex;gap:6px;background:rgba(255,255,255,.7);backdrop-filter:blur(8px);padding:5px;border-radius:30px;box-shadow:var(--shadow)}
  .inv .lang button{border:none;background:transparent;font-family:'Montserrat';font-weight:600;font-size:13px;color:var(--gold-deep);padding:7px 14px;border-radius:24px;cursor:pointer;transition:.3s}
  .inv .lang button.active{background:var(--gold);color:#fff}
  .inv .hero{position:fixed;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 40%, #fff7ec, #f6e9d4);transition:opacity .8s ease, visibility .8s}
  .inv .hero.gone{opacity:0;visibility:hidden}
  .inv .env-stage{text-align:center;padding:20px}
  .inv .tap-hint{margin-top:26px;color:var(--gold-deep);font-size:13px;letter-spacing:2px;text-transform:uppercase;animation:pulseHint 2s infinite}
  @keyframes pulseHint{0%,100%{opacity:.5}50%{opacity:1}}
  .inv .envelope{position:relative;width:280px;height:188px;margin:0 auto;cursor:pointer;filter:drop-shadow(0 22px 30px rgba(150,120,70,.4));transition:transform .5s}
  .inv .envelope:hover{transform:translateY(-4px)}
  .inv .env-body{position:absolute;inset:0;background:linear-gradient(135deg,#f3e3c6,#e7d0a6);border-radius:10px;overflow:hidden}
  .inv .env-pocket{position:absolute;bottom:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#eedcb9,#dcc090);clip-path:polygon(0 35%,50% 100%,100% 35%,100% 100%,0 100%);z-index:3}
  .inv .env-letter{position:absolute;left:8%;width:84%;top:14%;height:74%;background:#fff;border-radius:6px;box-shadow:0 6px 14px rgba(0,0,0,.12);z-index:2;display:flex;align-items:center;justify-content:center;transition:transform 1s cubic-bezier(.2,.8,.2,1)}
  .inv .env-letter i{color:var(--rose);font-size:30px}
  .inv .env-flap{position:absolute;top:0;left:0;width:100%;height:60%;background:linear-gradient(135deg,#e7d0a6,#d4b87f);clip-path:polygon(0 0,100% 0,50% 100%);z-index:4;transform-origin:top;transition:transform .9s ease;border-radius:10px 10px 0 0}
  .inv .env-seal{position:absolute;top:42%;left:50%;transform:translate(-50%,-50%);z-index:6;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--rose),#b34e60);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 6px 14px rgba(0,0,0,.25);transition:.5s}
  .inv .env-seal i{font-size:18px}
  .inv .envelope.open .env-flap{transform:rotateX(180deg);z-index:1}
  .inv .envelope.open .env-seal{opacity:0;transform:translate(-50%,-50%) scale(.4)}
  .inv .envelope.open .env-letter{transform:translateY(-130px) scale(1.05)}
  .inv .hero-title{font-family:'Playfair Display';font-size:30px;color:var(--gold-deep);margin-bottom:6px;font-style:italic}
  .inv .hero-sub{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:var(--rose);margin-bottom:34px}
  .inv .content{padding:60px 22px 140px;opacity:0;transition:opacity 1s ease .2s}
  .inv .content.show{opacity:1}
  .inv .reveal{opacity:0;transform:translateY(28px);transition:opacity .9s ease, transform .9s ease}
  .inv .reveal.in{opacity:1;transform:none}
  .inv .floral{text-align:center;color:var(--gold);font-size:24px;letter-spacing:8px;margin:10px 0}
  .inv .card{background:#fff;border-radius:22px;padding:38px 26px;box-shadow:var(--shadow);border:1px solid #f0e4cf;position:relative;overflow:hidden}
  .inv .card::before,.inv .card::after{content:"\\f06c";font-family:"Font Awesome 6 Free";font-weight:900;position:absolute;color:rgba(201,169,110,.18);font-size:60px}
  .inv .card::before{top:-10px;left:-6px;transform:rotate(-25deg)}
  .inv .card::after{bottom:-12px;right:-6px;transform:rotate(150deg)}
  .inv .eyebrow{text-align:center;letter-spacing:5px;text-transform:uppercase;font-size:11px;color:var(--rose);margin-bottom:10px}
  .inv .title{font-family:'Playfair Display';text-align:center;font-size:40px;color:var(--gold-deep);line-height:1.1;font-weight:700}
  .inv .title small{display:block;font-size:16px;font-style:italic;color:var(--rose);margin-top:6px;font-weight:400}
  .inv .divider{width:60px;height:2px;background:var(--gold);margin:20px auto;position:relative}
  .inv .divider::before{content:"\\f004";font-family:"Font Awesome 6 Free";font-weight:900;color:var(--rose);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:0 8px;font-size:11px}
  .inv .greeting{font-family:'Playfair Display';font-size:21px;color:var(--gold-deep);text-align:center;margin-bottom:16px}
  .inv .body-text{font-size:15px;line-height:1.7;text-align:center;color:var(--ink);margin-bottom:16px}
  .inv .names{font-family:'Playfair Display';font-style:italic;color:var(--rose);font-weight:600}
  .inv .meta{margin:22px 0;display:flex;flex-direction:column;gap:14px}
  .inv .meta-item{display:flex;align-items:center;gap:14px;justify-content:center;text-align:left}
  .inv .meta-item i{color:var(--gold);font-size:18px;width:26px;text-align:center}
  .inv .meta-item span{font-size:14px;line-height:1.4}
  .inv .meta-item b{display:block;font-family:'Playfair Display';color:var(--gold-deep);font-size:16px}
  .inv .signoff{margin-top:24px;text-align:center;font-size:14px;line-height:1.7}
  .inv .signoff .sig-lead{color:var(--rose);font-style:italic;margin-bottom:6px;font-family:'Playfair Display';font-size:16px}
  .inv .signoff .fam{font-weight:600;color:var(--gold-deep)}
  .inv .count-wrap{margin:30px 0 10px;text-align:center}
  .inv .count-label{letter-spacing:4px;text-transform:uppercase;font-size:11px;color:var(--rose);margin-bottom:14px}
  .inv .count{display:flex;justify-content:center;gap:10px}
  .inv .cbox{background:linear-gradient(160deg,#fff,#fbf2e0);border:1px solid #f0e4cf;border-radius:14px;padding:14px 6px;min-width:66px;box-shadow:var(--shadow)}
  .inv .cbox .num{font-family:'Playfair Display';font-size:30px;font-weight:700;color:var(--gold-deep);line-height:1}
  .inv .cbox .lab{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--rose);margin-top:6px}
  .inv .loc-btn{display:flex;align-items:center;justify-content:center;gap:10px;margin:28px auto 0;width:100%;padding:17px;border-radius:50px;border:none;cursor:pointer;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#fff;font-family:'Montserrat';font-weight:600;font-size:15px;letter-spacing:.5px;text-decoration:none;box-shadow:0 14px 30px -8px rgba(168,136,79,.6);transition:transform .25s}
  .inv .loc-btn:active{transform:scale(.97)}
  .inv .footer{text-align:center;margin-top:30px;color:var(--gold-deep);font-family:'Playfair Display';font-style:italic;font-size:15px}
  .inv .music{position:fixed;bottom:22px;right:18px;z-index:30;width:58px;height:58px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#fff;font-size:20px;box-shadow:0 12px 28px -6px rgba(168,136,79,.7);display:flex;align-items:center;justify-content:center;transition:transform .25s}
  .inv .music:active{transform:scale(.92)}
  .inv .music.pulse{animation:musicPulse 1.4s infinite}
  @keyframes musicPulse{0%{box-shadow:0 0 0 0 rgba(212,102,122,.6)}70%{box-shadow:0 0 0 18px rgba(212,102,122,0)}100%{box-shadow:0 0 0 0 rgba(212,102,122,0)}}
  .inv .yt-hidden{position:fixed;width:1px;height:1px;left:-100px;top:-100px;opacity:0;pointer-events:none}
`;

const BODY = `
<div class="petals" id="petals"></div>
<div class="lang">
  <button id="btn-uz" class="active" onclick="invSetLang('uz')">UZ</button>
  <button id="btn-ru" onclick="invSetLang('ru')">RU</button>
</div>
<div class="hero" id="hero">
  <div class="env-stage">
    <div class="hero-title" data-uz="Taklifnoma" data-ru="Приглашение">Taklifnoma</div>
    <div class="hero-sub">Qizlar bazmi</div>
    <div class="envelope" id="envelope" onclick="invOpenEnvelope()">
      <div class="env-body"></div>
      <div class="env-pocket"></div>
      <div class="env-letter"><i class="fa-solid fa-heart"></i></div>
      <div class="env-flap"></div>
      <div class="env-seal"><i class="fa-solid fa-feather"></i></div>
    </div>
    <div class="tap-hint" data-uz="Ochish uchun bosing" data-ru="Нажмите, чтобы открыть">Ochish uchun bosing</div>
  </div>
</div>
<div class="wrap">
  <div class="content" id="content">
    <div class="floral">&#10070; &#10047; &#10070;</div>
    <div class="card">
      <div class="reveal">
        <div class="eyebrow" data-uz="Sizni taklif etamiz" data-ru="Приглашаем вас">Sizni taklif etamiz</div>
        <h1 class="title">Qizlar bazmi
          <small data-uz="Durdonaxon &amp; Toxirbek" data-ru="Дурдонахон &amp; Тохирбек">Durdonaxon &amp; Toxirbek</small>
        </h1>
        <div class="divider"></div>
      </div>
      <div class="reveal">
        <p class="greeting" data-uz="Hurmatli aziz mehmonimiz!" data-ru="Дорогие гости!">Hurmatli aziz mehmonimiz!</p>
        <p class="body-text"
           data-uz='Sizni farzandlarimiz <span class="names">Durdonaxon</span> va <span class="names">Toxirbek</span>larning nikoh to&lsquo;ylariga bag&lsquo;ishlangan "Qizlar bazmi"ga taklif etamiz!'
           data-ru='Приглашаем вас на девичник по случаю бракосочетания <span class="names">Дурдонахон</span> и <span class="names">Тохирбека</span>.'>
        </p>
      </div>
      <div class="reveal">
        <div class="meta">
          <div class="meta-item"><i class="fa-regular fa-calendar"></i><span><b data-uz="24 iyun, 2026" data-ru="24 июня 2026">24 iyun, 2026</b><span data-uz="soat 19:00" data-ru="в 19:00">soat 19:00</span></span></div>
          <div class="meta-item"><i class="fa-solid fa-location-dot"></i><span data-uz='Guliston shahar, 3-mavze,<br>"REGISTON" to&lsquo;yxonasi' data-ru='г. Гулистан, 3-й микрорайон,<br>ресторан «Регистон»'></span></div>
        </div>
      </div>
      <div class="reveal">
        <div class="count-wrap">
          <div class="count-label" data-uz="Bayramgacha" data-ru="До праздника осталось">Bayramgacha</div>
          <div class="count" id="count">
            <div class="cbox"><div class="num" id="d">00</div><div class="lab" data-uz="kun" data-ru="дней">kun</div></div>
            <div class="cbox"><div class="num" id="h">00</div><div class="lab" data-uz="soat" data-ru="час">soat</div></div>
            <div class="cbox"><div class="num" id="m">00</div><div class="lab" data-uz="daq" data-ru="мин">daq</div></div>
            <div class="cbox"><div class="num" id="s">00</div><div class="lab" data-uz="son" data-ru="сек">son</div></div>
          </div>
        </div>
      </div>
      <div class="reveal">
        <div class="signoff">
          <div class="sig-lead" data-uz="Hurmat bilan:" data-ru="С уважением:">Hurmat bilan:</div>
          <div class="fam" data-uz="Islomiddin hoji ota o&lsquo;g&lsquo;li<br>Ulug&lsquo;bek Boybo&lsquo;taevlar oilasi" data-ru="семья Улугбека Бойбутаева"></div>
        </div>
      </div>
      <div class="reveal">
        <a class="loc-btn" href="https://maps.app.goo.gl/8BF4jedmBra9m6Nz9" target="_blank" rel="noopener">
          <i class="fa-solid fa-location-dot"></i>
          <span data-uz="Lokatsiyani ochish" data-ru="Открыть локацию">Lokatsiyani ochish</span>
        </a>
      </div>
    </div>
    <div class="floral">&#10070; &#10047; &#10070;</div>
    <div class="footer" data-uz="Sizni kutib qolamiz" data-ru="Будем рады видеть вас">Sizni kutib qolamiz</div>
  </div>
</div>
<button class="music pulse" id="music" onclick="invToggleMusic()"><i class="fa-solid fa-music"></i></button>
<div class="yt-hidden">
  <iframe id="yt" title="music" width="200" height="120" src="about:blank" allow="autoplay; encrypted-media" frameBorder="0"></iframe>
</div>
`;

function Index() {
  useEffect(() => {
    const root = document.getElementById("inv-root");
    if (!root) return;
    const q = (s: string) => root.querySelector(s) as HTMLElement | null;
    const pad = (n: number) => (n < 10 ? "0" + n : "" + n);

    (window as any).invSetLang = (l: string) => {
      const uz = q("#btn-uz");
      const ru = q("#btn-ru");
      uz?.classList.toggle("active", l === "uz");
      ru?.classList.toggle("active", l === "ru");
      root.querySelectorAll("[data-" + l + "]").forEach((el) => {
        el.innerHTML = (el as HTMLElement).getAttribute("data-" + l) || "";
      });
    };

    // petals
    const glyphs = ["&#10047;", "&#10043;", "&#9826;", "&#10070;"];
    const c = q("#petals");
    if (c) {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement("div");
        p.className = "petal";
        p.innerHTML = glyphs[i % glyphs.length];
        p.style.left = Math.random() * 100 + "%";
        p.style.fontSize = 12 + Math.random() * 16 + "px";
        p.style.animationDuration = 7 + Math.random() * 9 + "s";
        p.style.animationDelay = -Math.random() * 10 + "s";
        p.style.color = Math.random() > 0.5 ? "#D4667A" : "#C9A96E";
        c.appendChild(p);
      }
    }

    const YT_SRC =
      "https://www.youtube.com/embed/_MWEapW4PaE?autoplay=1&loop=1&playlist=_MWEapW4PaE&controls=0";
    let playing = false;
    const updateMusicBtn = () => {
      const b = q("#music");
      if (!b) return;
      b.innerHTML = playing
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
      b.classList.toggle("pulse", !playing);
    };
    const startMusic = () => {
      const f = q("#yt") as HTMLIFrameElement | null;
      if (f && f.src.indexOf("youtube") === -1) f.src = YT_SRC;
      playing = true;
      updateMusicBtn();
    };
    (window as any).invToggleMusic = () => {
      const f = q("#yt") as HTMLIFrameElement | null;
      if (!f) return;
      if (!playing) {
        f.src = YT_SRC;
        playing = true;
      } else {
        f.src = "about:blank";
        playing = false;
      }
      updateMusicBtn();
    };

    const runReveal = () => {
      const els = root.querySelectorAll(".reveal");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      els.forEach((el) => io.observe(el));
    };

    let opened = false;
    (window as any).invOpenEnvelope = () => {
      if (opened) return;
      opened = true;
      q("#envelope")?.classList.add("open");
      startMusic();
      setTimeout(() => {
        q("#hero")?.classList.add("gone");
        q("#content")?.classList.add("show");
        runReveal();
      }, 1100);
    };

    const target = new Date("2026-06-24T19:00:00+05:00").getTime();
    const tick = () => {
      let diff = target - Date.now();
      if (diff < 0) diff = 0;
      const setT = (id: string, v: number) => {
        const el = q(id);
        if (el) el.textContent = pad(v);
      };
      setT("#d", Math.floor(diff / 86400000));
      setT("#h", Math.floor((diff % 86400000) / 3600000));
      setT("#m", Math.floor((diff % 3600000) / 60000));
      setT("#s", Math.floor((diff % 60000) / 1000));
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    updateMusicBtn();

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inv" id="inv-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
    </div>
  );
}
