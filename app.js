const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

// 設定伺服器運行的 port
const port = 4000;

// 創建伺服器
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // 讀取並回應 index.html
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('伺服器錯誤');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        // 處理表單提交，確保處理 UTF-8 編碼
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString('utf-8');  // 確保使用 utf-8 解碼
        });
        req.on('end', () => {
            const postData = querystring.parse(body);
            const inputText = postData.inputText || '無輸入';

            // 回應一個簡單的 HTML 顯示輸入的文字，並設置編碼為 UTF-8
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <h1>你輸入的文字是：</h1>
                <div id="output">${inputText}</div>
            `);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 找不到頁面');
    }
});

// 讓伺服器在指定的 port 上運行
server.listen(port, () => {
    console.log(`伺服器運行在 http://localhost:${port}`);
});
