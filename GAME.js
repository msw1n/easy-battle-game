const canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 600;

const background = new Image();
background.src = "Background.png";
const c = canvas.getContext("2d");
c.fillStyle = "rgb(144,244,144)";
c.fillRect(0,0,canvas.width,canvas.height);
c.font = "30pt Arial";
c.strokeStyle = "red";
c.strokeText("VS",450,200);
c.font = "15pt Arial";
c.strokeText("gを押してゲームスタート",390,300);

c.strokeStyle = "black";
c.font = "20pt Arial";
c.strokeText("操作方法",100,450);
c.strokeText("p1: aで左移動　dで右移動　 wでジャンプ　sで攻撃",100,500);
c.strokeText("p2: jで左移動　lで右移動　iでジャンプ　kで攻撃",100,550);


class Sprite{
    constructor({k,x,y,width,height,dx,dy,g,attack,x1,y1,kx,ky,kheight,kwidth}){
        this.k = new Image();
        this.k.src = k
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.g = g;
        this.attack = attack;
        this.hp = 45;
        this.x1 = x1;//切り取り初期位置
        this.y1 = y1;
        this.kx = kx;//切り取り速度
        this.ky = ky;
        this.kwidth = kwidth  //切り取り幅
        this.kheight = kheight;
    }
    draw(){
        this.y += this.g;
        c.drawImage(this.k,this.x1,this.y1,this.kwidth,this.kheight,this.x,this.y,this.width,this.height);
        this.x1 += this.kx;
        this.y1 += this.ky;
    }

    move(){
        this.x += this.dx;
        this.y += this.dy;
    }

};




k1 = "NightBorne.png"
p1 = new Sprite({k:k1,x:100,y:480,width:160,height:120,dx:0,dy:0,g:0,attack:false,x1:17,y1:34,kx:80,ky:0,kwidth:40,kheight:30});

k2 = "Idle.png";
p2 = new Sprite({k:k2,x:300,y:330,width:400,height:270,dx:0,dy:0,g:0,attack:false,x1:1512,y1:14,kx:-162,ky:0,kwidth:100,kheight:90});


function stay(p){
    if(p==1){
        if(p1.x1>690){
            p1.x1 = 17;
        }
    }
    if(p==2){
        if(p2.x1<40){
            p2.x1 = 1512;
        }
    }
}

function run(p){
    if(p==1){
        if(p1.x1>450){
            p1.x1 = 17;
        }
    }
    if(p==2){
        if(p2.x1<40){
            p2.x1 = 1190;
        }
    }
}


function attack(p){
    if(p==1){
        if(p1.x1>930){
            p1.x1 = 17;
        }
    }
    if(p==2){
        if(p2.x1<20){
            p2.x1 = 1210;
        }
        else if(p2.x1 == 562){
            p2.x1 = 506;
        }
    }
}

function death(p){
    if(p==1){
        if(p1.x1>1710){
            p1.x1 = 17;
        }
    }
    if(p==2){
        if(p2.x1 <= 20){
            p2.x1 = 1026;
        }
        else if(p2.x1 == 562){
            p2.x1 = 506;
        }
    }
    
}

let pp = 1;
let pp2 = 1;
let at = 0;      //ワンタッチで攻撃描画を可能に(描画終わるまで連続して攻撃は出せない)
let at2 = 0;
let jump = 0;
let jump22 = 0;

let j = 1;    //jumpの長押し防止
let j2 = 1;
function main(){
    let sets = setInterval(function(){
        c.drawImage(background,0,145,553,600,0,0,canvas.width,canvas.height);
    
        p1.draw(); 
        p2.draw();
                //描画
        if(press.right == true){
            p1.dx = 5;
            run(1);
        }
        else if(press.left==true){
            p1.dx = -5;
            run(1);
        }
        else{
            p1.dx = 0;
        }

        if(press.up==true && j ==1&&p1.y+p1.height>=580){
            jump = 1;
            p1.dy = -30;
        }
        if(0<jump && jump<=10){
            p1.dy = -30;            
            jump++;
            if(jump==11){
                jump = 0;
            }
        }
        else{
            p1.dy = 0;
        }

        if(press.right2 == true){
            p2.dx = 5;
            run(2);
        }
        else if(press.left2==true){
            p2.dx = -5;
            run(2);
        }
        else{
            p2.dx = 0;
        }

        if(press.up2==true && j2 == 1 && p2.y+p2.height>=580){
            p2.kx = 0;
            p2.dy = -30;
            jump22 = 1;
           
        }
        if(0<jump22 && jump22<=10){
            p2.dy = -30;            
            jump22++;
            if(jump22==11){
                jump22 = 0;
                p2.kx = -162;
                p2.k.src = "Idle.png";
                p2.x1 = 1512;
            }

        }

        else{
            p2.dy = 0;
        }

        if(press.g1 == true){
            p1.g = 10;
        }
        else{
            p1.g = 0;
        }
        if(press.g2 == true){
            p2.g = 10;
        }
        else{
            p2.g = 0;
        }

        if(p1.attack==true && pp==1){           
            p2.kx = -162;
            at = 1;            //ワンタッチだと離した瞬間true->false,pp=0になるからattack()が実行されず、描画バグ→atによって解決
        }
        if(1<=at && at<=12){
            attack(1);
            at++;
            pp = 0;
            if(at==13){
                at = 0;
                pp = 1;
            }
        }
        if(p2.attack==true && pp2==1){
            at2 = 1;
        }
        if(1<=at2 && at2<=8){
            attack(2);
            at2++;
            pp2 = 0;
            if(at2==9){
                at2 = 0;
                pp2 = 1;          //連打可
            }
        }
        if(p1.attack==false &&h==0&& press.right == false && press.left==false&&at==0){
            stay(1);   
        }
        if(p2.attack==false &&h2==0&& press.right2 == false && press.left2==false&&at2==0 && jump22==0){
            stay(2);
        }

        p1.move();
        p2.move()
        under();
        side();
        if(p1.hp==0 || p2.hp==0){
            clearInterval(sets);
            gameend();
        }
    },40)
}
window.addEventListener("keydown",eventdown);
window.addEventListener("keyup",eventup);





