/**
 * Created by anne on 4/20/16.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {


    var city = document.getElementById('aqi-city-input').value;
    var num = document.getElementById('aqi-value-input').value;
    if (!num.match(/^\d+$/)) {
        alert('空气质量指数需为整数')
        return
    }

    if (!city.match(/^[A-Za-z\u4E00-\u9FA5\uF900-\uFA2D]+$/)) {
        alert('城市名称需为中英文字符')
        return
    }
    aqiData[city] = num;
}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');

    if (table.rows.length == 0) {
        var tr = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
        table.appendChild(tr);
    }
    if (Object.keys(aqiData) && aqiData[Object.keys(aqiData)[0]]) {
        var newDataTr = document.createElement('tr');
        newDataTr.innerHTML = '<td>' + Object.keys(aqiData) + '</td>' + '<td>' + aqiData[Object.keys(aqiData)[0]] + '</td>' + '<td><button>删除</button></td>';
        table.appendChild(newDataTr);
    }


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {

    addAqiData();
    renderAqiList();
    aqiData = {};
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    var row=e.target.parentNode.parentNode;
    var table=row.parentNode;
    table.deleteRow(row.rowIndex);
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    document.getElementById('add-btn').onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    
    document.getElementById('aqi-table').addEventListener('click',function (e) {

        if(e.target&&e.target.nodeName.toUpperCase()==='BUTTON'){
            e.target.onclick=delBtnHandle(e);
        }
    });


}

init();