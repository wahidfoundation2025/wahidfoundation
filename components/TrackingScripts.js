"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PAYMENT_EVENT = "wf:payment-success";

const has = (id) =>
  typeof document !== "undefined" &&
  document.querySelector(`[data-track-id="${id}"]`);

function addScript({ id, src, code, parent, prepend, async: isAsync }) {
  if (has(id)) return;
  const el = document.createElement("script");
  el.setAttribute("data-track-id", id);
  if (src) {
    el.src = src;
    el.async = isAsync !== false;
  }
  if (code) el.textContent = code;
  const target = parent || document.head;
  if (prepend && target.firstChild) target.insertBefore(el, target.firstChild);
  else target.appendChild(el);
}

// Inject a custom script honouring placement + load strategy. `id` controls
// de-duplication (per-page or per-event).
function runCustom(sc, id) {
  const parent = sc.placement === "head" ? document.head : document.body;
  const prepend = sc.placement === "body-start";
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
  if (sc.strategy === "lazyOnload") {
    if (document.readyState === "complete") inject();
    else window.addEventListener("load", inject, { once: true });
  } else inject();
}

// Does this script target the current path?
function matchesPath(sc, pathname) {
  if ((sc.pageScope || "all") === "all") return true;
  const paths = (sc.pages || []).filter((p) => p && !p.startsWith("@"));
  return paths.some(
    (pg) => pg === pathname || (pg !== "/" && pathname.startsWith(pg))
  );
}

function injectAnalytics(cfg) {
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
}

export default function TrackingScripts() {
  const pathname = usePathname();
  const [cfg, setCfg] = useState(null);

  // Fetch the config once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracking`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setCfg(data);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Analytics (once) + path-targeted custom scripts (re-checked per navigation).
  useEffect(() => {
    if (!cfg) return;
    injectAnalytics(cfg);
    (cfg.customScripts || [])
      .filter((sc) => sc && sc.enabled)
      .forEach((sc, idx) => {
        if (!matchesPath(sc, pathname)) return;
        const id =
          (sc.pageScope || "all") === "all"
            ? `custom-${idx}`
            : `custom-${idx}@${pathname}`;
        runCustom(sc, id);
      });
  }, [cfg, pathname]);

  // Payment-confirmation (Thank-You popup) event target.
  useEffect(() => {
    if (!cfg) return;
    const handler = (e) => {
      // Expose donation details for conversion scripts to read.
      window.wfLastDonation = (e && e.detail) || {};
      (cfg.customScripts || [])
        .filter((sc) => sc && sc.enabled)
        .forEach((sc, idx) => {
          if ((sc.pages || []).includes("@payment-success")) {
            runCustom(sc, `custom-${idx}@evt-${Date.now()}`);
          }
        });
    };
    window.addEventListener(PAYMENT_EVENT, handler);
    return () => window.removeEventListener(PAYMENT_EVENT, handler);
  }, [cfg]);

  return null;
}
