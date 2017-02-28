//二维码显示
//js方法
// var ShowDownload=document.getElementById('ShowDownload');
// var ShowCode=document.getElementById('ShowCode');
// ShowDownload.onmouseover=function () {
//     ShowCode.style.display='block';
// }
// ShowDownload.onmouseout=function () {
//     ShowCode.style.display='none';
// }
$("#ShowDownload").on('mouseover',function(){
    $('#ShowCode').css('display','block');
});
$("#ShowDownload").on('mouseout',function(){
    $('#ShowCode').css('display','none');
});

//导航选项卡功能  布局很重要 把ul与div放在一起，不要有空隙，就可以在移开ul的时候，让div不隐藏
function Tab() {
    var nav=document.querySelector('nav');
    var toplis=nav.querySelectorAll('li');

    var TabContent=document.getElementById('TabContent');
    var ul=TabContent.querySelector('ul');
    var lis=ul.querySelectorAll('li');

    var divs=TabContent.querySelectorAll('div');

    var toplast=toplis[1];
    for(let i=1;i<toplis.length;i++){
        toplis[i].index=i-1;
        toplis[i].onmouseenter=function () {
            divs[toplast.index].style.visibility='hidden';
            divs[this.index].className='movetop';
            divs[this.index].style.visibility='visible';
            toplast=this;
        }

        divs[toplis[i].index].onmouseenter=function () {
            this.style.visibility='visible';
        };

        divs[toplis[i].index].addEventListener('mouseleave',function () {
            this.style.visibility='hidden';
            this.className='';
        });
    }
    var last=lis[1];
    for(let i=1;i<lis.length-2;i++){
        lis[i].index=i-1;
        lis[i].onmouseenter=function () {
            // divs[last.index].style.opacity=0;
            // divs[this.index].style.opacity=1;
            // divs[last.index].style.display='none';
            // divs[this.index].style.display='block';
            divs[last.index].style.visibility='hidden';
            divs[this.index].style.visibility='visible';
            divs[this.index].className='';
            last=this;
        };
        lis[i].onmouseleave=function () {
            // divs[this.index].style.opacity=0;
            // divs[this.index].style.display='none';
            divs[this.index].style.visibility='hidden';
        };

        /*问题：找不到this   display时，对应准确  opacity时，总对应第9个div
            console.log(this); 第9个div
            transition对display属性无效，最后选择用visibility属性来做，可以看见延迟的效果
            注意opacity：0，display：none；visibility：hidden的区别
        */
        divs[lis[i].index].onmouseenter=function () {
            // this.style.display='block';
            // this.style.opacity=1;
            this.style.visibility='visible';
        };

        divs[lis[i].index].addEventListener('mouseleave',function () {
            // this.style.display='none';
            // this.style.opacity=0;
            this.style.visibility='hidden';
        });
    }
}
Tab();





 //轮播图
function ShufflingFigure() {
    //用 ul li的方式 可以实现无缝滚动(自动/手动)
    //yong改变图片地址的方式 实现切换
    //布局不一样
    var section=document.querySelector('section');
    // var ul=section.querySelector('ul');
    // ul.innerHTML+=ul.innerHTML;
    // var lis=ul.querySelectorAll('li');
    // var w=lis[0].offsetWidth;
    // ul.style.width=w*lis.length+"px";
    // var n=0;
    // function active() {
    //     n++;
    //     move(ul,{left:-1920*n-270},1000,"linear",function(){
    //         if(n==lis.length/2){
    //             ul.style.left=-270+'px';
    //             n=0;
    //         }
    //     });
    // }
    var imgArr=[1,2,3,4,5];
    var divs=section.querySelectorAll("div");
    var img=divs[0].querySelector('img');
    var is=section.querySelectorAll('p i');
    var timer=setInterval(Active,3000);
    var n=0;
    var last=is[0];

    //鼠标划过小圆点，小圆点样式变化，同时切换图片
    function mouseActive() {
        for(let i=0;i<is.length;i++){
            is[i].index=i;
            is[i].onmouseenter=function () {
                clearInterval(timer);
                this.style.color='#8B7355';
                last.style.color='#fff';
                img.src="images/lunbo"+imgArr[this.index]+".jpg";
                last=this;
            }
        }
    };
    mouseActive();

    //一上来的时候就让他运动 ：图片运动
    function Active() {
        n++;
        if(n==imgArr.length){
            n=0;
        }
        //问题：想在图片地址变化的时候 加上运动的效果 如何做
        img.src="images/lunbo"+imgArr[n]+".jpg";
        last.style.color='#fff';
        is[n].style.color='#8B7355';
        last=is[n];

    };

    divs[0].onmouseenter=function () {
        clearInterval(timer);
    };
    divs[0].onmouseleave=function () {
        timer=setInterval(Active,3000);
    };
    //prev
    divs[1].onclick=function () {
        n--;
        if(n==-1){
            n=imgArr.length-1;
        }
        img.src="images/lunbo"+imgArr[n]+".jpg";
        last.style.color='#fff';
        is[n].style.color='#8B7355';
        last=is[n];
        clearInterval(timer);

    };
    //next
    divs[2].onclick=function () {
        Active();
        clearInterval(timer);
    }
}
ShufflingFigure();
//练习：以上运动的效果（让弹出层有特效，让图片滚动有特效）可用jquery做出来

