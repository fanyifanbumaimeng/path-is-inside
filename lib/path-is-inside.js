"use strict";

var path = require("path");

module.exports = function (thePath, potentialParent) {
    // For inside-directory checking, we want to allow trailing slashes, so normalize.
    //处理子路径和父路径
    thePath = stripTrailingSep(thePath);
    potentialParent = stripTrailingSep(potentialParent);

    // Node treats only Windows as case-insensitive in its path module; we follow those conventions.
    //判断是否是window平台，win32代表了windows系统
    if (process.platform === "win32") {
        //全部小写
        thePath = thePath.toLowerCase();
        potentialParent = potentialParent.toLowerCase();
    }

    //
    /*
    * 'a/b/c/'  'a/b'
    * 父路径需要包含子路径，并且子路径需要是父路径的完整子路径。
    * 'a/b/c' 'a/b/c'
    *
    * */
    return thePath.lastIndexOf(potentialParent, 0) === 0 &&
		(
			thePath[potentialParent.length] === path.sep ||
			thePath[potentialParent.length] === undefined
		);
};

function stripTrailingSep(thePath) {
    //path.sep获取文件路径分隔符，linux是'/',windows是'\\'
    if (thePath[thePath.length - 1] === path.sep) {
        //如果传入的路径结尾是分隔符，那么就去掉这个分隔符
        return thePath.slice(0, -1);
        //这里利用了字符串的slice方法，
        /*
        * 第一个参数是开始截取的位置，第二个蚕食是截取的位置索引index，负数的话则是截取到length-index
        *
        * */
    }
    //直接返回路径
    return thePath;
}
