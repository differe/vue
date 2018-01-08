var Main=Vue.component("Main",{
    template:`
        <div class="template"> 
            <div class="body">
            <div class="left"> 
                <router-view name="left"></router-view>
            </div>
            <div class="right"> 
                <router-view name="right"></router-view>
            </div>
            </div>
        </div>
    `
})
var Left=Vue.component("Left",{
    data(){
        return{
            menu:[
                /*{id:1,title:"Global",pid:0},
                {id:2,title:"devtools",pid:1},
                {id:3,title:"errorHandler",pid:1},
                {id:4,title:"API",pid:0},
                {id:5,title:"component",pid:4},
                {id:6,title:"filter",pid:4},*/
            ]
        }
    },
    computed:{
        data(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i])
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i])
                            }
                        }
                    }
                }

            }
            return arr;
        }
    },
    methods:{

    },
    mounted(){
        fetch("./demo.txt").then(function (e) {
            return e.json();
        }).then(e=>{
            this.menu=e;
        })
    },
    template:`
        <div> 
             <ul> 
                    <div v-for="item in data">  
                        <router-link :to="'#'+item.id">{{item.title}}</router-link>
                        <ul v-for="item1 in item.child"> 
                            <router-link :to="'#'+item1.id">{{item1.title}}</router-link>
                        </ul>
                    </div>
             </ul>    
        </div>
    `
})
var Right=Vue.component("Right",{

    template:`
     <div class="markdown-body">
        <div v-html="datas"> 
             
        </div>
    </div>
    `,
    data(){
        return{
            datas:""
        }
    },
    mounted(){
        fetch("./aa.txt").then(function (e) {
            return e.text();
        }).then(e=>{
            this.datas=e;
        })
    },
    watch:{
        $route(){
            var num=this.$route.hash.slice(1);
            var pos=document.querySelector(".a"+num).offsetTop-50;
            console.log(pos)
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()
            animate();
        }
    }
})
var Quick=Vue.component("Quick",{
    template:`
        <div style="position:absolute;top: 50px;"> 
            quickquickquickquickquickquickquickquick<br>
            quickquickquickquickquickquickquickquick<br>
            quickquickquickquickquickquickquickquick<br>
            quickquickquickquickquickquickquickquick<br>
            quickquickquickquickquickquickquickquick<br>
            quickquickquickquickquickquickquickquick<br>
        
        </div>
    `
})