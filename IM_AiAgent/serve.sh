#!/usr/bin/env python3
"""dev server: send no-cache headers, 避免 JS 缓存导致点击失效"""
import http.server
import socketserver

PORT = 8788

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"serving with no-cache at http://localhost:{PORT}/index.html")
        httpd.serve_forever()
