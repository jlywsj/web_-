var h = 0;

$(window).load(function () {
    $('.time').click(function () {
        changeSubject($('.time'));
    });

    $('ul li a').click();

    h = $('.context').css('height');

    let cls = ['home.html', 'improve.html', 'custom.html', 'liberature.html', 'newyear.html', 'author.html'];
    let a = $('ul li a');
    // console.log(a);
    for (let i = 0; i < a.length; i++) {
        $(a[i]).attr({ 'refer': cls[i] });
    }

    var flag = true;

    $('ul li a').on('click', function () {
        clearClass();
        $(this).addClass('select');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if ($(this).attr('refer') == 'newyear.html' || $(this).attr('refer') == 'author.html') {
            if (flag) {
                $('body').css('overflow', 'hidden');
                $('.context').height(900);
                $('iframe').height(900)
                $('.main').css('height', '110%');
                $('footer').css('display', 'none');
                flag = false;
            }
        }
        else {
            $('body').css('overflow', 'scroll');
            $('iframe').height(1914);
            $('.context').height(1914);
            $('footer').css('display', 'block');
            flag = true;
        }

        $('iframe').attr('src', $(this).attr('refer'));
        return false;
    });

    $('.logo img').on('click',function(){
        $('ul li a')[0].click();
    });

    $('.href').off('click');

});

function clearClass() {
    $('ul li a').removeClass('select');
}