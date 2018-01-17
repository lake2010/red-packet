var local;

const zh_cn={
    'scan-key':'扫描私钥',
    'packet-key':'红包私钥',
    'packet-address':'红包地址',
    'packet-amount':'红包金额',
    'next':'下一步',
    'receive-address':'接收地址',
    'placeholder':'请填写Bitcoin Cash（BCH）地址',
    'note-address':'注：请不要输入红包地址',
    'get-bch':'领取阳光普照',
    'get-bch-success':'领取成功',
    'hashrate':'交易哈希',
    'not-same-address':'请不要使用相同地址',
    'gotIt':'我知道了'
}

const en={
    'scan-key':'Scan private key',
    'packet-key':'Red packet private key',
    'packet-address':'红包地址',
    'packet-amount':'红包金额',
    'next':'下一步',
    'receive-address':'接收地址',
    'placeholder':'请填写Bitcoin Cash（BCH）地址',
    'note-address':'注：请不要输入红包地址',
    'get-bch':'领取阳光普照',
    'get-bch-success':'领取成功',
    'hashrate':'交易哈希',
    'not-same-address':'请不要使用相同地址',
    'gotIt':'我知道了'
}

var lang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏览器
lang = lang.substr(0, 2);//截取lang前2位字符
if(lang == 'zh'){
    local=zh_cn
}else{
    local=en
}