import http.server
import socketserver
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import urllib.parse
import threading

PORT = 5005

# IMPORTANT: To send real emails, update these details with your real email and app password.
# If these are left blank, the server will fall back to securely printing the OTP in this console!
SENDER_EMAIL = "" 
SENDER_APP_PASSWORD = ""

class AuthAPIHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/send-otp':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            target_email = data.get('email', '')
            
            if not target_email:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error": "Email required"}')
                return

            # Generate real time 6-digit OTP
            otp = str(random.randint(100000, 999999))
            
            # Send Email Logic
            email_sent = False
            if SENDER_EMAIL and SENDER_APP_PASSWORD:
                try:
                    msg = MIMEMultipart()
                    msg['From'] = SENDER_EMAIL
                    msg['To'] = target_email
                    msg['Subject'] = "Site Seeking - Your Secure OTP"
                    body = f"Hello!\n\nYour security OTP for Site Seeking is: {otp}\n\nPlease do not share this with anyone."
                    msg.attach(MIMEText(body, 'plain'))

                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.starttls()
                    server.login(SENDER_EMAIL, SENDER_APP_PASSWORD)
                    server.send_message(msg)
                    server.quit()
                    email_sent = True
                    print(f"[SUCCESS] Real Email Sent to {target_email}!")
                except Exception as e:
                    print(f"[ERROR] Failed to send email via SMTP: {e}")
                    email_sent = False
            else:
                print("===================================================")
                print(f"[MOCK EMAIL INTERCEPTED]")
                print(f"To: {target_email}")
                print(f"OTP CODE: {otp}")
                print("Note: To send real emails, update SENDER_EMAIL in backend_server.py")
                print("===================================================")
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True, 
                "otp": otp, 
                "method": "email" if email_sent else "console"
            }).encode('utf-8'))

class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

with ThreadedHTTPServer(("", PORT), AuthAPIHandler) as httpd:
    print(f"Auth Backend API Server running on port {PORT}")
    print("Waiting for login/registration requests from the Frontend...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
