// 程序员文化彩蛋和特殊功能
class EasterEggs {
    constructor(game) {
        this.game = game;
        this.activatedEggs = new Set();
        this.secretCodes = {
            'hello world': () => this.helloWorld(),
            'git commit': () => this.gitCommit(),
            'debug mode': () => this.debugMode(),
            'sudo': () => this.sudoMode(),
            'rm -rf': () => this.removeEverything(),
            'stack overflow': () => this.stackOverflow(),
            '404': () => this.notFound(),
            '418': () => this.imATeapot(),
            'null pointer': () => this.nullPointer(),
            'infinite loop': () => this.infiniteLoop(),
            'binary': () => this.binaryMode(),
            'hex': () => this.hexMode(),
            'recursion': () => this.recursion(),
            'hack': () => this.hackMode(),
            '1024': () => this.programmerDay(),
            'coding': () => this.codingMode()
        };
    }
    
    checkSecretCode(code) {
        const normalizedCode = code.toLowerCase().trim();
        if (this.secretCodes[normalizedCode] && !this.activatedEggs.has(normalizedCode)) {
            this.secretCodes[normalizedCode]();
            this.activatedEggs.add(normalizedCode);
            return true;
        }
        return false;
    }
    
    helloWorld() {
        this.game.log('🌍 Hello World! 程序员的第一步！');
        this.createFloatingText('Hello World!', '#00ff00');
        this.game.score += 100;
    }
    
    gitCommit() {
        this.game.log('📦 git commit -m "Happy 1024!"');
        this.game.log('✅ 代码已提交到版本历史！');
        this.createFloatingText('COMMITTED', '#ffffff');
        this.game.score += 256;
    }
    
    debugMode() {
        this.game.log('🐛 调试模式已激活！');
        this.game.log('💡 现在可以看到更多调试信息');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
    }
    
    sudoMode() {
        this.game.log('🔑 sudo 权限已获得！');
        this.game.log('⚡ 所有操作都将被强制执行！');
        this.createFloatingText('SUDO MODE', '#ff0000');
        
        // 添加sudo效果
        const tiles = document.querySelectorAll('.puzzle-tile');
        tiles.forEach(tile => {
            tile.style.borderColor = '#ff0000';
            tile.style.boxShadow = '0 0 10px #ff0000';
        });
        
        setTimeout(() => {
            tiles.forEach(tile => {
                tile.style.borderColor = '#00ff00';
                tile.style.boxShadow = 'none';
            });
        }, 3000);
    }
    
    removeEverything() {
        this.game.log('⚠️ rm -rf / 很危险哦！');
        this.game.log('😅 幸好这只是个游戏！');
        
        // 临时清空游戏板
        for (let i = 0; i < this.game.size; i++) {
            for (let j = 0; j < this.game.size; j++) {
                this.game.board[i][j] = 0;
            }
        }
        this.game.renderBoard();
        
        setTimeout(() => {
            this.game.init();
            this.game.log('🔄 游戏已重置！');
        }, 2000);
    }
    
