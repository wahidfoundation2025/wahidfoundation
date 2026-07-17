"use client";

import { useEffect } from "react";

// Injects tracking config (GA4 / GTM / Meta Pixel) and admin-defined custom
// scripts into the document, honouring placement, type and load strategy.
// Everything is guarded by a data-track-id so nothing is injected twice.
export default function TrackingScripts() {
  useEffect(() => {
    let cancelled = false;

    const has = (id) => document.querySelector(`[data-track-id="${id}"]`);

    const addScript = ({ id, src, code, parent, prepend, async: isAsync }) => {
      if (has(id)) return;
      const s = document.createElement("script");
      s.setAttribute("data-track-id", id);
      if (src) {
        s.src = src;
        s.async = isAsync !== false;
      }
      if (code) s.textContent = code;
      const target = parent || document.head;
      if (prepend && target.firstChild)
        target.insertBefore(s, target.firstChild);
      else target.appendChild(s);
    };

    const run = (fn, strategy) => {
      if (strategy === "lazyOnload") {
        if (document.readyState === "complete") fn();
        else window.addEventListener("load", fn, { once: true });
      } else {
        fn(); // afterInteractive / beforeInteractive -> inject now
      }
    };

    async function setup() {
      let cfg;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tracking`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        cfg = await res.json();
      } catch {
        return;
      }
      if (cancelled || !cfg) return;

      // ---- Google Analytics 4 ----
      if (cfg.ga4Id) {
        addScript({
          id: "ga4-lib",
          src: `https://www.googletagmanager.com/gtag/js?id=${cfg.ga4Id}`,
        });
        addScript({
          id: "ga4-init",
          code: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${cfg.ga4Id}');`,
        });
      }

      // ---- Google Tag Manager ----
      if (cfg.gtmId) {
        addScript({
          id: "gtm",
          code: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${cfg.gtmId}');`,
        });
        if (!has("gtm-ns")) {
          const ns = document.createElement("noscript");
          ns.setAttribute("data-track-id", "gtm-ns");
          ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${cfg.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
          document.body.insertBefore(ns, document.body.firstChild);
        }
      }

      // ---- Meta (Facebook) Pixel ----
      if (cfg.metaPixelId) {
        addScript({
          id: "meta-pixel",
          code: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.metaPixelId}');fbq('track','PageView');`,
        });
        if (!has("meta-pixel-ns")) {
          const ns = document.createElement("noscript");
          ns.setAttribute("data-track-id", "meta-pixel-ns");
          ns.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${cfg.metaPixelId}&ev=PageView&noscript=1"/>`;
          document.body.appendChild(ns);
        }
      }

      // ---- Custom scripts ----
      (cfg.customScripts || [])
        .filter((sc) => sc && sc.enabled)
        .forEach((sc, idx) => {
          const parent =
            sc.placement === "head" ? document.head : document.body;
          const prepend = sc.placement === "body-start";
          const id = `custom-${idx}`;
          const inject = () => {
            if (sc.type === "external") {
              if (!sc.src) return;
              addScript({
                id,
                src: sc.src,
                parent,
                prepend,
                async: sc.strategy !== "beforeInteractive",
              });
            } else {
              if (!sc.code) return;
              addScript({ id, code: sc.code, parent, prepend });
            }
          };
          run(inject, sc.strategy);
        });
    }

    setup();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
