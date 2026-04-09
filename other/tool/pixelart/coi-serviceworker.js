/*! coi-serviceworker v0.1.7 | MIT License | https://github.com/gzuidhof/coi-serviceworker */
if (typeof window === "undefined") {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.onfetch = (event) => {
        if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
            return;
        }

        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response.status === 0) {
                        return response;
                    }

                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                })
                .catch((e) => console.error(e))
        );
    };
} else {
    const scriptUrl = document.currentScript ? document.currentScript.src : new URL("coi-serviceworker.js", window.location.href).href;
    if (window.crossOriginIsolated === false && "serviceWorker" in navigator) {
        navigator.serviceWorker.register(scriptUrl).then((registration) => {
            registration.addEventListener("updatefound", () => {
                window.location.reload();
            });
            if (registration.active && !navigator.serviceWorker.controller) {
                window.location.reload();
            }
        });
    }
}