    stackOverflow() {
        this.game.log('📚 Stack Overflow 程序员最好的朋友！');
        this.game.log('💡 获得编程智慧加成！');
        
        // 随机添加一些高数值方块
        const emptyCells = this.game.getGameAPI().getEmptyCells();
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.game.board[randomCell.row][randomCell.col] = 512;
            this.game.renderBoard();
        }
    }
    
    notFound() {
        this.game.log('🔍 404: 彩蛋未找到！');
        this.game.log('😄 但你找到了这个彩蛋！');
        this.createFloatingText('404 NOT FOUND', '#ff6b6b');
    }
    
    imATeapot() {
        this.game.log('🫖 HTTP 418: I\'m a teapot');
        this.game.log('☕ 程序员也需要休息喝茶！');
        this.createFloatingText('I AM A TEAPOT', '#8b4513');
    }
    
    nullPointer() {
        this.game.log('❌ NullPointerException!');
        this.game.log('💥 空指针异常！检查你的代码！');
        
        // 随机位置出现0
        const row = Math.floor(Math.random() * this.game.size);
        const col = Math.floor(Math.random() * this.game.size);
        this.game.board[row][col] = 0;
        this.game.renderBoard();
    }
    
    infiniteLoop() {
        this.game.log('♾️ 无限循环模式启动！');
        this.game.log('🔄 所有数字开始循环变化...');
        
        let loopCount = 0;
        const loopInterval = setInterval(() => {
            if (loopCount >= 10) {
                clearInterval(loopInterval);
                return;
            }
            
            for (let i = 0; i < this.game.size; i++) {
                for (let j = 0; j < this.game.size; j++) {
                    if (this.game.board[i][j] !== 0) {
                        this.game.board[i][j] = (this.game.board[i][j] * 2) % 1024 || 2;
                    }
                }
            }
            this.game.renderBoard();
            loopCount++;
        }, 500);
    }
    
    binaryMode() {
        this.game.log('🔢 二进制模式激活！');
        this.game.log('01 1010 1100 1010');
        
        // 临时显示二进制
        const tiles = document.querySelectorAll('.puzzle-tile');
        tiles.forEach((tile, index) => {
            const value = parseInt(tile.textContent) || 0;
            if (value > 0) {
                tile.textContent = value.toString(2);
                tile.style.fontSize = '12px';
            }
        });
        
        setTimeout(() => {
            this.game.renderBoard();
        }, 5000);
    }
    
    hexMode() {
        this.game.log('🔤 十六进制模式激活！');
        this.game.log('0x4 0x8 0x10 0x20');
        
        // 临时显示十六进制
        const tiles = document.querySelectorAll('.puzzle-tile');
        tiles.forEach((tile, index) => {
            const value = parseInt(tile.textContent) || 0;
            if (value > 0) {
                tile.textContent = '0x' + value.toString(16).toUpperCase();
                tile.style.fontSize = '14px';
            }
        });
        
        setTimeout(() => {
            this.game.renderBoard();
        }, 5000);
    }
    
    recursion() {
        this.game.log('🔄 递归模式启动！');
        this.game.log('🔄 函数调用自身...');
        
        // 递归效果：数字自我复制
        const newBoard = this.game.board.map(row => [...row]);
        for (let i = 0; i < this.game.size; i++) {
            for (let j = 0; j < this.game.size; j++) {
                if (this.game.board[i][j] !== 0) {
                    // 尝试在相邻位置复制
                    const directions = [[-1,0], [1,0], [0,-1], [0,1]];
                    for (let [di, dj] of directions) {
                        const ni = i + di;
                        const nj = j + dj;
                        if (ni >= 0 && ni < this.game.size && nj >= 0 && nj < this.game.size && newBoard[ni][nj] === 0) {
                            newBoard[ni][nj] = this.game.board[i][j];
                            break;
                        }
                    }
                }
            }
        }
        this.game.board = newBoard;
        this.game.renderBoard();
    }
    
    hackMode() {
        this.game.log('💻 黑客模式激活！');
        this.game.log('🔓 系统权限提升！');
        
        // 矩阵雨效果
        document.body.style.background = 'linear-gradient(135deg, #000000, #001100)';
        
        // 添加绿色滤镜
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 255, 0, 0.1)';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '9999';
        overlay.id = 'hackOverlay';
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298)';
            if (document.getElementById('hackOverlay')) {
                document.body.removeChild(document.getElementById('hackOverlay'));
            }
        }, 5000);
    }
    
    programmerDay() {
        this.game.log('🎉 1024程序员节快乐！');
        this.game.log('💻 致敬所有程序员！');
        
        // 特殊庆祝效果
        this.game.score += 1024;
        this.createFloatingText('1024', '#ffff00');
        
        // 创建特殊数字布局
        const pattern = [
            [1, 0, 2, 4],
            [0, 1, 0, 0],
            [2, 0, 4, 8],
            [4, 0, 8, 16]
        ];
        
        for (let i = 0; i < this.game.size; i++) {
            for (let j = 0; j < this.game.size; j++) {
                if (pattern[i][j] !== 0) {
                    this.game.board[i][j] = pattern[i][j];
                }
            }
        }
        this.game.renderBoard();
    }
    
    codingMode() {
        this.game.log('👨‍💻 编程模式激活！');
        this.game.log('⌨️ 代码效率提升200%！');
        
        // 代码编辑器高亮效果
        const codeInput = document.getElementById('codeInput');
        codeInput.style.background = 'linear-gradient(45deg, #001122, #002244)';
        codeInput.style.border = '2px solid #00ffff';
        codeInput.style.boxShadow = '0 0 20px #00ffff';
        
        setTimeout(() => {
            codeInput.style.background = '#000';
            codeInput.style.border = '1px solid #00ff00';
            codeInput.style.boxShadow = 'none';
        }, 10000);
        
        // 双倍得分效果
        this.game.score *= 2;
    }
    
    createFloatingText(text, color) {
        const floatingText = document.createElement('div');
        floatingText.style.position = 'fixed';
        floatingText.style.top = '50%';
        floatingText.style.left = '50%';
        floatingText.style.transform = 'translate(-50%, -50%)';
        floatingText.style.fontSize = '24px';
        floatingText.style.fontWeight = 'bold';
        floatingText.style.color = color;
        floatingText.style.zIndex = '1000';
        floatingText.style.pointerEvents = 'none';
        floatingText.textContent = text;
        
        document.body.appendChild(floatingText);
        
        // 动画效果
        floatingText.style.animation = 'float 2s ease-out forwards';
        
        setTimeout(() => {
            if (floatingText.parentNode) {
                floatingText.parentNode.removeChild(floatingText);
            }
        }, 2000);
    }
}

