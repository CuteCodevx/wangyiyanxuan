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


var showBigPic=document.getElementById('showBigPic');
var img=showBigPic.querySelector('img');
var choosePic=document.getElementById('choosePic');
var ps=choosePic.querySelectorAll('p');
var imgArr=['1.png','2.jpg','3.jpg','4.jpg','5.jpg'];
var last=ps[0];
for(let i=0;i<ps.length;i++){
    // ps[i].index=i;
    ps[i].onmouseenter=function () {
         img.src='images/dbagbig'+imgArr[i];
         img.style.width=446+'px';
         img.style.height=429+'px';
         last.className='';
         this.className='modPBorder';
         last=this;
    }
}
//获取元素 价格 数量 加号 减号 加入购物车
var price=document.getElementById('price');
var num=document.getElementById('number');
var addcart=document.getElementById('addcart');
var subbtn=document.getElementById('subbtn');
var addbtn=document.getElementById('addbtn');
var cartnum=document.getElementById('cartnum');
var n=1;
addbtn.onclick=function () {
    n++;
    if(n!=1){
        subbtn.style.cursor='pointer';
        subbtn.style.background='#fff';
    }
    num.innerHTML=n;

}
subbtn.onclick=function () {
    n--;
    if(n<=1){
        subbtn.style.cursor='not-allowed';
        subbtn.style.background='#eeeee0';
        n=1;
        $('.alertfirst').html('本商品1件起售');
        $('.alertfirst').fadeIn(600);
        setTimeout(function () {
            $('.alertfirst').fadeOut(600);
        },1200);

    }
     num.innerHTML=n;
}

addcart.onclick=function () {
    cartnum.innerHTML=n;
    $('#showcart').show();
    $('#shownum').html(n);
    $('#totalprice').html(n*$('#price').html());

};
console.log($('.closebtn'));
$('.closebtn').on('click',function () {
    $('#showcart').hide();
})