press = {
    right : false,
    left : false,
    up : false,
    right2 : false,
    left2 : false,
    up2 : false,
    g1 : false,
    g2 : false,
}

let h = 0;
let h2 = 0;

let c1 = 1;   //長押し防止
let c2 = 1;
let c3 = 1;
let c4 = 1;
let c5 = 1;
let c6 = 1;
let c7 = 1;
let c8 = 1;

let y = 0;
let st = 0;
function eventdown(e){        //p動かすイベントハンドラ
    if(e.key=="g" && st==0){
        st = 1;
        main();
    }
    if(e.key=="l"){
        press.right2 = true;
        if(c1==1){
            p2.k.src = "Run.png";
            p2.x1 = 1190;
            c1 = 0;
        }             
    }
    if(e.key=="j" && c2==1){
        press.left2 = true;
        p2.k.src = "Run.png";
        p2.x1 = 1190;
        c2 = 0;
    }
    if(e.key=="i" && c3==1){
        press.up2 = true;
        p2.k.src = "Jump.png";
        p2.x1 = 380;
        c3 = 0;      
        
        setTimeout(function(){
            j2 = 0;
        },40)
    }
    if(e.key=="d"){
        if(c4==1){
            p1.x1 = 17;
            p1.y1 = 116;
            c4 = 0;
        }
        press.right = true;
    }
    if(e.key=="a"){
        if(c5==1){
            p1.x1 = 17;
            p1.y1 = 116;
            c5 = 0;
        }
        press.left = true;
    }
    if(e.key=="w" && c8==1){
        press.up = true;
        c8 = 0;
        setTimeout(function(){
            j = 0;
        },40)
    }
    if(e.key=="s" && st==1 && at==0){
        p1.attack=true;
        jump=0;        //ジャンプ中にも攻撃可
        if(p1.attack==true && pp==1){   //1回の攻撃で1回の処理にしたいからmainじゃなくてここ  pp=攻撃一回 c6=攻撃一回の中で画像の初期設定一回
            if(c6==1){
                if(press.right==true){
                    press.right = false;
                }
                else if(press.left==true){
                    press.left=false;
                }
                p1.x1 = 17;
                p1.y1 = 163;
                p1.kwidth = 80;
                p1.kheight = 60;
                p1.width = 400;
                p1.height  = 320;
                y = p1.y;
                p1.y -= 200;
                c6 = 0;
            }
            h = 1;
            if(p1.x+80<=p2.x && p2.x<=p1.x+200 &&                      //紫の方が剣振った時横幅でかいから遠距離向き
                p2.y+150<=p1.y+250 && p1.y+250<=p2.y+150+120) {       //青は近距離向き 
                    let hp1 = document.querySelector(".p2");
                    p2.hp -= 5;
                    hp1.style.width = p2.hp+"%";
            }
            setTimeout(function(){
                p1.attack=false;
                p1.kwidth = 40;
                p1.kheight = 30;
                p1.height = 120;
                p1.width = 160;
                pp = 0;
                h = 0;
                p1.y = 480;
                p1.x1 = 17;           //攻撃後stayの位置へ戻す
                p1.y1 = 34;
            },40*12)                     //秒数後で調整

        }
        else{
            p1.attack=false;
        }
    }
    if(e.key=="k" && st==1 && at2==0){
        console.log("A");
        p2.attack=true;
        jump22 = 0;
        if(p2.attack==true && pp2==1){
            h2 = 1;
            if(c7==1){
                if(press.right==true){
                    press.right = false;
                }
                else if(press.left==true){
                    press.left=false;
                }
                p2.k.src = "Attack3.png";
                p2.x1 = 1210;
                c7 = 0;
                p2.kx = -162;
            }
            if(p2.x+100>=p1.x+p1.width && p1.x+p1.width>=p2.x-20 &&
                p1.y<=p2.y+150+50 && p2.y+150+50<= p1.y+120 ||
                p1.x<=p2.x && p2.x <= p1.x+100 && p1.y<=p2.y+150+50 && p2.y+150+50<= p1.y+120){
                    let hp2 = document.querySelector(".p1");
                    p1.hp -= 5;
                    hp2.style.width=p1.hp+"%";
            }
            setTimeout(function(){
                p2.k.src = "Idle.png";
                p2.x1 = 1512;
                p2.attack=false;
                pp2 = 0
                h2 = 0;
                p2.x1 = 1512;
            },40*8)
        }
        else{
            p2.attack=false;
        }
    }
}