// 将彩蛋系统集成到主游戏中
if (!window.originalExecuteUserCode) {
    window.originalExecuteUserCode = ProgrammerGame.prototype.executeUserCode;
}
ProgrammerGame.prototype.executeUserCode = function() {
    const userCode = this.codeInput.value;
    
    // 检查秘密代码
    if (!this.easterEggs) {
        this.easterEggs = new EasterEggs(this);
    }
    
    if (this.easterEggs.checkSecretCode(userCode)) {
        return; // 如果触发了彩蛋，不执行原始代码
    }
    
    // 执行原始的用户代码
    window.originalExecuteUserCode.call(this);
};

// 添加更多程序员文化相关的API
const originalGetGameAPI = ProgrammerGame.prototype.getGameAPI;
ProgrammerGame.prototype.getGameAPI = function() {
    const originalAPI = originalGetGameAPI.call(this);
    
    return {
        ...originalAPI,
        // 添加程序员相关的特殊功能
        debug: () => {
            this.log('🔍 调试信息：');
            this.log(`   游戏板大小: ${this.size}x${this.size}`);
            this.log(`   当前得分: ${this.score}`);
            this.log(`   空格数量: ${this.getGameAPI().getEmptyCells().length}`);
            this.log(`   最大数字: ${Math.max(...this.board.flat())}`);
        },
        
        commit: (message) => {
            this.log(`📦 git commit -m "${message}"`);
            this.log('✅ 代码已提交');
            this.score += 50;
        },
        
        compile: () => {
            this.log('🔨 正在编译...');
            setTimeout(() => {
                this.log('✅ 编译成功！');
                this.score += 100;
            }, 1000);
        },
        
        deploy: () => {
            this.log('🚀 正在部署到生产环境...');
            setTimeout(() => {
                this.log('✅ 部署成功！应用已上线');
                this.score += 500;
                this.createCelebration();
            }, 2000);
        },
        
        refactor: () => {
            this.log('♻️ 正在重构代码...');
            this.log('💡 代码质量提升！');
            this.score += 200;
            
            // 重构效果：重新排列数字
            const flatBoard = this.board.flat().filter(n => n !== 0);
            flatBoard.sort((a, b) => a - b);
            
            let index = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (index < flatBoard.length) {
                        this.board[i][j] = flatBoard[index++];
                    } else {
                        this.board[i][j] = 0;
                    }
                }
            }
            this.renderBoard();
        },
        
        optimize: () => {
            this.log('⚡ 正在优化性能...');
            this.log('📈 游戏性能提升200%！');
            
            // 优化效果：所有数字翻倍
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] !== 0) {
                        this.board[i][j] *= 2;
                    }
                }
            }
            this.renderBoard();
            this.score += 300;
        }
    };
};

// 添加庆祝方法
ProgrammerGame.prototype.createCelebration = function() {
    const celebrationMessages = [
        '1024',
        'HACKER',
        'CODER',
        'GEEK',
        'NINJA',
        'WIZARD',
        'MASTER',
        'LEGEND',
        'PROGRAMMER',
        'DEVELOPER'
    ];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            celebration.className = 'floating-code';
            celebration.textContent = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
            celebration.style.left = Math.random() * window.innerWidth + 'px';
            celebration.style.color = ['#00ff00', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 4)];
            celebration.style.fontSize = (Math.random() * 10 + 15) + 'px';
            celebration.style.fontWeight = 'bold';
            celebration.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            document.body.appendChild(celebration);
            
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.parentNode.removeChild(celebration);
                }
            }, 5000);
        }, i * 150);
    }
};