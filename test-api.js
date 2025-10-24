// 1024程序员节 Meta编程游戏 - 测试代码

// 等待游戏加载完成后执行测试
window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof game !== 'undefined') {
            // 测试基本API
            console.log('🎮 开始测试游戏API...');

            // 测试移动
            game.move('up');
            game.log('向上移动测试完成');

            // 测试获取游戏状态
            let board = game.getBoard();
            let score = game.getScore();
            let emptyCells = game.getEmptyCells();

            game.log('当前得分: ' + score);
            game.log('空位置数量: ' + emptyCells.length);

            // 测试添加数字
            game.addTile(0, 0, 256);
            game.log('在左上角添加了256');

            // 测试程序员专用功能
            game.commit('Happy 1024 Day!');
            game.compile();
            game.deploy();

            game.log('✅ API测试完成！现在试试手动玩吧！');
            game.log('💡 使用WASD键或方向键控制移动');
            game.log('🎯 目标：合并数字达到1024！');
        } else {
            console.log('游戏还未加载完成，请稍后再试');
        }
    }, 1000); // 等待1秒让游戏初始化
});