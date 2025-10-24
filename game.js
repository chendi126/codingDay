// 1024程序员节 Meta编程游戏
class ProgrammerGame {
    constructor() {
        this.board = [];
        this.score = 0;
        this.size = 4;
        this.gameWon = false;
        this.console = document.getElementById('console');
        this.scoreElement = document.getElementById('score');
        this.puzzleArea = document.getElementById('puzzleArea');
        this.codeInput = document.getElementById('codeInput');
        this.runButton = document.getElementById('runButton');
        
        this.init();
        this.setupEventListeners();
        this.createFloatingCode();
    }
    
    init() {
        // 初始化游戏板
        this.board = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.addRandomTile();
        this.addRandomTile();
        this.renderBoard();
        this.log('🎮 游戏开始！目标：合并数字达到1024！');
        this.log('💡 可以使用代码编辑器编写JavaScript代码来控制游戏');
    }
    
    setupEventListeners() {
        // 运行代码按钮
        this.runButton.addEventListener('click', () => {
            this.executeUserCode();
        });
        
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (this.gameWon) return;
            
            switch(e.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    this.move('up');
                    break;
                case 's':
                case 'arrowdown':
                    this.move('down');
                    break;
                case 'a':
                case 'arrowleft':
                    this.move('left');
                    break;
                case 'd':
                case 'arrowright':
                    this.move('right');
                    break;
            }
        });
    }
    
    createFloatingCode() {
        // 创建飘动的代码片段
        const codeSnippets = [
            'function() { return 1024; }',
            'while(true) { code(); }',
            'if (bug) { debug(); }',
            'console.log("Hello World");',
            'git commit -m "1024"',
            'npm install happiness',
            'const programmer = true;',
            '// Happy 1024 Day!',
            'for(i=0; i<1024; i++) {}',
            'try { succeed(); } catch(e) {}'
        ];
        
        setInterval(() => {
            const floatingCode = document.createElement('div');
            floatingCode.className = 'floating-code';
            floatingCode.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            floatingCode.style.left = Math.random() * window.innerWidth + 'px';
            floatingCode.style.animationDuration = (Math.random() * 5 + 5) + 's';
            
            document.body.appendChild(floatingCode);
            
            setTimeout(() => {
                if (floatingCode.parentNode) {
                    floatingCode.parentNode.removeChild(floatingCode);
                }
            }, 10000);
        }, 2000);
    }
    
    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    renderBoard() {
        this.puzzleArea.innerHTML = '';
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const tile = document.createElement('div');
                tile.className = 'puzzle-tile';
                tile.textContent = this.board[i][j] === 0 ? '' : this.board[i][j];
                
                // 根据数字大小设置不同的颜色
                if (this.board[i][j] !== 0) {
                    const value = this.board[i][j];
                    const logValue = Math.log2(value);
                    const hue = (logValue * 30) % 360;
                    tile.style.background = `linear-gradient(45deg, hsl(${hue}, 70%, 40%), hsl(${hue}, 70%, 60%))`;
                    
                    if (value === 1024) {
                        tile.classList.add('active');
                        this.showSuccess();
                    }
                }
                
                this.puzzleArea.appendChild(tile);
            }
        }
        
        this.scoreElement.textContent = this.score;
    }
    
    move(direction) {
        let moved = false;
        const newBoard = this.board.map(row => [...row]);
        
        switch(direction) {
            case 'left':
                for (let i = 0; i < this.size; i++) {
                    const row = this.board[i].filter(val => val !== 0);
                    const merged = this.mergeArray(row);
                    for (let j = 0; j < this.size; j++) {
                        newBoard[i][j] = merged[j] || 0;
                    }
                    if (JSON.stringify(this.board[i]) !== JSON.stringify(newBoard[i])) {
                        moved = true;
                    }
                }
                break;
                
            case 'right':
                for (let i = 0; i < this.size; i++) {
                    const row = this.board[i].filter(val => val !== 0).reverse();
                    const merged = this.mergeArray(row);
                    const newRow = merged.reverse();
                    for (let j = 0; j < this.size; j++) {
                        newBoard[i][j] = newRow[j] || 0;
                    }
                    if (JSON.stringify(this.board[i]) !== JSON.stringify(newBoard[i])) {
                        moved = true;
                    }
                }
                break;
                
            case 'up':
                for (let j = 0; j < this.size; j++) {
                    const col = [];
                    for (let i = 0; i < this.size; i++) {
                        if (this.board[i][j] !== 0) col.push(this.board[i][j]);
                    }
                    const merged = this.mergeArray(col);
                    for (let i = 0; i < this.size; i++) {
                        newBoard[i][j] = merged[i] || 0;
                    }
                    // 检查是否移动
                    let colChanged = false;
                    for (let i = 0; i < this.size; i++) {
                        if (this.board[i][j] !== newBoard[i][j]) {
                            colChanged = true;
                            break;
                        }
                    }
                    if (colChanged) moved = true;
                }
                break;
                
            case 'down':
                for (let j = 0; j < this.size; j++) {
                    const col = [];
                    for (let i = 0; i < this.size; i++) {
                        if (this.board[i][j] !== 0) col.push(this.board[i][j]);
                    }
                    const merged = this.mergeArray(col.reverse());
                    const newCol = merged.reverse();
                    for (let i = 0; i < this.size; i++) {
                        newBoard[i][j] = newCol[i] || 0;
                    }
                    // 检查是否移动
                    let colChanged = false;
                    for (let i = 0; i < this.size; i++) {
                        if (this.board[i][j] !== newBoard[i][j]) {
                            colChanged = true;
                            break;
                        }
                    }
                    if (colChanged) moved = true;
                }
                break;
        }
        
        if (moved) {
            this.board = newBoard;
            this.addRandomTile();
            this.renderBoard();
            this.log(`🎮 向${direction}移动成功！当前得分：${this.score}`);
        }
    }
    
    mergeArray(arr) {
        const result = [];
        let i = 0;
        
        while (i < arr.length) {
            if (i < arr.length - 1 && arr[i] === arr[i + 1]) {
                result.push(arr[i] * 2);
                this.score += arr[i] * 2;
                i += 2;
            } else {
                result.push(arr[i]);
                i++;
            }
        }
        
        return result;
    }
    
    // 提供给用户的游戏API
    getGameAPI() {
        return {
            move: (direction) => {
                if (['up', 'down', 'left', 'right'].includes(direction)) {
                    this.move(direction);
                } else {
                    this.log('❌ 无效的方向，请使用：up, down, left, right');
                }
            },
            getValue: (row, col) => {
                if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
                    return this.board[row][col];
                }
                return null;
            },
            getBoard: () => {
                return this.board.map(row => [...row]);
            },
            getScore: () => this.score,
            getSize: () => this.size,
            log: (message) => this.log(message),
            addTile: (row, col, value) => {
                if (row >= 0 && row < this.size && col >= 0 && col < this.size && this.board[row][col] === 0) {
                    this.board[row][col] = value;
                    this.renderBoard();
                    this.log(`✅ 在位置(${row}, ${col})添加了数字${value}`);
                } else {
                    this.log('❌ 无法在指定位置添加数字');
                }
            },
            clearTile: (row, col) => {
                if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
                    this.board[row][col] = 0;
                    this.renderBoard();
                    this.log(`✅ 清除了位置(${row}, ${col})的数字`);
                }
            },
            getEmptyCells: () => {
                const empty = [];
                for (let i = 0; i < this.size; i++) {
                    for (let j = 0; j < this.size; j++) {
                        if (this.board[i][j] === 0) {
                            empty.push({row: i, col: j});
                        }
                    }
                }
                return empty;
            }
        };
    }
    
    executeUserCode() {
        try {
            const userCode = this.codeInput.value;
            const game = this.getGameAPI();
            
            this.log('🚀 正在执行用户代码...');
            
            // 创建安全的执行环境
            const func = new Function('game', userCode);
            func(game);
            
            this.log('✅ 代码执行成功！');
            this.renderBoard();
            
        } catch (error) {
            this.log(`❌ 代码执行错误: ${error.message}`);
            console.error('用户代码执行错误:', error);
        }
    }
    
    log(message) {
        const consoleLine = document.createElement('div');
        consoleLine.className = 'console-line';
        consoleLine.textContent = `> ${new Date().toLocaleTimeString()} - ${message}`;
        this.console.appendChild(consoleLine);
        this.console.scrollTop = this.console.scrollHeight;
    }
    
    showSuccess() {
        if (!this.gameWon) {
            this.gameWon = true;
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            this.log('🎉 恭喜！你成功达到了1024！');
            this.log('🎊 1024程序员节快乐！');
            this.log('💻 你是一个真正的程序员！');
            
            // 添加庆祝效果
            this.createCelebration();
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    createCelebration() {
        // 创建庆祝的代码雨效果
        const celebrationMessages = [
            '1024',
            'HACKER',
            'CODER',
            'GEEK',
            'NINJA',
            'WIZARD',
            'MASTER',
            'LEGEND'
        ];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const celebration = document.createElement('div');
                celebration.className = 'floating-code';
                celebration.textContent = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
                celebration.style.left = Math.random() * window.innerWidth + 'px';
                celebration.style.color = '#ffff00';
                celebration.style.fontSize = '20px';
                celebration.style.fontWeight = 'bold';
                celebration.style.animationDuration = '3s';
                
                document.body.appendChild(celebration);
                
                setTimeout(() => {
                    if (celebration.parentNode) {
                        celebration.parentNode.removeChild(celebration);
                    }
                }, 3000);
            }, i * 200);
        }
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new ProgrammerGame();
});