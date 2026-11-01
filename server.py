#!/usr/bin/env python3
"""Local server for the Menschen reader.

Serves the A1/ folder and forwards answer-check / tutor requests to Gemini,
so the API key stays on this computer (read from .env, never sent to the page).

    python3 server.py [port]
"""
import json
import os
import ssl
import sys
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.join(ROOT, "A1")


def load_env():
    path = os.path.join(ROOT, ".env")
    if os.path.exists(path):
        for line in open(path, encoding="utf-8"):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env()
KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.1-flash-lite")
API = "https://generativelanguage.googleapis.com/v1beta/models/{}:generateContent"
MAX_BODY = 25 * 1024 * 1024  # page images are sent inline


def tls_context():
    # python.org builds on macOS ship without CA certificates; fall back to certifi or the system bundle.
    ctx = ssl.create_default_context()
    if ctx.get_ca_certs():
        return ctx
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        pass
    for path in ("/etc/ssl/cert.pem", "/etc/ssl/certs/ca-certificates.crt"):
        if os.path.exists(path):
            return ssl.create_default_context(cafile=path)
    return ctx


TLS = tls_context()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=WEB, **kw)

    def log_message(self, fmt, *args):
        if "/api/" in (self.path or ""):
            super().log_message(fmt, *args)

    def send_json(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/api/status":
            return self.send_json(200, {"ai": bool(KEY), "model": MODEL})
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/gemini":
            return self.send_json(404, {"error": "not found"})
        # Only the page itself may use the proxy (blocks other websites from spending the key)
        origin = self.headers.get("Origin", "")
        if origin and not origin.startswith(("http://localhost:", "http://127.0.0.1:")):
            return self.send_json(403, {"error": "forbidden"})
        if not KEY:
            return self.send_json(503, {"error": "GEMINI_API_KEY fehlt in .env"})
        n = int(self.headers.get("Content-Length") or 0)
        if n <= 0 or n > MAX_BODY:
            return self.send_json(413, {"error": "request too large"})
        try:
            req = json.loads(self.rfile.read(n))
        except ValueError:
            return self.send_json(400, {"error": "bad json"})
        payload = {"contents": req.get("contents", [])}
        if req.get("system"):
            payload["systemInstruction"] = {"parts": [{"text": req["system"]}]}
        cfg = {"temperature": 0.2}
        if req.get("json"):
            cfg["responseMimeType"] = "application/json"
        payload["generationConfig"] = cfg
        r = urllib.request.Request(
            API.format(MODEL),
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json", "x-goog-api-key": KEY},
        )
        try:
            with urllib.request.urlopen(r, timeout=120, context=TLS) as resp:
                data = json.load(resp)
        except urllib.error.HTTPError as e:
            try:
                msg = json.load(e).get("error", {}).get("message", str(e))
            except ValueError:
                msg = str(e)
            return self.send_json(502, {"error": msg})
        except Exception as e:  # network down, timeout
            return self.send_json(502, {"error": str(e)})
        parts = (data.get("candidates") or [{}])[0].get("content", {}).get("parts", [])
        text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
        self.send_json(200, {"text": text, "usage": data.get("usageMetadata", {})})


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8001
    print(f"Menschen Reader: http://localhost:{port}/reader.html  (KI: {MODEL if KEY else 'aus – kein GEMINI_API_KEY'})")
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