function eventup(e){        //p1動かすイベントハンドラ
    if(e.key=="l"){
        press.right2 = false;
        p2.k.src = "Idle.png";
        p2.x1 = 1512;
        c1 = 1;
    }
    if(e.key=="j"){
        press.left2 = false;
        p2.k.src = "Idle.png";
        p2.x1 = 1512;
        j = 1;
        c2 = 1;
    }
    if(e.key=="i"){
        press.up2 = false;
        
        j2 = 1;
        c3 = 1;
    }
    if(e.key=="d"){
        p1.x1 = 17;
        p1.y1 = 34;
        press.right = false;
        c4 = 1;
    }
    if(e.key=="a"){
        p1.x1 = 17;
        p1.y1 = 34;
        press.left = false;
        c5 = 1;
    }
    if(e.key=="w"){
        press.up = false;
        c8 = 1;
        j = 1;
    }
    if(e.key=="s" && at==0){
        p1.attack=false;
        pp = 1;//長押しによる連続防止
        h = 0;
        c6 = 1;
    }
    if(e.key=="k" && at2==0){
        p2.attack=false;
        pp2 = 1;
        if(at2==0){
            p2.k.src = "Idle.png";
            p2.x1 = 1512;
        }
        h2 = 0;
        c7 = 1;
    }
}










function side(){
    if(p1.x+p1.width>=1000){
        p1.x = 840;
    }
    if(p2.x+p2.kwidth>=1000){
        p2.x = 850;
    }
    if(p1.x<=0){
        p1.x = 0;
    }
    if(p2.x<=0){
        p2.x = 0;
    }
    
}


function under(){
    if(p1.y+p1.height>=600){
        press.g1 = false;
    }
    else{
        press.g1 = true;
    }
    if(p2.y+p2.height>=600){
        press.g2 = false;
    }
    else{
        press.g2 = true;
    }
}


function  gameend(){
    if(p1.hp==0 || p2.hp==0){
        if(p1.hp==0){
            p1.x1 = 17;
            p1.y1 = 351;
            last();

        }
        else if(p2.hp==0){
            p2.k.src = "Death.png";
            p2.x1 = 1026;
            last2();
        }

    }
}

let count = 0
function last(){
    let set = setInterval(function(){
        if(count>=21){
            c.drawImage(background,0,145,553,600,0,0,canvas.width,canvas.height);
            p2.draw();
            clearInterval(set);
            p2.k.src = "Idle.png";
            p2.x1 = 1512;
            p2.y1 = 14;
            p2.y = 200;
            p2.x = 390;
            c.clearRect(0,0,canvas.width,canvas.height);
            winback();
            p2.draw();
            c.font = "50pt Arial";
            c.fillStyle = "red";
            c.fillText("Player2 Win",350,200);
        }
        else{
            c.drawImage(background,0,145,553,600,0,0,canvas.width,canvas.height);
            p1.draw();
            p2.draw();
            stay(2);
            death(1);
            count++;
        }
        
    },40);
}

let count2 = 0;
function last2(){
    const set = setInterval(function(){
        if(count2==6){
            clearInterval(set);
            p1.x1 = 17;
            p1.y1 = 34;
            p1.y = 400;
            p1.x = 390
            c.clearRect(0,0,canvas.width,canvas.height);
            winback();
            p1.draw();
            c.font = "50pt Arial";
            c.fillStyle = "red";
            c.fillText("Player1 Win",350,200);
        }
        else{
            c.drawImage(background,0,145,553,600,0,0,canvas.width,canvas.height);
            p1.draw();
            p2.draw();
            stay(1);
            death(2);
            count2++;
        }
    },40)
    
}

const color = ["rgba(255,0,0,0.3)","rgba(255,255,0,0.3)","rgba(0,255,0,0.3)","rgba(0,0,255,0.3)"];
a1 = 0;
b1 = 0;
a2 = 250;
b2 = 600;
function winback(){
    for(let i=0;i<4;i++){
        c.fillStyle = color[i];
        c.fillRect(a1,b1,a2,b2);
        a1 = a1+ a2;
    }
}






