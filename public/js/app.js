//技术 都是为了 需求
// 生命周期函数  钩子函数
// 出生 ->  现在

Vue.directive("focus",{
    update(el){
        el.focus();
    }
})
new Vue({
    el:".container",
    data:{
        datas:[]
    },
    methods:{
        del(id){
            fetch("/del",{
                method:"post",
                headers:{
                  "content-type":"application/x-www-form-urlencoded"
                },
                body:"id="+id
            }).then(function (e) {
                return e.text();
            }).then((e)=> {
                if(e=="ok"){
                   this.datas=this.datas.filter(function (item) {
                        if(item.id!=id){
                            return item
                        }
                    })
                }
            })
        },
        changeShow(obj,attr){
            obj[attr+"show"]=!obj[attr+"show"];
            if(obj[attr+"show"]){
                // 那一条   哪个属性值
                var id=obj.id;
                var attr=attr;
                var val=obj[attr];
                var params="id="+id+"&attr="+attr+"&val="+val
                fetch("/edit",{
                    method:"post",
                    headers:{
                        "content-type":"application/x-www-form-urlencoded"
                    },
                    body:params
                }).then(function (e) {
                    return e.text();

                }).then(function (e) {
                    if(e=="ok"){
                        alert("修改成功");
                    }
                })
            }
        }
    },
    created(){
        var ajax=new XMLHttpRequest();
        ajax.onload= ()=> {
            var data=JSON.parse(ajax.response);
            data.map(function (item) {
                item.nameshow=true;
                item.ageshow=true;
                item.sexshow=true;
                return item;
            });
            this.datas=data;

        }
        ajax.open("post","/select");
        ajax.send();
    }
})