/*导航条吸顶+回顶部显示
* 这里是用jquery做的，十分简单，只要判断滚动条的距离，超过一定距离后让它显示或隐藏就可以
* 练习：用原生JS写
* */
document.onmousewheel=function (ev) {
    //判断鼠标向上还是向下滚动
    if(event.wheelDelta>0){             //向上
      //  console.log($(document).scrollTop());
        if($(document).scrollTop()<=400){
            $('.wrapnav').slideUp(200);
        }
    }else{                              //向下
        if($(document).scrollTop()>=200){
            $('.wrapnav').slideDown(200);
        }
    }
    if($(document).scrollTop()>=$(window).height()){  //让回顶部显示
        $('#backtop').show();
    }else{
        $('#backtop').hide();
    }

}
/*回顶部功能
* */
$('#backtop').on('click',function () {
    $(document).scrollTop(0);
    $('.wrapnav').slideUp(200);
    $('#backtop').hide();
});

/*新品首发
* 鼠标移入时 切换图片 并且显示阴影
* */
function showNewProduct() {
    var newWrappic=document.getElementById('newWrappic');
    var leftbtn=document.getElementById('leftbtn');
    var rightbtn=document.getElementById('rightbtn');
    var ul=newWrappic.querySelector('ul');
    var lis=newWrappic.querySelectorAll('li');

    var w=lis[0].offsetWidth*9;
    ul.style.width=w+'px';
    var imgArr=[6,8,10,12,10,16,18,20];
    var imgArr2=[5,7,9,11,9,15,17,19];
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onmouseenter=function () {
            var img=this.querySelector('img');
            img.src='images/pic'+imgArr[this.index]+'.jpg';
            this.style.background='#EEDFCC';
            this.style.boxShadow='1px 1px 2px 2px #CDC5BF';
        }
        lis[i].onmouseleave=function () {
            var img=this.querySelector('img');
            img.src='images/pic'+imgArr2[this.index]+'.png';
            this.style.background='';
            this.style.boxShadow='';
        }
    }
    rightbtn.onclick=function () {
        move(ul,{left:-1140},500,'linear',function () {
            rightbtn.style.background='rgba(139,115,85,0.9)';
            leftbtn.style.background='rgba(238,197,145,0.8)';
        })
    }
    leftbtn.onclick=function () {
        move(ul,{left:0},500,'linear',function () {
            rightbtn.style.background='rgba(238,197,145,0.8)';
            leftbtn.style.background='rgba(139,115,85,0.9)';
        });

    }
}
showNewProduct();



/*人气推荐功能：
* 选项卡
* 鼠标移入图片放大+
* */
function recommendTab() {
    var recommend=document.getElementById('recommend');
    var divs=recommend.getElementsByClassName('recContent');
    var as=recommend.getElementsByClassName('col-lg-1');
    var last=as[0];

    for(let i=0;i<as.length;i++){
        as[i].index=i;
        as[i].onclick=function () {
            last.style.color='#080808';
            last.style.borderBottom='none';
            divs[last.index].style.display='none';
            this.style.color='#aa4442';
            this.style.borderBottom='2px solid #aa4442';
            divs[this.index].style.display='block';
            last=this;
        }
    }
}
recommendTab();

//鼠标移入图片放大



/*放大镜效果
 * 定义了两个函数，移入放大图片，和移出回到原始大小。
 *
 * */
function changebig(obj) {
    var img=obj.querySelector('img');
    var w=obj.offsetWidth;
    var h=obj.offsetHeight;
    move(img,{width:w+10,height:h+10},500,"linear");
}
function changeprim(obj) {
    var img=obj.querySelector('img');
    var w=obj.offsetWidth;
    var h=obj.offsetHeight;
    move(img,{width:w,height:h},500,"linear");
}
function oversize() {
    var divpic=document.getElementsByClassName('divpic');
    for(let i=0;i<divpic.length;i++){
        divpic[i].onmouseenter=function () {
            changebig(this);
        }
        divpic[i].onmouseleave=function () {
            changeprim(this);
        }
    }
}
oversize();


/*大家都在说功能：
* 点击按扭 内容无缝滚动
* */
function everybody() {
    var everybodysay=document.getElementById('everybodysay');
    var ul=everybodysay.querySelector('ul');

    var prevbtn=document.getElementById('prevbtn');
    var nextbtn=document.getElementById('nextbtn');
    ul.innerHTML+=ul.innerHTML;


    var lis=ul.querySelectorAll('li');
    var w=lis[0].offsetWidth;
    ul.style.width=w*lis.length+lis.length*20+'px';
    var timer;
    var n=0;


    function shift() {
        n++;
        move(ul,{left:-370*n},500,'linear',function () {
            if(n==lis.length/2){
                ul.style.left=0;
                n=0;
            }
        });
    }
    timer=setInterval(shift,2000);
    for(let i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onmouseenter=function () {
            // console.log('移入li');
            clearInterval(timer);
            oversize();
        }
        lis[i].onmouseleave=function () {
            // console.log('移出li');
            // shift();
            timer=setInterval(shift,2000);
        }
    }
    prevbtn.onclick=function () {
        clearInterval(timer);
        n--;
        move(ul,{left:-370*n},500,'linear',function () {
            if(n==-1){
                n=(lis.length/2)-1;
                ul.style.left=-370*n+'px';
            }
            // console.log(n);
        });
    }
    nextbtn.onclick=function () {
        // console.log(1);
        clearInterval(timer);
        shift();
    }


    /*问题:获取不到img标签，图片无法放大
    * 解决：在这个函数中调用一下放大函数，重新获取带有divpiv的标签
    * */

}
everybody();